// Mock Users Data
export const mockUsers = [
  {
    id: 'user-001',
    profile: {
      firstName: 'Sophia',
      lastName: 'Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Digital nomad and travel enthusiast. Love exploring new cities and cultures.',
      location: 'San Francisco, CA',
      joined: '2023-06-15'
    },
    contact: {
      email: 'sophia.miller@example.com',
      phone: '+1 (555) 123-4567',
      whatsapp: '+1 (555) 123-4567'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: false
    },
    stats: {
      totalBookings: 23,
      totalSpent: 2450000,
      averageRating: 4.8,
      reviewsGiven: 18,
      responseRate: 95
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-06-15',
    updatedAt: '2024-10-15'
  },
  {
    id: 'user-002',
    profile: {
      firstName: 'James',
      lastName: 'Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      bio: 'Business traveler who values comfort and convenience. Frequent Miami visitor.',
      location: 'New York, NY',
      joined: '2023-08-22'
    },
    contact: {
      email: 'james.wilson@example.com',
      phone: '+1 (555) 234-5678',
      whatsapp: '+1 (555) 234-5678'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalBookings: 45,
      totalSpent: 5200000,
      averageRating: 4.9,
      reviewsGiven: 32,
      responseRate: 98
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-08-22',
    updatedAt: '2024-10-14'
  },
  {
    id: 'user-003',
    profile: {
      firstName: 'Arlene',
      lastName: 'McCoy',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Family traveler who enjoys beach vacations and cultural experiences.',
      location: 'Chicago, IL',
      joined: '2023-04-10'
    },
    contact: {
      email: 'arlene.mccoy@example.com',
      phone: '+1 (555) 345-6789',
      whatsapp: '+1 (555) 345-6789'
    },
    verification: {
      email: true,
      phone: true,
      identity: false,
      address: true
    },
    stats: {
      totalBookings: 12,
      totalSpent: 1680000,
      averageRating: 4.7,
      reviewsGiven: 9,
      responseRate: 92
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: false,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-04-10',
    updatedAt: '2024-10-12'
  },
  {
    id: 'user-004',
    profile: {
      firstName: 'Cody',
      lastName: 'Fisher',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      bio: 'Adventure seeker and outdoor enthusiast. Love mountain retreats and hiking.',
      location: 'Denver, CO',
      joined: '2023-09-18'
    },
    contact: {
      email: 'cody.fisher@example.com',
      phone: '+1 (555) 456-7890',
      whatsapp: '+1 (555) 456-7890'
    },
    verification: {
      email: true,
      phone: false,
      identity: true,
      address: false
    },
    stats: {
      totalBookings: 8,
      totalSpent: 920000,
      averageRating: 4.6,
      reviewsGiven: 5,
      responseRate: 88
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: false,
        push: false
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-09-18',
    updatedAt: '2024-10-10'
  },
  {
    id: 'user-005',
    profile: {
      firstName: 'Jane',
      lastName: 'Cooper',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      bio: 'Solo traveler and foodie. Enjoy exploring local cuisine and hidden gems.',
      location: 'Portland, OR',
      joined: '2023-11-05'
    },
    contact: {
      email: 'jane.cooper@example.com',
      phone: '+1 (555) 567-8901',
      whatsapp: '+1 (555) 567-8901'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalBookings: 31,
      totalSpent: 2890000,
      averageRating: 4.9,
      reviewsGiven: 24,
      responseRate: 96
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-11-05',
    updatedAt: '2024-10-08'
  },
  {
    id: 'user-006',
    profile: {
      firstName: 'Michael',
      lastName: 'Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      bio: 'Tech entrepreneur and frequent business traveler. Value efficiency and good WiFi.',
      location: 'Seattle, WA',
      joined: '2023-02-28'
    },
    contact: {
      email: 'michael.chen@example.com',
      phone: '+1 (555) 678-9012',
      whatsapp: '+1 (555) 678-9012'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalBookings: 67,
      totalSpent: 8900000,
      averageRating: 4.8,
      reviewsGiven: 45,
      responseRate: 99
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-02-28',
    updatedAt: '2024-10-16'
  },
  {
    id: 'user-007',
    profile: {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
      bio: 'New to the platform! Excited to start my travel journey.',
      location: 'Austin, TX',
      joined: '2024-10-14'
    },
    contact: {
      email: 'sarah.jenkins@example.com',
      phone: '+1 (555) 789-0123',
      whatsapp: '+1 (555) 789-0123'
    },
    verification: {
      email: true,
      phone: false,
      identity: false,
      address: false
    },
    stats: {
      totalBookings: 0,
      totalSpent: 0,
      averageRating: 0,
      reviewsGiven: 0,
      responseRate: 0
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2024-10-14',
    updatedAt: '2024-10-14'
  },
  {
    id: 'host-001',
    profile: {
      firstName: 'Michael',
      lastName: 'Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Experienced host with 5+ years. Love sharing my beautiful properties with travelers.',
      location: 'New York, NY',
      joined: '2019-03-15'
    },
    contact: {
      email: 'michael.chen.host@example.com',
      phone: '+1 (555) 890-1234',
      whatsapp: '+1 (555) 890-1234'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalListings: 3,
      totalBookings: 234,
      totalRevenue: 15600000,
      averageRating: 4.9,
      reviewsReceived: 189,
      responseRate: 98
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'host',
    createdAt: '2019-03-15',
    updatedAt: '2024-10-15'
  },
  {
    id: 'host-002',
    profile: {
      firstName: 'Emily',
      lastName: 'Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Superhost specializing in luxury beachfront properties. Your perfect vacation awaits!',
      location: 'Malibu, CA',
      joined: '2020-06-20'
    },
    contact: {
      email: 'emily.rodriguez.host@example.com',
      phone: '+1 (555) 901-2345',
      whatsapp: '+1 (555) 901-2345'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalListings: 2,
      totalBookings: 178,
      totalRevenue: 23400000,
      averageRating: 4.8,
      reviewsReceived: 156,
      responseRate: 95
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'host',
    createdAt: '2020-06-20',
    updatedAt: '2024-10-12'
  },
  {
    id: 'admin-001',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'System administrator managing the RoarHomes platform.',
      location: 'Lagos, Nigeria',
      joined: '2023-01-01'
    },
    contact: {
      email: 'admin@roarhomes.com',
      phone: '+234 800-000-0000',
      whatsapp: '+234 800-000-0000'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalListings: 0,
      totalBookings: 0,
      totalRevenue: 0,
      averageRating: 0,
      reviewsReceived: 0,
      responseRate: 100
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'WAT',
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'admin',
    createdAt: '2023-01-01',
    updatedAt: '2024-10-16'
  }
];

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

export const getUsersByRole = (role) => {
  return mockUsers.filter(user => user.role === role);
};

export const getUsersByStatus = (status) => {
  return mockUsers.filter(user => user.status === status);
};

export const searchUsers = (query, filters = {}) => {
  return mockUsers.filter(user => {
    const matchesQuery = !query || 
      user.profile.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.profile.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.contact.email.toLowerCase().includes(query.toLowerCase()) ||
      user.profile.location.toLowerCase().includes(query.toLowerCase());
    
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesVerification = !filters.verification || 
      Object.keys(filters.verification).every(key => 
        !filters.verification[key] || user.verification[key]
      );
    
    return matchesQuery && matchesRole && matchesStatus && matchesVerification;
  });
};

export const getNewUsers = (days = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mockUsers.filter(user => 
    new Date(user.createdAt) >= cutoffDate
  );
};

export const getActiveUsers = () => {
  return mockUsers.filter(user => 
    user.status === 'active' && 
    user.stats.totalBookings > 0
  );
};
