import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';

const FormSection = ({ title, icon, children }) => (
  <section className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
    <h2 className="text-lg font-heading font-bold flex items-center gap-2">
      <Icon icon={icon} className="text-primary" />
      {title}
    </h2>
    {children}
  </section>
);

const InputField = ({ label, placeholder, type = "text", prefix }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{prefix}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full ${prefix ? 'pl-8' : 'px-4'} py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none`}
      />
    </div>
  </div>
);

export default function AddNewListing() {
  const [status, setStatus] = useState('publish');

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/listings" className="p-2 hover:bg-muted rounded-xl transition-colors">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold">Add New Listing</h1>
            <p className="text-sm text-muted-foreground">Step 1 of 3: Basic Information</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-muted transition-all active:scale-95 uppercase tracking-widest">
            Save Draft
          </button>
          <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest">
            Next Step
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <FormSection title="Property Details" icon="lucide:info">
              <div className="space-y-4">
                <InputField label="Listing Title" placeholder="e.g. Modern Downtown Loft" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Property Type</label>
                    <select className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer">
                      <option>Apartment</option>
                      <option>House</option>
                      <option>Villa</option>
                      <option>Cabin</option>
                    </select>
                  </div>
                  <InputField label="Base Price (Nightly)" placeholder="0.00" type="number" prefix="$" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea 
                    rows="4" 
                    placeholder="Describe the unique features of your property..." 
                    className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </FormSection>

            <FormSection title="Location" icon="lucide:map-pin">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <InputField label="Street Address" placeholder="123 Luxury Ave" />
                </div>
                <InputField label="City" placeholder="New York" />
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Country</label>
                  <select className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </FormSection>
          </div>

          {/* Right Column: Media & Status */}
          <div className="space-y-6">
            <FormSection title="Cover Photo" icon="lucide:image">
              <div className="relative group cursor-pointer">
                <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all">
                  <Icon icon="lucide:upload-cloud" className="text-4xl text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className="text-xs font-black uppercase mt-2 text-muted-foreground group-hover:text-primary">Click to upload</p>
                  <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                </div>
              </div>
            </FormSection>

            <FormSection title="Listing Status" icon="lucide:shield">
              <div className="space-y-4">
                <div 
                  onClick={() => setStatus('publish')}
                  className={`flex items-center justify-between p-3 bg-muted/50 rounded-xl border transition-all cursor-pointer group ${status === 'publish' ? 'border-primary/20' : 'border-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${status === 'publish' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}></div>
                    <span className={`text-sm font-bold ${status !== 'publish' && 'opacity-50'}`}>Publish Immediately</span>
                  </div>
                  {status === 'publish' && <Icon icon="lucide:check" className="text-primary" />}
                </div>
                
                <div 
                  onClick={() => setStatus('draft')}
                  className={`flex items-center justify-between p-3 bg-muted/50 rounded-xl border transition-all cursor-pointer group ${status === 'draft' ? 'border-primary/20' : 'border-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${status === 'draft' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}></div>
                    <span className={`text-sm font-bold ${status !== 'draft' && 'opacity-50'}`}>Save as Draft</span>
                  </div>
                  {status === 'draft' && <Icon icon="lucide:check" className="text-primary" />}
                </div>
              </div>
            </FormSection>

            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                <Icon icon="lucide:flame" />
                Pro Tip
              </h3>
              <p className="text-xs text-primary/80 leading-relaxed">
                Listings with high-quality photos and detailed descriptions receive 40% more bookings on average.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
