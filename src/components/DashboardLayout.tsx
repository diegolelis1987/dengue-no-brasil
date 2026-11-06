import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  FileText,
  LogOut,
  Map,
  Menu,
  ScanLine,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Visão geral', path: '/dashboard', icon: BarChart3 },
  { name: 'Análise de imagens', path: '/dashboard/analysis', icon: ScanLine },
  { name: 'Mapa de focos', path: '/dashboard/map', icon: Map },
  { name: 'Relatórios', path: '/dashboard/reports', icon: FileText },
  { name: 'Alertas', path: '/dashboard/alerts', icon: AlertTriangle },
  { name: 'Usuários', path: '/dashboard/users', icon: UserRound },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navigation = (mobile = false) => (
    <nav className={mobile ? 'px-3 py-4' : 'px-3 py-5'} aria-label="Navegação principal">
      <p className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 ${isSidebarCollapsed && !mobile ? 'sr-only' : ''}`}>Workspace</p>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                title={isSidebarCollapsed && !mobile ? item.name : undefined}
                className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-50 text-cyan-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                } ${isSidebarCollapsed && !mobile ? 'justify-center px-2' : 'gap-3'}`}
              >
                <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-cyan-700' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span className={isSidebarCollapsed && !mobile ? 'sr-only' : ''}>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className={`fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200 bg-white transition-[width] duration-300 lg:flex lg:flex-col ${isSidebarCollapsed ? 'w-[76px]' : 'w-[252px]'}`}>
        <div className={`flex h-[72px] items-center border-b border-slate-100 ${isSidebarCollapsed ? 'justify-center px-2' : 'justify-between px-5'}`}>
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden" aria-label="DengueEye — visão geral">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm"><ShieldCheck className="h-5 w-5" /></span>
            {!isSidebarCollapsed && <span className="whitespace-nowrap text-base font-semibold tracking-tight text-slate-950">Dengue<span className="text-cyan-700">Eye</span></span>}
          </Link>
          {!isSidebarCollapsed && (
            <button type="button" onClick={() => setSidebarCollapsed(true)} className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Recolher menu">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        {isSidebarCollapsed && (
          <button type="button" onClick={() => setSidebarCollapsed(false)} className="mx-auto mt-3 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Expandir menu">
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        <div className="flex-1 overflow-y-auto">{navigation()}</div>
        <div className={`border-t border-slate-100 ${isSidebarCollapsed ? 'p-2' : 'p-3'}`}>
          {!isSidebarCollapsed && <p className="mb-2 truncate px-2 text-xs text-slate-500"><span className="font-medium text-slate-700">{user?.name ?? 'Operador'}</span> · {user?.role ?? 'Acesso'}</p>}
          <Button variant="ghost" onClick={logout} title="Sair" className={`w-full text-slate-500 hover:bg-rose-50 hover:text-rose-700 ${isSidebarCollapsed ? 'px-2' : 'justify-start gap-3'}`}>
            <LogOut className="h-[18px] w-[18px]" />
            {!isSidebarCollapsed && 'Sair da plataforma'}
          </Button>
        </div>
      </aside>

      {isMobileNavOpen && <button type="button" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setMobileNavOpen(false)} aria-label="Fechar menu" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
          <Link to="/dashboard" onClick={() => setMobileNavOpen(false)} className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-950"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white"><ShieldCheck className="h-5 w-5" /></span>Dengue<span className="-ml-2.5 text-cyan-700">Eye</span></Link>
          <button type="button" onClick={() => setMobileNavOpen(false)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100" aria-label="Fechar menu"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto">{navigation(true)}</div>
        <div className="border-t border-slate-100 p-4">
          <p className="mb-3 text-xs text-slate-500"><span className="font-medium text-slate-700">{user?.name ?? 'Operador'}</span> · {user?.role ?? 'Acesso'}</p>
          <Button variant="ghost" onClick={logout} className="w-full justify-start gap-3 text-slate-500 hover:bg-rose-50 hover:text-rose-700"><LogOut className="h-[18px] w-[18px]" />Sair da plataforma</Button>
        </div>
      </aside>

      <div className={`min-h-screen transition-[padding] duration-300 ${isSidebarCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[252px]'}`}>
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileNavOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Abrir menu"><Menu className="h-5 w-5" /></button>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-700">DengueEye command center</p>
              <p className="mt-0.5 text-sm font-medium text-slate-700">Monitoramento territorial e inteligência operacional</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Dados de referência carregados</div>
            <button type="button" className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" aria-label="Notificações"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500" /></button>
          </div>
        </header>
        <main className="p-4 sm:p-6 xl:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
