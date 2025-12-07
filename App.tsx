import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Learn from './views/Learn';
import Simulator from './views/Simulator';
import Chat from './views/Chat';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen font-sans text-gray-900">
        {/* Mobile Header Button */}
        <div className="md:hidden fixed top-4 left-4 z-40">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded-lg shadow-md text-emerald-800"
          >
            <Menu size={24} />
          </button>
        </div>

        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 w-full md:ml-0 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Learn />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;