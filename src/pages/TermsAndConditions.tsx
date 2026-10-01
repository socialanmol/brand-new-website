import { useEffect, useState } from "react";
import { Link } from "react-router";

const SECTIONS = [
  { id: "mt-1", num: "01", title: "Services overview" },
  { id: "mt-2", num: "02", title: "Eligibility" },
  { id: "mt-3", num: "03", title: "User accounts and security" },
  { id: "mt-4", num: "04", title: "Investment risks and disclaimers" },
  { id: "mt-5", num: "05", title: "Compliance and KYC" },
  { id: "mt-6", num: "06", title: "Intellectual property" },
  { id: "mt-7", num: "07", title: "Limitation of liability" },
  { id: "mt-8", num: "08", title: "Governing law and jurisdiction" },
  { id: "mt-9", num: "09", title: "Contact information" },
];

export default function TermsAndConditions() {
  const [activeId, setActiveId] = useState<string>("mt-1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8FAFE] text-[#111827] font-[var(--fs)] antialiased min-h-screen py-12 md:py-16">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
        {/* Eyebrow & Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#8DC63F]">
            Legal
          </span>
          <div className="flex-1 h-px bg-[rgba(26,59,159,0.12)]" />
        </div>

        <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold text-[#091540] tracking-tight mb-4">
          Terms and Conditions
        </h1>
        <p className="text-[15.5px] sm:text-[16.5px] leading-relaxed text-[#4B5563] max-w-3xl mb-6 font-light">
          These Terms govern your use of www.myanmol.com and the MyAnmol mobile
          application, owned and operated by Anmol Share Broking Private Limited.
          By accessing or using the Platform, you agree to be bound by them. If you
          do not agree, please do not use our services.
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] bg-white border border-[rgba(26,59,159,0.12)] rounded-lg px-3.5 py-2">
            Last updated <b className="text-[#091540] font-bold ml-1">1 August 2026</b>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] bg-white border border-[rgba(26,59,159,0.12)] rounded-lg px-3.5 py-2">
            Anmol Share Broking Pvt Ltd
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] bg-white border border-[rgba(26,59,159,0.12)] rounded-lg px-3.5 py-2">
            AMFI ARN <b className="text-[#1A3B9F] font-bold ml-1">114893</b>
          </span>
        </div>

        {/* The Short Version Banner */}
        <section
          aria-labelledby="glance-title"
          className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-white shadow-xl shadow-[rgba(9,21,64,0.1)] mb-10"
        >
          <h2
            id="glance-title"
            className="text-xs uppercase tracking-[.2em] font-extrabold text-[#8DC63F] mb-5"
          >
            The Short Version
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-[14.5px] leading-relaxed text-white/90">
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#8DC63F]" />
              <b className="text-white">We distribute, we don't manage.</b> MyAnmol
              is an AMFI-registered mutual fund distributor and an insurance
              solicitor. We do not guarantee returns of any kind.
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#8DC63F]" />
              <b className="text-white">Our content is educational.</b> Blog posts,
              workshops, and calculators are for learning. They are not
              personalised investment, legal, or tax advice.
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#8DC63F]" />
              <b className="text-white">You need to be 18 and KYC-compliant.</b>{" "}
              Available to residents and NRIs, subject to KYC and AML checks. One
              account per PAN.
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#8DC63F]" />
              <b className="text-white">Indian law applies.</b> Disputes fall under
              the exclusive jurisdiction of the courts in Bangalore, Karnataka.
            </li>
          </ul>
          <p className="mt-5 pt-4 border-t border-white/15 text-xs text-[#EFF8E2]/80">
            This summary is for convenience only. Where it differs from the
            numbered terms below in any way, the numbered terms govern.
          </p>
        </section>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">
          {/* Sticky Table of Contents */}
          <nav
            className="sticky top-20 bg-white border border-[rgba(26,59,159,0.1)] rounded-xl p-5 shadow-sm hidden lg:block"
            aria-label="Table of Contents"
          >
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#6B7280] mb-3">
              Contents
            </h2>
            <ol className="space-y-1">
              {SECTIONS.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`flex items-baseline gap-2 py-1.5 px-2 border-l-2 text-[13px] font-medium transition-all ${
                        isActive
                          ? "border-[#1A3B9F] text-[#1A3B9F] font-bold bg-[#EEF2FB]/60 rounded-r"
                          : "border-transparent text-[#6B7280] hover:text-[#091540] hover:border-[#8DC63F]"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#8DC63F]">
                        {sec.num}
                      </span>
                      <span>{sec.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Section Bodies */}
          <div className="space-y-4">
            {/* 01 */}
            <section
              id="mt-1"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  01
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Services overview
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151] mb-3">
                MyAnmol provides a digital platform for:
              </p>
              <ul className="space-y-2 text-[15px] text-[#374151]">
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Mutual fund distribution (AMFI-registered distributor: ARN-114893).
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Insurance solicitation and financial wellness planning.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Educational workshops and investment tools.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Portfolio management tracking for residents and NRIs.
                </li>
              </ul>
            </section>

            {/* 02 */}
            <section
              id="mt-2"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  02
                </span>
                <h3 className="text-lg font-bold text-[#091540]">Eligibility</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151]">
                You must be at least 18 years of age and capable of entering into
                a legally binding contract under the Indian Contract Act, 1872.
                Our services are available to Indian residents and Non-Resident
                Indians (NRIs), subject to KYC and AML compliance.
              </p>
            </section>

            {/* 03 */}
            <section
              id="mt-3"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  03
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  User accounts and security
                </h3>
              </div>
              <ul className="space-y-3 text-[15px] text-[#374151]">
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  <b className="text-[#091540]">Registration.</b> You must provide
                  accurate and complete information, including a valid mobile number
                  and email address.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  <b className="text-[#091540]">Security.</b> You are responsible for
                  maintaining the confidentiality of your login credentials. Notify us
                  immediately of any unauthorised access at{" "}
                  <a
                    href="mailto:mutualfunds@myanmol.com"
                    className="text-[#1A3B9F] font-semibold underline underline-offset-2"
                  >
                    mutualfunds@myanmol.com
                  </a>
                  .
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  <b className="text-[#091540]">Single account.</b> Users are
                  prohibited from maintaining multiple accounts against the same
                  PAN.
                </li>
              </ul>
            </section>

            {/* 04 */}
            <section
              id="mt-4"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  04
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Investment risks and disclaimers
                </h3>
              </div>
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] border border-[#1A3B9F]/20 rounded-md px-2.5 py-1 mb-4">
                Please read this section
              </span>
              <ul className="space-y-3 text-[15px] text-[#374151]">
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  <b className="text-[#091540]">Market risk.</b> Mutual fund
                  investments are subject to market risks. Please read all
                  scheme-related documents carefully before investing.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  <b className="text-[#091540]">No guarantee.</b> Past performance is
                  not an indicator of future results. MyAnmol does not guarantee
                  any returns on investments.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  <b className="text-[#091540]">Not financial advice.</b> Content
                  provided on the blog or during workshops is for educational
                  purposes and should not be construed as direct investment,
                  legal, or tax advice.
                </li>
              </ul>
            </section>

            {/* 05 */}
            <section
              id="mt-5"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  05
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Compliance and KYC
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151]">
                In accordance with SEBI regulations, users must complete the Know
                Your Customer (KYC) process before transacting. You authorise
                MyAnmol to share your data with AMCs, RTAs (such as CAMS and
                KFin), and regulatory bodies for transaction processing.
              </p>
            </section>

            {/* 06 */}
            <section
              id="mt-6"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  06
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Intellectual property
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151]">
                All content on this Platform, including the MyAnmol logo,
                proprietary calculators, and educational materials, is the
                intellectual property of Anmol Share Broking Private Limited.
                Unauthorised reproduction is strictly prohibited.
              </p>
            </section>

            {/* 07 */}
            <section
              id="mt-7"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  07
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Limitation of liability
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151] mb-3">
                To the maximum extent permitted by law, MyAnmol shall not be
                liable for:
              </p>
              <ul className="space-y-2 text-[15px] text-[#374151]">
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Losses arising from market fluctuations.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Technical failures or delays in transaction processing by
                  third-party banks or AMCs.
                </li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[#8DC63F]">
                  Decisions made on the basis of information provided on the
                  Platform.
                </li>
              </ul>
            </section>

            {/* 08 */}
            <section
              id="mt-8"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  08
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Governing law and jurisdiction
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151]">
                These Terms are governed by the laws of India. Any disputes arising
                shall be subject to the exclusive jurisdiction of the courts in
                Bangalore, Karnataka.
              </p>
            </section>

            {/* 09 */}
            <section
              id="mt-9"
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 sm:p-8 scroll-mt-24 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">
                  09
                </span>
                <h3 className="text-lg font-bold text-[#091540]">
                  Contact information
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[#374151] mb-5">
                For any queries regarding these Terms, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="border border-[rgba(26,59,159,0.1)] rounded-xl p-4 bg-[#F8FAFE]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                    Corporate address
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#111827] leading-relaxed">
                    4th Floor, No. 39/1, 33rd Cross Road, Jayanagar 4th T Block,
                    Bangalore 560041
                  </p>
                </div>
                <div className="border border-[rgba(26,59,159,0.1)] rounded-xl p-4 bg-[#F8FAFE]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                    Email
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#111827]">
                    <a
                      href="mailto:mutualfunds@myanmol.com"
                      className="text-[#1A3B9F] font-bold hover:underline"
                    >
                      mutualfunds@myanmol.com
                    </a>
                  </p>
                </div>
                <div className="border border-[rgba(26,59,159,0.1)] rounded-xl p-4 bg-[#F8FAFE]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-2">
                    Phone
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#111827]">
                    <a
                      href="tel:+919742826665"
                      className="text-[#1A3B9F] font-bold hover:underline"
                    >
                      +91 97428 26665
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Accept & Action Callout */}
            <div className="rounded-2xl p-6 bg-white border border-[rgba(26,59,159,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <p className="text-sm text-[#4B5563] leading-relaxed">
                <b className="text-[#091540]">
                  By continuing to use the Platform, you accept these Terms.
                </b>{" "}
                If anything here is unclear, we would rather you asked.
              </p>
              <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                <a
                  href="tel:+919742826665"
                  className="bg-[#8DC63F] text-[#091540] font-extrabold text-sm px-5 py-2.5 rounded-full hover:bg-[#9ED64A] transition-colors"
                >
                  Talk to us →
                </a>
                <a
                  href="#top"
                  onClick={scrollToTop}
                  className="text-xs font-bold text-[#1A3B9F] hover:underline"
                >
                  Back to top ↑
                </a>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed pt-2">
              Anmol Share Broking Private Limited · AMFI-registered mutual fund
              distributor, ARN-114893. Mutual fund investments are subject to
              market risks; read all scheme related documents carefully. Insurance
              is the subject matter of solicitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}