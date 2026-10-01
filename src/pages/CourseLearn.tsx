import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const LESSONS = [
  { num: "01", title: "Money foundations: cash flow, budget and buffer", duration: "2h · 4 lessons", summary: "Where the money actually goes, and how much of it should be sitting still. You finish this module with a working budget and a correctly sized emergency fund." },
  { num: "02", title: "Mutual funds, decoded", duration: "2.5h · 5 lessons", summary: "What a fund actually holds, what it charges you, and how to compare two of them honestly instead of by last year’s return." },
  { num: "03", title: "SIPs, goals and asset allocation", duration: "2h · 4 lessons", summary: "Turning 'I should invest' into a number, a date and a monthly instruction you can actually keep." },
  { num: "04", title: "Insurance essentials: term, health and general", duration: "2h · 4 lessons", summary: "Protection before growth. How much cover, of which type, and what the fine print actually excludes." },
  { num: "05", title: "Tax planning without last-minute panic", duration: "1.5h · 3 lessons", summary: "The two regimes, the deductions worth using, and how capital gains on funds are actually taxed." },
  { num: "06", title: "Capstone: your one-page financial plan", duration: "3h · project", summary: "Everything from the first five modules, assembled into a single page you can revisit once a year." },
];

export default function CourseLearn() {
  const [searchParams] = useSearchParams();
  const learnerName = searchParams.get("name") || "Learner";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false, false, false]);
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  const currentLesson = LESSONS[currentIndex];
  const doneCount = completed.filter(Boolean).length;

  useEffect(() => {
    if (secondsRemaining === 0) return;

    const timer = window.setInterval(() => {
      setSecondsRemaining(seconds => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsRemaining]);

  const handleMarkComplete = () => {
    const nextComp = [...completed];
    nextComp[currentIndex] = true;
    setCompleted(nextComp);
    if (currentIndex < LESSONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="font-[var(--fs)] bg-[#EEF2FB] text-[#111827] antialiased min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 h-[66px] bg-[#091540] text-white">
        <div className="max-w-[1320px] mx-auto px-6 h-full flex items-center justify-end">
          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
            <span className="text-xs font-semibold text-white/80">
              Session notification
            </span>
            <span className="text-sm font-extrabold tabular-nums text-[#8DC63F]">
              {secondsRemaining}s
            </span>
          </div>
        </div>
      </header>

      {/* Learn Grid */}
      <main className="max-w-[1320px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div>
          <div className="bg-[#091540] rounded-2xl aspect-video relative flex items-center justify-center text-white overflow-hidden shadow-lg">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#8DC63F]/20 border border-[#8DC63F] text-[#8DC63F] flex items-center justify-center text-xl mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform">
                ▶
              </div>
              <p className="text-xs uppercase tracking-widest text-white/50 font-bold">
                Module {currentLesson.num} Video Player
              </p>
            </div>
          </div>

          <div className="mt-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6AA32A] block mb-2">
              Module {currentLesson.num}
            </span>
            <h1 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-3">
              {currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
              {currentLesson.summary}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={handleMarkComplete}
                className="px-6 py-2.5 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] rounded-xl text-xs font-extrabold shadow-sm transition-all"
              >
                {completed[currentIndex] ? "Completed ✓" : "Mark complete & continue"}
              </button>
              <button
                disabled={currentIndex === LESSONS.length - 1}
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Rail */}
        <aside className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">Course content</h3>
            <p className="text-xs text-gray-500 mt-0.5">{doneCount} of {LESSONS.length} modules complete</p>
          </div>
          <div className="divide-y divide-gray-100">
            {LESSONS.map((l, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-full p-4 text-left flex items-center gap-3 transition-colors ${
                  i === currentIndex ? "bg-[#EEF2FB]" : "hover:bg-gray-50"
                }`}
              >
                <span className={`w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                  completed[i] ? "bg-[#8DC63F] border-[#8DC63F] text-[#091540]" : "border-gray-300 text-transparent"
                }`}>
                  ✓
                </span>
                <div>
                  <div className="text-xs font-bold text-[#091540]">{l.num}. {l.title}</div>
                  <div className="text-[10px] text-gray-400">{l.duration}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}