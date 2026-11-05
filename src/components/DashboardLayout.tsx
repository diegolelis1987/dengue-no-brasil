
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  LogIn, 
  Pill,
  FileText,
  Biohazard,
  AlertTriangle,
  BriefcaseMedical,
  UserRound
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Define navigation items with updated icons
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Biohazard },
    { name: 'Análise de Imagens', path: '/dashboard/analysis', icon: Pill },
    { name: 'Mapa de Focos', path: '/dashboard/map', icon: Map },
    { name: 'Relatórios', path: '/dashboard/reports', icon: FileText },
    { name: 'Alertas', path: '/dashboard/alerts', icon: AlertTriangle },
    { name: 'Usuários', path: '/dashboard/users', icon: UserRound },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-health-800 text-white transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-health-700/50">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-health-500 flex items-center justify-center">
              <BriefcaseMedical className="h-5 w-5 text-white" />
            </div>
            {!isSidebarCollapsed && <span className="font-bold">DengueEye</span>}
          </div>
          <button 
            className="text-health-200 hover:text-white"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '›' : '‹'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-health-600 text-white'
                      : 'text-health-100 hover:bg-health-700'
                  } ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  <item.icon className="h-5 w-5" />
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 w-full border-t border-health-700/50 p-4">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-medium text-sm">{user?.name}</span>
                <span className="text-xs text-health-200">{user?.role}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Logout"
              className="text-health-200 hover:text-white hover:bg-health-700"
            >
              <LogIn className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Header */}
        <header className="bg-white border-b border-health-100 p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-health-900">
              Sistema de Monitoramento de Focos de Dengue
            </h1>
            <div className="text-sm text-health-600">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
