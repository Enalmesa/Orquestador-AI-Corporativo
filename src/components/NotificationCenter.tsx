import React from 'react';
import { X, Bell, AlertCircle, Info, ShieldAlert, Check } from 'lucide-react';
import { ComplianceNotification, Language } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: ComplianceNotification[];
  onMarkAllAsRead: () => void;
  lang?: Language;
}

const NOTIFICATION_TEXTS: Record<Language, Record<string, string>> = {
  es: {
    header: 'Notificaciones en Tiempo Real',
    markAllRead: 'Marcar todas como leídas'
  },
  en: {
    header: 'Real-Time Notifications',
    markAllRead: 'Mark all as read'
  },
  pt: {
    header: 'Notificações em Tempo Real',
    markAllRead: 'Marcar todas como lidas'
  }
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  lang = 'es'
}) => {
  if (!isOpen) return null;

  const txt = NOTIFICATION_TEXTS[lang] || NOTIFICATION_TEXTS['es'];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">{txt.header}</h3>
          </div>
          <button 
            id="close-notifications-drawer"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`rounded-lg border p-3.5 space-y-1 transition ${
                n.severity === 'critical' ? 'border-rose-500/40 bg-rose-950/20' :
                n.severity === 'warning' ? 'border-amber-500/40 bg-amber-950/20' :
                'border-slate-800 bg-slate-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase rounded px-1.5 py-0.5 ${
                  n.severity === 'critical' ? 'bg-rose-500/20 text-rose-300' :
                  n.severity === 'warning' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {n.category}
                </span>
                <span className="text-[10px] text-slate-500">{n.timestamp}</span>
              </div>

              <h4 className="text-xs font-bold text-white mt-1">{n.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <button
          id="mark-all-notifications-read-btn"
          onClick={onMarkAllAsRead}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
        >
          <Check className="h-4 w-4" />
          <span>{txt.markAllRead}</span>
        </button>
      </div>
    </div>
  );
};
