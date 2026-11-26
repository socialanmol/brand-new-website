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
  {
    slug: "festive-season-financial-wellness-guide",
    title: "Festive Season Financial Wellness Guide",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/festive-season-financial-wellness-guide.pdf",
    downloadName: "Festive-Season-Financial-Wellness-Guide.pdf",
    noteBelow: true,
  },
  {
    slug: "financial-wellness-the-anmol-way",
    title: "Financial Wellness The Anmol Way",
    subtitle: "Money Matters 2026",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/financial-wellness-the-anmol-way.pdf",
    downloadName: "Financial-Wellness-The-Anmol-Way.pdf",
  },
  {
    slug: "kindness-in-finance",
    title: "Kindness in Finance",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/kindness-in-finance.pdf",
    downloadName: "Kindness-in-Finance.pdf",
  },
  {
    slug: "unlisted-stocks-indulgence-sovereign-safety",
    title: "Unlisted Stocks, Indulgence & Sovereign Safety",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/unlisted-stocks-indulgence-sovereign-safety.pdf",
    downloadName: "Unlisted-Stocks-Indulgence-and-Sovereign-Safety.pdf",
    noteBelow: true,
  },
  {
    slug: "navigating-personal-finance-digital-safety",
    title: "Navigating Personal Finance & Digital Safety",
    subtitle: "A Comprehensive Guide to Hidden Financial Costs, Investment Mindsets, and Digital Security for Families",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/navigating-personal-finance-digital-safety.pdf",
    downloadName: "Navigating-Personal-Finance-and-Digital-Safety.pdf",
    noteBelow: true,
  },
  {
    slug: "money-matters-3-things",
    title: "MONEY MATTERS: 3 things worth knowing this month",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/money-matters-3-things.pdf",
    downloadName: "Money-Matters-3-things-worth-knowing-this-month.pdf",
  },
  {
    slug: "ai-deepfakes-financial-scams",
    title: "How AI-Generated Deepfakes Are Reshaping Financial Scams",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/ai-deepfakes-financial-scams.pdf",
    downloadName: "How-AI-Generated-Deepfakes-Are-Reshaping-Financial-Scams.pdf",
  },
  {
    slug: "systematic-withdrawal-plan",
    title: "The Power of a Systematic Withdrawal Plan (SWP)",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/systematic-withdrawal-plan.pdf",
    downloadName: "The-Power-of-a-Systematic-Withdrawal-Plan.pdf",
  },
  {
    slug: "timing-your-legacy",
    title: "A Guide to Timing Your Legacy",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/timing-your-legacy.pdf",
    downloadName: "A-Guide-to-Timing-Your-Legacy.pdf",
  },
  {
    slug: "financial-lessons-for-gen-z",
    title: "3 Real Financial Lessons for Gen Z",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/financial-lessons-for-gen-z.pdf",
    downloadName: "3-Real-Financial-Lessons-for-Gen-Z.pdf",
    noteBelow: true,
  },
  {
    slug: "new-rules-of-money-and-life",
    title: "The new rules of Money and Life",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/new-rules-of-money-and-life.pdf",
    downloadName: "The-new-rules-of-Money-and-Life.pdf",
  },
  {
    slug: "from-plate-to-portfolio",
    title: "From Plate to Portfolio",
    subtitle: "Financial Nutrition",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/from-plate-to-portfolio.pdf",
    downloadName: "From-Plate-to-Portfolio.pdf",
  },
  {
    slug: "financial-freedom",
    title: "FINANCIAL FREEDOM: The Passive Investing Way",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/financial-freedom.pdf",
    downloadName: "Financial-Freedom-The-Passive-Investing-Way.pdf",
  },
  {
    slug: "take-charge-of-your-finances",
    title: "Take Charge of your Finances",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/take-charge-of-your-finances.pdf",
    downloadName: "Take-Charge-of-your-Finances.pdf",
  },
  {
    slug: "essential-lessons-ipo-cyber-security-spending",
    title: "Essential Lessons in IPO Investing, Cyber Security, and Spending Habits",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/essential-lessons-ipo-cyber-security-spending.pdf",
    downloadName: "Essential-Lessons-in-IPO-Investing-Cyber-Security-and-Spending-Habits.pdf",
    noteBelow: true,
  },
  {
    slug: "everyday-safety-security-checklist",
    title: "Everyday Safety & Security Checklist",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/everyday-safety-security-checklist.pdf",
    downloadName: "Everyday-Safety-and-Security-Checklist.pdf",
    noteBelow: true,
  },
];

export function blueBookBySlug(slug: string) {
  return BLUE_BOOKS.find((book) => book.slug === slug);
}
