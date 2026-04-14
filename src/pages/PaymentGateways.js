import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAppConfig } from '../config/useAppConfig';

export default function PaymentGateways() {
  const { config } = useAppConfig();
  const [taxWithholding, setTaxWithholding] = useState(false);
  
  // Debug log to check if currency is updating
  console.log('PaymentGateways - Current currency symbol:', config.currency.symbol);

  return (
    <div className="space-y-8">
      {/* Connected Gateways */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">Connected Gateways</h2>
        <div className="space-y-4">
          {/* Stripe */}
          <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#635BFF] text-white rounded-xl flex items-center justify-center">
                <Icon icon="logos:stripe" className="text-3xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">Stripe Payments</p>
                  <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase">Connected</span>
                </div>
                <p className="text-xs text-muted-foreground italic">Last synced: 10 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-card border border-border rounded-xl text-xs font-bold hover:bg-muted transition-colors">Configure</button>
              <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-xl text-xs font-bold hover:bg-destructive hover:text-white transition-all">Disconnect</button>
            </div>
          </div>
          
          {/* PayPal */}
          <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center">
                <Icon icon="logos:paypal" className="text-2xl" />
              </div>
              <div>
                <p className="text-sm font-bold">PayPal Checkout</p>
                <p className="text-xs text-muted-foreground italic">Not connected</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">Connect PayPal</button>
          </div>
        </div>
      </div>

      {/* Payout Settings */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">Payout Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payout Schedule</label>
            <select className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none">
              <option>Daily</option>
              <option defaultValue="Weekly (Mondays)">Weekly (Mondays)</option>
              <option>Monthly (1st)</option>
              <option>Manual Only</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Minimum Payout ({config.currency.symbol})</label>
            <input 
              type="number" 
              defaultValue="50" 
              className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex gap-3 items-center">
              <Icon icon="lucide:info" className="text-primary text-xl" />
              <div>
                <p className="text-xs font-bold text-primary">Automatic Tax Withholding</p>
                <p className="text-[10px] text-primary/80">Enable this to automatically deduct local taxes based on host location.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={taxWithholding}
                onChange={() => setTaxWithholding(!taxWithholding)}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Transaction Fees */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h2 className="text-lg font-heading font-bold mb-6">Transaction Fees</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Standard Processing Fee</p>
            <p className="text-sm font-bold">2.9% + {config.currency.symbol}0.30</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">International Surcharge</p>
            <p className="text-sm font-bold">+1.5%</p>
          </div>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <p className="text-sm font-bold">Total Estimated Platform Fee</p>
            <p className="text-sm font-bold text-primary">4.4% + {config.currency.symbol}0.30</p>
          </div>
        </div>
      </div>
    </div>
  );
}
