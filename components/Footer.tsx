
import React from 'react';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-8 border-t border-white/5 bg-gray-950">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black text-sm">360</div>
              <span className="font-black tracking-tighter text-xl font-heading uppercase">360 CONSULTING</span>
            </div>
            <p className="text-gray-500 max-w-xs text-sm font-medium leading-relaxed">
              Strategic logic for elite performance. Winning at work without losing at home.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 text-[11px] font-black uppercase tracking-[0.3em]">
            <Magnetic strength={0.2}>
              <a href="https://www.linkedin.com/company/360-consulting-solutions/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">Facebook</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            © 2025 360 Consulting Solutions. All Rights Reserved.
          </p>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Designed for Legacy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
