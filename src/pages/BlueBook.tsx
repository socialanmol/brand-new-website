export default function BlueBook() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Insights &amp; Learning
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Blue <span className="text-[#8DC63F] italic">Book.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            The Blue Book page is ready. The contents will be added here.
          </p>
        </div>
      </section>
    </div>
  );
}
