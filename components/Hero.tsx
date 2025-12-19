
import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Magnetic from './Magnetic';
import CTAButton from './CTAButton';

interface HeroProps {
  onConsultClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConsultClick }) => {
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Tagline (Character Reveal)
  const taglineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.4,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: "110%", opacity: 0, rotate: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  // Sub-header (Word Reveal - DISTINCT: uses blur and different stagger)
  const subHeaderVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 1.5,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const splitCharacters = (text: string) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        variants={wordVariants}
        className="inline-block mr-[0.35em]"
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-gray-950/60 to-gray-950 z-10" />
        <img 
          src="https://360-consulting-solutions-johnlicata.surge.sh/images/john-hero-new.jpg" 
          alt="John Licata" 
          className="w-full h-full object-cover object-top opacity-60"
        />
      </div>

      <div className="relative z-20 w-full px-6 max-w-[1400px] mx-auto text-center">
        <motion.div style={{ y: yOffset, opacity }}>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-orange-500 text-[10px] md:text-sm font-black tracking-[0.6em] uppercase mb-8 block"
          >
            Executive Logic. Personal Legacy.
          </motion.span>

          <motion.h1 
            variants={taglineVariants}
            initial="hidden"
            animate="visible"
            className="text-[13vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase font-heading flex flex-col items-center gap-2 mb-12"
          >
            <div className="overflow-hidden">
              {splitCharacters("COACHING")}
            </div>
            <div className="overflow-hidden flex items-center gap-2 md:gap-4">
              <span className="text-white">{splitCharacters("FOR")}</span> 
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                style={{ transformOrigin: 'left' }}
                className="bg-orange-500 text-white px-4 md:px-8 py-1 md:py-2 inline-block shadow-[0_0_40px_rgba(249,115,22,0.3)] polish-shine"
              >
                <span className="block">{splitCharacters("LIFE.")}</span>
              </motion.span>
            </div>
          </motion.h1>

          <div className="flex flex-col items-center gap-12">
            <motion.div 
              variants={subHeaderVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <p className="text-lg md:text-2xl text-gray-400 font-light leading-snug italic border-x border-white/10 px-8 flex flex-wrap justify-center">
                {splitWords("Your strategic partner in personal development.")}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              <CTAButton onClick={onConsultClick} className="px-10 py-6">
                book strategy session
              </CTAButton>

              <a href="#process" className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors flex items-center gap-3 group">
                View Roadmap <span className="text-orange-500 text-lg group-hover:translate-y-1 transition-transform">↓</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 80 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-10 w-[1px] bg-white/10 hidden md:block"
      />
    </section>
  );
};

export default Hero;
