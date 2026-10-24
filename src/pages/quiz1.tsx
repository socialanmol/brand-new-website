import React, { useState, useEffect } from 'react';
import { Award, BarChart3 } from 'lucide-react';

// --- TYPES & INTERFACES ---
export interface Option {
  id: string;
  label: string;
  score: number; // Graduated maturity weight (e.g. 1 to 4)
}

export interface Question {
  id: number;
  sectionId: number;
  text: string;
  options: Option[];
}

export interface Section {
  id: number;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  adviceLow: string;
  adviceHigh: string;
}

export interface UserDetails {
  fullName: string;
  email: string;
}

// --- DATA DEFINITION: 5 PILLARS & 20 QUESTIONS ---
const SECTIONS: Section[] = [
  {
    id: 1,
    title: 'Income & Savings',
    shortTitle: 'Savings',
    icon: '💰',
    description: 'Measures your cash flow consistency and emergency safety net.',
    adviceLow: 'Savings habit needs more consistency. Aim to automate at least 10%–20% on payday before spending.',
    adviceHigh: 'Strong savings discipline and emergency reserves. Keep compounding your monthly surplus.'
  },
  {
    id: 2,
    title: 'Spending & Budgeting',
    shortTitle: 'Budgeting',
    icon: '📊',
    description: 'Evaluates expense awareness, lifestyle control, and buffer management.',
    adviceLow: 'Lifestyle inflation or untracked expenses might be leaking cash. Track weekly leaks.',
    adviceHigh: 'Excellent budget control. You know where every rupee goes and maintain steady margins.'
  },
  {
    id: 3,
    title: 'Debt & Liabilities',
    shortTitle: 'Debt',
    icon: '💳',
    description: 'Assesses credit utilization, EMI stress, and credit score awareness.',
    adviceLow: 'High EMI-to-income or revolving credit balances need immediate debt avalanche/snowball planning.',
    adviceHigh: 'Your debt is well managed with high credit health. Keep monitoring your credit score.'
  },
  {
    id: 4,
    title: 'Insurance & Protection',
    shortTitle: 'Protection',
    icon: '🛡️',
    description: 'Looks at risk mitigation across health cover, term life, and estate nominations.',
    adviceLow: 'Gaps in insurance coverage expose your wealth to catastrophic risk—prioritise adequate term & health floater plans.',
    adviceHigh: 'Well-protected foundation. Ensure nominations and estate documents are regularly revisited.'
  },
  {
    id: 5,
    title: 'Investments & Wealth',
    shortTitle: 'Wealth',
    icon: '📈',
    description: 'Gauges asset diversification, long-term retirement targets, and market temperament.',
    adviceLow: 'Starting a regular SIP—even a small amount—compounds significantly and beats inflation.',
    adviceHigh: 'Disciplined wealth builder with high market composure and clear retirement clarity.'
  }
];

const QUESTIONS: Question[] = [
  // SECTION 1: Income & Savings
  {
    id: 1,
    sectionId: 1,
    text: 'What is your monthly take-home income?',
    options: [
      { id: 'A', label: 'Less than ₹25,000', score: 1 },
      { id: 'B', label: '₹25,000 - ₹50,000', score: 2 },
      { id: 'C', label: '₹50,000 - ₹1,00,000', score: 3 },
      { id: 'D', label: 'More than ₹1,00,000', score: 4 }
    ]
  },
  {
    id: 2,
    sectionId: 1,
    text: 'What percentage of your monthly income do you save?',
    options: [
      { id: 'A', label: "I don't save regularly", score: 1 },
      { id: 'B', label: 'Less than 10%', score: 2 },
      { id: 'C', label: '10% - 20%', score: 3 },
      { id: 'D', label: 'More than 20%', score: 4 }
    ]
  },
  {
    id: 3,
    sectionId: 1,
    text: 'Do you have an emergency fund?',
    options: [
      { id: 'A', label: "No, I don't have one", score: 1 },
      { id: 'B', label: 'Yes, less than 1 month of expenses', score: 2 },
      { id: 'C', label: 'Yes, 1-3 months of expenses', score: 3 },
      { id: 'D', label: 'Yes, 3-6 months or more', score: 4 }
    ]
  },
  {
    id: 4,
    sectionId: 1,
    text: 'How consistent are you with saving every month?',
    options: [
      { id: 'A', label: 'Rarely or never', score: 1 },
      { id: 'B', label: 'Sometimes, depending on expenses', score: 2 },
      { id: 'C', label: 'Usually save but miss occasionally', score: 3 },
      { id: 'D', label: 'Always save a fixed amount', score: 4 }
    ]
  },

  // SECTION 2: Spending & Budgeting
  {
    id: 5,
    sectionId: 2,
    text: 'Do you follow a monthly budget?',
    options: [
      { id: 'A', label: 'No budget at all', score: 1 },
      { id: 'B', label: "I have a rough idea but don't track", score: 2 },
      { id: 'C', label: 'I track sometimes', score: 3 },
      { id: 'D', label: 'I maintain and review a detailed budget', score: 4 }
    ]
  },
  {
    id: 6,
    sectionId: 2,
    text: 'What does your lifestyle spending (eating out, subscriptions, shopping) amount to?',
    options: [
      { id: 'A', label: 'More than 50% of my income', score: 1 },
      { id: 'B', label: '30% - 50% of income', score: 2 },
      { id: 'C', label: '15% - 30% of income', score: 3 },
      { id: 'D', label: 'Less than 15% of income', score: 4 }
    ]
  },
  {
    id: 7,
    sectionId: 2,
    text: 'How do you handle unexpected expenses?',
    options: [
      { id: 'A', label: 'Borrow money or use credit card', score: 1 },
      { id: 'B', label: 'Delay payments or ask family/friends for help', score: 2 },
      { id: 'C', label: 'Reduce other expenses and manage within the month', score: 3 },
      { id: 'D', label: 'Have a dedicated emergency fund I use for this', score: 4 }
    ]
  },
  {
    id: 8,
    sectionId: 2,
    text: 'Do you review your bank/card statements regularly?',
    options: [
      { id: 'A', label: 'Never', score: 1 },
      { id: 'B', label: 'Once in a few months', score: 2 },
      { id: 'C', label: 'Monthly', score: 3 },
      { id: 'D', label: 'Weekly', score: 4 }
    ]
  },

  // SECTION 3: Debt & Liabilities
  {
    id: 9,
    sectionId: 3,
    text: 'Do you have any outstanding loans or EMIs?',
    options: [
      { id: 'A', label: 'Yes, multiple loans and struggling', score: 1 },
      { id: 'B', label: 'Yes, manageable EMIs', score: 3 },
      { id: 'C', label: 'Yes, but almost cleared', score: 3.5 },
      { id: 'D', label: 'No loans at all', score: 4 }
    ]
  },
  {
    id: 10,
    sectionId: 3,
    text: 'What is your approximate EMI-to-income ratio?',
    options: [
      { id: 'A', label: 'More than 60%', score: 1 },
      { id: 'B', label: '40% - 60%', score: 2 },
      { id: 'C', label: '20% - 40%', score: 3 },
      { id: 'D', label: 'Less than 20%', score: 4 },
      { id: 'E', label: 'None / I have no loans', score: 4 }
    ]
  },
  {
    id: 11,
    sectionId: 3,
    text: 'Do you carry a credit card balance month to month?',
    options: [
      { id: 'A', label: 'Yes, regularly', score: 1 },
      { id: 'B', label: 'Sometimes', score: 2 },
      { id: 'C', label: 'Rarely', score: 3 },
      { id: 'D', label: 'Never, I pay in full always', score: 4 },
      { id: 'E', label: "None / I don't have a credit card", score: 4 }
    ]
  },
  {
    id: 12,
    sectionId: 3,
    text: 'Are you aware of your credit score?',
    options: [
      { id: 'A', label: 'No idea', score: 1 },
      { id: 'B', label: "I've checked once", score: 2 },
      { id: 'C', label: 'I check occasionally', score: 3 },
      { id: 'D', label: 'I monitor it regularly', score: 4 }
    ]
  },

  // SECTION 4: Insurance & Protection
  {
    id: 13,
    sectionId: 4,
    text: 'Do you have a health insurance policy?',
    options: [
      { id: 'A', label: 'No insurance', score: 1 },
      { id: 'B', label: 'Only employer-provided coverage', score: 2 },
      { id: 'C', label: 'Personal policy + employer cover', score: 3.5 },
      { id: 'D', label: 'Comprehensive family floater plan', score: 4 }
    ]
  },
  {
    id: 14,
    sectionId: 4,
    text: 'Do you have a term life insurance policy?',
    options: [
      { id: 'A', label: 'No insurance at all', score: 1 },
      { id: 'B', label: 'Have a small/traditional LIC policy', score: 2 },
      { id: 'C', label: 'Have a term plan but under-insured', score: 3 },
      { id: 'D', label: 'Adequately covered with term plan', score: 4 }
    ]
  },
  {
    id: 15,
    sectionId: 4,
    text: 'Do you have any critical illness or disability coverage?',
    options: [
      { id: 'A', label: 'No', score: 1 },
      { id: 'B', label: 'Planning to get one', score: 2 },
      { id: 'C', label: 'Have partial coverage', score: 3 },
      { id: 'D', label: 'Fully covered', score: 4 }
    ]
  },
  {
    id: 16,
    sectionId: 4,
    text: 'Have you made a will or nomination updates?',
    options: [
      { id: 'A', label: 'Not yet', score: 1 },
      { id: 'B', label: 'Only partial nominations', score: 2 },
      { id: 'C', label: 'Nominations done, no will', score: 3 },
      { id: 'D', label: 'Will + all nominations updated', score: 4 }
    ]
  },

  // SECTION 5: Investments & Wealth
  {
    id: 17,
    sectionId: 5,
    text: 'Do you invest regularly for long-term wealth creation?',
    options: [
      { id: 'A', label: 'No investments', score: 1 },
      { id: 'B', label: 'Occasional FDs or RD', score: 2 },
      { id: 'C', label: 'SIPs in mutual funds', score: 3.5 },
      { id: 'D', label: 'Diversified across equity, debt & alternatives', score: 4 }
    ]
  },
  {
    id: 18,
    sectionId: 5,
    text: 'Do you have a retirement corpus goal?',
    options: [
      { id: 'A', label: 'Never thought about it', score: 1 },
      { id: 'B', label: 'Vaguely aware but no plan', score: 2 },
      { id: 'C', label: 'Have an estimate, no systematic savings', score: 3 },
      { id: 'D', label: 'Clear target with ongoing investments', score: 4 }
    ]
  },
  {
    id: 19,
    sectionId: 5,
    text: 'How do you react when markets fall sharply?',
    options: [
      { id: 'A', label: 'Panic and sell everything', score: 1 },
      { id: 'B', label: 'Worry a lot, may sell', score: 2 },
      { id: 'C', label: 'Stay calm, do nothing', score: 3.5 },
      { id: 'D', label: 'Buy more, see it as an opportunity', score: 4 },
      { id: 'E', label: "None / I don't invest yet", score: 1.5 }
    ]
  },
  {
    id: 20,
    sectionId: 5,
    text: 'Do you review your investment portfolio?',
    options: [
      { id: 'A', label: 'Never reviewed', score: 1 },
      { id: 'B', label: 'Once in a few years', score: 2 },
      { id: 'C', label: 'Annually', score: 3 },
      { id: 'D', label: 'Quarterly with rebalancing', score: 4 },
      { id: 'E', label: "None / I don't have a portfolio yet", score: 1.5 }
    ]
  }
];

export const FinancialFitnessQuiz: React.FC<{ userDetails: UserDetails }> = ({ userDetails }) => {
  // App view stages
  const [stage, setStage] = useState<'quiz' | 'sectionComplete' | 'report'>('quiz');
  
  // Quiz progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [completedSectionId, setCompletedSectionId] = useState<number | null>(null);

  // Keyboard shortcut listener (1, 2, 3, 4, 5)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== 'quiz') return;
      const keyNum = parseInt(e.key, 10);
      const currentQ = QUESTIONS[currentQuestionIndex];
      if (keyNum >= 1 && keyNum <= currentQ.options.length) {
        handleSelectOption(currentQ.options[keyNum - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, currentQuestionIndex]);

  // Section score calculation
  const calculateSectionScore = (sectionId: number): number => {
    const sectionQuestions = QUESTIONS.filter((q) => q.sectionId === sectionId);
    let totalScore = 0;
    let answeredCount = 0;

    sectionQuestions.forEach((q) => {
      const selected = answers[q.id];
      if (selected) {
        totalScore += (selected.score / 4) * 100;
        answeredCount++;
      }
    });

    return answeredCount > 0 ? Math.round(totalScore / sectionQuestions.length) : 0;
  };

  // Overall score calculation
  const calculateTotalScore = (): number => {
    const totalPercentageSum = SECTIONS.reduce((acc, sec) => acc + calculateSectionScore(sec.id), 0);
    return Math.round(totalPercentageSum / SECTIONS.length);
  };

  const handleSelectOption = (option: Option) => {
    const currentQ = QUESTIONS[currentQuestionIndex];
    const updatedAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(updatedAnswers);

    const isLastQuestionOfSection =
      currentQuestionIndex === QUESTIONS.length - 1 ||
      QUESTIONS[currentQuestionIndex + 1].sectionId !== currentQ.sectionId;

    if (isLastQuestionOfSection) {
      setCompletedSectionId(currentQ.sectionId);
      setStage('sectionComplete');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleContinueAfterSection = () => {
    if (currentQuestionIndex >= QUESTIONS.length - 1) {
      setStage('report');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setStage('quiz');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQ = QUESTIONS[currentQuestionIndex];
  const currentSection = SECTIONS.find((s) => s.id === currentQ?.sectionId);
  const totalScore = calculateTotalScore();

  // Find lowest-scoring section for the primary actionable recommendation
  const lowestSection = [...SECTIONS].sort((a, b) => calculateSectionScore(a.id) - calculateSectionScore(b.id))[0];

  return (
    <div style={styles.container}>
      {/* Top Fluid Wave SVG */}
      <div style={styles.topWaveContainer}>
        <svg viewBox="0 0 1200 120" style={styles.waveSvg} preserveAspectRatio="none">
          <path
            fill="#084080"
            d="M0,0 C150,90 350,-40 500,45 C650,130 850,20 1000,70 C1100,100 1150,40 1200,60 L1200,0 L0,0 Z"
          />
          <path
            d="M0,0 C200,50 400,-10 600,30 C800,70 1000,-10 1200,20 L1200,0 L0,0 Z"
            fill="#8DC63F"
            opacity="0.55"
          />
        </svg>
        {/* Floating circles */}
        <div style={{ ...styles.dot, top: '24px', left: '60px', width: '22px', height: '22px' }} />
        <div style={{ ...styles.dot, top: '55px', left: '86%', width: '16px', height: '16px' }} />
        <div style={{ ...styles.dot, top: '35px', left: '55%', width: '12px', height: '12px' }} />
      </div>

      <header className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-3 pb-1">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white/85 p-3.5 shadow-lg backdrop-blur-md sm:p-4">
          <h2 className="min-w-0 text-sm font-bold uppercase tracking-wide text-[#084080] sm:text-base">
            {currentSection?.title.replace("&", "and").toUpperCase()}
          </h2>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 sm:gap-5 sm:text-sm">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-[#084080]" />
              <span>Q: {currentQuestionIndex + 1}/{QUESTIONS.length}</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[#8DC63F]" />
              <span>Section: {currentSection?.id ?? 0}/{SECTIONS.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={styles.contentWrap}>
        
        {/* ACTIVE QUESTION SCREEN */}
        {stage === 'quiz' && currentQ && (
          <div style={styles.quizWrapper}>
            {currentQuestionIndex > 0 && (
              <div className="mb-2 w-full sm:w-[92%]">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-[#084080] transition-colors hover:bg-[#084080]/5"
                >
                  <span aria-hidden="true">←</span> Back
                </button>
              </div>
            )}

            {/* Hexagonal Question Banner */}
            <div className="relative mb-5 flex w-full items-center justify-center">
              <div className="absolute left-0 right-1/2 hidden h-1 bg-[#8DC63F] shadow-sm sm:block" />
              <div className="absolute left-1/2 right-0 hidden h-1 bg-[#084080] shadow-sm sm:block" />
              <div className="relative z-10 w-full sm:w-[92%]">
                <div
                  className="bg-gradient-to-r from-[#084080] via-[#0d59b3] to-[#8DC63F] p-1 shadow-xl sm:p-1.5"
                  style={{ clipPath: 'polygon(30px 0%, calc(100% - 30px) 0%, 100% 50%, calc(100% - 30px) 100%, 30px 100%, 0% 50%)' }}
                >
                  <div
                    className="flex min-h-[112px] flex-col items-center justify-center bg-gradient-to-r from-[#0a356a] to-[#084080] px-8 py-6 text-center sm:min-h-[140px] sm:px-14 sm:py-8"
                    style={{ clipPath: 'polygon(27px 0%, calc(100% - 27px) 0%, 100% 50%, calc(100% - 27px) 100%, 27px 100%, 0% 50%)' }}
                  >
                    <span className="mb-2 text-xs font-black uppercase tracking-widest text-[#8DC63F]">
                      Financial Fitness Assessment
                    </span>
                    <h2 className="text-lg font-extrabold leading-snug text-white sm:text-2xl">
                      Q{currentQ.id}. {currentQ.text}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Options Grid */}
            <div className="relative grid w-full grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id]?.id === opt.id;
                return (
                  <div key={opt.id} className="relative z-10">
                    <button
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className="w-full text-left transition-transform hover:-translate-y-1 active:scale-[0.99]"
                    >
                      <div
                        className={`p-1 drop-shadow-sm transition-all hover:drop-shadow-lg ${isSelected ? 'bg-gradient-to-r from-[#084080] to-[#8DC63F]' : 'bg-gradient-to-r from-[#084080]/30 to-[#8DC63F]/40'}`}
                        style={{ clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0% 50%)' }}
                      >
                        <div
                          className={`flex min-h-[64px] items-center gap-3 px-7 py-4 transition-colors sm:min-h-[72px] sm:px-9 sm:py-5 ${isSelected ? 'bg-blue-50/90' : 'bg-white hover:bg-slate-50'}`}
                          style={{ clipPath: 'polygon(18px 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 18px 100%, 0% 50%)' }}
                        >
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-black shadow-sm ${isSelected ? 'border-emerald-600 bg-[#8DC63F] text-slate-900' : 'border-[#8DC63F] bg-[#084080] text-white'}`}>
                            {opt.id}
                          </span>
                          <span className="text-sm font-bold text-slate-800 sm:text-base">
                            {opt.label}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* VIEW 3: SECTION COMPLETE CHECKPOINT */}
        {stage === 'sectionComplete' && completedSectionId && (
          <div style={styles.cardContainer}>
            <div style={styles.checkCircle}>✓</div>
            <h2 style={styles.completeTitle}>Section complete!</h2>
            <h3 style={styles.completeSub}>
              {SECTIONS.find((s) => s.id === completedSectionId)?.title}
            </h3>
            
            <div style={styles.scorePill}>
              {calculateSectionScore(completedSectionId)}% score in this section
            </div>
            
            <p style={styles.completeText}>Great job answering all 4 questions in this module.</p>
            
            {completedSectionId < SECTIONS.length ? (
              <div style={{ marginTop: '20px' }}>
                <p style={styles.upNextText}>
                  Up next: <b>{SECTIONS.find((s) => s.id === completedSectionId + 1)?.title}</b>
                </p>
                <button onClick={handleContinueAfterSection} style={styles.primaryBtn}>
                  Continue →
                </button>
              </div>
            ) : (
              <button onClick={handleContinueAfterSection} style={styles.primaryBtn}>
                See My Results →
              </button>
            )}
          </div>
        )}

        {/* VIEW 4: DIAGNOSTIC REPORT */}
        {stage === 'report' && (
          <div style={styles.reportContainer}>
            {/* Score Hero */}
            <div style={styles.heroScoreCard}>
              <div style={styles.scoreBigNum}>{totalScore}</div>
              <div style={styles.scoreOutOf}>out of 100</div>
              
              <h2 style={styles.fitnessTier}>
                {totalScore >= 75 ? 'Excellent Financial Health' : totalScore >= 50 ? 'Good Financial Fitness' : 'Needs Active Attention'}
              </h2>
              <p style={styles.fitnessSummary}>
                {totalScore >= 75
                  ? `Outstanding discipline, ${userDetails.fullName}! Your financial foundation is robust and built for long-term growth.`
                  : totalScore >= 50
                  ? `You're on the right track, ${userDetails.fullName}! Some gaps need addressing—especially in ${lowestSection.title.toLowerCase()}.`
                  : `You have foundational gaps across critical pillars. Prioritising risk protection and automated savings will transform your trajectory.`}
              </p>
            </div>

            {/* 5-Pillar Breakdown */}
            <h3 style={styles.breakdownHeader}>BREAKDOWN BY PILLAR</h3>
            
            <div style={styles.pillarList}>
              {SECTIONS.map((sec) => {
                const sScore = calculateSectionScore(sec.id);
                return (
                  <div key={sec.id} style={styles.pillarCard}>
                    <div style={styles.pillarHeaderRow}>
                      <span style={styles.pillarTitle}>
                        {sec.icon} {sec.title.toUpperCase()}
                      </span>
                      <span style={{ ...styles.pillarScoreText, color: sScore >= 65 ? '#8DC63F' : '#084080' }}>
                        {sScore}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div style={styles.progressBarBg}>
                      <div
                        style={{
                          ...styles.progressBarFill,
                          width: `${sScore}%`,
                          backgroundColor: sScore >= 65 ? '#8DC63F' : '#084080'
                        }}
                      />
                    </div>

                    <p style={styles.pillarAdvice}>
                      {sScore >= 65 ? sec.adviceHigh : sec.adviceLow}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Callout */}
            <div style={styles.priorityCard}>
              <h4 style={styles.priorityTitle}>YOUR #1 PRIORITY ACTION</h4>
              <p style={styles.priorityBody}>
                <b>{lowestSection.title}</b> is your lowest-scoring area. {lowestSection.adviceLow}
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                  setStage('quiz');
                }}
                style={styles.retakeBtn}
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Fluid Wave SVG */}
      <div style={styles.bottomWaveContainer}>
        <div style={{ ...styles.dot, bottom: '20px', left: '5%', width: '18px', height: '18px' }} />
        <div style={{ ...styles.dot, bottom: '45px', right: '12%', width: '22px', height: '22px' }} />
        <svg viewBox="0 0 1440 220" style={styles.waveSvg} preserveAspectRatio="none">
          <path
            fill="#084080"
            d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,154.7C672,160,768,128,864,106.7C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,220L1392,220C1344,220,1248,220,1152,220C1056,220,960,220,864,220C768,220,672,220,576,220C480,220,384,220,288,220C192,220,96,220,48,220L0,220Z"
          />
        </svg>
      </div>
    </div>
  );
};

// --- STYLES OBJECT (Incorporating Anmol Brand & Vector Polygon Shapes) ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    backgroundColor: '#F9FBFD',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    color: '#084080'
  },
  topWaveContainer: {
    position: 'relative',
    width: '100%',
    lineHeight: 0
  },
  bottomWaveContainer: {
    position: 'relative',
    width: '100%',
    lineHeight: 0
  },
  waveSvg: {
    display: 'block',
    width: '100%',
    height: '110px'
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#8DC63F',
    borderRadius: '50%',
    opacity: 0.85
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 20px',
    zIndex: 2
  },

  // CARD / BOX STYLES
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '36px 30px',
    maxWidth: '560px',
    width: '100%',
    boxShadow: '0 12px 35px rgba(8, 64, 128, 0.08)',
    textAlign: 'center',
    border: '1px solid #E8EEF5'
  },
  logoBadge: {
    fontSize: '28px',
    fontWeight: 900,
    letterSpacing: '2px',
    marginBottom: '2px'
  },
  logoBlueText: { color: '#084080' },
  logoGreenText: { color: '#8DC63F' },
  motto: {
    fontSize: '12px',
    color: '#657E9A',
    letterSpacing: '0.5px',
    marginBottom: '20px'
  },
  mainTitle: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#084080',
    marginBottom: '10px'
  },
  mainSubtitle: {
    fontSize: '14px',
    color: '#4B627D',
    lineHeight: 1.6,
    marginBottom: '20px'
  },
  infoPills: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },
  pill: {
    backgroundColor: '#F0F5FA',
    color: '#084080',
    fontSize: '12px',
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: '20px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  inputLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#084080'
  },
  textInput: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid #D6E2EF',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.2s'
  },
  primaryBtn: {
    backgroundColor: '#8DC63F',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 20px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 14px rgba(141, 198, 63, 0.4)'
  },

  // QUIZ VIEW SPECIFIC
  quizWrapper: {
    maxWidth: '820px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  sectionHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '0 10px'
  },
  sectionBadge: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#8DC63F',
    letterSpacing: '0.8px'
  },
  counterBadge: {
    fontSize: '12px',
    color: '#657E9A',
    fontWeight: 600
  },

  // QUESTION BANNER (Geometric clipped hexagon with side rails)
  bannerRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '28px'
  },
  connectingLineLeft: {
    flex: 1,
    height: '2px',
    backgroundColor: '#8DC63F'
  },
  connectingLineRight: {
    flex: 1,
    height: '2px',
    backgroundColor: '#8DC63F'
  },
  hexQuestionBanner: {
    backgroundColor: '#084080',
    color: '#ffffff',
    padding: '24px 44px',
    clipPath: 'polygon(24px 0%, calc(100% - 24px) 0%, 100% 50%, calc(100% - 24px) 100%, 24px 100%, 0% 50%)',
    boxShadow: '0 8px 25px rgba(8, 64, 128, 0.25)',
    textAlign: 'center',
    minWidth: '60%'
  },
  hexQuestionText: {
    fontSize: '19px',
    fontWeight: 700,
    lineHeight: 1.4,
    margin: 0
  },

  // OPTIONS GRID
  optionsGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center'
  },
  connectingLineSmall: {
    width: '14px',
    height: '2px',
    backgroundColor: '#D6E2EF'
  },
  hexOptionBanner: {
    flex: 1,
    padding: '16px 28px',
    clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0% 50%)',
    border: 'none',
    boxShadow: '0 4px 15px rgba(8, 64, 128, 0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    textAlign: 'left'
  },
  optLetter: {
    fontWeight: 800,
    fontSize: '15px'
  },
  optLabel: {
    fontSize: '14px',
    fontWeight: 600
  },

  // QUIZ FOOTER
  quizFooter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    marginTop: '10px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#657E9A',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '13px'
  },
  keyHint: {
    fontSize: '12px',
    color: '#8CA0B7'
  },

  // CHECKPOINT STYLES
  checkCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#EBF6DF',
    color: '#8DC63F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 auto 16px'
  },
  completeTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#657E9A',
    margin: 0
  },
  completeSub: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#084080',
    marginTop: '4px',
    marginBottom: '12px'
  },
  scorePill: {
    display: 'inline-block',
    backgroundColor: '#084080',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: 700,
    fontSize: '14px',
    marginBottom: '16px'
  },
  completeText: {
    fontSize: '14px',
    color: '#657E9A'
  },
  upNextText: {
    fontSize: '14px',
    color: '#084080',
    marginBottom: '12px'
  },

  // REPORT STYLES
  reportContainer: {
    maxWidth: '680px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '36px 30px',
    boxShadow: '0 12px 35px rgba(8, 64, 128, 0.08)',
    border: '1px solid #E8EEF5'
  },
  heroScoreCard: {
    textAlign: 'center',
    borderBottom: '1px solid #EEF3F8',
    paddingBottom: '24px',
    marginBottom: '24px'
  },
  scoreBigNum: {
    fontSize: '64px',
    fontWeight: 900,
    color: '#084080',
    lineHeight: 1
  },
  scoreOutOf: {
    fontSize: '14px',
    color: '#8CA0B7',
    fontWeight: 600,
    marginBottom: '12px'
  },
  fitnessTier: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#8DC63F',
    marginBottom: '8px'
  },
  fitnessSummary: {
    fontSize: '14px',
    color: '#4B627D',
    lineHeight: 1.6,
    maxWidth: '520px',
    margin: '0 auto'
  },
  breakdownHeader: {
    fontSize: '12px',
    letterSpacing: '1px',
    color: '#8CA0B7',
    fontWeight: 800,
    marginBottom: '16px'
  },
  pillarList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '28px'
  },
  pillarCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: '10px',
    padding: '16px',
    border: '1px solid #EBF0F6'
  },
  pillarHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  pillarTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#084080'
  },
  pillarScoreText: {
    fontSize: '14px',
    fontWeight: 800
  },
  progressBarBg: {
    height: '6px',
    backgroundColor: '#E4ECF4',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.4s ease'
  },
  pillarAdvice: {
    fontSize: '12px',
    color: '#556E89',
    lineHeight: 1.5,
    margin: 0
  },
  priorityCard: {
    backgroundColor: '#F0F9E8',
    borderLeft: '4px solid #8DC63F',
    borderRadius: '6px',
    padding: '14px 18px'
  },
  priorityTitle: {
    fontSize: '12px',
    fontWeight: 800,
    color: '#56831B',
    letterSpacing: '0.5px',
    margin: '0 0 6px 0'
  },
  priorityBody: {
    fontSize: '13px',
    color: '#2C4310',
    lineHeight: 1.5,
    margin: 0
  },
  retakeBtn: {
    background: 'none',
    border: '1.5px solid #084080',
    color: '#084080',
    padding: '10px 24px',
    borderRadius: '6px',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '13px'
  }
};

export default FinancialFitnessQuiz;