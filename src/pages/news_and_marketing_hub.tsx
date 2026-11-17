import React, { useState } from 'react';
import DailyMarketWrap from './DailyMarketWrap';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  layout?: 'market-wrap';
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'daily-market-wrap-13-nov-2026',
    title: 'Daily Market Wrap 13 November 2026',
    date: '16th November, 2026',
    category: 'Market Wrap',
    summary: 'On November 13, 2026, Indian equities closed lower, with the Nifty 50 dropping 0.61% to 25,144.30 and the BSE Sensex falling 0.39% to 81,592.45. Despite the market downturn, positive macroeconomic indicators emerged, including a 29.9% year-on-year surge in October exports to USD 89.99 billion and a narrowed trade deficit of USD 20.09 billion. Additionally, robust domestic gold demand persisted around festive buying. In commodity and currency markets, crude oil traded at USD 88.74 per barrel, gold stood at USD 3,876.43 per ounce, and the Indian rupee weakened slightly to 94.04 against the US dollar.',
    content: '',
    readTime: 'Full report',
    layout: 'market-wrap',
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

export default function NewsAndMarketingHub() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Header */}
        <div className="text-center max-w-[750px] mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full mb-3">
            News
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">
            News Updates
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Market notes and the daily wrap from MyAnmol.
          </p>
        </div>

        <div className="space-y-8 animate-fadeIn">
            {selectedNews ? (
              <div className={selectedNews.layout === 'market-wrap' ? 'space-y-4' : 'bg-white border border-[#E3E8F4] rounded-[24px] p-6 sm:p-10 shadow-sm space-y-6'}>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3B9F] bg-[#EEF2FB] px-4 py-2 rounded-[8px] hover:bg-[#dce5f8] transition-colors cursor-pointer border-0"
                >
                  ← Back to All News
                </button>
                {selectedNews.layout === 'market-wrap' ? (
                  <DailyMarketWrap />
                ) : (
                <>
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
                </>
                )}
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
                      <p className={`text-xs text-[#6B7280] leading-relaxed ${news.layout === 'market-wrap' ? '' : 'line-clamp-3'}`}>
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

      </div>
    </div>
  );
}