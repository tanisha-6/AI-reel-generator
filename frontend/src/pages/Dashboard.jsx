import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sparkles, 
  Library, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Bell, 
  Settings,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            CREATOR.AI
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pro Plan</p>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <SidebarLink icon={<Sparkles size={20}/>} label="AI Studio" />
          <SidebarLink icon={<Library size={20}/>} label="Library" />
          <SidebarLink icon={<ImageIcon size={20}/>} label="Thumbnail Lab" />
        </nav>

        <div className="mt-auto">
          <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 hover:opacity-90 transition-all">
            <Plus size={20} /> Create New
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors"><Bell size={20} /></button>
            <button className="text-gray-400 hover:text-white transition-colors"><Settings size={20} /></button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 border border-white/20 p-[2px]">
               <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="p-8 overflow-y-auto">
          <header className="mb-8">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Welcome back, Creator</p>
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-bold tracking-tight">Dashboard Overview</h2>
              <button className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg text-xs font-bold text-gray-400">Last 7 Days</button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <StatCard label="Total Scripts" value="124" trend="+12%" color="cyan" />
            <StatCard label="Visuals Generated" value="3.8k" trend="+24%" color="purple" />
            <StatCard label="Viral Reach" value="840k" trend="+8%" color="green" />
          </div>

          <div className="flex gap-8">
            {/* Recent Projects Section */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Projects</h3>
                <button className="text-cyan-400 text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ProjectCard title="Future Tech Concept 2025" time="2 hours ago" type="VISUAL" duration="0:15" />
                <ProjectCard title="Gradient Flow Campaign" time="5 hours ago" type="THUMBNAIL" />
                <ProjectCard title="Cinematic Travel Reel" time="1 day ago" type="VISUAL" duration="1:02" />
                <div className="aspect-[4/3] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-cyan-500/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Plus />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-cyan-400">New Project</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Start from scratch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="w-80 flex flex-col gap-6">
              {/* Trending Hooks */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-purple-400" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Trending Hooks</h4>
                  </div>
                  <Settings size={14} className="text-gray-600" />
                </div>
                <div className="space-y-6">
                  <HookItem text='"Stop doing [Common Mistake] if you want to [Desired Result]..."' tag="Education" />
                  <HookItem text='"The secret AI tool that replaced my entire [Profession] team..."' tag="AI/Tech" />
                  <HookItem text='"I spent 100 hours testing [Topic] so you don’t have to..."' tag="Case Study" />
                </div>
              </div>

              {/* Daily Inspiration */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={16} className="text-cyan-400" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Daily Inspiration</h4>
                </div>
                <div className="aspect-video rounded-xl bg-black mb-4 overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=500" alt="Inspire" className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                      <p className="text-xs font-bold leading-tight tracking-tight uppercase">The future of storytelling is algorithmic</p>
                   </div>
                   <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                     <Plus size={16} />
                   </div>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed mb-4 italic">
                  "Today's Theme: Cyberpunk Minimalism. Focus on high-contrast visuals and rapid-cut editing styles."
                </p>
                <button className="w-full py-2 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-all">Exploration Mode</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Sub-components for cleaner code */
const SidebarLink = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"></div>}
  </div>
);

const StatCard = ({ label, value, trend, color }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative group hover:border-white/20 transition-all">
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{label}</p>
    <div className="flex items-baseline gap-3">
      <h4 className="text-4xl font-bold tracking-tight">{value}</h4>
      <span className={`text-xs font-bold ${color === 'cyan' ? 'text-cyan-400' : color === 'purple' ? 'text-purple-400' : 'text-green-400'}`}>
        {trend} ↗
      </span>
    </div>
    {/* Background Icon Abstract */}
    <div className={`absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity`}>
      <TrendingUp size={48} />
    </div>
  </div>
);

const ProjectCard = ({ title, time, type, duration }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-cyan-500/30 transition-all">
    <div className="aspect-[4/3] bg-black relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" alt={title} />
      <div className="absolute bottom-3 left-3 flex gap-2">
        <span className="px-2 py-1 bg-cyan-500 text-[8px] font-black rounded uppercase">{type}</span>
        {duration && <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-[8px] font-black rounded uppercase">{duration}</span>}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 flex items-center justify-center text-cyan-400">
           <Plus />
        </div>
      </div>
    </div>
    <div className="p-4">
      <h5 className="font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">{title}</h5>
      <p className="text-[10px] text-gray-500 uppercase font-bold">Edited {time}</p>
    </div>
  </div>
);

const HookItem = ({ text, tag }) => (
  <div className="space-y-2 group cursor-pointer">
    <p className="text-sm italic text-gray-300 leading-relaxed group-hover:text-white transition-colors">{text}</p>
    <span className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold uppercase text-gray-500 group-hover:text-purple-400 group-hover:border-purple-400/30 transition-all">
      {tag}
    </span>
  </div>
);

export default Dashboard;