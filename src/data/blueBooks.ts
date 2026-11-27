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
    description: [
      "This PDF document, titled \"Importance of Balance\" by Anmol Financial Services, serves as a financial education newsletter designed to guide investors on wealth management, portfolio rebalancing, and financial literacy. Using the concept of the March Equinox as a metaphor for equilibrium, the guide outlines target asset allocations across various risk profiles (Conservative, Balanced Growth, and Aggressive) and highlights tailored financial products suitable for different life stages—ranging from early child savings to active career wealth creation and post-retirement income strategies.",
      "In addition to core portfolio management principles, the document incorporates engaging, practical, and security-focused topics to boost overall financial quotient. It draws mathematical analogies using Pi (π) to explain investor behavior, market rules, and systematic investment planning (SIP). It also features a critical 4-step safety protocol to protect investors against parcel scams and digital arrest fraud, and concludes with an interactive personal finance crossword complete with solutions and key financial takeaways.",
    ],
  },
  {
    slug: "old-tax-regime-tax-savings-checklist",
    title: "2025-26 - Old Tax Regime Tax Savings Checklist",
    pdfWidth: 1080,
    pdfHeight: 1080,
    pdf: "/blue-book/old-tax-regime-tax-savings-checklist.pdf",
    downloadName: "2025-26-Old-Tax-Regime-Tax-Savings-Checklist.pdf",
    noteBelow: true,
    description: [
      "\"2025-26 - Old Tax Regime Tax Savings Checklist\" is a guidance document published by Anmol Financial Services (AMFI Registered ARN No: 114893) for Financial Year 2025-26. It details ten smart financial moves to make before filing tax returns, highlighting key differences between the Old and New Tax Regimes. The checklist details various tax-saving avenues, including Section 80C investments up to ₹1,50,000 (such as ELSS mutual funds, PPF/EPF, life insurance premiums, home loan principal repayments, and tuition fees), extra NPS contributions up to ₹50,000 under Section 80CCD(1B), and Section 80D health insurance deductions.",
      "Additionally, the document outlines eligibility rules for home loan interest deductions under Section 24(b) and HRA exemptions, providing audit-readiness guidelines like retaining rent receipts and obtaining a landlord's PAN. It further lists supplementary deductions under Section 80E for education loans, 80G for charitable donations, 80TTA/80TTB for savings interest, and 80U/80DD for disability-related expenses. The document concludes with a quick checklist, advisory contact details for Anmol Wealth, and a standard regulatory disclaimer regarding mutual fund investments and tax laws.",
    ],
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
    description: [
      "This PDF document, titled \"3 Real Financial Lessons for Gen Z\" and published by Anmol Share Broking Pvt. Ltd., serves as a 10-slide financial awareness guide tailored for young investors. It focuses on three core themes: practical investing strategies, avoiding common job scams, and managing personal debt responsibly. The overarching message emphasizes building wealth gradually, highlighting that slow, consistent financial habits are key to avoiding common traps and securing long-term growth.",
      "The content provides actionable advice for each theme, urging readers to start small with SIPs and index funds, automate investments, and prioritize diversification over chasing high-risk returns. It warns against task-based job scams that ask for upfront deposits or task recharges, recommending immediate blocking and reporting. Lastly, it addresses the risks of instant loan apps and \"buy now, pay later\" services, advising individuals to understand true interest costs, avoid borrowing for depreciating assets, and build an emergency fund first.",
    ],
  },
  {
    slug: "new-rules-of-money-and-life",
    title: "The New Rules of Money and Life",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/new-rules-of-money-and-life.pdf",
    downloadName: "The-New-Rules-of-Money-and-Life.pdf",
    description: [
      "The PDF, titled \"The New Rules of Money & Life\" by MyAnmol Share Broking Pvt. Ltd., is an educational carousel guide that explores modern financial management across three core topics: Digital Banking, Health, Wealth & Passion, and Succession Planning. It highlights how digital tools such as UPI, biometric authentication, and AI chatbots are transforming everyday banking by delivering faster, safer, and more convenient financial control. The document emphasizes that staying informed about these technological advances allows individuals to manage their finances efficiently from anywhere.",
      "Beyond digital innovations, the guide stresses the importance of personal well-being and long-term legacy planning. It frames health, wealth, and passion as mutually reinforcing pillars necessary for a balanced life, offering practical strategies like automating wealth building and setting aside dedicated time and resources for personal pursuits. Additionally, it underscores the necessity of succession planning—such as drafting a will, updating account nominees, and reviewing plans periodically—to avoid family disputes and ensure financial security for future generations.",
    ],
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
    title: "Financial Freedom: The Passive Investing Way",
    pdfWidth: 1080,
    pdfHeight: 1350,
    pdf: "/blue-book/financial-freedom.pdf",
    downloadName: "Financial-Freedom-The-Passive-Investing-Way.pdf",
    description: [
      "This PDF, titled Financial Freedom: The Passive Investing Way, is an educational carousel presentation created by MyAnmol Share Broking that outlines the fundamentals of achieving financial independence through passive investing. It defines financial freedom as having passive investment income cover one's living expenses, suggesting a general rule of thumb that individuals should aim to accumulate approximately 25 times their annual expenses. The document breaks down the process into three distinct levels—Security, Independence, and Abundance—and emphasizes the distinction between active income and passive investment income, highlighting how passive strategies allow wealth to grow without continuous active effort.",
      "The second half of the presentation focuses on the mechanics and benefits of passive investing, specifically advocating for diversified options such as Index Funds, Mutual Funds, and automated Systematic Investment Plans (SIPs). It compares active and passive management, underscoring that passive investing offers lower costs, reduced emotional bias, and time savings while aiming to match market returns. Through an example detailing the power of compounding, a practical 4-step execution guide, and a readiness checklist, the carousel encourages readers to start small, automate their investments, stay disciplined through market cycles, and begin building long-term financial freedom.",
    ],
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
    description: [
      "The Capital Gains Account Scheme (CGAS) is a tax mechanism designed for individuals who have sold a capital asset—such as property—and intend to reinvest the gains to claim a tax exemption, but have not yet done so before filing their Income Tax Return (ITR). Under Sections 54, 54B, 54D, 54F, and 54G of the Income Tax Act, taxpayers can temporarily park their unutilized capital gains into an authorized CGAS account at public sector banks prior to the ITR filing deadline under Section 139. Depositing funds into CGAS ensures that the amount is legally treated as \"utilized\" for the exemption, giving the taxpayer the necessary time to identify, purchase, or construct a new asset without losing their tax benefit.",
      "The scheme offers two primary types of accounts: Type A, which functions like a liquid savings account for immediate funds needed during reinvestment, and Type B, which acts as a term deposit offering higher interest rates for longer-term planning. However, the exemption is conditional and subject to strict timelines, requiring full utilization of the funds within two to three years depending on the specific exemption section. If the deposited money remains unutilized past the statutory deadline, it loses its exempt status and is taxed as capital gains in the year the deadline expires. Proper compliance, including using designated forms (such as Form C for withdrawals and Form D for reporting utilization), is crucial to retaining the tax exemption.",
    ],
  },
];

export function blueBookBySlug(slug: string) {
  return BLUE_BOOKS.find((book) => book.slug === slug);
}
