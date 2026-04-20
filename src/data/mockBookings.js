import { getUserById } from './mockUsers.js';

// Helper function to get user display data
const getUserDisplayData = (userId) => {
  const user = getUserById(userId);
  if (!user) {
    return {
      name: 'Unknown User',
      avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',
      email: 'unknown@example.com',
      phone: '+1 (555) 000-0000'
    };
  }
  
  return {
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    avatar: user.profile.avatar,
    email: user.contact.email,
    phone: user.contact.phone
  };
};

// Mock Bookings Data
export const mockBookings = [
  {
    id: 'BK-9021',
    guest: {
      id: 'user-001',
      ...getUserDisplayData('user-001')
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-10-24',
      checkOut: '2024-10-27',
      nights: 3
    },
    pricing: {
      nightlyRate: 12000,
      cautionFee: 25000,
      vat: 2700,
      insurance: 4500,
      subtotal: 36000,
      taxes: 2700,
      total: 64200,
      currency: 'NGN'
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
      total: 2
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'Early check-in requested if possible',
    createdAt: '2024-10-15',
    updatedAt: '2024-10-16'
  },
  {
    id: 'BK-9022',
    guest: {
      id: 'user-002',
      get name() { return getUserDisplayData('user-002').name; },
      get avatar() { return getUserDisplayData('user-002').avatar; },
      get email() { return getUserDisplayData('user-002').email; },
      get phone() { return getUserDisplayData('user-002').phone; }
    },
    listing: {
      id: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2026-05-05',
      checkOut: '2026-05-09',
      nights: 4
    },
    pricing: {
      nightlyRate: 15000,
      cautionFee: 25000,
      vat: 4500,
      insurance: 4500,
      subtotal: 60000,
      taxes: 4500,
      total: 98500,
      currency: 'NGN'
    },
    guests: {
      adults: 3,
      children: 1,
      infants: 0,
      pets: 1,
      total: 5
    },
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'paypal',
    source: 'airbnb',
    specialRequests: 'Need parking for SUV',
    createdAt: '2024-10-14',
    updatedAt: '2024-10-14'
  },
  {
    id: 'BK-9023',
    guest: {
      id: 'user-003',
      ...getUserDisplayData('user-003')
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-10-20',
      checkOut: '2024-10-22',
      nights: 2
    },
    pricing: {
      nightlyRate: 12000,
      cautionFee: 25000,
      vat: 1800,
      insurance: 4500,
      subtotal: 24000,
      taxes: 1800,
      total: 47300,
      currency: 'NGN'
    },
    guests: {
      adults: 2,
      children: 2,
      infants: 0,
      pets: 0,
      total: 4
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'booking.com',
    specialRequests: 'Traveling with children, need extra towels',
    createdAt: '2024-10-12',
    updatedAt: '2024-10-13'
  },
  {
    id: 'BK-9024',
    guest: {
      id: 'user-004',
      get name() { return getUserDisplayData('user-004').name; },
      get avatar() { return getUserDisplayData('user-004').avatar; },
      get email() { return getUserDisplayData('user-004').email; },
      get phone() { return getUserDisplayData('user-004').phone; }
    },
    listing: {
      id: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2026-05-12',
      checkOut: '2026-05-14',
      nights: 2
    },
    pricing: {
      nightlyRate: 15000,
      cautionFee: 25000,
      vat: 2250,
      insurance: 4500,
      subtotal: 30000,
      taxes: 2250,
      total: 59250,
      currency: 'NGN'
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
      total: 2
    },
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'None',
    cancellationReason: 'Guest had to cancel due to work commitment',
    cancelledAt: '2024-10-10',
    createdAt: '2024-10-08',
    updatedAt: '2024-10-10'
  },
  {
    id: 'BK-9025',
    guest: {
      id: 'user-005',
      ...getUserDisplayData('user-005')
    },
    listing: {
      id: 'SN-98235',
      title: 'Beachfront Villa Malibu',
      location: 'Malibu, California',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-10-18',
      checkOut: '2024-10-21',
      nights: 3
    },
    pricing: {
      nightlyRate: 35000,
      cautionFee: 25000,
      vat: 7875,
      insurance: 4500,
      subtotal: 105000,
      taxes: 7875,
      total: 142375,
      currency: 'NGN'
    },
    guests: {
      adults: 4,
      children: 2,
      infants: 1,
      pets: 0,
      total: 7
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'airbnb',
    specialRequests: 'Need crib for infant',
    createdAt: '2024-10-10',
    updatedAt: '2024-10-11'
  },
  {
    id: 'BK-9026',
    guest: {
      id: 'user-006',
      ...getUserDisplayData('user-006')
    },
    listing: {
      id: 'SN-98238',
      title: 'Luxury Penthouse Miami',
      location: 'Miami, Florida',
      image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-10-28',
      checkOut: '2024-11-02',
      nights: 5
    },
    pricing: {
      nightlyRate: 45000,
      cautionFee: 25000,
      vat: 11250,
      insurance: 4500,
      subtotal: 225000,
      taxes: 11250,
      total: 291750,
      currency: 'NGN'
    },
    guests: {
      adults: 6,
      children: 2,
      infants: 0,
      pets: 0,
      total: 8
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'Business meeting on 10/30, need meeting room setup',
    createdAt: '2024-10-16',
    updatedAt: '2024-10-16'
  },
  {
    id: 'BK-9027',
    guest: {
      id: 'user-007',
      ...getUserDisplayData('user-007')
    },
    listing: {
      id: 'SN-98237',
      title: 'Urban Studio Brooklyn',
      location: 'Brooklyn, New York',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-11-05',
      checkOut: '2024-11-07',
      nights: 2
    },
    pricing: {
      nightlyRate: 8500,
      cautionFee: 25000,
      vat: 1275,
      insurance: 4500,
      subtotal: 17000,
      taxes: 1275,
      total: 26575,
      currency: 'NGN'
    },
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 1,
      total: 2
    },
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'paypal',
    source: 'booking.com',
    specialRequests: 'First time guest, need recommendations for local restaurants',
    createdAt: '2024-10-16',
    updatedAt: '2024-10-16'
  },
  {
    id: 'BK-9028',
    guest: {
      id: 'user-001',
      ...getUserDisplayData('user-001')
    },
    listing: {
      id: 'SN-98235',
      title: 'Beachfront Villa Malibu',
      location: 'Malibu, California',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-09-15',
      checkOut: '2024-09-20',
      nights: 5
    },
    pricing: {
      nightlyRate: 35000,
      cautionFee: 25000,
      vat: 13125,
      insurance: 4500,
      subtotal: 175000,
      taxes: 13125,
      total: 217625,
      currency: 'NGN'
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
      total: 2
    },
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'Celebrating anniversary',
    createdAt: '2024-09-10',
    updatedAt: '2024-09-21'
  },
  {
    id: 'BK-9029',
    guest: {
      id: 'user-002',
      ...getUserDisplayData('user-002')
    },
    listing: {
      id: 'SN-98238',
      title: 'Luxury Penthouse Miami',
      location: 'Miami, Florida',
      image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-09-01',
      checkOut: '2024-09-04',
      nights: 3
    },
    pricing: {
      nightlyRate: 45000,
      cautionFee: 25000,
      vat: 13500,
      insurance: 4500,
      subtotal: 135000,
      taxes: 13500,
      total: 184500,
      currency: 'NGN'
    },
    guests: {
      adults: 4,
      children: 0,
      infants: 0,
      pets: 0,
      total: 4
    },
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'airbnb',
    specialRequests: 'None',
    createdAt: '2024-08-25',
    updatedAt: '2024-09-05'
  },
  {
    id: 'BK-9030',
    guest: {
      id: 'user-003',
      get name() { return getUserDisplayData('user-003').name; },
      get avatar() { return getUserDisplayData('user-003').avatar; },
      get email() { return getUserDisplayData('user-003').email; },
      get phone() { return getUserDisplayData('user-003').phone; }
    },
    listing: {
      id: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2026-05-18',
      checkOut: '2026-05-23',
      nights: 5
    },
    pricing: {
      nightlyRate: 15000,
      cautionFee: 25000,
      vat: 3375,
      insurance: 4500,
      subtotal: 45000,
      taxes: 3375,
      total: 77875,
      currency: 'NGN'
    },
    guests: {
      adults: 3,
      children: 1,
      infants: 0,
      pets: 1,
      total: 5
    },
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    source: 'direct',
    specialRequests: 'Family vacation with dog',
    createdAt: '2024-08-05',
    updatedAt: '2024-08-16'
  },
  {
    id: 'BK-9031',
    guest: {
      id: 'user-008',
      get name() { return getUserDisplayData('user-008').name; },
      get avatar() { return getUserDisplayData('user-008').avatar; },
      get email() { return getUserDisplayData('user-008').email; },
      get phone() { return getUserDisplayData('user-008').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2026-04-22',
      checkOut: '2026-04-25'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 2700,
      total: 38700
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
      total: 2
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'Late arrival expected',
    createdAt: '2026-04-15',
    updatedAt: '2026-04-16'
  },
  {
    id: 'BK-9032',
    guest: {
      id: 'user-009',
      get name() { return getUserDisplayData('user-009').name; },
      get avatar() { return getUserDisplayData('user-009').avatar; },
      get email() { return getUserDisplayData('user-009').email; },
      get phone() { return getUserDisplayData('user-009').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2026-04-28',
      checkOut: '2026-05-02'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 3600,
      total: 53600
    },
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
      total: 1
    },
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'credit_card',
    source: 'airbnb',
    specialRequests: 'Early check-in requested',
    createdAt: '2026-04-18',
    updatedAt: '2026-04-18'
  },
  {
    id: 'BK-9033',
    guest: {
      id: 'user-010',
      get name() { return getUserDisplayData('user-010').name; },
      get avatar() { return getUserDisplayData('user-010').avatar; },
      get email() { return getUserDisplayData('user-010').email; },
      get phone() { return getUserDisplayData('user-010').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2026-05-10',
      checkOut: '2026-05-15'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 4500,
      total: 66500
    },
    guests: {
      adults: 3,
      children: 1,
      infants: 0,
      pets: 0,
      total: 4
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'Extra bed needed',
    createdAt: '2026-04-20',
    updatedAt: '2026-04-20'
  },
  {
    id: 'BK-9034',
    guest: {
      id: 'user-011',
      get name() { return getUserDisplayData('user-011').name; },
      get avatar() { return getUserDisplayData('user-011').avatar; },
      get email() { return getUserDisplayData('user-011').email; },
      get phone() { return getUserDisplayData('user-011').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2026-05-20',
      checkOut: '2026-05-23'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 3240,
      total: 44240
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 1,
      total: 3
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'booking.com',
    specialRequests: 'Pet-friendly room required',
    createdAt: '2026-04-19',
    updatedAt: '2026-04-19'
  },
  {
    id: 'BK-9035',
    guest: {
      id: 'user-012',
      get name() { return getUserDisplayData('user-012').name; },
      get avatar() { return getUserDisplayData('user-012').avatar; },
      get email() { return getUserDisplayData('user-012').email; },
      get phone() { return getUserDisplayData('user-012').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2025-12-15',
      checkOut: '2025-12-20'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 5400,
      total: 63400
    },
    guests: {
      adults: 2,
      children: 2,
      infants: 0,
      pets: 0,
      total: 4
    },
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'Holiday booking - family vacation',
    createdAt: '2025-11-20',
    updatedAt: '2025-12-21'
  },
  {
    id: 'BK-9036',
    guest: {
      id: 'user-013',
      get name() { return getUserDisplayData('user-013').name; },
      get avatar() { return getUserDisplayData('user-013').avatar; },
      get email() { return getUserDisplayData('user-013').email; },
      get phone() { return getUserDisplayData('user-013').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2025-12-23',
      checkOut: '2025-12-28'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 5400,
      total: 63400
    },
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
      total: 1
    },
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'airbnb',
    specialRequests: 'Christmas stay',
    createdAt: '2025-12-01',
    updatedAt: '2025-12-29'
  },
  {
    id: 'BK-9037',
    guest: {
      id: 'user-014',
      get name() { return getUserDisplayData('user-014').name; },
      get avatar() { return getUserDisplayData('user-014').avatar; },
      get email() { return getUserDisplayData('user-014').email; },
      get phone() { return getUserDisplayData('user-014').phone; }
    },
    listing: {
      id: 'SN-98234',
      title: 'Modern Downtown Loft',
      location: 'Manhattan, New York'
    },
    dates: {
      checkIn: '2025-12-30',
      checkOut: '2026-01-02'
    },
    pricing: {
      nightly: 12000,
      cautionFee: 25000,
      vat: 3240,
      total: 44240
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
      total: 2
    },
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    source: 'direct',
    specialRequests: 'New Year celebration',
    createdAt: '2025-12-15',
    updatedAt: '2026-01-03'
  }
];

export const getBookingById = (id) => {
  return mockBookings.find(booking => booking.id === id);
};

export const getBookingsByStatus = (status) => {
  return mockBookings.filter(booking => booking.status === status);
};

export const getBookingsByGuest = (guestId) => {
  return mockBookings.filter(booking => booking.guest.id === guestId);
};

export const getBookingsByListing = (listingId) => {
  return mockBookings.filter(booking => booking.listing.id === listingId);
};

export const getBookingsByDateRange = (startDate, endDate) => {
  return mockBookings.filter(booking => {
    const bookingStart = new Date(booking.dates.checkIn);
    const bookingEnd = new Date(booking.dates.checkOut);
    const filterStart = new Date(startDate);
    const filterEnd = new Date(endDate);
    
    return (bookingStart >= filterStart && bookingStart <= filterEnd) ||
           (bookingEnd >= filterStart && bookingEnd <= filterEnd) ||
           (bookingStart <= filterStart && bookingEnd >= filterEnd);
  });
};

export const getUpcomingBookings = () => {
  const today = new Date();
  return mockBookings.filter(booking => 
    booking.status === 'confirmed' && 
    new Date(booking.dates.checkIn) > today
  );
};

export const getRecentBookings = (days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mockBookings.filter(booking => 
    new Date(booking.createdAt) >= cutoffDate
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getBookingStats = () => {
  const total = mockBookings.length;
  const confirmed = mockBookings.filter(b => b.status === 'confirmed').length;
  const pending = mockBookings.filter(b => b.status === 'pending').length;
  const cancelled = mockBookings.filter(b => b.status === 'cancelled').length;
  const completed = mockBookings.filter(b => b.status === 'completed').length;
  
  const totalRevenue = mockBookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.pricing.total, 0);
  
  const averageBookingValue = totalRevenue / mockBookings.filter(b => b.paymentStatus === 'paid').length;
  
  return {
    total,
    confirmed,
    pending,
    cancelled,
    completed,
    totalRevenue,
    averageBookingValue,
    confirmationRate: (confirmed / (confirmed + pending + cancelled) * 100).toFixed(1)
  };
};
