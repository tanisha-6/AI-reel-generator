import React from 'react';
import { TrendingUp, Lightbulb, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  // TEMP MOCK DATA
  // Later this will come from backend API
  const recentProjects = [
    {
      id: 1,
      title: 'Future Tech Concept 2025',
      time: '2 hours ago',
      type: 'VISUAL',
      duration: '0:15',
    },
    {
      id: 2,
      title: 'Gradient Flow Campaign',
      time: '5 hours ago',
      type: 'THUMBNAIL',
    },
    {
      id: 3,
      title: 'Cinematic Travel Reel',
      time: '1 day ago',
      type: 'VISUAL',
      duration: '1:02',
    },
  ];

  const user = {
    username: 'Tanisha',
  };

  return (
    <MainLayout>

      {/* Header */}
      <header className="mb-8">

        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Welcome back, {user.username}
        </p>

        <div className="flex justify-between items-end">

          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              Dashboard Overview
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Manage AI scripts, thumbnails, and creator workflows.
            </p>
          </div>

          <button className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all">
            Last 7 Days
          </button>

        </div>

      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <StatCard
          label="Total Scripts"
          value="124"
          trend="+12%"
          color="cyan"
        />

        <StatCard
          label="Visuals Generated"
          value="3.8k"
          trend="+24%"
          color="purple"
        />

        <StatCard
          label="Viral Reach"
          value="840k"
          trend="+8%"
          color="green"
        />

      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Recent Projects */}
        <div className="flex-1">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-xl font-bold">
              Recent Projects
            </h3>

            <button
              onClick={() => navigate('/library')}
              className="text-cyan-400 text-sm font-bold hover:underline"
            >
              View All
            </button>

          </div>

          {/* Empty State */}
          {recentProjects.length === 0 ? (

            <div className="border border-dashed border-white/10 rounded-3xl p-14 flex flex-col items-center justify-center text-center bg-white/[0.02]">

              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-5">
                <Plus className="text-cyan-400" size={28} />
              </div>

              <h4 className="text-xl font-bold mb-2">
                No projects yet
              </h4>

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

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  time={project.time}
                  type={project.type}
                  duration={project.duration}
                />
              ))}

              {/* New Project Card */}
              <Link
                to="/studio"
                className="aspect-[4/3] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-cyan-500/30 transition-all group"
              >

                <div className="w-12 h-12 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Plus />
                </div>

                <div className="text-center">
                  <p className="font-bold text-cyan-400">
                    New Project
                  </p>

                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Start from scratch
                  </p>
                </div>

              </Link>

            </div>

          )}

        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full lg:w-80 flex flex-col gap-6">

          <TrendingHooks />

          <DailyInspiration />

        </div>

      </div>

    </MainLayout>
  );
};

/* -----------------------------
   UI Components
----------------------------- */

const StatCard = ({ label, value, trend, color }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative group hover:border-white/20 transition-all">

    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
      {label}
    </p>

    <div className="flex items-baseline gap-3">

      <h4 className="text-4xl font-bold tracking-tight">
        {value}
      </h4>

      <span
        className={`text-xs font-bold ${
          color === 'cyan'
            ? 'text-cyan-400'
            : color === 'purple'
            ? 'text-purple-400'
            : 'text-green-400'
        }`}
      >
        {trend} ↗
      </span>

    </div>

    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
      <TrendingUp size={48} />
    </div>

  </div>
);

const ProjectCard = ({ title, time, type, duration }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-cyan-500/30 transition-all">

    <div className="aspect-[4/3] bg-black relative overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500"
        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
        alt={title}
      />

      <div className="absolute bottom-3 left-3 flex gap-2">

        <span className="px-2 py-1 bg-cyan-500 text-[8px] font-black rounded uppercase">
          {type}
        </span>

        {duration && (
          <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-[8px] font-black rounded uppercase">
            {duration}
          </span>
        )}

      </div>

    </div>

    <div className="p-4">

      <h5 className="font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
        {title}
      </h5>

      <p className="text-[10px] text-gray-500 uppercase font-bold">
        Edited {time}
      </p>

    </div>

  </div>
);

const TrendingHooks = () => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">

    <div className="flex items-center gap-2 mb-6">
      <TrendingUp size={16} className="text-purple-400" />

      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
        Trending Hooks
      </h4>
    </div>

    <div className="space-y-6">

      <HookItem
        text='"Stop doing [Common Mistake] if you want to [Desired Result]..."'
        tag="Education"
      />

      <HookItem
        text='"The secret AI tool that replaced my entire team..."'
        tag="AI/Tech"
      />

    </div>

  </div>
);

const HookItem = ({ text, tag }) => (
  <div className="space-y-2 group cursor-pointer">

    <p className="text-sm italic text-gray-300 leading-relaxed group-hover:text-white transition-colors">
      {text}
    </p>

    <span className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold uppercase text-gray-500">
      {tag}
    </span>

  </div>
);

const DailyInspiration = () => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">

    <div className="flex items-center gap-2 mb-4">

      <Lightbulb size={16} className="text-cyan-400" />

      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
        Daily Inspiration
      </h4>

    </div>

    <div className="aspect-video rounded-xl bg-black mb-4 overflow-hidden relative">

      <img
        src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=500"
        alt="Inspire"
        className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">

        <p className="text-xs font-bold leading-tight tracking-tight uppercase">
          The future of storytelling is algorithmic
        </p>

      </div>

    </div>

    <button className="w-full py-2 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-all">
      Exploration Mode
    </button>

  </div>
);

export default Dashboard;