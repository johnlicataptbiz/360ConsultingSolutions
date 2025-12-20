import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Check, ArrowRight } from 'lucide-react';

type HubSpotSlot = {
  start: string; // ISO date string (UTC)
  end: string; // ISO date string (UTC)
  id?: string;
};

type DayAvailability = {
  date: string; // "YYYY-MM-DD" in the requested timezone
  slots: HubSpotSlot[];
  hasScalability: boolean;
};

type MonthInfoResponse = {
  days: DayAvailability[];
  durationMs?: number;
};

type BookingStep = 'calendar' | 'form' | 'confirmation';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const pad2 = (n: number) => String(n).padStart(2, '0');
const toLocalDateKey = (date: Date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
const toMonthKey = (year: number, monthIndex: number) => `${year}-${pad2(monthIndex + 1)}`;

const formatLongDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

interface CustomCalendarProps {
  selectedServiceName?: string;
  onClose: () => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedServiceName, onClose }) => {
  const meetingUrl =
    import.meta.env.VITE_HUBSPOT_MEETING_URL ||
    'https://meetings.hubspot.com/john2490';
  // Fallback to production proxy if no environment variable is set
  const DEFAULT_PROXY_URL = 'https://360consulting.up.railway.app';
  const proxyBaseUrl = (import.meta.env.VITE_HUBSPOT_PROXY_BASE_URL || DEFAULT_PROXY_URL).replace(/\/+$/, '');

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<HubSpotSlot | null>(null);

  const [availability, setAvailability] = useState<MonthInfoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bookingStep, setBookingStep] = useState<BookingStep>('calendar');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const userTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const fetchAvailability = async (year: number, monthIndex: number) => {
    setLoading(true);
    setError(null);
    try {
      const month = toMonthKey(year, monthIndex);
      const params = new URLSearchParams({ month, timezone: userTimezone });
      const response = await fetch(`${proxyBaseUrl}/api/hubspot/oro/availability/MonthInfo?${params.toString()}`);
      if (!response.ok) throw new Error(`Failed to fetch availability (${response.status})`);
      const data = (await response.json()) as MonthInfoResponse;
      setAvailability(data);
    } catch (err) {
      console.error('Error fetching calendar availability:', err);
      setAvailability(null);
      setError('Unable to load availability. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability(currentDate.getFullYear(), currentDate.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate.getFullYear(), currentDate.getMonth()]);

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const calendarCells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarCells.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getSlotsForDate = (date: Date) => {
    if (!availability) return [];
    const dateKey = toLocalDateKey(date);
    const dayData = availability.days.find((d) => d.date === dateKey);
    return dayData ? dayData.slots : [];
  };

  const availableSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

  const goToForm = () => {
    setBookingError(null);
    setBookingStep('form');
  };

  const submitBooking = async () => {
    if (!selectedSlot || !selectedDate) return;
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setBookingError('Please enter your first name, last name, and email.');
      return;
    }

    setBookingLoading(true);
    setBookingError(null);
    try {
      const startTime = Date.parse(selectedSlot.start);
      const duration = Date.parse(selectedSlot.end) - Date.parse(selectedSlot.start);
      const response = await fetch(`${proxyBaseUrl}/api/hubspot/oro/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          notes: notes.trim() || undefined,
          timezone: userTimezone,
          startTime,
          duration,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Booking failed (${response.status})`);
      }

      setBookingStep('confirmation');
    } catch (err) {
      console.error('Booking error:', err);
      setBookingError('Unable to book that time. Please try another slot.');
    } finally {
      setBookingLoading(false);
    }
  };

  const sessionMinutes = useMemo(() => {
    if (availability?.durationMs) return Math.round(availability.durationMs / 60000);
    return selectedSlot ? Math.round((Date.parse(selectedSlot.end) - Date.parse(selectedSlot.start)) / 60000) : 45;
  }, [availability?.durationMs, selectedSlot]);

  return (
    <div className="flex-1 relative bg-[#0a0a0f] overflow-hidden flex flex-col">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-[70] bg-[#0a0a0f]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-[#FF7A3D]/20 border-t-#FF7A3D rounded-full animate-spin mb-4" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">Syncing Systems</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {bookingStep === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.04]">
                <div>
                  <p className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">
                    {selectedServiceName || 'Strategy Call'}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-white/80">
                    <Clock className="w-4 h-4 text-[#FF7A3D]/80" />
                    <span className="text-sm font-semibold">{sessionMinutes}-minute session</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMonth}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors flex items-center justify-center"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors flex items-center justify-center"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="px-6 pt-5">
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                    {error}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 max-w-4xl mx-auto">
                  {/* Calendar Column */}
                  <div className="min-w-0 max-w-[340px] mx-auto w-full">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h3>
                      <p className="text-[10px] font-black tracking-[0.35em] text-white/30 uppercase">
                        {userTimezone}
                      </p>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                        <div key={day} className="text-center text-xs font-black text-white/30">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {calendarCells.map((date, idx) => {
                        if (!date) return <div key={idx} className="aspect-square" />;

                        const isToday = new Date().toDateString() === date.toDateString();
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const hasSlots = getSlotsForDate(date).length > 0;

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedDate(date);
                              setSelectedSlot(null);
                            }}
                            disabled={!hasSlots}
                            className={[
                              'relative aspect-square rounded-lg flex items-center justify-center text-[12px] font-bold transition-all duration-200 border',
                              isSelected
                                ? 'bg-[#FF7A3D] text-white border-[#FF7A3D] shadow-[0_0_0_1px_rgba(255,92,0,0.35),0_0_35px_rgba(255,92,0,0.15)]'
                                : hasSlots
                                  ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                                  : 'bg-white/[0.02] text-white/20 border-white/[0.06] cursor-not-allowed',
                              isToday && !isSelected ? 'ring-1 ring-#FF7A3D/30' : '',
                            ].join(' ')}
                          >
                            {date.getDate()}
                            {hasSlots && !isSelected && (
                              <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#FF7A3D]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="min-w-0 flex flex-col border border-white/[0.06] bg-white/[0.02] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black tracking-[0.35em] text-white/40 uppercase">Available</p>
                        <p className="text-lg font-black text-white tracking-tight mt-1">Time Slots</p>
                        <p className="text-[10px] text-white/30 mt-1">{sessionMinutes}-minute session</p>
                      </div>
                      <a
                        href={meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] font-black tracking-[0.35em] text-white/40 uppercase hover:text-white/70 transition-colors"
                      >
                        HubSpot ↗
                      </a>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-2">
                      {!selectedDate ? (
                        <div className="text-white/35 text-sm text-center py-6">Select a day to see times</div>
                      ) : availableSlots.length === 0 ? (
                        <div className="text-white/35 text-sm text-center py-6">No times available</div>
                      ) : (
                        availableSlots.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSlot(slot)}
                            className={[
                              'w-full py-2.5 px-4 rounded-lg text-[13px] font-black uppercase tracking-wide transition-all border flex items-center justify-between',
                              selectedSlot === slot
                                ? 'bg-white text-[#0a0a0f] border-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
                                : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20',
                            ].join(' ')}
                          >
                            <span>{formatTime(slot.start)}</span>
                            <span className="text-[11px] font-black tracking-[0.35em] opacity-70">Choose</span>
                          </button>
                        ))
                      )}
                    </div>

                    <div className="px-5 py-4 border-t border-white/[0.06] bg-[#0a0a0f]/40">
                      {selectedDate && (
                        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">
                          {formatLongDate(selectedDate)}
                        </p>
                      )}
                      {selectedSlot && (
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={goToForm}
                          className="mt-3 w-full bg-[#FF7A3D] hover:bg-[#FF7A3D] text-white py-3 rounded-xl font-black uppercase tracking-[0.25em] text-[11px] transition-colors flex items-center justify-center gap-2"
                        >
                          Next Step <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {bookingStep === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 overflow-hidden flex flex-col"
            >
              <div className="px-6 pt-6 pb-4 border-b border-white/[0.04] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.4em] text-[#FF7A3D] uppercase">Your Details</p>
                  <p className="text-white/60 text-sm font-bold mt-2">
                    {selectedDate ? formatLongDate(selectedDate) : ''}{' '}
                    {selectedSlot ? `• ${formatTime(selectedSlot.start)}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => setBookingStep('calendar')}
                  className="text-[11px] font-black uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
                >
                  Back
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6">
                <div className="max-w-xl">
                  {bookingError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 px-4 py-3 text-sm mb-5">
                      {bookingError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.35em] mb-2">
                        First Name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF7A3D]/60 transition-colors"
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.35em] mb-2">
                        Last Name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF7A3D]/60 transition-colors"
                        placeholder="Licata"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.35em] mb-2">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF7A3D]/60 transition-colors"
                      placeholder="you@company.com"
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.35em] mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FF7A3D]/60 transition-colors resize-none h-28"
                      placeholder="Anything you want to cover?"
                    />
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={submitBooking}
                      disabled={bookingLoading}
                      className="flex-1 bg-[#FF7A3D] hover:bg-[#FF7A3D] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-black uppercase tracking-[0.25em] text-[11px] transition-colors"
                    >
                      {bookingLoading ? 'Booking…' : 'Confirm Booking'}
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white px-5 py-3 rounded-xl font-black uppercase tracking-[0.25em] text-[11px] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {bookingStep === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-6"
            >
              <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mb-6 text-green-400">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Booking Confirmed</h3>
              <p className="text-white/55 max-w-md mb-8 text-sm">
                A confirmation email is on the way. See you on{' '}
                <span className="text-white/80 font-semibold">{selectedDate ? formatLongDate(selectedDate) : ''}</span>
                {selectedSlot ? (
                  <>
                    {' '}
                    at <span className="text-white/80 font-semibold">{formatTime(selectedSlot.start)}</span>.
                  </>
                ) : null}
              </p>
              <button
                onClick={onClose}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-black uppercase tracking-[0.25em] text-[11px] transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomCalendar;
