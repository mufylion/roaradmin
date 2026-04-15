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

const InputField = ({ label, placeholder, type = "text", prefix, value = "", onChange, className = "" }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{prefix}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${prefix ? 'pl-8' : 'px-4'} py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none ${className}`}
      />
    </div>
  </div>
);

const SelectField = ({ label, children, value = "", onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <select className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer" value={value} onChange={onChange}>
      {children}
    </select>
  </div>
);

const TextAreaField = ({ label, placeholder, rows = "4", value = "", onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
    <textarea 
      rows={rows} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-muted border border-transparent rounded-xl focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
    />
  </div>
);

const CheckboxGroup = ({ title, items, defaultChecked = [] }) => (
  <div>
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            defaultChecked={defaultChecked.includes(item)} 
            className="w-4 h-4 text-primary rounded focus:ring-primary" 
          />
          <span className="text-sm font-medium">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

export {
  FormSection,
  InputField,
  SelectField,
  TextAreaField,
  CheckboxGroup
};
