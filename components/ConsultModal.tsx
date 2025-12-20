import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import CustomCalendar from './CustomCalendar';

interface ConsultModalProps {
  onClose: () => void;
  selectedService?: ServiceItem | null;
}

const ConsultModal: React.FC<ConsultModalProps> = ({ onClose, selectedService }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/98 backdrop-blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-modal-heading"
        className="relative z-10 w-full max-w-5xl bg-[#0a0a0f] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-[100] w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/10"
          aria-label="Close"
        >
          <span className="text-xl">✕</span>
        </button>

        <div className="relative z-50 pt-10 pb-6 px-6 text-center border-b border-white/[0.03] bg-[#0a0a0f]">
          <p className="text-[10px] font-black tracking-[0.4em] text-[#FF7A3D] uppercase mb-2">
            Schedule Your Session
          </p>
          <h2 id="consult-modal-heading" className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 font-heading">
            Select a Date & Time
          </h2>
          <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em]">
            Secure Booking • 45-Minute Session • Priority Access
          </p>
        </div>

        <CustomCalendar selectedServiceName={selectedService?.title} onClose={onClose} />
      </motion.div>
    </div>
  );
};

export default ConsultModal;

