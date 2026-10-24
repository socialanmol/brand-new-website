import { useState, type FormEvent } from "react";
import { Navigate, useParams } from "react-router";
import QuizOne from "./quiz1";
import QuizTwo from "./quiz2";
import type { UserDetails } from "./quiz1";

type QuizNumber = "1" | "2";

const quizzes = {
  "1": { title: "Financial Confidence Quiz" },
  "2": { title: "Investment Risk Profile Quiz" },
} satisfies Record<QuizNumber, { title: string }>;

export default function QuizEntryGate() {
  const { quizNumber } = useParams();
  const [hasStarted, setHasStarted] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({ fullName: "", email: "" });

  if (quizNumber !== "1" && quizNumber !== "2") {
    return <Navigate to="/fw/quiz" replace />;
  }

  if (hasStarted) {
    return quizNumber === "1" ? <QuizOne userDetails={userDetails} /> : <QuizTwo />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setUserDetails({
      fullName: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
    });
    setHasStarted(true);
  };

  const quiz = quizzes[quizNumber];

  return (
    <section className="flex min-h-[55vh] items-center bg-[#F8FAFE] px-5 py-8 text-[#111827] sm:py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#699a27]">
            {quizNumber === "1" ? "Financial Fitness Assessment" : "Before you begin"}
          </p>
          <h1 className="text-3xl font-bold text-[#091540] sm:text-4xl">
            {quizNumber === "1" ? "How financially fit are you?" : quiz.title}
          </h1>
          <p className="mt-3 text-sm text-[#4B5563] sm:text-base">
            {quizNumber === "1"
              ? "Answer 20 honest questions across 5 pillars of personal finance—savings, spending, debt, insurance & investments—and walk away with a clear, actionable diagnostic."
              : "Enter your details to start the quiz."}
          </p>
          {quizNumber === "1" && (
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold text-[#1A3B9F]">
              <span className="rounded-full bg-[#EEF4FC] px-4 py-2">✓ 20 Questions</span>
              <span className="rounded-full bg-[#EEF4FC] px-4 py-2">⏱ 5 Minutes</span>
              <span className="rounded-full bg-[#EEF4FC] px-4 py-2">🔒 Confidential &amp; Unbiased</span>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-lg border border-[#1A3B9F]/15 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
        >
          <label className="grid gap-2 text-sm font-semibold text-[#091540]">
            Name
            <input
              autoComplete="name"
              className="min-h-11 rounded border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-[#1A3B9F] focus:ring-2 focus:ring-[#1A3B9F]/20"
              name="name"
              required
              type="text"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#091540]">
            Email ID
            <input
              autoComplete="email"
              className="min-h-11 rounded border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-[#1A3B9F] focus:ring-2 focus:ring-[#1A3B9F]/20"
              name="email"
              required
              type="email"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#091540]">
            WhatsApp Number
            <input
              autoComplete="tel"
              className="min-h-11 rounded border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-[#1A3B9F] focus:ring-2 focus:ring-[#1A3B9F]/20"
              maxLength={20}
              minLength={7}
              name="whatsappNumber"
              required
              type="tel"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#091540]">
            Current Location
            <input
              autoComplete="address-level2"
              className="min-h-11 rounded border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-[#1A3B9F] focus:ring-2 focus:ring-[#1A3B9F]/20"
              name="location"
              required
              type="text"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#091540] sm:col-span-2">
            Occupation
            <input
              autoComplete="organization-title"
              className="min-h-11 rounded border border-slate-300 px-3 font-normal text-slate-900 outline-none focus:border-[#1A3B9F] focus:ring-2 focus:ring-[#1A3B9F]/20"
              name="occupation"
              required
              type="text"
            />
          </label>

          <button
            className="mt-1 min-h-12 rounded bg-[#8DC63F] px-6 py-3 font-bold text-[#091540] transition-colors hover:bg-[#9ED64A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3B9F] sm:col-span-2"
            type="submit"
          >
            Submit and Start Quiz
          </button>
        </form>
      </div>
    </section>
  );
}