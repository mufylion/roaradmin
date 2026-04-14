import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { AppConfigProvider } from './config/useAppConfig';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Financials from './pages/Financials';
import Settings from './pages/Settings';
import NotificationRules from './pages/NotificationRules';
import NotificationCenter from './pages/NotificationCenter';
import GuestProfileOverview from './pages/GuestProfileOverview';
import AddNewListing from './pages/AddNewListing';
import EditListing from './pages/EditListing';
import CreateBooking from './pages/CreateBooking';
import AddNewUser from './pages/AddNewUser';
import RecordExpense from './pages/RecordExpense';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppConfigProvider>
      <Router>
      <div className="min-h-screen bg-background flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Fixed Position */}
        <div className={`
          fixed inset-y-0 left-0 z-50 h-screen
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 lg:ml-64 min-h-screen">
          {/* Mobile Header with Hamburger */}
          <header className="lg:hidden h-16 bg-card border-b border-border px-4 flex items-center justify-between sticky top-0 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <Icon icon="lucide:menu" className="text-xl" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon icon="lucide:home" className="text-white text-lg" />
              </div>
              <span className="text-sm font-heading font-bold">RoarHomes Admin</span>
            </div>
          </header>

          {/* Routes - Scrollable Content */}
          <div className="overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/add-new" element={<AddNewListing />} />
              <Route path="/listings/edit/:id" element={<EditListing />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/create" element={<CreateBooking />} />
              <Route path="/bookings/edit/:id" element={<CreateBooking />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/add-new" element={<AddNewUser />} />
              <Route path="/users/edit/:id" element={<AddNewUser />} />
              <Route path="/users/profile/:id" element={<GuestProfileOverview />} />
              <Route path="/financials" element={<Financials />} />
              <Route path="/financials/record-expense" element={<RecordExpense />} />
              <Route path="/financials/edit-expense/:id" element={<RecordExpense />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/notification-rules" element={<NotificationRules />} />
              <Route path="/notifications" element={<NotificationCenter />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </AppConfigProvider>
  );
}

export default App;
