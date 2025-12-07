import React from 'react';
import { LayoutDashboard, Calculator, MessageCircle, GraduationCap, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Aprender', icon: GraduationCap },
    { path: '/simulator', label: 'Simulador', icon: Calculator },
    { path: '/chat', label: 'AI Advisor', icon: MessageCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-30
          h-screen w-64 bg-emerald-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-6 border-b border-emerald-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">I</span>
            </div>
            <span className="text-xl font-bold tracking-tight">InvesteJovem</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-emerald-200">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-emerald-800">
          <div className="bg-emerald-800/50 rounded-xl p-4">
            <p className="text-xs text-emerald-200 mb-1">Dica do dia</p>
            <p className="text-sm text-emerald-50">O melhor dia para começar a investir foi ontem. O segundo melhor é hoje.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;