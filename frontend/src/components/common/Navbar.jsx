import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">Aigenix</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
          <a href="#" className="hover:text-cyan-400 transition">Studio</a>
          <a href="#" className="hover:text-cyan-400 transition">Analytics</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white relative">
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#050505]"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
          
          <Link 
            to="/signup" 
            className="px-5 py-2 border border-cyan-500/50 text-cyan-400 text-xs font-bold rounded-full hover:bg-cyan-500/10 transition uppercase tracking-widest"
          >
            Go Pro
          </Link>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border border-white/20 cursor-pointer"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;