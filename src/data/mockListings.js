// Mock Listings Data
export const mockListings = [
  {
    id: 'SN-98234',
    title: 'Modern Downtown Loft',
    description: 'Stylish loft in the heart of downtown with panoramic city views. Perfect for business travelers and urban explorers.',
    location: {
      address: '123 Main Street, Apt 4B',
      city: 'Manhattan',
      state: 'New York',
      country: 'United States',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    type: 'Apartment',
    price: {
      nightly: 12000,
      weekend: 15000,
      weekly: 80000,
      monthly: 280000,
      currency: 'NGN',
      seasonal: {
        summer: { rate: 18000, startDate: '2024-06-01', endDate: '2024-08-31' },
        winter: { rate: 20000, startDate: '2024-12-01', endDate: '2025-02-28' },
        holiday: { rate: 25000, startDate: '2024-12-20', endDate: '2025-01-05' }
      },
      fees: {
        cleaning: 5000,
        service: 3000,
        securityDeposit: 18000,
        weeklyDiscount: 15,
        monthlyDiscount: 20
      }
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2
    },
    amenities: [
      'WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'Washer', 'Dryer',
      'TV', 'Workspace', 'Elevator', 'Gym', 'Pool', 'Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073791259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-001',
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.9,
      responseRate: 98
    },
    ratings: {
      overall: 4.9,
      cleanliness: 4.8,
      communication: 5.0,
      checkin: 4.9,
      accuracy: 4.8,
      location: 4.9,
      value: 4.7
    },
    reviews: [
      {
        id: 'rev-001',
        user: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        date: '2024-10-15',
        comment: 'Amazing loft! Perfect location and beautifully decorated.'
      }
    ],
    availability: {
      status: 'active',
      bookedDates: ['2024-10-20', '2024-10-21', '2024-11-15', '2024-11-16'],
      minStay: 2,
      maxStay: 30
    },
    policies: {
      cancellation: 'flexible',
      checkIn: '15:00',
      checkOut: '11:00',
      smoking: 'no',
      pets: 'no',
      parties: 'no',
      bookingRules: {
        minStay: 2,
        maxStay: 30,
        advanceNotice: 24,
        checkInWindow: '15:00-22:00',
        checkOutWindow: '08:00-11:00',
        houseRules: [
          'No smoking',
          'No parties',
          'Quiet hours 10 PM - 7 AM',
          'Respect neighbors',
          'No unregistered guests'
        ]
      }
    },
    stats: {
      views: 1247,
      bookings: 89,
      revenue: 312000,
      occupancy: 84
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-10-15'
  },
  {
    id: 'SN-98235',
    title: 'Beachfront Villa Malibu',
    description: 'Luxurious beachfront villa with stunning ocean views, private beach access, and modern amenities.',
    location: {
      address: '456 Ocean Drive',
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    type: 'Villa',
    price: {
      nightly: 35000,
      weekend: 42000,
      weekly: 245000,
      monthly: 980000,
      currency: 'NGN',
      seasonal: {
        summer: { rate: 52500, startDate: '2024-06-01', endDate: '2024-08-31' },
        winter: { rate: 59500, startDate: '2024-12-01', endDate: '2025-02-28' },
        holiday: { rate: 70000, startDate: '2024-12-20', endDate: '2025-01-05' }
      },
      fees: {
        cleaning: 15000,
        service: 8000,
        securityDeposit: 52500,
        weeklyDiscount: 10,
        monthlyDiscount: 15
      }
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 3
    },
    amenities: [
      'WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'Washer', 'Dryer',
      'TV', 'Workspace', 'Beach Access', 'Pool', 'Hot Tub', 'BBQ Grill',
      'Ocean View', 'Terrace', 'Parking', 'Gym'
    ],
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582610116397-edb818d97c08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-002',
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4.8,
      responseRate: 95
    },
    ratings: {
      overall: 4.8,
      cleanliness: 4.9,
      communication: 4.7,
      checkin: 4.8,
      accuracy: 4.8,
      location: 5.0,
      value: 4.6
    },
    reviews: [
      {
        id: 'rev-002',
        user: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 5,
        date: '2024-10-12',
        comment: 'Absolutely stunning property! The ocean views are breathtaking.'
      }
    ],
    availability: {
      status: 'active',
      bookedDates: ['2024-10-25', '2024-10-26', '2024-10-27', '2024-12-20', '2024-12-21'],
      minStay: 3,
      maxStay: 14
    },
    policies: {
      cancellation: 'moderate',
      checkIn: '16:00',
      checkOut: '10:00',
      smoking: 'no',
      pets: 'yes',
      parties: 'no'
    },
    stats: {
      views: 2156,
      bookings: 156,
      revenue: 890000,
      occupancy: 92
    },
    createdAt: '2024-02-20',
    updatedAt: '2024-10-12'
  },
  {
    id: 'SN-98236',
    title: 'Mountain Retreat Aspen',
    description: 'Cozy mountain cabin with ski-in/ski-out access, fireplace, and breathtaking mountain views.',
    location: {
      address: '789 Ski Trail Road',
      city: 'Aspen',
      state: 'Colorado',
      country: 'United States',
      coordinates: { lat: 39.1911, lng: -106.8175 }
    },
    type: 'Cabin',
    price: {
      nightly: 18000,
      weekend: 22000,
      weekly: 126000,
      monthly: 504000,
      currency: 'NGN'
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2
    },
    amenities: [
      'WiFi', 'Kitchen', 'Fireplace', 'Heating', 'Washer', 'Dryer',
      'TV', 'Ski Storage', 'Hot Tub', 'BBQ Grill', 'Mountain View',
      'Parking', 'Pet Friendly'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-003',
      name: 'James Mitchell',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      rating: 4.7,
      responseRate: 92
    },
    ratings: {
      overall: 4.7,
      cleanliness: 4.6,
      communication: 4.8,
      checkin: 4.7,
      accuracy: 4.7,
      location: 4.9,
      value: 4.8
    },
    reviews: [
      {
        id: 'rev-003',
        user: 'Lisa Wang',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        rating: 4,
        date: '2024-10-10',
        comment: 'Great location for skiing. Cabin was cozy and well-equipped.'
      }
    ],
    availability: {
      status: 'active',
      bookedDates: ['2024-12-15', '2024-12-16', '2024-12-17', '2024-01-20', '2024-01-21'],
      minStay: 2,
      maxStay: 21
    },
    policies: {
      cancellation: 'strict',
      checkIn: '15:00',
      checkOut: '11:00',
      smoking: 'no',
      pets: 'yes',
      parties: 'no'
    },
    stats: {
      views: 1876,
      bookings: 134,
      revenue: 678000,
      occupancy: 76
    },
    createdAt: '2024-03-10',
    updatedAt: '2024-10-10'
  },
  {
    id: 'SN-98237',
    title: 'Urban Studio Brooklyn',
    description: 'Modern studio apartment in trendy Brooklyn neighborhood, perfect for solo travelers or couples.',
    location: {
      address: '321 Metropolitan Ave',
      city: 'Brooklyn',
      state: 'New York',
      country: 'United States',
      coordinates: { lat: 40.7081, lng: -73.9571 }
    },
    type: 'Apartment',
    price: {
      nightly: 8500,
      weekend: 10000,
      weekly: 59500,
      monthly: 238000,
      currency: 'NGN'
    },
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    amenities: [
      'WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'Workspace',
      'TV', 'Elevator', 'Laundry', 'Pet Friendly'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073791259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-004',
      name: 'Alex Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      rating: 4.6,
      responseRate: 90
    },
    ratings: {
      overall: 4.6,
      cleanliness: 4.5,
      communication: 4.7,
      checkin: 4.6,
      accuracy: 4.6,
      location: 4.8,
      value: 4.7
    },
    reviews: [
      {
        id: 'rev-004',
        user: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
        rating: 4,
        date: '2024-10-08',
        comment: 'Great location, very convenient for exploring Brooklyn.'
      }
    ],
    availability: {
      status: 'draft',
      bookedDates: [],
      minStay: 1,
      maxStay: 30
    },
    policies: {
      cancellation: 'flexible',
      checkIn: '14:00',
      checkOut: '10:00',
      smoking: 'no',
      pets: 'yes',
      parties: 'no'
    },
    stats: {
      views: 923,
      bookings: 0,
      revenue: 0,
      occupancy: 0
    },
    createdAt: '2024-09-15',
    updatedAt: '2024-10-08'
  },
  {
    id: 'SN-98238',
    title: 'Luxury Penthouse Miami',
    description: 'Ultra-luxurious penthouse with panoramic ocean and city views, rooftop pool, and premium amenities.',
    location: {
      address: '789 Brickell Ave, Penthouse 42',
      city: 'Miami',
      state: 'Florida',
      country: 'United States',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    type: 'Penthouse',
    price: {
      nightly: 45000,
      weekend: 54000,
      weekly: 315000,
      monthly: 1260000,
      currency: 'NGN'
    },
    capacity: {
      guests: 10,
      bedrooms: 5,
      beds: 6,
      bathrooms: 4
    },
    amenities: [
      'WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'Washer', 'Dryer',
      'TV', 'Workspace', 'Elevator', 'Gym', 'Pool', 'Hot Tub', 'Rooftop Terrace',
      'Ocean View', 'City View', 'Concierge', 'Valet Parking', 'Home Theater',
      'Wine Cellar', 'Smart Home', 'Security System'
    ],
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582610116397-edb818d97c08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-005',
      name: 'Robert Sterling',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      rating: 5.0,
      responseRate: 100
    },
    ratings: {
      overall: 5.0,
      cleanliness: 5.0,
      communication: 5.0,
      checkin: 5.0,
      accuracy: 5.0,
      location: 5.0,
      value: 4.9
    },
    reviews: [
      {
        id: 'rev-005',
        user: 'Jennifer Adams',
        avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
        rating: 5,
        date: '2024-10-14',
        comment: 'Absolutely incredible property! The penthouse exceeded all our expectations.'
      }
    ],
    availability: {
      status: 'active',
      bookedDates: ['2024-11-01', '2024-11-02', '2024-12-24', '2024-12-25', '2024-12-26'],
      minStay: 3,
      maxStay: 28
    },
    policies: {
      cancellation: 'super-strict',
      checkIn: '16:00',
      checkOut: '11:00',
      smoking: 'no',
      pets: 'no',
      parties: 'yes'
    },
    stats: {
      views: 3421,
      bookings: 198,
      revenue: 1560000,
      occupancy: 88
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-10-14'
  }
];

export const getListingById = (id) => {
  return mockListings.find(listing => listing.id === id);
};

export const getListingsByStatus = (status) => {
  return mockListings.filter(listing => listing.availability.status === status);
};

export const searchListings = (query, filters = {}) => {
  return mockListings.filter(listing => {
    const matchesQuery = !query || 
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.location.city.toLowerCase().includes(query.toLowerCase()) ||
      listing.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesType = !filters.type || listing.type === filters.type;
    const matchesPrice = !filters.maxPrice || listing.price.nightly <= filters.maxPrice;
    const matchesCapacity = !filters.minCapacity || listing.capacity.guests >= filters.minCapacity;
    
    return matchesQuery && matchesType && matchesPrice && matchesCapacity;
  });
};
