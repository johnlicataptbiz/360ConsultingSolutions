
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6 flex items-center justify-between ${
        scrolled ? 'glass py-4' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black text-lg transition-transform group-hover:scale-110">
          360
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-tighter leading-none font-heading uppercase">JOHN LICATA</span>
          <span className="text-[9px] tracking-[0.3em] text-orange-500 font-bold uppercase">Consulting</span>
        </div>
      </div>

      <div className="hidden xl:flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <Magnetic key={item.label} strength={0.2}>
            <a
              href={item.href}
              className="text-[11px] font-bold text-gray-400 hover:text-white transition-colors tracking-[0.2em] uppercase"
            >
              {item.label}
            </a>
          </Magnetic>
        ))}
      </div>

      <div className="flex items-center">
        <CTAButton onClick={onConsultClick} className="py-3 px-6 md:px-8">
          book strategy session
        </CTAButton>
      </div>
    </motion.nav>
  );
};

export default Navbar;
