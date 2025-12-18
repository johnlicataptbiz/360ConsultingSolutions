
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import CTAButton from './CTAButton';
import { ServiceItem } from '../types';

interface BentoServicesProps {
  onConsultClick: (service?: ServiceItem) => void;
}

const BentoServices: React.FC<BentoServicesProps> = ({ onConsultClick }) => {
  return (
    <section id="what-we-do" className="py-40 px-6 bg-gray-950 overflow-hidden relative">
      {/* Feathering Gradients */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          {/* Left Column - Sticky Heading */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">
                Specializations
              </span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-heading leading-tight mb-8">
                Our <br /> <span className="text-white/30">Expertise.</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
                Most consultants look at one piece of the puzzle. We look at the whole picture. Our approach integrates strategic depth with operational efficiency and holistic life balance.
              </p>
              <div className="h-1 w-20 bg-orange-500 mb-12" />
              <CTAButton onClick={() => onConsultClick()} className="w-full md:w-auto">
                Book Strategy Session
              </CTAButton>
            </motion.div>
          </div>

          {/* Right Column - Service Cards */}
          <div className="lg:w-2/3 space-y-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/10 hover:border-orange-500/50 transition-all duration-500 p-8 md:p-12 cursor-pointer polish-shine"
                onClick={() => onConsultClick(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onConsultClick(service)}
                aria-label={`Learn more about ${service.title}`}
              >
                {/* Subtle Background Interaction */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-orange-500 to-transparent transition-opacity duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start md:items-center">
                  <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-black group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-2xl relative shrink-0">
                    {service.icon}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase font-heading mb-4 group-hover:text-orange-500 transition-colors">
                      {service.title.split(' ')[0]} <span className="text-white/30">{service.title.split(' ')[1]}</span>
                    </h3>
                    <p className="text-gray-300 text-lg mb-8 font-light max-w-lg group-hover:text-white transition-colors">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {service.details.map((detail) => (
                        <span key={detail} className="px-4 py-1.5 rounded-full border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] bg-white/[0.03] text-gray-400 group-hover:text-white group-hover:border-orange-500/20 transition-all">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-12 right-12 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <span className="text-xl font-light">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoServices;
