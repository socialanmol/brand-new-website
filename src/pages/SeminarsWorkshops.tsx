import React from "react";
import { Link } from "react-router";

export default function SeminarsWorkshops() {
  const pillars = [
    {
      title: "Personal finance and money management",
      description: "High priority audience building entry-level masterclasses focusing on monthly take-home pay, smart budgeting, debt management, and initial savings.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      badge: "Monthly Masterclass",
      link: "/insights/seminars/personal-finance-money-management"
    },
    {
      title: "Mutual funds and wealth creation",
      description: "High priority business-conversion series covering SIP vs lumpsum, asset allocation, portfolio reviews, and long-term compounding strategies.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
      badge: "Core Wealth Series",
      link: "/insights/seminars/mutual-funds-wealth-creation"
    },
    {
      title: "Financial planning and life goals",
      description: "Goal-based planning moving beyond products to outcomes, covering retirement planning, children's education, dream homes, and estate planning.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      badge: "Goal Planning",
      link: "/insights/seminars/financial-planning-life-goals"
    },
    {
      title: "Insurance and financial protection",
      description: "Comprehensive cross-selling and protection programs covering term insurance, health insurance adequacy, medical emergencies, and safety nets.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      badge: "Save · Insure · Invest",
      link: "/insights/seminars/insurance-financial-protection"
    },
    {
      title: "Specialised audiences and niche communities",
      description: "Niche acquisition programs tailored for doctors, medical professionals, healthcare entrepreneurs, teachers, women, NRIs, and business owners.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      badge: "Special Editions",
      link: "/insights/seminars/specialised-audiences-niche"
    }
  ];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            MyAnmol Webinar Academy
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Seminars &amp; <span className="text-[#8DC63F] italic">Pillars.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Explore our five core educational pillars designed to attract, build trust, and guide your wealth creation journey.
          </p>
        </div>
      </section>

      {/* SEMINARS PILLARS LIST */}
      <section className="py-16 sm:py-24 max-w-[1100px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Core Curriculum
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
            The Five Webinar Pillars
          </h2>
        </div>

        <div className="space-y-6">
          {pillars.map((pillar, index) => {
            const isEven = index % 2 === 1;
            return (
              <div 
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className={`min-h-[240px] bg-cover bg-center ${isEven ? 'md:order-2' : ''}`}
                  style={{ backgroundImage: `url('${pillar.image}')` }}
                />
                <div className={`p-8 sm:p-10 flex flex-col justify-center ${isEven ? 'md:order-1' : ''}`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A3B9F] bg-[#EEF2FB] px-3 py-1 rounded-full inline-block mb-4 w-fit">
                    {pillar.badge}
                  </span>
                  <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                  <Link
                    to={pillar.link}
                    className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-xs px-6 py-3 rounded-full transition-all shadow-sm w-fit"
                  >
                    Explore Pillar Topics →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}