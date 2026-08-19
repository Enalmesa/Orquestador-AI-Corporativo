import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, TabId } from './components/Sidebar';
import { ChatOrchestrator } from './components/ChatOrchestrator';
import { SubagentMatrix } from './components/SubagentMatrix';
import { KnowledgeBaseManager } from './components/KnowledgeBaseManager';
import { AuditTrailView } from './components/AuditTrailView';
import { AdminDashboard } from './components/AdminDashboard';
import { FinancialCalculator } from './components/FinancialCalculator';
import { CommercialPlan } from './components/CommercialPlan';
import { PitchDeck6Phases } from './components/PitchDeck6Phases';
import { ApiDocs } from './components/ApiDocs';
import { ThesisDocumentation } from './components/ThesisDocumentation';
import { AuthModal } from './components/AuthModal';
import { NotificationCenter } from './components/NotificationCenter';
import { UserProfile, Language, ThemeMode, ComplianceNotification } from './types';
import { INITIAL_NOTIFICATIONS } from './data/knowledgeBase';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<ThemeMode>('navy_dark');
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<ComplianceNotification[]>(INITIAL_NOTIFICATIONS);

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('rag_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'usr-882',
      name: 'Carolina Morales',
      email: 'carolina.morales@empresa.com',
      role: 'compliance_officer',
      department: 'Oficina de Cumplimiento & Fiscalía',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      provider: 'sso_saml',
      e2eeEnabled: true,
      publicKeyFingerprint: 'SHA256:7f889a2b104c8e9d3a1f420e6b5c'
    };
  });

  const handleUpdateUser = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('rag_current_user', JSON.stringify(user));
  };

  useEffect(() => {
    const handleUserChanged = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail) {
        setCurrentUser(customEv.detail);
        localStorage.setItem('rag_current_user', JSON.stringify(customEv.detail));
      }
    };
    window.addEventListener('rag_user_changed', handleUserChanged);
    return () => window.removeEventListener('rag_user_changed', handleUserChanged);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/v1/notifications/read', { method: 'POST' });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  // Theme container classes
  const getThemeClass = () => {
    if (theme === 'corporate_light') {
      return 'bg-slate-100 text-slate-900';
    }
    if (theme === 'emerald_slate') {
      return 'bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950';
    }
    return 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950';
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${getThemeClass()}`}>
      
      {/* Top Navbar */}
      <Navbar
        user={currentUser}
        lang={lang}
        theme={theme}
        unreadCount={notifications.filter(n => !n.read).length}
        onSelectLang={setLang}
        onSelectTheme={setTheme}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Main Layout Body */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          lang={lang}
        />

        {/* Content Workspace Area */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'chat' && <ChatOrchestrator user={currentUser} lang={lang} />}
          {activeTab === 'subagents' && <SubagentMatrix lang={lang} />}
          {activeTab === 'knowledge' && <KnowledgeBaseManager lang={lang} />}
          {activeTab === 'audit' && <AuditTrailView lang={lang} />}
          {activeTab === 'admin' && <AdminDashboard lang={lang} />}
          {activeTab === 'calculator' && <FinancialCalculator lang={lang} />}
          {activeTab === 'commercial' && <CommercialPlan lang={lang} />}
          {activeTab === 'pitch' && <PitchDeck6Phases lang={lang} />}
          {activeTab === 'apidocs' && <ApiDocs lang={lang} />}
          {activeTab === 'thesis' && <ThesisDocumentation lang={lang} />}
        </main>

      </div>

      {/* Auth & RBAC Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        lang={lang}
      />

      {/* Real-time Notifications Drawer */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
        lang={lang}
      />

    </div>
  );
}
