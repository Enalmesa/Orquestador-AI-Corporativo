import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Globe, 
  Bell, 
  User, 
  ChevronDown, 
  Key, 
  LogOut, 
  Sparkles,
  Lock,
  Moon,
  Sun,
  Palette
} from 'lucide-react';
import { UserProfile, Language, ThemeMode } from '../types';
import { t } from '../utils/i18n';

interface NavbarProps {
  user: UserProfile;
  lang: Language;
  theme: ThemeMode;
  unreadCount: number;
  onSelectLang: (lang: Language) => void;
  onSelectTheme: (theme: ThemeMode) => void;
  onOpenAuthModal: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  lang,
  theme,
  unreadCount,
  onSelectLang,
  onSelectTheme,
  onOpenAuthModal,
  onOpenNotifications
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo & System Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20">
            <BrainCircuit className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold tracking-tight text-white md:text-lg">
                {t(lang, 'appTitle')}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                PoC RAG
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">
              {t(lang, 'appSubtitle')}
            </p>
          </div>
        </div>

        {/* Status Indicators & Action Tools */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* E2EE Security Status Pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t(lang, 'seguridadE2EE')}</span>
          </div>

          {/* Subagents Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-bold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>{t(lang, 'cincoSubagentes')}</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="lang-select-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span className="uppercase">{lang}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 rounded-lg border border-slate-800 bg-slate-900 p-1 shadow-xl z-50">
                <button
                  id="lang-option-es"
                  onClick={() => { onSelectLang('es'); setShowLangMenu(false); }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-xs rounded-md ${lang === 'es' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <span>Español</span>
                  {lang === 'es' && <span className="text-xs">✓</span>}
                </button>
                <button
                  id="lang-option-en"
                  onClick={() => { onSelectLang('en'); setShowLangMenu(false); }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-xs rounded-md ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <span>English</span>
                  {lang === 'en' && <span className="text-xs">✓</span>}
                </button>
                <button
                  id="lang-option-pt"
                  onClick={() => { onSelectLang('pt'); setShowLangMenu(false); }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-xs rounded-md ${lang === 'pt' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <span>Português</span>
                  {lang === 'pt' && <span className="text-xs">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="relative">
            <button
              id="theme-select-btn"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700 transition"
              title="Ajustar Tema"
            >
              <Palette className="h-4 w-4 text-indigo-400" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-800 bg-slate-900 p-1 shadow-xl z-50">
                <button
                  id="theme-navy"
                  onClick={() => { onSelectTheme('navy_dark'); setShowThemeMenu(false); }}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs rounded-md ${theme === 'navy_dark' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>{t(lang, 'modoOscuro')}</span>
                </button>
                <button
                  id="theme-light"
                  onClick={() => { onSelectTheme('corporate_light'); setShowThemeMenu(false); }}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs rounded-md ${theme === 'corporate_light' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <Sun className="h-3.5 w-3.5" />
                  <span>{t(lang, 'modoClaro')}</span>
                </button>
                <button
                  id="theme-emerald"
                  onClick={() => { onSelectTheme('emerald_slate'); setShowThemeMenu(false); }}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs rounded-md ${theme === 'emerald_slate' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{t(lang, 'modoEmerald')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <button
            id="notifications-btn"
            onClick={onOpenNotifications}
            className="relative rounded-md border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700 transition"
          >
            <Bell className="h-4 w-4 text-slate-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white border-2 border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Button / Auth Modal Launcher */}
          <button
            id="user-profile-btn"
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-1.5 pr-3 text-xs font-medium text-white hover:border-slate-700 transition"
          >
            <div className="relative h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <div className="font-semibold text-slate-200 text-xs truncate max-w-[120px]">{user.name}</div>
              <div className="text-[10px] text-slate-500 capitalize">{user.role.replace('_', ' ')}</div>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};
