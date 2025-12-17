
import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../constants';

const MarqueePartners: React.FC = () => {
  return (
    <section id="partnerships" className="py-24 bg-gray-950 overflow-hidden border-y border-white/5">
      <div className="mb-12 text-center px-6">
        <h3 className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">Our Strategic Network</h3>
      </div>
      
      <div className="relative flex overflow-hidden">
        {/* Shadow Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10" />

        <motion.div 
          className="flex gap-24 whitespace-nowrap min-w-full items-center py-4"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div key={`${partner.name}-${idx}`} className="flex items-center gap-6 group shrink-0">
              <div className="h-14 flex items-center justify-center transition-all duration-500">
                <img 
                  src={partner.url} 
                  alt={partner.name}
                  className="h-full w-auto max-w-[180px] object-contain grayscale opacity-40 brightness-[5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-500 filter drop-shadow-sm"
                />
              </div>
              <span className="text-sm font-bold tracking-widest text-gray-700 group-hover:text-orange-500 transition-colors uppercase">
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
