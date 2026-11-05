import React from 'react';

export default function DesignSystemToolkit() {
  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="font-['Montserrat',sans-serif] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E3E8F4] pb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full mb-3">
              Design System &amp; Brand Tokens
            </span>
            <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#091540]">
              MyAnmol Font Styles, Colors &amp; Formatting Toolkit
            </h1>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
          >
            Download / Print Toolkit
          </button>
        </div>

        {/* 1. Color Palette */}
        <div className="space-y-6">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            1. Brand Color Palette &amp; Tokens
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Our color system is meticulously calibrated for high-trust executive financial services, combining deep navy blues with vibrant growth greens and warm accent tones.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#091540] text-white rounded-[16px] p-6 space-y-3 shadow-sm border border-black/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Executive Navy</span>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded">#091540</span>
              </div>
              <p className="text-xs text-white/80 font-light">
                Primary background for hero headers, high-impact dark containers, and key conversion sections.
              </p>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-6 space-y-3 shadow-sm border border-black/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Primary Blue</span>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded">#1A3B9F</span>
              </div>
              <p className="text-xs text-white/80 font-light">
                Primary interactive buttons, active tab borders, prominent headings, and trust anchors.
              </p>
            </div>

            <div className="bg-[#6AA32A] text-white rounded-[16px] p-6 space-y-3 shadow-sm border border-black/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Growth Green</span>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded">#6AA32A / #8DC63F</span>
              </div>
              <p className="text-xs text-white/80 font-light">
                Positive returns, success badges, primary call-to-action highlights, and wealth growth markers.
              </p>
            </div>

            <div className="bg-[#EEF2FB] text-[#091540] rounded-[16px] p-6 space-y-3 shadow-sm border border-[#C5D3F2]">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A3B9F]">Surface Blue / Input BG</span>
                <span className="text-xs font-mono bg-[#1A3B9F]/10 px-2.5 py-1 rounded">#EEF2FB</span>
              </div>
              <p className="text-xs text-[#374151] font-light">
                Form input backgrounds, subtle card containers, table headers, and step backgrounds.
              </p>
            </div>

            <div className="bg-[#FFFDF0] text-[#856404] rounded-[16px] p-6 space-y-3 shadow-sm border border-[#FFE8A3]">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider">Highlight Gold / Warning</span>
                <span className="text-xs font-mono bg-[#FFE8A3]/50 px-2.5 py-1 rounded">#FFC107 / #FFFDF0</span>
              </div>
              <p className="text-xs text-[#374151] font-light">
                Principal amount indicators in charts, warning notices, and featured highlight cards.
              </p>
            </div>

            <div className="bg-[#F8FAFE] text-[#374151] rounded-[16px] p-6 space-y-3 shadow-sm border border-[#E3E8F4]">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Neutral Border &amp; Card</span>
                <span className="text-xs font-mono bg-[#E3E8F4] px-2.5 py-1 rounded">#E3E8F4 / #F8FAFE</span>
              </div>
              <p className="text-xs text-[#6B7280] font-light">
                Card borders, divider lines, light background wrappers, and secondary table rows.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Typography Styles */}
        <div className="space-y-6 pt-6 border-t border-[#E3E8F4]">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            2. Typography &amp; Font Styles
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Our typography hierarchy uses clean geometric sans-serif for optimal legibility across digital interfaces and financial calculators.
          </p>

          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-[#E3E8F4]">
              <div>
                <span className="text-xs font-bold text-[#1A3B9F] uppercase tracking-wider block mb-1">Primary Font Family</span>
                <div className="text-lg font-extrabold text-[#091540]">Montserrat</div>
                <div className="text-xs text-[#6B7280] mt-1">Used for all headings, body text, UI buttons, and navigation.</div>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1A3B9F] uppercase tracking-wider block mb-1">Display / Serif Font</span>
                <div className="text-lg font-extrabold text-[#091540] font-serif">Playfair Display</div>
                <div className="text-xs text-[#6B7280] mt-1">Used selectively for editorial headings and pull quotes.</div>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1A3B9F] uppercase tracking-wider block mb-1">Monospace / Input Font</span>
                <div className="text-lg font-mono font-extrabold text-[#091540]">Nunito Sans / Mono</div>
                <div className="text-xs text-[#6B7280] mt-1">Used for currency inputs, numerical values, and calculations.</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-[#6B7280]">H1 Heading Token</span>
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-[#E3E8F4]">text-3xl sm:text-5xl font-extrabold tracking-tight</span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-[#6B7280]">H2 Section Heading</span>
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-[#E3E8F4]">text-2xl sm:text-3xl font-bold</span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-[#6B7280]">Body Text Token</span>
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-[#E3E8F4]">text-sm sm:text-base text-[#374151] font-light</span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-[#6B7280]">Button / CTA Token</span>
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-[#E3E8F4]">font-extrabold text-xs tracking-wider uppercase</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Formatting & Component Toolkit */}
        <div className="space-y-6 pt-6 border-t border-[#E3E8F4]">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            3. Formatting &amp; Component Toolkit
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Standardized UI blocks used across all calculators, hubs, and modal workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-3">
              <h3 className="font-bold text-sm text-[#1A3B9F]">📊 Interactive Donut &amp; Stacked Bar Charts</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                SVG-based responsive donut charts with custom stroke-dasharray calculations for principal vs. interest breakdown, and yearly amortization stacked bar/line charts.
              </p>
            </div>

            <div className="bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-3">
              <h3 className="font-bold text-sm text-[#1A3B9F]">🎛️ Dual Slider &amp; Text Input Controls</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Synchronized range sliders and formatted Indian currency input fields (`en-IN`) with automatic clamping and error boundaries.
              </p>
            </div>

            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-sm text-[#1A3B9F]">💬 2-Step Advisor Booking Modal</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Step 1 lead capture form feeding into Step 2 interactive expert advisor card carousel with 6 verified mentors and availability badges.
              </p>
            </div>

            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-sm text-[#1A3B9F]">📄 CSV / PDF Export &amp; Print Utilities</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Instant browser print styling and CSV data export handlers integrated into every calculator and report card.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
