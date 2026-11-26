export type BlueBookEdition = {
  slug: string;
  title: string;
  subtitle?: string;
  pdf?: string;
  downloadName?: string;
};

export const BLUE_BOOKS: BlueBookEdition[] = [
  { slug: "importance-of-balance", title: "Importance of Balance" },
  { slug: "old-tax-regime-tax-savings-checklist", title: "2025-26 - OLD TAX REGIME TAX SAVINGS CHECKLIST" },
  { slug: "festive-season-financial-wellness-guide", title: "Festive Season Financial Wellness Guide" },
  {
    slug: "financial-wellness-the-anmol-way",
    title: "Financial Wellness The Anmol Way",
    subtitle: "Money Matters 2026",
  },
  { slug: "kindness-in-finance", title: "Kindness in Finance" },
  { slug: "unlisted-stocks-indulgence-sovereign-safety", title: "Unlisted Stocks, Indulgence & Sovereign Safety" },
  {
    slug: "navigating-personal-finance-digital-safety",
    title: "Navigating Personal Finance & Digital Safety",
    subtitle: "A Comprehensive Guide to Hidden Financial Costs, Investment Mindsets, and Digital Security for Families",
  },
  { slug: "money-matters-3-things", title: "MONEY MATTERS: 3 things worth knowing this month" },
  { slug: "ai-deepfakes-financial-scams", title: "How AI-Generated Deepfakes Are Reshaping Financial Scams" },
  { slug: "systematic-withdrawal-plan", title: "The Power of a Systematic Withdrawal Plan (SWP)" },
  { slug: "timing-your-legacy", title: "A Guide to Timing Your Legacy" },
  { slug: "financial-lessons-for-gen-z", title: "3 Real Financial Lessons for Gen Z" },
  { slug: "new-rules-of-money-and-life", title: "The new rules of Money and Life" },
  { slug: "from-plate-to-portfolio", title: "From Plate to Portfolio", subtitle: "Financial Nutrition" },
  {
    slug: "financial-freedom",
    title: "FINANCIAL FREEDOM: The Passive Investing Way",
    pdf: "/blue-book/financial-freedom.pdf",
    downloadName: "Financial-Freedom-The-Passive-Investing-Way.pdf",
  },
];

export function blueBookBySlug(slug: string) {
  return BLUE_BOOKS.find((book) => book.slug === slug);
}
