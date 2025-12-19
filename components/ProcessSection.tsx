
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

interface ProcessSectionProps {
  onConsultClick: () => void;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ onConsultClick }) => {
  const [input, setInput] = useState('');

  return (
    <section id="process" className="py-32 px-6 bg-gray-950 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
            >
                <span className="text-orange-500 text-lg">✨</span>
                <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">Beta: 360 AI Strategist</span>
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase font-heading"
            >
                Get a <span className="text-gradient">360 Perspective.</span>
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto"
            >
                Tell our AI strategist what your biggest business hurdle is right now. We'll give you a high-level strategic, operational, and growth-focused breakdown.
            </motion.p>

            <motion.div 
                className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-xl relative group focus-within:border-orange-500/50 transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g., 'I'm stuck at $2M ARR and can't seem to scale my operations without burning out my team...'"
                    className="w-full h-40 bg-transparent text-white p-6 outline-none resize-none placeholder:text-gray-600 font-light text-lg"
                />
                <div className="flex justify-between items-center px-4 pb-2">
                    <span className="text-xs text-gray-600 font-mono text-left pl-2">
                        // AI ANALYSIS MODULE
                    </span>
                    <CTAButton onClick={onConsultClick} className="py-3 px-6 text-[10px]">
                        Generate Strategy
                    </CTAButton>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16"
            >
                 <span className="text-[10px] tracking-[0.4em] text-gray-500 font-bold uppercase">Your Strategy Roadmap Starts Here</span>
            </motion.div>
        </div>
    </section>
  );
};

export default ProcessSection;
