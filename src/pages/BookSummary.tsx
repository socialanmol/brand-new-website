import { useParams, Link, Navigate } from "react-router";
import { BOOKS } from "../data/books";

export default function BookSummary() {
  const { slug } = useParams<{ slug: string }>();
  const book = BOOKS.find((b) => b.slug === slug);

  if (!book) {
    return <Navigate to="/insights/learn" replace />;
  }

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HEADER / MASTHEAD */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-14 sm:py-20 text-white">
        <div className="max-w-[820px] mx-auto px-6 relative z-10">
          <Link
            to="/insights/learn"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-1.5 rounded-full mb-8 transition-all"
          >
            ← Back to Learn, Unlearn & Relearn
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-end">
            <div
              style={{ background: book.coverGradient }}
              className="w-28 sm:w-36 aspect-[2/3] rounded-xl flex items-center justify-center p-4 text-white text-center shadow-2xl shrink-0 relative overflow-hidden border border-white/15"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/25" />
              <div className="font-[var(--fd)] text-sm sm:text-base font-bold whitespace-pre-line leading-tight">
                {book.coverTitle}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-2">
                {book.yearOrTag}
              </span>
              <h1 className="font-[var(--fd)] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base text-white/80 font-light">{book.author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY BODY */}
      <main className="max-w-[780px] mx-auto px-6 py-12 sm:py-16">
        <div className="space-y-6 text-[16px] sm:text-[17px] leading-[1.85] text-[#374151] font-normal">
          {book.summaryParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* CTA BOX */}
        <div className="mt-12 bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-[var(--fd)] text-lg sm:text-xl font-bold text-[#091540] mb-1">
              Want to read the full book?
            </h3>
            <p className="text-sm text-[#4B5563] font-light">
              Download a copy to read the complete text at your own pace.
            </p>
          </div>

          {book.pdfUrl ? (
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-6 py-3 rounded-full transition-all shadow-md shrink-0"
            >
              Download PDF ↓
            </a>
          ) : (
            <span className="text-xs text-[#6B7280] font-semibold bg-white border border-gray-200 px-4 py-2 rounded-full">
              PDF coming soon
            </span>
          )}
        </div>

        {/* DISCLAIMER */}
        {book.disclaimer && (
          <p className="mt-12 pt-6 border-t border-gray-200 text-xs text-[#9CA3AF] leading-relaxed italic">
            {book.disclaimer}
          </p>
        )}
      </main>
    </div>
  );
}