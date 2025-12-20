
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target, Rocket, Briefcase, Zap, ShieldCheck } from 'lucide-react';

interface LaunchPathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timelineData = [
  {
    phase: "Phase 01: Audit",
    title: "The Logic Baseline",
    description: "Deep-dive into existing operational structures. We identify the friction points in your current 'status quo' logic.",
    icon: <Target className="text-[#FF7A3D]" />,
    duration: "Week 01-02"
  },
  {
    phase: "Phase 02: Alignment",
    title: "Structural Integrity",
    description: "Re-mapping leadership roles and communication loops. Ensuring every unit is synced to the primary mission.",
    icon: <ShieldCheck className="text-blue-500" />,
    duration: "Week 03-05"
  },
  {
    phase: "Phase 03: Velocity",
    title: "Scaling Systems",
    description: "Deploying high-velocity systems across branding, supply chain, and revenue operations.",
    icon: <Zap className="text-[#FF7A3D]" />,
    duration: "Week 06-10"
  },
  {
    phase: "Phase 04: Launch",
    title: "Market Capture",
    description: "Full-scale execution of the new roadmap. Moving from founder-led complexity to system-driven growth.",
    icon: <Rocket className="text-[#FF7A3D]" />,
    duration: "Week 12+"
  }
];

const LaunchPathModal: React.FC<LaunchPathModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-6xl bg-[#0a0a0f] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(255,92,0,0.1)] flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-[160] w-12 h-12 rounded-full bg-white/5 hover:bg-[#FF7A3D] hover:text-black transition-all border border-white/10 flex items-center justify-center text-white"
            >
              <span className="text-2xl font-light">✕</span>
            </button>

            {/* Content Overflow Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-20">
              <div className="mb-20 text-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#FF7A3D] text-[10px] font-black tracking-[0.6em] uppercase mb-6 block"
                >
                  The 360 Methodology
                </motion.span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-heading text-white">
                  THE <span className="text-gradient">LAUNCH PATH.</span>
                </h2>
                <div className="h-1 w-24 bg-[#FF7A3D] mx-auto mt-8 rounded-full" />
              </div>

              {/* Timeline Implementation */}
              <div className="relative">
                {/* Central Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#FF7A3D]/0 via-[#FF7A3D]/50 to-[#FF7A3D]/0 hidden lg:block" />

                <div className="space-y-24 lg:space-y-32">
                  {timelineData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      className={`relative flex flex-col lg:flex-row items-center gap-10 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden lg:flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-[#FF7A3D] shadow-[0_0_20px_rgba(255,92,0,0.8)] z-10" />
                      </div>

                      {/* Content Card */}
                      <div className="w-full lg:w-[45%]">
                        <div className={`p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-[#FF7A3D]/30 transition-all group relative overflow-hidden ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                          <div className={`absolute top-0 ${idx % 2 === 0 ? 'right-0' : 'left-0'} w-24 h-24 bg-[#FF7A3D]/5 blur-3xl`} />
                          
                          <div className={`flex items-center gap-4 mb-6 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[#FF7A3D]">
                              {item.icon}
                            </div>
                            <span className="text-[#FF7A3D] text-[10px] font-black uppercase tracking-[0.3em]">{item.phase}</span>
                          </div>

                          <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4 leading-none">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 font-light leading-relaxed mb-6">
                            {item.description}
                          </p>
                          <div className={`text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ${idx % 2 === 0 ? 'lg:justify-end' : ''} flex items-center gap-2`}>
                            <Calendar size={12} className="text-[#FF7A3D]" />
                            {item.duration}
                          </div>
                        </div>
                      </div>

                      {/* Spacer for the other side */}
                      <div className="hidden lg:block lg:w-[45%]" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Final CTA in Modal */}
              <div className="mt-40 text-center">
                <button
                  onClick={onClose}
                  className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#FF7A3D] transition-all hover:scale-105"
                >
                  Start Your Audit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LaunchPathModal;
