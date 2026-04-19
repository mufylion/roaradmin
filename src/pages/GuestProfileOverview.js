import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { mockUsers, getUserById } from '../data/mockUsers';
import { mockBookings } from '../data/mockBookings.js';
import { generateFinancialSummary } from '../data/dataIntegrator.js';
import { useFormatCurrency } from '../config/useAppConfig';

const BookingCard = ({ 
  status, 
  refId, 
  title, 
  location, 
  checkIn, 
  checkOut, 
  price, 
  rating, 
  statusColor 
}) => (
  <div className={`bg-card rounded-2xl border-l-4 ${statusColor} border-y border-r border-border p-5 shadow-sm hover:shadow-md transition-all group`}>
    <div className="flex items-start justify-between mb-4">
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
        status === 'Ongoing' ? 'bg-tertiary/10 text-tertiary' : 
        status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
      }`}>
        {status}
      </span>
      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Ref: {refId}</p>
    </div>
    <h4 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-xs text-muted-foreground mb-4">{location}</p>
    <div className="flex items-center gap-4 py-3 border-y border-border mb-4">
      <div className="flex-1">
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Check In</p>
        <p className="text-xs font-bold">{checkIn}</p>
      </div>
      <Icon icon="lucide:arrow-right" className="text-muted-foreground" />
      <div className="flex-1 text-right">
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Check Out</p>
        <p className="text-xs font-bold">{checkOut}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-lg font-bold">{price}</p>
      {rating ? (
        <div className="flex items-center gap-1 text-tertiary">
          <Icon icon="lucide:star" />
          <span className="text-xs font-bold">{rating}</span>
        </div>
      ) : (
        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
          {status === 'Upcoming' ? 'Manage' : 'View Details'}
        </button>
      )}
    </div>
  </div>
);

export default function GuestProfileOverview() {
  const [activeTab, setActiveTab] = useState('Bookings');
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBookings, setUserBookings] = useState([]);
  const [financialData, setFinancialData] = useState(null);
  const formatCurrency = useFormatCurrency();

  useEffect(() => {
    // Find user by ID
    const foundUser = getUserById(userId);
    setUser(foundUser);
    setLoading(false);
  }, [userId]);

  // Load user's bookings and financial data
  useEffect(() => {
    if (user) {
      // Filter bookings for this user
      const bookings = mockBookings.filter(booking => booking.guest.id === user.id);
      setUserBookings(bookings);
      
      // Generate financial summary for this user
      const financials = generateFinancialSummary();
      setFinancialData(financials);
    }
  }, [user]);

  // Calculate lifetime value metrics
  const calculateLifetimeValue = () => {
    if (!userBookings.length) {
      return {
        totalSpent: 0,
        totalBookings: 0,
        averageBookingValue: 0,
        completedBookings: 0
      };
    }

    const completedBookings = userBookings.filter(booking => booking.status === 'completed');
    const totalSpent = completedBookings.reduce((sum, booking) => sum + booking.pricing.total, 0);
    const totalBookings = completedBookings.length;
    const averageBookingValue = totalBookings > 0 ? totalSpent / totalBookings : 0;

    return {
      totalSpent,
      totalBookings,
      averageBookingValue,
      completedBookings: completedBookings.length
    };
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Icon icon="lucide:user-x" className="text-4xl text-muted-foreground" />
          <h2 className="text-xl font-bold">User Not Found</h2>
          <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
          <Link to="/users" className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all">
            Back to Users
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/users" className="p-2 bg-muted rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-95">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold">Guest Profile</h1>
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-black">ID: {user.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Link 
            to={`/users/edit/${user.id}`}
            className="flex-1 md:flex-none bg-muted text-foreground px-4 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-muted/80 transition-all text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Icon icon="lucide:shield" className="text-lg" />
            <span>Manage User</span>
          </Link>
          <button className="flex-1 md:flex-none bg-destructive text-destructive-foreground px-5 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-destructive/20 hover:opacity-90 transition-all text-[10px] uppercase tracking-widest">
            <Icon icon="lucide:trash-2" className="text-lg" />
            <span>Suspend User</span>
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scroll-smooth">
        {/* Top Section: Identity & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
            <div className="relative">
              <img src={user.profile.avatar} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-muted shadow-xl" alt={`${user.profile.firstName} ${user.profile.lastName}`} />
              <span className={`absolute bottom-2 right-2 w-8 h-8 ${
                user.verification.email && user.verification.phone ? 'bg-tertiary' : 'bg-muted-foreground'
              } border-4 border-card rounded-full flex items-center justify-center shadow-lg`}>
                <Icon icon="lucide:check" className="text-white text-xs" />
              </span>
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">{user.profile.firstName} {user.profile.lastName}</h2>
                  <span className={`inline-flex px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider self-center md:self-auto ${
                    user.role === 'host' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </div>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Icon icon="lucide:mail" className="text-primary" />
                  {user.contact.email}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-sm font-bold">{user.contact.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Location</p>
                  <p className="text-sm font-bold">{user.profile.location}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Joined</p>
                  <p className="text-sm font-bold">{new Date(user.profile.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon icon="lucide:zap" className="text-2xl text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">Lifetime Value</span>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-1 text-foreground">{formatCurrency(calculateLifetimeValue().totalSpent)}</h3>
              <p className="text-muted-foreground text-sm font-medium">Across {calculateLifetimeValue().totalBookings} completed bookings</p>
            </div>
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Avg. Booking Value</p>
                <p className="font-bold mt-1 text-foreground">{formatCurrency(calculateLifetimeValue().averageBookingValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon icon="lucide:star" className="text-tertiary" />
                  <span className="font-bold text-foreground">{user.stats.averageRating || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section: Bookings & Financials */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-muted p-1 rounded-xl w-full md:w-auto">
              {['Bookings', 'Billing History', 'Review Log'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                      ? 'bg-card text-foreground shadow-sm border border-border' 
                      : 'text-muted-foreground hover:bg-card/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative group">
                <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'Bookings' ? "Filter bookings..." : activeTab === 'Billing History' ? "Filter transactions..." : "Filter reviews..."}
                  className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-xs font-bold focus:ring-4 focus:ring-primary/10 w-full md:w-48 transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'Bookings' && (
            <div className="space-y-6">
              {userBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {userBookings.map(booking => (
                    <BookingCard 
                      key={booking.id}
                      status={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      refId={booking.id}
                      title={booking.listing.title}
                      location={booking.listing.location}
                      checkIn={new Date(booking.dates.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      checkOut={new Date(booking.dates.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      price={formatCurrency(booking.pricing.total)}
                      statusColor={
                        booking.status === 'confirmed' ? 'border-tertiary' :
                        booking.status === 'pending' ? 'border-primary' :
                        'border-muted-foreground'
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon icon="lucide:calendar-x" className="text-4xl text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">No Bookings Found</h3>
                  <p className="text-muted-foreground">This user hasn't made any bookings yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Billing History' && (
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold">Recent Billing History</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Download All Receipts</button>
              </div>
              <div className="overflow-x-auto">
                {financialData && financialData.transactions && financialData.transactions.length > 0 ? (
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-widest font-black">
                      <tr>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Method</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {financialData.transactions.slice(0, 10).map(transaction => (
                        <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-xs font-bold">{transaction.id}</td>
                          <td className="px-6 py-4 text-xs font-medium text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium">{transaction.description}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:credit-card" className="text-muted-foreground" />
                              <span className="text-xs font-medium">{transaction.method || 'Card'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold">{formatCurrency(transaction.amount)}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase ${
                              transaction.status === 'completed' ? 'bg-tertiary/10 text-tertiary' :
                              transaction.status === 'pending' ? 'bg-primary/10 text-primary' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <Icon icon="lucide:receipt" className="text-4xl text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">No Billing History</h3>
                    <p className="text-muted-foreground">No billing transactions found for this user.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Review Log' && (
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-heading font-bold">Guest Reviews</h3>
                  <p className="text-sm text-muted-foreground">Reviews left by {user.profile.firstName} for properties</p>
                </div>
                <div className="text-center py-12">
                  <Icon icon="lucide:star-off" className="text-4xl text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground">{user.profile.firstName} hasn't left any property reviews yet.</p>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-heading font-bold">Host Reviews</h3>
                  <p className="text-sm text-muted-foreground">Reviews received from hosts</p>
                </div>
                <div className="text-center py-12">
                  <Icon icon="lucide:message-square-off" className="text-4xl text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">No Host Reviews</h3>
                  <p className="text-muted-foreground">No host reviews available for {user.profile.firstName}.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
