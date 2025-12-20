
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from './CTAButton';

const DEFAULT_PROXY_URL = 'https://360consulting.up.railway.app';
const proxyBaseUrl = (import.meta.env.VITE_HUBSPOT_PROXY_BASE_URL || DEFAULT_PROXY_URL).replace(/\/+$/, '');

interface AIStrategistProps {
  onConsultClick: () => void;
}

const AIStrategist: React.FC<AIStrategistProps> = ({ onConsultClick }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<null | {
    strategy: string;
    operations: string;
    legacy: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [email, setEmail] = useState('');
  const [isGated, setIsGated] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadingSteps = [
    { text: "Scanning 30 Years of $100M+ Playbooks...", delay: 3500 },
    { text: "Mapping Your Challenge to Proven Frameworks...", delay: 3500 },
    { text: "Synthesizing Elite Operational Logic...", delay: 3500 },
    { text: "Generating Your Personalized Blueprint...", delay: 3500 },
  ];

  const initiateStrategy = async () => {
    if (!input.trim()) return;

    setIsTyping(true);
    setError(null);
    setResult(null);
    setIsGated(false);

    try {
      // Dramatic loading sequence - builds perceived value
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(i);
        await new Promise(r => setTimeout(r, loadingSteps[i].delay));
      }

      // After loading animation, show the gate - API call will happen after email
      setIsGated(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Strategic Sync Failed. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsTyping(true);
    setError(null);

    try {
      // NOW make the actual API call after email is captured
      const response = await fetch(`${proxyBaseUrl}/api/ai/strategist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.trim(), email: email.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Strategic Sync Failed (${response.status})`);
      }

      const parsed = await response.json();
      setResult(parsed);
      setIsGated(false);
      setHasSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Strategic Sync Failed. Please try again.");
      setIsGated(false);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (result && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <section id="ai-strategist" className="py-24 px-6 bg-gray-950 relative overflow-hidden border-y border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF7A3D]/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#FF7A3D]/20 rounded-full bg-[#FF7A3D]/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7A3D] animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#FF7A3D] uppercase">360 AI Strategist v2.0</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase font-heading leading-tight glimmer">
            Solve for <span className="text-gradient">Scale.</span>
          </h2>
          
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Input your current bottleneck. Our neural model provides immediate strategic clarity across growth, operations, and legacy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!isTyping && !isGated && !result && (
              <motion.div 
                key="input-area"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., 'Scaling to $10M ARR but operations are breaking...'"
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-white text-lg font-light outline-none focus:border-[#FF7A3D]/50 focus:bg-white/[0.07] transition-all resize-none placeholder:text-gray-600"
                />
                
                <div className="absolute bottom-6 right-6 flex items-center gap-4">
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest hidden md:block">
                    // Ready for analysis
                  </span>
                  <button
                    onClick={initiateStrategy}
                    disabled={isTyping || !input.trim()}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                      isTyping || !input.trim() 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-[#FF7A3D] text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isTyping ? 'Analyzing...' : 'Generate Roadmap'}
                    {!isTyping && (
                      <motion.span 
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="inline-flex"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </motion.span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {isTyping && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 flex items-center justify-center"
              >
                <div className="glass-premium w-full max-w-lg p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
                  {/* Progress bar */}
                  <motion.div 
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FF7A3D] to-[#FF7A3D]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#FF7A3D]/10 blur-[50px] rounded-full pointer-events-none" />
                  
                  <div className="flex flex-col items-center gap-6">
                    {/* Animated dots */}
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: loadingStep === i ? [1, 1.4, 1] : 1,
                            backgroundColor: loadingStep >= i ? '#FF7A3D' : 'rgba(255,255,255,0.1)'
                          }}
                          transition={{ repeat: loadingStep === i ? Infinity : 0, duration: 0.8 }}
                          className="w-3 h-3 rounded-full"
                        />
                      ))}
                    </div>
                    
                    {/* Step counter */}
                    <p className="text-[10px] font-black tracking-[0.4em] text-[#FF7A3D] uppercase">
                      Step {loadingStep + 1} of {loadingSteps.length}
                    </p>
                    
                    {/* 3D Glass Text with Floor Reflection */}
                    <div className="relative py-8 mb-4">
                      {/* Main text - Bold 3D chrome/glass effect */}
                      <motion.div 
                        key={loadingStep}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative"
                      >
                        {/* Shadow layer for depth */}
                        <h3 
                          className="text-3xl md:text-4xl lg:text-5xl font-black text-center leading-tight tracking-tight uppercase font-heading absolute inset-0"
                          style={{
                            color: 'transparent',
                            textShadow: '0 8px 16px rgba(0,0,0,0.5), 0 16px 32px rgba(0,0,0,0.3)',
                          }}
                          aria-hidden="true"
                        >
                          {loadingSteps[loadingStep]?.text}
                        </h3>
                        
                        {/* Main gradient text */}
                        <h3 
                          className="text-3xl md:text-4xl lg:text-5xl font-black text-center leading-tight tracking-tight uppercase font-heading relative"
                          style={{
                            background: 'linear-gradient(180deg, #ffffff 0%, #e5e5e5 25%, #b0b0b0 50%, #FF7A3D 75%, #FF7A3D 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 2px 4px rgba(255,92,0,0.3))',
                          }}
                        >
                          {loadingSteps[loadingStep]?.text}
                        </h3>
                      </motion.div>
                      
                      {/* Floor / Ground line */}
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4" />
                      
                      {/* Floor reflection - more visible */}
                      <motion.div 
                        key={`reflection-${loadingStep}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.2 }}
                        className="relative mt-1"
                        style={{ 
                          transform: 'scaleY(-1) perspective(500px) rotateX(20deg)',
                          transformOrigin: 'top center',
                          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)',
                        }}
                      >
                        <h3 
                          className="text-3xl md:text-4xl lg:text-5xl font-black text-center leading-tight tracking-tight uppercase font-heading"
                          style={{
                            background: 'linear-gradient(180deg, rgba(255,92,0,0.4) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'blur(1px)',
                          }}
                        >
                          {loadingSteps[loadingStep]?.text}
                        </h3>
                      </motion.div>
                    </div>
                    
                    {/* Subtle instruction */}
                    <p className="text-[9px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                      Building your executive strategy
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 text-center text-xs font-bold uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                ref={scrollRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 relative"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strategic Oversight */}
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-[#FF7A3D]/30 transition-colors group">
                      <span className="text-[#FF7A3D] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Strategic Oversight</span>
                      <p className="text-xl text-white font-light leading-relaxed">
                        {result.strategy}
                      </p>
                    </div>

                    {/* Operational Fix */}
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group">
                      <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Operational Fix</span>
                      <p className="text-xl text-white font-light leading-relaxed">
                        {result.operations}
                      </p>
                    </div>
                  </div>

                  {/* Legacy Blueprint */}
                  <div className="p-10 rounded-[3rem] bg-[#FF7A3D]/10 border border-[#FF7A3D]/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span className="text-[#FF7A3D] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Legacy Blueprint</span>
                    <p className="text-2xl text-white font-medium italic font-heading leading-tight max-w-2xl">
                      "{result.legacy}"
                    </p>
                  </div>

                  <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/5 mt-12">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          const text = `360 STRATEGIC ANALYSIS\n\nSTRATEGY: ${result.strategy}\n\nOPERATIONS: ${result.operations}\n\nLEGACY: ${result.legacy}`;
                          navigator.clipboard.writeText(text);
                          alert("Strategy copied to clipboard.");
                        }}
                        className="px-6 py-3 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                      >
                        Copy Strategy
                      </button>
                      <button 
                        onClick={() => window.print()}
                        className="px-6 py-3 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                      >
                        Print Plan
                      </button>
                    </div>
                    <CTAButton onClick={onConsultClick} className="px-10 py-5">Initiate Full 360 Audit</CTAButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gating Overlay - Shows independently after loading animation */}
            {isGated && !result && (
              <motion.div 
                key="gate"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="mt-16 flex items-center justify-center"
              >
                <div className="glass-premium w-full max-w-md p-10 rounded-[3rem] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] text-center relative overflow-hidden polish-shine">
                  {/* Top accent bar with shimmer */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A3D] via-[#FF7A3D] to-[#FF7A3D]" />
                  
                  {/* Decorative glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF7A3D]/10 blur-[60px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF7A3D]/5 blur-[60px] rounded-full pointer-events-none" />
                  
                  {/* Logo - larger, no box */}
                  <div className="flex items-center justify-center mx-auto mb-8">
                    <img 
                      src="/images/360-logo-new.png" 
                      alt="360 Consulting" 
                      className="h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_0_20px_rgba(255,92,0,0.3)]"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-3 font-heading text-gradient">Your Blueprint Awaits</h3>
                  <p className="text-gray-300 text-sm mb-8 font-medium leading-relaxed">This isn't generic advice. This is <span className="text-white font-bold">elite-level strategy</span> built from 30 years of scaling $100M+ brands. Claim it now.</p>
                  
                  {isTyping ? (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                            className="w-2 h-2 rounded-full bg-[#FF7A3D]"
                          />
                        ))}
                      </div>
                      <p className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Generating your strategy...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleUnlock} className="space-y-4">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="executive@company.com"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-center outline-none focus:border-[#FF7A3D] focus:bg-white/[0.07] transition-all font-mono text-sm"
                      />
                      <button 
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-[#FF7A3D] to-[#FF7A3D] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:from-white hover:to-white hover:text-black transition-all transform hover:scale-[1.02] shadow-[0_8px_32px_rgba(255,92,0,0.25)]"
                      >
                        Reveal Strategy →
                      </button>
                    </form>
                  )}
                  
                  <p className="mt-6 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                    Free • No spam • Unsubscribe anytime
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AIStrategist;
