<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

Live site: https://360-consulting-solutions-johnlicata.surge.sh/

View your app in AI Studio: https://ai.studio/apps/drive/1GjnRU8foOA7gWelBpzrkz3xeek8patT0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` (see `.env.example`) and set `GEMINI_API_KEY`
3. Run the app:
   `npm run dev`

## Deploy (Surge)

1. Build and deploy:
   `npm run deploy`

## HubSpot Calendar Proxy

The custom booking UI in `components/CustomCalendar.tsx` fetches availability via a proxy service.

- Configure `VITE_HUBSPOT_PROXY_BASE_URL` in `.env.local` if you need to point at a different Railway deployment.
