import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser } from '../../services/userService';

import {
  Search,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

const Navbar = () => {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const data = await getCurrentUser();

        setUser(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchUser();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    navigate('/login');
  };

  const userInitial =
    user?.username?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="h-20 border-b border-white/5 bg-[#050505]/70 backdrop-blur-xl sticky top-0 z-30 px-8 flex items-center justify-between">

      {/* LEFT */}
      <div className="relative w-80">

        {/* <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search projects..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-500/40 transition-all"
        /> */}

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* Divider */}
        <div className="h-8 w-px bg-white/10"></div>

        {/* USER */}
        <div className="flex items-center gap-3">

          {/* Username */}
          <div className="hidden sm:block text-right">

            <p className="text-sm font-semibold text-white">
              {user?.username || 'Loading...'}
            </p>

            <p className="text-[11px] text-cyan-400 font-medium">
              AI Creator
            </p>

          </div>

          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/10">

            <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center text-sm font-bold text-white">

              {userInitial}

            </div>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
        >

          <LogOut size={16} />

          <span className="text-xs font-semibold uppercase tracking-wider">
            Logout
          </span>

        </button>

      </div>

    </header>
  );
};

export default Navbar;