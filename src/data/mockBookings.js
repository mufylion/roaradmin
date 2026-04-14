// Mock Bookings Data
export const mockBookings = [
  {
    id: 'BK-9021',
    guest: {
      id: 'user-001',
      name: 'Sophia Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      email: 'sophia.miller@example.com',
      phone: '+1 (555) 123-4567'
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
      cleaningFee: 5000,
      serviceFee: 3000,
      insurance: 4500,
      subtotal: 36000,
      taxes: 5400,
      total: 50900,
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
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      email: 'james.wilson@example.com',
      phone: '+1 (555) 234-5678'
    },
    listing: {
      id: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-10-26',
      checkOut: '2024-10-30',
      nights: 4
    },
    pricing: {
      nightlyRate: 18000,
      cleaningFee: 8000,
      serviceFee: 5000,
      insurance: 6000,
      subtotal: 72000,
      taxes: 10800,
      total: 91800,
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
      name: 'Arlene McCoy',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      email: 'arlene.mccoy@example.com',
      phone: '+1 (555) 345-6789'
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
      cleaningFee: 5000,
      serviceFee: 3000,
      insurance: 3000,
      subtotal: 24000,
      taxes: 3600,
      total: 35600,
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
      name: 'Cody Fisher',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      email: 'cody.fisher@example.com',
      phone: '+1 (555) 456-7890'
    },
    listing: {
      id: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-10-15',
      checkOut: '2024-10-17',
      nights: 2
    },
    pricing: {
      nightlyRate: 18000,
      cleaningFee: 8000,
      serviceFee: 5000,
      insurance: 3000,
      subtotal: 36000,
      taxes: 5400,
      total: 57400,
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
      name: 'Jane Cooper',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      email: 'jane.cooper@example.com',
      phone: '+1 (555) 567-8901'
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
      cleaningFee: 12000,
      serviceFee: 8000,
      insurance: 6000,
      subtotal: 105000,
      taxes: 15750,
      total: 147750,
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
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 678-9012'
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
      cleaningFee: 15000,
      serviceFee: 10000,
      insurance: 7500,
      subtotal: 225000,
      taxes: 33750,
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
      name: 'Sarah Jenkins',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
      email: 'sarah.jenkins@example.com',
      phone: '+1 (555) 789-0123'
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
      cleaningFee: 3000,
      serviceFee: 2000,
      insurance: 2000,
      subtotal: 17000,
      taxes: 2550,
      total: 26550,
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
      name: 'Sophia Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      email: 'sophia.miller@example.com',
      phone: '+1 (555) 123-4567'
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
      cleaningFee: 12000,
      serviceFee: 8000,
      insurance: 6000,
      subtotal: 175000,
      taxes: 26250,
      total: 227250,
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
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      email: 'james.wilson@example.com',
      phone: '+1 (555) 234-5678'
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
      cleaningFee: 15000,
      serviceFee: 10000,
      insurance: 4500,
      subtotal: 135000,
      taxes: 20250,
      total: 184750,
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
      name: 'Arlene McCoy',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      email: 'arlene.mccoy@example.com',
      phone: '+1 (555) 345-6789'
    },
    listing: {
      id: 'SN-98236',
      title: 'Mountain Retreat Aspen',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    dates: {
      checkIn: '2024-08-10',
      checkOut: '2024-08-15',
      nights: 5
    },
    pricing: {
      nightlyRate: 18000,
      cleaningFee: 8000,
      serviceFee: 5000,
      insurance: 6000,
      subtotal: 90000,
      taxes: 13500,
      total: 122500,
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
