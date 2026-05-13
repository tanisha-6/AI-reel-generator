import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-white">
            Ai<span className="text-cyan-400">Shot</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight text-gray-400">
          <a href="#features" className="hover:text-cyan-400 transition">Features</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition">How it Works</a>
          <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-300 hover:text-white transition px-3 py-2"
          >
            Login
          </Link>
          <button 
            onClick={() => navigate('/signup')}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;