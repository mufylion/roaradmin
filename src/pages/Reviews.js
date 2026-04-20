import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import UniversalTable from '../components/UniversalTable';
import { useAppConfig } from '../config/useAppConfig';


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
const ReviewCard = ({ title, content, rating, author, avatar, details }) => (
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
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <span className="font-medium">{author}</span>
          <span>•</span>
          <span>{details}</span>
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
  
  const filters = ['Positive', 'Neutral', 'Negative', 'All'];

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
                <span className="text-5xl font-black tracking-tighter font-heading">4.96</span>
              </div>
              <p className="text-sm text-[#64748b] font-medium">Avg. score based on 235 reviews</p>
            </div>

            <div className="space-y-6">
              <RatingBar
                label="Positive"
                sublabel="4 stars and above"
                percentage="80%"
                colorClass="bg-[#10b981]"
              />
              <RatingBar
                label="Neutral"
                sublabel="3 stars"
                percentage="15%"
                colorClass="bg-orange-400"
              />
              <RatingBar
                label="Negative"
                sublabel="Under 2 stars"
                percentage="5%"
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

            <ReviewCard
              title="Charming and comfortable house"
              content="Reviews on peer-to-peer sites can happen organically, often removing the company from the review process entirely. (This can be a nightmare if you’re managing a small business, since one bad review can have a huge impact, but this also makes the reviews seem more authentic.)"
              rating="4.91"
              author="Jushawn McDowell"
              avatar="https://randomuser.me/api/portraits/men/42.jpg"
              details="Jun 03-10, 2020 • Modern Loft NYC"
            />

            <ReviewCard
              title="Hideaway tent with pool and tub"
              content="You might be on multiple social platforms, so how can you keep track of all these messages? If you’re providing omnichannel customer service, you might already be using a tool that can consolidate all your customer conversations and communication channels into one handy dashboard."
              rating="4.8"
              author="Joana Leite"
              avatar="https://randomuser.me/api/portraits/women/65.jpg"
              details="Jun 03-10, 2020 • Seaside Villa Malibu"
            />

            <ReviewCard
              title="Charming and comfortable house"
              content="We list customer quotes as the easiest type of review to get because they involve very little effort for you and your customer. Because you’re in control of adding them to your website, all you need to do is ask your customers to share their experience in an email, in person, or over the phone."
              rating="4.96"
              author="Alexa Tenorio"
              avatar="https://randomuser.me/api/portraits/women/12.jpg"
              details="Jun 03-10, 2020 • Mountain Escape"
            />

            {/* Pagination */}
            <div className="flex items-center justify-center pt-8 pb-12">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#2563eb] text-white font-bold shadow-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] font-bold transition-all">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] font-bold transition-all">3</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] font-bold transition-all">4</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] font-bold transition-all">5</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all">
                  <Icon icon="lucide:arrow-right" className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
