
import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import CTAButton from './CTAButton';

interface BlogHubProps {
  onConsultClick: () => void;
}

const BlogHub: React.FC<BlogHubProps> = ({ onConsultClick }) => {
  return (
    <section id="blog" className="py-40 px-6 bg-gray-950 relative overflow-hidden">
      {/* Feathering Gradients */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#FF7A3D] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block"
            >
              Resources
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-heading leading-none">
              Strategic <br /> <span className="text-gradient">Insights.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', 'Business', 'Leadership', 'Personal'].map((tag) => (
              <button key={tag} aria-label={`Filter by ${tag}`} className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 mb-24">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group flex flex-col h-full"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] mb-8 aspect-[16/10] bg-gray-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-4 py-1.5 rounded-full glass text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 px-2">
                <span className="text-[#FF7A3D] text-[10px] font-black tracking-widest uppercase mb-4">
                  {post.date}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-4 font-heading group-hover:text-[#FF7A3D] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-lg font-light line-clamp-2 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Article <span className="text-[#FF7A3D]">→</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center">
          <CTAButton onClick={onConsultClick} strength={0.6} className="px-16 py-8 text-sm">
            Book Strategy Session
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default BlogHub;
