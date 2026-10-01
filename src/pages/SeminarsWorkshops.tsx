import React from "react";
import { Link } from "react-router";

export default function SeminarsWorkshops() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Learn With Us
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Seminars &amp; <span className="text-[#8DC63F] italic">Workshops.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Live sessions and structured programs to help you plan with clarity — pick a topic below to get started.
          </p>
        </div>
      </section>

      {/* SEMINARS LIST */}
      <section className="py-16 sm:py-24 max-w-[1100px] mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Seminars
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
            Topics we cover
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div
              className="min-h-[240px] bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80')" }}
            />
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-3">
                Plan Your Retirement &amp; Estate with Confidence
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
                Planning for retirement isn't just about saving — it's about making smart choices today for a stress-free tomorrow.
              </p>
              <Link
                to="/insights/seminars/retirement-estate-planning"
                className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-xs px-6 py-3 rounded-full transition-all shadow-sm w-fit"
              >
                Learn More →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div
              className="min-h-[240px] bg-cover bg-center md:order-2"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')" }}
            />
            <div className="p-8 sm:p-10 flex flex-col justify-center md:order-1">
              <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-3">
                Master Your Money with Smarter Investing &amp; Financial Planning
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
                Financial success isn't just about earning — it's about managing and multiplying your wealth wisely.
              </p>
              <Link
                to="/insights/seminars/investing-financial-planning"
                className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-xs px-6 py-3 rounded-full transition-all shadow-sm w-fit"
              >
                Learn More →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div
              className="min-h-[240px] bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80')" }}
            />
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-3">
                Balance Your Life, Protect Your Peace
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
                Life brings challenges, but the right strategies can help you handle them with clarity and confidence.
              </p>
              <Link
                to="/insights/seminars/life-stress-management"
                className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-xs px-6 py-3 rounded-full transition-all shadow-sm w-fit"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSHOPS SECTION */}
      <section className="py-16 sm:py-24 bg-[#F8FAFE] border-t border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8A6030] block mb-2">
            Workshops
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-12">
            Featured Professional Certificates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 max-w-xl mx-auto">
            <div className="bg-white border border-[rgba(26,59,159,0.15)] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DC63F] bg-[#EFF8E2] px-3 py-1 rounded-full inline-block mb-4">
                  Certification Course
                </span>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-3">
                  Financial Fitness Professional Certificate
                </h3>
                <p className="text-sm text-[#4B5563] font-light leading-relaxed mb-6">
                  A self-paced certificate programme covering budgeting, mutual funds, SIPs, insurance, and tax planning. Built for first-time investors with no prior experience required.
                </p>
              </div>

              <Link
                to="/insights/workshops/financial-fitness-certificate"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm py-3.5 rounded-full transition-all shadow-md"
              >
                View Course &amp; Enroll →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}