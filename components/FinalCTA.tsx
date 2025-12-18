
import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

interface FinalCTAProps {
  onConsultClick: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onConsultClick }) => {
  return (
    <section className="py-40 px-6 bg-gray-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-orange-500 font-black uppercase tracking-[0.6em] text-xs mb-8 block"
        >
          Your Next Chapter Starts Here
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase font-heading leading-none"
        >
          Ready to shorten <br />
          <span className="text-gradient">the trajectory?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-xl md:text-2xl font-light mb-16 max-w-2xl mx-auto italic"
        >
          Stop trading balance for success. Join the elite who win at work and at home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CTAButton onClick={onConsultClick} className="px-16 py-8 text-sm md:text-base">
            Book My Strategy Session
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
