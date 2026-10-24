import React, { useState } from 'react';

interface MutualFundScheme {
  id: string;
  name: string;
  category: 'Equity - Flexi Cap' | 'Equity - Mid Cap' | 'Equity - Small Cap' | 'ELSS Tax Saver' | 'Debt & Arbitrage' | 'Hybrid / Balanced';
  risk: 'Very High Risk' | 'High Risk' | 'Moderate Risk' | 'Low Risk';
  aum: string;
  return1Yr: string;
  return3Yr: string;
  return5Yr: string;
  minSip: number;
  fundHouse: string;
  description: string;
}

const SCHEMES_DATA: MutualFundScheme[] = [
  {
    id: 'ppfas-flexi-cap',
    name: 'Parag Parikh Flexi Cap Fund - Direct Growth',
    category: 'Equity - Flexi Cap',
    risk: 'Very High Risk',
    aum: '₹68,450 Cr',
    return1Yr: '+22.4%',
    return3Yr: '+19.8%',
    return5Yr: '+21.5%',
    minSip: 1000,
    fundHouse: 'PPFAS Mutual Fund',
    description: 'Invests across large-cap, mid-cap, small-cap and international equities with a value-investing philosophy.'
  },
  {
    id: 'quant-small-cap',
    name: 'Quant Small Cap Fund - Direct Growth',
    category: 'Equity - Small Cap',
    risk: 'Very High Risk',
    aum: '₹24,120 Cr',
    return1Yr: '+31.8%',
    return3Yr: '+28.4%',
    return5Yr: '+29.2%',
    minSip: 1000,
    fundHouse: 'Quant Mutual Fund',
    description: 'Dynamic multi-asset valuation model driven by predictive analytics and high-momentum small-cap discovery.'
  },
  {
    id: 'hdfc-mid-cap-opp',
    name: 'HDFC Mid-Cap Opportunities Fund - Direct Growth',
    category: 'Equity - Mid Cap',
    risk: 'Very High Risk',
    aum: '₹62,100 Cr',
    return1Yr: '+26.5%',
    return3Yr: '+24.1%',
    return5Yr: '+22.0%',
    minSip: 1000,
    fundHouse: 'HDFC Mutual Fund',
    description: 'Focuses on identifying mid-sized companies with strong economic moats, scalable business models, and attractive valuations.'
  },
  {
    id: 'axis-elss-tax-saver',
    name: 'Axis ELSS Tax Saver Fund - Direct Growth',
    category: 'ELSS Tax Saver',
    risk: 'Very High Risk',
    aum: '₹34,800 Cr',
    return1Yr: '+18.2%',
    return3Yr: '+16.5%',
    return5Yr: '+17.9%',
    minSip: 500,
    fundHouse: 'Axis Mutual Fund',
    description: 'Tax-saving equity linked savings scheme with a statutory 3-year lock-in, investing in high-conviction growth businesses.'
  },
  {
    id: 'icici-prudential-bluechip',
    name: 'ICICI Prudential Bluechip Fund - Direct Growth',
    category: 'Equity - Flexi Cap',
    risk: 'Very High Risk',
    aum: '₹55,200 Cr',
    return1Yr: '+19.5%',
    return3Yr: '+17.2%',
    return5Yr: '+16.8%',
    minSip: 100,
    fundHouse: 'ICICI Prudential Mutual Fund',
    description: 'Large-cap oriented equity fund focused on market leaders across sectors with consistent compounding track records.'
  },
  {
    id: 'sbi-arbitrage-opportunities',
    name: 'SBI Arbitrage Opportunities Fund - Direct Growth',
    category: 'Debt & Arbitrage',
    risk: 'Low Risk',
    aum: '₹41,900 Cr',
    return1Yr: '+7.4%',
    return3Yr: '+6.9%',
    return5Yr: '+6.5%',
    minSip: 500,
    fundHouse: 'SBI Mutual Fund',
    description: 'Capitalizes on price differentials between cash and derivatives segments while maintaining equity taxation benefits.'
  }
];

export default function MutualFundsHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [investModalScheme, setInvestModalScheme] = useState<MutualFundScheme | null>(null);
  const [sipAmount, setSipAmount] = useState<number>(5000);
  const [successMsg, setSuccessMsg] = useState(false);

  const categories = ['All', 'Equity - Flexi Cap', 'Equity - Mid Cap', 'Equity - Small Cap', 'ELSS Tax Saver', 'Debt & Arbitrage'];

  const filteredSchemes = SCHEMES_DATA.filter((scheme) => {
    const matchesCat = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || scheme.fundHouse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartSip = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setInvestModalScheme(null);
    }, 2500);
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="text-center max-w-[750px] mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full">
            AMFI Registered Distributor (ARN: 114893)
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540]">
            Explore Mutual Fund Schemes
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Discover goal-mapped direct mutual fund schemes handpicked by expert wealth advisors. Invest systematically with zero hidden commissions.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#EEF2FB] border border-[#C5D3F2] p-4 rounded-[20px]">
          <input
            type="text"
            placeholder="Search by fund name or fund house..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[320px] bg-white border border-[#E3E8F4] rounded-[10px] px-4 h-11 text-xs font-semibold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
          />

          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-[8px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#1A3B9F] text-white border-[#1A3B9F] shadow-sm'
                    : 'bg-white text-[#374151] border-[#E3E8F4] hover:bg-[#EEF2FB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-[#E3E8F4] rounded-[24px] p-6 shadow-sm hover:border-[#1A3B9F] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#D97706] bg-[#FFFDF0] border border-[#FFE8A3] px-2.5 py-1 rounded-full">
                    {scheme.risk}
                  </span>
                </div>

                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] line-clamp-2 mt-2">
                  {scheme.name}
                </h3>

                <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                  {scheme.description}
                </p>
              </div>

              {/* Fund Metrics Box */}
              <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[16px] p-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[10px] text-[#6B7280] font-semibold">1Yr Return</div>
                  <div className="text-xs font-extrabold text-[#6AA32A] mt-0.5">{scheme.return1Yr}</div>
                </div>
                <div className="border-x border-[#E3E8F4]">
                  <div className="text-[10px] text-[#6B7280] font-semibold">3Yr Return</div>
                  <div className="text-xs font-extrabold text-[#1A3B9F] mt-0.5">{scheme.return3Yr}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#6B7280] font-semibold">AUM</div>
                  <div className="text-xs font-extrabold text-[#091540] mt-0.5">{scheme.aum}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3E8F4] flex justify-between items-center">
                <div className="text-xs text-[#6B7280]">
                  Min. SIP: <b className="text-[#1A3B9F]">₹{scheme.minSip.toLocaleString('en-IN')}</b>
                </div>
                <button
                  onClick={() => { setInvestModalScheme(scheme); setSipAmount(scheme.minSip); }}
                  className="h-10 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
                >
                  Invest SIP →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instant SIP Investment Modal */}
        {investModalScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden p-6 sm:p-8 border border-[#E3E8F4] space-y-6">
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                  Quick SIP Setup
                </span>
                <button
                  onClick={() => setInvestModalScheme(null)}
                  className="w-8 h-8 rounded-full bg-[#EEF2FB] text-[#6B7280] hover:text-[#111827] flex items-center justify-center cursor-pointer transition-colors border-0 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">
                  {investModalScheme.name}
                </h3>
                <p className="text-xs text-[#6B7280]">{investModalScheme.fundHouse}</p>
              </div>

              {successMsg ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-[#EFF8E2] text-[#6AA32A] rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                    ✓
                  </div>
                  <h4 className="font-[var(--fd)] text-lg font-bold text-[#091540]">SIP Order Initiated Successfully!</h4>
                  <p className="text-xs text-[#6B7280]">Our wealth desk will reach out to complete your BSE Star MF mandate setup.</p>
                </div>
              ) : (
                <form onSubmit={handleStartSip} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#374151] block">Monthly SIP Amount (₹)</label>
                    <input
                      type="number"
                      min={investModalScheme.minSip}
                      step="500"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full bg-[#EEF2FB] border border-[#E3E8F4] rounded-[8px] px-4 h-12 text-base font-extrabold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
                    />
                    <p className="text-[11px] text-[#6B7280]">Minimum SIP amount is ₹{investModalScheme.minSip.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[12px] p-4 text-xs text-[#856404] leading-relaxed">
                    <b>Note:</b> By initiating this SIP, you agree to AMFI guidelines and mandate verification through BSE Star MF. Zero distribution commissions.
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-sm hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
                  >
                    Confirm & Start SIP (₹{sipAmount.toLocaleString('en-IN')} / mo) →
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}