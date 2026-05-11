import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Landing = () => {
    const navigate = useNavigate();

    const [landingForm, setLandingForm] = useState({
    username: '',
    email: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLandingForm({
            ...landingForm,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleGetStarted = () => {
        const newErrors = {};

        if (!landingForm.username.trim()) {
            newErrors.username = 'Creator name is required';
        }

        if (!landingForm.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(landingForm.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate('/signup', {
            state: {
                username: landingForm.username,
                email: landingForm.email,
            },
            });
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
        <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col md:flex-row items-center gap-12">
            {/* Background Ambient Glow */}
            <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            <motion.div 
            className="flex-1 space-y-8 z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                ✦ System Online
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold leading-[1.1] tracking-tighter">
                Ignite Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                Viral Growth
                </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-gray-400 max-w-md text-lg leading-relaxed">
                The ultimate command center for high-output AI creators. Orchestrate content across every platform with cinematic precision.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                <button 
                onClick={() => document.getElementById('register-form').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
                >
                Initialize Engine
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                View Roadmap
                </button>
            </motion.div>
            </motion.div>

            {/* Hero Visual Mockup */}
            <motion.div 
            className="flex-1 relative w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-[0_0_50px_rgba(34,211,238,0.1)] backdrop-blur-sm">
                <div className="aspect-video bg-black rounded-lg border border-white/5 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">Active Stream: 09</p>
                        <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-75"></div>
                        </div>
                    </div>
                    <div className="h-[2px] w-full bg-cyan-500/50 shadow-[0_0_15px_cyan] overflow-hidden">
                        <motion.div 
                        className="h-full bg-white w-1/3" 
                        animate={{ x: ['-100%', '300%'] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/5 rounded-xl border border-white/5 p-4 hover:border-cyan-500/30 transition-colors">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Engagement</p>
                    <p className="text-2xl font-bold text-cyan-400 tracking-tight">+142%</p>
                    </div>
                    <div className="bg-white/5 rounded-xl border border-white/5 p-4">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">AI Synthesis</p>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '74%' }}
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full"
                        />
                    </div>
                    </div>
                </div>
            </div>
            </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: "AI Orchestration", desc: "Automate your entire creative pipeline with our proprietary neural engine.", icon: "✦" },
                { title: "Deep Analytics", desc: "Visualize the pulse of your audience. Every metric, every interaction analyzed.", icon: "⚡" },
                { title: "Media Command", desc: "Manage petabytes of high-definition assets in a cloud-native library.", icon: "▣" }
            ].map((f, i) => (
                <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
                >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl mb-6 flex items-center justify-center text-cyan-400 text-xl font-bold group-hover:scale-110 transition-transform">
                    {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
            ))}
            </div>
        </section>

        {/* Registration Form Section */}
        <section id="register-form" className="max-w-5xl mx-auto px-6 py-32">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-purple-500/5"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10" />
            
            <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Join the Command Center
            </h2>
            <p className="text-gray-400 max-w-sm mx-auto uppercase text-xs tracking-[0.2em] font-semibold">
                Start creating viral AI-powered content
            </p>
            </div>

            <form className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Creator Name
                </label>

                <input
                type="text"
                name="username"
                value={landingForm.username}
                onChange={handleChange}
                placeholder="@username"
                className={`w-full bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all placeholder:text-gray-700 focus:ring-1 ${
                errors.username
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/30'
                }`}
                />
                {errors.username && (
                    <p className="text-red-400 text-xs mt-1">
                        {errors.username}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                Email Address
                </label>

                <input
                    type="email"
                    name="email"
                    value={landingForm.email}
                    onChange={handleChange}
                    placeholder="creator@aigenix.ai"
                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 outline-none transition-all placeholder:text-gray-700 focus:ring-1 ${
                    errors.email
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/30'
                    }`}
                />
                {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={handleGetStarted}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-cyan-500/10 active:scale-95"
                >
                Get Started
                </button>
            

            <p className="text-center text-gray-500 text-sm mt-8">
                Already registered?{" "}
                <Link
                to="/login"
                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline-offset-4 hover:underline"
                >
                Login here
                </Link>
            </p>
            </form>
        </motion.div>
        </section>

        <Footer />
        </div>
    );
};

export default Landing;