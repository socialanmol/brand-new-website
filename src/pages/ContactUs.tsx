import React, { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const phoneOk = /^[0-9]{10}$/.test(phone.trim());

    if (!name.trim() || !emailOk || !phoneOk || !message.trim()) {
      setErrorMsg(
        !phoneOk
          ? "Please enter a valid 10-digit phone number."
          : !emailOk
          ? "Please enter a valid email address."
          : "Please fill in all fields before submitting."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          source: "contact-page",
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMsg(body.error || "We could not send your message. Please try again.");
        return;
      }
      setIsSubmitted(true);
    } catch {
      setErrorMsg("We could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Get In Touch
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Have questions or ready to get started? We're here to help.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <section className="py-16 sm:py-24 max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          {/* CONTACT INFO CARDS */}
          <div className="space-y-4">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 flex gap-4 items-start shadow-sm">
              <div className="w-11 h-11 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-xl shrink-0">
                🏢
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-1">
                  Corporate Address
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                  4th Floor, No. 39/1, 33rd Cross Road, Jayanagar 4th T Block, Above Iyengar Bakery, Bangalore 560041
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 flex gap-4 items-start shadow-sm">
              <div className="w-11 h-11 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-xl shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-1">
                  Registered Address
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                  #23, 31 Main, J P Nagar 6 Phase, Behind Inchara Hotel, Bangalore 560078
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 flex gap-4 items-start shadow-sm">
              <div className="w-11 h-11 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-xl shrink-0">
                ✉️
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-1">
                  Email ID
                </h3>
                <a
                  href="mailto:mutualfunds@myanmol.com"
                  className="text-sm font-bold text-[#1A3B9F] hover:underline block"
                >
                  mutualfunds@myanmol.com
                </a>
              </div>
            </div>

            <a
              href="tel:+919742826665"
              className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 flex gap-4 items-center shadow-sm no-underline"
            >
              <div className="w-11 h-11 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-xl shrink-0">
                📞
              </div>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
                Phone Number
              </h3>
            </a>

            <a
              href="https://wa.me/919986011100"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 flex gap-4 items-center shadow-sm no-underline"
            >
              <div className="w-11 h-11 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#128C7E">
                  <path d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
                </svg>
              </div>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
                WhatsApp
              </h3>
            </a>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 shadow-sm">
            {!isSubmitted ? (
              <div>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-2">
                  Send Us a Message
                </h3>
                <p className="text-xs text-gray-500 font-light mb-6">
                  Fill in your details and we'll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#1A3B9F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Email ID
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#1A3B9F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#1A3B9F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#1A3B9F] focus:outline-none resize-vertical"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm py-3.5 rounded-full shadow-md transition-all cursor-pointer mt-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message →"}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3 font-light">
                    We typically respond within one business day.
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#8DC63F] text-[#091540] text-2xl flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                  ✓
                </div>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-[#4B5563] font-light">
                  Thanks for reaching out — a member of our team will get back to you shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="pb-20 max-w-[1100px] mx-auto px-6">
        <div className="mb-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8A6030] block mb-2">
            Find Us
          </span>
          <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540]">
            Our Corporate Office
          </h3>
        </div>
        <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-gray-200 shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d578.0606610592256!2d77.5866403425724!3d12.926152107823855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e498a9dce9%3A0x999c621f01ebf7cc!2sAnmol%20Share%20Broking%20Pvt%20Ltd%20(MyAnmol%20Group)!5e0!3m2!1sen!2sin!4v1787897470757!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="MyAnmol Corporate Office Map"
          />
        </div>
      </section>
    </div>
  );
}