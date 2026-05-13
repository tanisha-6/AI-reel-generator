import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Library, 
  Image as ImageIcon, 
  Plus, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const mainNav = [
    { icon: <LayoutDashboard size={18}/>, label: "Dashboard", path: "/dashboard" },
    { icon: <Sparkles size={18}/>, label: "AI Studio", path: "/studio" },
    { icon: <Library size={18}/>, label: "Library", path: "/library" },
    // { icon: <ImageIcon size={18}/>, label: "Thumbnail Lab", path: "/thumbnails" },
  ];

  const secondaryNav = [
    { icon: <Settings size={18}/>, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={18}/>, label: "Support", path: "/support" },
  ];

  const handleNewProject = () => {
    navigate('/studio');
  };

  return (
    <aside className="w-64 border-r border-white/5 flex flex-col bg-[#080808] h-screen sticky top-0 z-50 overflow-hidden">
      
{/* 1. BRANDING SECTION */}
<div className="p-6 pb-2">
  <div className="flex items-center gap-3 mb-2 px-2">
    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
      <Sparkles size={22} className="text-white" />
    </div>
    <h2 className="text-2xl font-black tracking-tighter text-white uppercase">
      Ai<span className="text-cyan-400">Shot</span>
    </h2>
  </div>
</div>

      {/* 2. NAVIGATION SECTION */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
        
        {/* Main Menu */}
        <div className="space-y-1">
          <label className="px-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.25em] mb-3 block">Command Center</label>
          {mainNav.map((item) => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
          ))}
        </div>

        {/* System Menu */}
        {/* <div className="space-y-1">
          <label className="px-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.25em] mb-3 block">Preferences</label>
          {secondaryNav.map((item) => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
          ))}
        </div> */}
      </nav>

      {/* 3. FOOTER / USER SECTION */}
      <div className="p-4 mt-auto border-t border-white/5 bg-white/[0.01]">
        {/* Create New CTA */}
        <button 
          onClick={handleNewProject}
          className="w-full py-3 mb-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl font-black uppercase text-[10px] tracking-[0.15em] text-white shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" /> 
          New Project
        </button>

      </div>
    </aside>
  );
};

/* --- REFINED NAV ITEM COMPONENT --- */
const NavItem = ({ item, isActive }) => (
  <Link 
    to={item.path}
    className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all group relative border ${
      isActive 
        ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.02)]' 
        : 'border-transparent text-gray-500 hover:text-white hover:bg-white/[0.03]'
    }`}
  >
    {/* Active indicator bar */}
    {isActive && (
      <div className="absolute left-[-4px] w-1 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
    )}
    
    <div className={`transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
      {item.icon}
    </div>
    
    <span className={`text-[13px] font-semibold tracking-tight transition-all ${isActive ? 'text-white' : 'group-hover:translate-x-0.5'}`}>
      {item.label}
    </span>

    {/* Custom Badge for AI Studio */}
    {item.label === "AI Studio" && (
      <div className="ml-auto flex items-center">
        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_cyan]" />
      </div>
    )}
  </Link>
);

export default Sidebar;