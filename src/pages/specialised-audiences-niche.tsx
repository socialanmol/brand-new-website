import { SPECIALISED_AUDIENCE_SEMINARS } from "../data/specialisedAudienceSeminars";

export default function SpecialisedAudiencesNiche() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-20 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Webinar Series
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Specialised Audiences &amp; <span className="text-[#8DC63F] italic">Niche Communities.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
            Sessions for doctors, teachers, women, NRIs, business owners, and the other households whose money decisions do not fit one general plan.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center mb-10 border-b border-[#E3E8F4] pb-4 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-1">
              Available Masterclasses
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Explore Topics
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6B7280] bg-[#EEF2FB] px-3 py-1.5 rounded-[8px] shrink-0">
            {SPECIALISED_AUDIENCE_SEMINARS.length} Masterclasses Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SPECIALISED_AUDIENCE_SEMINARS.map((topic) => (
            <article
              key={topic.pageId}
              className="flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#E3E8F4]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#091540]">
                <img src={topic.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 max-w-[72%] bg-[#1A3B9F]/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-[6px] text-right leading-tight">
                  {topic.recurrence}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow space-y-3 bg-white">
                <span className="text-[10px] font-bold text-[#1A3B9F] uppercase tracking-wider block">
                  Target: {topic.audience}
                </span>
                <h3 className="font-[var(--fd)] text-sm font-bold text-[#091540] leading-snug">
                  {topic.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
