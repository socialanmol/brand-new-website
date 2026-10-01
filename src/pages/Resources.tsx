import { Link } from "react-router";
import { BOOKS } from "../data/books";

export default function Resources() {
  return (
    <div className="bg-[#F8FAFE] text-[#111827] font-[var(--fs)] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-3">
            Learn, Unlearn & Relearn
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Books Worth Your Time
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            A curated reading list on money, markets, and mindset — the fundamental ideas we keep coming back to.
          </p>
        </div>
      </section>

      {/* BOOK GRID */}
      <section className="py-14 sm:py-20 max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOOKS.map((book) => (
            <div
              key={book.slug}
              className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
            >
              {/* Cover Card */}
              <Link
                to={`/insights/learn/${book.slug}`}
                style={{ background: book.coverGradient }}
                className="relative aspect-[2/3] max-h-72 rounded-xl flex flex-col items-center justify-center p-6 text-white text-center shadow-md overflow-hidden mb-5 cursor-pointer"
              >
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/25" />
                <span className="text-[10.5px] uppercase tracking-widest text-[#8DC63F] font-bold mb-2">
                  {book.yearOrTag}
                </span>
                <div className="w-8 h-0.5 bg-white/40 my-1" />
                <h4 className="font-[var(--fd)] text-xl font-bold whitespace-pre-line leading-snug drop-shadow">
                  {book.coverTitle}
                </h4>
              </Link>

              {/* Meta */}
              <div className="flex flex-col flex-1">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-1 group-hover:text-[#1A3B9F] transition-colors">
                  <Link to={`/insights/learn/${book.slug}`}>{book.title}</Link>
                </h3>
                <p className="text-xs text-[#6B7280] font-semibold mb-2">{book.author}</p>
                <p className="text-sm text-[#4B5563] font-light leading-relaxed mb-5">
                  {book.shortDesc}
                </p>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/insights/learn/${book.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3B9F] bg-[#EEF2FB] hover:bg-[#1A3B9F] hover:text-white px-3.5 py-2 rounded-full transition-all"
                  >
                    Read Summary →
                  </Link>

                  {book.pdfUrl ? (
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#091540] bg-[#8DC63F] hover:bg-[#9ED64A] px-3.5 py-2 rounded-full transition-all"
                    >
                      PDF ↓
                    </a>
                  ) : (
                    <span className="text-[11px] text-[#9CA3AF] italic">PDF in review</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}