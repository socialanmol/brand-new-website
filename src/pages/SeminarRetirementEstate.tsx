import React, { useState } from "react";
import { Link } from "react-router";

export default function SeminarRetirementEstate() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="py-12 sm:py-16 max-w-[1180px] mx-auto px-6">
        <Link
          to="/insights/seminars"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3B9F] mb-8 hover:underline"
        >
          ← Back to Seminars &amp; Workshops
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8A6030] block mb-3">
              Seminar
            </span>
            <h1 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-4">
              Retirement &amp; Estate Planning
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
              Retirement and estate planning are essential components of securing financial future and ensuring that your wishes are honored. By preparing for retirement, you can enjoy the lifestyle you desire while also setting aside resources for your loved ones. Estate planning involves organizing assets and making important decisions about their distribution, providing peace of mind for both you and your family. Start planning today to create a legacy that reflects your values and priorities.
            </p>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-white border border-[#C9A55A]/35 flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                📊
              </div>
              <p className="font-[var(--fd)] text-base italic text-[#1A4A2A]">
                Presenting your path to a secure retirement
              </p>
            </div>
          </div>

          {/* SIGNUP CARD */}
          <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 sticky top-24 shadow-sm text-center">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-2">
              Register for Our Upcoming Webinars
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mb-6">
              Subscribe to our webinar &amp; seminar updates by submitting your mail ID.
            </p>

            {!subscribed ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 text-left">
                  Enter your email here *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm mb-4 focus:border-[#1A3B9F] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Sign Up →
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                ✓ Thanks for subscribing! You'll receive updates for our next seminar.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COURSES OFFERED */}
      <section className="py-16 sm:py-24 bg-[#F8FAFE] border-t border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              Curriculum
            </span>
            <h2 className="font-[var(--fd)] text-3xl font-bold text-[#091540]">
              Courses Offered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Retirement Income",
                img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80",
                desc: "Planning for retirement means ensuring your money lasts as long as you do. Aligning investments with short-, mid-, and long-term goals is key. Strategies like smart asset allocation and sustainable withdrawal plans protect against inflation, interest rate changes, and market risks.",
              },
              {
                title: "Retirement Strategies",
                img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=500&q=80",
                desc: "A strong retirement strategy goes beyond savings—it's about sustaining income for decades. Managing risks, interest rates, and inflation plays a central role. Approaches like the bucket strategy help balance short-term liquidity with long-term growth.",
              },
              {
                title: "Retirement Option",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
                desc: "Exploring retirement options goes beyond saving—it's about designing the lifestyle you want. From income streams to healthcare planning, every choice matters. Balancing immediate needs with long-term goals ensures quality retirement living.",
              },
              {
                title: "Women Retirement",
                img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80",
                desc: "Women often face unique retirement challenges, especially after divorce or widowhood. Planning ahead with estate strategies and risk management provides stability. Building multiple income streams strengthens independence.",
              },
              {
                title: "Estate Planning",
                img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80",
                desc: "Estate planning ensures your wealth is distributed according to your wishes. Tools like wills and trusts prevent disputes and streamline inheritance. Planning also helps avoid probate, saving time and costs for your family.",
              },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url('${c.img}')` }} />
                <div className="p-6">
                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}