import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Financials from './pages/Financials';
import Settings from './pages/Settings';
import NotificationRules from './pages/NotificationRules';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-row">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/notification-rules" element={<NotificationRules />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
