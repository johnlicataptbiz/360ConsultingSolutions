
import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../constants';

const MarqueePartners: React.FC = () => {
  return (
    <section id="partnerships" className="py-12 bg-gray-950 overflow-hidden border-y border-white/5 relative">
      {/* Vertical Feathering Gradients */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="mb-8 text-center px-6">
        <h3 className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.5em]">Our Strategic Network</h3>
      </div>

      <div className="relative flex overflow-hidden group/marquee">
        {/* Shadow Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10" />

        <motion.div
          className="flex gap-20 whitespace-nowrap min-w-full items-center py-4"
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div key={`${partner.name}-${idx}`} className="flex items-center gap-6 group shrink-0 cursor-pointer" aria-hidden={idx >= PARTNERS.length ? 'true' : undefined}>
              <div className="h-16 md:h-20 px-8 py-3 bg-white/95 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                <img
                  src={partner.url}
                  alt={partner.name}
                  className={`h-full w-auto max-w-[220px] md:max-w-[300px] object-contain transition-all duration-700 mix-blend-multiply ${partner.name === 'Nike'
                    ? 'brightness-0'
                    : ''
                    }`}
                />
              </div>
              <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] text-gray-500 group-hover:text-[#FF7A3D] transition-colors duration-500 uppercase font-heading">
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
