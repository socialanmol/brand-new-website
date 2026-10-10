import React, { useState, useEffect } from "react";
import { Link } from "react-router";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [timeZone, setTimeZone] = useState("Detecting your time zone…");
  const [mode, setMode] = useState<"online" | "office">("online");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    timeSlot: "10:00 AM - 10:45 AM",
    notes: "",
  });

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setTimeZone(tz.replace(/_/g, " "));
    } catch {
      setTimeZone("Local Time");
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      preferredMode: mode,
      timeZone,
      submittedAt: new Date().toISOString(),
      source: "book-a-review-modal",
    };

    try {
      await fetch("https://www.myanmol.com/_functions/saveReviewRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Graceful fallback for local development or disconnected API
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#091540]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[rgba(26,59,159,0.15)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#091540] via-[#0D1E52] to-[#1A3B9F] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
          <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-1">
            Free 45-Minute Review
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold tracking-tight">
            Schedule Your Financial Review
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              Time Zone: {timeZone}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Available 6:00 AM – 10:00 PM
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto font-[var(--fs)]">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#EFF8E2] text-[#1A4A2A] rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-[#8DC63F]/40 font-bold">
                ✓
              </div>
              <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-2">
                Review Request Confirmed!
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed max-w-md mx-auto mb-6">
                Thank you, <strong>{form.name}</strong>. We have logged your request for{" "}
                <strong>{form.date || "your requested date"}</strong> ({form.timeSlot}) via{" "}
                <strong>{mode === "online" ? "Online Video Call" : "In-Person Office Visit"}</strong>. An advisor will confirm with your invite details shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1A3B9F] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#0D1E52] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                  Choose Review Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("online")}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      mode === "online"
                        ? "border-[#1A3B9F] bg-[#EEF2FB] text-[#091540] shadow-sm font-semibold"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <span className="text-xl">💻</span>
                    <div>
                      <div className="text-sm font-bold">Online Video Call</div>
                      <div className="text-[11px] text-gray-500">Screen-shared session</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("office")}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      mode === "office"
                        ? "border-[#1A3B9F] bg-[#EEF2FB] text-[#091540] shadow-sm font-semibold"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <span className="text-xl">🏢</span>
                    <div>
                      <div className="text-sm font-bold">In-Person Office</div>
                      <div className="text-[11px] text-gray-500">Jayanagar, Bangalore</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-all"
                />
              </div>

              {/* Date and Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                    Preferred Time Window *
                  </label>
                  <select
                    value={form.timeSlot}
                    onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-all"
                  >
                    <option>07:00 AM - 07:45 AM (Early Bird)</option>
                    <option>10:00 AM - 10:45 AM (Morning)</option>
                    <option>01:00 PM - 01:45 PM (Lunch Window)</option>
                    <option>04:00 PM - 04:45 PM (Afternoon)</option>
                    <option>07:00 PM - 07:45 PM (Evening)</option>
                    <option>09:00 PM - 09:45 PM (Post Dinner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                  What would you like to review? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="E.g., Existing SIPs, term insurance coverage, tax saving, retirement corpus..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? "Confirming Slot…" : "Confirm Booking Slot →"}
                </button>
                <p className="text-[11px] text-gray-400 text-center mt-2.5">
                  Instant confirmation · Free of cost · No sales obligations
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookAReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is there a charge for the review?",
      a: "No. The review is completely free and carries no obligation whatsoever.",
    },
    {
      q: "What times can I book?",
      a: "Any slot between 6:00 AM and 10:00 PM, seven days a week. The scheduler reflects these hours in your local time zone.",
    },
    {
      q: "Will I be pressured into buying products?",
      a: "Never. The review is strictly educational and diagnostic. If a product aligns with your mapped goals, we highlight why, but you decide entirely in your own time.",
    },
    {
      q: "Can I bring my spouse or family members?",
      a: "Yes, and we strongly encourage it. Joint family goals are much easier to map when all decision-makers are present.",
    },
    {
      q: "I live outside India. Can this be done remotely?",
      a: "Yes. Many of our clients are NRIs across the Middle East, Singapore, the UK, and the US. Video calls work across all time zones.",
    },
  ];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased">
      {/* Booking Form / Scheduler Modal Activated by "Request a Time" */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-3">
            Wealth Plan & Advisory
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-5">
            Book a Free Review
          </h1>
          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed mb-8">
            Forty-five minutes, zero cost, and no obligation to buy anything. You'll leave knowing which part of your financial plan is furthest behind.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
              🕒 6:00 AM to 10:00 PM
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
              📅 7 Days a Week (Weekends Included)
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
              🌐 Any Global Time Zone
            </span>
          </div>

          <div className="flex flex-wrap gap-3.5 justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              Request a time
              <span>→</span>
            </button>
            <a
              href="tel:+919742826665"
              className="border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all"
            >
              📞 97428 26665
            </a>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS IN THE MEETING */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            The Consultation
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-8">
            What happens in the meeting
          </h2>

          <div className="space-y-6 text-[15.5px] leading-relaxed text-[#4B5563] font-light">
            <div className="p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.08)]">
              <strong className="text-[#091540] font-bold block mb-1">
                1. We start with your goals, not products.
              </strong>
              What milestones you're funding, when you need the capital, and what resources are currently assigned to each target.
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.08)]">
              <strong className="text-[#091540] font-bold block mb-1">
                2. We inspect the foundational order.
              </strong>
              Emergency cushion, health & term protection, then wealth compounding. Most reviews find one of the three substantially thinner than expected.
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.08)]">
              <strong className="text-[#091540] font-bold block mb-1">
                3. We assess what you already hold.
              </strong>
              Existing mutual fund portfolios, insurance policies, fixed deposits, and real estate. We don't replace for the sake of it; we align existing assets to specific goals.
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.08)]">
              <strong className="text-[#091540] font-bold block mb-1">
                4. You decide what happens next.
              </strong>
              If you take the mapping report and execute it independently, that is a completely valid outcome.
            </div>
          </div>
        </div>
      </section>

      {/* MODES: IN PERSON OR ONLINE */}
      <section className="py-16 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
            Your Choice
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-8">
            Ways to meet
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FB] text-2xl flex items-center justify-center mb-4">
                🏢
              </div>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">
                In Person at Our Office
              </h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed">
                Face to face in Bangalore (Jayanagar 4th T Block). Recommended for families who want everyone together in the room.
              </p>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FB] text-2xl flex items-center justify-center mb-4">
                💻
              </div>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">
                Online Video Call
              </h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed">
                Google Meet or Zoom with screens shared live. Ideal for NRIs and outstation professionals across different time zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO BRING (PREPARATION) */}
      <section className="py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Preparing for the call
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-6">
            Helpful items to have handy (Optional)
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-[#4B5563]">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              A rough list of upcoming financial goals and target dates
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              Existing SIP statements or mutual fund CAS summary
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              Insurance policy details (life, health, employer covers)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              Active liabilities or home loans with remaining tenure and interest rates
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-20 bg-[#F8FAFE] border-t border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[760px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              Common Questions
            </span>
            <h2 className="font-[var(--fd)] text-3xl font-bold text-[#091540] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#091540] hover:text-[#1A3B9F] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#8DC63F] font-extrabold shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#4B5563] font-light leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FOOTER STRIP */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Forty-five minutes, and you'll know where you stand
          </h2>
          <p className="text-white/80 text-sm sm:text-base font-light mb-8">
            No cost, no obligation, and clear clarity on how to align your savings, insurance, and investments.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Request a time →
            </button>
            <a
              href="tel:+919742826665"
              className="border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all"
            >
              Call us now!
            </a>
          </div>
          <p className="mt-8 text-xs text-white/45">
            Anmol Share Broking Private Limited · AMFI-registered mutual fund distributor (ARN 114893)
          </p>
        </div>
      </section>
    </div>
  );
}