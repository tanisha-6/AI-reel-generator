import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { 
  Search, 
  Grid, 
  List, 
  MoreVertical, 
  Folder, 
  Plus, 
  Filter,
  HardDrive
} from 'lucide-react';

const Library = () => {
  return (
    <MainLayout>
      <div className="space-y-8 pb-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Project Library</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">1,284 Assets Secured in Vault</p>
          </div>
          
          <nav className="flex gap-6 border-b border-white/5 pb-1">
            {['All Projects', 'Scripts', 'Thumbnails', 'Favorites', 'Archived'].map((tab, i) => (
              <button 
                key={tab} 
                className={`text-[11px] font-black uppercase tracking-widest pb-3 transition-all relative ${
                  i === 0 ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
                {i === 0 && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_cyan]"></div>}
              </button>
            ))}
          </nav>
        </header>

        {/* Filter & View Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, tag, or status..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-cyan-500/30 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase mr-2">
              Sort by: 
              <button className="text-white bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                Newest First <Filter size={12} />
              </button>
            </div>
            <div className="flex bg-white/5 rounded-lg border border-white/10 p-1">
              <button className="p-1.5 bg-white/10 text-cyan-400 rounded-md"><Grid size={16} /></button>
              <button className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors"><List size={16} /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AssetCard 
              title="Neon Genesis Episode 01" 
              img="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400"
              status="READY TO POST"
              potential="98%"
              meta="9:16 | 00:15"
              time="2h ago"
            />
            <AssetCard 
              title="Cyber Dynamics Showcase" 
              img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400"
              status="RENDERING"
              potential="84%"
              meta="16:9 | 00:58"
              time="Yesterday"
              isRendering
            />
            <AssetCard 
              title="Vaporwave Dreams" 
              img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400"
              status="DRAFT"
              potential="72%"
              meta="9:16 | 00:12"
              time="3 days ago"
            />
            <AssetCard 
              title="Neural Architecture" 
              img="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=400"
              status="READY TO POST"
              potential="95%"
              meta="1:1 | 00:30"
              time="Last week"
            />
            
            {/* Start New Project Placeholder */}
            <div className="aspect-video rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all">
                <Plus size={24} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-cyan-400">Start New Project</p>
            </div>
          </div>

          {/* Library Sidebar Widgets */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Vault Storage */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vault Storage</h4>
                <span className="text-[10px] font-black text-cyan-400">42.8%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 w-[42.8%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              </div>
              <div className="flex justify-between text-[9px] font-bold text-gray-600 uppercase mb-6">
                <span>42.8 GB Used</span>
                <span>100 GB Limit</span>
              </div>
              <button className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Upgrade Vault
              </button>
            </div>

            {/* Collections */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Collections</h4>
              <div className="space-y-4">
                <CollectionItem icon={<Folder size={14}/>} label="Client Projects" count="12" />
                <CollectionItem icon={<Folder size={14}/>} label="Daily Shorts" count="84" />
                <CollectionItem icon={<Folder size={14}/>} label="Brand Assets" count="215" />
                <CollectionItem icon={<Folder size={14}/>} label="Experimental AI" count="42" />
                <button className="flex items-center gap-3 text-[10px] font-bold text-gray-600 hover:text-cyan-400 transition-colors uppercase mt-2">
                  <Plus size={14} /> New Collection
                </button>
              </div>
            </div>

            {/* Global Tags */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Global Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['#NEON', '#AI_GEN', '#VIRAL', '#CYBERPUNK', '#AD_CREATIVE', '#MOTION'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

/* --- Sub-components --- */

const AssetCard = ({ title, img, status, potential, meta, time, isRendering }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden group hover:border-cyan-500/30 transition-all">
    <div className="aspect-video relative overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase ${
          isRendering ? 'bg-purple-600 text-white animate-pulse' : 'bg-cyan-500 text-black'
        }`}>
          {status}
        </span>
      </div>
      
      <button className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
        <MoreVertical size={18} />
      </button>

      {/* Overlay Stats */}
      <div className="absolute bottom-4 left-4">
        <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">Viral Potential</p>
        <p className="text-2xl font-black">{potential}</p>
      </div>
    </div>
    
    <div className="p-5">
      <h3 className="font-black text-lg tracking-tight mb-2 group-hover:text-cyan-400 transition-colors uppercase">{title}</h3>
      <div className="flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
        <span>{meta}</span>
        <span>{time}</span>
      </div>
    </div>
  </div>
);

const CollectionItem = ({ icon, label, count }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3 text-gray-500 group-hover:text-white transition-colors">
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-tight">{label}</span>
    </div>
    <span className="text-[10px] font-mono text-gray-700 group-hover:text-cyan-400">{count}</span>
  </div>
);

export default Library;