import React, { useState } from "react";
import { Link } from "react-router";

export default function SeminarInvestingPlanning() {
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
              Investing &amp; Financial Planning
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
              Investing and financial planning are essential steps towards securing your financial future. By understanding your goals and risk tolerance, you can create a personalized investment strategy that aligns your aspirations. Diversifying your portfolio and regularly reviewing your financial plan can help you navigate fluctuations and achieve long-term growth. Remember, it's never too early or too late to start planning for a more secure financial tomorrow.
            </p>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-white border border-[#C9A55A]/35 flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                📈
              </div>
              <p className="font-[var(--fd)] text-base italic text-[#1A4A2A]">
                Building a personalised path to smarter investing
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Asset Allocation", icon: "🥧", bg: "bg-[#EEF2FB]", desc: "Asset allocation is the foundation of long-term wealth management. It involves dividing investments across equities, debt, and other assets to match life goals." },
              { title: "Fiscal Fitness", icon: "🏋️", bg: "bg-[#EFF8E2]", desc: "Getting fiscally fit is like getting physically fit—it requires discipline, planning, and regular check-ups. Budgeting, reducing debt, and saving consistently are the core steps." },
              { title: "Home Buying", icon: "🏠", bg: "bg-[#FBEEDF]", desc: "Buying a home is one of life's biggest financial steps. Understanding the process, mortgage types, and common mistakes is crucial for your long-term plan." },
              { title: "Financial Blunders", icon: "💔", bg: "bg-[#FBEAF0]", desc: "Most people make avoidable money mistakes, often due to lack of planning or impulse-driven behavior. Credit misuse, poor saving habits, and emotional investing are common pitfalls." },
              { title: "Investing Woman", icon: "👩‍💼", bg: "bg-[#F4F8F5]", desc: "Women as investors bring unique perspectives and challenges to wealth building. Understanding investment types and balancing risk and return is crucial." },
              { title: "Behaviour Choices", icon: "🧠", bg: "bg-[#EEEDFE]", desc: "Our behavior shapes the foundation of every decision we make. The way we think and react influences not only daily actions but also financial outcomes." },
              { title: "Transition Planning", icon: "🔄", bg: "bg-[#E9F1F6]", desc: "Life transitions such as death, divorce, or unexpected change often bring both emotional and financial challenges. Transition planning strategies provide structure." },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                    {c.icon}
                  </div>
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