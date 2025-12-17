
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { STEPS } from '../constants';
import CTAButton from './CTAButton';

interface ProcessSectionProps {
  onConsultClick: () => void;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ onConsultClick }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-40 px-6 bg-gray-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">The 360 Method</span>
          <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase font-heading">The Strategy <br/><span className="text-gradient">Roadmap.</span></h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto italic">High-stakes logic meets personal fulfillment.</p>
        </motion.div>

        <div className="hidden lg:block absolute top-[280px] left-[15%] right-[15%] h-[2px] bg-gray-900 z-0">
          <motion.div 
            style={{ scaleX, transformOrigin: 'left' }}
            className="h-full bg-gradient-to-r from-orange-500 to-blue-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10 mb-24">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 50px rgba(249,115,22,0.3)" }}
                  className="w-32 h-32 rounded-[2rem] glass flex items-center justify-center text-5xl mb-12 group-hover:border-orange-500/50 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{step.icon}</span>
                </motion.div>

                <div className="relative mb-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-14 h-14 rounded-full bg-gray-950 border-[3px] border-gray-800 flex items-center justify-center font-black text-xl z-10 group-hover:border-orange-500 group-hover:text-orange-500 transition-all"
                  >
                    {step.number}
                  </motion.div>
                </div>

                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter font-heading">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light px-8">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <CTAButton onClick={onConsultClick} className="px-12 py-6">
            Book My Strategy Session
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
