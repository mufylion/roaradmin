import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { mockReviews, getReviewStats } from '../data/mockReviews.js';
import reviewsService from '../services/reviewsService';

// Subcomponent: Rating Bar
const RatingBar = ({ label, sublabel, percentage, colorClass }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-xs text-muted-foreground font-medium">{sublabel}</p>
      </div>
      <span className="text-sm font-black">{percentage}</span>
    </div>
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <div className={`h-full ${colorClass} rounded-full`} style={{ width: percentage }}></div>
    </div>
  </div>
);

// Subcomponent: Review Card
const ReviewCard = ({ id, title, content, rating, author, avatar, details, onReply, isFlagged, onFlag, status, onPublish, onUnpublish }) => (
  <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
    <div className="flex items-start gap-4">
      <img src={avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={author} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-[#2563eb]">{rating}</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                icon="lucide:star"
                className={`w-4 h-4 ${
                  star <= Math.floor(parseFloat(rating))
                    ? 'text-orange-500 fill-orange-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-[#64748b] mb-3 leading-relaxed">{content}</p>
        <div className="flex items-center gap-2 text-xs text-[#64748b] mb-4">
          <span className="font-medium">{author}</span>
          <span>•</span>
          <span>{details}</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => onFlag({ id, title, content, rating, author, avatar, details })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isFlagged 
                ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white' 
                : 'bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b]'
            }`}
          >
            <Icon icon="lucide:flag" className="w-3 h-3" />
            {isFlagged ? 'Flagged' : 'Flag'}
          </button>
          
          {status === 'pending' ? (
            <button 
              onClick={() => onPublish(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-all"
            >
              <Icon icon="lucide:check" className="w-3 h-3" />
              Publish
            </button>
          ) : (
            <button 
              onClick={() => onUnpublish(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg text-xs font-medium transition-all"
            >
              <Icon icon="lucide:x" className="w-3 h-3" />
              Unpublish
            </button>
          )}
          
          <button 
            onClick={() => onReply({ id, title, content, rating, author, avatar, details })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-medium transition-all"
          >
            <Icon icon="lucide:reply" className="w-3 h-3" />
            Reply
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [flaggedReviews, setFlaggedReviews] = useState(new Set());
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const filters = ['Positive', 'Neutral', 'Negative', 'All'];

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewsService.fetchReviews();
      setReviews(data);
    } catch (err) {
      console.error('Reviews API failed');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const stats = useMemo(() => {
    if (reviews.length === 0) return { averageRating: 0, total: 0, positivePercentage: 0, neutralPercentage: 0, negativePercentage: 0 };
    const total = reviews.length;
    const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1);
    const pos = reviews.filter(r => r.rating >= 4).length;
    const neu = reviews.filter(r => r.rating === 3).length;
    const neg = reviews.filter(r => r.rating <= 2).length;
    return {
      averageRating: avg,
      total,
      positivePercentage: Math.round((pos / total) * 100),
      neutralPercentage: Math.round((neu / total) * 100),
      negativePercentage: Math.round((neg / total) * 100)
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (activeFilter === 'All') return reviews;
    if (activeFilter === 'Positive') return reviews.filter(r => r.rating >= 4);
    if (activeFilter === 'Neutral') return reviews.filter(r => r.rating === 3);
    if (activeFilter === 'Negative') return reviews.filter(r => r.rating <= 2);
    return reviews;
  }, [reviews, activeFilter]);

  const handleReplyClick = (review) => {
    setSelectedReview(review);
    setReplyText('');
    setReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    try {
      await reviewsService.replyToReview(selectedReview.id, replyText);
      setReplyModalOpen(false);
      setSelectedReview(null);
      setReplyText('');
      fetchReviews(); // Refresh
    } catch (err) {
      alert('Failed to send reply');
    }
  };

  const handleFlagReview = async (review) => {
    try {
      const newStatus = review.status === 'flagged' ? 'pending' : 'flagged';
      await reviewsService.updateReviewStatus(review.id, newStatus);
      fetchReviews();
    } catch (err) {
      alert('Failed to update review status');
    }
  };

  const handlePublishReview = async (reviewId) => {
    try {
      await reviewsService.updateReviewStatus(reviewId, 'published');
      fetchReviews();
    } catch (err) {
      // Optimistic update for mock data
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'published' } : r));
    }
  };

  const handleUnpublishReview = async (reviewId) => {
    try {
      await reviewsService.updateReviewStatus(reviewId, 'pending');
      fetchReviews();
    } catch (err) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'pending' } : r));
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Reviews Management"
        description="Monitor and respond to guest reviews across all properties."
        customContent={
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                  activeFilter === filter ? 'bg-[#2563eb] text-white' : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        }
      />
      
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-[#f8fafc]">
        {/* Left Column: Summary */}
        <div className="w-full lg:w-80 border-r border-[#e2e8f0] p-8 bg-[#f1f5f9]/30 overflow-y-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#e2e8f0] shadow-sm text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon icon="lucide:star" className="text-3xl text-orange-500 fill-orange-500" />
              <span className="text-5xl font-black tracking-tighter font-heading">{stats.averageRating}</span>
            </div>
            <p className="text-sm text-[#64748b] font-medium">Avg. score based on {stats.total} reviews</p>
          </div>

          <div className="space-y-6">
            <RatingBar label="Positive" sublabel="4 stars and above" percentage={`${stats.positivePercentage}%`} colorClass="bg-[#10b981]" />
            <RatingBar label="Neutral" sublabel="3 stars" percentage={`${stats.neutralPercentage}%`} colorClass="bg-orange-400" />
            <RatingBar label="Negative" sublabel="Under 2 stars" percentage={`${stats.negativePercentage}%`} colorClass="bg-[#ef4444]" />
          </div>
        </div>

        {/* Right Column: Review Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          <h2 className="text-xl font-bold font-heading">Latest reviews</h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Icon icon="lucide:loader-2" className="text-3xl text-primary animate-spin" />
            </div>
          ) : (
            filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                id={review.id}
                title={review.title}
                content={review.content}
                rating={review.rating}
                author={review.User ? `${review.User.firstName} ${review.User.lastName}` : 'Guest'}
                avatar={review.User?.avatar}
                details={`${new Date(review.createdAt).toLocaleDateString()} • ${review.Property?.name || 'Property'}`}
                status={review.status}
                onReply={handleReplyClick}
                isFlagged={review.status === 'flagged'}
                onFlag={handleFlagReview}
                onPublish={handlePublishReview}
                onUnpublish={handleUnpublishReview}
              />
            ))
          )}

          {!loading && filteredReviews.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              No reviews found for this filter.
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {replyModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Reply to Review</h2>
                <button onClick={() => setReplyModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f1f5f9] transition-colors">
                  <Icon icon="lucide:x" className="text-lg" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img src={selectedReview.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={selectedReview.author} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{selectedReview.title}</h3>
                  <p className="text-sm text-[#64748b] mb-3 leading-relaxed">{selectedReview.content}</p>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your response to this review..."
                  className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
                  rows={6}
                />
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => setReplyModalOpen(false)} className="px-6 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-xl hover:bg-[#f1f5f9] transition-colors font-medium">Cancel</button>
                  <button onClick={handleSendReply} disabled={!replyText.trim()} className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl hover:bg-[#1d4ed8] transition-colors font-medium disabled:opacity-50">Send Reply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
