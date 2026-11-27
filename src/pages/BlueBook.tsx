import { useMemo, useState } from "react";
import { Link } from "react-router";
import { BLUE_BOOKS, EDITION_SERIES_NAME, type BlueBookEdition } from "../data/blueBooks";

const COVERS = [
  "from-[#091540] to-[#1A3B9F]",
  "from-[#0D1E52] to-[#2563eb]",
  "from-[#10245c] to-[#0f766e]",
  "from-[#1e1b4b] to-[#1A3B9F]",
  "from-[#091540] to-[#365314]",
  "from-[#172554] to-[#7c2d12]",
];

const COVER_WIDTH = 1080;
const COVER_HEIGHT = 1350;

function BookCover({ book, index }: { book: BlueBookEdition; index: number }) {
  return (
    <div
      className={`relative flex h-full overflow-hidden rounded-r-2xl rounded-l-md bg-gradient-to-br ${COVERS[index % COVERS.length]} text-white shadow-[0_16px_30px_rgba(9,21,64,0.18)]`}
      style={{ aspectRatio: `${COVER_WIDTH} / ${COVER_HEIGHT}` }}
    >
      <div className="w-2.5 shrink-0 bg-black/30 sm:w-3" aria-hidden="true" />
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <span className="text-[10px] font-extrabold uppercase leading-snug tracking-[.12em] text-[#8DC63F]">
          {EDITION_SERIES_NAME}
        </span>
        <h2 className="font-[var(--fd)] mt-auto text-base sm:text-lg font-extrabold leading-tight tracking-tight">
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

function matchesQuery(book: BlueBookEdition, query: string) {
  const haystack = [book.title, book.subtitle ?? "", ...(book.description ?? [])].join(" ").toLowerCase();
  return haystack.includes(query);
}

export default function BlueBook() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const editions = useMemo(
    () => BLUE_BOOKS.map((book, index) => ({ book, index })).filter(({ book }) => !needle || matchesQuery(book, needle)),
    [needle],
  );

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-14 sm:py-16 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Insights &amp; Learning
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Economics <span className="text-[#8DC63F] italic">by MyAnmol</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Choose an edition from the shelf.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <form role="search" className="mb-8" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="edition-search" className="mb-2 block text-sm font-bold text-[#091540]">
            Search editions
          </label>
          <input
            id="edition-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or topic"
            className="h-12 w-full rounded-xl border border-[#d5deee] bg-white px-4 text-base text-[#091540] outline-none placeholder:text-[#6b7280] focus:border-[#1A3B9F]"
          />
          {needle && (
            <p className="mt-3 text-sm text-[#374151]" aria-live="polite">
              {editions.length === 1 ? "1 edition" : `${editions.length} editions`}
            </p>
          )}
        </form>

        {editions.length === 0 ? (
          <p className="rounded-2xl border border-[#d5deee] bg-[#f7f9fc] px-5 py-8 text-base text-[#374151]">
            No editions match that search.
          </p>
        ) : (
          <ul className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {editions.map(({ book, index }) => {
              const cover = <BookCover book={book} index={index} />;
              return (
                <li key={book.slug} className="min-w-0">
                  {book.pdf ? (
                    <Link to={`/insights/blue-book/${book.slug}`} className="block h-full transition-transform hover:-translate-y-1">
                      {cover}
                    </Link>
                  ) : cover}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
