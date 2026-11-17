export type MarketWrapEdition = "13-nov" | "16-nov";

export interface QuoteRow {
  name: string;
  level: string;
  today: string;
  mtd: string;
  y1: string;
}

export interface CommodityItem {
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface MacroItem {
  indicator: string;
  frequency: string;
  period: string;
  value: string;
  unit: string;
}

export interface LevelCard {
  title: string;
  level: string;
  d1: string;
  y1: string;
  pos: boolean;
}

export interface SectorBar {
  name: string;
  val: number;
}

export interface WrapNote {
  title: string;
  body: string;
}

export interface WrapContent {
  dateLabel: string;
  updatedLabel: string;
  commentary: string;
  notes: WrapNote[];
  lossScale: number;
  indicesLargeCap: QuoteRow[];
  indicesBroad: QuoteRow[];
  indicesMidSmall: QuoteRow[];
  worldMarkets: QuoteRow[];
  bestSectors: SectorBar[];
  worstSectors: SectorBar[];
  bseSectorsList: QuoteRow[];
  commodities: CommodityItem[];
  levelCards: LevelCard[];
}

export const MACRO_DATA: MacroItem[] = [
  { indicator: "Inflation Rate", frequency: "Monthly", period: "Oct-2026", value: "6.09", unit: "percent" },
  { indicator: "Interest Rate", frequency: "Daily", period: "07-Oct-2026", value: "5.50", unit: "percent" },
  { indicator: "Unemployment Rate", frequency: "Monthly", period: "Sep-2026", value: "5.00", unit: "percent" },
  { indicator: "GDP", frequency: "Yearly", period: "2025", value: "3,956.07", unit: "USD Billion" },
  { indicator: "GDP Annual Growth Rate", frequency: "Quarterly", period: "Jun-2026", value: "7.80", unit: "percent" },
  { indicator: "Government Debt to GDP", frequency: "Yearly", period: "2025", value: "81.85", unit: "percent of GDP" },
  { indicator: "Government Spending", frequency: "Quarterly", period: "Jun-2026", value: "8,548.77", unit: "INR Billion" },
  { indicator: "Current Account to GDP", frequency: "Yearly", period: "2025", value: "-0.60", unit: "percent of GDP" },
  { indicator: "Consumer Price Index (CPI)", frequency: "Monthly", period: "Oct-2026", value: "110.05", unit: "points" },
];

export const MARKET_WRAPS: Record<MarketWrapEdition, WrapContent> = {
  "13-nov": {
    dateLabel: "13 November 2026",
    updatedLabel: "Updated 13 Nov, 3:36 PM",
    commentary:
      "Nifty 50 fell 0.61% to 25,144.30 while Sensex dropped 0.39% to 81,592.45; crude oil slipped 0.34% to USD 88.44/barrel, gold rose 0.39% to USD 3,900.50/oz, and INR weakened 0.22% to INR 94.25 per dollar.",
    notes: [
      { title: "Export Momentum", body: "India's October exports surged 29.9% year-on-year to USD 89.99 billion." },
      { title: "Auto Sector Growth", body: "Passenger vehicle dispatches hit record 5.19 lakh units in October 2024." },
      { title: "Gold Demand", body: "Domestic gold prices around INR 137,000 per 10 grams amid festive buying." },
      { title: "Trade Balance", body: "India's trade deficit narrowed to USD 20.09 billion from USD 25.15 billion." },
    ],
    lossScale: 18,
    indicesLargeCap: [
      { name: "Nifty 50", level: "25,144.30", today: "-0.61%", mtd: "+9.07%", y1: "-2.84%" },
      { name: "BSE Sensex", level: "81,592.45", today: "-0.39%", mtd: "+9.58%", y1: "-3.42%" },
    ],
    indicesBroad: [
      { name: "BSE 500", level: "37,160.37", today: "-0.46%", mtd: "+8.50%", y1: "-0.52%" },
      { name: "Nifty 500", level: "23,734.20", today: "-0.55%", mtd: "+8.40%", y1: "-0.34%" },
    ],
    indicesMidSmall: [
      { name: "Nifty Next 50", level: "72,874.70", today: "-0.83%", mtd: "+7.63%", y1: "+4.33%" },
      { name: "Nifty Midcap 100", level: "61,889.50", today: "-0.24%", mtd: "+8.01%", y1: "+1.97%" },
      { name: "Nifty Smallcap 100", level: "19,656.45", today: "-0.26%", mtd: "+6.46%", y1: "+8.10%" },
    ],
    worldMarkets: [
      { name: "Dow Jones", level: "52,297.09", today: "-0.36%", mtd: "+1.02%", y1: "+8.38%" },
      { name: "S&P 500", level: "7,592.40", today: "-0.35%", mtd: "+0.16%", y1: "+10.82%" },
      { name: "Nasdaq", level: "25,366.09", today: "-0.39%", mtd: "-0.28%", y1: "+8.37%" },
      { name: "FTSE 100", level: "10,863.09", today: "+0.25%", mtd: "+1.24%", y1: "+9.60%" },
      { name: "CAC 40", level: "8,361.36", today: "+0.34%", mtd: "+4.92%", y1: "+1.46%" },
      { name: "DAX", level: "26,771.88", today: "+0.41%", mtd: "+3.69%", y1: "+9.80%" },
      { name: "Nikkei", level: "61,712.84", today: "+0.74%", mtd: "-2.49%", y1: "+20.61%" },
      { name: "Hang Seng", level: "24,008.55", today: "-1.26%", mtd: "+3.07%", y1: "-11.01%" },
      { name: "CBOE VIX", level: "18.70", today: "+6.92%", mtd: "-3.71%", y1: "+6.80%" },
    ],
    bestSectors: [
      { name: "IPO", val: 22.4 },
      { name: "TELECOM", val: 19.8 },
      { name: "HEALTHCARE", val: 18.7 },
      { name: "METAL", val: 15.4 },
      { name: "REIT & INVIT", val: 14.9 },
      { name: "SME IPO", val: 12.7 },
      { name: "POWER", val: 7.5 },
      { name: "BANKEX", val: 5.1 },
      { name: "SERVICES", val: 5.1 },
      { name: "INDUSTRIALS", val: 4.9 },
    ],
    worstSectors: [
      { name: "IT", val: -15.6 },
      { name: "FMCG", val: -13.2 },
      { name: "TECK", val: -9.5 },
      { name: "OIL & GAS", val: -8.8 },
      { name: "ENERGY", val: -6.4 },
      { name: "HOUSING", val: -5.5 },
      { name: "CPSE", val: -4.2 },
      { name: "INFRASTRUCTURE", val: -3.6 },
      { name: "REALTY", val: -1.9 },
      { name: "POWER & ENERGY", val: -1.6 },
    ],
    bseSectorsList: [
      { name: "IPO", level: "19,535.27", today: "+1.45%", mtd: "+9.42%", y1: "+22.44%" },
      { name: "Telecom", level: "3,761.21", today: "+0.28%", mtd: "+2.36%", y1: "+19.76%" },
      { name: "Healthcare", level: "52,884.38", today: "-0.24%", mtd: "+5.41%", y1: "+18.70%" },
      { name: "Metal", level: "40,457.16", today: "-0.93%", mtd: "+7.13%", y1: "+15.39%" },
      { name: "REIT & InvIT", level: "152.45", today: "-0.41%", mtd: "+1.14%", y1: "+14.88%" },
      { name: "SME IPO", level: "1,17,808.56", today: "+0.12%", mtd: "+4.65%", y1: "+12.65%" },
      { name: "Power", level: "7,211.51", today: "+0.33%", mtd: "+4.94%", y1: "+7.46%" },
      { name: "Bankex", level: "68,809.34", today: "-0.64%", mtd: "+12.04%", y1: "+5.14%" },
      { name: "Services", level: "1,713.62", today: "+0.45%", mtd: "+8.61%", y1: "+5.11%" },
      { name: "Industrials", level: "15,889.00", today: "-0.07%", mtd: "+6.45%", y1: "+4.88%" },
      { name: "Private Banks", level: "21,503.27", today: "+0.74%", mtd: "+13.08%", y1: "+4.02%" },
      { name: "Commodities", level: "8,220.22", today: "-1.11%", mtd: "+6.91%", y1: "+3.58%" },
    ],
    commodities: [
      { name: "Gold ($/oz)", price: "3,876.43", change: "-2.79%", isPositive: false },
      { name: "Silver ($/oz)", price: "50.02", change: "-3.19%", isPositive: false },
      { name: "Crude Oil ($/bbl)", price: "88.74", change: "+2.55%", isPositive: true },
      { name: "Natural Gas ($/MMBtu)", price: "3.34", change: "+3.89%", isPositive: true },
      { name: "USD/INR", price: "94.04", change: "+0.38%", isPositive: true },
      { name: "India VIX", price: "15.49", change: "-6.80%", isPositive: false },
    ],
    levelCards: [
      { title: "NIFTY 50", level: "25,144.30", d1: "-0.61%", y1: "-2.84%", pos: false },
      { title: "BSE SENSEX", level: "81,592.45", d1: "-0.39%", y1: "-3.42%", pos: false },
      { title: "INDIA 10Y", level: "7.25%", d1: "+0.38%", y1: "+6.13%", pos: true },
      { title: "USD/INR", level: "94.04", d1: "+2.79%", y1: "+2.55%", pos: true },
      { title: "CRUDE OIL ($/bbl)", level: "$88.74", d1: "+2.55%", y1: "-7.60%", pos: true },
      { title: "GOLD ($/oz)", level: "$3,876.43", d1: "-2.79%", y1: "+51.72%", pos: false },
    ],
  },
  "16-nov": {
    dateLabel: "16 November 2026",
    updatedLabel: "Updated 16 Nov, 3:50 PM",
    commentary:
      "Nifty 50 rose 0.58% to 25,291.10 and Sensex climbed 0.63% to 82,104.79, while crude oil dipped 0.14% to USD 88.44/barrel, gold fell 0.52% to USD 3,866.20/oz, and INR strengthened 0.33% to 93.92 per USD.",
    notes: [
      { title: "RBI Rate Decision", body: "Economists increasingly expect another rate hike in December amid persistent inflation pressures." },
      { title: "Inflation Concerns", body: "WPI remains in double digits for second consecutive month; headline retail inflation at two-year high of 6.09%." },
      { title: "MCL IPO Launch", body: "Mahanadi Coalfields IPO opens November 19 with cap price of 136, targeting INR 9,000 crore fundraising." },
      { title: "Strategic Energy", body: "India inaugurates 80,000-tonne LPG storage facility in Mangaluru; expanding strategic reserves amid geopolitical tensions." },
    ],
    lossScale: 16,
    indicesLargeCap: [
      { name: "Nifty 50", level: "25,291.10", today: "+0.58%", mtd: "+9.71%", y1: "-2.39%" },
      { name: "BSE Sensex", level: "82,104.79", today: "+0.63%", mtd: "+10.27%", y1: "-2.91%" },
    ],
    indicesBroad: [
      { name: "BSE 500", level: "37,168.85", today: "+0.02%", mtd: "+8.53%", y1: "-0.54%" },
      { name: "Nifty 500", level: "23,752.40", today: "+0.08%", mtd: "+8.48%", y1: "-0.35%" },
    ],
    indicesMidSmall: [
      { name: "Nifty Next 50", level: "72,490.25", today: "-0.53%", mtd: "+7.06%", y1: "+3.87%" },
      { name: "Nifty Midcap 100", level: "61,576.40", today: "-0.51%", mtd: "+7.46%", y1: "+1.38%" },
      { name: "Nifty Smallcap 100", level: "19,441.10", today: "-1.10%", mtd: "+5.29%", y1: "+6.51%" },
    ],
    worldMarkets: [
      { name: "Dow Jones", level: "52,347.55", today: "+0.10%", mtd: "+1.12%", y1: "+10.30%" },
      { name: "S&P 500", level: "7,561.67", today: "-0.40%", mtd: "-0.24%", y1: "+12.23%" },
      { name: "Nasdaq", level: "25,136.27", today: "-0.91%", mtd: "-1.18%", y1: "+9.91%" },
      { name: "FTSE 100", level: "10,902.56", today: "+0.36%", mtd: "+1.61%", y1: "+11.16%" },
      { name: "CAC 40", level: "8,368.91", today: "+0.09%", mtd: "+5.01%", y1: "+1.66%" },
      { name: "DAX", level: "26,749.95", today: "-0.08%", mtd: "+3.61%", y1: "+11.27%" },
      { name: "Nikkei", level: "60,752.87", today: "-0.64%", mtd: "-4.01%", y1: "+20.60%" },
      { name: "Hang Seng", level: "23,637.60", today: "-1.55%", mtd: "+1.47%", y1: "-12.00%" },
      { name: "CBOE VIX", level: "19.30", today: "+3.21%", mtd: "-0.62%", y1: "-3.50%" },
    ],
    bestSectors: [
      { name: "IPO", val: 23.5 },
      { name: "TELECOM", val: 19.2 },
      { name: "HEALTHCARE", val: 17.8 },
      { name: "REIT & INVIT", val: 14.9 },
      { name: "METAL", val: 14.4 },
      { name: "SME IPO", val: 11.2 },
      { name: "POWER", val: 6.6 },
      { name: "BANKEX", val: 5.6 },
      { name: "SERVICES", val: 4.3 },
      { name: "COMMODITIES", val: 3.6 },
    ],
    worstSectors: [
      { name: "IT", val: -14.8 },
      { name: "FMCG", val: -12.5 },
      { name: "TECK", val: -8.2 },
      { name: "OIL & GAS", val: -8.0 },
      { name: "HOUSING", val: -7.0 },
      { name: "ENERGY", val: -6.3 },
      { name: "CPSE", val: -4.6 },
      { name: "INFRASTRUCTURE", val: -4.3 },
      { name: "REALTY", val: -3.0 },
      { name: "POWER & ENERGY", val: -2.3 },
    ],
    bseSectorsList: [
      { name: "IPO", level: "19,618.43", today: "+0.43%", mtd: "+9.88%", y1: "+23.50%" },
      { name: "Telecom", level: "3,766.31", today: "+0.14%", mtd: "+2.50%", y1: "+19.18%" },
      { name: "Healthcare", level: "52,579.89", today: "-0.58%", mtd: "+4.81%", y1: "+17.75%" },
      { name: "REIT & InvIT", level: "152.45", today: "-0.41%", mtd: "+1.14%", y1: "+14.88%" },
      { name: "Metal", level: "39,750.41", today: "-1.75%", mtd: "+5.26%", y1: "+14.38%" },
      { name: "SME IPO", level: "1,17,247.82", today: "-0.48%", mtd: "+4.15%", y1: "+11.20%" },
      { name: "Power", level: "7,170.42", today: "-0.57%", mtd: "+4.35%", y1: "+6.59%" },
      { name: "Bankex", level: "69,296.84", today: "+0.71%", mtd: "+12.83%", y1: "+5.56%" },
      { name: "Services", level: "1,705.32", today: "-0.48%", mtd: "+8.08%", y1: "+4.33%" },
      { name: "Commodities", level: "8,162.93", today: "-0.70%", mtd: "+6.16%", y1: "+3.56%" },
      { name: "Industrials", level: "15,702.12", today: "-1.18%", mtd: "+5.20%", y1: "+3.54%" },
      { name: "Private Banks", level: "21,357.02", today: "-0.68%", mtd: "+12.31%", y1: "+3.21%" },
    ],
    commodities: [
      { name: "Gold ($/oz)", price: "3,881.75", change: "+0.14%", isPositive: true },
      { name: "Silver ($/oz)", price: "48.72", change: "-2.59%", isPositive: false },
      { name: "Crude Oil ($/bbl)", price: "88.56", change: "-0.20%", isPositive: false },
      { name: "Natural Gas ($/MMBtu)", price: "3.23", change: "-3.29%", isPositive: false },
      { name: "USD/INR", price: "94.23", change: "+0.20%", isPositive: true },
      { name: "India VIX", price: "15.67", change: "+1.10%", isPositive: true },
    ],
    levelCards: [
      { title: "NIFTY 50", level: "25,291.10", d1: "+0.58%", y1: "-2.39%", pos: true },
      { title: "BSE SENSEX", level: "82,104.79", d1: "+0.63%", y1: "-2.91%", pos: true },
      { title: "INDIA 10Y", level: "7.31%", d1: "+0.20%", y1: "+6.15%", pos: true },
      { title: "USD/INR", level: "94.23", d1: "+0.14%", y1: "+50.89%", pos: true },
      { title: "CRUDE OIL ($/bbl)", level: "$88.56", d1: "-0.20%", y1: "-6.93%", pos: false },
      { title: "GOLD ($/oz)", level: "$3,881.75", d1: "+0.14%", y1: "+50.89%", pos: true },
    ],
  },
};
