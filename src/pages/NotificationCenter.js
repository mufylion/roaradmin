import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';

const NotificationItem = ({
  unread = false,
  icon,
  iconBgClass,
  iconColorClass,
  title,
  time,
  description,
  actionLabel,
  actionClass = "text-primary",
  showBorder = false
}) => (
  <div
    className={`bg-card p-4 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group flex gap-4 items-start relative overflow-hidden ${
      !unread ? 'bg-card/50 opacity-80 hover:opacity-100' : ''
    }`}
  >
    {unread && showBorder && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
    <div className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center shrink-0`}>
      <Icon icon={icon} className={`text-2xl ${iconColorClass}`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className={`text-sm font-bold text-foreground transition-colors truncate ${unread ? 'group-hover:text-primary' : ''}`}>
          {title}
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap uppercase tracking-tighter">
          {time}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {(actionLabel || unread) && (
        <div className="flex items-center gap-4 mt-3">
          {actionLabel && (
            <button className={`text-xs font-bold hover:underline underline-offset-4 ${actionClass}`}>
              {actionLabel}
            </button>
          )}
          {unread && (
            <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Dismiss</button>
          )}
        </div>
      )}
    </div>
    <div className="flex flex-col items-end gap-2 shrink-0">
      {unread && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
      <Icon icon="lucide:more-vertical" className="text-muted-foreground cursor-pointer hover:text-foreground" />
    </div>
  </div>
);

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Unread (12)', 'System', 'Bookings'];

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-20 bg-card border-b border-border px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-bold">Notifications Center</h1>
          <p className="text-sm text-muted-foreground">Manage system alerts and user activity.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Icon
              icon="lucide:search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Filter alerts..."
              className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 w-64 transition-all outline-none"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center relative transition-colors shadow-lg shadow-primary/20">
            <Icon icon="lucide:bell" className="text-xl" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-primary-foreground animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
        {/* Tabs and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-muted p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-card shadow-sm text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all">
              <Icon icon="lucide:check-check" className="text-lg" />
              Mark all as read
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-all">
              <Icon icon="lucide:trash-2" className="text-lg" />
              Clear All
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          <NotificationItem
            unread
            showBorder
            icon="lucide:calendar-check"
            iconBgClass="bg-primary/10"
            iconColorClass="text-primary"
            title="New High-Value Booking Confirmed"
            time="2 mins ago"
            description={
              <>
                Guest <span className="font-bold text-foreground">Sophia Miller</span> confirmed a 7-night stay at{' '}
                <span className="font-bold text-foreground">Luxury Penthouse NYC</span>. Total value: $4,250.00.
              </>
            }
            actionLabel="View Booking Details"
          />

          <NotificationItem
            unread
            showBorder
            icon="lucide:shield-alert"
            iconBgClass="bg-orange-500/10"
            iconColorClass="text-orange-500"
            title="Host Verification Required"
            time="15 mins ago"
            description={
              <>
                Host <span className="font-bold text-foreground">Marcus Chen</span> uploaded new identity documents for
                verification. Action required before listing activation.
              </>
            }
            actionLabel="Review Documents"
            actionClass="text-orange-500"
          />

          <NotificationItem
            icon="lucide:credit-card"
            iconBgClass="bg-muted"
            iconColorClass="text-muted-foreground"
            title="Payout Processed Successfully"
            time="2 hours ago"
            description="Weekly payout of $12,480.00 has been initiated to your primary bank account ending in ****4291."
          />

          <NotificationItem
            icon="lucide:user-plus"
            iconBgClass="bg-purple-500/10"
            iconColorClass="text-purple-500"
            title="New User Registration Milestone"
            time="5 hours ago"
            description={
              <>
                RoarHomes has reached <span className="font-bold text-foreground">1,200 active users</span>! New user Sarah
                Jenkins just joined the community.
              </>
            }
          />

          <NotificationItem
            icon="lucide:circle-alert"
            iconBgClass="bg-destructive/10"
            iconColorClass="text-destructive"
            title="Security Alert: Unusual Login"
            time="Yesterday"
            description={
              <>
                Unusual login detected for admin account <span className="font-bold text-foreground">j.doe@roarhomes.com</span>{' '}
                from a new IP in London, UK.
              </>
            }
            actionLabel="Review Security Log"
            actionClass="text-destructive"
          />
        </div>

        {/* Pagination/Load More */}
        <div className="flex items-center justify-center py-6">
          <button className="px-8 py-3 bg-card border border-border rounded-xl text-sm font-bold hover:bg-muted transition-all active:scale-95 shadow-sm flex items-center gap-2">
            <Icon icon="lucide:refresh-cw" className="text-lg" />
            Load Older Notifications
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
