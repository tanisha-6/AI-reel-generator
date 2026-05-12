import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { 
  Sparkles, 
  RefreshCw, 
  Download, 
  Box, 
  Maximize, 
  Layers, 
  Zap, 
  ShieldAlert, 
  CheckCircle2,
  ChevronDown,
  User
} from 'lucide-react';

const ThumbnailLab = () => {
  const [selectedStyle, setSelectedStyle] = useState('Cyberpunk');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [cfgScale, setCfgScale] = useState(7);
  const [characterFocus, setCharacterFocus] = useState(true);

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-160px)] gap-8 overflow-hidden">
        
        {/* --- LEFT: CONTROL PANEL --- */}
        <aside className="w-80 flex flex-col gap-6 pr-4 border-r border-white/5 overflow-y-auto custom-scrollbar">
          
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase text-white">Visual Lab</h1>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Image Generation Engine v2.4</p>
          </div>

          {/* Primary Prompt Engineering */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1">Primary Prompt</label>
              <textarea 
                placeholder="What's the video about? (e.g. A futuristic city at night with a hero looking at the horizon)"
                className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium focus:border-cyan-500/50 outline-none transition-all resize-none placeholder:text-gray-600 leading-relaxed"
              />
            </div>

            {/* Text Overlay Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Text Overlay (Title)</label>
              <input 
                type="text"
                placeholder="Enter headline text..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs outline-none focus:border-cyan-500/50 text-white"
              />
            </div>
          </div>

          {/* Visual Style Grid (Refactored to match design) */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Visual Style</label>
            <div className="grid grid-cols-2 gap-2">
              {['Cyberpunk', 'Cinematic', 'Minimalist', 'High-Contrast'].map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`py-3 px-2 rounded-xl border text-[10px] font-bold uppercase transition-all ${
                    selectedStyle === style 
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                    : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Character Focus Toggle */}
          {/* <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3">
              <User size={16} className={characterFocus ? 'text-cyan-400' : 'text-gray-500'} />
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Character Focus</label>
            </div>
            <button 
              onClick={() => setCharacterFocus(!characterFocus)}
              className={`w-10 h-5 rounded-full transition-colors relative ${characterFocus ? 'bg-cyan-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${characterFocus ? 'right-1' : 'left-1'}`} />
            </button>
          </div> */}

          {/* AI Guidance Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Guidance (CFG)</label>
              <span className="text-[10px] font-mono text-cyan-400">{cfgScale}</span>
            </div>
            <input 
              type="range" min="1" max="20" step="0.5" value={cfgScale}
              onChange={(e) => setCfgScale(e.target.value)}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Aspect Ratio</label>
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
              {['16:9', '9:16', '1:1'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${
                    aspectRatio === ratio ? 'bg-white/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Preset Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Brand Preset</label>
            <div className="relative group">
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-bold text-gray-300 uppercase tracking-widest outline-none appearance-none focus:border-cyan-500/50 cursor-pointer">
                <option>Hyper-Tech (Cyan/Purple)</option>
                <option>Deep Space (Blue/Gold)</option>
                <option>Minimal (Black/White)</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Main Actions */}
          <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Sparkles size={18} /> Generate Variations
            </button>
          </div>
        </aside>

        {/* --- CENTER: GENERATION FEED --- */}
        <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
               <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Generation Output</h2>
               <div className="h-[1px] w-24 bg-white/10"></div>
            </div>
            <button className="text-[10px] font-bold text-cyan-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
              <RefreshCw size={12} /> Reset Canvas
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 pb-10">
            <ImageResult src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800" />
            <ImageResult 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800" 
              selected 
              label="Variation_02_Render"
            />
            <ImageResult src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" />
            <ImageResult src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800" />
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

/* --- SHARED COMPONENTS --- */

const ImageResult = ({ src, selected, label }) => (
  <div className={`group relative aspect-video rounded-[2.5rem] overflow-hidden border-2 transition-all cursor-pointer ${
    selected 
      ? 'border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.15)] scale-[1.02]' 
      : 'border-white/5 hover:border-white/20'
  }`}>
    <img 
      src={src} 
      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${selected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} 
      alt="AI Preview" 
    />
    
    <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Generated Output</p>
          <p className="text-xs font-bold text-white uppercase tracking-tight">{label || "Variation_Default"}</p>
        </div>
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-cyan-500 hover:text-black transition-all">
          <Download size={18} />
        </button>
      </div>
    </div>

    {selected && (
      <div className="absolute top-6 left-6 px-4 py-1.5 bg-cyan-500 rounded-full flex items-center gap-2 shadow-xl">
        <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-black uppercase tracking-widest">Master Selection</span>
      </div>
    )}
  </div>
);

export default ThumbnailLab;