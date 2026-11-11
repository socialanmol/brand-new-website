import { matchPerson } from "./matchName";
import mohitBajaj from "@/imports/mohit_bajaj.png";
import sureshBajaj from "@/imports/Suresh Bajaj.png";
import sandhyaBajaj from "@/imports/Sandhya Bajaj.png";
import vaibhavi from "@/imports/Vaibhavi.png";
import karthikeyan from "@/imports/karthikeyan.jpg";
import yashma from "@/imports/yashma.jpg";
import khusbhoo from "@/imports/khushboo_bajaj.png";
import devansh from "@/imports/devansh_agarwal.png";
import madhu from "@/imports/Madhu Shree C.png";
import raghavendra from "@/imports/Raghavendra B.png";
import vinod from "@/imports/Vinod N S.png";
import indhumathi from "@/imports/Indhumathi G (2).png";
import pratap from "@/imports/Pratap Behura (1).png";
import prachi from "@/imports/prachi_bajaj.png";
import adithya from "@/imports/adithya.png";
import adhi from "@/imports/adhisheshan.png";
import silky from "@/imports/Silky Kedia.png";
import vidyadheesha from "@/imports/Vidyadheesh H R.png";
import monika from "@/imports/Monika Gupta.png";
import vinaya from "@/imports/Vinaya Kumari.png";

export { mohitBajaj };

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
  monogram?: string;
  cropPortrait?: boolean;
  portraitClassName?: string;
  bio: string;
}

export const FOUNDERS: TeamMember[] = [
  {
    name: "Mahesh Bajaj",
    role: "Founder",
    department: "Founder & Market Strategy Expert",
    monogram: "MB",
    bio: "A highly respected financial and stock market expert with over 45 years of experience across diverse market cycles. Known for his disciplined approach and deep market understanding. he has guided investors toward sustainable wealth creation. At MyAnmol, he brings invaluable perspective and stability to strategic decision-making.",
  },
  {
    name: "Suresh Bajaj",
    role: "Founder",
    department: "Founder & Stock Market Expert",
    image: sureshBajaj,
    cropPortrait: true,
    bio: "A seasoned financial and stock market expert known for his sharp market intuition and practical investment approach. With over 40 years of hands-on experience, he brings a dynamic perspective to market movements, combining analytical thinking with real-time decision-making at MyAnmol.",
  },
  {
    name: "Karthikeyan Sathyaseelan",
    role: "Director",
    department: "Founder and Director - Insurance Brokers",
    image: karthikeyan,
    bio: "A Fellow Chartered Accountant with over 15 years of experience in financial advisory, specializing in insurance planning and risk management. He focuses on building robust protection strategies grounded in clarity, trust, and long-term value for clients.",
  },
  {
    name: "Sandhya Bajaj",
    role: "Founder",
    department: "Founder & Market Strategy Expert",
    image: sandhyaBajaj,
    cropPortrait: true,
    bio: "At MyAnmol, she brings invaluable perspective and stability to strategic decision-making.",
  },
];

export const SENIOR_LEADERSHIP: TeamMember[] = [
  {
    name: "Yashma Muthanna",
    role: "Director",
    department: "Director and Partner - Insurance Brokers",
    image: yashma,
    bio: "A Chartered Accountant with over 15 years of professional experience, including 5 years in the global insurance industry. She brings deep expertise across audit, financial management, and reinsurance, designing structured, reliable risk solutions with precision.",
  },
  {
    name: "Khusbhoo Bajaj",
    role: "Director",
    department: "Director and Partner - Insurance Brokers",
    image: khusbhoo,
    portraitClassName: "object-[50%_70%] origin-top scale-[1.2] group-hover:scale-[1.25]",
    bio: "A Chartered Accountant with over 15 years of professional experience, including 5 years in the global insurance industry. She brings deep expertise across audit, financial management, and reinsurance, designing structured, reliable risk solutions with precision.",
  },
  {
    name: "Devansh Agarwal",
    role: "Wealth Partner",
    department: "Chartered Accountant & Financial Strategist",
    image: devansh,
    portraitClassName: "object-[50%_70%] origin-top scale-[1.2] group-hover:scale-[1.25]",
    bio: "A Chartered Accountant, Mutual Fund Distributor, and Financial Strategist with over 8 years of experience across Ernst & Young and Goldman Sachs. He blends strong technical expertise with a client-first mindset, building long-term strategies aligned with each client's evolving goals.",
  },
];

export const ADVISORY_TEAM: TeamMember[] = [
  {
    name: "Madhu Shree C",
    role: "Mutual Funds",
    department: "Executive Customer and Support",
    image: madhu,
    cropPortrait: true,
    bio: "Madhu is a Mutual Fund Operations professional with 3 years of experience in customer support, client servicing, transaction processing, and operational activities. She handles client queries, ensures accurate processing, and coordinates effectively to deliver timely and efficient service.",
  },
  {
    name: "Raghavendra.B",
    role: "Equity Trading",
    department: "Sr. Operations Executive",
    image: raghavendra,
    cropPortrait: true,
    bio: "An Experienced Stock Market Dealer and Back Office Executive with 22 years of experience in trade execution, client support, order processing, account opening, KYC documentation, and maintaining accurate records. Skilled in trading and demat-related operations.",
  },
  {
    name: "Vinod N S",
    role: "Equity Trading",
    department: "Senior Operations Executive",
    image: vinod,
    cropPortrait: true,
    bio: "Vinod is an experienced professional in the financial markets industry with over 19 years of experience in client relationship management and financial operations.",
  },
  {
    name: "Indhumathi G",
    role: "Mutual Funds",
    department: "Executive Customer Support & Operations",
    image: indhumathi,
    cropPortrait: true,
    bio: "Indhumathi has 1 year of experience in the mutual fund industry. She specializes in client servicing, KYC processes, transactions, documentation, and operational coordination, ensuring accuracy, compliance, and timely resolution of customer requirements.",
  },
  {
    name: "Pratap Kumar Behura",
    role: "Insurance",
    department: "Insurance Executive",
    image: pratap,
    cropPortrait: true,
    bio: "A professional with 10 years of experience in broking services and insurance, building trusted financial partnerships and guiding clients toward secure, long-term wealth growth.",
  },
  {
    name: "Prachi Bajaj, CFA",
    role: "Client Advisory",
    department: "Wealth Management Officer-Client Advisory",
    image: prachi,
    bio: "Prachi is a Wealth Advisor at Anmol Share Broking. She brings experience across Goldman Sachs, venture capital, and investment research, with a strong understanding of financial markets, investments, and portfolio management.",
  },
  {
    name: "Monika Gupta",
    role: "Mutual Funds",
    department: "Financial Planner & Fund Analyst",
    image: monika,
    cropPortrait: true,
    bio: "Monika is part of the Wealth Management team, working across financial planning, mutual fund research, fund analysis, and investment research. He contributes to research-driven analysis, evaluating risk-return dynamics and investment opportunities to support long-term wealth creation strategies.",
  },
  {
    name: "Adithya Menon",
    role: "Mutual Funds",
    department: "Research & Operations Executive",
    image: adithya,
    bio: "Adithya has cleared CFA Level I and has 3+ years of experience tracking financial markets, with expertise in equity analysis, investing, and sectoral research. He brings a research-driven approach to portfolio and wealth management.",
  },
  {
    name: "Adhi Sheshan D",
    role: "Mutual Funds",
    department: "Financial Planner & Client Growth Officer",
    image: adhi,
    bio: "Adhi is a CFA Level I cleared professional with 2 years of experience closely following financial markets and studying investment opportunities across sectors. With a focus on equity research and market analysis, he brings a disciplined, research-oriented approach to portfolio management.",
  },
  {
    name: "Silky Kedia",
    role: "Mutual Funds",
    department: "Business Operations Executive",
    image: silky,
    cropPortrait: true,
    bio: "Silky is a Business Operations Executive at Anmol Share Broking Private Limited, handling overall client coordination, business operations, digital marketing, and customer engagement activities to support smooth workflow and business growth.",
  },
  {
    name: "Vidyadheesha HR",
    role: "Mutual Funds",
    department: "Research and Client Relationship Manager",
    image: vidyadheesha,
    cropPortrait: true,
    bio: "Vidyadheesha is a finance professional with a strong understanding of markets, investments, and wealth management. He combines analytical thinking with a practical approach, while staying updated on market developments. Known for being dependable, approachable, and collaborative.",
  },
  {
    name: "Vinaya Kumari",
    role: "Team Member",
    department: "Team Member",
    image: vinaya,
    cropPortrait: true,
    bio: "Part of the MyAnmol team, supporting the organisation's mission to make financial services more accessible and client-focused.",
  },
  {
    name: "Vaibhavi Vishwanath",
    role: "Wealth Management Officer-Client Advisory",
    department: "Mutual Funds",
    image: vaibhavi,
    cropPortrait: true,
    bio: "Vaibhavi a talented women, having great powers to overcome any obstacles in her life at MyAnmol.",
  },
];


export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mohit Bajaj",
    role: "Chief Executive Officer",
    department: "Chief Executive Officer",
    image: mohitBajaj,
    cropPortrait: true,
    bio: "Mohit Bajaj is a visionary Chartered Accountant with 19+ years of excellence in the financial services industry, mastering investments, financial planning, portfolio strategy, and risk management. As the driving force behind MyAnmol, he blends sharp insight with a client-first philosophy to deliver transformative financial outcomes. Known for empowering individuals to achieve financial independence, he has impacted countless lives through advisory and nationwide sessions. An All India ranker in the CA program, Mohit is equally passionate about mentoring, having shaped over 300 future professionals with his guidance and leadership.",
  },
  ...FOUNDERS,
  ...SENIOR_LEADERSHIP,
  ...ADVISORY_TEAM,
];

export function findTeamMember(name: string) {
  return matchPerson(name, TEAM_MEMBERS);
}
