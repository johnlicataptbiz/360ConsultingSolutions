
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ValueProp: React.FC = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = "REVENUE. SYSTEMS. LEGACY. WE SHORTEN YOUR TRAJECTORY TO SUCCESS. BALANCE IS NOT A LUXURY—IT IS THE LOGIC OF ELITE PERFORMANCE.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="py-40 px-6 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-950/80 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-partners-working-together-in-office-43394-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const color = useTransform(
              scrollYProgress, 
              [start * 0.8, end * 0.8 + 0.1], 
              ["#1f2937", "#ffffff"]
            );

            return (
              <motion.span 
                key={i} 
                style={{ color }}
                className="text-4xl md:text-7xl font-black tracking-tighter uppercase transition-colors duration-200 font-heading"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
