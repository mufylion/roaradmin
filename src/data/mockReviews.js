import { mockListings } from './mockListings.js';
import { getUserById } from './mockUsers.js';

// Helper function to get user display data
const getUserDisplayData = (userId) => {
  const user = getUserById(userId);
  if (!user) {
    return {
      name: 'Unknown User',
      avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',
      email: 'unknown@example.com'
    };
  }
  
  return {
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    avatar: user.profile.avatar,
    email: user.contact.email
  };
};

// Helper function to get listing display data
const getListingDisplayData = (listingId) => {
  const listing = mockListings.find(l => l.id === listingId);
  if (!listing) {
    return {
      title: 'Unknown Property',
      location: 'Unknown Location'
    };
  }
  
  return {
    title: listing.title,
    location: `${listing.location.city}, ${listing.location.state}`
  };
};

// Helper function to generate random review content
const generateReviewContent = (rating) => {
  const positiveReviews = [
    'Amazing experience! The property was exactly as described and the host was incredibly responsive. Would definitely book again.',
    'Beautiful property with stunning views. Everything was clean and well-maintained. Highly recommend!',
    'Perfect getaway! The host went above and beyond to make our stay comfortable. Will return for sure.',
    'Exceptional stay! The property exceeded our expectations. Great location and amenities.',
    'Wonderful experience from start to finish. The host was professional and the property was immaculate.'
  ];
  
  const neutralReviews = [
    'Good property overall. Some minor issues with cleanliness but the location was great.',
    'Decent stay for the price. Could use some updates but the host was helpful.',
    'Average experience. Property was as described but nothing exceptional.',
    'Okay place to stay. Location was convenient but amenities were basic.'
  ];
  
  const negativeReviews = [
    'Disappointing experience. Property was not as clean as expected and communication was poor.',
    'Would not recommend. Multiple issues during our stay and host was unresponsive.',
    'Below average. The property needs significant maintenance and updates.',
    'Poor value for money. Many things were broken or not working properly.'
  ];
  
  if (rating >= 4) return positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
  if (rating >= 3) return neutralReviews[Math.floor(Math.random() * neutralReviews.length)];
  return negativeReviews[Math.floor(Math.random() * negativeReviews.length)];
};

// Helper function to generate review titles
const generateReviewTitle = (rating) => {
  const positiveTitles = [
    'Amazing stay!',
    'Perfect getaway',
    'Beautiful property',
    'Exceptional experience',
    'Highly recommend',
    'Wonderful host',
    'Stunning location',
    'Exceeded expectations'
  ];
  
  const neutralTitles = [
    'Good overall',
    'Decent stay',
    'Average experience',
    'Okay for the price',
    'Mixed feelings'
  ];
  
  const negativeTitles = [
    'Disappointing',
    'Would not recommend',
    'Below average',
    'Poor experience',
    'Not worth it'
  ];
  
  if (rating >= 4) return positiveTitles[Math.floor(Math.random() * positiveTitles.length)];
  if (rating >= 3) return neutralTitles[Math.floor(Math.random() * neutralTitles.length)];
  return negativeTitles[Math.floor(Math.random() * negativeTitles.length)];
};

// Mock Reviews Data
export const mockReviews = [
  {
    id: 'REV-001',
    bookingId: 'BK-9021',
    guest: {
      id: 'user-001',
      ...getUserDisplayData('user-001')
    },
    listing: {
      id: 'SN-98234',
      ...getListingDisplayData('SN-98234')
    },
    rating: 5,
    title: generateReviewTitle(5),
    content: generateReviewContent(5),
    date: '2024-10-15',
    status: 'published',
    helpful: 12,
    response: null
  },
  {
    id: 'REV-002',
    bookingId: 'BK-9022',
    guest: {
      id: 'user-002',
      ...getUserDisplayData('user-002')
    },
    listing: {
      id: 'SN-98235',
      ...getListingDisplayData('SN-98235')
    },
    rating: 4,
    title: generateReviewTitle(4),
    content: generateReviewContent(4),
    date: '2024-10-18',
    status: 'published',
    helpful: 8,
    response: {
      text: 'Thank you so much for your wonderful review! We\'re thrilled you enjoyed your stay and look forward to welcoming you back soon.',
      date: '2024-10-19',
      author: 'Property Manager'
    }
  },
  {
    id: 'REV-003',
    bookingId: 'BK-9023',
    guest: {
      id: 'user-003',
      ...getUserDisplayData('user-003')
    },
    listing: {
      id: 'SN-98236',
      ...getListingDisplayData('SN-98236')
    },
    rating: 4,
    title: generateReviewTitle(3),
    content: generateReviewContent(3),
    date: '2024-10-20',
    status: 'published',
    helpful: 5,
    response: null
  },
  {
    id: 'REV-004',
    bookingId: 'BK-9024',
    guest: {
      id: 'user-004',
      ...getUserDisplayData('user-004')
    },
    listing: {
      id: 'SN-98237',
      ...getListingDisplayData('SN-98237')
    },
    rating: 2,
    title: generateReviewTitle(2),
    content: generateReviewContent(2),
    date: '2024-10-22',
    status: 'pending',
    helpful: 3,
    response: null
  },
  {
    id: 'REV-005',
    bookingId: 'BK-9025',
    guest: {
      id: 'user-005',
      ...getUserDisplayData('user-005')
    },
    listing: {
      id: 'SN-98238',
      ...getListingDisplayData('SN-98238')
    },
    rating: 5,
    title: generateReviewTitle(5),
    content: generateReviewContent(5),
    date: '2024-10-25',
    status: 'published',
    helpful: 15,
    response: {
      text: 'We\'re so glad you had an amazing experience! Your kind words mean a lot to us. Come back anytime!',
      date: '2024-10-26',
      author: 'Host'
    }
  },
  {
    id: 'REV-006',
    bookingId: 'BK-9026',
    guest: {
      id: 'user-006',
      ...getUserDisplayData('user-006')
    },
    listing: {
      id: 'SN-98239',
      ...getListingDisplayData('SN-98239')
    },
    rating: 4,
    title: generateReviewTitle(4),
    content: generateReviewContent(4),
    date: '2024-10-28',
    status: 'published',
    helpful: 9,
    response: null
  },
  {
    id: 'REV-007',
    bookingId: 'BK-9027',
    guest: {
      id: 'user-007',
      ...getUserDisplayData('user-007')
    },
    listing: {
      id: 'SN-98240',
      ...getListingDisplayData('SN-98240')
    },
    rating: 1,
    title: generateReviewTitle(1),
    content: generateReviewContent(1),
    date: '2024-10-30',
    status: 'pending',
    helpful: 2,
    response: null
  },
  {
    id: 'REV-008',
    bookingId: 'BK-9028',
    guest: {
      id: 'user-008',
      ...getUserDisplayData('user-008')
    },
    listing: {
      id: 'SN-98241',
      ...getListingDisplayData('SN-98241')
    },
    rating: 5,
    title: generateReviewTitle(5),
    content: generateReviewContent(5),
    date: '2024-11-01',
    status: 'published',
    helpful: 18,
    response: {
      text: 'Thank you for the perfect rating! We\'re delighted you had such a great experience.',
      date: '2024-11-02',
      author: 'Property Manager'
    }
  },
  {
    id: 'REV-009',
    bookingId: 'BK-9029',
    guest: {
      id: 'user-009',
      ...getUserDisplayData('user-009')
    },
    listing: {
      id: 'SN-98242',
      ...getListingDisplayData('SN-98242')
    },
    rating: 3,
    title: generateReviewTitle(3),
    content: generateReviewContent(3),
    date: '2024-11-03',
    status: 'published',
    helpful: 6,
    response: null
  },
  {
    id: 'REV-010',
    bookingId: 'BK-9030',
    guest: {
      id: 'user-010',
      ...getUserDisplayData('user-010')
    },
    listing: {
      id: 'SN-98243',
      ...getListingDisplayData('SN-98243')
    },
    rating: 4,
    title: generateReviewTitle(4),
    content: generateReviewContent(4),
    date: '2024-11-05',
    status: 'published',
    helpful: 11,
    response: {
      text: 'We appreciate your detailed feedback! Thanks for choosing to stay with us.',
      date: '2024-11-06',
      author: 'Host'
    }
  }
];

// Helper function to get review by ID
export const getReviewById = (reviewId) => {
  return mockReviews.find(review => review.id === reviewId);
};

// Helper function to get reviews by listing ID
export const getReviewsByListingId = (listingId) => {
  return mockReviews.filter(review => review.listing.id === listingId);
};

// Helper function to get reviews by guest ID
export const getReviewsByGuestId = (guestId) => {
  return mockReviews.filter(review => review.guest.id === guestId);
};

// Helper function to get reviews by status
export const getReviewsByStatus = (status) => {
  return mockReviews.filter(review => review.status === status);
};

// Helper function to get review statistics
export const getReviewStats = () => {
  const total = mockReviews.length;
  const published = mockReviews.filter(r => r.status === 'published').length;
  const pending = mockReviews.filter(r => r.status === 'pending').length;
  const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1);
  
  const positive = mockReviews.filter(r => r.rating >= 4).length;
  const neutral = mockReviews.filter(r => r.rating === 3).length;
  const negative = mockReviews.filter(r => r.rating <= 2).length;
  
  return {
    total,
    published,
    pending,
    averageRating,
    positive,
    neutral,
    negative,
    positivePercentage: Math.round((positive / total) * 100),
    neutralPercentage: Math.round((neutral / total) * 100),
    negativePercentage: Math.round((negative / total) * 100)
  };
};
