
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale opacity-30 brightness-50 scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-partners-working-together-in-office-43394-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 w-full px-6 max-w-[1400px] mx-auto pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div style={{ y: yOffset, opacity }} className="text-left">
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
              className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase font-heading flex flex-col gap-2 mb-12"
            >
              <div className="overflow-hidden">
                {splitCharacters("COACHING")}
              </div>
              <div className="overflow-hidden flex items-center gap-2 md:gap-4">
                <span className="text-white/10 outline-text">{splitCharacters("FOR")}</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  style={{ transformOrigin: 'left' }}
                  className="bg-orange-500 text-white px-4 md:px-8 py-1 md:py-2 inline-block shadow-[0_0_40px_rgba(249,115,22,0.3)]"
                >
                  <span className="block">{splitCharacters("LIFE.")}</span>
                </motion.span>
              </div>
            </motion.h1>

            <div className="flex flex-col items-start gap-12">
              <motion.div
                variants={subHeaderVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl"
              >
                <p className="text-lg md:text-2xl text-gray-400 font-light leading-snug italic border-l border-white/10 pl-8 flex flex-wrap">
                  {splitWords("Your strategic partner in personal development.")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="flex flex-wrap items-center gap-8 md:gap-12"
              >
                <CTAButton onClick={onConsultClick} className="px-10 py-6">
                  book strategy session
                </CTAButton>

                <a href="#process" className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors flex items-center gap-3 group">
                  View Roadmap <span className="text-orange-500 text-lg group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img
                src="/john-licata.png"
                alt="John Licata"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 blur-3xl rounded-full"
              />
              <div className="absolute bottom-8 left-8">
                <span className="text-orange-500 font-black text-xs tracking-[0.4em] uppercase block mb-1">Founder</span>
                <span className="text-white font-heading font-black text-3xl tracking-tighter uppercase">John Licata</span>
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
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
