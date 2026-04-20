import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const ToggleSwitch = ({ defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );
};

const CheckboxGroup = ({ label, defaultChecked = {} }) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleToggle = (type) => {
    setChecked(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl border border-border items-center">
      <div className="md:col-span-1">
        <p className="text-sm font-bold">{label}</p>
      </div>
      <div className="md:col-span-2 flex gap-6">
        {['Email', 'Push', 'SMS'].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              checked={checked[type] || false}
              onChange={() => handleToggle(type)}
            />
            <span className="text-xs font-medium">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default function NotificationRules() {
  const [criticalErrors, setCriticalErrors] = useState(true);
  const [suspiciousActivity, setSuspiciousActivity] = useState(true);
  const [marketingAutomation, setMarketingAutomation] = useState(false);

  return (
    <div className="space-y-8">
      {/* System Alerts */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">System Alerts</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center shrink-0">
                <Icon icon="lucide:circle-alert" className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-bold">Critical Error Notifications</p>
                <p className="text-xs text-muted-foreground">Alert admins immediately on server or payment failures.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={criticalErrors}
                onChange={() => setCriticalErrors(!criticalErrors)}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                <Icon icon="lucide:shield" className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-bold">Suspicious Activity Reports</p>
                <p className="text-xs text-muted-foreground">Notify on multiple failed login attempts or unusual booking patterns.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={suspiciousActivity}
                onChange={() => setSuspiciousActivity(!suspiciousActivity)}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* User & Booking Events */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">User & Booking Events</h2>
        <div className="space-y-4">
          <CheckboxGroup 
            label="New Booking" 
            defaultChecked={{ Email: true, Push: true, SMS: false }}
          />
          <CheckboxGroup 
            label="Listing Approved" 
            defaultChecked={{ Email: true, Push: true, SMS: false }}
          />
          {/* <CheckboxGroup 
            label="Payout Success" 
            defaultChecked={{ Email: true, Push: true, SMS: false }}
          /> */}
        </div>
      </div>

      {/* Marketing & Newsletter */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">Marketing & Newsletter</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Marketing Automation</p>
              <p className="text-xs text-muted-foreground">Allow system to send personalized booking recommendations.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={marketingAutomation}
                onChange={() => setMarketingAutomation(!marketingAutomation)}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
