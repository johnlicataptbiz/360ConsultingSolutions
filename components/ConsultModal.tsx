
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConsultModalProps {
  onClose: () => void;
}

const ConsultModal: React.FC<ConsultModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load HubSpot Meetings script dynamically
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    // Give it a bit of time to look intentional
    const timer = setTimeout(() => setLoading(false), 800);

    return () => {
      clearTimeout(timer);
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/90 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative z-10 w-full max-w-5xl glass rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col max-h-[92vh] border border-white/10"
      >
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Left Side: Sidebar / Info */}
          <div className="hidden lg:flex w-1/3 bg-white/5 border-r border-white/10 flex-col p-12 justify-between">
            <div>
              <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-black text-2xl mb-8">360</div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-tight font-heading">
                The Logic of <br/><span className="text-orange-500">Success.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-[10px] mt-1 shrink-0">✓</div>
                  <p className="text-gray-400 text-sm font-medium">Identify core operational and life bottlenecks.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-[10px] mt-1 shrink-0">✓</div>
                  <p className="text-gray-400 text-sm font-medium">Define clear trajectory for the next 12 months.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-[10px] mt-1 shrink-0">✓</div>
                  <p className="text-gray-400 text-sm font-medium">No-obligation strategic audit.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
                alt="John Licata" 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-black text-sm uppercase tracking-widest">John Licata</p>
                <p className="text-orange-500 text-[9px] uppercase font-black tracking-[0.2em]">Principal Coach</p>
              </div>
            </div>
          </div>

          {/* Right Side: The Embed */}
          <div className="flex-1 flex flex-col p-6 md:p-12 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-1 block">Calendar Sync</span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter font-heading">Secure Your Time</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                aria-label="Close Modal"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">✕</span>
              </button>
            </div>

            <div className="flex-1 relative min-h-[400px] lg:min-h-0 bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-950">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 animate-pulse">Initializing Portal</p>
                  </div>
                </div>
              )}
              
              <div 
                className="meetings-iframe-container w-full h-full custom-scrollbar" 
                data-src="https://meetings.hubspot.com/john2490?embed=true"
              ></div>
            </div>
            
            <p className="mt-6 text-center text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
              Encrypted Booking • Priority Access • 30-Min Session
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultModal;
