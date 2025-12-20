
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, Compass } from 'lucide-react';
import CTAButton from './CTAButton';
import { ServiceItem } from '../types';

interface BentoServicesProps {
  onConsultClick: (service?: ServiceItem) => void;
  onLaunchPathClick: () => void;
}

const BentoServices: React.FC<BentoServicesProps> = ({ onConsultClick, onLaunchPathClick }) => {
  return (
    <section id="what-we-do" className="py-24 px-6 bg-gray-950 overflow-hidden relative">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#FF7A3D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF7A3D] text-[11px] font-black tracking-[0.6em] uppercase mb-6 block"
          >
            Performance Frameworks
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase font-heading leading-none mb-8 glimmer"
          >
            OUR <span className="text-gradient">EXPERTISE.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Deconstructing status quo logic to build high-performance foundations. 
            We integrate 30 years of retail methodology with visionary human strategy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto">
          {/* Card 1: Business - WIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="md:col-span-4 group relative overflow-hidden rounded-[3.5rem] bg-white/[0.03] border border-white/10 p-12 hover:border-[#FF7A3D]/40 transition-all duration-700 min-h-[450px] flex flex-col justify-between"
          >
            {/* Logic Schematic Background */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                <path d="M50 350 L50 50 L350 50" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
                <path d="M50 350 L150 200 L250 250 L350 100" stroke="#FF7A3D" strokeWidth="3" />
                <circle cx="150" cy="200" r="6" fill="#FF7A3D" />
                <circle cx="250" cy="250" r="6" fill="#FF7A3D" />
                <circle cx="350" cy="100" r="6" fill="#FF7A3D" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-[#FF7A3D]/10 rounded-2xl border border-[#FF7A3D]/20 text-[#FF7A3D]">
                  <BarChart3 size={40} />
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase font-heading">
                    Business <span className="text-white/30">Coaching</span>
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A3D]/60">Operational Scale Logic</p>
                </div>
              </div>
              <p className="text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                Strategic architecture for $100M+ scale. We optimize the systems that allow your vision to breathe and your revenue to multiply without friction.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-12">
              {['Supply Chain Logic', 'Revenue Growth', 'Leadership Alignment', 'Exit Ready'].map((tag) => (
                <span key={tag} className="px-5 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white group-hover:border-[#FF7A3D]/30 transition-all">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="absolute top-8 right-12">
              <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] rotate-90 origin-right">
                30Y SCALE EXPERIENCE
              </p>
            </div>
          </motion.div>

          {/* Card 2: Career - TALL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[3.5rem] bg-gradient-to-b from-[#FF7A3D]/5 to-transparent border border-white/10 p-8 hover:border-[#FF7A3D]/40 transition-all duration-700 flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white mb-6 w-fit group-hover:bg-[#FF7A3D] group-hover:text-black transition-all">
                <Briefcase size={36} />
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase font-heading mb-4 leading-none">
                Career <br /><span className="text-white/30">Coaching</span>
              </h3>
              <p className="text-base text-gray-400 font-light leading-relaxed mb-6">
                Mapping high-velocity professional trajectories for elite executives and rising leaders. 
              </p>
              <ul className="space-y-3">
                {['Executive Presence', 'Trajectory Mapping', 'Influence Equity'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A3D]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-col items-center gap-4">
              <button 
                onClick={onLaunchPathClick}
                className="group flex flex-col items-center gap-2 text-gray-400 hover:text-[#FF7A3D] transition-colors"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">View Launch Path</span>
                <svg 
                  className="w-6 h-6 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            {/* Background Graphic */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF7A3D]/10 blur-[100px] rounded-full group-hover:bg-[#FF7A3D]/20 transition-all" />
          </motion.div>

          {/* Card 3: Life - MEDIUM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 group relative overflow-hidden rounded-[3.5rem] bg-white/[0.03] border border-white/10 p-10 hover:border-[#FF7A3D]/40 transition-all duration-700 min-h-[350px] flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <Compass className="text-[#FF7A3D]" size={32} />
              <h3 className="text-2xl font-black tracking-tighter uppercase font-heading">
                Life <span className="text-white/30">Coaching</span>
              </h3>
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              Achieving the "John Licata Balance"—winning at the highest stakes of business without compromising the foundation of family and legacy.
            </p>
            <div className="h-[1px] w-full bg-white/5 my-6" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Equilibrium Index</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A3D]">Peak Performance</span>
            </div>
          </motion.div>

          {/* Card 4: 360 CONNECTION - TECH CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 group relative overflow-hidden rounded-[3.5rem] bg-gray-900 border border-[#FF7A3D]/20 p-10 hover:border-[#FF7A3D]/60 transition-all duration-700 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF7A3D] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-24 h-24 rounded-full border border-[#FF7A3D]/50 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#FF7A3D] border-t-transparent animate-spin duration-[3s]" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-[#FF7A3D] font-black text-xl italic">360°</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-black tracking-widest uppercase mb-2">The Integrated Logic</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
                Syncing Business, Career, and Life <br /> into a single operational unit.
              </p>
            </div>
            <a 
              href="#ai-strategist"
              className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF7A3D] border-b border-[#FF7A3D]/30 pb-1 hover:border-[#FF7A3D] transition-all cursor-pointer"
            >
              Analyze Your Gap
            </a>
          </motion.div>
        </div>

        <div className="mt-24 flex justify-center">
          <CTAButton onClick={() => onConsultClick()} className="md:px-20">
            Secure Your Strategy Session
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default BentoServices;
