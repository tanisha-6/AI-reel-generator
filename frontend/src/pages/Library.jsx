// Library.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import MainLayout from '../layouts/MainLayout';
import { 
  Search, Grid, List, MoreVertical, Folder, 
  Plus, Filter, ChevronLeft, Trash2, X, Hash
} from 'lucide-react';

const Library = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('All Projects'); 
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Persisted Collections State
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('ai_studio_collections');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Client Projects', projectIds: [] },
      { id: 2, name: 'Daily Shorts', projectIds: [] },
      { id: 3, name: 'Experimental AI', projectIds: [] }
    ];
  });

  // Keep localStorage in sync with state
  useEffect(() => {
    localStorage.setItem('ai_studio_collections', JSON.stringify(collections));
  }, [collections]);

  // Fetch projects from the service (localStorage)
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      
      // Refresh collections from storage too (in case Studio updated them)
      const savedCols = localStorage.getItem('ai_studio_collections');
      if (savedCols) setCollections(JSON.parse(savedCols));
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    
    // Listen for window focus to refresh data when returning from Studio
    window.addEventListener('focus', fetchProjects);
    
    // Listen for custom project-updated event (dispatched from Studio after save)
    window.addEventListener('project-updated', fetchProjects);
    
    return () => {
      window.removeEventListener('focus', fetchProjects);
      window.removeEventListener('project-updated', fetchProjects);
    };
  }, []);

  // --- HANDLERS ---
  const handleOpenProject = (project) => {
    navigate('/studio', { 
      state: { 
        projectHistory: project.versions || [], 
        initialInputs: {
          topic: project.topic || '',
          niche: project.niche || '',
          platform: project.platform || 'Instagram Reels',
          content_style: project.content_style || 'Educational',
        }
      } 
    });
  };

  const handleCreateCollection = () => {
    const name = prompt("Enter Collection Name:");
    if (name) {
      const newCol = { id: Date.now(), name, projectIds: [] };
      setCollections([...collections, newCol]);
    }
  };

  // --- CORE FILTERING LOGIC ---
  const getFilteredProjects = () => {
    let list = [];

    // COLLECTION VIEW
    if (selectedCollection) {
      list = projects.filter(project => String(project.collection_id) === String(selectedCollection.id));
    } else {
      list = projects.filter(project => !project.collection_id);
    }

    // SEARCH
    return list.filter(project =>
      (project.name || project.topic || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  return (
    <MainLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
               {selectedCollection && (
                 <button onClick={() => setSelectedCollection(null)} className="p-2 hover:bg-white/5 rounded-full text-cyan-400 transition-colors">
                   <ChevronLeft size={20} />
                 </button>
               )}
               <h1 className="text-5xl font-black tracking-tighter uppercase text-white">
                 {selectedCollection ? selectedCollection.name : "Project Library"}
               </h1>
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
              Vault Status: Online // {projects.length} Total Assets
            </p>
          </div>
          
          {!selectedCollection && (
            <nav className="flex gap-6 border-b border-white/5 pb-1">
              {['All Projects', 'Collections'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => {
                    setView(tab);
                    // Reset selected collection when switching to "All Projects" tab
                    if (tab === 'All Projects') {
                      setSelectedCollection(null);
                    }
                  }}
                  className={`text-[11px] font-black uppercase tracking-widest pb-3 transition-all relative ${
                    view === tab ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                  {view === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_cyan]"></div>}
                </button>
              ))}
            </nav>
          )}
        </header>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-cyan-500/30 transition-all text-white"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 self-start">
            
            {(view === 'All Projects' || selectedCollection !== null) && (
              <>
                {getFilteredProjects().map((project) => (
                  <AssetCard
                    key={project.id}
                    project={project}
                    onClick={() => handleOpenProject(project)}
                  />
                ))}
                
                <div 
                  onClick={() => navigate('/studio', { state: { collectionId: selectedCollection?.id } })} 
                  className="aspect-video rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all group cursor-pointer"
                >
                  <Plus size={24} className="text-gray-600 group-hover:text-cyan-400" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-cyan-400">Start New Project</p>
                </div>
              </>
            )}

            {view === 'Collections' && !selectedCollection && (
              collections.map(col => (
                <div 
                  key={col.id} 
                  onClick={async () => {
                    await fetchProjects();   // re‑fetches projects and collections from localStorage
                    // Get the freshest collection object from localStorage (optional but safe)
                    const updatedCollections = JSON.parse(localStorage.getItem('ai_studio_collections') || '[]');
                    const freshCollection = updatedCollections.find(c => c.id === col.id);
                    if (freshCollection) {
                      setCollections(updatedCollections);
                      setSelectedCollection(freshCollection);
                      setView('Collections');
                    }
                  }}
                  className="aspect-video bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-cyan-500/40 transition-all cursor-pointer relative overflow-hidden"
                >
                  <Folder size={32} className="text-cyan-500 relative z-10" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-1">{col.name}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {projects.filter(p => String(p.collection_id) === String(col.id)).length} Assets
                    </p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Folder size={120} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Collections / Folders</h4>
              <div className="space-y-4">
                {collections.map(folder => (
                  <div key={folder.id} onClick={async () => {
                    await fetchProjects();
                    const updatedCollections = JSON.parse(localStorage.getItem('ai_studio_collections') || '[]');
                    const freshCollection = updatedCollections.find(c => c.id === folder.id);
                    if (freshCollection) {
                      setCollections(updatedCollections);
                      setSelectedCollection(freshCollection);
                      setView('Collections');
                    }
                  }}>
                    <CollectionItem 
                      icon={<Folder size={14}/>} 
                      label={folder.name} 
                      count={projects.filter(p => String(p.collection_id) === String(folder.id)).length}
                    />
                  </div>
                ))}
                <button 
                  onClick={handleCreateCollection}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-bold text-gray-600 hover:text-cyan-400 hover:border-cyan-500/30 transition-all uppercase mt-4"
                >
                  <Plus size={14} /> New Collection
                </button>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Global Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['#NEON', '#AI_GEN', '#VIRAL', '#CYBERPUNK'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-gray-500 hover:text-cyan-400 cursor-pointer transition-all">
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

/* --- SUB-COMPONENTS --- */

const AssetCard = ({ project, onClick }) => {
  const latestVersion = project.versions?.[project.versions.length - 1];
  const thumb = latestVersion?.thumbnails?.[0]?.image_url || 'https://placehold.co/600x400/111/fff?text=No+Preview';

  return (
    <div onClick={onClick} className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden group hover:border-cyan-500/30 transition-all cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
        <img src={thumb} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase bg-cyan-500 text-black">
            GENERATED
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">Viral Potential</p>
          <p className="text-2xl font-black text-white">{latestVersion?.viral_score || '85'}%</p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-black text-lg tracking-tight mb-2 group-hover:text-cyan-400 transition-colors uppercase text-white truncate">{project.name || project.topic}</h3>
        <div className="flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <span>{project.platform}</span>
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

const CollectionItem = ({ icon, label, count }) => (
  <div className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-all">
    <div className="flex items-center gap-3 text-gray-500 group-hover:text-white transition-colors">
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-tight">{label}</span>
    </div>
    <span className="text-[10px] font-mono text-gray-700 group-hover:text-cyan-400">{count}</span>
  </div>
);

export default Library;