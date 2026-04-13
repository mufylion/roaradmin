import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const TemplateItem = ({ icon, title, description }) => (
  <div className="p-4 bg-muted/30 rounded-xl border border-border group hover:border-primary transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
          <Icon icon={icon} className="text-xl" />
        </div>
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xs text-muted-foreground italic">{description}</p>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-primary transition-colors">
          <Icon icon="lucide:pencil" />
        </button>
        <button className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-primary transition-colors">
          <Icon icon="lucide:eye" />
        </button>
      </div>
    </div>
  </div>
);

export default function EmailTemplates() {
  const [senderName, setSenderName] = useState('RoarHomes Support');
  const [accentColor, setAccentColor] = useState('#2563EB');
  const [footerText, setFooterText] = useState('© 2024 RoarHomes Inc. All rights reserved. 123 Travel Lane, Suite 100, San Francisco, CA 94103.');

  return (
    <div className="space-y-8">
      {/* Template List */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-bold">Available Templates</h2>
          <button className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2">
            <Icon icon="lucide:plus" />
            New Template
          </button>
        </div>
        
        <div className="space-y-4">
          <TemplateItem 
            icon="lucide:mail" 
            title="Booking Confirmation (Guest)" 
            description="Sent automatically after successful payment." 
          />
          <TemplateItem 
            icon="lucide:bell" 
            title="New Booking Alert (Host)" 
            description="Sent to host when a new booking is made." 
          />
          <TemplateItem 
            icon="lucide:credit-card" 
            title="Payout Processed (Host)" 
            description="Sent after a payout is successfully initiated." 
          />
        </div>
      </div>

      {/* Email Branding */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">Global Branding</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sender Name</label>
            <input 
              type="text" 
              value={senderName} 
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Accent Color</label>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 bg-primary rounded-xl border border-border shrink-0" 
                style={{ backgroundColor: accentColor }}
              ></div>
              <input 
                type="text" 
                value={accentColor} 
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary uppercase outline-none" 
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Footer Text</label>
            <textarea 
              rows={3} 
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
