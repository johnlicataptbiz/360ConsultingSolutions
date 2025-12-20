
import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

interface FinalCTAProps {
  onConsultClick: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onConsultClick }) => {
  return (
    <section aria-labelledby="final-cta-heading" className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden bg-gray-950">
      {/* Background Image / John */}
      <div className="absolute inset-0 z-0">
        {/* Feathering Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 via-gray-950/70 to-gray-950 z-10" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent z-10" />

        <img
          src="/images/john-conference-room.jpg"
          alt="John Licata Strategic Session"
          className="w-full h-full object-cover object-[25%_50%] grayscale-[0.05] brightness-[1.1] contrast-[1.1]"
        />
      </div>

      <div className="relative z-20 w-full px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-end">
        {/* Empty space for John on the left */}
        <div className="hidden lg:block lg:w-1/2" />

        {/* Text Content on the right */}
        <div className="w-full lg:w-1/2 text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[#FF7A3D] text-[10px] md:text-sm font-black tracking-[0.6em] uppercase mb-8 block">
              Your next chapter starts here
            </span>

            <h2 id="final-cta-heading" className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter uppercase font-heading mb-8">
              Ready to <span className="text-white">Shorten</span> <br />
              <span className="text-[#FF7A3D]">Your Trajectory?</span>
            </h2>

            <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-xl ml-auto">
              Stop trading balance for success. Join the elite who win at work and at home.
            </p>

            <div className="flex flex-col items-center lg:items-end">
              <CTAButton onClick={onConsultClick} className="px-12 py-6 text-sm">
                book my strategy session
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-4">
        <div className="h-12 w-[1px] bg-white/20" />
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-600 rotate-90 origin-right translate-y-8">Connect</span>
      </div>
    </section>
  );
};

export default FinalCTA;
