import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField } from '../components/ListingForm';

export default function AddNewUser() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('guest');
  const [verified, setVerified] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [internalNotes, setInternalNotes] = useState('');
  
  const isEditMode = id && id !== 'undefined';
  const pageTitle = isEditMode ? 'Edit User' : 'Add New User';

  // Load user data for edit mode
  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch user data here
      // For demo purposes, we'll use mock data
      const mockUserData = {
        'GS-94210': {
          firstName: 'Arlene',
          lastName: 'McCoy',
          email: 'arlene.mccoy@example.com',
          phone: '+1 (555) 012-3456',
          role: 'guest',
          verified: true,
          sendEmail: true,
          internalNotes: 'Premium guest with excellent reviews'
        }
      };
      
      const userData = mockUserData[id];
      if (userData) {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhone(userData.phone);
        setRole(userData.role);
        setVerified(userData.verified);
        setSendEmail(userData.sendEmail);
        setInternalNotes(userData.internalNotes);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Creating user:', { firstName, lastName, email, phone, role, verified, sendEmail, internalNotes });
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/users" className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold">{pageTitle}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {isEditMode ? 'Edit user account details and permissions.' : 'Create a new host or guest account manually.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:flex bg-muted text-foreground px-6 py-2.5 rounded-xl font-black items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Cancel
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 text-[10px] uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:check" className="text-lg" />
            <span>{isEditMode ? 'Update User' : 'Create User'}</span>
          </button>
        </div>
      </header>

      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Account Information Card */}
            <FormSection title="Personal Information" icon="lucide:user">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField 
                    label="First Name"
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <InputField 
                    label="Last Name"
                    placeholder="e.g. Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <InputField 
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="lucide:mail"
              />
              <InputField 
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon="lucide:phone"
              />
            </FormSection>

            {/* Role & Permissions Card */}
            <FormSection title="Role & Access" icon="lucide:shield-check">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="role" 
                    value="guest" 
                    className="peer sr-only" 
                    checked={role === 'guest'}
                    onChange={() => setRole('guest')}
                  />
                  <div className="p-4 bg-muted border-2 border-transparent rounded-2xl flex flex-col items-center gap-3 transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/80">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:user" className="text-xl text-muted-foreground peer-checked:text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Guest</span>
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="role" 
                    value="host" 
                    className="peer sr-only"
                    checked={role === 'host'}
                    onChange={() => setRole('host')}
                  />
                  <div className="p-4 bg-muted border-2 border-transparent rounded-2xl flex flex-col items-center gap-3 transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/80">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:home" className="text-xl text-muted-foreground peer-checked:text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Host</span>
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="role" 
                    value="admin" 
                    className="peer sr-only"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                  />
                  <div className="p-4 bg-muted border-2 border-transparent rounded-2xl flex flex-col items-center gap-3 transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/80">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon icon="lucide:shield" className="text-xl text-muted-foreground peer-checked:text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Admin</span>
                  </div>
                </label>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center">
                      <Icon icon="lucide:check-circle" className="text-tertiary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Verified Status</p>
                      <p className="text-[10px] text-muted-foreground">Mark account as verified immediately</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setVerified(!verified)}
                    className={`w-12 h-6 bg-tertiary rounded-full relative p-1 transition-all ${
                      verified ? 'bg-tertiary' : 'bg-gray-300'
                    }`}
                  >
                    <span className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all right-1"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon icon="lucide:mail" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Send Welcome Email</p>
                      <p className="text-[10px] text-muted-foreground">Notify user of their new account</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSendEmail(!sendEmail)}
                    className={`w-12 h-6 bg-primary rounded-full relative p-1 transition-all ${
                      sendEmail ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all right-1"></span>
                  </button>
                </div>
              </div>

              <TextAreaField 
                label="Internal Notes"
                placeholder="Reason for manual creation..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows="4"
              />
            </FormSection>
          </div>

          {/* Right Column: Profile & Preview */}
          <div className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center space-y-4">
              <div className="relative inline-block group">
                <div className="w-32 h-32 rounded-full border-4 border-muted bg-muted flex items-center justify-center overflow-hidden relative">
                  <Icon icon="lucide:user" className="text-6xl text-muted-foreground/30" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Icon icon="lucide:camera" className="text-white text-3xl" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-card hover:scale-110 transition-transform">
                  <Icon icon="lucide:plus" className="text-lg font-bold" />
                </button>
              </div>
              <div>
                <h3 className="font-heading font-bold">Profile Picture</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Icon icon="lucide:info" className="text-xl" />
                <h3 className="text-xs font-black uppercase tracking-widest">Admin Note</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Creating a user manually will generate a temporary password. The user will be prompted to change it upon their first login.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
