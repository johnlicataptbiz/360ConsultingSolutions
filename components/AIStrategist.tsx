
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import CTAButton from './CTAButton';

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
    "Analyzing operational bottlenecks...",
    "Scanning revenue growth opportunities...",
    "Synthesizing 30 years of retail logic...",
    "Formulating 360 Legacy Roadmap..."
  ];

  const generateStrategy = async () => {
    if (!input.trim()) return;

    setIsTyping(true);
    setError(null);
    setResult(null);
    setIsGated(false);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    
    if (!apiKey || apiKey === "INSERT_YOUR_API_KEY_HERE") {
      setError("AI Module Offline: API Configuration Required.");
      setIsTyping(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        You are John Licata, Principal of 360 Consulting Solutions. You have 30 years of experience in retail, footwear (launching 16 brands), and managing massive topline revenues. Your philosophy is "Winning at work without losing at home." You value High-Stakes Logic and Legacy.

        The user is seeking your expert advice on: "${input}"

        Analyze the challenge through three lenses:
        1. STRATEGIC OVERSIGHT: High-level growth logic.
        2. OPERATIONAL FIX: Direct action for efficiency.
        3. LEGACY BLUEPRINT: Personal balance and long-term impact.

        Provide a response in exactly this JSON format:
        {
          "strategy": "Your strategic advice...",
          "operations": "Your operational advice...",
          "legacy": "Your legacy advice..."
        }
        
        Rules:
        - Be direct, elite, and slightly provocative.
        - Avoid generic corporate speak.
        - Maximum 3 sentences per field.
        - Use "I" (as in "I suggest..." or "In my experience...") to maintain the persona.
      `;

      // Simulate loading steps for flair
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(i);
        await new Promise(r => setTimeout(r, 600));
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Basic JSON cleanup if model wraps it in markdown
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      
      setResult(parsed);
      setIsGated(true);
    } catch (err: any) {
      console.error(err);
      setError("Strategic Sync Failed. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    // In a real app, send email to HubSpot/CRM here
    setIsGated(false);
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (result && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <section id="ai-strategist" className="py-40 px-6 bg-gray-950 relative overflow-hidden border-y border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-orange-500/20 rounded-full bg-orange-500/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] text-orange-500 uppercase">360 AI Strategist v2.0</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase font-heading leading-tight">
            Solve for <span className="text-gradient">Scale.</span>
          </h2>
          
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Input your current bottleneck. Our neural model provides immediate strategic clarity across growth, operations, and legacy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'Scaling to $10M ARR but operations are breaking...'"
              className="w-full h-48 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-white text-lg font-light outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all resize-none placeholder:text-gray-600"
            />
            
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest hidden md:block">
                // Ready for analysis
              </span>
              <button
                onClick={generateStrategy}
                disabled={isTyping || !input.trim()}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                  isTyping || !input.trim() 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-orange-500 text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95'
                }`}
              >
                {isTyping ? 'Analyzing...' : 'Generate Roadmap'}
                {!isTyping && <span className="text-sm">⚡</span>}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isTyping && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 flex flex-col items-center justify-center gap-4"
              >
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-orange-500"
                    />
                  ))}
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase animate-pulse">
                  {loadingSteps[loadingStep]}
                </p>
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
                <div className={`space-y-6 transition-all duration-700 ${isGated ? 'blur-xl grayscale pointer-events-none' : ''}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strategic Oversight */}
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors group">
                      <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Strategic Oversight</span>
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
                  <div className="p-10 rounded-[3rem] bg-orange-500/10 border border-orange-500/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span className="text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Legacy Blueprint</span>
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

                {/* Gating Overlay */}
                <AnimatePresence>
                  {isGated && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="absolute inset-0 z-50 flex items-center justify-center p-4"
                    >
                      <div className="glass w-full max-w-md p-10 rounded-[3rem] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                        
                        <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">🔒</div>
                        
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 font-heading">Secure Your Roadmap</h3>
                        <p className="text-gray-400 text-sm mb-8 font-medium">Your strategy is ready. Enter your executive email to reveal the high-stakes logic for your scale.</p>
                        
                        <form onSubmit={handleUnlock} className="space-y-4">
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="executive@company.com"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-center outline-none focus:border-orange-500 transition-all font-mono text-sm"
                          />
                          <button 
                            type="submit"
                            className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all transform hover:scale-105"
                          >
                            Reveal Strategy →
                          </button>
                        </form>
                        
                        <p className="mt-6 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                          By continuing, you agree to our 360 Legacy Briefing.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AIStrategist;
