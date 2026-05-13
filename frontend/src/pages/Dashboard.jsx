import React, { useState, useEffect } from 'react';
import { TrendingUp, Lightbulb, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getDashboardStats } from '../services/dashboardService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_scripts: 0,
    visual_generated: 0,
    recent_projects: []
  });
  const [loading, setLoading] = useState(true);
  const user = { username: 'Tanisha' };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats({
          total_scripts: data.total_scripts || 0,
          visual_generated: data.visual_generated || 0,
          recent_projects: data.recent_projects || []
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-cyan-400 animate-pulse">Loading dashboard...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <header className="mb-10">
        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Welcome back, {user.username}
        </p>
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-2">
              Manage AI scripts, thumbnails, and creator workflows.
            </p>
          </div>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all">
            Last 7 Days
          </button>
        </div>
      </header>

      {/* Stats Grid – 2 columns only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <StatCard label="Total Scripts" value={stats.total_scripts} trend="+12%" color="cyan" />
        <StatCard label="Visuals Generated" value={stats.visual_generated.toLocaleString()} trend="+24%" color="purple" />
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
          <button onClick={() => navigate('/library')} className="text-cyan-400 text-sm font-bold hover:underline">
            View All
          </button>
        </div>

        {stats.recent_projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.recent_projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <Link
              to="/studio"
              className="aspect-[4/3] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <div className="text-center">
                <p className="font-bold text-cyan-400">New Project</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Start from scratch</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

/* -----------------------------
   UI Components
----------------------------- */

const StatCard = ({ label, value, trend, color }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative group hover:border-white/20 transition-all">
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{label}</p>
    <div className="flex items-baseline gap-3">
      <h3 className="text-4xl font-bold tracking-tight">{value}</h3>
      <span className={`text-xs font-bold ${color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
        {trend} ↗
      </span>
    </div>
    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
      <TrendingUp size={48} />
    </div>
  </div>
);

const ProjectCard = ({ project }) => {
  const thumb = project.latest_thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500';
  const timeAgo = (date) => {
    const diff = new Date() - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-cyan-500/30 transition-all">
      <div className="aspect-[4/3] bg-black relative overflow-hidden">
        <img src={thumb} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" alt={project.name} />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-cyan-500 text-[8px] font-black rounded uppercase">SCRIPT</span>
          <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-[8px] font-black rounded uppercase">
            {project.platform || 'Multi'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h5 className="font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors truncate">{project.name}</h5>
        <p className="text-[10px] text-gray-500 uppercase font-bold">Edited {timeAgo(project.updated_at)}</p>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="border border-dashed border-white/10 rounded-3xl p-14 flex flex-col items-center justify-center text-center bg-white/[0.02]">
    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-5">
      <Plus className="text-cyan-400" size={28} />
    </div>
    <h4 className="text-xl font-bold mb-2">No projects yet</h4>
    <p className="text-gray-500 text-sm max-w-sm mb-6">
      Generate your first AI-powered reel script and start building viral content.
    </p>
    <Link
      to="/studio"
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-sm hover:opacity-90 transition"
    >
      Create First Project
    </Link>
  </div>
);

// HookItem is kept but not used – preserved for future use
const HookItem = ({ text, tag }) => (
  <div className="space-y-2 group cursor-pointer">
    <p className="text-sm italic text-gray-300 leading-relaxed group-hover:text-white transition-colors">{text}</p>
    <span className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold uppercase text-gray-500">
      {tag}
    </span>
  </div>
);

export default Dashboard;