export type BlueBookEdition = {
  slug: string;
  title: string;
  subtitle?: string;
  pdfWidth: number;
  pdfHeight: number;
  pdf?: string;
  downloadName?: string;
  noteBelow?: boolean;
  description?: string[];
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
    title: "2025-26 - Old Tax Regime Tax Savings Checklist",
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
    description: [
      "\"TAKE CHARGE OF YOUR FINANCES\" is a practical financial literacy guide created by MyAnmol Share Broking Pvt. Ltd. It covers three major areas of personal finance: evaluating individual financial health, navigating specialized banking services for senior citizens, and understanding the factors that influence a credit score. The document highlights key habits for maintaining financial wellness, such as establishing an emergency fund covering three to six months of expenses, maintaining debt levels below 40% of income, securing appropriate insurance coverage, and establishing explicit investment goals.",
      "Additionally, the guide details essential banking perks available to senior citizens—including higher fixed deposit rates, doorstep banking services, priority branch service, and enhanced security features—noting that these options generally require an active request. It also breaks down credit score calculations by attributing specific weights to payment history (35%), credit utilization (30%), length of credit history (15%), credit mix (10%), and new inquiries (10%). Readers are encouraged to take manageable, step-by-step actions—such as starting an emergency fund, calling their bank, or reviewing their annual credit report—to improve their overall financial standing.",
    ],
  },
  {
    slug: "essential-lessons-ipo-cyber-security-spending",
    title: "Essential Lessons in IPO Investing, Cyber Security, and Spending Habits",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/essential-lessons-ipo-cyber-security-spending.pdf",
    downloadName: "Essential-Lessons-in-IPO-Investing-Cyber-Security-and-Spending-Habits.pdf",
    noteBelow: true,
    description: [
      "The document, titled \"Essential Lessons in IPO Investing, Cyber Security, and Spending Habits\" and published by Anmol Share Broking Pvt Ltd, serves as a financial awareness guide designed to help individuals navigate modern money management and avoid common financial traps. It breaks down key topics such as evaluating initial public offerings (IPOs) objectively using a 6-point checklist rather than relying on market hype, identifying fake delivery notification cyber frauds that trick victims into revealing sensitive banking information, and managing impulse spending driven by lifestyle inflation.",
      "Throughout the PDF, practical strategies and actionable safety measures are presented to foster long-term wealth building. These include verifying courier links on official portals, reporting fraud via national helplines like 1930, automating investments on salary day, and employing a 24-hour delay tactic before non-essential purchases. The overall message emphasizes slowing down, avoiding manufactured urgency across investments, cyber alerts, and spending habits, and making informed decisions grounded in financial literacy.",
    ],
  },
  {
    slug: "everyday-safety-security-checklist",
    title: "Everyday Safety & Security Checklist",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/everyday-safety-security-checklist.pdf",
    downloadName: "Everyday-Safety-and-Security-Checklist.pdf",
    noteBelow: true,
    description: [
      "It delivers practical, everyday security advice structured around three main areas: workplace safety, digital security, and home/personal awareness. The presentation emphasizes proactive habits, asserting that most risks stem from shortcuts and simple oversights rather than unpredictable accidents.",
      "The content outlines actionable recommendations across each domain, such as maintaining clear workplace exits, wearing proper protective equipment, and inspecting tools. In the digital sphere, it warns against urgent phishing attempts and advises using multi-factor authentication, strong unique passwords, and prompt device updates. For personal and home safety, it highlights best practices like verifying visitors, keeping valuables out of plain view, and knowing emergency exits. The guide concludes with motivational safety quotes highlighting that prevention is priceless.",
    ],
  },
  {
    slug: "spotting-pension-scams",
    title: "Spotting Pension Scams & Protecting Your Retirement",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/spotting-pension-scams.pdf",
    downloadName: "Spotting-Pension-Scams-and-Protecting-Your-Retirement.pdf",
    noteBelow: true,
    description: [
      "This PDF, titled \"Spotting Pension Scams & Protecting Your Retirement\" is an educational presentation designed to raise awareness about retirement fund scams. Published by Anmol Share Broking Pvt. Ltd., the 10-slide guide outlines common tactics used by fraudsters targeting individuals' National Pension System (NPS), Employees' Provident Fund (EPF), or annuity accounts. It highlights critical red flags, such as unsolicited offers for \"free pension reviews,\" guarantees of high returns, and pressure to share sensitive information like OTPs, PAN, or Aadhaar details.",
      "The document provides actionable advice to protect pension savings and outlines clear steps to take if a scam is suspected. Key recommendations include verifying details directly through official NPS or EPFO channels, ignoring claims of \"easy early access\" or quick withdrawals, and avoiding paying processing fees. In the event of fraudulent activity, readers are urged to document evidence, report the incident to the National Cyber Crime helpline (1930), and immediately notify their bank or pension provider.",
    ],
  },
  {
    slug: "capital-gains-account-scheme",
    title: "Understanding the Capital Gains Account Scheme (CGAS)",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/capital-gains-account-scheme.pdf",
    downloadName: "Understanding-the-Capital-Gains-Account-Scheme.pdf",
    noteBelow: true,
  },
];

export function blueBookBySlug(slug: string) {
  return BLUE_BOOKS.find((book) => book.slug === slug);
}
