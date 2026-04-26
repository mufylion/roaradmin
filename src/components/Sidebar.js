import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import authService from '../services/authService';

const CloseButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
  >
    <Icon icon="lucide:x" className="text-white text-lg" />
  </button>
);

const SidebarItem = ({ icon, label, active = false, to = "#", onClose }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (active && to === "#");
  
  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`flx items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
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

export default function Sidebar({ onClose }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await authService.logout();
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase();
  };

  return (
    <aside className="w-64 h-screen bg-secondary text-white flex flex-col border-r border-border shrink-0 relative">
      <CloseButton onClose={onClose} />
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon icon="lucide:home" className="text-white text-xl" />
        </div>
        <span className="text-xl font-heading font-bold tracking-tight">Roar Homes</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        <SidebarItem icon="lucide:layout-dashboard" label="Dashboard" to="/dashboard" onClose={onClose} />
        <SidebarItem icon="lucide:layers" label="Listings" to="/listings" onClose={onClose} />
        <SidebarItem icon="lucide:calendar-days" label="Schedule" to="/schedule" onClose={onClose} />
        <SidebarItem icon="lucide:calendar" label="Bookings" to="/bookings" onClose={onClose} />
        <SidebarItem icon="lucide:users" label="Users" to="/users" onClose={onClose} />
        <SidebarItem icon="lucide:credit-card" label="Financials" to="/financials" onClose={onClose} />
        <SidebarItem icon="lucide:star" label="Reviews" to="/reviews" onClose={onClose} />
        <SidebarItem icon="lucide:file-text" label="Content" to="/content" onClose={onClose} />
        <div className="pt-4 mt-4 border-t border-white/10">
          <SidebarItem icon="lucide:settings" label="Settings" to="/settings" onClose={onClose} />
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div 
          onClick={handleLogout}
          className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 group cursor-pointer hover:bg-white/10 transition-colors"
        >
          {user ? (
            <div className="w-10 h-10 rounded-full border border-white/20 bg-primary flex items-center justify-center text-white font-bold text-sm">
              {getInitials(user.firstName, user.lastName)}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 animate-pulse" />
          )}
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">
              {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
            </p>
            <p className="text-xs truncate text-white/70">
              {user?.role === 'admin' ? 'Super Admin' : user?.role || 'Admin'}
            </p>
          </div>
          <Icon icon="lucide:log-out" className="text-lg text-white/70 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}
