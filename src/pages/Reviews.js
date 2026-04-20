import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { useAppConfig } from '../config/useAppConfig';
import { mockReviews, getReviewStats } from '../data/mockReviews.js';


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
const ReviewCard = ({ title, content, rating, author, avatar, details, onReply, isFlagged, onFlag, status, onPublish, onUnpublish }) => (
  <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
    <div className="flex items-start gap-4">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
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
        
        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => onFlag({ title, content, rating, author, avatar, details })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isFlagged 
                ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white' 
                : 'bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b]'
            }`}
          >
            <Icon icon="lucide:flag" className="w-3 h-3" />
            {isFlagged ? 'Flagged' : 'Flag'}
          </button>
          
          {/* Publish/Unpublish Button */}
          {status === 'pending' ? (
            <button 
              onClick={() => onPublish && onPublish()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-medium transition-all"
            >
              <Icon icon="lucide:check" className="w-3 h-3" />
              Publish
            </button>
          ) : (
            <button 
              onClick={() => onUnpublish && onUnpublish()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg text-xs font-medium transition-all"
            >
              <Icon icon="lucide:x" className="w-3 h-3" />
              Unpublish
            </button>
          )}
          
          <button 
            onClick={() => onReply({ title, content, rating, author, avatar, details })}
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('All');
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [flaggedReviews, setFlaggedReviews] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(3);
  const [reviews, setReviews] = useState(mockReviews);
  const [reviewStatuses, setReviewStatuses] = useState({});
  
  const filters = ['Positive', 'Neutral', 'Negative', 'All'];
  
  // Get review statistics from mock data
  const reviewStats = getReviewStats();

  // Filter reviews based on active filter
  const filteredReviews = useMemo(() => {
    let filtered = mockReviews;
    
    if (activeFilter === 'Positive') {
      filtered = filtered.filter(review => review.rating >= 4);
    } else if (activeFilter === 'Neutral') {
      filtered = filtered.filter(review => review.rating === 3);
    } else if (activeFilter === 'Negative') {
      filtered = filtered.filter(review => review.rating <= 2);
    }
    
    return filtered;
  }, [activeFilter]);

  // Pagination logic
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return filteredReviews.slice(startIndex, endIndex);
  }, [filteredReviews, currentPage]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handleReplyClick = (review) => {
    setSelectedReview(review);
    setReplyText('');
    setReplyModalOpen(true);
  };

  const handleSendReply = () => {
    // Here you would typically send reply to your backend
    console.log('Sending reply:', { review: selectedReview, reply: replyText });
    setReplyModalOpen(false);
    setSelectedReview(null);
    setReplyText('');
  };

  const handleFlagReview = (review) => {
    const reviewKey = `${review.author}-${review.title}-${review.rating}`;
    setFlaggedReviews(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(reviewKey)) {
        newFlagged.delete(reviewKey);
      } else {
        newFlagged.add(reviewKey);
      }
      return newFlagged;
    });
  };

  const handlePublishReview = (reviewId) => {
    // Here you would typically make an API call to publish the review
    console.log('Publishing review:', reviewId);
    // Simple state change for now
    setReviewStatuses(prev => ({
      ...prev,
      [reviewId]: 'published'
    }));
  };

  const handleUnpublishReview = (reviewId) => {
    // Here you would typically make an API call to unpublish the review
    console.log('Unpublishing review:', reviewId);
    // Simple state change for now
    setReviewStatuses(prev => ({
      ...prev,
      [reviewId]: 'pending'
    }));
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
                  activeFilter === filter
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        }
      />
      
      <div className="min-h-screen w-full bg-[#f8fafc] flex flex-row relative font-sans text-[#0f172a] overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --secondary-foreground: #f8fafc;
            --secondary: #1e293b;
            --primary: #2563eb;
            --foreground: #0f172a;
            --primary-foreground: #ffffff;
            --border: #e2e8f0;
            --ring: #2563eb;
            --card: #ffffff;
            --tertiary: #10b981;
            --radius: 0.75rem;
            --background: #f8fafc;
            --input: #e2e8f0;
            --muted: #f1f5f9;
            --muted-foreground: #64748b;
            --destructive: #ef4444;
          }
        `}} />
        
        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Summary */}
          <div className="w-full lg:w-80 border-r border-[#e2e8f0] p-8 bg-[#f1f5f9]/30 overflow-y-auto">
            <div className="bg-white p-8 rounded-3xl border border-[#e2e8f0] shadow-sm text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon icon="lucide:star" className="text-3xl text-orange-500 fill-orange-500" />
                <span className="text-5xl font-black tracking-tighter font-heading">{reviewStats.averageRating}</span>
              </div>
              <p className="text-sm text-[#64748b] font-medium">Avg. score based on {reviewStats.total} reviews</p>
            </div>

            <div className="space-y-6">
              <RatingBar
                label="Positive"
                sublabel="4 stars and above"
                percentage={`${reviewStats.positivePercentage}%`}
                colorClass="bg-[#10b981]"
              />
              <RatingBar
                label="Neutral"
                sublabel="3 stars"
                percentage={`${reviewStats.neutralPercentage}%`}
                colorClass="bg-orange-400"
              />
              <RatingBar
                label="Negative"
                sublabel="Under 2 stars"
                percentage={`${reviewStats.negativePercentage}%`}
                colorClass="bg-[#ef4444]"
              />
            </div>

            <div className="mt-12 p-6 bg-[#2563eb]/5 rounded-2xl border border-[#2563eb]/10">
              <h4 className="text-sm font-bold text-[#2563eb] mb-2">Review Strategy</h4>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Responding to reviews within 24 hours increases guest trust by 40%. Try to maintain your current response rate of 92%.
              </p>
            </div>
          </div>

          {/* Right Column: Review Feed */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
            <h2 className="text-xl font-bold font-heading">Latest reviews</h2>

            {paginatedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                title={review.title}
                content={review.content}
                rating={review.rating}
                author={review.guest.name}
                avatar={review.guest.avatar}
                details={`${new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${review.listing.title}`}
                status={reviewStatuses[review.id] || review.status}
                onReply={handleReplyClick}
                isFlagged={flaggedReviews.has(`${review.guest.name}-${review.title}-${review.rating}`)}
                onFlag={handleFlagReview}
                onPublish={() => handlePublishReview(review.id)}
                onUnpublish={() => handleUnpublishReview(review.id)}
              />
            ))}


            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center pt-8 pb-12">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon icon="lucide:chevron-left" className="text-lg" />
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                        currentPage === page
                          ? 'bg-[#2563eb] text-white shadow-md'
                          : 'bg-[#f1f5f9] hover:bg-[#e2e8f0]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon icon="lucide:chevron-right" className="text-lg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {replyModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Reply to Review</h2>
                <button
                  onClick={() => setReplyModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f1f5f9] transition-colors"
                >
                  <Icon icon="lucide:x" className="text-lg" />
                </button>
              </div>
            </div>

            {/* Review Details */}
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src={selectedReview.avatar} 
                  alt={selectedReview.author} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-[#2563eb]">{selectedReview.rating}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          icon="lucide:star"
                          className={`w-4 h-4 ${
                            star <= Math.floor(parseFloat(selectedReview.rating))
                              ? 'text-orange-500 fill-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{selectedReview.title}</h3>
                  <p className="text-sm text-[#64748b] mb-3 leading-relaxed">{selectedReview.content}</p>
                  <div className="flex items-center gap-2 text-xs text-[#64748b]">
                    <span className="font-medium">{selectedReview.author}</span>
                    <span>•</span>
                    <span>{selectedReview.details}</span>
                  </div>
                </div>
              </div>

              {/* Reply Input Section */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-[#0f172a] mb-2 block">Your Reply</span>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your response to this review..."
                    className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none"
                    rows={6}
                  />
                </label>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setReplyModalOpen(false)}
                    className="px-6 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-xl hover:bg-[#f1f5f9] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl hover:bg-[#1d4ed8] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
