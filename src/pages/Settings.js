import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import NotificationRules from './NotificationRules.js';
import PaymentGateways from './PaymentGateways.js';
import EmailTemplates from './EmailTemplates.js';
import UserRoles from './UserRoles.js';

const NavButton = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 border rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
      active
        ? 'bg-card border-border text-primary shadow-sm'
        : 'hover:bg-card border-transparent hover:border-border text-muted-foreground hover:text-foreground'
    }`}
  >
    <Icon icon={icon} className="text-xl" />
    {label}
  </button>
);

const FormField = ({ label, type = "text", value, options }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</label>
    {type === 'select' ? (
      <select className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none">
        {options?.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        defaultValue={value}
        className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
      />
    )}
  </div>
);

export default function Settings() {
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationRules />;
      case 'payments':
        return <PaymentGateways />;
      case 'email':
        return <EmailTemplates />;
      case 'roles':
        return <UserRoles />;
      default:
        return (
          <>
            {/* Site Identity */}
            <section className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold mb-6">Site Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Platform Name" value="RoarHomes" />
                <FormField label="Support Email" type="email" value="support@roarhomes.com" />
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Platform Logo</label>
                  <div className="flex items-center gap-6 p-4 border border-dashed border-border rounded-2xl bg-muted/30">
                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white text-4xl">
                      <Icon icon="lucide:home" />
                    </div>
                    <div className="space-y-2">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                        Upload New Logo
                      </button>
                      <p className="text-[10px] text-muted-foreground">Recommended size: 512x512px. JPG, PNG, SVG allowed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Booking Rules */}
            <section className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold mb-6">Booking Rules</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <p className="text-sm font-bold">Automatic Booking Confirmation</p>
                    <p className="text-xs text-muted-foreground">Enable instant confirmation for verified properties.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={autoConfirm}
                      onChange={() => setAutoConfirm(!autoConfirm)}
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Platform Service Fee (%)" type="number" value={12} />
                  <FormField label="Default Cancellation Window (Hours)" type="number" value={48} />
                </div>
              </div>
            </section>

            {/* Localization */}
            <section className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold mb-6">Localization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField 
                  label="Base Currency" 
                  type="select" 
                  options={["USD ($)", "EUR (°)", "GBP (£)"]} 
                />
                <FormField 
                  label="Timezone" 
                  type="select" 
                  options={["(GMT-05:00) Eastern Time", "(GMT-08:00) Pacific Time", "(GMT+00:00) London"]} 
                />
              </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-destructive/5 rounded-2xl border border-destructive/20 shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold text-destructive mb-2">Danger Zone</h2>
              <p className="text-xs text-muted-foreground mb-6">These actions are permanent and cannot be undone.</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2.5 bg-destructive text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                  Maintenance Mode
                </button>
                <button className="px-6 py-2.5 border border-destructive text-destructive rounded-xl text-xs font-bold hover:bg-destructive/5 transition-colors">
                  Clear System Cache
                </button>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold">Admin Settings</h1>
          <p className="text-sm text-muted-foreground">Configure global platform parameters and system preferences.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
          <span>Save All Changes</span>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <NavButton 
              icon="lucide:globe" 
              label="General Configuration" 
              active={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />
                        <NavButton 
              icon="lucide:bell" 
              label="Notification Rules" 
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            />
            <NavButton 
              icon="lucide:credit-card" 
              label="Payment Gateways" 
              active={activeTab === 'payments'}
              onClick={() => setActiveTab('payments')}
            />
            <NavButton 
              icon="lucide:inbox" 
              label="Email Templates" 
              active={activeTab === 'email'}
              onClick={() => setActiveTab('email')}
            />
            <NavButton 
              icon="lucide:shield" 
              label="User Roles" 
              active={activeTab === 'roles'}
              onClick={() => setActiveTab('roles')}
            />
          </div>

          {/* Settings Forms */}
          <div className="lg:col-span-3 space-y-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
