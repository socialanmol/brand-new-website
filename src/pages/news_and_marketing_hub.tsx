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
  edition?: '13-nov' | '16-nov' | '17-nov' | '18-nov';
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'daily-market-wrap-18-nov-2026',
    title: 'Daily Market Wrap 18 November 2026',
    date: '18th November, 2026',
    category: 'Market Wrap',
    summary: 'On November 18, 2026, Indian equities closed lower, with the Nifty 50 dropping 0.63% to 25,227.95 and the BSE Sensex declining 0.61% to 82,031.81. Market sentiment was supported by positive institutional highlights, including Goldman Sachs upgrading India to an "overweight" rating with a December 2027 Nifty target of 28,500, alongside foreign portfolio investors smashing a monthly record with a ₹99,000 crore purchase in Indian stocks. Corporate highlights featured SpiceJet\'s board approving a fundraise of up to ₹5,500 crore—sending its shares to the upper circuit—and Acme Solar signing a 150 MW hybrid power project with NTPC across three states. Additionally, crude oil traded at $86.01 per barrel, gold stood at $3,849.49 per ounce, and the USD/INR exchange rate stood at 93.46.',
    content: '',
    readTime: 'Full report',
    layout: 'market-wrap',
    edition: '18-nov',
  },
  {
    id: 'daily-market-wrap-17-nov-2026',
    title: 'Daily Market Wrap 17 November 2026',
    date: '18th November, 2026',
    category: 'Market Wrap',
    summary: 'On November 17, 2026, Indian equities closed higher, with the Nifty 50 gaining 0.38% to 25,387.40 and the Sensex advancing 0.52% to 82,532.19. Market commentary highlighted strong corporate earnings with Nifty 50 firms posting 19–27% net profit growth in Q2 FY25, alongside banking recoveries led by rebounds in HDFC Bank and Axis Bank. Key policy and economic themes included industry wishlist priorities for Budget 2027—such as LTCG tax relief and manufacturing support—SEBI exploring limits on leveraged stock bets, and domestic steel producers facing headwinds from a surge in Chinese imports. Meanwhile, crude oil traded at $85.72 per barrel, gold stood at $3,856.68 per ounce, and the Indian Rupee strengthened to 93.91 per USD.',
    content: '',
    readTime: 'Full report',
    layout: 'market-wrap',
    edition: '17-nov',
  },
  {
    id: 'daily-market-wrap-16-nov-2026',
    title: 'Daily Market Wrap 16 November 2026',
    date: '17th November, 2026',
    category: 'Market Wrap',
    summary: 'On November 16, 2026, Indian markets finished higher, with the Nifty 50 rising 0.58% to 25,291.10 and the Sensex gaining 0.63% to 82,104.79. Macroeconomic pressures persist as headline retail inflation hit a two-year high of 6.09%, fueling expectations of a December rate hike by the RBI. On the corporate front, Mahanadi Coalfields announced an INR 9,000 crore IPO opening on November 19, alongside positive quarterly results from J. Kumar Infraprojects and Belrise Industries. Meanwhile, India inaugurated a new 80,000-tonne LPG storage facility in Mangaluru to enhance strategic energy reserves, while crude oil traded around $88.56 per barrel and gold stood near $3,881.75 per ounce.',
    content: '',
    readTime: 'Full report',
    layout: 'market-wrap',
    edition: '16-nov',
  },
  {
    id: 'daily-market-wrap-13-nov-2026',
    title: 'Daily Market Wrap 13 November 2026',
    date: '16th November, 2026',
    category: 'Market Wrap',
    summary: 'On November 13, 2026, Indian equities closed lower, with the Nifty 50 dropping 0.61% to 25,144.30 and the BSE Sensex falling 0.39% to 81,592.45. Despite the market downturn, positive macroeconomic indicators emerged, including a 29.9% year-on-year surge in October exports to USD 89.99 billion and a narrowed trade deficit of USD 20.09 billion. Additionally, robust domestic gold demand persisted around festive buying. In commodity and currency markets, crude oil traded at USD 88.74 per barrel, gold stood at USD 3,876.43 per ounce, and the Indian rupee weakened slightly to 94.04 against the US dollar.',
    content: '',
    readTime: 'Full report',
    layout: 'market-wrap',
    edition: '13-nov',
  },
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
                  <DailyMarketWrap key={selectedNews.id} edition={selectedNews.edition ?? '13-nov'} />
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