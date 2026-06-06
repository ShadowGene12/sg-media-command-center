import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { User, CreditCard, Users, Bell, Blocks } from 'lucide-react';

const SETTINGS_NAV = [
  { label: 'Account Profile', path: '/settings/account', icon: User },
  { label: 'Billing & Plan', path: '/settings/billing', icon: CreditCard },
  { label: 'Organization', path: '/settings/organization', icon: Users },
  { label: 'Notifications', path: '/settings/notifications', icon: Bell },
  { label: 'Integrations', path: '/settings/integrations', icon: Blocks },
];

export default function SettingsLayout() {
  const location = useLocation();

  // If we are exactly on /settings, redirect or show a default.
  // Using Outlet directly works if we setup index routes, but we'll assume App.tsx will handle redirects.
  
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Settings</h1>
        <p className="text-lg text-slate-400">Manage your account, billing, and team preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            {SETTINGS_NAV.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-500'}`} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
