
import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick, children, className = "", strength = 0.4 }) => {
  return (
    <Magnetic strength={strength}>
      <motion.button
        onClick={onClick}
        className={`group relative px-8 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-full overflow-hidden transition-all active:scale-95 shimmer pulse-glow ${className}`}
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          {children}
        </span>
        <div className="absolute inset-0 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
      </motion.button>
    </Magnetic>
  );
};

export default CTAButton;
