
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles, AlertCircle, TrendingUp, Cpu, Workflow } from 'lucide-react';
import { getBusinessAnalysis } from '../services/gemini';
import { AnalysisResult } from '../types';
import CTAButton from './CTAButton';

interface ProcessSectionProps {
  onConsultClick: () => void;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ onConsultClick }) => {
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await getBusinessAnalysis(challenge);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="process" className="py-40 px-6 bg-gray-950 overflow-hidden relative">
      {/* Feathering Gradients */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />

      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-500 uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            BETA: 360 AI STRATEGIST
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase font-heading">
            Get a 360 <br />
            <span className="text-gradient">Perspective.</span>
          </h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
            Tell our AI strategist what your biggest business hurdle is right now. We'll give you a high-level strategic, operational, and growth-focused breakdown.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleAnalyze}
            className="relative mb-16"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-[2.5rem] blur opacity-75 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative">
              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="e.g., 'We are struggling to maintain service quality while scaling our client base...'"
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-lg text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all min-h-[180px] resize-none shadow-2xl"
              />
              <button
                type="submit"
                disabled={loading || !challenge.trim()}
                className="absolute bottom-6 right-6 p-5 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
              </button>
            </div>
          </motion.form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-200 mb-12 backdrop-blur-sm"
              >
                <AlertCircle className="shrink-0 text-red-500" />
                <p>{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: 'Strategy', content: result.strategy, icon: <TrendingUp className="text-orange-500" /> },
                    { title: 'Operations', content: result.operations, icon: <Workflow className="text-blue-500" /> },
                    { title: 'Growth', content: result.growth, icon: <Cpu className="text-purple-500" /> }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">{item.title}</h4>
                      <p className="text-gray-300 leading-relaxed font-light">{item.content}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative group mt-12"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative p-12 bg-gray-900/80 border border-white/10 rounded-[3rem] backdrop-blur-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="max-w-xl">
                        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-gradient font-heading">360 Executive Summary</h3>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">{result.summary}</p>
                      </div>
                      <div className="shrink-0">
                        <CTAButton onClick={onConsultClick} className="px-10 py-5 whitespace-nowrap">
                          Discuss This Plan
                        </CTAButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.3em]">
                Your Strategy Roadmap starts here
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
