import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#050505]">
      <Sidebar /> 
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children} {/* This is where Dashboard, Studio, etc. will render */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;