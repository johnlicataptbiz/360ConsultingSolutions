
import React from 'react';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="py-24 px-8 border-t border-white/5 bg-gray-950 relative overflow-hidden">
      {/* Decorative Glimmer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <img
              src="/images/360-logo-new.png"
              alt="360 Consulting Solutions"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
            <p className="text-gray-400 max-w-xs text-sm font-medium leading-relaxed">
              Strategic logic for elite performance. Winning at work without losing at home.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 text-[11px] font-black uppercase tracking-[0.3em]">
            <Magnetic strength={0.2}>
              <a href="https://www.linkedin.com/company/360-consulting-solutions/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our LinkedIn">LinkedIn</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our Instagram">Instagram</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our Facebook">Facebook</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Privacy Policy">Privacy</a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            © 2025 Jack Licata Design Co
          </p>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest polish-shine">
            Designed for legacy by Jack Licata Design Co
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
