import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import AIStrategist from './components/AIStrategist';
import BentoServices from './components/BentoServices';
import MarqueePartners from './components/MarqueePartners';
import About360 from './components/About360';
import ResourcesSection from './components/ResourcesSection';
import BlogHub from './components/BlogHub';
import Footer from './components/Footer';
import ConsultModal from './components/ConsultModal';
import LaunchPathModal from './components/LaunchPathModal';
import FinalCTA from './components/FinalCTA';

import { ServiceItem } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaunchPathOpen, setIsLaunchPathOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const openModal = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const openServiceModal = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const openLaunchPath = () => setIsLaunchPathOpen(true);
  const closeLaunchPath = () => setIsLaunchPathOpen(false);

  return (
    <div className="relative min-h-screen bg-gray-950 text-white selection:bg-[#FF7A3D] selection:text-white">
      <motion.div className="progress-bar" style={{ scaleX }} />
      
      {/* Content Wrapper that scales while modal is open */}
      <motion.div
        animate={{ 
          scale: (isModalOpen || isLaunchPathOpen) ? 0.95 : 1,
          opacity: (isModalOpen || isLaunchPathOpen) ? 0.4 : 1,
          filter: (isModalOpen || isLaunchPathOpen) ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="origin-top"
      >
        <Navbar onConsultClick={openModal} />

        <main>
          <div className="relative z-10 flex flex-col gap-0">
            <Hero onConsultClick={openModal} />
            <ValueProp />
            <MarqueePartners />
            <BentoServices onConsultClick={openServiceModal} onLaunchPathClick={openLaunchPath} />
            <AIStrategist onConsultClick={openModal} />
            <ResourcesSection onConsultClick={openModal} />
            <About360 onConsultClick={openModal} />
            <FinalCTA onConsultClick={openModal} />
            <BlogHub onConsultClick={openModal} />
          </div>
        </main>

        <Footer />
      </motion.div>

      <AnimatePresence>
        {isModalOpen && <ConsultModal onClose={closeModal} selectedService={selectedService} />}
      </AnimatePresence>

      <LaunchPathModal isOpen={isLaunchPathOpen} onClose={() => setIsLaunchPathOpen(false)} />
    </div>
  );
};

export default App;
