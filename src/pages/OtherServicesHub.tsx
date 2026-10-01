import React, { useState } from "react";
import { Link, useOutletContext } from "react-router";

type OtherServicesContext = {
  openGetStarted: () => void;
};

interface ServiceCard {
  title: string;
  subtitle?: string;
  icon: string;
  to?: string;
  external?: string;
}

const SERVICES: ServiceCard[] = [
  {
    title: "Fixed Deposit",
    subtitle: "Deposit",
    icon: "💰",
    to: "/services/other/fixed-deposits",
  },
  {
    title: "Equity Trading",
    subtitle: "Trading",
    icon: "📈",
    to: "/services/other/equity-trading",
  },
  {
    title: "Tax Filing",
    subtitle: "Filing",
    icon: "🧾",
    to: "/services/other/tax-filing",
  },
  {
    title: "Wealth & Estate Solutions",
    subtitle: "Solutions",
    icon: "🏛️",
    to: "/services/other/wealth-estate",
  },
  {
    title: "Real Estate",
    subtitle: "Property",
    icon: "🏘️",
    to: "/services/other/real-estate",
  },
  {
    title: "Commodities Market Gold & Silver",
    subtitle: "Commodities",
    icon: "🪙",
    to: "/services/other/commodities",
  },
  {
    title: "Travel Solutions",
    subtitle: "Travel",
    icon: "✈️",
    to: "/services/other/travel",
  },
  {
    title: "Tax Services",
    subtitle: "Advisory",
    icon: "📋",
    to: "/services/other/tax-services",
  },
];

export default function OtherServicesHub() {
  const { openGetStarted } = useOutletContext<OtherServicesContext>();
  return (
    <div className="font-[var(--fs)] bg-[#F8FAFE] text-[#111827] antialiased min-h-screen">
      {/* HEADER BAND */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#8DC63F] block mb-3">
            What Else We Offer
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Our Other Services
          </h1>
          <div className="w-16 h-0.5 bg-[#8DC63F] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Below are the services offered by us to help you in investing for the various stages of your life — so that you can live your life freely.
          </p>
        </div>
      </section>

      {/* CARD GRID */}
      <section className="py-16 sm:py-20 max-w-[1140px] mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => {
            const content = (
              <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all group flex flex-col items-center justify-between min-h-[220px]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white flex items-center justify-center text-3xl mb-4 shadow-md group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>
                <div>
                  <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-1">
                    {srv.title.includes(srv.subtitle || "") ? (
                      <>
                        {srv.title.replace(srv.subtitle || "", "")}
                        <strong className="block font-bold text-[#1A3B9F]">{srv.subtitle}</strong>
                      </>
                    ) : (
                      srv.title
                    )}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#8DC63F] mt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            );

            if (srv.to) {
              return (
                <Link key={idx} to={srv.to}>
                  {content}
                </Link>
              );
            }
            return (
              <a key={idx} href={srv.external || "#"}>
                {content}
              </a>
            );
          })}
        </div>

        {/* Footer strip */}
        <div className="mt-16 bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <p className="text-sm text-[#4B5563] font-light leading-relaxed">
            <strong className="text-[#091540] font-bold">Numbers are the easy part.</strong> The hard part is deciding which fund, which cover, and in what order. Our team will walk you through it — no charge for the first conversation.
          </p>
          <button
            type="button"
            onClick={openGetStarted}
            className="inline-flex items-center gap-2 bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm px-6 py-3 rounded-full transition-all shrink-0 shadow-md"
          >
            Talk to an advisor →
          </button>
        </div>
      </section>
    </div>
  );
}