import React, { useState, useEffect } from 'react';
import { Award, BarChart3, CheckCircle2, XCircle } from 'lucide-react';

// --- TYPES & INTERFACES ---
export interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface UserDetails {
  fullName: string;
  email: string;
}

// --- 10 FINANCIAL CONFIDENCE QUESTIONS (With Marked Correct Answers) ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What's the first step in building financial confidence?",
    options: [
      { id: 'A', label: 'Investing in stocks', isCorrect: false },
      { id: 'B', label: 'Setting a budget', isCorrect: true },
      { id: 'C', label: 'Buying insurance', isCorrect: false },
      { id: 'D', label: 'Earning more money', isCorrect: false }
    ]
  },
  {
    id: 2,
    text: 'What does an emergency fund help with?',
    options: [
      { id: 'A', label: 'Earning interest', isCorrect: false },
      { id: 'B', label: 'Buying luxury items', isCorrect: false },
      { id: 'C', label: 'Handling unexpected expenses', isCorrect: true },
      { id: 'D', label: 'Paying for vacations', isCorrect: false }
    ]
  },
  {
    id: 3,
    text: 'How much of your income should ideally go to savings?',
    options: [
      { id: 'A', label: '5%', isCorrect: false },
      { id: 'B', label: '10%', isCorrect: false },
      { id: 'C', label: '20%', isCorrect: true },
      { id: 'D', label: '50%', isCorrect: false }
    ]
  },
  {
    id: 4,
    text: 'Which of the following is a sign of financial confidence?',
    options: [
      { id: 'A', label: 'Ignoring bills', isCorrect: false },
      { id: 'B', label: 'Living paycheck to paycheck', isCorrect: false },
      { id: 'C', label: 'Understanding your expenses', isCorrect: true },
      { id: 'D', label: 'Using credit for everything', isCorrect: false }
    ]
  },
  {
    id: 5,
    text: 'Credit score impacts:',
    options: [
      { id: 'A', label: 'Only online shopping', isCorrect: false },
      { id: 'B', label: 'Eligibility for loans and interest rates', isCorrect: true },
      { id: 'C', label: 'Social media reach', isCorrect: false },
      { id: 'D', label: 'Number of debit cards you own', isCorrect: false }
    ]
  },
  {
    id: 6,
    text: "What's a healthy money habit?",
    options: [
      { id: 'A', label: 'Checking your bank balance daily', isCorrect: false },
      { id: 'B', label: 'Setting financial goals', isCorrect: true },
      { id: 'C', label: 'Spending first, saving later', isCorrect: false },
      { id: 'D', label: 'Avoiding all credit', isCorrect: false }
    ]
  },
  {
    id: 7,
    text: 'Compound interest works best when you:',
    options: [
      { id: 'A', label: 'Start late and invest big', isCorrect: false },
      { id: 'B', label: 'Start early and invest regularly', isCorrect: true },
      { id: 'C', label: 'Only invest once', isCorrect: false },
      { id: 'D', label: 'Withdraw monthly', isCorrect: false }
    ]
  },
  {
    id: 8,
    text: 'Diversification in investing means:',
    options: [
      { id: 'A', label: 'Putting all money in one place', isCorrect: false },
      { id: 'B', label: 'Avoiding investment altogether', isCorrect: false },
      { id: 'C', label: 'Spreading investments across different assets', isCorrect: true },
      { id: 'D', label: 'Investing only in real estate', isCorrect: false }
    ]
  },
  {
    id: 9,
    text: 'Which mindset supports financial confidence?',
    options: [
      { id: 'A', label: "I'll never understand money.", isCorrect: false },
      { id: 'B', label: 'Money is too complicated for me.', isCorrect: false },
      { id: 'C', label: 'I can learn and grow financially.', isCorrect: true },
      { id: 'D', label: 'Only the rich can invest.', isCorrect: false }
    ]
  },
  {
    id: 10,
    text: 'Financial freedom means:',
    options: [
      { id: 'A', label: 'Never working again', isCorrect: false },
      { id: 'B', label: 'Winning a lottery', isCorrect: false },
      { id: 'C', label: 'Having control over your finances', isCorrect: true },
      { id: 'D', label: 'Borrowing more to spend more', isCorrect: false }
    ]
  }
];

export const FinancialFitnessQuiz: React.FC<{ userDetails: UserDetails }> = ({ userDetails }) => {
  const [stage, setStage] = useState<'quiz' | 'report'>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Keyboard shortcut listener (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== 'quiz' || isLocked) return;
      const keyNum = parseInt(e.key, 10);
      const currentQ = QUESTIONS[currentQuestionIndex];
      if (keyNum >= 1 && keyNum <= currentQ.options.length) {
        handleSelectOption(currentQ.options[keyNum - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, currentQuestionIndex, isLocked]);

  const handleSelectOption = (option: Option) => {
    if (isLocked) return;
    setIsLocked(true);
    setSelectedOption(option);

    const currentQ = QUESTIONS[currentQuestionIndex];
    const updatedAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(updatedAnswers);

    // Brief delay to display correct/incorrect feedback before advancing
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsLocked(false);
      } else {
        setStage('report');
      }
    }, 900);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0 && !isLocked) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOption(null);
    }
  };

  // Calculate total score out of 10
  const scoreCount = Object.values(answers).filter((a) => a.isCorrect).length;

  const currentQ = QUESTIONS[currentQuestionIndex];

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
            FINANCIAL CONFIDENCE QUIZ
          </h2>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 sm:gap-5 sm:text-sm">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-[#084080]" />
              <span>Question: {currentQuestionIndex + 1}/{QUESTIONS.length}</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[#8DC63F]" />
              <span>Score: {scoreCount}</span>
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
                  disabled={isLocked}
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
                      Build Financial Confidence
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
                const isSelected = selectedOption?.id === opt.id;
                const showFeedback = isLocked && isSelected;
                const isOptionCorrect = opt.isCorrect;

                let borderGradient = 'bg-gradient-to-r from-[#084080]/30 to-[#8DC63F]/40';
                let innerBackground = 'bg-white hover:bg-slate-50';

                if (showFeedback) {
                  if (isOptionCorrect) {
                    borderGradient = 'bg-gradient-to-r from-emerald-500 to-[#8DC63F]';
                    innerBackground = 'bg-emerald-50';
                  } else {
                    borderGradient = 'bg-gradient-to-r from-rose-500 to-red-600';
                    innerBackground = 'bg-rose-50';
                  }
                }

                return (
                  <div key={opt.id} className="relative z-10">
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full text-left transition-transform hover:-translate-y-1 active:scale-[0.99]"
                    >
                      <div
                        className={`p-1 drop-shadow-sm transition-all hover:drop-shadow-lg ${borderGradient}`}
                        style={{ clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0% 50%)' }}
                      >
                        <div
                          className={`flex min-h-[64px] items-center justify-between gap-3 px-7 py-4 transition-colors sm:min-h-[72px] sm:px-9 sm:py-5 ${innerBackground}`}
                          style={{ clipPath: 'polygon(18px 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 18px 100%, 0% 50%)' }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-black shadow-sm ${
                                showFeedback
                                  ? isOptionCorrect
                                    ? 'border-emerald-600 bg-[#8DC63F] text-slate-900'
                                    : 'border-rose-600 bg-rose-600 text-white'
                                  : 'border-[#8DC63F] bg-[#084080] text-white'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span className="text-sm font-bold text-slate-800 sm:text-base">
                              {opt.label}
                            </span>
                          </div>

                          {showFeedback && (
                            <div>
                              {isOptionCorrect ? (
                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-rose-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center text-xs font-medium text-slate-400">
              Press <b>1</b>, <b>2</b>, <b>3</b>, or <b>4</b> on your keyboard to select
            </div>
          </div>
        )}

        {/* REPORT SCREEN */}
        {stage === 'report' && (
          <div style={styles.reportContainer}>
            {/* Score Hero */}
            <div style={styles.heroScoreCard}>
              <div style={styles.scoreBigNum}>{scoreCount}/10</div>
              <div style={styles.scoreOutOf}>Your Score</div>
              
              <h2 style={styles.fitnessTier}>
                {scoreCount >= 8
                  ? 'High Financial Confidence!'
                  : scoreCount >= 5
                  ? 'Good Understanding!'
                  : 'Getting Started!'}
              </h2>
              <p style={styles.fitnessSummary}>
                {scoreCount < 5
                  ? 'Everyone starts somewhere. The key is awareness—now build from here!'
                  : 'You have a solid grip on your money fundamentals. Continue leveling up your financial habits!'}
              </p>
            </div>

            {/* 3 Ways to Boost Your Financial Confidence */}
            <div className="mb-6">
              <h3 style={styles.breakdownHeader}>3 WAYS TO BOOST YOUR FINANCIAL CONFIDENCE</h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 text-left">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8DC63F] text-xs font-bold text-white">1</span>
                  <p className="text-sm font-semibold text-slate-700">
                    Track your expenses weekly to see where your money goes.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 text-left">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8DC63F] text-xs font-bold text-white">2</span>
                  <p className="text-sm font-semibold text-slate-700">
                    Read 1 article or watch a short video daily.{' '}
                    <a href="#" className="font-bold text-[#084080] underline hover:text-[#8DC63F]">
                      Visit our blog
                    </a>
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 text-left">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8DC63F] text-xs font-bold text-white">3</span>
                  <p className="text-sm font-semibold text-slate-700">
                    Set one small financial goal every month—then celebrate your win!
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setIsLocked(false);
                  setStage('quiz');
                }}
                style={styles.retakeBtn}
              >
                Retake Quiz
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
            d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,154.7C672,160,768,128,864,106.7C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,220L1392,220C1344,220,1248,220,1152,220C1056,220,960,220,864,220C768,220,672,220,576,220C480,220,384,220,288,220C192,220,96,220,48,220Z"
          />
        </svg>
      </div>
    </div>
  );
};

// --- STYLES OBJECT ---
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
  quizWrapper: {
    maxWidth: '820px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  reportContainer: {
    maxWidth: '620px',
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
    paddingBottom: '20px',
    marginBottom: '20px'
  },
  scoreBigNum: {
    fontSize: '56px',
    fontWeight: 900,
    color: '#084080',
    lineHeight: 1
  },
  scoreOutOf: {
    fontSize: '13px',
    color: '#8CA0B7',
    fontWeight: 600,
    marginBottom: '8px'
  },
  fitnessTier: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#8DC63F',
    marginBottom: '6px'
  },
  fitnessSummary: {
    fontSize: '14px',
    color: '#4B627D',
    lineHeight: 1.5,
    margin: '0 auto'
  },
  breakdownHeader: {
    fontSize: '12px',
    letterSpacing: '0.8px',
    color: '#8CA0B7',
    fontWeight: 800,
    marginBottom: '14px',
    textAlign: 'left'
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