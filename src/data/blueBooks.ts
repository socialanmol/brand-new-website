export type BlueBookEdition = {
  slug: string;
  title: string;
  subtitle?: string;
  pdfWidth: number;
  pdfHeight: number;
  pdf?: string;
  downloadName?: string;
  noteBelow?: boolean;
};

export const BLUE_BOOKS: BlueBookEdition[] = [
  {
    slug: "importance-of-balance",
    title: "Importance of Balance",
    pdfWidth: 1920,
    pdfHeight: 1080,
    pdf: "/blue-book/importance-of-balance.pdf",
    downloadName: "Importance-of-Balance.pdf",
    noteBelow: true,
  },
  {
    slug: "old-tax-regime-tax-savings-checklist",
    title: "2025-26 - OLD TAX REGIME TAX SAVINGS CHECKLIST",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/old-tax-regime-tax-savings-checklist.pdf",
    downloadName: "2025-26-Old-Tax-Regime-Tax-Savings-Checklist.pdf",
    noteBelow: true,
  },
  { slug: "festive-season-financial-wellness-guide", title: "Festive Season Financial Wellness Guide", pdfWidth: 1080, pdfHeight: 1080 },
  {
    slug: "financial-wellness-the-anmol-way",
    title: "Financial Wellness The Anmol Way",
    subtitle: "Money Matters 2026",
    pdfWidth: 1080,
    pdfHeight: 1350,
  },
  { slug: "kindness-in-finance", title: "Kindness in Finance", pdfWidth: 1080, pdfHeight: 1350 },
  { slug: "unlisted-stocks-indulgence-sovereign-safety", title: "Unlisted Stocks, Indulgence & Sovereign Safety", pdfWidth: 1080, pdfHeight: 1080 },
  {
    slug: "navigating-personal-finance-digital-safety",
    title: "Navigating Personal Finance & Digital Safety",
    subtitle: "A Comprehensive Guide to Hidden Financial Costs, Investment Mindsets, and Digital Security for Families",
    pdfWidth: 1080,
    pdfHeight: 1080,
  },
  { slug: "money-matters-3-things", title: "MONEY MATTERS: 3 things worth knowing this month", pdfWidth: 1080, pdfHeight: 1350 },
  { slug: "ai-deepfakes-financial-scams", title: "How AI-Generated Deepfakes Are Reshaping Financial Scams", pdfWidth: 1080, pdfHeight: 1350 },
  { slug: "systematic-withdrawal-plan", title: "The Power of a Systematic Withdrawal Plan (SWP)", pdfWidth: 1080, pdfHeight: 1350 },
  { slug: "timing-your-legacy", title: "A Guide to Timing Your Legacy", pdfWidth: 1080, pdfHeight: 1350 },
  { slug: "financial-lessons-for-gen-z", title: "3 Real Financial Lessons for Gen Z", pdfWidth: 1080, pdfHeight: 1080 },
  {
    slug: "new-rules-of-money-and-life",
    title: "The new rules of Money and Life",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/new-rules-of-money-and-life.pdf",
    downloadName: "The-new-rules-of-Money-and-Life.pdf",
  },
  { slug: "from-plate-to-portfolio", title: "From Plate to Portfolio", subtitle: "Financial Nutrition", pdfWidth: 1080, pdfHeight: 1350 },
  {
    slug: "financial-freedom",
    title: "FINANCIAL FREEDOM: The Passive Investing Way",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/financial-freedom.pdf",
    downloadName: "Financial-Freedom-The-Passive-Investing-Way.pdf",
  },
];

export function blueBookBySlug(slug: string) {
  return BLUE_BOOKS.find((book) => book.slug === slug);
}
