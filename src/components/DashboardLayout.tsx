import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AlertTriangle, BarChart3, Bell, ChevronLeft, ChevronRight, FileText, LogOut, Map, Menu, ScanLine, ShieldCheck, UserRound, X } from 'lucide-react';

const navItems = [
  { name: 'Visão geral', path: '/dashboard', icon: BarChart3 },
  { name: 'Análise de imagens', path: '/dashboard/analysis', icon: ScanLine },
  { name: 'Mapa operacional', path: '/dashboard/map', icon: Map },
  { name: 'Relatórios', path: '/dashboard/reports', icon: FileText },
  { name: 'Alertas', path: '/dashboard/alerts', icon: AlertTriangle },
  { name: 'Equipe', path: '/dashboard/users', icon: UserRound },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = (mobile = false) => <nav className="p-3" aria-label="Navegação principal">
    <p className={`px-3 pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-emerald-800/70 ${collapsed && !mobile ? 'sr-only' : ''}`}>Operação</p>
    <ul className="space-y-1">{navItems.map((item) => {
      const active = location.pathname === item.path; const Icon = item.icon;
      return <li key={item.path}><Link to={item.path} onClick={() => setMobileOpen(false)} title={collapsed && !mobile ? item.name : undefined} className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-[#E7F5EA] text-[#1B5E20] shadow-sm' : 'text-emerald-950/70 hover:bg-emerald-50 hover:text-[#1B5E20]'} ${collapsed && !mobile ? 'justify-center px-2' : 'gap-3'}`}><Icon className="h-[18px] w-[18px] shrink-0" /><span className={collapsed && !mobile ? 'sr-only' : ''}>{item.name}</span></Link></li>;
    })}</ul>
  </nav>;
  return <div className="min-h-screen bg-[#F7FBF5] text-emerald-950">
    <aside className={`fixed inset-y-0 left-0 z-30 hidden border-r border-emerald-100 bg-white lg:flex lg:flex-col ${collapsed ? 'w-[76px]' : 'w-[252px]'}`}>
      <div className={`flex h-[72px] items-center border-b border-emerald-100 ${collapsed ? 'justify-center' : 'justify-between px-5'}`}><Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1B5E20] text-white"><ShieldCheck className="h-5 w-5" /></span>{!collapsed && <span className="whitespace-nowrap text-base font-bold">Dengue<span className="text-[#2E8B57]">Eye</span></span>}</Link>{!collapsed && <button onClick={() => setCollapsed(true)} className="rounded-lg p-1.5 text-emerald-800 hover:bg-emerald-50" aria-label="Recolher menu"><ChevronLeft className="h-4 w-4" /></button>}</div>
      {collapsed && <button onClick={() => setCollapsed(false)} className="mx-auto mt-3 rounded-lg p-1.5 text-emerald-800 hover:bg-emerald-50" aria-label="Expandir menu"><ChevronRight className="h-4 w-4" /></button>}
      <div className="flex-1">{nav()}</div><div className="border-t border-emerald-100 p-3">{!collapsed && <p className="mb-2 truncate px-2 text-xs text-emerald-950/65"><b>{user?.name || 'Operador'}</b> · {user?.role || 'acesso'}</p>}<Button variant="ghost" onClick={logout} className={`w-full text-emerald-900 hover:bg-red-50 hover:text-red-800 ${collapsed ? 'px-2' : 'justify-start gap-3'}`}><LogOut className="h-[18px] w-[18px]" />{!collapsed && 'Sair'}</Button></div>
    </aside>
    {mobileOpen && <button aria-label="Fechar menu" className="fixed inset-0 z-40 bg-emerald-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl transition-transform lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex h-[72px] items-center justify-between border-b border-emerald-100 px-5"><Link to="/dashboard" className="flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1B5E20] text-white"><ShieldCheck className="h-5 w-5" /></span>Dengue<span className="-ml-2 text-[#2E8B57]">Eye</span></Link><button className="p-2 text-emerald-900" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X /></button></div><div className="flex-1">{nav(true)}</div></aside>
    <div className={`${collapsed ? 'lg:pl-[76px]' : 'lg:pl-[252px]'}`}><header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-emerald-100 bg-white/90 px-4 backdrop-blur sm:px-6"><div className="flex items-center gap-3"><button className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-50 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu /></button><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#2E8B57]">Centro de comando</p><p className="text-sm font-medium text-emerald-950/70">Inteligência territorial para prevenção</p></div></div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-[#E7F5EA] px-3 py-1.5 text-xs font-semibold text-[#1B5E20] sm:inline">Ambiente demonstrativo</span><Link to="/dashboard/alerts" aria-label="Abrir alertas" className="relative rounded-lg p-2 text-emerald-900 hover:bg-emerald-50"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" /></Link></div></header><main className="p-4 sm:p-6 xl:p-8">{children}</main></div>
  </div>;
};
export default DashboardLayout;
