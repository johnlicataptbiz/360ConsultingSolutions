
import React from 'react';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="py-24 px-8 border-t border-white/5 bg-gray-950 relative overflow-hidden">
      {/* Decorative Glimmer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A3D]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/360-logo-new.png"
                alt="360"
                className="h-16 w-12 object-cover object-left brightness-0 invert"
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

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Designed for legacy™ by Jack Licata Design Co
              </p>
              <p className="text-[10px] text-gray-400 font-medium max-w-xl leading-loose uppercase tracking-[0.1em]">
                Disclaimer: 360 AI Strategist provides strategic frameworks based on 30 years of retail logic. Results are for analytical purposes and do not constitute legal or financial advice. Implementation is at the user's discretion.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full inline-block">
                Professional Advisory • Built for Scale
              </p>
              <div className="flex gap-6 mt-2">
                <a href="#" className="text-[9px] text-gray-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Terms of Service</a>
                <a href="#" className="text-[9px] text-gray-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Cookie Policy</a>
                <a href="#" className="text-[9px] text-gray-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Compliance</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.02] gap-4">
            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
              © 2025 Jack Licata Design Co • All Rights Reserved
            </p>
            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
              Authorized for global distribution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
