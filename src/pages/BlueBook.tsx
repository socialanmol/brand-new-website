import { Link } from "react-router";
import { BLUE_BOOKS, type BlueBookEdition } from "../data/blueBooks";

const COVERS = [
  "from-[#091540] to-[#1A3B9F]",
  "from-[#0D1E52] to-[#2563eb]",
  "from-[#10245c] to-[#0f766e]",
  "from-[#1e1b4b] to-[#1A3B9F]",
  "from-[#091540] to-[#365314]",
  "from-[#172554] to-[#7c2d12]",
];

function BookCover({ book, index }: { book: BlueBookEdition; index: number }) {
  const wide = book.frameWidth > book.frameHeight;
  return (
    <div
      className={`relative flex overflow-hidden rounded-r-2xl rounded-l-md bg-gradient-to-br ${COVERS[index % COVERS.length]} text-white shadow-[0_16px_30px_rgba(9,21,64,0.18)]`}
      style={{ aspectRatio: `${book.frameWidth} / ${book.frameHeight}` }}
    >
      <div className="w-2.5 shrink-0 bg-black/30 sm:w-3" aria-hidden="true" />
      <div className={`flex min-w-0 flex-1 flex-col ${wide ? "p-3 sm:p-4" : "p-4 sm:p-5"}`}>
        <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#8DC63F]">Blue Book</span>
        <h2 className={`font-[var(--fd)] mt-auto font-extrabold leading-tight tracking-tight ${wide ? "text-base sm:text-2xl" : "text-base sm:text-lg"}`}>
          {book.title}
        </h2>
        {book.subtitle && (
          <p className="mt-2 text-xs sm:text-sm leading-snug text-white/75">{book.subtitle}</p>
        )}
        {book.pdf && (
          <span className="mt-3 inline-flex w-fit rounded-full bg-[#8DC63F] px-3 py-1 text-[11px] font-extrabold text-[#091540]">
            Read
          </span>
        )}
      </div>
    </div>
  );
}

export default function BlueBook() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-14 sm:py-16 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Insights &amp; Learning
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Blue <span className="text-[#8DC63F] italic">Book.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Choose an edition from the shelf.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <ul className="grid grid-cols-2 items-start gap-4 sm:grid-cols-6 sm:gap-6 lg:grid-cols-12">
          {BLUE_BOOKS.map((book, index) => {
            const wide = book.frameWidth > book.frameHeight;
            const cover = <BookCover book={book} index={index} />;
            return (
              <li key={book.slug} className={wide ? "col-span-2 sm:col-span-6 lg:col-span-5" : "col-span-1 sm:col-span-2 lg:col-span-3"}>
                {book.pdf ? (
                  <Link to={`/insights/blue-book/${book.slug}`} className="block transition-transform hover:-translate-y-1">
                    {cover}
                  </Link>
                ) : cover}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
