import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';

interface ConsultModalProps {
  onClose: () => void;
  selectedService?: ServiceItem | null;
}

const ConsultModal: React.FC<ConsultModalProps> = ({ onClose, selectedService }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    const timer = setTimeout(() => setLoading(false), 800);

    return () => {
      clearTimeout(timer);
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  const defaultDetails = [
    'Identify core operational and life bottlenecks.',
    'Define clear trajectory for the next 12 months.',
    'No-obligation strategic audit.'
  ];

  const details = selectedService?.details || defaultDetails;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/95 backdrop-blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative z-10 w-full max-w-5xl glass rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] border border-white/10"
      >
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Left Side: Professional Sidebar */}
          <div className="hidden lg:flex w-[320px] bg-white/[0.02] border-r border-white/10 flex-col p-12 justify-between shrink-0">
            <div>
              <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-black text-2xl mb-12 shadow-2xl">360</div>

              <h2 className="text-4xl font-black mb-10 leading-[1.1] tracking-tighter uppercase font-heading">
                {selectedService ? (
                  <>The <span className="text-orange-500">{selectedService.title.split(' ')[0]}</span> <br /> Logic.</>
                ) : (
                  <>The Logic of <br /><span className="text-orange-500">Success.</span></>
                )}
              </h2>

              <div className="space-y-8">
                {details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-[10px] mt-1 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">✓</div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-200 transition-colors">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] group shadow-2xl border border-white/10 mt-12 bg-gray-900">
              <img
                src="/images/john-office-headshot.jpg"
                alt="John Licata"
                className="absolute inset-0 w-full h-full object-cover object-center grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 text-left">
                <p className="text-white font-black text-2xl uppercase tracking-tighter font-heading leading-none mb-2">John Licata</p>
                <p className="text-orange-500 text-[10px] uppercase font-black tracking-[0.4em]">Principal Coach</p>
              </div>
            </div>
          </div>

          {/* Right Side: HubSpot Interface */}
          <div className="flex-1 flex flex-col p-8 md:p-14 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <span className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2 block">Secure Your Session</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter font-heading text-white">Calendar Sync</h3>
              </div>
              <button
                onClick={onClose}
                className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all group active:scale-95"
                aria-label="Close Modal"
              >
                <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">✕</span>
              </button>
            </div>

            <div className="flex-1 relative min-h-[450px] lg:min-h-0 bg-black/40 rounded-[3rem] border border-white/5 overflow-hidden shadow-inner">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-950">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 border-[3px] border-orange-500/10 border-t-orange-500 rounded-full animate-spin mb-6" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Syncing Systems</p>
                  </div>
                </div>
              )}

              <div
                className="meetings-iframe-container w-full h-full custom-scrollbar"
                data-src="https://meetings.hubspot.com/john2490?embed=true"
              ></div>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.5em]">
              Encrypted Booking • Priority Access • 30-Min Strategic Audit
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultModal;
