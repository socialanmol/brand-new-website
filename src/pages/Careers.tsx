import React, { useState } from "react";

const ROLES = [
  {
    num: "01",
    title: "Client Service Intern",
    tasks: [
      "Assist Wealth Advisors with client onboarding and account maintenance",
      "Prepare client meeting materials and presentations",
      "Respond to basic client inquiries via phone or email",
      "Assist with client service requests (e.g., address changes, account transfers)",
      "Maintain accurate and up-to-date CRM data",
    ],
    skills: [
      "Excellent communication and interpersonal skills",
      "Strong organizational and time management abilities",
      "Proficient in Microsoft Office Suite (Word, Excel, PowerPoint)",
      "Detail-oriented and accurate",
    ],
  },
  {
    num: "02",
    title: "Financial Planning Intern",
    tasks: [
      "Gather client financial data and prepare financial needs analyses",
      "Assist with cash flow analysis, budgeting, and debt management",
      "Research and analyze retirement planning tools and strategies",
      "Help develop basic financial plans for clients under advisor supervision",
      "Stay updated on relevant financial regulations and tax laws",
    ],
    skills: [
      "Strong analytical and problem-solving skills",
      "Proficiency in financial modeling and spreadsheet software",
      "Ability to understand and explain complex financial concepts",
      "Interest in financial planning and retirement strategies",
    ],
  },
  {
    num: "03",
    title: "Mutual Fund Investment Research Intern",
    tasks: [
      "Conduct research on stocks, bonds, mutual funds, and other investment products",
      "Analyze market trends and economic data",
      "Prepare investment research reports for internal use",
      "Assist with portfolio analysis and construction under advisor guidance",
      "Stay updated on current market events and industry news",
    ],
    skills: [
      "Strong research and analytical skills",
      "Ability to interpret financial data and reports",
      "Knowledge of financial markets and investment principles",
      "Excellent written and presentation skills",
    ],
  },
  {
    num: "04",
    title: "Marketing & Communications Intern",
    tasks: [
      "Assist with developing marketing materials for wealth management services",
      "Manage social media channels and create content for client engagement",
      "Conduct market research and competitor analysis",
      "Support with event planning and client relationship building initiatives",
    ],
    skills: [
      "Strong communication, writing, and editing skills",
      "Creativity and proficiency in design software",
      "Analytical skills and understanding of marketing principles",
    ],
  },
  {
    num: "05",
    title: "Compliance Intern",
    tasks: [
      "Assist with regulatory compliance tasks for the firm",
      "Research and stay updated on relevant financial regulations",
      "Review client documentation and ensure adherence to KYC/AML procedures",
      "Prepare reports and presentations on compliance topics",
    ],
    skills: [
      "Strong attention to detail and accuracy",
      "Ability to understand and interpret complex regulations",
      "Strong work ethic and commitment to ethical practices",
    ],
  },
  {
    num: "06",
    title: "Technology Intern",
    tasks: [
      "Data Management: Assist with organizing and analyzing financial data for client portfolios",
      "Platform Support: Help maintain internal wealth management software and client portals",
      "Testing & QA: Support testing of new features across our technology platforms",
      "Automation: Explore and recommend tools to automate routine tasks",
    ],
    skills: [
      "Technical Basics: Strong Excel skills, familiarity with Python, R, SQL, or VBA preferred",
      "Analytical Mindset: Excellent analytical and problem-solving abilities",
      "Adaptability: Eagerness to learn new technologies and financial concepts quickly",
    ],
  },
  {
    num: "07",
    title: "Human Resource",
    tasks: [
      "Provide operational support to the firm by managing all human assets and work on hand",
      "Responsible for completion of work for all employees & interns",
    ],
    skills: [
      "Strong organizational and people-management skills",
      "Reliable, discreet, and detail-oriented",
    ],
  },
];

export default function Careers() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Careers at MyAnmol
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Start your journey in <span className="text-[#8DC63F]">wealth management.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            We're looking for curious, driven interns across client service, financial planning, research, marketing, compliance, and technology. Real work, real exposure, and a front-row seat to how financial guidance actually gets built.
          </p>

          <div className="bg-[#EFF8E2]/10 border border-[#8DC63F]/30 rounded-2xl p-4 max-w-xl mx-auto text-xs sm:text-sm text-white/90">
            <strong>Please note:</strong> We do not offer paid internships. You will be rewarded if the company gets new business revenue from your end only.
          </div>
        </div>
      </section>

      {/* VIDEO EXPLANATION */}
      <section className="py-16 bg-[#091540] text-white px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
            Watch Before You Apply
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold mb-6">
            How to register for an internship
          </h2>

          <div className="bg-[#C9A55A]/15 border border-[#C9A55A]/30 rounded-2xl p-4 mb-8 text-left flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-sm font-semibold text-[#DFC07A]">
              Please watch the video below carefully and scan the QR code at the end of the video to register for the internship in your preferred field!
            </p>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-4">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/vGS2XYJfPLw"
              title="MyAnmol Internship Registration"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-white/50 italic">
            Registration happens via the QR code shown at the end of the video — not through this page directly.
          </p>
        </div>
      </section>

      {/* OPEN ROLES ACCORDION */}
      <section className="py-16 sm:py-24 max-w-[900px] mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Open Roles
          </span>
          <h2 className="font-[var(--fd)] text-3xl font-bold text-[#091540]">
            Internship opportunities
          </h2>
        </div>

        <div className="space-y-4">
          {ROLES.map((role, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all bg-white shadow-sm ${
                  isOpen ? "border-[#C9A55A]" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-[var(--fd)] text-lg font-bold text-[#C9A55A]">
                      {role.num}
                    </span>
                    <span className="font-bold text-base text-[#111827]">
                      {role.title}
                    </span>
                  </div>
                  <span className="text-xl font-light text-gray-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-[#4B5563]">
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A6030] mb-3">
                        Tasks
                      </h4>
                      <ul className="space-y-2">
                        {role.tasks.map((t, i) => (
                          <li key={i} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#C9A55A]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A6030] mb-3">
                        Skills
                      </h4>
                      <ul className="space-y-2">
                        {role.skills.map((s, i) => (
                          <li key={i} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[#C9A55A]">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ETHOS STRIP */}
      <section className="py-16 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <p className="font-[var(--fd)] text-xl sm:text-2xl italic text-white/90 leading-relaxed">
            "Everything at MyAnmol is built on one idea - <strong className="text-[#8DC63F] font-normal not-italic font-bold">Save · Insure · Invest · Grow</strong>, for a Happy Future. As an intern, you'll live that philosophy in real client work."
          </p>
        </div>
      </section>
    </div>
  );
}