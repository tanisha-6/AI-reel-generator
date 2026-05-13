import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Film, Users, TrendingUp, Shield, ChevronRight } from 'lucide-react';
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#030303] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="flex-1 space-y-8 text-center lg:text-left z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em]">
              <Sparkles size={12} className="animate-pulse" />
              Next-Gen Scripting Engine
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase">
              Script Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Viral Breakout
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-gray-400 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed font-medium">
              Turn a single sentence into a high-retention script with hooks, scene breakdowns, and CTAs optimized for the algorithm.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors shadow-xl shadow-white/5"
              >
                Get Started Free
              </button>
              {/* <button 
                onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Watch Demo <ChevronRight size={14} />
              </button> */}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 pt-4 opacity-60">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-[#030303] flex items-center justify-center text-[10px] font-bold uppercase">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Trusted by <span className="text-white">12,000+</span> Content Creators
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Dashboard Preview */}
          <motion.div 
            className="flex-1 w-full lg:max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-50" />
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-2 md:p-4 shadow-2xl backdrop-blur-xl">
                <div className="aspect-[4/3] rounded-2xl bg-[#050505] border border-white/5 overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-white/5 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                      </div>
                      <div className="px-3 py-1 bg-white/5 rounded text-[9px] font-mono text-gray-500">studio_v2.ai</div>
                   </div>
                   <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <div className="h-4 w-1/3 bg-cyan-500/20 rounded animate-pulse" />
                        <div className="h-8 w-full bg-white/5 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                           <div className="h-2 w-1/2 bg-gray-700 rounded mb-4" />
                           <div className="h-8 w-3/4 bg-white/10 rounded" />
                        </div>
                        <div className="h-24 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                           <div className="h-2 w-1/2 bg-gray-700 rounded mb-4" />
                           <div className="h-8 w-1/2 bg-cyan-500/20 rounded" />
                        </div>
                      </div>
                      <div className="space-y-3">
                         <div className="h-2 w-full bg-white/5 rounded" />
                         <div className="h-2 w-[90%] bg-white/5 rounded" />
                         <div className="h-2 w-[70%] bg-white/5 rounded" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - Compact Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Master the Algorithm</h2>
          <p className="text-gray-500 font-medium">Tools designed to maximize retention and spark engagement across every vertical platform.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Zap />, title: "Instant Generation", desc: "Go from topic idea to production-ready script in less than 5 seconds." },
            { icon: <Film />, title: "Visual Direction", desc: "Detailed scene breakdowns with camera movements and visual cues included." },
            { icon: <TrendingUp />, title: "Retention Logic", desc: "Trained on millions of hours of high-performing short-form content." },
            { icon: <Users />, title: "Style Cloning", desc: "Mimic your favorite creator's tone or maintain your unique brand voice." },
            { icon: <Shield />, title: "Plagiarism Guard", desc: "AI ensures every script is 100% unique to pass platform originality checks." },
            { icon: <Sparkles />, title: "Hook Architect", desc: "Generate 5 variations of high-converting hooks for every project." }
          ].map((feature, i) => (
            <div 
              key={i}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
            >
              <div className="w-10 h-10 bg-white/5 rounded-xl mb-6 flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors">
                {React.cloneElement(feature.icon, { size: 20 })}
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps - Simplified & reduced spacing */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 bg-[#070707] rounded-[3rem] my-10 border border-white/5">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">The Workflow</h2>
            <p className="text-gray-500 font-medium">Streamlined from start to finish. Focus on filming, not writing.</p>
          </div>
          <div className="lg:w-2/3 grid md:grid-cols-3 gap-8">
            {[
              { num: "01", t: "Concept", d: "Drop a topic or URL as your base." },
              { num: "02", t: "Develop", d: "AI crafts the structure & scenes." },
              { num: "03", t: "Deploy", d: "Copy, film, and watch it trend." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="text-5xl font-black text-white/5 absolute -top-4 -left-2 select-none">{step.num}</span>
                <div className="relative z-10 pl-2">
                  <h3 className="font-black uppercase text-sm mb-2 text-cyan-400 tracking-widest">{step.t}</h3>
                  <p className="text-gray-400 text-sm font-medium">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Professional & Focused */}
      <section id="demo" className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-10 md:p-20 text-center">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Your Viral Era <br /> Starts Today
            </h2>
            <p className="text-gray-400 font-medium">Join 12,000+ creators who have automated their scriptwriting process. No credit card required.</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl sm:rounded-full">
              <input 
                type="email" 
                placeholder="creator@yourbrand.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full flex-1 bg-transparent px-6 py-3 text-sm focus:outline-none placeholder:text-gray-600"
              />
              <button 
                onClick={handleEarlyAccess}
                className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-black rounded-xl sm:rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all whitespace-nowrap"
              >
                Start Creating
              </button>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Free forever tier • 5 Scripts per month • Pro features available
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;