
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import CTAButton from './CTAButton';

interface BentoServicesProps {
  onConsultClick: () => void;
}

const BentoServices: React.FC<BentoServicesProps> = ({ onConsultClick }) => {
  return (
    <section id="what-we-do" className="py-40 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4 block"
            >
              Specializations
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-heading leading-none">
              Our <br /> <span className="text-white/30">Expertise.</span>
            </h2>
          </div>
          <div className="pb-4">
            <CTAButton onClick={onConsultClick}>Book Strategy Session</CTAButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden bg-white/5 border border-white/5 cursor-pointer"
            >
              {/* Image Background Mockup */}
              <div className="absolute inset-0 opacity-20 grayscale group-hover:scale-110 group-hover:opacity-40 transition-all duration-700">
                <img 
                  src={`https://images.unsplash.com/photo-${index === 0 ? '1460925895917-afdab827c52f' : index === 1 ? '1522202176988-66273c2fd55f' : '1506126613408-eca07ce68773'}?auto=format&fit=crop&q=80&w=1000`} 
                  className="w-full h-full object-cover" 
                  alt={service.title} 
                />
              </div>

              <div className="relative z-10 h-full p-12 flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase font-heading group-hover:text-orange-500 transition-colors">
                    {service.title.split(' ')[0]} <br />
                    <span className="text-white/40">{service.title.split(' ')[1]}</span>
                  </h3>
                </div>

                <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-gray-400 text-lg mb-8 font-light">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.details.map((detail) => (
                      <span key={detail} className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <span className="text-2xl font-light">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoServices;
