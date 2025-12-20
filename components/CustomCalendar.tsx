import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, ArrowRight, Check } from 'lucide-react';

// --- Types ---
type HubSpotSlot = {
    start: string; // ISO date string
    end: string;   // ISO date string
    id?: string;
};

type DayAvailability = {
    date: string; // "YYYY-MM-DD"
    slots: HubSpotSlot[];
    hasScalability: boolean;
};

type MonthInfoResponse = {
    days: DayAvailability[];
};

// --- Proxy Config ---
const DEFAULT_PROXY_BASE_URL = "https://hubspot-proxy-production.up.railway.app";
const PROXY_BASE_URL = import.meta.env.VITE_HUBSPOT_PROXY_BASE_URL || DEFAULT_PROXY_BASE_URL;

// --- Helper Functions ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

interface CustomCalendarProps {
    onClose: () => void;
    selectedService?: string; // Optional prop if passed from parent
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onClose, selectedService }) => {
    // State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<HubSpotSlot | null>(null);
    const [availability, setAvailability] = useState<MonthInfoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingStep, setBookingStep] = useState<'calendar' | 'form' | 'confirmation'>('calendar');

    // Fetch Availability
    const fetchAvailability = async (year: number, month: number) => {
        setLoading(true);
        setError(null);
        try {
            // Format month as YYYY-MM
            const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
            const response = await fetch(`${PROXY_BASE_URL}/api/hubspot/oro/availability/MonthInfo?month=${monthStr}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch availability: ${response.statusText}`);
            }

            const data = await response.json();
            setAvailability(data);
        } catch (err) {
            console.error("Error fetching calendar availability:", err);
            setError("Unable to load availability. Please try again later.");
            setAvailability(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvailability(currentDate.getFullYear(), currentDate.getMonth());
    }, [currentDate.getFullYear(), currentDate.getMonth()]);

    // Calendar Grid Logic
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    // Handle Navigation
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    // Determine available slots for selected date
    const getSlotsForDate = (date: Date) => {
        if (!availability) return [];
        const dateStr = date.toISOString().split('T')[0];
        const dayData = availability.days.find(d => d.date === dateStr);
        return dayData ? dayData.slots : [];
    };

    const availableSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl bg-[#1a1a2e] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 max-h-[90vh]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full z-20 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Branding & Info */}
                <div className="w-full md:w-1/3 bg-gradient-to-br from-[#FF5722] to-[#ff8a50] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px]">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Book Your Session</h2>
                        <p className="text-white/90 text-sm leading-relaxed mb-6">
                            Schedule a 30-minute strategy call with John Licata. We'll discuss your goals and how we can help you achieve them.
                        </p>

                        <div className="flex items-center gap-3 text-sm bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                            <Clock className="w-4 h-4" />
                            <span>30 Minutes</span>
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    {selectedDate && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10 mt-auto pt-8 border-t border-white/20"
                        >
                            <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Selected Date</p>
                            <p className="text-2xl font-semibold">{formatDate(selectedDate)}</p>
                            {selectedSlot && (
                                <p className="text-xl font-medium mt-1 text-white/90">
                                    {formatTime(selectedSlot.start)}
                                </p>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Right Side: Calendar & Slots */}
                <div className="w-full md:w-2/3 bg-[#111122] p-6 md:p-8 flex flex-col overflow-hidden relative">

                    {bookingStep === 'calendar' && (
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">
                                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-1 gap-8 overflow-hidden">
                                {/* Calendar Grid */}
                                <div className="flex-1 min-w-[300px]">
                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                            <div key={day} className="text-center text-xs font-bold text-white/40 mb-2">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {days.map((date, idx) => {
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
                                                    className={`
                            relative aspect-square rounded-full flex items-center justify-center text-sm transition-all duration-200
                            ${isSelected
                                                            ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-500/20'
                                                            : hasSlots
                                                                ? 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'
                                                                : 'text-white/20 cursor-not-allowed'}
                            ${isToday ? 'border border-[#FF5722]/50' : ''}
                          `}
                                                >
                                                    {date.getDate()}
                                                    {hasSlots && !isSelected && (
                                                        <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#FF5722]" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Slots Panel */}
                                <div className="w-48 border-l border-white/10 pl-6 hidden md:flex flex-col">
                                    <h4 className="text-sm font-semibold text-white/50 mb-4 uppercase tracking-wider">
                                        {selectedDate ? 'Available Times' : 'Select a Day'}
                                    </h4>

                                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                                        {selectedDate ? (
                                            availableSlots.length > 0 ? (
                                                availableSlots.map((slot, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`
                              w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 border
                              ${selectedSlot === slot
                                                                ? 'bg-white text-[#111122] border-white'
                                                                : 'bg-white/5 text-white border-transparent hover:bg-white/10 hover:border-white/20'}
                            `}
                                                    >
                                                        {formatTime(slot.start)}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="text-white/30 text-sm text-center py-4">No slots available</div>
                                            )
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-white/20 gap-2">
                                                <CalendarIcon className="w-8 h-8 opacity-50" />
                                                <span className="text-xs text-center">Choose a date to see times</span>
                                            </div>
                                        )}
                                    </div>

                                    {selectedSlot && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() => setBookingStep('form')}
                                            className="w-full mt-4 bg-[#FF5722] hover:bg-[#F4511E] text-white py-3 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2"
                                        >
                                            Next Step <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Step (Simple Placeholder for now) */}
                    {bookingStep === 'form' && (
                        <div className="flex flex-col h-full">
                            <button
                                onClick={() => setBookingStep('calendar')}
                                className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back to Calendar
                            </button>

                            <h3 className="text-2xl font-bold text-white mb-6">Confirm Details</h3>

                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF5722] transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF5722] transition-colors" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Notes</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-24 focus:outline-none focus:border-[#FF5722] transition-colors resize-none" placeholder="Any specific topics?" />
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => setBookingStep('confirmation')}
                                        className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-orange-500/20"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Confirmation Step */}
                    {bookingStep === 'confirmation' && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
                                <Check className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                            <p className="text-white/60 max-w-md mb-8">
                                We've sent a calendar invitation to your email. We look forward to speaking with you on {selectedDate && formatDate(selectedDate)} at {selectedSlot && formatTime(selectedSlot.start)}.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}

                </div>
            </motion.div>
        </div>
    );
};

export default CustomCalendar;
