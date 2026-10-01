import React, { useState } from "react";
import { Link } from "react-router";
import mohitBajaj from "@/imports/mohit_bajaj.jpg";
import maheshBajaj from "@/imports/mahesh_bajaj.jpg";
import sureshBajaj from "@/imports/suresh_bajaj.jpg";
import karthikeyan from "@/imports/karthikeyan.jpg";
import yashma from "@/imports/yashma.jpg";
import devansh from "@/imports/devansh.jpg";
import madhu from "@/imports/madhu.png";
import raghavendra from "@/imports/raghavendra.png";
import vinod from "@/imports/vinod_n_s.png";
import indhumathi from "@/imports/indhumathi_g.png";
import pratap from "@/imports/pratap_behura.png";
import prachi from "@/imports/prachi_bajaj.png";
import adithya from "@/imports/adithya.png";
import adhi from "@/imports/adhisheshan.png";
import silky from "@/imports/silky.png";
import vidyadheesha from "@/imports/vidyadheesha.png";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
  monogram?: string;
  bio: string;
}

const FOUNDERS: TeamMember[] = [
  {
    name: "Mahesh Bajaj",
    role: "Founder",
    department: "Founder & Market Strategy Expert",
    image: maheshBajaj,
    bio: "A highly respected financial and stock market expert with over 45 years of experience across diverse market cycles. Known for his disciplined approach and deep market understanding. he has guided investors toward sustainable wealth creation. At MyAnmol, he brings invaluable perspective and stability to strategic decision-making.",
  },
  {
    name: "Suresh Bajaj",
    role: "Founder",
    department: "Founder & Stock Market Expert",
    image: sureshBajaj,
    bio: "A seasoned financial and stock market expert known for his sharp market intuition and practical investment approach. With over 40 years of hands-on experience, he brings a dynamic perspective to market movements, combining analytical thinking with real-time decision-making at MyAnmol.",
  },
  {
    name: "Karthikeyan Sathyaseelan",
    role: "Director",
    department: "Founder and Director - Insurance Brokers",
    image: karthikeyan,
    bio: "A Fellow Chartered Accountant with over 15 years of experience in financial advisory, specializing in insurance planning and risk management. He focuses on building robust protection strategies grounded in clarity, trust, and long-term value for clients.",
  },
];

const SENIOR_LEADERSHIP: TeamMember[] = [
  {
    name: "Yashma Muthanna",
    role: "Director",
    department: "Director and Partner - Insurance Brokers",
    image: yashma,
    bio: "A Chartered Accountant with over 15 years of professional experience, including 5 years in the global insurance industry. She brings deep expertise across audit, financial management, and reinsurance, designing structured, reliable risk solutions with precision.",
  },
  {
    name: "Devansh Agarwal",
    role: "Wealth Partner",
    department: "Chartered Accountant & Financial Strategist",
    image: devansh,
    bio: "A Chartered Accountant, Mutual Fund Distributor, and Financial Strategist with over 8 years of experience across Ernst & Young and Goldman Sachs. He blends strong technical expertise with a client-first mindset, building long-term strategies aligned with each client's evolving goals.",
  },
];

const ADVISORY_TEAM: TeamMember[] = [
  {
    name: "Madhu Shree C",
    role: "Mutual Funds",
    department: "Executive Customer and Support",
    image: madhu,
    bio: "Madhu is a Mutual Fund Operations professional with 3 years of experience in customer support, client servicing, transaction processing, and operational activities. She handles client queries, ensures accurate processing, and coordinates effectively to deliver timely and efficient service.",
  },
  {
    name: "Raghavendra.B",
    role: "Equity Trading",
    department: "Sr. Operations Executive",
    image: raghavendra,
    bio: "An Experienced Stock Market Dealer and Back Office Executive with 22 years of experience in trade execution, client support, order processing, account opening, KYC documentation, and maintaining accurate records. Skilled in trading and demat-related operations.",
  },
  {
    name: "Vinod N S",
    role: "Equity Trading",
    department: "Senior Operations Executive",
    image: vinod,
    bio: "Vinod is an experienced professional in the financial markets industry with over 19 years of experience in client relationship management and financial operations.",
  },
  {
    name: "Indhumathi G",
    role: "Mutual Funds",
    department: "Executive Customer Support & Operations",
    image: indhumathi,
    bio: "Indhumathi has 1 year of experience in the mutual fund industry. She specializes in client servicing, KYC processes, transactions, documentation, and operational coordination, ensuring accuracy, compliance, and timely resolution of customer requirements.",
  },
  {
    name: "Pratap Kumar Behura",
    role: "Insurance",
    department: "Insurance Executive",
    image: pratap,
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
    monogram: "MG",
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
    bio: "Silky is a Business Operations Executive at Anmol Share Broking Private Limited, handling overall client coordination, business operations, digital marketing, and customer engagement activities to support smooth workflow and business growth.",
  },
  {
    name: "Vidyadheesha HR",
    role: "Mutual Funds",
    department: "Research and Client Relationship Manager",
    image: vidyadheesha,
    bio: "Vidyadheesha is a finance professional with a strong understanding of markets, investments, and wealth management. He combines analytical thinking with a practical approach, while staying updated on market developments. Known for being dependable, approachable, and collaborative.",
  },
  {
    name: "Vinaya Kumari",
    role: "Team Member",
    department: "Team Member",
    monogram: "VK",
    bio: "Part of the MyAnmol team, supporting the organisation's mission to make financial services more accessible and client-focused.",
  },
];

export default function OurTeam() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased">
      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-3">
            Anmol Share Broking Pvt Ltd
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            The people behind <br />
            <em className="text-[#8DC63F] not-italic italic font-serif">MyAnmol</em>
          </h1>
          <div className="w-14 h-0.5 bg-[#8DC63F] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Chartered Accountants, insurance specialists, and market professionals — with a combined experience measured in decades rather than years.
          </p>
        </div>
      </header>

      {/* FOUNDER / CEO SPOTLIGHT */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F]">
              Leadership
            </span>
            <div className="flex-1 h-px bg-[rgba(26,59,159,0.12)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] bg-gradient-to-br from-[#091540] to-[#0D1E52] rounded-3xl overflow-hidden shadow-xl border border-[rgba(26,59,159,0.2)] text-white">
            <div className="relative aspect-[4/5] md:aspect-auto min-h-[320px] bg-[#0D1E52]">
              <img
                src={mohitBajaj}
                alt="Mohit Bajaj"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-[10.5px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
                Chief Executive Officer
              </span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 text-white">
                Mohit Bajaj
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-5">
                Chief Executive Officer
              </p>
              <div className="w-10 h-0.5 bg-[#8DC63F] mb-6" />
              <p className="text-[15px] sm:text-[16px] text-white/80 font-light leading-relaxed">
                Mohit Bajaj is a visionary Chartered Accountant with 19+ years of excellence in the financial services industry, mastering investments, financial planning, portfolio strategy, and risk management. As the driving force behind MyAnmol, he blends sharp insight with a client-first philosophy to deliver transformative financial outcomes. Known for empowering individuals to achieve financial independence, he has impacted countless lives through advisory and nationwide sessions. An All India ranker in the CA program, Mohit is equally passionate about mentoring, having shaped over 300 future professionals with his guidance and leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS & DIRECTORS */}
      <section className="py-14 sm:py-20 bg-[#EEF2FB]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F]">
              Founders &amp; Directors
            </span>
            <div className="flex-1 h-px bg-[rgba(26,59,159,0.12)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDERS.map((member, idx) => (
              <article
                key={idx}
                className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#EEF2FB] relative">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block self-start text-[9.5px] font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full mb-3">
                    {member.department}
                  </span>
                  <h3 className="font-[var(--fd)] text-xl font-bold text-[#111827] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[11.5px] font-bold text-[#6B7280] uppercase tracking-wide mb-4">
                    {member.role}
                  </p>
                  <div className="w-8 h-0.5 bg-[#8DC63F] mb-4" />
                  <p className="text-sm text-[#4B5563] font-light leading-relaxed mt-auto">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F]">
              Senior Leadership
            </span>
            <div className="flex-1 h-px bg-[rgba(26,59,159,0.12)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SENIOR_LEADERSHIP.map((member, idx) => (
              <article
                key={idx}
                className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#EEF2FB] relative">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block self-start text-[9.5px] font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full mb-3">
                    {member.department}
                  </span>
                  <h3 className="font-[var(--fd)] text-xl font-bold text-[#111827] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[11.5px] font-bold text-[#6B7280] uppercase tracking-wide mb-4">
                    {member.role}
                  </p>
                  <div className="w-8 h-0.5 bg-[#8DC63F] mb-4" />
                  <p className="text-sm text-[#4B5563] font-light leading-relaxed mt-auto">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY & RESEARCH TEAM */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-t border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F]">
              Advisory &amp; Operations
            </span>
            <div className="flex-1 h-px bg-[rgba(26,59,159,0.12)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVISORY_TEAM.map((member, idx) => (
              <article
                key={idx}
                className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#EEF2FB] relative flex items-center justify-center text-[#1A3B9F] font-[var(--fd)] text-3xl font-extrabold select-none">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      style={
                        member.name === "Madhu Shree C"
                          ? { transform: "translateY(14px) scale(1.18)" }
                          : member.name === "Adhi Sheshan D"
                            ? { objectPosition: "25% center" }
                            : undefined
                      }
                    />
                  ) : (
                    member.monogram
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="inline-block self-start text-[9px] font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-2.5 py-1 rounded-full mb-2">
                    {member.department}
                  </span>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#111827] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-3">
                    {member.role}
                  </p>
                  <div className="w-6 h-0.5 bg-[#8DC63F] mb-3" />
                  <p className="text-xs sm:text-[13px] text-[#4B5563] font-light leading-relaxed mt-auto">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE / VIDEO BANNER */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] min-h-[340px] flex items-center justify-center text-center p-8 text-white shadow-xl">
            {videoOpen ? (
              <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="MyAnmol Culture"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8DC63F] text-[#091540] flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play culture video"
                >
                  <svg className="w-8 h-8 ml-1 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <h3 className="font-[var(--fd)] text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  Life at <em className="text-[#8DC63F] not-italic italic font-serif">MyAnmol</em>
                </h3>
                <p className="text-xs uppercase tracking-[.18em] font-semibold text-white/60">
                  Transparency · Needs-First Advisory · Ongoing Client Care
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-14 sm:py-18 bg-[#091540] text-center text-white/70">
        <div className="max-w-xl mx-auto px-6">
          <div className="font-[var(--fd)] text-2xl font-bold text-white mb-2">
            Work with Our Advisory Team
          </div>
          <p className="text-sm font-light leading-relaxed mb-6">
            Get personalized guidance for your mutual funds, insurance covers, or specialized investment funds.
          </p>
          <Link
            to="/wp/review"
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-7 py-3 rounded-full transition-all shadow-md"
          >
            Book a Consultation →
          </Link>
          <p className="mt-8 text-xs text-white/40">
            © {new Date().getFullYear()} Anmol Share Broking Pvt. Ltd. · AMFI ARN 114893
          </p>
        </div>
      </section>
    </div>
  );
}