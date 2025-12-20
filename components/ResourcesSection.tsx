
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, ArrowRight, Sparkles, Zap } from 'lucide-react';

interface ResourcesSectionProps {
    onConsultClick: () => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onConsultClick }) => {
    const guides = [
        {
            title: "The Scale Blueprint",
            type: "E-Guide",
            description: "A comprehensive roadmap for founders moving from founder-led to system-driven growth.",
            icon: <BookOpen className="text-[#FF7A3D]" size={24} />
        },
        {
            title: "Operational Audit Checklist",
            type: "Checklist",
            description: "Identify hidden bottlenecks in your current workflows with this 50-point framework.",
            icon: <FileText className="text-[#FF7A3D]" size={24} />
        },
        {
            title: "Supply Chain Logic",
            type: "Handbook",
            description: "Decades of retail experience condensed into high-velocity supply chain strategies.",
            icon: <Zap className="text-[#FF7A3D]" size={24} />
        },
        {
            title: "Bottleneck Buster",
            type: "Framework",
            description: "A surgical method for identifying and removing constraints in execution speed.",
            icon: <ArrowRight className="text-[#FF7A3D]" size={24} />
        },
        {
            title: "Executive Presence Guide",
            type: "Playbook",
            description: "Developing the clarity and composure that accelerate leadership credibility.",
            icon: <Sparkles className="text-[#FF7A3D]" size={24} />
        },
        {
            title: "Legacy Building Logic",
            type: "E-Book",
            description: "Building lasting professional impact without sacrificing personal relationships.",
            icon: <BookOpen className="text-[#FF7A3D]" size={24} />
        }
    ];

    return (
        <section id="resources" className="py-24 px-6 bg-gray-950 overflow-hidden relative">
            {/* Feathering Gradients */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-24 items-end mb-24">
                    <div className="lg:w-2/3">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#FF7A3D] text-[10px] font-black tracking-[0.5em] uppercase mb-6 block"
                        >
                            Legacy Tools
                        </motion.span>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-heading leading-tight glimmer">
                            Founder <br /> <span className="text-gradient">Resources.</span>
                        </h2>
                        <p className="mt-8 text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                            Strategic Frameworks for high-stakes growth. Unlock the exact systems used to scale 16 brands from zero to market leaders.
                        </p>
                    </div>
                    <div className="lg:w-1/3">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-10 rounded-[3rem] bg-gradient-to-br from-[#FF7A3D]/20 to-[#FF7A3D]/5 border border-[#FF7A3D]/30 backdrop-blur-xl relative group overflow-hidden cursor-pointer"
                            onClick={onConsultClick}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <Sparkles size={40} className="text-[#FF7A3D]" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A3D] mb-6">Coming Q1 2026</p>
                            <h3 className="text-3xl font-black uppercase font-heading tracking-tighter mb-4">The '360' <br /> Master Series</h3>
                            <p className="text-gray-400 font-light text-sm mb-0">Join the waitlist for exclusive access to my upcoming e-book series on holistic business health.</p>
                        </motion.div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-12 bg-white/[0.02] border border-white/10 rounded-[3rem] hover:border-[#FF7A3D]/50 transition-all duration-500 relative polish-shine"
                            aria-label={guide.title}
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#FF7A3D] group-hover:text-white transition-all duration-500">
                                    {guide.icon}
                                </div>
                                <span className="px-5 py-2 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] bg-black/50 text-gray-400">
                                    {guide.type}
                                </span>
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter uppercase font-heading mb-4 group-hover:text-[#FF7A3D] transition-colors">{guide.title}</h3>
                            <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light group-hover:text-white transition-colors">{guide.description}</p>
                            
                            {guide.title === "The Scale Blueprint" ? (
                                <div className="space-y-8">
                                    <div className="flex flex-col gap-4">
                                        <a 
                                            href="https://gumroad.com" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A3D] group-hover:text-white transition-colors"
                                        >
                                            Get Access <ArrowRight size={18} />
                                        </a>
                                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.2em]">
                                            * License-protected access
                                        </p>
                                    </div>
                                    
                                    <div className="pt-8 border-t border-white/5">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">How it works</p>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { step: "01", text: "Download Guide (Optional)" },
                                                { step: "02", text: "Run the Workbook" },
                                                { step: "03", text: "Book a Results Debrief" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <span className="text-[10px] font-black text-[#FF7A3D]">{item.step}</span>
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A3D]">
                                    Coming Soon <ArrowRight size={18} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResourcesSection;
