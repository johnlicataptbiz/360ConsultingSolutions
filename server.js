import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');

const HUBSPOT_PUBLIC_BOOK_ENDPOINT = 'https://api.hubspot.com/meetings-public/v1/book';

function parseSlug(meetingUrl) {
  if (!meetingUrl) return null;
  try {
    const url = new URL(meetingUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

const HUBSPOT_MEETING_SLUG =
  process.env.HUBSPOT_MEETING_SLUG ||
  parseSlug(process.env.HUBSPOT_MEETING_URL) ||
  parseSlug(process.env.VITE_HUBSPOT_MEETING_URL) ||
  'john2490';

const pad2 = (n) => String(n).padStart(2, '0');

function getDateKeyInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  if (!year || !month || !day) return null;
  return `${year}-${month}-${day}`;
}

function getCorsHeaders(req) {
  const origin = req.headers.origin;
  return {
    'access-control-allow-origin': origin || '*',
    vary: 'Origin',
    'access-control-allow-credentials': 'false',
    'access-control-allow-headers': 'Content-Type',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
  };
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function sendJson(req, res, status, data) {
  send(
    res,
    status,
    {
      ...getCorsHeaders(req),
      'content-type': 'application/json; charset=utf-8',
    },
    JSON.stringify(data)
  );
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) throw new Error('Request body too large');
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;
  return JSON.parse(raw);
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.ico':
      return 'image/x-icon';
    case '.map':
      return 'application/json; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function getLocationFromRequest(req) {
  const origin = req.headers.origin;
  if (origin) {
    try {
      return new URL(origin).host;
    } catch {
      // ignore
    }
  }
  return req.headers['x-forwarded-host'] || req.headers.host || 'meetings.hubspot.com';
}

async function fetchHubSpotBookInfo({ now, timezone, location }) {
  const params = new URLSearchParams({
    slug: HUBSPOT_MEETING_SLUG,
    now: String(now),
    includeInactiveLink: 'true',
    location,
    timezone,
  });

  const response = await fetch(`${HUBSPOT_PUBLIC_BOOK_ENDPOINT}?${params.toString()}`);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`HubSpot availability fetch failed (${response.status}): ${text}`);
  }
  return JSON.parse(text);
}

async function fetchMonthInfo({ month, timezone, location }) {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    throw new Error('Invalid month format. Expected YYYY-MM.');
  }

  // Midday UTC reduces edge cases around DST transitions.
  const now = Date.UTC(year, monthIndex, 1, 12, 0, 0, 0);
  const bookInfo = await fetchHubSpotBookInfo({ now, timezone, location });

  const byDuration = bookInfo?.linkAvailability?.linkAvailabilityByDuration || {};
  const durations = Object.keys(byDuration)
    .map((d) => Number(d))
    .filter((d) => Number.isFinite(d))
    .sort((a, b) => a - b);
  const durationMs = durations[0];
  if (!durationMs) return { days: [], durationMs: undefined };

  const availabilities = byDuration[String(durationMs)]?.availabilities || [];

  const monthPrefix = `${year}-${pad2(monthIndex + 1)}`;
  const dayMap = new Map();

  for (const slot of availabilities) {
    const startMillisUtc = slot?.startMillisUtc;
    const endMillisUtc = slot?.endMillisUtc;
    if (!Number.isFinite(startMillisUtc) || !Number.isFinite(endMillisUtc)) continue;

    const dateKey = getDateKeyInTimeZone(new Date(startMillisUtc), timezone);
    if (!dateKey || !dateKey.startsWith(monthPrefix)) continue;

    if (!dayMap.has(dateKey)) dayMap.set(dateKey, []);
    dayMap.get(dateKey).push({
      start: new Date(startMillisUtc).toISOString(),
      end: new Date(endMillisUtc).toISOString(),
    });
  }

  const days = Array.from(dayMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, slots]) => ({
      date,
      hasScalability: false,
      slots: slots.sort((a, b) => a.start.localeCompare(b.start)),
    }));

  return { days, durationMs };
}

async function createHubSpotBooking({ firstName, lastName, email, timezone, duration, startTime }) {
  const query = new URLSearchParams({ slug: HUBSPOT_MEETING_SLUG });
  const body = {
    firstName,
    lastName,
    email,
    formFields: [],
    offline: false,
    locale: 'en',
    timezone,
    duration,
    startTime,
    guestEmails: [],
  };

  const response = await fetch(`${HUBSPOT_PUBLIC_BOOK_ENDPOINT}?${query.toString()}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`HubSpot booking failed (${response.status}): ${text}`);
    // @ts-ignore
    error.statusCode = response.status;
    throw error;
  }
  return JSON.parse(text);
}

async function serveStatic(req, res, pathname) {
  const cleanPath = pathname === '/' ? '/index.html' : pathname;
  const relativePath = cleanPath.replace(/^\/+/, '');
  const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(DIST_DIR, safePath);

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      return serveStatic(req, res, path.posix.join(cleanPath, 'index.html'));
    }
    const data = await fs.readFile(filePath);
    send(res, 200, { 'content-type': getMimeType(filePath) }, data);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) return sendJson(req, res, 400, { error: 'Missing URL' });

    if (req.method === 'OPTIONS') {
      return send(res, 204, getCorsHeaders(req), '');
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    if (pathname === '/health') {
      return sendJson(req, res, 200, { ok: true });
    }

    if (pathname === '/api/hubspot/oro/availability/MonthInfo') {
      if (req.method !== 'GET') return sendJson(req, res, 405, { error: 'Method not allowed' });
      const month = url.searchParams.get('month') || '';
      const timezone = url.searchParams.get('timezone') || 'UTC';
      const location = getLocationFromRequest(req);
      const monthInfo = await fetchMonthInfo({ month, timezone, location });
      return sendJson(req, res, 200, monthInfo);
    }

    if (pathname === '/api/hubspot/oro/book') {
      if (req.method !== 'POST') return sendJson(req, res, 405, { error: 'Method not allowed' });
      const payload = (await readJsonBody(req)) || {};
      const firstName = String(payload.firstName || '').trim();
      const lastName = String(payload.lastName || '').trim();
      const email = String(payload.email || '').trim();
      const timezone = String(payload.timezone || 'UTC');
      const duration = Number(payload.duration);
      const startTime = Number(payload.startTime);

      if (!firstName || !lastName || !email) {
        return sendJson(req, res, 400, { error: 'Missing required fields' });
      }
      if (!Number.isFinite(duration) || !Number.isFinite(startTime)) {
        return sendJson(req, res, 400, { error: 'Invalid startTime/duration' });
      }

      const booking = await createHubSpotBooking({ firstName, lastName, email, timezone, duration, startTime });
      return sendJson(req, res, 200, booking);
    }

    const served = await serveStatic(req, res, pathname);
    if (served) return;

    // SPA fallback
    const accept = req.headers.accept || '';
    if (accept.includes('text/html')) {
      const fallbackServed = await serveStatic(req, res, '/index.html');
      if (fallbackServed) return;
    }

    sendJson(req, res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(err);
    const statusCode = err?.statusCode || 500;
    sendJson(req, res, statusCode, { error: err?.message || 'Internal server error' });
  }
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
