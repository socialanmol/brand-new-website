export type BlueBookEdition = {
  slug: string;
  title: string;
  subtitle?: string;
  frameWidth: number;
  frameHeight: number;
  pdf?: string;
  downloadName?: string;
};

export const BLUE_BOOKS: BlueBookEdition[] = [
  { slug: "importance-of-balance", title: "Importance of Balance", frameWidth: 1920, frameHeight: 1080 },
  { slug: "old-tax-regime-tax-savings-checklist", title: "2025-26 - OLD TAX REGIME TAX SAVINGS CHECKLIST", frameWidth: 1080, frameHeight: 1080 },
  { slug: "festive-season-financial-wellness-guide", title: "Festive Season Financial Wellness Guide", frameWidth: 1080, frameHeight: 1080 },
  {
    slug: "financial-wellness-the-anmol-way",
    title: "Financial Wellness The Anmol Way",
    subtitle: "Money Matters 2026",
    frameWidth: 1080,
    frameHeight: 1350,
  },
  { slug: "kindness-in-finance", title: "Kindness in Finance", frameWidth: 1080, frameHeight: 1350 },
  { slug: "unlisted-stocks-indulgence-sovereign-safety", title: "Unlisted Stocks, Indulgence & Sovereign Safety", frameWidth: 1080, frameHeight: 1080 },
  {
    slug: "navigating-personal-finance-digital-safety",
    title: "Navigating Personal Finance & Digital Safety",
    subtitle: "A Comprehensive Guide to Hidden Financial Costs, Investment Mindsets, and Digital Security for Families",
    frameWidth: 1080,
    frameHeight: 1080,
  },
  { slug: "money-matters-3-things", title: "MONEY MATTERS: 3 things worth knowing this month", frameWidth: 1080, frameHeight: 1350 },
  { slug: "ai-deepfakes-financial-scams", title: "How AI-Generated Deepfakes Are Reshaping Financial Scams", frameWidth: 1080, frameHeight: 1350 },
  { slug: "systematic-withdrawal-plan", title: "The Power of a Systematic Withdrawal Plan (SWP)", frameWidth: 1080, frameHeight: 1350 },
  { slug: "timing-your-legacy", title: "A Guide to Timing Your Legacy", frameWidth: 1080, frameHeight: 1350 },
  { slug: "financial-lessons-for-gen-z", title: "3 Real Financial Lessons for Gen Z", frameWidth: 1080, frameHeight: 1080 },
  { slug: "new-rules-of-money-and-life", title: "The new rules of Money and Life", frameWidth: 1080, frameHeight: 1350 },
  { slug: "from-plate-to-portfolio", title: "From Plate to Portfolio", subtitle: "Financial Nutrition", frameWidth: 1080, frameHeight: 1350 },
  {
    slug: "financial-freedom",
    title: "FINANCIAL FREEDOM: The Passive Investing Way",
    frameWidth: 1080,
    frameHeight: 1350,
    pdf: "/blue-book/financial-freedom.pdf",
    downloadName: "Financial-Freedom-The-Passive-Investing-Way.pdf",
  },
];

export function blueBookBySlug(slug: string) {
  return BLUE_BOOKS.find((book) => book.slug === slug);
}
