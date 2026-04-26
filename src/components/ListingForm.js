import React from 'react';
import { Icon } from '@iconify/react';

const FormSection = ({ title, icon, children }) => (
  <section className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
    <h2 className="text-lg font-heading font-bold flex items-center gap-2">
      <Icon icon={icon} className="text-primary" />
      {title}
    </h2>
    {children}
  </section>
);

const InputField = ({ label, name, placeholder, type = "text", prefix, value, onChange, className = "" }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{prefix}</span>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${prefix ? 'pl-8' : 'px-4'} py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none ${className}`}
      />
    </div>
  </div>
);

const SelectField = ({ label, name, children, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <select 
      name={name}
      value={value} 
      onChange={onChange}
      className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
    >
      {children}
    </select>
  </div>
);

const TextAreaField = ({ label, name, placeholder, rows = "4", value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <textarea 
      name={name}
      rows={rows} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
    />
  </div>
);

const CheckboxGroup = ({ title, items, selectedItems = [], onChange }) => (
  <div>
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-3 cursor-pointer group">
          <div 
            onClick={() => onChange(item)}
            className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
              selectedItems.includes(item) 
                ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                : 'border-muted-foreground/30 hover:border-primary'
            }`}
          >
            {selectedItems.includes(item) && <Icon icon="lucide:check" className="text-white text-xs" />}
          </div>
          <span className={`text-sm transition-colors ${selectedItems.includes(item) ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
            {item}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const FileField = ({ label, onChange, multiple = true, loading = false }) => (
  <div className="space-y-4">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <div className="relative group">
      <input 
        type="file" 
        multiple={multiple} 
        onChange={onChange}
        className="hidden" 
        id="file-upload" 
        disabled={loading}
      />
      <label 
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-48 bg-muted/30 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 hover:border-primary transition-all group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {loading ? (
              <Icon icon="lucide:loader-2" className="text-2xl text-primary animate-spin" />
            ) : (
              <Icon icon="lucide:cloud-upload" className="text-2xl text-primary" />
            )}
          </div>
          <p className="mb-2 text-sm text-foreground font-bold">
            {loading ? 'Uploading images...' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 20MB per file)</p>
        </div>
      </label>
    </div>
  </div>
);

export {
  FormSection,
  InputField,
  SelectField,
  TextAreaField,
  CheckboxGroup,
  FileField
};
