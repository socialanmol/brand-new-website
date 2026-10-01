import { useOutletContext } from "react-router";

type InvestmentServicesContext = {
  openGetStarted: () => void;
};

export default function InvestmentServices() {
  const { openGetStarted } = useOutletContext<InvestmentServicesContext>();

  return (
    <div className="font-[var(--fs)] bg-[#091540] text-white antialiased py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_90%_0%,rgba(201,165,90,.08),transparent_60%),radial-gradient(600px_320px_at_0%_100%,rgba(58,138,90,.12),transparent_60%)] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-3">
            Manage Your Portfolio
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Investment Services
          </h1>
          <p className="text-base text-white/80 font-light leading-relaxed">
            Explore various ways to monitor and manage your investments efficiently. Access our online portal for seamless transactions and real-time updates on your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mobile Apps */}
          <div className="bg-[#0D1E52] border border-white/10 rounded-3xl p-8 hover:-translate-y-1.5 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-2xl mb-6">
                📱
              </div>
              <h3 className="font-[var(--fd)] text-xl font-bold text-white mb-3">Mobile Apps</h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-6">
                Download our user-friendly Android and Apple Store apps to stay connected with your investments on the go. Experience convenience at your fingertips.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <a
                href="https://play.google.com/store/apps/details?id=com.myanmol.app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#091540] bg-[#8DC63F] hover:bg-[#9ED64A] py-2.5 px-4 rounded-xl text-center justify-center transition-all shadow-sm"
              >
                Android Play Store App →
              </a>
              <a
                href="https://apps.apple.com/in/app/myanmol-mutual-funds/id6748212457"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#091540] bg-[#8DC63F] hover:bg-[#9ED64A] py-2.5 px-4 rounded-xl text-center justify-center transition-all shadow-sm"
              >
                Apple Store App →
              </a>
            </div>
          </div>

          {/* Web Login */}
          <div className="bg-[#0D1E52] border border-white/10 rounded-3xl p-8 hover:-translate-y-1.5 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-2xl mb-6">
                💻
              </div>
              <h3 className="font-[var(--fd)] text-xl font-bold text-white mb-3">Web Login</h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-6">
                Access your investment account through our secure web portal.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <a
                href="https://app.myanmol.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/15 py-3 px-4 rounded-xl transition-all group"
              >
                <span className="text-xs font-bold text-white">MyAnmol Investments</span>
                <span className="text-xs font-bold text-[#8DC63F] group-hover:translate-x-1 transition-transform">Login →</span>
              </a>
            </div>
          </div>

          {/* Expert Guidance */}
          <div className="bg-[#0D1E52] border border-white/10 rounded-3xl p-8 hover:-translate-y-1.5 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-2xl mb-6">
                🤝
              </div>
              <h3 className="font-[var(--fd)] text-xl font-bold text-white mb-3">Expert Guidance</h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-6">
                Receive expert guidance from our team of financial consultants to optimize your investment strategies. Let us help you achieve your financial goals effectively.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={openGetStarted}
                className="w-full inline-flex items-center gap-2 text-xs font-bold text-[#091540] bg-[#8DC63F] hover:bg-[#9ED64A] py-3 px-4 rounded-xl text-center justify-center transition-all shadow-sm"
              >
                Schedule your meeting here →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}