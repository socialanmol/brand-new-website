import React, { useState, useMemo } from "react";
import { Link } from "react-router";

interface CommodityItem {
  icon: string;
  name: string;
  cat: string;
  price: number;
}

const ALL_ITEMS: CommodityItem[] = [
  // Food & Drink
  { icon: "☕", name: "Café Coffee", cat: "food", price: 210 },
  { icon: "🍵", name: "Street Chai", cat: "food", price: 15 },
  { icon: "🥛", name: "Milk (1 L)", cat: "food", price: 50 },
  { icon: "🍳", name: "Eggs (dozen)", cat: "food", price: 90 },
  { icon: "🍚", name: "Basmati Rice (1 kg)", cat: "food", price: 68 },
  { icon: "🫙", name: "Cooking Oil (1 L)", cat: "food", price: 140 },
  { icon: "🍞", name: "Bread (loaf)", cat: "food", price: 48 },
  { icon: "🧅", name: "Onions (1 kg)", cat: "food", price: 36 },
  { icon: "🍅", name: "Tomatoes (1 kg)", cat: "food", price: 34 },
  { icon: "🍔", name: "QSR Burger", cat: "food", price: 220 },
  { icon: "🍕", name: "Pizza (medium)", cat: "food", price: 450 },
  { icon: "🥗", name: "Restaurant Meal (2)", cat: "food", price: 1500 },
  { icon: "🧃", name: "Packaged Juice (1 L)", cat: "food", price: 90 },
  { icon: "🍦", name: "Ice Cream Scoop", cat: "food", price: 80 },
  // Health
  { icon: "💊", name: "Paracetamol Strip", cat: "health", price: 25 },
  { icon: "🩺", name: "GP Consultation", cat: "health", price: 500 },
  { icon: "🔬", name: "Blood Test (basic)", cat: "health", price: 700 },
  { icon: "💉", name: "Flu Vaccine", cat: "health", price: 650 },
  { icon: "🦷", name: "Dental Cleaning", cat: "health", price: 1500 },
  { icon: "👓", name: "Eyeglasses Frame", cat: "health", price: 2000 },
  { icon: "🏥", name: "Day Surgery (avg)", cat: "health", price: 50000 },
  { icon: "🧴", name: "Sunscreen SPF50", cat: "health", price: 400 },
  { icon: "🩻", name: "X-Ray Scan", cat: "health", price: 500 },
  { icon: "🧬", name: "Health Insurance (yr)", cat: "health", price: 12000 },
  // Transport
  { icon: "🛵", name: "Auto Ride (5 km)", cat: "transport", price: 90 },
  { icon: "🚕", name: "Cab Ride (10 km)", cat: "transport", price: 220 },
  { icon: "🚌", name: "City Bus Pass (mo)", cat: "transport", price: 1250 },
  { icon: "🚇", name: "Metro Single Fare", cat: "transport", price: 50 },
  { icon: "✈️", name: "Flight BLR–DEL", cat: "transport", price: 5500 },
  { icon: "⛽", name: "Petrol (1 L)", cat: "transport", price: 103 },
  { icon: "🚙", name: "Car Service Basic", cat: "transport", price: 3500 },
  { icon: "🅿️", name: "Parking (per day)", cat: "transport", price: 100 },
  { icon: "🚂", name: "Train Ticket (2AC)", cat: "transport", price: 2200 },
  // Lifestyle
  { icon: "🎬", name: "Movie Ticket (PVR)", cat: "lifestyle", price: 400 },
  { icon: "🎮", name: "Video Game (new)", cat: "lifestyle", price: 4999 },
  { icon: "📱", name: "Mid-range Phone", cat: "lifestyle", price: 22000 },
  { icon: "✂️", name: "Salon Haircut", cat: "lifestyle", price: 400 },
  { icon: "👟", name: "Running Shoes", cat: "lifestyle", price: 4600 },
  { icon: "💅", name: "Manicure", cat: "lifestyle", price: 500 },
  { icon: "🎵", name: "Concert Ticket", cat: "lifestyle", price: 2500 },
  { icon: "🧘", name: "Gym Membership (mo)", cat: "lifestyle", price: 1600 },
  { icon: "📷", name: "DSLR Camera (entry)", cat: "lifestyle", price: 48000 },
  { icon: "🏖️", name: "Weekend Getaway", cat: "lifestyle", price: 9000 },
  // Education
  { icon: "📚", name: "College Textbook", cat: "education", price: 600 },
  { icon: "🎓", name: "Online Course", cat: "education", price: 5000 },
  { icon: "🏫", name: "School Fees (yr)", cat: "education", price: 90000 },
  { icon: "✏️", name: "Tuition (monthly)", cat: "education", price: 3000 },
  { icon: "💻", name: "Student Laptop", cat: "education", price: 48000 },
  { icon: "📝", name: "Stationery Kit", cat: "education", price: 300 },
  { icon: "🎨", name: "Art Supplies Kit", cat: "education", price: 900 },
  { icon: "🔭", name: "Science Kit", cat: "education", price: 2000 },
  // Household
  { icon: "🏠", name: "Rent 2BHK BLR (mo)", cat: "household", price: 28000 },
  { icon: "🛋️", name: "Sofa (mid-range)", cat: "household", price: 32000 },
  { icon: "🧹", name: "Maid (monthly)", cat: "household", price: 5000 },
  { icon: "🪣", name: "Water Can (20 L)", cat: "household", price: 50 },
  { icon: "🧺", name: "Washing Powder 1 kg", cat: "household", price: 130 },
  { icon: "🛁", name: "Plumber Visit", cat: "household", price: 500 },
  { icon: "🪴", name: "Room Painting", cat: "household", price: 10000 },
  { icon: "🔧", name: "Electrician Call", cat: "household", price: 400 },
  { icon: "🛏️", name: "Mattress (queen)", cat: "household", price: 20000 },
  // Utilities
  { icon: "⚡", name: "Electricity 200 u", cat: "utilities", price: 900 },
  { icon: "📡", name: "Broadband 100Mbps", cat: "utilities", price: 800 },
  { icon: "📺", name: "OTT Bundle (3 apps)", cat: "utilities", price: 700 },
  { icon: "📱", name: "Mobile Recharge", cat: "utilities", price: 299 },
  { icon: "🍿", name: "DTH Monthly", cat: "utilities", price: 400 },
  { icon: "🚿", name: "Water Bill (mo)", cat: "utilities", price: 200 },
  { icon: "🔥", name: "LPG Cylinder", cat: "utilities", price: 916 },
  { icon: "🌐", name: "Domain + Hosting", cat: "utilities", price: 5000 },
];

const HIST_DATA = [
  {
    id: "petrol",
    icon: "⛽",
    name: "Petrol (1L)",
    unit: "₹/litre",
    color: "#E04E2B",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [22, 34, 40, 50, 47, 72, 62, 68, 72, 100, 102, 103],
  },
  {
    id: "lpg",
    icon: "🔥",
    name: "LPG Cylinder",
    unit: "₹/14.2kg",
    color: "#D97706",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [155, 230, 295, 302, 345, 410, 568, 720, 700, 834, 903, 916],
  },
  {
    id: "milk",
    icon: "🥛",
    name: "Milk (1L)",
    unit: "₹/litre",
    color: "#2563EB",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [12, 14, 18, 22, 26, 36, 40, 44, 48, 50, 56, 50],
  },
  {
    id: "rice",
    icon: "🍚",
    name: "Rice (1kg)",
    unit: "₹/kg",
    color: "#059669",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [18, 20, 22, 28, 32, 45, 50, 55, 60, 62, 68, 68],
  },
  {
    id: "onion",
    icon: "🧅",
    name: "Onions (1kg)",
    unit: "₹/kg",
    color: "#7C3AED",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [8, 10, 10, 14, 20, 30, 18, 22, 80, 25, 40, 36],
  },
  {
    id: "gold",
    icon: "🥇",
    name: "Gold (10g)",
    unit: "₹/10g",
    color: "#CA8A04",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [4400, 5600, 7000, 12500, 18500, 29600, 26900, 29800, 35220, 46000, 58000, 86000],
  },
  {
    id: "rent",
    icon: "🏠",
    name: "2BHK Rent BLR",
    unit: "₹/month",
    color: "#1E3A8A",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [3000, 4000, 5000, 8000, 10000, 15000, 16000, 18000, 20000, 22000, 25000, 28000],
  },
  {
    id: "movie",
    icon: "🎬",
    name: "Movie Ticket",
    unit: "₹/ticket",
    color: "#BE185D",
    years: [2000, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 2019, 2021, 2023, 2026],
    prices: [30, 40, 50, 80, 100, 150, 180, 200, 250, 280, 350, 400],
  },
];

function fmtINR(n: number) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2).replace(/\.00$/, "") + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function BuildYourWealth() {
  // Calculator State
  const [principal, setPrincipal] = useState<number>(500000);
  const [monthly, setMonthly] = useState<number>(10000);
  const [growth, setGrowth] = useState<number>(12);
  const [inflation, setInflation] = useState<number>(6);
  const [years, setYears] = useState<number>(20);

  // Inflation Calculator State
  const [selectedCat, setSelectedCat] = useState<string>("food");
  const [selectedItemIdx, setSelectedItemIdx] = useState<number>(0);

  // Historical Chart State
  const [activeHistId, setActiveHistId] = useState<string>("petrol");

  // Projections
  const { nominalTotal, realTotal, deposited, profit, roi, realGrowth, chartPoints } =
    useMemo(() => {
      const P = principal || 0;
      const m = monthly || 0;
      const g = growth / 100;
      const inf = inflation / 100;
      const Y = years;

      let nom = P;
      let real = P;
      const points: { yr: number; nom: number; real: number; dep: number }[] = [];

      for (let yr = 0; yr <= Y; yr++) {
        points.push({
          yr,
          nom: Math.round(nom),
          real: Math.round(real),
          dep: Math.round(P + m * 12 * yr),
        });
        nom = nom * (1 + g) + m * 12;
        real = (real * (1 + g)) / (1 + inf) + (m * 12) / (1 + inf);
      }

      const finalNom = points[Y]?.nom || 0;
      const finalReal = points[Y]?.real || 0;
      const finalDep = P + m * 12 * Y;
      const finalProfit = finalNom - finalDep;
      const finalRoi = finalDep > 0 ? (finalProfit / finalDep) * 100 : 0;
      const finalRealGrowth = ((1 + g) / (1 + inf) - 1) * 100;

      return {
        nominalTotal: finalNom,
        realTotal: finalReal,
        deposited: finalDep,
        profit: finalProfit,
        roi: finalRoi,
        realGrowth: finalRealGrowth,
        chartPoints: points,
      };
    }, [principal, monthly, growth, inflation, years]);

  // Current Inflation Item Selection
  const categoryItems = useMemo(
    () => ALL_ITEMS.filter((i) => i.cat === selectedCat),
    [selectedCat]
  );
  const currentItem = categoryItems[selectedItemIdx] || categoryItems[0];
  const itemFuturePrice = currentItem
    ? Math.round(currentItem.price * Math.pow(1 + inflation / 100, years))
    : 0;
  const itemMultiplier = currentItem
    ? (itemFuturePrice / currentItem.price).toFixed(1)
    : "1.0";

  // Active Historical Data Item
  const activeHistItem =
    HIST_DATA.find((x) => x.id === activeHistId) || HIST_DATA[0];

  return (
    <div className="font-[var(--fs)] bg-[#F8FAFE] text-[#111827] antialiased min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">
              Financial Visualiser
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Wealth<span className="text-[#8DC63F]">Path</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto">
            See exactly how your money compounds over time — and how much inflation silently eats away at purchasing power.
          </p>
        </div>
      </section>

      {/* CALCULATOR & CHART GRID */}
      <section className="py-12 sm:py-16 max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
          {/* Controls Aside */}
          <aside className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
              <span className="w-8 h-8 rounded-lg bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-sm font-bold">
                ⚙️
              </span>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
                Your Parameters
              </h3>
            </div>

            {/* Principal */}
            <div className="mb-5">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#1A3B9F]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-[#111827] focus:bg-white focus:border-[#1A3B9F] focus:outline-none"
                />
              </div>
            </div>

            {/* Monthly */}
            <div className="mb-5">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                Monthly Contribution (SIP)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#1A3B9F]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-[#111827] focus:bg-white focus:border-[#1A3B9F] focus:outline-none"
                />
              </div>
            </div>

            {/* Annual Growth */}
            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Expected Return (CAGR)
                </label>
                <span className="font-[var(--fd)] text-lg font-bold text-[#1A3B9F]">
                  {growth}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1A3B9F]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Inflation Rate */}
            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Annual Inflation Rate
                </label>
                <span className="font-[var(--fd)] text-lg font-bold text-[#E04E2B]">
                  {inflation}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={inflation}
                onChange={(e) => setInflation(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E04E2B]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Time Horizon */}
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Time Horizon
                </label>
                <span className="font-[var(--fd)] text-lg font-bold text-[#8DC63F]">
                  {years} yrs
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8DC63F]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1 yr</span>
                <span>50 yrs</span>
              </div>
            </div>

            <Link
              to="/wp/review"
              className="w-full py-3 px-4 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm rounded-xl text-center block transition-all shadow-md"
            >
              Get a Personal Wealth Plan →
            </Link>
          </aside>

          {/* Results Display */}
          <div>
            {/* 3 Major KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 text-center shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-2">
                  Final Nominal Balance
                </span>
                <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#091540]">
                  {fmtINR(nominalTotal)}
                </span>
              </div>

              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 text-center shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-2">
                  Real Purchasing Power
                </span>
                <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#1A4A2A]">
                  {fmtINR(realTotal)}
                </span>
              </div>

              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 text-center shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-2">
                  Inflation Erosion Loss
                </span>
                <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#E04E2B]">
                  {fmtINR(nominalTotal - realTotal)}
                </span>
              </div>
            </div>

            {/* Projection Chart Container */}
            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-3xl p-6 sm:p-7 shadow-sm mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-sm font-bold">
                    📈
                  </span>
                  <span className="font-[var(--fd)] text-base font-bold text-[#091540]">
                    Wealth Accumulation Projection
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A3B9F]" /> Nominal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8DC63F]" /> Real Value
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> Deposited
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="h-64 sm:h-72 w-full pt-4">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                >
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Nominal Line Path */}
                  <polyline
                    fill="none"
                    stroke="#1A3B9F"
                    strokeWidth="3"
                    points={chartPoints
                      .map((p, i) => {
                        const x = (i / years) * 500;
                        const y = 200 - (p.nom / (nominalTotal * 1.05 || 1)) * 180;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {/* Real Value Line Path */}
                  <polyline
                    fill="none"
                    stroke="#8DC63F"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    points={chartPoints
                      .map((p, i) => {
                        const x = (i / years) * 500;
                        const y = 200 - (p.real / (nominalTotal * 1.05 || 1)) * 180;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {/* Deposited Path */}
                  <polyline
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    points={chartPoints
                      .map((p, i) => {
                        const x = (i / years) * 500;
                        const y = 200 - (p.dep / (nominalTotal * 1.05 || 1)) * 180;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                </svg>
              </div>
            </div>

            {/* 4 Insight Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Total Principal Deposited
                </span>
                <span className="font-[var(--fd)] text-2xl font-bold text-[#091540] block mb-1">
                  {fmtINR(deposited)}
                </span>
                <span className="text-xs text-gray-500 font-light">
                  Starting lump sum + all monthly deposits
                </span>
              </div>

              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Total Compounded Gains
                </span>
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F] block mb-1">
                  {fmtINR(profit)}
                </span>
                <span className="text-xs text-gray-500 font-light">
                  Net profit accrued above capital invested
                </span>
              </div>

              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Return on Investment (ROI)
                </span>
                <span className="font-[var(--fd)] text-2xl font-bold text-[#091540] block mb-1">
                  {roi.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500 font-light">
                  Total percentage gain over {years} years
                </span>
              </div>

              <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#6B7280] block mb-1">
                  Real CAGR (Post-Inflation)
                </span>
                <span className="font-[var(--fd)] text-2xl font-bold text-[#1A3B9F] block mb-1">
                  {realGrowth.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500 font-light">
                  Real compounding rate beating {inflation}% inflation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SILENT TAX SECTION */}
      <section className="py-14 sm:py-20 bg-white border-t border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#E04E2B]">
              The Silent Tax
            </span>
            <div className="flex-1 h-px bg-[rgba(224,78,43,0.15)]" />
          </div>

          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-3">
            How Inflation Eats Your Wallet
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed mb-8">
            Select a lifestyle category and an item to see how much more it will cost in {years} years at {inflation}% annual inflation.
          </p>

          {/* Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                1. Choose a Category
              </label>
              <select
                value={selectedCat}
                onChange={(e) => {
                  setSelectedCat(e.target.value);
                  setSelectedItemIdx(0);
                }}
                className="w-full px-4 py-3 bg-[#F8FAFE] border border-gray-200 rounded-xl text-sm font-semibold text-[#091540] focus:border-[#1A3B9F] focus:outline-none"
              >
                <option value="food">🍽️ Food & Drink</option>
                <option value="health">💊 Health & Medical</option>
                <option value="transport">🚗 Transport & Commute</option>
                <option value="lifestyle">🎬 Lifestyle & Electronics</option>
                <option value="education">📚 Education</option>
                <option value="household">🏠 Household & Utilities</option>
                <option value="utilities">⚡ Energy & Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                2. Choose an Item
              </label>
              <select
                value={selectedItemIdx}
                onChange={(e) => setSelectedItemIdx(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#F8FAFE] border border-gray-200 rounded-xl text-sm font-semibold text-[#091540] focus:border-[#1A3B9F] focus:outline-none"
              >
                {categoryItems.map((it, idx) => (
                  <option key={it.name} value={idx}>
                    {it.icon} {it.name} (Current: ₹{it.price.toLocaleString("en-IN")})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Highlight Card */}
          {currentItem && (
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 text-center shadow-sm">
              <div className="text-4xl mb-2">{currentItem.icon}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-6">
                {currentItem.name}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Today's Benchmark (2026)
                  </span>
                  <span className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
                    ₹{currentItem.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <span className="text-2xl text-[#1A3B9F] hidden sm:block">→</span>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E04E2B] block mb-1">
                    Cost in {years} Years ({inflation}%/yr)
                  </span>
                  <span className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold text-[#E04E2B]">
                    ₹{itemFuturePrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <span className="inline-block bg-[#FEE2E2] text-[#E04E2B] text-xs font-bold px-4 py-1.5 rounded-full">
                {itemMultiplier}× costlier in {years} years
              </span>

              <p className="text-xs text-gray-400 mt-6 font-light">
                Prices benchmarked for Bangalore, India. Compounded at {inflation}% annual inflation rate over your custom horizon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* HISTORICAL COMMODITY PERSPECTIVE */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-t border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F]">
              Historical Perspective
            </span>
            <div className="flex-1 h-px bg-[rgba(26,59,159,0.12)]" />
          </div>

          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-2">
            How Prices Have Already Risen in India
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed mb-8">
            Real historical price points across key commodities from 2000 to 2026 — the inflation you have already lived through.
          </p>

          {/* Item Selector Pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {HIST_DATA.map((d) => {
              const isActive = d.id === activeHistId;
              const mult = (d.prices[d.prices.length - 1] / d.prices[0]).toFixed(1);
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveHistId(d.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-white border-[#1A3B9F] shadow-md ring-2 ring-[#1A3B9F]/10"
                      : "bg-white/60 border-gray-200 hover:bg-white"
                  }`}
                >
                  <span className="text-xl">{d.icon}</span>
                  <div>
                    <span className="block text-xs font-bold text-[#091540]">
                      {d.name}
                    </span>
                    <span className="block text-[10px] font-semibold text-[#E04E2B]">
                      {mult}× since 2000
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Historical Chart */}
          <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
                {activeHistItem.name} — Historical Price Trajectory
              </h3>
              <span className="text-xs font-semibold text-[#1A3B9F]">
                {activeHistItem.unit}
              </span>
            </div>

            <div className="h-60 w-full pt-4">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 500 160"
                preserveAspectRatio="none"
              >
                {/* Horizontal lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="160" x2="500" y2="160" stroke="#e2e8f0" strokeWidth="1" />

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke={activeHistItem.color}
                  strokeWidth="3"
                  points={activeHistItem.prices
                    .map((val, i) => {
                      const maxVal = Math.max(...activeHistItem.prices);
                      const x = (i / (activeHistItem.prices.length - 1)) * 500;
                      const y = 160 - (val / (maxVal * 1.1)) * 140;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              </svg>
            </div>
          </div>

          {/* Then & Now Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIST_DATA.map((d) => {
              const oldPrice = d.prices[0];
              const newPrice = d.prices[d.prices.length - 1];
              const mult = (newPrice / oldPrice).toFixed(1);
              const yrs = d.years[d.years.length - 1] - d.years[0];
              const cagr = ((Math.pow(newPrice / oldPrice, 1 / yrs) - 1) * 100).toFixed(1);

              return (
                <div
                  key={d.id}
                  className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{d.icon}</span>
                    <span className="text-xs font-bold text-[#091540]">{d.name}</span>
                  </div>

                  <div className="flex justify-between items-baseline mb-4 text-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5">
                        2000
                      </span>
                      <span className="font-bold text-sm text-gray-700">
                        ₹{oldPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-gray-300 text-xs">→</span>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#E04E2B] block mb-0.5">
                        2026
                      </span>
                      <span className="font-bold text-sm text-[#E04E2B]">
                        ₹{newPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-500">
                    <span className="text-[#E04E2B] font-bold">{mult}× rise</span> · CAGR:{" "}
                    {cagr}%/yr
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-xs text-gray-400 leading-relaxed font-light">
            Sources: Petroleum Planning & Analysis Cell (PPAC), Amul / Nandini public dairy data, Indian Oil LPG records, RBI CPI historical series, MCX gold rates. Illustrative national averages.
          </p>
        </div>
      </section>
    </div>
  );
}