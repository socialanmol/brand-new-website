import React, { useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
}

interface SocialPost {
  platform: 'Instagram' | 'X / Twitter' | 'Meta (FB/IG)' | 'LinkedIn';
  format: 'Reels / Carousel' | 'Thread / Post' | 'Ad Creative' | 'Thought Leadership';
  headline: string;
  caption: string;
  hashtags: string[];
  visualPrompt: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'sebi-mf-review-2026',
    title: 'SEBI Streamlines Mutual Fund Regulations & Indexation Norms for 2026',
    date: 'October 18, 2026',
    category: 'Regulatory Update',
    summary: 'Key amendments regarding mutual fund expense ratios, indexation benefits, and enhanced transparency mandates for AMFI registered distributors.',
    content: 'The Securities and Exchange Board of India (SEBI) has released a comprehensive review of mutual fund distribution frameworks. As an AMFI-registered distributor (ARN: 114893), MyAnmol is fully aligned with these enhancements. Key highlights include transparent disclosure of total expense ratios (TER), simplified digital onboarding protocols, and updated capital gains tax indexation rules. Investors are advised to consult their wealth advisors for portfolio rebalancing.',
    readTime: '4 min read'
  },
  {
    id: 'nri-gift-city-growth',
    title: 'NRI Wealth Inflows Surge in GIFT City USD-Denominated Funds',
    date: 'October 10, 2026',
    category: 'Global Wealth',
    summary: 'Non-Resident Indians increasingly leverage GIFT City structures for tax-efficient investments and global diversification.',
    content: 'Global private banking desks note a significant uptick in NRI capital repatriation through NRE/NRO channels into GIFT City vehicles. With favorable Double Taxation Avoidance Agreements (DTAA) and dollar-denominated fund options, our dedicated NRI wealth desk at MyAnmol has recorded a 45% YoY growth in cross-border advisory sessions.',
    readTime: '3 min read'
  },
  {
    id: 'sip-discipline-milestone',
    title: 'Indian Retail Investors Cross ₹25,000 Crore Monthly SIP Milestone',
    date: 'September 28, 2026',
    category: 'Market Insights',
    summary: 'Systematic Investment Plans continue to anchor domestic equity stability despite global macroeconomic headwinds.',
    content: 'Retail participation in Indian capital markets reached a historic high this month. AMFI data reveals monthly SIP contributions surpassing ₹25,000 crores. Experts attribute this structural shift to disciplined compounding awareness and goal-based financial planning popularized by digital advisory platforms like MyAnmol.',
    readTime: '5 min read'
  }
];

const SOCIAL_POSTS: SocialPost[] = [
  {
    platform: 'Instagram',
    format: 'Reels / Carousel',
    headline: 'POV: You started a ₹10,000 SIP in your 20s vs. 30s 📈',
    caption: 'Time is your ultimate financial superpower. Waiting just 10 years to start your compounding journey could cost you over ₹1.5 Crores in final wealth! Swipe left to see the math ➡️ Don’t wait for the "right time." Start your goal-mapped SIP today with MyAnmol.',
    hashtags: ['#SIP', '#MutualFunds', '#CompoundInterest', '#WealthBuilding', '#MyAnmol', '#FinancialFreedom'],
    visualPrompt: 'Clean split-screen infographic: Age 25 vs Age 35 compounding curve with striking contrast neon green accents on dark navy background.'
  },
  {
    platform: 'X / Twitter',
    format: 'Thread / Post',
    headline: 'The 3 Golden Rules of Family Wealth That 90% of People Ignore 🧵',
    caption: '1/3 Emergency Funds First. Never invest your last rupee into equities without a 6-month cash cushion.\n\n2/3 Separate Insurance & Investment. Term insurance protects your family; mutual funds grow your wealth. Never mix the two!\n\n3/3 Automate Your SIP. Emotion is the enemy of alpha.',
    hashtags: ['#PersonalFinance', '#Investing101', '#WealthManagement', '#AMFI'],
    visualPrompt: 'Minimalist typography card highlighting Rule #2: "Term Insurance is Shield. Mutual Funds are Sword."'
  },
  {
    platform: 'Meta (FB/IG)',
    format: 'Ad Creative',
    headline: 'Stop letting inflation eat your hard-earned savings! 💸',
    caption: 'At 6% inflation, ₹50 Lakhs today will feel like just ₹23 Lakhs in 12 years. Protect your purchasing power with goal-based asset allocation and expert guidance from AMFI-registered advisors at MyAnmol. Book your FREE 1-on-1 advisory session today!',
    hashtags: ['#RetirementPlanning', '#InflationProtection', '#SmartInvesting', '#MyAnmolWealth'],
    visualPrompt: 'Video ad showing shrinking cash pile transforming into a growing compounding bar chart with professional Indian family in background.'
  },
  {
    platform: 'LinkedIn',
    format: 'Thought Leadership',
    headline: 'Why "Product-First" Advisory is Failing Indian Investors 👔',
    caption: 'Too many financial platforms push the fund of the month based on commissions. True wealth creation requires a "Plan-First" architecture. Here is how we build goal-mapped portfolios for 3,000+ families at MyAnmol (ARN: 114893). Read our latest insight.',
    hashtags: ['#WealthManagement', '#Fintech', '#FinancialAdvisory', '#Leadership', '#MyAnmol'],
    visualPrompt: 'Professional corporate carousel deck detailing Plan-First vs Product-First advisory frameworks.'
  }
];

export default function NewsAndMarketingHub() {
  const [activeTab, setActiveTab] = useState<'news' | 'marketing'>('news');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Header */}
        <div className="text-center max-w-[750px] mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full mb-3">
            MyAnmol Media & Growth Hub
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">
            News Updates & Marketing Suite
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Access official regulatory announcements, market insights, and read-to-publish social media campaigns for Instagram, X, Meta, and LinkedIn.
          </p>
        </div>

        {/* Main Hub Tabs */}
        <div className="flex justify-center border-b border-[#E3E8F4] mb-10 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('news'); setSelectedNews(null); }}
            className={`py-3.5 px-8 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'news'
                ? 'border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/60 rounded-t-[8px]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            📰 News & Market Updates
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`py-3.5 px-8 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'marketing'
                ? 'border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/60 rounded-t-[8px]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            🚀 Social Media & Marketing Content
          </button>
        </div>

        {/* TAB 1: NEWS & UPDATES */}
        {activeTab === 'news' && (
          <div className="space-y-8 animate-fadeIn">
            {selectedNews ? (
              <div className="bg-white border border-[#E3E8F4] rounded-[24px] p-6 sm:p-10 shadow-sm space-y-6">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3B9F] bg-[#EEF2FB] px-4 py-2 rounded-[8px] hover:bg-[#dce5f8] transition-colors cursor-pointer border-0"
                >
                  ← Back to All News
                </button>
                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                    {selectedNews.category}
                  </span>
                  <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] mt-2">
                    {selectedNews.title}
                  </h2>
                  <div className="text-xs text-[#6B7280] flex items-center gap-4 pt-1">
                    <span>📅 {selectedNews.date}</span>
                    <span>⏱️ {selectedNews.readTime}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E3E8F4] text-sm sm:text-base text-[#374151] leading-relaxed space-y-4">
                  <p className="font-semibold text-[#1A3B9F] bg-[#EEF2FB]/50 p-4 rounded-[12px] border border-[#C5D3F2]">
                    {selectedNews.summary}
                  </p>
                  <p>{selectedNews.content}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NEWS_DATA.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => setSelectedNews(news)}
                    className="bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-4 shadow-sm hover:border-[#1A3B9F] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-2.5 py-1 rounded-full">
                          {news.category}
                        </span>
                        <span className="text-[11px] text-[#6B7280]">{news.date}</span>
                      </div>
                      <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] line-clamp-3 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#E3E8F4] flex justify-between items-center text-xs font-bold text-[#1A3B9F]">
                      <span>{news.readTime}</span>
                      <span>Read Article →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SOCIAL MEDIA & MARKETING LANDING PAGE */}
        {activeTab === 'marketing' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[20px] p-6 sm:p-8 flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Ready-to-Use Marketing & Social Media Suite</h3>
                <p className="text-xs sm:text-sm text-[#374151] mt-1">
                  Copy captions, hashtags, and visual prompts instantly for Instagram, X (Twitter), Meta Ads, and LinkedIn.
                </p>
              </div>
              <span className="bg-[#1A3B9F] text-white text-xs font-extrabold px-4 py-2 rounded-[8px] shadow-sm">
                4 Channels Active
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {SOCIAL_POSTS.map((post, idx) => (
                <div key={idx} className="bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-5 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-3 py-1 rounded-full">
                        {post.platform}
                      </span>
                      <span className="text-xs font-semibold text-[#6B7280] bg-[#F8FAFE] px-2.5 py-1 rounded border border-[#E3E8F4]">
                        {post.format}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Headline / Hook</div>
                      <h4 className="font-[var(--fd)] text-lg font-bold text-[#091540]">{post.headline}</h4>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Caption / Copy</div>
                      <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[12px] p-4 text-xs sm:text-sm text-[#374151] whitespace-pre-line leading-relaxed font-mono">
                        {post.caption}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Hashtags</div>
                      <div className="flex flex-wrap gap-1.5">
                        {post.hashtags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[11px] font-semibold text-[#1A3B9F] bg-[#EEF2FB] px-2.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[12px] p-3.5 text-xs text-[#856404]">
                      <b>🎨 Visual / Creative Prompt:</b> {post.visualPrompt}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E3E8F4] flex justify-end">
                    <button
                      onClick={() => handleCopy(`${post.headline}\n\n${post.caption}\n\n${post.hashtags.join(' ')}`, idx)}
                      className="h-10 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0 flex items-center gap-2"
                    >
                      {copiedIndex === idx ? '✓ Copied to Clipboard!' : '📋 Copy Full Post'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}