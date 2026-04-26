import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import contentService from '../services/contentService';

export default function Content() {
  const [activeTab, setActiveTab] = useState('pages');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', status: 'draft', type: 'page' });

  const fetchContent = async (type) => {
    setLoading(true);
    try {
      const data = await contentService.fetchContent(type);
      setContent(data);
    } catch (err) {
      console.error('Failed to fetch content');
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(activeTab === 'pages' ? 'page' : activeTab === 'blog' ? 'post' : 'media');
  }, [activeTab]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({ title: item.title, status: item.status, type: item.type });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await contentService.deleteContent(id);
        fetchContent(activeTab === 'pages' ? 'page' : activeTab === 'blog' ? 'post' : 'media');
      } catch (err) {
        alert('Failed to delete content');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (selectedItem) {
        await contentService.updateContent(selectedItem.id, formData);
      } else {
        await contentService.createContent(formData.type, formData);
      }
      setOpenDialog(false);
      fetchContent(activeTab === 'pages' ? 'page' : activeTab === 'blog' ? 'post' : 'media');
    } catch (err) {
      alert('Failed to save content');
    }
  };

  const tableHeaders = ['Title', 'Type', 'Status', 'Date', 'Actions'];
  
  const tableData = useMemo(() => {
    return content.map(item => ({
      title: <span className="font-bold">{item.title}</span>,
      type: <span className="px-2 py-1 rounded-lg bg-muted text-xs font-medium uppercase tracking-wider">{item.type}</span>,
      status: (
        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${
          item.status === 'published' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-orange-500/10 text-orange-600'
        }`}>
          {item.status}
        </span>
      ),
      date: new Date(item.createdAt || item.date).toLocaleDateString(),
      actions: (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(item)} className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors">
            <Icon icon="lucide:edit" />
          </button>
          <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors">
            <Icon icon="lucide:trash" />
          </button>
        </div>
      )
    }));
  }, [content]);

  return (
    <PageLayout>
      <PageHeader
        title="Content Management"
        description="Manage your website pages, blog posts, and media library."
        actions={[
          {
            type: 'button',
            label: `Add ${activeTab === 'pages' ? 'Page' : activeTab === 'blog' ? 'Post' : 'Media'}`,
            icon: 'lucide:plus',
            variant: 'primary',
            onClick: () => {
              setSelectedItem(null);
              setFormData({ title: '', status: 'draft', type: activeTab === 'pages' ? 'page' : activeTab === 'blog' ? 'post' : 'media' });
              setOpenDialog(true);
            }
          }
        ]}
      />

      <div className="p-8 space-y-8">
        <div className="flex gap-2 p-1 bg-muted rounded-2xl w-fit">
          {['pages', 'blog', 'media'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <UniversalTable
          headers={tableHeaders}
          data={tableData}
          loading={loading}
          emptyMessage={`No ${activeTab} found.`}
        />
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-6">
            <h2 className="text-xl font-bold">{selectedItem ? 'Edit' : 'Add'} Content</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setOpenDialog(false)} className="px-6 py-2.5 font-bold text-muted-foreground hover:bg-muted rounded-xl transition-all">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2.5 font-bold bg-primary text-white rounded-xl hover:opacity-90 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
