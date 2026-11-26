import { homeFaqs } from "./homeFaqs";
import { MUTUAL_FUND_SEMINARS } from "../data/mutualFundSeminars";

const ORIGIN = "https://www.myanmol.com";

export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
};

const pages: Record<string, { title: string; description: string }> = {
  "/": {
    title: "MyAnmol | Goal-Based Financial Planning, SIP and Mutual Funds",
    description: "Goal-based financial planning for Indian families and NRIs. Savings, insurance and mutual funds from Anmol Share Broking Pvt. Ltd., AMFI ARN 114893.",
  },
  "/investment-services": {
    title: "Mutual Fund and Portfolio Portal | MyAnmol",
    description: "Open the MyAnmol investment portal to view mutual fund, SIP and wealth portfolio access.",
  },
  "/services/pms": {
    title: "Portfolio Management Services (PMS) Distributor in India | MyAnmol",
    description: "PMS distribution from Anmol Share Broking Pvt. Ltd., APMI registration APRN01456. SEBI minimum investment is ₹50 lakh.",
  },
  "/solutions/nri": {
    title: "NRI Investment in India, GIFT City and Tax Planning | MyAnmol",
    description: "India wealth guidance for NRIs, including mutual funds, GIFT City, deposits, insurance and PMS.",
  },
  "/contact": {
    title: "Contact MyAnmol | Financial Advisors in Jayanagar and JP Nagar",
    description: "Contact Anmol Share Broking Pvt. Ltd. in Jayanagar 4th T Block and JP Nagar, Bangalore, or send a message to mutualfunds@myanmol.com.",
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions and Regulatory Disclosures | MyAnmol",
    description: "Terms of use for www.myanmol.com and the MyAnmol app, operated by Anmol Share Broking Pvt. Ltd., AMFI ARN 114893.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | MyAnmol",
    description: "How MyAnmol collects, uses and protects personal information on www.myanmol.com and the mobile app.",
  },
  "/disclaimer": {
    title: "Disclaimer | MyAnmol",
    description: "Regulatory disclaimer for Anmol Share Broking Pvt. Ltd., AMFI-registered mutual fund distributor ARN 114893.",
  },
  "/regulatory": {
    title: "Regulatory Disclosures | MyAnmol",
    description: "AMFI, SIF, PMS and AIF registration, empanelment and grievance details for Anmol Share Broking Pvt. Ltd.",
  },
  "/mutual-funds": {
    title: "Mutual Funds and SIP Investing | MyAnmol",
    description: "Mutual fund research, SIP registration and goal-based fund selection from an AMFI-registered distributor.",
  },
  "/mutual-funds/sip": {
    title: "Systematic Investment Plan (SIP) | MyAnmol",
    description: "How a SIP works at MyAnmol, including what to consider, how to start, goal-based SIPs, and top-up SIPs.",
  },
  "/mutual-funds/gift-city": {
    title: "GIFT City Investments | MyAnmol",
    description: "GIFT City access for residents and NRIs through Anmol Share Broking Pvt. Ltd.",
  },
  "/services/sif": {
    title: "Specialised Investment Funds (SIF) | MyAnmol",
    description: "How SEBI specialised investment funds differ from mutual funds and PMS, including the published minimum.",
  },
  "/services/aifs": {
    title: "Alternative Investment Funds | MyAnmol",
    description: "Alternative investment fund distribution from Anmol Share Broking Pvt. Ltd.",
  },
  "/insights/seminars": {
    title: "Seminars and Workshops | MyAnmol",
    description: "MyAnmol seminars and webinars on personal finance, investing, retirement and life planning.",
  },
  "/insights/seminars/personal-finance-money-management": {
    title: "Personal Finance and Money Management Seminars | MyAnmol",
    description: "Topic list for the MyAnmol personal finance and money management masterclasses.",
  },
  "/insights/seminars/mutual-funds-wealth-creation": {
    title: "Mutual Funds and Wealth Creation Seminars | MyAnmol",
    description: "Topic list for the MyAnmol mutual fund and wealth creation masterclasses.",
  },
  "/insights/seminars/financial-planning-life-goals": {
    title: "Financial Planning and Life Goals Seminars | MyAnmol",
    description: "MyAnmol seminars on a child's education, retirement, a home, several goals at once, and estate planning.",
  },
  "/insights/seminars/insurance-financial-protection": {
    title: "Insurance and Financial Protection Seminars | MyAnmol",
    description: "MyAnmol seminars on life cover, health insurance, medical emergencies, and reviewing an existing policy.",
  },
  "/insights/seminars/specialised-audiences-niche": {
    title: "Specialised Audiences and Niche Communities | MyAnmol",
    description: "MyAnmol seminars for doctors, teachers, women, NRIs, business owners, senior citizens, and young couples.",
  },
  "/insights/seminars/behavioural-finance-investor-psychology": {
    title: "Behavioural Finance and Investor Psychology | MyAnmol",
    description: "MyAnmol seminars on fear, greed, buying high, chasing returns, and staying invested in volatile markets.",
  },
  "/insights/seminars/manage-your-salary": {
    title: "How to Manage Your Salary Better | MyAnmol",
    description: "A MyAnmol masterclass on saving, spending and investing a monthly salary.",
  },
  "/insights/seminars/2-bank-approach": {
    title: "The 2-Bank Approach to Better Budgeting | MyAnmol",
    description: "A MyAnmol masterclass on splitting salary across spending and saving accounts.",
  },
  "/insights/seminars/10-money-mistakes": {
    title: "10 Money Mistakes That Can Cost You Lakhs | MyAnmol",
    description: "A MyAnmol masterclass on everyday money decisions that reduce what a household can keep.",
  },
  "/insights/seminars/how-much-to-save": {
    title: "How Much Should You Save from Monthly Income? | MyAnmol",
    description: "A MyAnmol masterclass on choosing a monthly savings amount that fits the rest of the bills.",
  },
  "/insights/seminars/build-first-10-lakh": {
    title: "How to Build Your First ₹10 Lakh | MyAnmol",
    description: "A MyAnmol masterclass on reaching the first ₹10 lakh from a steady monthly surplus.",
  },
  "/insights/seminars/credit-cards-emis-loans": {
    title: "Credit Cards, EMIs and Personal Loans | MyAnmol",
    description: "A MyAnmol masterclass on when borrowing helps a plan and when the interest cost works against it.",
  },
  "/insights/seminars/financial-independence-45": {
    title: "Financial Independence by 45 or 50 | MyAnmol",
    description: "A MyAnmol masterclass on the savings rate and protection behind an earlier work-optional life.",
  },
  "/insights/seminars/financial-planning-couples": {
    title: "Financial Planning for Couples | MyAnmol",
    description: "A MyAnmol masterclass on managing shared goals and personal money together.",
  },
  "/insights/seminars/planning-after-marriage": {
    title: "Financial Planning after Marriage | MyAnmol",
    description: "A MyAnmol masterclass for newly married couples on household bills, nominees and a shared emergency fund.",
  },
  "/insights/seminars/major-life-events": {
    title: "Prepare Financially for Major Life Events | MyAnmol",
    description: "A MyAnmol masterclass on funding a child, a home, a career break or care for parents.",
  },
  "/insights/articles": {
    title: "Articles and Insights | MyAnmol",
    description: "Articles on financial planning, mutual funds and household money decisions from MyAnmol.",
  },
  "/about/team": {
    title: "Our Team | MyAnmol",
    description: "Advisors and leaders at Anmol Share Broking Pvt. Ltd., the firm behind MyAnmol.",
  },
  "/about/journey": {
    title: "Our Journey | MyAnmol",
    description: "The MyAnmol story and the cities where Anmol Share Broking works with families.",
  },
  "/insurance/term": {
    title: "Term Insurance | MyAnmol",
    description: "Term life cover sized to income, liabilities and dependants, separate from investments.",
  },
  "/insurance/health": {
    title: "Health Insurance | MyAnmol",
    description: "Family health insurance guidance from MyAnmol.",
  },
  "/insurance/life": {
    title: "Life Insurance | MyAnmol",
    description: "Life insurance guidance from MyAnmol. Insurance is the subject matter of solicitation.",
  },
  "/insurance/general": {
    title: "General Insurance | MyAnmol",
    description: "Motor, home and travel insurance guidance from MyAnmol.",
  },
  "/calculators": {
    title: "Financial Calculators | MyAnmol",
    description: "SIP, retirement, loan and goal calculators from MyAnmol.",
  },
  "/insights/glossary": {
    title: "Financial Glossary | MyAnmol",
    description: "Plain-language definitions for mutual funds, insurance and tax terms used on MyAnmol.",
  },
  "/insights/blue-book": {
    title: "Blue Book | MyAnmol",
    description: "The MyAnmol Blue Book series. Choose an edition from the shelf.",
  },
  "/insights/blue-book/capital-gains-account-scheme": {
    title: "Understanding the Capital Gains Account Scheme | MyAnmol",
    description: "Read Understanding the Capital Gains Account Scheme, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/spotting-pension-scams": {
    title: "Spotting Pension Scams and Protecting Your Retirement | MyAnmol",
    description: "Read Spotting Pension Scams and Protecting Your Retirement, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/everyday-safety-security-checklist": {
    title: "Everyday Safety and Security Checklist | MyAnmol",
    description: "Read the Everyday Safety and Security Checklist, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/essential-lessons-ipo-cyber-security-spending": {
    title: "Essential Lessons in IPO Investing, Cyber Security, and Spending Habits | MyAnmol",
    description: "Read Essential Lessons in IPO Investing, Cyber Security, and Spending Habits, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/take-charge-of-your-finances": {
    title: "Take Charge of your Finances | MyAnmol",
    description: "Read Take Charge of your Finances, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/ai-deepfakes-financial-scams": {
    title: "How AI-Generated Deepfakes Are Reshaping Financial Scams | MyAnmol",
    description: "Read How AI-Generated Deepfakes Are Reshaping Financial Scams, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/systematic-withdrawal-plan": {
    title: "The Power of a Systematic Withdrawal Plan | MyAnmol",
    description: "Read The Power of a Systematic Withdrawal Plan, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/timing-your-legacy": {
    title: "A Guide to Timing Your Legacy | MyAnmol",
    description: "Read A Guide to Timing Your Legacy, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/money-matters-3-things": {
    title: "Money Matters: 3 things worth knowing this month | MyAnmol",
    description: "Read Money Matters: 3 things worth knowing this month, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/navigating-personal-finance-digital-safety": {
    title: "Navigating Personal Finance and Digital Safety | MyAnmol",
    description: "Read Navigating Personal Finance and Digital Safety, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/unlisted-stocks-indulgence-sovereign-safety": {
    title: "Unlisted Stocks, Indulgence and Sovereign Safety | MyAnmol",
    description: "Read Unlisted Stocks, Indulgence and Sovereign Safety, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/from-plate-to-portfolio": {
    title: "From Plate to Portfolio | MyAnmol",
    description: "Read From Plate to Portfolio, Financial Nutrition, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/financial-lessons-for-gen-z": {
    title: "3 Real Financial Lessons for Gen Z | MyAnmol",
    description: "Read 3 Real Financial Lessons for Gen Z, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/kindness-in-finance": {
    title: "Kindness in Finance | MyAnmol",
    description: "Read Kindness in Finance, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/financial-wellness-the-anmol-way": {
    title: "Financial Wellness The Anmol Way | MyAnmol",
    description: "Read Financial Wellness The Anmol Way, Money Matters 2026, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/festive-season-financial-wellness-guide": {
    title: "Festive Season Financial Wellness Guide | MyAnmol",
    description: "Read the Festive Season Financial Wellness Guide, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/old-tax-regime-tax-savings-checklist": {
    title: "2025-26 - Old Tax Regime Tax Savings Checklist | MyAnmol",
    description: "Read the 2025-26 old tax regime tax savings checklist, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/new-rules-of-money-and-life": {
    title: "The new rules of Money and Life | MyAnmol",
    description: "Read The new rules of Money and Life, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/importance-of-balance": {
    title: "Importance of Balance | MyAnmol",
    description: "Read Importance of Balance, a Blue Book edition from MyAnmol.",
  },
  "/insights/blue-book/financial-freedom": {
    title: "FINANCIAL FREEDOM: The Passive Investing Way | MyAnmol",
    description: "Read Financial Freedom: The Passive Investing Way, a Blue Book edition from MyAnmol.",
  },
  ...Object.fromEntries(MUTUAL_FUND_SEMINARS.map((topic) => [
    `/insights/seminars/${topic.pageId}`,
    { title: `${topic.title} | MyAnmol`, description: topic.description },
  ])),
};

const aliases: Record<string, string> = {
  "/contact-us": "/contact",
  "/get-started": "/contact",
  "/for-nri": "/solutions/nri",
  "/mutual-funds/pms": "/services/pms",
  "/gift-city": "/mutual-funds/gift-city",
  "/specialized-investment-funds": "/services/sif",
  "/mutual-funds/sifs": "/services/sif",
  "/services/aif": "/services/aifs",
  "/mutual-funds/aifs": "/services/aifs",
  "/seminars": "/insights/seminars",
  "/articles": "/insights/articles",
  "/glossary": "/insights/glossary",
  "/our-team": "/about/team",
  "/journey": "/about/journey",
  "/our-journey": "/about/journey",
  "/tools": "/calculators",
  "/regulatory-disclosures": "/regulatory",
  "/disclosures": "/regulatory",
  "/for-families": "/solutions/families",
  "/for-business-owners": "/solutions/business-owners",
  "/solutions/biz": "/solutions/business-owners",
  "/for-armed-forces": "/solutions/armed-forces",
  "/solutions/armed": "/solutions/armed-forces",
  "/she-is-anmol": "/solutions/women",
  "/for-retirees": "/solutions/retirees",
  "/payroll-sip": "/solutions/salaried",
  "/genz": "/solutions/genz",
  "/solutions/igenz": "/solutions/genz",
  "/docwealth": "/solutions/doc",
  "/for-doctors": "/solutions/doc",
  "/for-teachers": "/solutions/teachers",
  "/save-insure-invest": "/wp/sii",
  "/goal-mapping": "/wp/goals",
  "/book-a-review": "/wp/review",
  "/booking": "/wp/review",
  "/financial-wellness-check": "/fw/check",
  "/solutions/financial-wellbeing": "/financial-wellbeing",
  "/financial-fitness-quiz": "/fw/quiz",
  "/build-your-wealth": "/fw/build",
  "/wealth-path": "/fw/build",
  "/zero-interest-planner": "/fw/zero-int",
  "/30-day-financial-confidence-builder": "/fw/30-day",
  "/resources": "/insights/learn",
};

function normalise(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return aliases[path] || path;
}

function titleFromPath(path: string): string {
  const slug = path.split("/").filter(Boolean).pop() || "MyAnmol";
  const label = slug
    .replace(/[-_]+/g, " ")
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
  return `${label} | MyAnmol`;
}

export function pageMeta(pathname: string): PageMeta {
  const path = normalise(pathname);
  const page = pages[path];
  const title = page?.title || titleFromPath(path);
  const description = page?.description
    || `${title.replace(" | MyAnmol", "")} on MyAnmol, operated by Anmol Share Broking Private Limited (AMFI ARN 114893).`;
  return {
    title,
    description,
    canonical: path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`,
  };
}

export function structuredData(pathname: string) {
  const meta = pageMeta(pathname);
  const path = normalise(pathname);
  const graph: object[] = [
    {
      "@type": "FinancialService",
      "@id": `${ORIGIN}/#organization`,
      name: "MyAnmol",
      legalName: "Anmol Share Broking Private Limited",
      url: `${ORIGIN}/`,
      email: "mutualfunds@myanmol.com",
      description: "AMFI-registered mutual fund and SIF distributor (ARN 114893) and APMI-registered PMS distributor (APRN01456).",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4th Floor, No. 39/1, 33rd Cross Road, Jayanagar 4th T Block, Above Iyengar Bakery",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560041",
        addressCountry: "IN",
      },
      location: [
        {
          "@type": "Place",
          name: "Corporate office",
          address: {
            "@type": "PostalAddress",
            streetAddress: "4th Floor, No. 39/1, 33rd Cross Road, Jayanagar 4th T Block, Above Iyengar Bakery",
            addressLocality: "Bangalore",
            postalCode: "560041",
            addressCountry: "IN",
          },
        },
        {
          "@type": "Place",
          name: "Registered office",
          address: {
            "@type": "PostalAddress",
            streetAddress: "#23, 31 Main, J P Nagar 6 Phase, Behind Inchara Hotel",
            addressLocality: "Bangalore",
            postalCode: "560078",
            addressCountry: "IN",
          },
        },
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "AMFI Registration",
          identifier: "ARN-114893",
          recognizedBy: { "@type": "Organization", name: "Association of Mutual Funds in India (AMFI)" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "APMI PMS Distributor Registration",
          identifier: "APRN01456",
          recognizedBy: { "@type": "Organization", name: "Association of Portfolio Managers in India (APMI)" },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: "MyAnmol",
      publisher: { "@id": `${ORIGIN}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${meta.canonical}#webpage`,
      url: meta.canonical,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: { "@id": `${ORIGIN}/#organization` },
    },
  ];

  if (path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${ORIGIN}/#faq`,
      mainEntity: homeFaqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
