import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Film, Users, TrendingUp, Shield } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEarlyAccess = () => {
    if (email && email.includes('@')) {
      navigate('/signup', { state: { email } });
    } else {
      alert('Please enter a valid email');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Cleaner, more compact */}
      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28 flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          className="flex-1 space-y-6 z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            AI-Powered Script Generator
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight">
            Create Viral <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Short-Form Scripts
            </span>
            <br /> in Seconds
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-400 max-w-md text-base leading-relaxed">
            Generate scroll-stopping hooks, scene‑by‑scene breakdowns, and viral CTAs for TikTok, Reels, and Shorts. Used by 10,000+ creators.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
            >
              Start Creating Free
            </button>
            <button 
              onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors"
            >
              Watch Demo
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-[#050505] flex items-center justify-center text-xs font-bold text-white">
                  {String.fromCharCode(64+i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-white font-bold">10k+</span> creators already using
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          className="flex-1 relative w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-[0_0_50px_rgba(34,211,238,0.1)] backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-lg border border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles size={16} />
                  <span className="text-xs font-mono">AI Synthesis Active</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden w-3/4">
                    <motion.div className="h-full bg-cyan-500 rounded-full" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1.5 }} />
                  </div>
                  <p className="text-sm font-mono text-gray-300">Generating hook...</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-cyan-400">Hook Score</p>
                    <p className="text-2xl font-bold">94<span className="text-xs">%</span></p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-cyan-400">Est. Views</p>
                    <p className="text-2xl font-bold">1.2M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section (unchanged) */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Everything you need to go viral</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">No more blank pages. Let AI handle the structure while you focus on performance.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Generate a complete script in under 10 seconds. Iterate instantly." },
            { icon: <Film className="w-6 h-6" />, title: "Scene Breakdown", desc: "Timestamped visual & narrative cues. Perfect for filming." },
            { icon: <TrendingUp className="w-6 h-6" />, title: "Viral Optimization", desc: "AI trained on millions of winning short-form videos." },
            { icon: <Users className="w-6 h-6" />, title: "Creator Community", desc: "Access trending formats and successful hooks." },
            { icon: <Shield className="w-6 h-6" />, title: "100% Original", desc: "Every script is unique and plagiarism‑free." },
            { icon: <Sparkles className="w-6 h-6" />, title: "AI Thumbnails", desc: "Generated thumbnails tailored to your script." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl mb-6 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works (unchanged) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Three steps to your next viral hit</h2>
          <p className="text-gray-400">Simple. Fast. Effective.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Input Your Topic", desc: "Just a topic or a rough idea. Our AI handles the rest." },
            { step: "02", title: "AI Generates Script", desc: "Get a complete script with hook, scenes, and CTA in seconds." },
            { step: "03", title: "Record & Upload", desc: "Follow the scene breakdown or tweak it. Then go viral." }
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-6xl font-black text-cyan-500/20 mb-4">{step.step}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section (unchanged) */}
      <section id="demo" className="max-w-5xl mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Ready to create your next viral script?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-10 text-lg">Join thousands of creators who trust AiShot to fuel their content engine.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button 
              onClick={handleEarlyAccess}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
            >
              Get Started Free
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-6">No credit card required. Free tier includes 5 scripts.</p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;