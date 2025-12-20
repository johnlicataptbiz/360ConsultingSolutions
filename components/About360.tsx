
import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

interface About360Props {
  onConsultClick: () => void;
}

const About360: React.FC<About360Props> = ({ onConsultClick }) => {
  return (
    <section id="about" className="py-24 px-6 bg-gray-950 overflow-hidden relative">
      {/* Feathering Gradients */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-20 -left-10 text-[20rem] font-black text-white/5 select-none leading-none z-0">360</div>

          <div className="relative z-10">
            <span className="text-[#FF7A3D] font-black uppercase tracking-[0.5em] text-xs mb-6 block">The Principal</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 uppercase tracking-tighter leading-none font-heading">
              About <span className="text-gradient">360.</span>
            </h2>
            <div className="space-y-8 text-gray-300 text-xl font-light leading-relaxed mb-12">
              <p>
                John Licata manages scale. From massive topline revenues to launching 16 successful brands, he understands high-stakes logic. He's partnered with multi-billion dollar corporations and coached hundreds of small business owners—bringing the same elite-level strategy to every engagement.
              </p>
              <p>
                But 360 Consulting Solutions is more than spreadsheets. It is about <span className="text-white font-bold uppercase tracking-widest">Legacy</span>. John brings a perspective forged through 40 years of marriage, 3 children, and 6 grandchildren.
              </p>
              <div className="p-10 rounded-[2.5rem] glass border-[#FF7A3D]/20 bg-[#FF7A3D]/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.066 2 5V21zm14 0c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.066 2 5V21z"></path></svg>
                </div>
                <p className="italic text-gray-100 text-2xl font-medium relative z-10 font-heading">
                  "Success without balance is a debt that never clears. Win at work without losing at home."
                </p>
                <p className="mt-4 text-[#FF7A3D] font-bold uppercase tracking-widest text-sm">— JOHN LICATA</p>
              </div>
            </div>

            <CTAButton onClick={onConsultClick} className="px-10 py-6">
              Book Strategy Session
            </CTAButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]"
        >
          {/* Row 1 / Col 1: Paris (Tall) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="row-span-2 relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-jonna-paris.jpg" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Paris" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">Paris</span>
            </div>
          </motion.div>

          {/* Row 1 / Col 2: Everest */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-jonna-everest.jpg" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Everest" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">Everest</span>
            </div>
          </motion.div>

          {/* Row 1 / Col 3: Suit (Headshot) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="row-span-1 relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-suit.jpg" className="w-full h-full object-cover object-top grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="John" />
          </motion.div>

          {/* Row 2 / Col 2: SpaceX */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-jonna-spacex.jpg" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="SpaceX" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">SpaceX</span>
            </div>
          </motion.div>

          {/* Row 2 / Col 3: Vineyard */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-vineyard.jpg" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Vineyard" />
             <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">Legacy Logic</span>
            </div>
          </motion.div>

          {/* Row 3 / Col 1: Family (Wide) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-2 relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-family-final.jpg" className="w-full h-full object-cover object-[50%_20%] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Family" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">The Core Foundation</span>
            </div>
          </motion.div>

          {/* Row 3 / Col 3: Sunset */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 group bg-gray-900"
          >
            <img src="/images/john-jonna-sunset.jpg" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Sunset" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">Sunset</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About360;
