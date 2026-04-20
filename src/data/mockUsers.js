// Mock Users Data
const defaultUsers = [
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
  },
  {
    id: 'user-008',
    profile: {
      firstName: 'Robert',
      lastName: 'Taylor',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      dateOfBirth: '1985-03-12',
      gender: 'male',
      bio: 'Frequent traveler who loves exploring new cities.',
      languages: ['English'],
      location: 'Chicago, Illinois',
      joined: '2023-02-15'
    },
    contact: {
      email: 'robert.taylor@example.com',
      phone: '+1 (312) 555-0123',
      whatsapp: '+1 (312) 555-0123'
    },
    verification: {
      email: true,
      phone: true,
      identity: false,
      address: false
    },
    stats: {
      totalBookings: 12,
      totalSpent: 1440000,
      averageRating: 4.8,
      reviewsGiven: 8,
      responseRate: 95
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'CST',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-02-15',
    updatedAt: '2024-10-10'
  },
  {
    id: 'user-009',
    profile: {
      firstName: 'Emily',
      lastName: 'Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      dateOfBirth: '1990-07-22',
      gender: 'female',
      bio: 'Digital nomad working remotely while traveling.',
      languages: ['English', 'Spanish'],
      location: 'Austin, Texas',
      joined: '2023-03-10'
    },
    contact: {
      email: 'emily.johnson@example.com',
      phone: '+1 (512) 555-0456',
      whatsapp: '+1 (512) 555-0456'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: false
    },
    stats: {
      totalBookings: 18,
      totalSpent: 2160000,
      averageRating: 4.9,
      reviewsGiven: 15,
      responseRate: 98
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'CST',
      notifications: {
        email: true,
        sms: true,
        push: false
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-03-10',
    updatedAt: '2024-10-12'
  },
  {
    id: 'user-010',
    profile: {
      firstName: 'David',
      lastName: 'Brown',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      dateOfBirth: '1988-11-05',
      gender: 'male',
      bio: 'Business traveler seeking comfortable stays.',
      languages: ['English', 'French'],
      location: 'Boston, Massachusetts',
      joined: '2023-04-20'
    },
    contact: {
      email: 'david.brown@example.com',
      phone: '+1 (617) 555-0789',
      whatsapp: '+1 (617) 555-0789'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalBookings: 25,
      totalSpent: 3000000,
      averageRating: 4.7,
      reviewsGiven: 20,
      responseRate: 92
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'EST',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-04-20',
    updatedAt: '2024-10-14'
  },
  {
    id: 'user-011',
    profile: {
      firstName: 'Lisa',
      lastName: 'Anderson',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      dateOfBirth: '1992-02-18',
      gender: 'female',
      bio: 'Adventure seeker and nature lover.',
      languages: ['English'],
      location: 'Seattle, Washington',
      joined: '2023-05-08'
    },
    contact: {
      email: 'lisa.anderson@example.com',
      phone: '+1 (206) 555-0234',
      whatsapp: '+1 (206) 555-0234'
    },
    verification: {
      email: true,
      phone: true,
      identity: false,
      address: true
    },
    stats: {
      totalBookings: 8,
      totalSpent: 960000,
      averageRating: 4.6,
      reviewsGiven: 6,
      responseRate: 88
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'PST',
      notifications: {
        email: false,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-05-08',
    updatedAt: '2024-10-16'
  },
  {
    id: 'user-012',
    profile: {
      firstName: 'James',
      lastName: 'Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      dateOfBirth: '1987-09-30',
      gender: 'male',
      bio: 'Weekend traveler exploring nearby destinations.',
      languages: ['English'],
      location: 'Denver, Colorado',
      joined: '2023-06-12'
    },
    contact: {
      email: 'james.wilson@example.com',
      phone: '+1 (303) 555-0567',
      whatsapp: '+1 (303) 555-0567'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: false
    },
    stats: {
      totalBookings: 15,
      totalSpent: 1800000,
      averageRating: 4.8,
      reviewsGiven: 12,
      responseRate: 94
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'MST',
      notifications: {
        email: true,
        sms: true,
        push: false
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-06-12',
    updatedAt: '2024-10-18'
  },
  {
    id: 'user-013',
    profile: {
      firstName: 'Sarah',
      lastName: 'Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
      dateOfBirth: '1991-12-14',
      gender: 'female',
      bio: 'Foodie traveler exploring local cuisines.',
      languages: ['English', 'Spanish'],
      location: 'Miami, Florida',
      joined: '2023-07-25'
    },
    contact: {
      email: 'sarah.martinez@example.com',
      phone: '+1 (305) 555-0890',
      whatsapp: '+1 (305) 555-0890'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalBookings: 20,
      totalSpent: 2400000,
      averageRating: 4.9,
      reviewsGiven: 18,
      responseRate: 96
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'EST',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-07-25',
    updatedAt: '2024-10-20'
  },
  {
    id: 'user-014',
    profile: {
      firstName: 'Michael',
      lastName: 'Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
      dateOfBirth: '1989-05-08',
      gender: 'male',
      bio: 'Luxury traveler seeking premium experiences.',
      languages: ['English', 'German'],
      location: 'Las Vegas, Nevada',
      joined: '2023-08-30'
    },
    contact: {
      email: 'michael.thompson@example.com',
      phone: '+1 (702) 555-0123',
      whatsapp: '+1 (702) 555-0123'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: true
    },
    stats: {
      totalBookings: 30,
      totalSpent: 3600000,
      averageRating: 5.0,
      reviewsGiven: 25,
      responseRate: 100
    },
    preferences: {
      language: 'English',
      currency: 'NGN',
      timezone: 'PST',
      notifications: {
        email: true,
        sms: true,
        push: true
      }
    },
    status: 'active',
    role: 'guest',
    createdAt: '2023-08-30',
    updatedAt: '2024-10-22'
  }
];

export const getUserById = (id) => {
  console.log('getUserById called with id:', id);
  console.log('Available users:', mockUsers.map(u => u.id));
  console.log('Total users count:', mockUsers.length);
  const user = mockUsers.find(user => user.id === id);
  console.log('Found user:', user);
  return user;
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

export const getUserStats = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = getActiveUsers().length;
  const newUsers = getNewUsers(30).length;
  const totalListings = mockUsers.reduce((total, user) => {
    return total + (user.role === 'host' ? 1 : 0);
  }, 0);

  return {
    total: totalUsers,
    active: activeUsers,
    newThisMonth: newUsers,
    totalListings: totalListings
  };
};

// Always use fresh data from the array
export const mockUsers = defaultUsers;
