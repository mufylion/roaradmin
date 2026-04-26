import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { useAppConfig } from '../config/useAppConfig';
import settingsService from '../services/settingsService';
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
  const { currency, timezone, tax, booking, updateCurrency, updateTimezone, updateTax, updateBooking } = useAppConfig();
  const [activeTab, setActiveTab] = useState('general');
  const [businessInfo, setBusinessInfo] = useState({ name: 'RoarHomes', email: 'support@roarhomes.com', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.fetchSettings();
        if (data) {
          // Map backend settings to local state/config
          if (data.businessName) setBusinessInfo(prev => ({ ...prev, name: data.businessName }));
          if (data.businessEmail) setBusinessInfo(prev => ({ ...prev, email: data.businessEmail }));
          if (data.vatPercent) updateTax({ ...tax, vatRate: data.vatPercent });
          // More mappings can be added here
        }
      } catch (err) {
        console.warn('Failed to fetch settings from API, using defaults');
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const updates = [
        { key: 'businessName', value: businessInfo.name },
        { key: 'businessEmail', value: businessInfo.email },
        { key: 'vatPercent', value: tax.vatRate },
        { key: 'currencyCode', value: currency.code },
      ];
      await settingsService.updateSettings(updates);
      alert('Settings saved successfully');
    } catch (err) {
      alert('Failed to save settings to backend, saved locally instead');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications': return <NotificationRules />;
      case 'payments': return <PaymentGateways />;
      case 'email': return <EmailTemplates />;
      case 'roles': return <UserRoles />;
      default:
        return (
          <>
            <section className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold mb-6">Business Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Platform Name" value={businessInfo.name} onChange={(val) => setBusinessInfo({ ...businessInfo, name: val })} />
                <FormField label="Support Email" type="email" value={businessInfo.email} onChange={(val) => setBusinessInfo({ ...businessInfo, email: val })} />
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-lg font-heading font-bold mb-6">Booking Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="VAT Rate (%)" type="number" value={tax.vatRate} onChange={(val) => updateTax({ ...tax, vatRate: parseFloat(val) })} />
                <FormField 
                  label="Cancellation Policy" 
                  type="select" 
                  value={booking.cancellationPolicy}
                  onChange={(val) => updateBooking({ ...booking, cancellationPolicy: val })}
                  options={booking.cancellationOptions}
                />
              </div>
            </section>

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
                  ]} 
                  onChange={(value) => {
                    const match = value.match(/(\w+)\s*\(([^)]+)\)/);
                    if (match) updateCurrency({ ...currency, code: match[1], symbol: match[2] });
                  }}
                />
                <FormField 
                  label="Timezone" 
                  type="select" 
                  value={timezone.displayName}
                  options={[
                    { value: 'West Africa Time', label: 'West Africa Time' },
                    { value: 'Eastern Time', label: 'Eastern Time' },
                  ]}
                  onChange={(val) => updateTimezone({ ...timezone, displayName: val })}
                />
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
            label: loading ? 'Saving...' : 'Save All Changes',
            icon: 'lucide:save',
            variant: 'primary',
            onClick: handleSave,
            disabled: loading
          }
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <NavButton icon="lucide:globe" label="General" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
            <NavButton icon="lucide:bell" label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            <NavButton icon="lucide:credit-card" label="Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
            <NavButton icon="lucide:shield" label="Roles" active={activeTab === 'roles'} onClick={() => setActiveTab('roles')} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
