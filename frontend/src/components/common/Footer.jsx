import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050505] py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-xs font-mono uppercase tracking-tight">
          © {currentYear} AIGENIX AI Systems. All rights reserved.
        </div>
        
        <div className="flex gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            System Status
          </a>
          <a href="#" className="hover:text-white transition">Documentation</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;