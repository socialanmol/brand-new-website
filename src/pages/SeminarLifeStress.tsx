import React, { useState } from "react";
import { Link } from "react-router";

export default function SeminarLifeStress() {
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
              Life &amp; Stress Management
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
              Effective life and stress management involves understanding both your financial and personal behaviors. Behavioral finance helps identify emotional triggers that influence spending and investment decisions, reducing financial stress. Awareness of identity theft risks adds a layer of security, preventing anxiety from potential losses. Prioritizing stress health through mindful planning, exercise, and financial literacy promotes overall well-being.
            </p>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-white border border-[#C9A55A]/35 flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                🧘
              </div>
              <p className="font-[var(--fd)] text-base italic text-[#1A4A2A]">
                Bringing clarity and calm to your financial decisions
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
                title: "Behaviour Foundation",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
                desc: "Strikingly, 97% of people lack a written financial plan, which explains why impulsive behavior often drives financial choices rather than strategy. Ultimately, our ingrained financial behavior is the key determinant shaping our long-term financial outcomes.",
              },
              {
                title: "Identity Theft",
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
                desc: "Identity theft causes catastrophic financial losses and severe emotional distress. As our information is constantly vulnerable, understanding attack methods, implementing prevention, and knowing recovery steps are absolutely essential.",
              },
              {
                title: "Stress Health",
                img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
                desc: "Stress severely impacts both physical and financial stability, often leading to poor outcomes in both areas. To maintain well-being and control, it's vital to understand its root causes and apply practical stress management techniques.",
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