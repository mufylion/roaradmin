import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const initialTemplates = [
  {
    id: 1,
    title: 'Booking Confirmation (Guest)',
    description: 'Sent automatically after successful payment.',
    icon: 'lucide:mail',
    subject: 'Booking Confirmed - Your Property',
    content: '<p>Dear Guest,</p><p>Your booking has been confirmed!</p><p><strong>Booking Details:</strong></p><ul><li>Check-in: [Check-in Date]</li><li>Check-out: [Check-out Date]</li><li>Guests: [Number of Guests]</li><li>Total Amount: [Total Amount]</li></ul><p>We look forward to welcoming you!</p><p>Best regards,<br/>RoarHomes Team</p>'
  },
  {
    id: 2,
    title: 'New Booking Alert (Host)',
    description: 'Sent to host when a new booking is made.',
    icon: 'lucide:bell',
    subject: 'New Booking Received - Your Property',
    content: '<p>Hi Host,</p><p>You have a new booking for your property!</p><p><strong>Guest Information:</strong></p><ul><li>Guest: [Guest Name]</li><li>Check-in: [Check-in Date]</li><li>Check-out: [Check-out Date]</li><li>Guests: [Number of Guests]</li><li>Total Amount: [Total Amount]</li></ul><p>Please prepare for their arrival.</p><p>Best regards,<br/>RoarHomes Team</p>'
  },
  {
    id: 3,
    title: 'Welcome New User',
    description: 'Sent when a new user registers on the platform.',
    icon: 'lucide:user-plus',
    subject: 'Welcome to RoarHomes!',
    content: '<p>Dear [User Name],</p><p>Welcome to RoarHomes! We are excited to have you join our community.</p><p><strong>Getting Started:</strong></p><ul><li>Complete your profile to build trust with other users</li><li>Verify your email address for full platform access</li><li>Explore our wide range of properties</li><li>Book your first stay or list your property</li></ul><p>If you have any questions, our support team is here to help you.</p><p>Best regards,<br/>RoarHomes Team</p>'
  }
];

const TemplateItem = ({ icon, title, description, onEdit, onPreview }) => (
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
        <button 
          onClick={onEdit}
          className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-primary transition-colors"
          title="Edit Template"
        >
          <Icon icon="lucide:pencil" />
        </button>
        <button 
          onClick={onPreview}
          className="p-2 hover:bg-card rounded-lg text-muted-foreground hover:text-primary transition-colors"
          title="Preview Template"
        >
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
  const [templates, setTemplates] = useState(initialTemplates);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [previewingTemplate, setPreviewingTemplate] = useState(null);
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    description: '',
    icon: 'lucide:mail',
    subject: '',
    content: ''
  });

  const handleEditTemplate = (template) => {
    setEditingTemplate({ ...template });
  };

  const handlePreviewTemplate = (template) => {
    setPreviewingTemplate(template);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id ? editingTemplate : t
      ));
      setEditingTemplate(null);
    }
  };

  const handleCreateTemplate = () => {
    if (newTemplate.title && newTemplate.subject && newTemplate.content) {
      const template = {
        ...newTemplate,
        id: Date.now()
      };
      setTemplates([...templates, template]);
      setNewTemplate({
        title: '',
        description: '',
        icon: 'lucide:mail',
        subject: '',
        content: ''
      });
      setShowNewTemplateForm(false);
    }
  };

  const renderTemplateEditor = () => {
    if (!editingTemplate) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl border border-border shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Edit Template</h3>
              <button 
                onClick={() => setEditingTemplate(null)}
                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Template Title</label>
                <input 
                  type="text" 
                  value={editingTemplate.title}
                  onChange={(e) => setEditingTemplate({...editingTemplate, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                <input 
                  type="text" 
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({...editingTemplate, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Subject</label>
              <input 
                type="text" 
                value={editingTemplate.subject}
                onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Content (HTML)</label>
              <textarea 
                rows={12}
                value={editingTemplate.content}
                onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none resize-none font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">Use placeholder text like [Guest Name], [Property Name], etc. for dynamic content.</p>
            </div>
          </div>
          
          <div className="p-6 border-t border-border flex justify-end gap-3">
            <button 
              onClick={() => setEditingTemplate(null)}
              className="px-6 py-2.5 border border-border text-muted-foreground rounded-xl text-xs font-bold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveTemplate}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplatePreview = () => {
    if (!previewingTemplate) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl border border-border shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Template Preview</h3>
                <p className="text-sm text-muted-foreground mt-1">{previewingTemplate.title}</p>
              </div>
              <button 
                onClick={() => setPreviewingTemplate(null)}
                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject</label>
              <div className="px-4 py-2.5 bg-muted rounded-xl text-sm">
                {previewingTemplate.subject}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Preview</label>
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <p className="text-xs text-muted-foreground">Email Content</p>
                </div>
                <div className="p-6 bg-white">
                  <div className="prose prose-sm max-w-none">
                    {previewingTemplate.content.split(/({{[^}]+}})/).map((part, index) => {
                      if (part.startsWith('{{') && part.endsWith('}}')) {
                        return (
                          <span key={index} className="bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded text-xs font-mono">
                            {part}
                          </span>
                        );
                      }
                      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border flex justify-end">
            <button 
              onClick={() => setPreviewingTemplate(null)}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderNewTemplateForm = () => {
    if (!showNewTemplateForm) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl border border-border shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Create New Template</h3>
              <button 
                onClick={() => setShowNewTemplateForm(false)}
                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Template Title</label>
                <input 
                  type="text" 
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                  placeholder="e.g., Welcome Email"
                  className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                <input 
                  type="text" 
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  placeholder="Brief description of when this email is sent"
                  className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Subject</label>
              <input 
                type="text" 
                value={newTemplate.subject}
                onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                placeholder="e.g., Welcome to {{platform_name}}!"
                className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Content (HTML)</label>
              <textarea 
                rows={12}
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                placeholder='<p>Dear Guest,</p><p>Welcome to RoarHomes!</p>'
                className="w-full px-4 py-2.5 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none resize-none font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">Use placeholder text like [Guest Name], [Property Name], etc. for dynamic content.</p>
            </div>
          </div>
          
          <div className="p-6 border-t border-border flex justify-end gap-3">
            <button 
              onClick={() => setShowNewTemplateForm(false)}
              className="px-6 py-2.5 border border-border text-muted-foreground rounded-xl text-xs font-bold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateTemplate}
              disabled={!newTemplate.title || !newTemplate.subject || !newTemplate.content}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderTemplateEditor()}
      {renderTemplatePreview()}
      {renderNewTemplateForm()}
      
      <div className="space-y-8">
        {/* Template List */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-bold">Available Templates</h2>
            <button 
              onClick={() => setShowNewTemplateForm(true)}
              className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
            >
              <Icon icon="lucide:plus" />
              New Template
            </button>
          </div>
          
          <div className="space-y-4">
            {templates.map((template) => (
              <TemplateItem 
                key={template.id}
                icon={template.icon} 
                title={template.title} 
                description={template.description}
                onEdit={() => handleEditTemplate(template)}
                onPreview={() => handlePreviewTemplate(template)}
              />
            ))}
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
    </>
  );
}
