import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const RoleCard = ({ role, permissions, onEdit, onDelete, isDefault = false }) => (
  <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon icon="lucide:shield" className="text-xl text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{role.name}</h3>
            <p className="text-xs text-muted-foreground">{role.description}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Permissions</p>
          <div className="flex flex-wrap gap-2">
            {permissions.map((permission, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isDefault && (
          <>
            <button 
              onClick={onEdit}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Edit role"
            >
              <Icon icon="lucide:edit" className="text-muted-foreground" />
            </button>
            <button 
              onClick={onDelete}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
              aria-label="Delete role"
            >
              <Icon icon="lucide:trash-2" className="text-muted-foreground" />
            </button>
          </>
        )}
        {isDefault && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-bold rounded-lg">
            Default
          </span>
        )}
      </div>
    </div>
  </div>
);

const PermissionCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border cursor-pointer hover:bg-muted/50 transition-colors">
    <input 
      type="checkbox" 
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-primary rounded border-border"
    />
    <div>
      <p className="text-sm font-bold">{label}</p>
    </div>
  </label>
);

export default function UserRoles() {
  const [activeView, setActiveView] = useState('roles'); // 'roles' or 'create'
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: [
        'Add Users', 'Edit Users', 'View Users', 'Delete Users',
        'Add Properties', 'Edit Properties', 'View Properties', 'Delete Properties',
        'Add Bookings', 'Edit Bookings', 'View Bookings', 'Delete Bookings', 'Confirm Bookings',
        'View Financial Reports', 'Export Financial Data', 'Manage Expenses', 'View Revenue',
        'Send Guest Emails', 'View Guest Details', 'Manage Guest Profiles',
        'View System Settings', 'Edit System Settings', 'Manage System Settings',
        'Export Users', 'Export Bookings', 'Export Properties', 'Export Reports',
        'Manage Email Templates', 'Manage Notifications',
        'View Analytics', 'Generate Reports'
      ]
    },
    {
      id: 2,
      name: 'Property Manager',
      description: 'Manage properties, bookings, and guests',
      permissions: [
        'Add Properties', 'Edit Properties', 'View Properties',
        'Add Bookings', 'Edit Bookings', 'View Bookings', 'Confirm Bookings',
        'View Financial Reports', 'View Revenue',
        'Send Guest Emails', 'View Guest Details', 'Manage Guest Profiles',
        'Export Bookings', 'Export Properties',
        'View Analytics'
      ]
    },
    {
      id: 3,
      name: 'Support Agent',
      description: 'Handle customer support and basic operations',
      permissions: [
        'View Bookings',
        'Send Guest Emails', 'View Guest Details',
        'View Financial Reports',
        'Export Bookings'
      ]
    },
    {
      id: 4,
      name: 'Guest',
      description: 'Limited access for property guests',
      permissions: [
        'View Bookings',
        'Manage Guest Profiles'
      ]
    }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {
      // User Management Permissions
      addUser: false,
      editUser: false,
      viewUser: false,
      deleteUser: false,
      
      // Property Management Permissions
      addProperty: false,
      editProperty: false,
      viewProperty: false,
      deleteProperty: false,
      
      // Booking Management Permissions
      addBooking: false,
      editBooking: false,
      viewBooking: false,
      deleteBooking: false,
      confirmBooking: false,
      
      // Financial Permissions
      viewFinancialReports: false,
      exportFinancialData: false,
      manageExpenses: false,
      viewRevenue: false,
      
      // Guest Communication Permissions
      sendGuestEmails: false,
      viewGuestDetails: false,
      manageGuestProfiles: false,
      
      // System Settings Permissions
      viewSystemSettings: false,
      editSystemSettings: false,
      manageSystemSettings: false,
      
      // Export Permissions
      exportUsers: false,
      exportBookings: false,
      exportProperties: false,
      exportReports: false,
      
      // Content Management
      manageEmailTemplates: false,
      manageNotifications: false,
      
      // Analytics and Reports
      viewAnalytics: false,
      generateReports: false
    }
  });

  const handleCreateRole = () => {
    if (newRole.name && newRole.description) {
      const permissions = Object.keys(newRole.permissions)
        .filter(key => newRole.permissions[key])
        .map(key => {
          const permissionMap = {
            // User Management
            addUser: 'Add Users',
            editUser: 'Edit Users',
            viewUser: 'View Users',
            deleteUser: 'Delete Users',
            
            // Property Management
            addProperty: 'Add Properties',
            editProperty: 'Edit Properties',
            viewProperty: 'View Properties',
            deleteProperty: 'Delete Properties',
            
            // Booking Management
            addBooking: 'Add Bookings',
            editBooking: 'Edit Bookings',
            viewBooking: 'View Bookings',
            deleteBooking: 'Delete Bookings',
            confirmBooking: 'Confirm Bookings',
            
            // Financial
            viewFinancialReports: 'View Financial Reports',
            exportFinancialData: 'Export Financial Data',
            manageExpenses: 'Manage Expenses',
            viewRevenue: 'View Revenue',
            
            // Guest Communication
            sendGuestEmails: 'Send Guest Emails',
            viewGuestDetails: 'View Guest Details',
            manageGuestProfiles: 'Manage Guest Profiles',
            
            // System Settings
            viewSystemSettings: 'View System Settings',
            editSystemSettings: 'Edit System Settings',
            manageSystemSettings: 'Manage System Settings',
            
            // Export Permissions
            exportUsers: 'Export Users',
            exportBookings: 'Export Bookings',
            exportProperties: 'Export Properties',
            exportReports: 'Export Reports',
            
            // Content Management
            manageEmailTemplates: 'Manage Email Templates',
            manageNotifications: 'Manage Notifications',
            
            // Analytics
            viewAnalytics: 'View Analytics',
            generateReports: 'Generate Reports'
          };
          return permissionMap[key];
        });

      const role = {
        id: roles.length + 1,
        name: newRole.name,
        description: newRole.description,
        permissions: permissions.length > 0 ? permissions : ['Custom Role']
      };

      setRoles([...roles, role]);
      setNewRole({
        name: '',
        description: '',
        permissions: {
          // User Management Permissions
          addUser: false,
          editUser: false,
          viewUser: false,
          deleteUser: false,
          
          // Property Management Permissions
          addProperty: false,
          editProperty: false,
          viewProperty: false,
          deleteProperty: false,
          
          // Booking Management Permissions
          addBooking: false,
          editBooking: false,
          viewBooking: false,
          deleteBooking: false,
          confirmBooking: false,
          
          // Financial Permissions
          viewFinancialReports: false,
          exportFinancialData: false,
          manageExpenses: false,
          viewRevenue: false,
          
          // Guest Communication Permissions
          sendGuestEmails: false,
          viewGuestDetails: false,
          manageGuestProfiles: false,
          
          // System Settings Permissions
          viewSystemSettings: false,
          editSystemSettings: false,
          manageSystemSettings: false,
          
          // Export Permissions
          exportUsers: false,
          exportBookings: false,
          exportProperties: false,
          exportReports: false,
          
          // Content Management
          manageEmailTemplates: false,
          manageNotifications: false,
          
          // Analytics and Reports
          viewAnalytics: false,
          generateReports: false
        }
      });
      setActiveView('roles');
    }
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleEditRole = (roleId) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit role:', roleId);
  };

  const handlePermissionChange = (permission, value) => {
    setNewRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value
      }
    }));
  };

  if (activeView === 'create') {
    return (
      <div className="space-y-8">
        {/* Create Role Form */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-heading font-bold">Create New Role</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Role Name</label>
              <input 
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Marketing Manager"
                className="w-full px-4 py-3 bg-muted border border-input rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
              <input 
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this role's responsibilities"
                className="w-full px-4 py-3 bg-muted border border-input rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Permissions</p>
            
            {/* User Management Permissions */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">User Management</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PermissionCheckbox 
                  label="Add Users"
                  checked={newRole.permissions.addUser}
                  onChange={(e) => handlePermissionChange('addUser', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Edit Users"
                  checked={newRole.permissions.editUser}
                  onChange={(e) => handlePermissionChange('editUser', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="View Users"
                  checked={newRole.permissions.viewUser}
                  onChange={(e) => handlePermissionChange('viewUser', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Delete Users"
                  checked={newRole.permissions.deleteUser}
                  onChange={(e) => handlePermissionChange('deleteUser', e.target.checked)}
                />
              </div>
            </div>

            {/* Property Management Permissions */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Property Management</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PermissionCheckbox 
                  label="Add Properties"
                  checked={newRole.permissions.addProperty}
                  onChange={(e) => handlePermissionChange('addProperty', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Edit Properties"
                  checked={newRole.permissions.editProperty}
                  onChange={(e) => handlePermissionChange('editProperty', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="View Properties"
                  checked={newRole.permissions.viewProperty}
                  onChange={(e) => handlePermissionChange('viewProperty', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Delete Properties"
                  checked={newRole.permissions.deleteProperty}
                  onChange={(e) => handlePermissionChange('deleteProperty', e.target.checked)}
                />
              </div>
            </div>

            {/* Booking Management Permissions */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Booking Management</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PermissionCheckbox 
                  label="Add Bookings"
                  checked={newRole.permissions.addBooking}
                  onChange={(e) => handlePermissionChange('addBooking', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Edit Bookings"
                  checked={newRole.permissions.editBooking}
                  onChange={(e) => handlePermissionChange('editBooking', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="View Bookings"
                  checked={newRole.permissions.viewBooking}
                  onChange={(e) => handlePermissionChange('viewBooking', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Delete Bookings"
                  checked={newRole.permissions.deleteBooking}
                  onChange={(e) => handlePermissionChange('deleteBooking', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Confirm Bookings"
                  checked={newRole.permissions.confirmBooking}
                  onChange={(e) => handlePermissionChange('confirmBooking', e.target.checked)}
                />
              </div>
            </div>

            {/* Financial Permissions */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Financial</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PermissionCheckbox 
                  label="View Financial Reports"
                  checked={newRole.permissions.viewFinancialReports}
                  onChange={(e) => handlePermissionChange('viewFinancialReports', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Export Financial Data"
                  checked={newRole.permissions.exportFinancialData}
                  onChange={(e) => handlePermissionChange('exportFinancialData', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Manage Expenses"
                  checked={newRole.permissions.manageExpenses}
                  onChange={(e) => handlePermissionChange('manageExpenses', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="View Revenue"
                  checked={newRole.permissions.viewRevenue}
                  onChange={(e) => handlePermissionChange('viewRevenue', e.target.checked)}
                />
              </div>
            </div>

            {/* Export Permissions */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Export Permissions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PermissionCheckbox 
                  label="Export Users"
                  checked={newRole.permissions.exportUsers}
                  onChange={(e) => handlePermissionChange('exportUsers', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Export Bookings"
                  checked={newRole.permissions.exportBookings}
                  onChange={(e) => handlePermissionChange('exportBookings', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Export Properties"
                  checked={newRole.permissions.exportProperties}
                  onChange={(e) => handlePermissionChange('exportProperties', e.target.checked)}
                />
                <PermissionCheckbox 
                  label="Export Reports"
                  checked={newRole.permissions.exportReports}
                  onChange={(e) => handlePermissionChange('exportReports', e.target.checked)}
                />
              </div>
            </div>

            {/* Guest Communication & System Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Guest Communication</p>
                <div className="space-y-3">
                  <PermissionCheckbox 
                    label="Send Guest Emails"
                    checked={newRole.permissions.sendGuestEmails}
                    onChange={(e) => handlePermissionChange('sendGuestEmails', e.target.checked)}
                  />
                  <PermissionCheckbox 
                    label="View Guest Details"
                    checked={newRole.permissions.viewGuestDetails}
                    onChange={(e) => handlePermissionChange('viewGuestDetails', e.target.checked)}
                  />
                  <PermissionCheckbox 
                    label="Manage Guest Profiles"
                    checked={newRole.permissions.manageGuestProfiles}
                    onChange={(e) => handlePermissionChange('manageGuestProfiles', e.target.checked)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">System Settings</p>
                <div className="space-y-3">
                  <PermissionCheckbox 
                    label="View System Settings"
                    checked={newRole.permissions.viewSystemSettings}
                    onChange={(e) => handlePermissionChange('viewSystemSettings', e.target.checked)}
                  />
                  <PermissionCheckbox 
                    label="Edit System Settings"
                    checked={newRole.permissions.editSystemSettings}
                    onChange={(e) => handlePermissionChange('editSystemSettings', e.target.checked)}
                  />
                  <PermissionCheckbox 
                    label="Manage System Settings"
                    checked={newRole.permissions.manageSystemSettings}
                    onChange={(e) => handlePermissionChange('manageSystemSettings', e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Content Management & Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Content Management</p>
                <div className="space-y-3">
                  <PermissionCheckbox 
                    label="Manage Email Templates"
                    checked={newRole.permissions.manageEmailTemplates}
                    onChange={(e) => handlePermissionChange('manageEmailTemplates', e.target.checked)}
                  />
                  <PermissionCheckbox 
                    label="Manage Notifications"
                    checked={newRole.permissions.manageNotifications}
                    onChange={(e) => handlePermissionChange('manageNotifications', e.target.checked)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Analytics</p>
                <div className="space-y-3">
                  <PermissionCheckbox 
                    label="View Analytics"
                    checked={newRole.permissions.viewAnalytics}
                    onChange={(e) => handlePermissionChange('viewAnalytics', e.target.checked)}
                  />
                  <PermissionCheckbox 
                    label="Generate Reports"
                    checked={newRole.permissions.generateReports}
                    onChange={(e) => handlePermissionChange('generateReports', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleCreateRole}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              <Icon icon="lucide:plus" className="text-lg" />
              <span>Create Role</span>
            </button>
            <button 
              onClick={() => setActiveView('roles')}
              className="bg-muted text-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-muted/80 transition-all"
            >
              <Icon icon="lucide:x" className="text-lg" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-bold">User Roles & Permissions</h2>
          <p className="text-sm text-muted-foreground">Define access levels and permissions for different user types.</p>
        </div>
        <button 
          onClick={() => setActiveView('create')}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <Icon icon="lucide:plus" className="text-lg" />
          <span>Create New Role</span>
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <RoleCard 
            key={role.id}
            role={role}
            permissions={role.permissions}
            onEdit={() => handleEditRole(role.id)}
            onDelete={() => handleDeleteRole(role.id)}
            isDefault={role.id <= 2} // First 2 roles are default
          />
        ))}
      </div>
    </div>
  );
}
