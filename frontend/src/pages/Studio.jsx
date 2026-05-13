// Studio.jsx
import React, { useState, useEffect } from 'react';
import { generateScript } from '../services/scriptService';
// import { saveProject } from '../services/projectService';
import MainLayout from '../layouts/MainLayout';
import { 
  Sparkles, Video, Mic, Layout, ChevronDown, 
  RefreshCw, ChevronLeft, ChevronRight, Hash, 
  Terminal, Image as ImageIcon, Plus, Clock3, Sparkle 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Studio = () => {
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const location = useLocation();

  const [historyIndex, setHistoryIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    topic: '',
    niche: '',
    platform: 'Instagram Reels',
    content_style: 'Educational',
  });

  const [scriptHistory, setScriptHistory] = useState([]);

  useEffect(() => {
    if (location.state?.projectHistory) {
      setScriptHistory(location.state.projectHistory);
      // Set to the last version (newest)
      setHistoryIndex(location.state.projectHistory.length - 1);
    }
    if (location.state?.initialInputs) {
      setFormData(location.state.initialInputs);
    }
  }, [location.state]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // --- HELPER: SAVE TO PERSISTENCE (both localStorage and backend) ---
  // const persistProject = async (data) => {
  //   const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
  //   let updatedProjects;
  //   let targetId = currentProjectId;

  //   if (targetId) {
  //     // Regeneration: add a new version to existing project
  //     updatedProjects = existingProjects.map(p => {
  //       if (p.id === targetId) {
  //         return { ...p, versions: [...(p.versions || []), data] };
  //       }
  //       return p;
  //     });
  //   } else {
  //     // First generation: create new project
  //     targetId = Date.now().toString();
  //     const newProject = {
  //       id: targetId,
  //       collectionId: location.state?.collectionId || null,
  //       name: data.title || formData.topic,
  //       topic: formData.topic,
  //       niche: formData.niche,
  //       platform: formData.platform,
  //       content_style: formData.content_style,
  //       created_at: new Date().toISOString(),
  //       versions: [data]
  //     };
  //     updatedProjects = [...existingProjects, newProject];
  //     setCurrentProjectId(targetId);
  //   }

  //   // Save to localStorage (for offline / quick access)
  //   localStorage.setItem('projects', JSON.stringify(updatedProjects));

  //   // Save to backend via API
  //   const projectToSave = updatedProjects.find(p => p.id === targetId);
  //   if (projectToSave) {
  //     try {
  //       await saveProject(projectToSave);
  //     } catch (error) {
  //       console.error('Failed to save project to backend:', error);
  //       // Optionally alert user, but don't block UX
  //     }
  //   }

  //   // Link to collection (only on first creation) – also update collection on backend?
  //   if (!currentProjectId && location.state?.collectionId) {
  //     const savedCols = JSON.parse(localStorage.getItem('ai_studio_collections') || '[]');
  //     const updatedCols = savedCols.map(col => {
  //       if (col.id === location.state.collectionId) {
  //         return { ...col, projectIds: [...col.projectIds, targetId] };
  //       }
  //       return col;
  //     });
  //     localStorage.setItem('ai_studio_collections', JSON.stringify(updatedCols));
  //     // Also sync collection update to backend if you have a collection endpoint
  //   }

  //   // Notify other components (like Library) that data has changed
  //   window.dispatchEvent(new CustomEvent('project-updated'));

  //   return targetId;
  // };
  
  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    try {
      setLoading(true);
      // Pass along the collectionId if we are inside a collection
      const data = await generateScript({
        ...formData,
        collectionId: location.state?.collectionId
      });
      setScriptHistory((prev) => [...prev, data]);
      setHistoryIndex(scriptHistory.length);
      // Notify Library to refetch from backend
      window.dispatchEvent(new CustomEvent('project-updated'));
    } catch (error) {
      console.log(error);
      alert('Failed to generate script');
    } finally {
      setLoading(false);
    }
  };

const handleRegenerate = async () => {
  if (!formData.topic.trim()) {
    alert('Please enter a topic');
    return;
  }
  try {
    setLoading(true);
    const data = await generateScript({
      ...formData,
      collectionId: location.state?.collectionId
    });
    setScriptHistory((prev) => [...prev, data]);
    setHistoryIndex(scriptHistory.length);
    window.dispatchEvent(new CustomEvent('project-updated'));
  } catch (error) {
    console.log(error);
    alert('Failed to regenerate script');
  } finally {
    setLoading(false);
  }
};

  // --- HANDLERS ---
  const handleNext = () => historyIndex < scriptHistory.length - 1 && setHistoryIndex(h => h + 1);
  const handlePrev = () => historyIndex > 0 && setHistoryIndex(h => h - 1);

  // --- INTERNAL COMPONENTS (Defined inside for 1-file requirement) ---
  const PlatformItem = ({ label, active }) => (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${active ? 'bg-white/5 border-cyan-500/50' : 'border-white/5 hover:bg-white/[0.02]'}`}>
      <div className="flex items-center gap-3">
        <Layout size={14} className={active ? 'text-cyan-400' : 'text-gray-500'} />
        <span className={`text-xs font-bold ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
      </div>
      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${active ? 'border-cyan-500' : 'border-white/10'}`}>
        {active && <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan]" />}
      </div>
    </div>
  );

  const SceneBlock = ({ timestamp, visual, narrative }) => (
    <div className="flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/5 whitespace-nowrap shadow-[0_0_10px_rgba(34,211,238,0.1)]">
          <Clock3 size={12} /> {timestamp}
        </div>
        <div className="flex-1 w-[2px] bg-gradient-to-b from-cyan-500/50 via-white/5 to-transparent my-2 shadow-[0_0_8px_cyan]"></div>
      </div>
      <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 space-y-4 mb-4 hover:border-cyan-500/20 transition-all">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
            <Video size={14} className="text-cyan-400" /> Visual
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">{visual}</p>
        </div>
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
            <Mic size={14} className="text-purple-400" /> Narrative
          </div>
          <p className="text-sm text-gray-200 leading-relaxed font-medium italic">"{narrative}"</p>
        </div>
      </div>
    </div>
  );

  const currentScript = scriptHistory[historyIndex];

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-8 items-start pb-10 scroll-smooth">
        
        {/* --- LEFT: INPUT PANEL --- */}
        <div className="w-full lg:w-80 lg:sticky lg:top-2 self-start space-y-6 pr-2">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Script Topic</label>
            <textarea 
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="What's the video about?"
              className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-cyan-500/50 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Niche / Category</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {['Tech', 'Finance', 'Lifestyle', 'Education'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      niche: cat,
                    })
                  }
                  className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition-all ${
                    formData.niche === cat
                      ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
                      : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              placeholder="Or type custom niche..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs outline-none focus:border-cyan-500/50" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Target Platform</label>
            <div className="space-y-2 mb-2">
              {['TikTok', 'Instagram Reels', 'YouTube Shorts'].map((platform) => (
                <div
                  key={platform}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      platform,
                    })
                  }
                >
                  <PlatformItem
                    label={platform}
                    active={formData.platform === platform}
                  />
                </div>
              ))}
            </div>
            {/* <input type="text" placeholder="Other platform..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs outline-none focus:border-cyan-500/50" /> */}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Content Style</label>
            <select 
              name="content_style"
              value={formData.content_style}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none appearance-none focus:border-cyan-500/50 cursor-pointer">
              <option className="bg-[#050505]">Educational / Fast Paced</option>
              <option className="bg-[#050505]">Cinematic Storytelling</option>
              <option className="bg-[#050505]">High Energy / Viral</option>
              <option className="bg-[#050505]">Direct-to-Camera</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <>
                <Sparkles size={16} />
                {loading ? 'Generating...' : 'Generate'}
              </>
            </button>
            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={16}
                className={`transition-transform duration-500 ${
                  loading ? 'animate-spin' : 'group-hover:rotate-180'
                }`}
              />

              {loading ? 'Regenerating...' : 'Regenerate'}
            </button>
          </div>
        </div>

        {/* --- RIGHT: OUTPUT PANEL --- */}
        <div className="flex-1 space-y-6">
          
          {/* History Navigation */}
          <div className="flex items-center justify-between px-2">
            <div className="flex gap-2">
              <button onClick={handlePrev} disabled={historyIndex === 0} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:text-cyan-400 transition-colors disabled:opacity-20"><ChevronLeft size={20}/></button>
              <button onClick={handleNext} disabled={historyIndex === scriptHistory.length - 1} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:text-cyan-400 transition-colors disabled:opacity-20"><ChevronRight size={20}/></button>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
              Version {scriptHistory.length > 0 ? historyIndex + 1 : 0}
            </span>
          </div>

          {/* Main Card: Title & Hook */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={14} /> AI Synthesis Active
            </div>
            <h2 className="text-5xl font-black leading-[1.1] tracking-tighter max-w-2xl text-white uppercase">
              {currentScript?.title || 'No Script Generated Yet'}
            </h2>
            <div className="space-y-2 border-l-4 border-cyan-500 pl-8">
              <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest">The Hook</p>
              <p className="text-2xl italic font-semibold leading-relaxed text-gray-100">
                "{currentScript?.hook || 'Your AI hook will appear here'}"
              </p>
            </div>
          </div>

          {/* Scene Flow */}
          <div className="py-4 space-y-2">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em]">Scene Structure Flow</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            </div>
            {currentScript?.scenes?.map((scene, i) => (
              <SceneBlock key={i} {...scene} />
            ))}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <Terminal size={16} className="text-cyan-400" /> Full Narrative Script
              </div>
              <p className="text-sm leading-relaxed text-gray-400 font-medium">{currentScript?.main_script || 'Generated narrative script will appear here'}</p>
            </div>

            <div className="space-y-6">
                <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-3xl space-y-4 shadow-[0_0_30px_rgba(34,211,238,0.05)]">
                    <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                        <Sparkle size={16} /> Viral CTA
                    </div>
                    <p className="text-sm text-white font-bold italic">"{currentScript?.cta || 'CTA will appear here'}"</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <Hash size={16} className="text-green-400" /> Smart Hashtags
                    </div>
                    <p className="text-xs text-gray-500 font-mono tracking-tight">{currentScript?.hashtags || 'Hashtags will appear here'}</p>
                </div>
            </div>
          </div>

          {/* Thumbnail Generation Previews */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
               <div className="flex items-center gap-3">
                 <ImageIcon size={20} className="text-cyan-400" />
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Generated Thumbnails</h4>
               </div>
               <button className="text-[10px] font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">View in Lab</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {currentScript?.thumbnails?.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all bg-[#111]"
              >
                <img
                  src={img.image_url}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  // This helps debug if the URL is broken
                  onLoad={() => console.log(`Thumbnail ${idx} loaded successfully`)}
                  onError={(e) => {
                    console.error("Thumbnail failed to load:", img.image_url);
                    e.target.src = 'https://placehold.co/1280x720/0a0a0a/22d3ee?text=Rendering+Thumbnail...';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-white">
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};
export default Studio;