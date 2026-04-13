import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const SidebarItem = ({ icon, label, active = false, to = "#" }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (active && to === "#");
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? 'bg-primary text-white shadow-sm'
          : 'hover:bg-white/10 text-white'
      }`}
    >
      <Icon icon={icon} className="text-xl" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-secondary text-secondary-foreground flex flex-col border-r border-border shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon icon="lucide:home" className="text-white text-xl" />
        </div>
        <span className="text-xl font-heading font-bold tracking-tight">RoarHomes Admin</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        <SidebarItem icon="lucide:layout-dashboard" label="Dashboard" to="/dashboard" />
        <SidebarItem icon="lucide:layers" label="Listings" to="/listings" />
        <SidebarItem icon="lucide:calendar" label="Bookings" to="/bookings" />
        <SidebarItem icon="lucide:users" label="Users" to="/users" />
        <SidebarItem icon="lucide:credit-card" label="Financials" to="/financials" />
        <div className="pt-4 mt-4 border-t border-white/10">
          <SidebarItem icon="lucide:settings" label="Settings" to="/settings" />
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 group cursor-pointer hover:bg-white/10 transition-colors">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full border border-white/20" alt="Admin" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">Alex Rivera</p>
            <p className="text-xs truncate text-white/70">Super Admin</p>
          </div>
          <Icon icon="lucide:log-out" className="text-lg text-white/70 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}
