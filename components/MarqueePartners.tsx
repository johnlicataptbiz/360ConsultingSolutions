
import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../constants';

const MarqueePartners: React.FC = () => {
  return (
    <section id="partnerships" className="py-24 bg-gray-950 overflow-hidden border-y border-white/5">
      <div className="mb-12 text-center px-6">
        <h3 className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.5em]">Our Strategic Network</h3>
      </div>
      
      <div className="relative flex overflow-hidden group/marquee">
        {/* Shadow Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10" />

        <motion.div 
          className="flex gap-24 whitespace-nowrap min-w-full items-center py-4"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div key={`${partner.name}-${idx}`} className="flex items-center gap-6 group shrink-0 cursor-pointer">
              <div className="h-10 md:h-12 flex items-center justify-center">
                <img 
                  src={partner.url} 
                  alt={partner.name}
                  className="h-full w-auto max-w-[140px] md:max-w-[160px] object-contain transition-all duration-700 ease-in-out grayscale brightness-75 opacity-40 group-hover:grayscale-0 group-hover:brightness-110 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] md:text-[11px] font-black tracking-[0.4em] text-gray-700 group-hover:text-orange-500 transition-colors duration-500 uppercase font-heading">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueePartners;
