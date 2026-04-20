import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { useAppConfig, useFormatCurrency } from '../config/useAppConfig';
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

const FormField = ({ label, type = "text", value, options, onChange, readOnly = false }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</label>
    {type === 'select' ? (
      <select 
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
      >
        {options?.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        readOnly={readOnly}
        className={`w-full px-4 py-2.5 border-none rounded-xl text-sm outline-none ${
          readOnly 
            ? 'bg-card text-muted-foreground cursor-not-allowed' 
            : 'bg-muted focus:ring-2 focus:ring-primary'
        }`}
      />
    )}
  </div>
);

export default function Settings() {
  const { config, currency, timezone, tax, updateCurrency, updateTimezone, updateTax, resetToDefaults } = useAppConfig();
  const [activeTab, setActiveTab] = useState('general');
  const [autoConfirm, setAutoConfirm] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationRules />;
      case 'payments':
        return <PaymentGateways key={currency.symbol} />;
      case 'email':
        return <EmailTemplates />;
      case 'roles':
        return <UserRoles />;
      default:
        return (
          <>
            

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
                  <FormField label="VAT Rate (%)" type="number" value={tax.vatRate} readOnly />
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
                  value={`${currency.code} (${currency.symbol})`}
                  options={[
                    { value: 'NGN (₦)', label: 'NGN (₦)' },
                    { value: 'USD ($)', label: 'USD ($)' },
                    { value: 'EUR (°)', label: 'EUR (°)' },
                    { value: 'GBP (£)', label: 'GBP (£)' }
                  ]} 
                  onChange={(value) => {
                    // Parse the selected value to extract code and symbol
                    const match = value.match(/(\w+)\s*\(([^)]+)\)/);
                    if (match) {
                      const [, code, symbol] = match;
                      const currencyNames = {
                        'NGN': 'Nigerian Naira',
                        'USD': 'US Dollar',
                        'EUR': 'Euro',
                        'GBP': 'British Pound'
                      };
                      updateCurrency({ 
                        code, 
                        symbol, 
                        name: currencyNames[code] || code, 
                        decimalPlaces: 2, 
                        thousandsSeparator: ',', 
                        decimalSeparator: '.' 
                      });
                    }
                  }}
                />
                <FormField 
                  label="Timezone" 
                  type="select" 
                  value={`(GMT${timezone.offset}) ${timezone.displayName} (${timezone.city})`}
                  options={[
                    { value: '(GMT+01:00) West Africa Time (Lagos)', label: '(GMT+01:00) West Africa Time (Lagos)' },
                    { value: '(GMT-05:00) Eastern Time', label: '(GMT-05:00) Eastern Time' },
                    { value: '(GMT-08:00) Pacific Time', label: '(GMT-08:00) Pacific Time' },
                    { value: '(GMT+00:00) London', label: '(GMT+00:00) London' }
                  ]}
                  onChange={(value) => {
                    // Parse the selected value to extract timezone info
                    const match = value.match(/\(GMT([+-]\d{2}:\d{2})\)\s+(.+?)\s*\((.+?)\)/);
                    if (match) {
                      const [, offset, displayName, city] = match;
                      const utcOffset = parseInt(offset.replace(':', '')) * (offset.startsWith('+') ? 1 : -1) / 100 * 60;
                      const name = displayName.includes('West Africa') ? 'WAT' : 
                                   displayName.includes('Eastern') ? 'EST' :
                                   displayName.includes('Pacific') ? 'PST' : 'GMT';
                      updateTimezone({ name, displayName, city, offset, utcOffset });
                    }
                  }}
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
      <PageHeader
        title="Admin Settings"
        description="Configure global platform parameters and system preferences."
        actions={[
          {
            type: 'button',
            label: 'Save All Changes',
            shortLabel: 'Save',
            icon: 'lucide:save',
            variant: 'primary'
          }
        ]}
      />

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
