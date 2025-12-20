
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import Magnetic from './Magnetic';
import CTAButton from './CTAButton';

interface NavbarProps {
  onConsultClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onConsultClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3 flex items-center justify-between ${scrolled ? 'glass py-1' : 'bg-transparent'
        }`}
    >
      <div className="flex items-center gap-3 group cursor-pointer polish-shine" role="link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="360 Consulting Solutions Home">
        <img
          src="/images/360-logo-new.png"
          alt="360"
          className="h-16 w-12 object-cover object-left transition-transform group-hover:scale-105 brightness-0 invert"
        />
        <div className="h-12 w-[1px] bg-white"></div>
        <div className="flex flex-col leading-none">
          <span className="text-[#FF7A3D] font-black tracking-[0.3em] text-[10px] uppercase">
            CONSULTING
          </span>
          <span className="text-[#FF7A3D] font-black tracking-[0.3em] text-[10px] uppercase">
            SOLUTIONS
          </span>
        </div>
      </div>

      <div className="hidden xl:flex items-center gap-10" role="menubar">
        {NAV_ITEMS.map((item) => (
          <Magnetic key={item.label} strength={0.2}>
            <a
              href={item.href}
              className={`relative text-[11px] font-bold transition-colors tracking-[0.2em] uppercase flex items-center gap-2 ${
                item.isNew ? 'text-[#FF7A3D] hover:text-[#FF7A3D]' : 'text-gray-300 hover:text-white'
              }`}
              role="menuitem"
            >
              {item.label}
              {item.isNew && (
                <span className="relative">
                  <span className="absolute inset-0 bg-[#FF7A3D] blur-sm opacity-50 animate-pulse rounded-full" />
                  <span className="relative px-2 py-0.5 bg-gradient-to-r from-[#FF7A3D] to-[#FF7A3D] text-white text-[8px] font-black tracking-widest rounded-full shadow-[0_0_10px_rgba(255,122,61,0.5)]">
                    NEW
                  </span>
                </span>
              )}
            </a>
          </Magnetic>
        ))}
      </div>

      <div className="flex items-center">
        <CTAButton onClick={onConsultClick} className="py-2.5 px-5 md:px-6 text-[9px]">
          book strategy session
        </CTAButton>
      </div>
    </motion.nav>
  );
};

export default Navbar;
