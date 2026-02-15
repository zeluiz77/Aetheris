
import React, { useState, useEffect } from 'react';
import { backend, AppNotification } from '../services/backendService.ts';

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    return backend.onNotification((notif) => {
      setNotifications(prev => [notif, ...prev].slice(0, 3));
      
      // Auto-remove após 6 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notif.id));
      }, 6000);
    });
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-[500] flex flex-col gap-4 pointer-events-none w-full max-w-sm">
      {notifications.map((n) => (
        <div 
          key={n.id} 
          className="pointer-events-auto glass p-6 rounded-3xl border-cyan-500/30 bg-black/80 backdrop-blur-3xl shadow-2xl animate-in slide-in-from-right-10 duration-500 flex items-start gap-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
          
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
            {n.type === 'yield_milestone' && '💰'}
            {n.type === 'level_up' && '⭐'}
            {n.type === 'purchase_success' && '📦'}
            {n.type === 'network_alert' && '⚠️'}
          </div>

          <div className="flex-1">
            <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{n.title}</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed">{n.message}</p>
          </div>

          <button 
            onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
            className="text-[10px] text-gray-700 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
