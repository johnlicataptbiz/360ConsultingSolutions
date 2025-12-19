
import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

interface About360Props {
  onConsultClick: () => void;
}

const About360: React.FC<About360Props> = ({ onConsultClick }) => {
  return (
    <section id="about" className="py-40 px-6 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-20 -left-10 text-[20rem] font-black text-white/5 select-none leading-none z-0">40</div>
          
          <div className="relative z-10">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-xs mb-6 block">The Principal</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 uppercase tracking-tighter leading-none font-heading">
              About <span className="text-gradient">360.</span>
            </h2>
            <div className="space-y-8 text-gray-300 text-xl font-light leading-relaxed mb-12">
              <p>
                John Licata manages scale. From massive topline revenues to launching 16 successful brands, he understands high-stakes logic.
              </p>
              <p>
                But 360 Consulting Solutions is more than spreadsheets. It is about <span className="text-white font-bold uppercase tracking-widest">Legacy</span>. John brings a perspective forged through 40 years of marriage, 3 children, and 6 grandchildren.
              </p>
              <div className="p-10 rounded-[2.5rem] glass border-orange-500/20 bg-orange-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.066 2 5V21zm14 0c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.066 2 5V21z"></path></svg>
                </div>
                <p className="italic text-gray-100 text-2xl font-medium relative z-10 font-heading">
                  "Success without balance is a debt that never clears. Win at work without losing at home."
                </p>
                <p className="mt-4 text-orange-500 font-bold uppercase tracking-widest text-sm">— JOHN LICATA</p>
              </div>
            </div>

            <CTAButton onClick={onConsultClick} className="px-10 py-6">
              Book Strategy Session
            </CTAButton>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
        >
            <div className="relative overflow-hidden rounded-[3rem] w-full aspect-[16/10] group">
                <img 
                    src="https://360-consulting-solutions-johnlicata.surge.sh/images/john-family-final.jpg" 
                    className="w-full h-full object-cover" 
                    alt="John Licata Family" 
                />
            </div>
            
            <div className="grid grid-cols-2 gap-6 h-[300px]">
                 <div className="relative overflow-hidden rounded-[3rem] group h-full">
                    <img 
                        src="https://360-consulting-solutions-johnlicata.surge.sh/images/john-suit.jpg" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        alt="John Licata" 
                    />
                 </div>
                 <div className="relative overflow-hidden rounded-[3rem] group h-full">
                    <img 
                        src="https://360-consulting-solutions-johnlicata.surge.sh/images/john-sunset.jpg" 
                        className="w-full h-full object-cover" 
                        alt="Legacy" 
                    />
                 </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About360;
