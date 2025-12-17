
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import ProcessSection from './components/ProcessSection';
import BentoServices from './components/BentoServices';
import MarqueePartners from './components/MarqueePartners';
import About360 from './components/About360';
import BlogHub from './components/BlogHub';
import Footer from './components/Footer';
import ConsultModal from './components/ConsultModal';
import FinalCTA from './components/FinalCTA';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-gray-950 text-white selection:bg-orange-500 selection:text-white">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navbar onConsultClick={openModal} />
      
      <main>
        <Hero onConsultClick={openModal} />
        <ValueProp />
        <ProcessSection onConsultClick={openModal} />
        <BentoServices onConsultClick={openModal} />
        <MarqueePartners />
        <About360 onConsultClick={openModal} />
        <BlogHub onConsultClick={openModal} />
        <FinalCTA onConsultClick={openModal} />
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && <ConsultModal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
