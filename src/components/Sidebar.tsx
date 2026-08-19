import React from 'react';
import { 
  BrainCircuit, 
  Bot, 
  BookOpenCheck, 
  ShieldAlert, 
  LayoutDashboard, 
  Calculator, 
  BadgeDollarSign,
  Layers, 
  Code2, 
  ChevronRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/i18n';

export type TabId = 'chat' | 'subagents' | 'knowledge' | 'audit' | 'admin' | 'calculator' | 'commercial' | 'pitch' | 'apidocs' | 'thesis';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, lang }) => {
  const navItems = [
    { id: 'chat' as TabId, label: t(lang, 'orquestadorRAG'), icon: BrainCircuit, badge: 'RAG' },
    { id: 'subagents' as TabId, label: t(lang, 'subagentes'), icon: Bot, badge: '5' },
    { id: 'knowledge' as TabId, label: t(lang, 'baseConocimiento'), icon: BookOpenCheck },
    { id: 'audit' as TabId, label: t(lang, 'historicoAuditoria'), icon: ShieldAlert, badge: 'E2EE' },
    { id: 'admin' as TabId, label: t(lang, 'panelAdmin'), icon: LayoutDashboard },
    { id: 'calculator' as TabId, label: t(lang, 'calculadoraHH'), icon: Calculator, badge: '-40%' },
    { id: 'commercial' as TabId, label: t(lang, 'planComercial'), icon: BadgeDollarSign, badge: t(lang, 'badgeNuevo') },
    { id: 'pitch' as TabId, label: t(lang, 'fasesTransformacion'), icon: Layers },
    { id: 'apidocs' as TabId, label: t(lang, 'documentacionApi'), icon: Code2, badge: 'v1' },
    { id: 'thesis' as TabId, label: t(lang, 'memoriaTesis'), icon: GraduationCap, badge: 'Tesis' },
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900 p-4 flex flex-col justify-between md:min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
          {t(lang, 'modulosSistema')}
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-950 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>{t(lang, 'verificacionCeroAlucinaciones')}</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          {t(lang, 'basadoEnReglas')}
        </p>
      </div>
    </aside>
  );
};
