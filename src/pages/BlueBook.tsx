import { useEffect, useState } from "react";
import PdfFrame from "../components/PdfFrame";

const edition = {
  series: "Blue Book",
  pdf: "/blue-book/blue-book.pdf",
  downloadName: "MyAnmol-Blue-Book.pdf",
};

const description = [
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat. Nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor.",
  "Sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut. Aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat. Non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit sed do.",
  "Eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis. Aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui.",
];

export default function BlueBook() {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    const url = window.location.href;
    setPageUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const sharePage = async () => {
    const url = window.location.href;
    setPageUrl(url);
    if (navigator.share) {
      try {
        await navigator.share({ title: edition.series, url });
      } catch {
        /* The visitor dismissed the share sheet. The page link stays on screen. */
      }
      return;
    }
    await copyLink();
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-14 sm:py-16 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Series
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Blue <span className="text-[#8DC63F] italic">Book.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            The current edition of the Blue Book series.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <PdfFrame src={edition.pdf} label={edition.series} />
            <a
              href={edition.pdf}
              download={edition.downloadName}
              className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-[#8DC63F] px-6 text-xs font-extrabold text-[#091540] hover:bg-[#9ED64A] transition-all"
            >
              Download PDF
            </a>
          </div>

          <div>
            <article>
              <p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#8DC63F]">Blue Book series</p>
              <h2 className="font-[var(--fd)] mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#091540]">
                About this edition
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[#374151]">
                {description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </article>

            <button
              type="button"
              onClick={sharePage}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-[#091540] px-6 text-xs font-extrabold text-[#091540] bg-white cursor-pointer"
            >
              Share this page
            </button>

            <div className="mt-4 rounded-2xl border border-[#d5deee] bg-[#f7f9fc] p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Page link</p>
              <div className="mt-2 flex flex-col gap-2">
                <input
                  readOnly
                  value={pageUrl}
                  aria-label="Link to this page"
                  className="h-11 w-full rounded-xl border border-[#d5deee] bg-white px-3 text-sm text-[#111827]"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="h-11 rounded-xl bg-[#091540] px-5 text-xs font-extrabold text-white cursor-pointer"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
