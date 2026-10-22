import type { BenchmarkRow, CalculatorReport, DelayCard, ReportHighlight, YearRow } from "./types";
import {
  DISCLAIMER,
  INVEST_STEPS,
  LOAN_STEPS,
  delayNote,
  inr,
  realValue,
  riskLabel,
  sipFuture,
} from "./format";

const GROWTH_COLUMNS: CalculatorReport["columns"] = ["Year", "Added", "Invested", "Gain", "Closing value"];
const LOAN_COLUMNS: CalculatorReport["columns"] = ["Year", "Principal paid", "Principal repaid", "Interest paid", "Balance left"];

function shell(partial: Omit<CalculatorReport, "disclaimer" | "showMultiplier" | "bar" | "chartTitle" | "benchmarks" | "benchmarkHeading" | "benchmarkRateLabel" | "benchmarkValueLabel" | "highlight" | "delays" | "delayHeading"> & Partial<Pick<CalculatorReport, "showMultiplier" | "bar" | "chartTitle" | "benchmarks" | "benchmarkHeading" | "benchmarkRateLabel" | "benchmarkValueLabel" | "highlight" | "delays" | "delayHeading">>): CalculatorReport {
  return {
    showMultiplier: true,
    bar: "closing",
    chartTitle: "Cumulative asset growth",
    benchmarks: [],
    benchmarkHeading: "This plan vs traditional instruments",
    benchmarkRateLabel: "Rate",
    benchmarkValueLabel: "Final value",
    highlight: null,
    delays: [],
    delayHeading: "The cost of starting later",
    disclaimer: DISCLAIMER,
    ...partial,
  };
}

export function composeSip(input: {
  monthly: number;
  months: number;
  rate: number;
  invested: number;
  growth: number;
  futureValue: number;
  rows: { year: number; months: number; invested: number; growth: number; value: number }[];
}): CalculatorReport {
  const years = input.months / 12;
  const rows: YearRow[] = input.rows.map((row, index) => {
    const previous = index === 0 ? 0 : input.rows[index - 1].months;
    return {
      label: String(row.year),
      deposit: input.monthly * (row.months - previous),
      invested: row.invested,
      gain: row.growth,
      closing: row.value,
    };
  });
  const stepped = stepUpFuture(input.monthly, Math.max(1, Math.round(years)), input.rate, 10);
  return shell({
    slug: "sip-calculator",
    heading: "SIP Investment Report",
    eyebrow: "Wealth forecast and compounding strategy",
    frequency: "Monthly (auto-debit)",
    objective: "Long-term wealth",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Monthly SIP", value: inr(input.monthly) },
      { label: "Expected return", value: `${input.rate.toFixed(2)}% p.a.` },
      { label: "Horizon", value: formatSpan(input.months) },
    ],
    heroLabel: "Estimated total value at maturity",
    heroValue: input.futureValue,
    primaryLabel: "Amount invested",
    primaryValue: input.invested,
    secondaryLabel: "Wealth gain",
    secondaryValue: input.growth,
    rows,
    chartTitle: "Cumulative asset growth (principal vs gain)",
    columns: GROWTH_COLUMNS,
    ...sipAdvisory(input.monthly, input.months, input.rate, input.futureValue, input.invested),
    comparisons: rateComparisons(input.monthly, input.months, input.rate, input.futureValue),
    notes: [
      {
        title: "A 10% yearly step-up",
        body: `Raising the same SIP by 10% each year finishes near ${inr(stepped)} in this illustration, against ${inr(input.futureValue)} if the instalment stays flat.`,
      },
      {
        title: "Cost of starting later",
        body: delayNote(
          input.futureValue,
          sipFuture(input.monthly, Math.max(0, input.months - 6), input.rate),
          sipFuture(input.monthly, Math.max(0, input.months - 12), input.rate),
          sipFuture(input.monthly, Math.max(0, input.months - 36), input.rate),
        ),
      },
    ],
    inflationNote: `At 6% inflation, ${inr(input.futureValue)} has about the buying power of ${inr(realValue(input.futureValue, years))} in today's rupees.`,
    realValue: realValue(input.futureValue, years),
    steps: INVEST_STEPS,
    narrative: "The year-by-year table uses the same start-of-month SIP formula as the calculator on screen.",
  });
}

export function composeGoalSip(input: {
  target: number;
  years: number;
  rate: number;
  monthly: number;
  invested: number;
  growth: number;
}): CalculatorReport {
  const months = input.years * 12;
  const rows = yearlySipRows(input.monthly, months, input.rate);
  return shell({
    slug: "goal-based-sip",
    heading: "Goal-Based SIP Report",
    eyebrow: "Monthly amount that funds the goal",
    frequency: "Monthly (auto-debit)",
    objective: "Named financial goal",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Goal amount", value: inr(input.target) },
      { label: "Required SIP", value: inr(input.monthly) },
      { label: "Horizon", value: `${input.years} years` },
    ],
    heroLabel: "Target corpus",
    heroValue: input.target,
    primaryLabel: "Amount invested",
    primaryValue: input.invested,
    secondaryLabel: "Estimated growth",
    secondaryValue: input.growth,
    rows,
    chartTitle: "Cumulative asset growth (principal vs gain)",
    columns: GROWTH_COLUMNS,
    ...sipAdvisory(input.monthly, months, input.rate, sipFuture(input.monthly, months, input.rate), input.invested),
    comparisons: rateComparisons(input.monthly, months, input.rate, sipFuture(input.monthly, months, input.rate)),
    notes: [
      {
        title: "Stay with the goal",
        body: `This SIP is the instalment that reaches ${inr(input.target)} if the return stays at ${input.rate}% and every debit goes through.`,
      },
      {
        title: "Cost of starting later",
        body: delayNote(
          input.target,
          sipFuture(input.monthly, Math.max(0, months - 6), input.rate),
          sipFuture(input.monthly, Math.max(0, months - 12), input.rate),
          sipFuture(input.monthly, Math.max(0, months - 36), input.rate),
        ),
      },
    ],
    inflationNote: `At 6% inflation, the goal of ${inr(input.target)} is about ${inr(realValue(input.target, input.years))} in today's rupees.`,
    realValue: realValue(input.target, input.years),
    steps: INVEST_STEPS,
    narrative: "The monthly SIP is solved from the target, the horizon and the return you entered.",
  });
}

export function composeTopUp(input: {
  slug: string;
  heading: string;
  objective: string;
  monthly: number;
  years: number;
  rate: number;
  stepLabel: string;
  invested: number;
  growth: number;
  futureValue: number;
  flatValue?: number;
  rows: { label: string; deposit: number; invested: number; closing: number }[];
}): CalculatorReport {
  const mapped = input.rows.map((row) => ({
    label: row.label,
    deposit: row.deposit,
    invested: row.invested,
    gain: row.closing - row.invested,
    closing: row.closing,
  }));
  return shell({
    slug: input.slug,
    heading: input.heading,
    eyebrow: "Step-up investing",
    frequency: "Monthly, rising once a year",
    objective: input.objective,
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Opening SIP", value: inr(input.monthly) },
      { label: "Annual top-up", value: input.stepLabel },
      { label: "Horizon", value: `${input.years} years` },
    ],
    heroLabel: "Estimated value with the top-up",
    heroValue: input.futureValue,
    primaryLabel: "Amount invested",
    primaryValue: input.invested,
    secondaryLabel: "Wealth gain",
    secondaryValue: input.growth,
    rows: mapped,
    columns: GROWTH_COLUMNS,
    ...topUpAdvisory(input.monthly, input.years, input.rate, input.futureValue, input.invested, input.flatValue),
    comparisons: input.flatValue
      ? [
          { title: "Flat SIP, no top-up", value: input.flatValue, note: "The same opening instalment held constant." },
          { title: "With the top-up you set", value: input.futureValue, note: input.stepLabel },
          { title: "Extra corpus from stepping up", value: input.futureValue - input.flatValue, note: "The difference between the two illustrations." },
        ]
      : [],
    notes: [
      {
        title: "The top-up does the heavy lifting",
        body: input.flatValue
          ? `A flat SIP ends near ${inr(input.flatValue)}. The top-up path ends near ${inr(input.futureValue)}.`
          : `The instalment begins at ${inr(input.monthly)} and then follows the top-up of ${input.stepLabel}.`,
      },
    ],
    inflationNote: `At 6% inflation, ${inr(input.futureValue)} is about ${inr(realValue(input.futureValue, input.years))} in today's rupees.`,
    realValue: realValue(input.futureValue, input.years),
    steps: INVEST_STEPS,
    narrative: "Each row follows the calculator: the SIP compounds monthly, then the top-up is applied at the next year.",
  });
}

export function composeLumpsum(input: {
  slug: string;
  heading: string;
  objective: string;
  heroLabel: string;
  principal: number;
  years: number;
  rate: number;
  futureValue: number;
  growth: number;
  frequency: string;
  narrative: string;
}): CalculatorReport {
  const rows = lumpsumRows(input.principal, input.years, input.rate);
  const later = (cut: number) => input.principal * Math.pow(1 + input.rate / 100, Math.max(0, input.years - cut));
  return shell({
    slug: input.slug,
    heading: input.heading,
    eyebrow: "One-time investment",
    frequency: input.frequency,
    objective: input.objective,
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Invested today", value: inr(input.principal) },
      { label: "Expected return", value: `${input.rate.toFixed(2)}% p.a.` },
      { label: "Horizon", value: `${input.years} years` },
    ],
    heroLabel: input.heroLabel,
    heroValue: input.futureValue,
    primaryLabel: "Amount invested",
    primaryValue: input.principal,
    secondaryLabel: "Wealth gain",
    secondaryValue: input.growth,
    rows,
    columns: GROWTH_COLUMNS,
    ...lumpsumAdvisory(input.principal, input.years, input.rate, input.futureValue),
    comparisons: [
      { title: "Savings account at 3.5%", value: input.principal * Math.pow(1.035, input.years), note: "Same amount, no market risk." },
      { title: "Fixed deposit at 6.8%", value: input.principal * Math.pow(1.068, input.years), note: "A steady rate over the same years." },
      { title: `This plan at ${input.rate.toFixed(2)}%`, value: input.futureValue, note: "The return selected on the calculator." },
    ],
    notes: [
      {
        title: "Cost of investing later",
        body: delayNote(input.futureValue, later(0.5), later(1), later(3)),
      },
    ],
    inflationNote: `At 6% inflation, ${inr(input.futureValue)} is about ${inr(realValue(input.futureValue, input.years))} in today's rupees.`,
    realValue: realValue(input.futureValue, input.years),
    steps: INVEST_STEPS,
    narrative: input.narrative,
  });
}

export function composeCompounding(input: {
  principal: number;
  rate: number;
  years: number;
  interval: string;
  periodsPerYear: number;
  maturity: number;
  interest: number;
}): CalculatorReport {
  const rows: YearRow[] = [];
  const start = new Date().getFullYear();
  for (let year = 1; year <= input.years; year += 1) {
    const closing = input.principal * Math.pow(1 + input.rate / 100 / input.periodsPerYear, input.periodsPerYear * year);
    rows.push({
      label: String(start + year - 1),
      deposit: year === 1 ? input.principal : 0,
      invested: input.principal,
      gain: closing - input.principal,
      closing,
    });
  }
  return shell({
    slug: "compounding-calculator",
    heading: "Compounding Report",
    eyebrow: "What time does to an invested rupee",
    frequency: input.interval,
    objective: "See compounding at work",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Principal", value: inr(input.principal) },
      { label: "Compounding", value: input.interval },
      { label: "Rate", value: `${input.rate}% p.a.` },
    ],
    heroLabel: "Maturity amount",
    heroValue: input.maturity,
    primaryLabel: "Principal",
    primaryValue: input.principal,
    secondaryLabel: "Interest earned",
    secondaryValue: input.interest,
    rows,
    columns: GROWTH_COLUMNS,
    ...compoundingAdvisory(input.principal, input.rate, input.years, input.periodsPerYear, input.maturity),
    comparisons: [],
    notes: [
      {
        title: "Frequency changes the result",
        body: `${input.interval} compounding at ${input.rate}% turns ${inr(input.principal)} into ${inr(input.maturity)} over ${input.years} years.`,
      },
    ],
    inflationNote: `At 6% inflation, the maturity amount is about ${inr(realValue(input.maturity, input.years))} in today's rupees.`,
    realValue: realValue(input.maturity, input.years),
    steps: INVEST_STEPS,
    narrative: "Maturity uses compound interest: principal times (1 + rate / frequency) raised to frequency times years.",
  });
}

export function composeLoan(input: {
  slug: string;
  heading: string;
  objective: string;
  principal: number;
  emi: number;
  interest: number;
  total: number;
  rate: number;
  tenureLabel: string;
  repaymentMonths?: number;
  balanceAtEmi?: number;
  rows: { year: number; principalPaid: number; interestPaid: number; endBalance: number }[];
}): CalculatorReport {
  let repaid = 0;
  let interest = 0;
  const rows = input.rows.map((row) => {
    repaid += row.principalPaid;
    interest += row.interestPaid;
    return {
      label: String(row.year),
      deposit: row.principalPaid,
      invested: repaid,
      gain: interest,
      closing: row.endBalance,
    };
  });
  const years = input.rows.length;
  return shell({
    slug: input.slug,
    heading: input.heading,
    eyebrow: "EMI and total cost of credit",
    frequency: "Monthly EMI",
    objective: input.objective,
    risk: "Fixed obligation",
    metrics: [
      { label: "EMI", value: inr(input.emi) },
      { label: "Interest rate", value: `${input.rate}% p.a.` },
      { label: "Tenure", value: input.tenureLabel },
    ],
    heroLabel: "Total amount payable",
    heroValue: input.total,
    primaryLabel: "Principal",
    primaryValue: input.principal,
    secondaryLabel: "Interest",
    secondaryValue: input.interest,
    rows,
    columns: LOAN_COLUMNS,
    ...loanAdvisory(input.balanceAtEmi ?? input.principal, input.rate, input.repaymentMonths ?? monthsFromLabel(input.tenureLabel, years), input.total),
    comparisons: [
      { title: "Principal you borrow", value: input.principal, note: "The amount that is repaid." },
      { title: "Interest over the tenure", value: input.interest, note: "The cost of borrowing on this schedule." },
      { title: "Total paid back", value: input.total, note: "EMI multiplied by the number of months." },
    ],
    notes: [
      {
        title: "Interest is front-loaded",
        body: "Early EMIs pay more interest than principal. Extra payments in those years shorten the balance faster than the same rupee paid later.",
      },
    ],
    inflationNote: years
      ? `The schedule runs for about ${years} years. A 6% rise in prices does not reduce the EMI; the EMI stays in nominal rupees.`
      : "",
    realValue: 0,
    steps: LOAN_STEPS,
    narrative: "The yearly rows add each month's principal and interest, using the same EMI formula as the calculator.",
  });
}

export function composeRetirement(input: {
  years: number;
  monthlyNeedToday: number;
  futureMonthlyNeed: number;
  corpus: number;
  currentSavings: number;
  savingsAtRetirement: number;
  monthlySip: number;
  rate: number;
  inflation: number;
  invested: number;
}): CalculatorReport {
  const rows: YearRow[] = [];
  const start = new Date().getFullYear();
  for (let year = 1; year <= input.years; year += 1) {
    const months = year * 12;
    const sipValue = sipFuture(input.monthlySip, months, input.rate);
    const savings = input.currentSavings * Math.pow(1 + input.rate / 100, year);
    const invested = input.monthlySip * months + input.currentSavings;
    const closing = sipValue + savings;
    rows.push({
      label: String(start + year - 1),
      deposit: input.monthlySip * 12,
      invested,
      gain: closing - invested,
      closing,
    });
  }
  return shell({
    slug: "retirement-planning-calculator",
    heading: "Retirement Planning Report",
    eyebrow: "Corpus for the income you want",
    frequency: "Monthly SIP until retirement",
    objective: "Retirement income",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Monthly SIP required", value: inr(input.monthlySip) },
      { label: "Years to retirement", value: `${input.years}` },
      { label: "Income at retirement", value: `${inr(input.futureMonthlyNeed)} / month` },
    ],
    heroLabel: "Retirement corpus (200 x monthly need)",
    heroValue: input.corpus,
    primaryLabel: "SIP contributions",
    primaryValue: input.invested,
    secondaryLabel: "Growth and existing savings",
    secondaryValue: Math.max(0, input.corpus - input.invested),
    rows,
    columns: GROWTH_COLUMNS,
    ...retirementAdvisory(input.monthlySip, input.years, input.rate, input.currentSavings),
    comparisons: [
      { title: "Income you entered, in today's rupees", value: input.monthlyNeedToday, note: "Before inflation." },
      { title: "Same lifestyle at retirement", value: input.futureMonthlyNeed, note: `Lifted by ${input.inflation}% inflation.` },
      { title: "Current savings, grown to retirement", value: input.savingsAtRetirement, note: "Before the new SIP is added." },
    ],
    notes: [
      {
        title: "How the corpus is set",
        body: `The calculator takes the inflated monthly need and multiplies by 200. Current savings are grown at ${input.rate}% and subtracted. The SIP funds what remains.`,
      },
    ],
    inflationNote: `At ${input.inflation}% inflation, the corpus of ${inr(input.corpus)} is about ${inr(realValue(input.corpus, input.years, input.inflation))} in today's rupees.`,
    realValue: realValue(input.corpus, input.years, input.inflation),
    steps: INVEST_STEPS,
    narrative: "Closing value each year is the SIP future value plus current savings grown at the same return.",
  });
}

export function composeNps(input: {
  monthly: number;
  years: number;
  rate: number;
  annuityRate: number;
  annuityPercent: number;
  invested: number;
  corpus: number;
  growth: number;
  annuity: number;
  lumpSum: number;
  pension: number;
}): CalculatorReport {
  const rows = endOfMonthRows(input.monthly, input.years, input.rate);
  return shell({
    slug: "nps-calculator",
    heading: "NPS Retirement Report",
    eyebrow: "Corpus, annuity and pension",
    frequency: "Monthly contribution to age 60",
    objective: "National Pension System",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Monthly contribution", value: inr(input.monthly) },
      { label: "Annuity share", value: `${input.annuityPercent}%` },
      { label: "Estimated pension", value: `${inr(input.pension)} / month` },
    ],
    heroLabel: "Estimated NPS corpus at 60",
    heroValue: input.corpus,
    primaryLabel: "Amount invested",
    primaryValue: input.invested,
    secondaryLabel: "Growth",
    secondaryValue: input.growth,
    rows,
    columns: GROWTH_COLUMNS,
    ...sipAdvisory(input.monthly, input.years * 12, input.rate, input.corpus, input.invested),
    comparisons: [
      { title: "Corpus", value: input.corpus, note: `Grown at ${input.rate}% until age 60.` },
      { title: "Used to buy an annuity", value: input.annuity, note: `${input.annuityPercent}% of the corpus.` },
      { title: "Withdrawn as a lump sum", value: input.lumpSum, note: "The balance after the annuity." },
    ],
    notes: [
      {
        title: "Pension estimate",
        body: `The annuity of ${inr(input.annuity)} at ${input.annuityRate}% a year pays about ${inr(input.pension)} a month. Annuity quotes from insurers will differ.`,
      },
    ],
    inflationNote: `At 6% inflation, the corpus is about ${inr(realValue(input.corpus, input.years))} in today's rupees.`,
    realValue: realValue(input.corpus, input.years),
    steps: [
      { title: "Open the NPS account", body: "Complete PRAN registration with PAN and bank details." },
      { title: "Set the contribution", body: "Match the monthly debit to the amount in this report." },
      { title: "Review the annuity later", body: "The pension depends on the annuity rate available when you turn 60." },
    ],
    narrative: "The corpus compounds each contribution at the end of the month, which is how the calculator builds the total.",
  });
}

export function composeChild(input: {
  monthly: number;
  years: number;
  rate: number;
  inflation: number;
  futureCost: number;
  invested: number;
  growth: number;
  rows: { year: string; investedThisYear: number; totalInvestedCumulative: number; endCorpus: number }[];
}): CalculatorReport {
  const rows = input.rows.map((row) => ({
    label: row.year,
    deposit: row.investedThisYear,
    invested: row.totalInvestedCumulative,
    gain: row.endCorpus - row.totalInvestedCumulative,
    closing: row.endCorpus,
  }));
  return shell({
    slug: "child-education-planner",
    heading: "Child Education Report",
    eyebrow: "A SIP for the inflated cost of college",
    frequency: "Monthly SIP",
    objective: "Child's education",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Monthly SIP", value: inr(input.monthly) },
      { label: "Years to college", value: `${input.years}` },
      { label: "Education inflation", value: `${input.inflation}%` },
    ],
    heroLabel: "Future education cost",
    heroValue: input.futureCost,
    primaryLabel: "Amount invested",
    primaryValue: input.invested,
    secondaryLabel: "Estimated growth",
    secondaryValue: input.growth,
    rows,
    columns: GROWTH_COLUMNS,
    ...sipAdvisory(input.monthly, input.years * 12, input.rate, input.futureCost, input.invested),
    benchmarkHeading: "Where this education SIP finishes",
    comparisons: [],
    notes: [
      {
        title: "The goal is already inflated",
        body: `Today's cost is lifted by ${input.inflation}% a year. The SIP is the instalment that reaches that future cost at ${input.rate}%.`,
      },
    ],
    inflationNote: `The hero figure is already in future rupees. In today's buying power, at ${input.inflation}%, it is about ${inr(realValue(input.futureCost, input.years, input.inflation))}.`,
    realValue: realValue(input.futureCost, input.years, input.inflation),
    steps: INVEST_STEPS,
    narrative: "Year labels include the child's age. Closing value is the education corpus at the end of that year.",
  });
}

export function composeComposite(input: {
  tab: string;
  years: number;
  rate: number;
  inflation: number;
  target: number;
  existing: number;
  sip: number;
  invested: number;
  growth: number;
  rows: { year: number; invested: number; interest: number; total: number }[];
}): CalculatorReport {
  let previous = 0;
  const rows = input.rows.map((row) => {
    const deposit = row.invested - previous;
    previous = row.invested;
    return {
      label: String(row.year),
      deposit,
      invested: row.invested,
      gain: row.interest,
      closing: row.total,
    };
  });
  return shell({
    slug: "composite-financial-goal-planner",
    heading: "Composite Goal Report",
    eyebrow: `${input.tab} goal`,
    frequency: "Monthly SIP for the active goal",
    objective: input.tab,
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Monthly SIP", value: inr(input.sip) },
      { label: "Horizon", value: `${input.years} years` },
      { label: "Inflation", value: `${input.inflation}%` },
    ],
    heroLabel: "Inflated goal",
    heroValue: input.target,
    primaryLabel: "SIP invested",
    primaryValue: input.invested,
    secondaryLabel: "Growth on the SIP",
    secondaryValue: input.growth,
    rows,
    columns: GROWTH_COLUMNS,
    ...sipAdvisory(input.sip, input.years * 12, input.rate, input.invested + input.growth, input.invested),
    benchmarkHeading: "Where this goal's SIP finishes",
    comparisons: [
      { title: "Inflated goal", value: input.target, note: "Today's target lifted by inflation." },
      { title: "Existing savings, grown", value: input.existing, note: "What the current savings can cover." },
      { title: "Gap funded by the SIP", value: Math.max(0, input.target - input.existing), note: "The SIP is solved for this gap." },
    ],
    notes: [
      {
        title: "This page follows the open tab",
        body: `The report uses the ${input.tab} tab. Switch tabs and download again for the other goals.`,
      },
    ],
    inflationNote: `At ${input.inflation}% inflation, the goal is about ${inr(realValue(input.target, input.years, input.inflation))} in today's rupees.`,
    realValue: realValue(input.target, input.years, input.inflation),
    steps: INVEST_STEPS,
    narrative: "The schedule funds only the gap after existing savings have been grown at the expected return.",
  });
}

export function composeSwp(input: {
  slug: string;
  heading: string;
  corpus: number;
  withdrawalLabel: string;
  years: number;
  rate: number;
  withdrawn: number;
  earnings: number;
  finalValue: number;
  rows: { year: string; startBalance: number; withdrawn: number; endBalance: number }[];
  monthly: number;
  note: string;
}): CalculatorReport {
  let withdrawn = 0;
  let earnings = 0;
  const rows = input.rows.map((row) => {
    const interest = row.endBalance - (row.startBalance - row.withdrawn);
    withdrawn += row.withdrawn;
    earnings += interest;
    return {
      label: row.year,
      deposit: row.withdrawn,
      invested: withdrawn,
      gain: earnings,
      closing: row.endBalance,
    };
  });
  return shell({
    slug: input.slug,
    heading: input.heading,
    eyebrow: "Income drawn from a corpus",
    frequency: "Monthly withdrawal",
    objective: "Systematic withdrawal",
    risk: riskLabel(input.rate),
    metrics: [
      { label: "Starting corpus", value: inr(input.corpus) },
      { label: "Withdrawal", value: input.withdrawalLabel },
      { label: "Horizon", value: `${input.years} years` },
    ],
    heroLabel: "Total withdrawn",
    heroValue: input.withdrawn,
    primaryLabel: "Corpus you started with",
    primaryValue: input.corpus,
    secondaryLabel: "Balance left",
    secondaryValue: input.finalValue,
    rows,
    columns: ["Year", "Withdrawn", "Withdrawn so far", "Growth", "Balance left"],
    showMultiplier: false,
    ...swpAdvisory(input.corpus, input.monthly, input.years, input.rate, input.finalValue),
    comparisons: [
      { title: "Starting corpus", value: input.corpus, note: "Invested once, at the beginning." },
      { title: "Paid out over the horizon", value: input.withdrawn, note: "Withdrawals are taken at the start of each month." },
      { title: "Still invested at the end", value: input.finalValue, note: `Growth along the way was about ${inr(input.earnings)}.` },
    ],
    notes: [{ title: "Will the corpus last?", body: input.note }],
    inflationNote: input.years
      ? `Prices at 6% would make the closing balance of ${inr(input.finalValue)} worth about ${inr(realValue(input.finalValue, input.years))} today.`
      : "",
    realValue: realValue(input.finalValue, input.years),
    steps: [
      { title: "Park the corpus", body: "The withdrawal plan assumes the full corpus is invested on day one." },
      { title: "Fix the payout date", body: "Match the monthly credit to the amount in this report." },
      { title: "Review once a year", body: "If the balance falls faster than this illustration, lower the payout." },
    ],
    narrative: "Each month the calculator withdraws first, then grows whatever balance remains.",
  });
}

export function composeInflation(input: {
  today: number;
  rate: number;
  years: number;
  future: number;
  impact: number;
}): CalculatorReport {
  const rows: YearRow[] = [];
  const start = new Date().getFullYear();
  for (let year = 1; year <= input.years; year += 1) {
    const closing = input.today * Math.pow(1 + input.rate / 100, year);
    rows.push({
      label: String(start + year - 1),
      deposit: year === 1 ? input.today : 0,
      invested: input.today,
      gain: closing - input.today,
      closing,
    });
  }
  return shell({
    slug: "future-value-inflation-calculator",
    heading: "Inflation Impact Report",
    eyebrow: "What the same purchase costs later",
    frequency: "Annual inflation",
    objective: "Protect purchasing power",
    risk: "Cost inflation",
    metrics: [
      { label: "Cost today", value: inr(input.today) },
      { label: "Inflation", value: `${input.rate}%` },
      { label: "Horizon", value: `${input.years} years` },
    ],
    heroLabel: "Estimated future cost",
    heroValue: input.future,
    primaryLabel: "Cost today",
    primaryValue: input.today,
    secondaryLabel: "Extra rupees needed",
    secondaryValue: input.impact,
    rows,
    columns: ["Year", "Starting cost", "Cost today", "Increase", "Future cost"],
    ...inflationAdvisory(input.today, input.rate, input.years, input.future),
    comparisons: [],
    notes: [
      {
        title: "A goal has to outrun this",
        body: `A purchase of ${inr(input.today)} needs about ${inr(input.future)} if prices rise at ${input.rate}% for ${input.years} years.`,
      },
    ],
    inflationNote: "The hero figure is the future price. The secondary figure is how many more rupees the same purchase takes.",
    realValue: input.today,
    steps: INVEST_STEPS,
    narrative: "Future cost equals today's cost compounded once a year at the inflation rate.",
  });
}

export function composeCii(input: {
  purchaseYear: string;
  saleYear: string;
  purchase: number;
  sale: number;
  ciiPurchase: number;
  ciiSale: number;
  indexedCost: number;
  gain: number;
  tax: number;
}): CalculatorReport {
  return shell({
    slug: "cost-inflation-index",
    heading: "Cost Inflation Index Report",
    eyebrow: "Indexed cost and estimated tax",
    frequency: `${input.purchaseYear} to ${input.saleYear}`,
    objective: "Indexed capital gain",
    risk: "Tax illustration",
    metrics: [
      { label: "CII at purchase", value: String(input.ciiPurchase) },
      { label: "CII at sale", value: String(input.ciiSale) },
      { label: "Tax rate used", value: "20%" },
    ],
    heroLabel: "Estimated tax on the indexed gain",
    heroValue: input.tax,
    primaryLabel: "Indexed cost",
    primaryValue: input.indexedCost,
    secondaryLabel: "Taxable gain",
    secondaryValue: input.gain,
    rows: [
      { label: input.purchaseYear, deposit: input.purchase, invested: input.purchase, gain: 0, closing: 0 },
      { label: input.saleYear, deposit: input.sale, invested: input.indexedCost, gain: input.gain, closing: input.tax },
    ],
    chartTitle: "Purchase and sale",
    columns: ["Year", "Price", "Indexed cost", "Taxable gain", "Tax"],
    showMultiplier: false,
    bar: "deposit",
    ...ciiAdvisory(input.purchase, input.sale, input.tax),
    comparisons: [
      { title: "Purchase price", value: input.purchase, note: input.purchaseYear },
      { title: "Indexed cost of acquisition", value: input.indexedCost, note: "Purchase price times sale CII / purchase CII." },
      { title: "Sale price", value: input.sale, note: input.saleYear },
    ],
    notes: [
      {
        title: "How the tax is estimated",
        body: `Taxable gain is the sale price minus the indexed cost, floored at zero. Tax is 20% of that gain. Confirm the year and the rate with your tax adviser before you file.`,
      },
    ],
    inflationNote: "Indexation in this report follows the CII values stored in the calculator.",
    realValue: 0,
    steps: [
      { title: "Confirm the years", body: "CII is applied by financial year, not by the calendar date of the payment." },
      { title: "Keep the deeds", body: "The purchase price has to match the cost you can evidence." },
      { title: "Ask a tax adviser", body: "Later tax rules can change whether indexation is available." },
    ],
    narrative: "Indexed cost = purchase price x (CII of the sale year / CII of the purchase year).",
  });
}

export function composeNetWorth(input: {
  lines: { label: string; amount: number; kind: "asset" | "liability" }[];
  assets: number;
  liabilities: number;
  net: number;
}): CalculatorReport {
  let assets = 0;
  let liabilities = 0;
  const rows = input.lines
    .filter((line) => line.amount > 0)
    .map((line) => {
      if (line.kind === "asset") assets += line.amount;
      else liabilities += line.amount;
      return {
        label: line.label,
        deposit: line.amount,
        invested: assets,
        gain: liabilities,
        closing: assets - liabilities,
      };
    });
  return shell({
    slug: "networth-calculator",
    heading: "Net Worth Report",
    eyebrow: "Assets, liabilities and what is left",
    frequency: "Snapshot",
    objective: "Personal balance sheet",
    risk: input.net >= 0 ? "Surplus" : "Shortfall",
    metrics: [
      { label: "Assets", value: inr(input.assets) },
      { label: "Liabilities", value: inr(input.liabilities) },
      { label: "Net worth", value: inr(input.net) },
    ],
    heroLabel: "Net worth",
    heroValue: input.net,
    primaryLabel: "Assets",
    primaryValue: input.assets,
    secondaryLabel: "Liabilities",
    secondaryValue: input.liabilities,
    rows,
    chartTitle: "Balance-sheet lines",
    columns: ["Line", "Amount", "Assets so far", "Liabilities so far", "Net so far"],
    showMultiplier: false,
    bar: "deposit",
    ...netWorthAdvisory(input.assets, input.liabilities, input.net),
    comparisons: [
      { title: "Everything you own", value: input.assets, note: "Shares, cash, property and the other assets you entered." },
      { title: "Everything you owe", value: input.liabilities, note: "Loans, tax, bills and other dues." },
      { title: "Net worth", value: input.net, note: "Assets minus liabilities." },
    ],
    notes: [
      {
        title: "A snapshot, not a forecast",
        body: "This report records the figures typed into the calculator. It does not grow them forward.",
      },
    ],
    inflationNote: "",
    realValue: 0,
    steps: [
      { title: "Update the balances", body: "Use statement values, not rough guesses, when you share this report." },
      { title: "Separate the home", body: "A house you live in is an asset; the loan against it stays a liability." },
      { title: "Look at liquidity", body: "Cash and investments can be used sooner than property." },
    ],
    narrative: "Lines with a zero amount are left out. The running net is assets minus liabilities as each line is added.",
  });
}

function rateComparisons(monthly: number, months: number, rate: number, chosen: number) {
  return [
    { title: "Savings account at 3.5%", value: sipFuture(monthly, months, 3.5), note: "Same monthly amount, no market risk." },
    { title: "Fixed deposit at 6.8%", value: sipFuture(monthly, months, 6.8), note: "Same instalments at a steady rate." },
    { title: `This plan at ${rate.toFixed(2)}%`, value: chosen, note: "The return selected on the calculator." },
  ];
}

function formatSpan(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years && rest) return `${years}y ${rest}m`;
  if (years) return `${years} years`;
  return `${rest} months`;
}

function yearlySipRows(monthly: number, months: number, rate: number): YearRow[] {
  const rows: YearRow[] = [];
  const start = new Date().getFullYear();
  for (let month = 12; month < months + 12; month += 12) {
    const capped = Math.min(month, months);
    const invested = monthly * capped;
    const closing = sipFuture(monthly, capped, rate);
    const yearIndex = Math.ceil(capped / 12);
    const previous = (yearIndex - 1) * 12;
    rows.push({
      label: String(start + yearIndex - 1),
      deposit: monthly * (capped - previous),
      invested,
      gain: closing - invested,
      closing,
    });
  }
  return rows;
}

function lumpsumRows(principal: number, years: number, rate: number): YearRow[] {
  const rows: YearRow[] = [];
  const start = new Date().getFullYear();
  for (let year = 1; year <= years; year += 1) {
    const closing = principal * Math.pow(1 + rate / 100, year);
    rows.push({
      label: String(start + year - 1),
      deposit: year === 1 ? principal : 0,
      invested: principal,
      gain: closing - principal,
      closing,
    });
  }
  return rows;
}

function endOfMonthRows(monthly: number, years: number, rate: number): YearRow[] {
  const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
  const rows: YearRow[] = [];
  const start = new Date().getFullYear();
  let invested = 0;
  let value = 0;
  let deposit = 0;
  for (let month = 1; month <= years * 12; month += 1) {
    invested += monthly;
    deposit += monthly;
    value = (value + monthly) * (1 + monthlyRate);
    if (month % 12 === 0) {
      rows.push({
        label: String(start + month / 12 - 1),
        deposit,
        invested,
        gain: value - invested,
        closing: value,
      });
      deposit = 0;
    }
  }
  return rows;
}

function sipAdvisory(monthly: number, months: number, rate: number, corpus: number, invested: number) {
  const years = Math.max(1, Math.round(months / 12));
  const savings = sipFuture(monthly, months, 3.5);
  const deposit = monthly * months;
  const fd = sipFuture(monthly, months, 6.8);
  const step = stepUpTotals(monthly, years, rate, 10);
  const loss = (cut: number) => Math.max(0, corpus - sipFuture(monthly, Math.max(0, months - cut), rate));
  const benchmarks: BenchmarkRow[] = [
    { name: "Savings account", rate: "3.5%", corpus: savings, gain: savings - deposit },
    { name: "Bank fixed deposit", rate: "6.8%", corpus: fd, gain: fd - deposit },
    { name: "This plan", rate: `${rate.toFixed(1)}%`, corpus, gain: corpus - invested },
  ];
  const highlight: ReportHighlight = {
    kicker: "+10% yearly hike",
    title: "Corpus with a 10% annual step-up",
    value: step.value,
    body: `Raising the instalment by 10% each year finishes ${inr(step.value - corpus)} ahead of the flat plan.`,
    foot: `Invested ${inr(step.invested)}   ·   Gain ${inr(step.gain)}`,
  };
  const delays: DelayCard[] = [
    { label: "Delay by 6 months", loss: loss(6), note: "Lost compounding over half a year." },
    { label: "Delay by 1 year", loss: loss(12), note: "Misses a full year of instalments." },
    { label: "Delay by 3 years", loss: loss(36), note: "The same SIP, started later." },
  ];
  return { benchmarks, highlight, delays };
}

function lumpsumAdvisory(principal: number, years: number, rate: number, corpus: number) {
  const at = (annual: number, span = years) => principal * Math.pow(1 + annual / 100, Math.max(0, span));
  const benchmarks: BenchmarkRow[] = [
    { name: "Savings account", rate: "3.5%", corpus: at(3.5), gain: at(3.5) - principal },
    { name: "Bank fixed deposit", rate: "6.8%", corpus: at(6.8), gain: at(6.8) - principal },
    { name: "This plan", rate: `${rate.toFixed(1)}%`, corpus, gain: corpus - principal },
  ];
  const extraYear = at(rate, years + 1);
  const highlight: ReportHighlight = {
    kicker: "One more year",
    title: "Value if it stays invested one more year",
    value: extraYear,
    body: `Leaving the corpus invested for one extra year adds about ${inr(extraYear - corpus)} at the selected return.`,
    foot: `Invested ${inr(principal)}   ·   Horizon ${years + 1} years`,
  };
  const delays: DelayCard[] = [
    { label: "Invest 6 months later", loss: Math.max(0, corpus - at(rate, years - 0.5)), note: "Half a year less of compounding." },
    { label: "Invest 1 year later", loss: Math.max(0, corpus - at(rate, years - 1)), note: "A shorter holding period." },
    { label: "Invest 3 years later", loss: Math.max(0, corpus - at(rate, years - 3)), note: "The same amount, less time." },
  ];
  return { benchmarks, highlight, delays };
}

function stepUpTotals(monthly: number, years: number, rate: number, stepPercent: number) {
  const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
  let sip = monthly;
  let value = 0;
  let invested = 0;
  for (let year = 1; year <= years; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      invested += sip;
      value = (value + sip) * (1 + monthlyRate);
    }
    sip *= 1 + stepPercent / 100;
  }
  return { value, invested, gain: value - invested };
}

function stepUpFuture(monthly: number, years: number, rate: number, stepPercent: number) {
  const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
  let sip = monthly;
  let value = 0;
  for (let year = 1; year <= years; year += 1) {
    for (let month = 1; month <= 12; month += 1) value = (value + sip) * (1 + monthlyRate);
    sip *= 1 + stepPercent / 100;
  }
  return value;
}

function topUpAdvisory(monthly: number, years: number, rate: number, futureValue: number, invested: number, flatValue?: number) {
  const months = Math.max(0, Math.round(years * 12));
  const span = Math.max(1, Math.round(years));
  const deposit = monthly * months;
  const savings = sipFuture(monthly, months, 3.5);
  const fd = sipFuture(monthly, months, 6.8);
  const flat = flatValue ?? sipFuture(monthly, months, rate);
  const benchmarks: BenchmarkRow[] = [
    { name: "Flat SIP in savings", rate: "3.5%", corpus: savings, gain: savings - deposit },
    { name: "Flat SIP in an FD", rate: "6.8%", corpus: fd, gain: fd - deposit },
    { name: "This top-up plan", rate: `${rate.toFixed(1)}%`, corpus: futureValue, gain: futureValue - invested },
  ];
  const highlight: ReportHighlight = {
    kicker: "No annual rise",
    title: "Corpus if the opening SIP stays flat",
    value: flat,
    body: `The rising instalment finishes ${inr(Math.abs(futureValue - flat))} ${futureValue >= flat ? "ahead of" : "behind"} that flat path.`,
    foot: `Opening SIP ${inr(monthly)}   ·   ${span} years`,
  };
  const flatLoss = (cut: number) => Math.max(0, flat - sipFuture(monthly, Math.max(0, months - cut), rate));
  const delays: DelayCard[] = [
    { label: "Start 6 months later", loss: flatLoss(6), note: "Measured on a flat SIP at the opening amount." },
    { label: "Start 1 year later", loss: flatLoss(12), note: "A full year of instalments missed." },
    { label: "Start 3 years later", loss: flatLoss(36), note: "The same opening SIP, less time." },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "A flat SIP versus this top-up",
    delayHeading: "The cost of starting the opening SIP later",
  };
}

function compoundingAdvisory(principal: number, rate: number, years: number, periodsPerYear: number, maturity: number) {
  const at = (periods: number, span = years) => principal * Math.pow(1 + rate / 100 / periods, periods * Math.max(0, span));
  const benchmarks: BenchmarkRow[] = [
    { name: "Compounded yearly", rate: `${rate}%`, corpus: at(1), gain: at(1) - principal },
    { name: "Compounded quarterly", rate: `${rate}%`, corpus: at(4), gain: at(4) - principal },
    { name: "This frequency", rate: `${rate}%`, corpus: maturity, gain: maturity - principal },
  ];
  const monthlyValue = at(12);
  const highlight: ReportHighlight = periodsPerYear >= 12
    ? {
        kicker: "One more year",
        title: "Value after one extra year",
        value: at(periodsPerYear, years + 1),
        body: `Staying invested one more year adds about ${inr(at(periodsPerYear, years + 1) - maturity)}.`,
        foot: `Principal ${inr(principal)}`,
      }
    : {
        kicker: "Monthly compounding",
        title: "Value if interest compounded every month",
        value: monthlyValue,
        body: `Monthly compounding finishes about ${inr(monthlyValue - at(1))} ahead of yearly compounding at the same rate.`,
        foot: `Yearly compounding ${inr(at(1))}`,
      };
  const loss = (cut: number) => Math.max(0, maturity - at(periodsPerYear, years - cut));
  const delays: DelayCard[] = [
    { label: "Invest 1 year later", loss: loss(1), note: "One less year of compounding." },
    { label: "Invest 3 years later", loss: loss(3), note: "The same principal, a shorter hold." },
    { label: "Invest 5 years later", loss: loss(5), note: "Time, not the rate, is the missing piece." },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "How often the interest is added",
    benchmarkValueLabel: "Maturity value",
    delayHeading: "The cost of investing later",
  };
}

function loanAdvisory(balance: number, rate: number, months: number, total: number) {
  const low = rate > 1 ? rate - 1 : Math.max(0.5, rate / 2);
  const high = rate + 1;
  const interestAt = (annual: number, span: number, base = balance) => emiInterest(base, annual, span);
  const payable = (annual: number, span: number) => balance + interestAt(annual, span);
  const benchmarks: BenchmarkRow[] = [
    { name: "If the rate were lower", rate: `${low.toFixed(1)}%`, corpus: payable(low, months), gain: interestAt(low, months) },
    { name: "This schedule", rate: `${rate.toFixed(1)}%`, corpus: total, gain: Math.max(0, total - balance) },
    { name: "If the rate were higher", rate: `${high.toFixed(1)}%`, corpus: payable(high, months), gain: interestAt(high, months) },
  ];
  const shorter = months > 60 ? months - 60 : Math.max(12, Math.round(months * 0.75));
  const shorterInterest = interestAt(rate, shorter);
  const baseInterest = interestAt(rate, months);
  const highlight: ReportHighlight = {
    kicker: months > 60 ? "Five years shorter" : "A shorter tenure",
    title: "Total paid if the tenure is shorter",
    value: balance + shorterInterest,
    body: `On the balance when EMIs start, ${formatSpan(shorter)} of EMIs costs about ${inr(Math.max(0, baseInterest - shorterInterest))} less interest than ${formatSpan(months)}.`,
    foot: `Interest on this shorter tenure ${inr(shorterInterest)}`,
  };
  const grown = balance * Math.pow(1 + rate / 100 / 12, 12);
  const delays: DelayCard[] = [
    { label: "Rate 1 point higher", loss: Math.max(0, interestAt(high, months) - baseInterest), note: "The extra interest over the same tenure." },
    { label: "Five more years", loss: Math.max(0, interestAt(rate, months + 60) - baseInterest), note: "A longer tenure lowers the EMI and raises interest." },
    { label: "12 months interest-only", loss: Math.max(0, grown - balance + emiInterest(grown, rate, months) - baseInterest), note: "Interest is added to the balance, then EMIs start." },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "Total paid back at nearby rates",
    benchmarkValueLabel: "Total paid",
    delayHeading: "What raises the interest",
  };
}

function retirementAdvisory(monthlySip: number, years: number, rate: number, currentSavings: number) {
  const months = Math.max(0, Math.round(years * 12));
  const project = (annual: number, span = months) => sipFuture(monthlySip, span, annual) + currentSavings * Math.pow(1 + annual / 100, span / 12);
  const contributed = monthlySip * months + currentSavings;
  const chosen = project(rate);
  const benchmarks: BenchmarkRow[] = [
    { name: "Savings account", rate: "3.5%", corpus: project(3.5), gain: project(3.5) - contributed },
    { name: "Bank fixed deposit", rate: "6.8%", corpus: project(6.8), gain: project(6.8) - contributed },
    { name: "This plan", rate: `${rate.toFixed(1)}%`, corpus: chosen, gain: chosen - contributed },
  ];
  const step = stepUpTotals(monthlySip, Math.max(1, Math.round(years)), rate, 10);
  const stepped = step.value + currentSavings * Math.pow(1 + rate / 100, years);
  const highlight: ReportHighlight = {
    kicker: "+10% yearly hike",
    title: "Corpus if the SIP rises 10% a year",
    value: stepped,
    body: `A 10% step-up on the required SIP finishes about ${inr(Math.max(0, stepped - chosen))} ahead. Existing savings stay on the selected return.`,
    foot: `SIP invested ${inr(step.invested)}   ·   Gain ${inr(step.gain)}`,
  };
  const sipOnly = sipFuture(monthlySip, months, rate);
  const loss = (cut: number) => Math.max(0, sipOnly - sipFuture(monthlySip, Math.max(0, months - cut), rate));
  const delays: DelayCard[] = [
    { label: "Delay the SIP 6 months", loss: loss(6), note: "Existing savings are assumed to stay invested." },
    { label: "Delay the SIP 1 year", loss: loss(12), note: "A year of contributions missed." },
    { label: "Delay the SIP 3 years", loss: loss(36), note: "The same SIP, started later." },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "The SIP plus today's savings, grown",
  };
}

function swpAdvisory(corpus: number, monthly: number, years: number, rate: number, finalValue: number) {
  const months = Math.max(0, Math.round(years * 12));
  const ending = (annual: number, payout = monthly, span = months) => swpEnding(corpus, payout, span, annual);
  const flatAtPlan = ending(rate);
  const benchmarks: BenchmarkRow[] = [
    { name: "Flat payout at 6%", rate: "6%", corpus: ending(6), gain: 0 },
    { name: "Flat payout at 8%", rate: "8%", corpus: ending(8), gain: 0 },
    { name: "This plan", rate: `${rate.toFixed(1)}%`, corpus: finalValue, gain: 0 },
  ];
  const lighter = ending(rate, monthly * 0.9);
  const highlight: ReportHighlight = {
    kicker: "Payout 10% smaller",
    title: "Closing balance if the opening payout is 10% smaller",
    value: lighter,
    body: `Held flat, that smaller payout finishes near ${inr(lighter)}. This plan's own closing balance is ${inr(finalValue)}.`,
    foot: `Opening payout ${inr(monthly)} / month`,
  };
  const delays: DelayCard[] = [
    { label: "Payout 10% higher", loss: Math.max(0, flatAtPlan - ending(rate, monthly * 1.1)), note: "A flat payout, 10% above the opening amount." },
    { label: "Return 2 points lower", loss: Math.max(0, flatAtPlan - ending(Math.max(0, rate - 2))), note: "The same flat payout, a lower return." },
    { label: "One extra year", loss: Math.max(0, flatAtPlan - ending(rate, monthly, months + 12)), note: "Twelve more withdrawals at the opening amount." },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "Closing balance at nearby returns",
    benchmarkValueLabel: "Balance left",
    delayHeading: "What drains a flat payout faster",
  };
}

function inflationAdvisory(today: number, rate: number, years: number, future: number) {
  const cost = (inflation: number, span = years) => today * Math.pow(1 + inflation / 100, Math.max(0, span));
  const benchmarks: BenchmarkRow[] = [
    { name: "If inflation is 4%", rate: "4%", corpus: cost(4), gain: cost(4) - today },
    { name: "The rate you entered", rate: `${rate}%`, corpus: future, gain: future - today },
    { name: "If inflation is 8%", rate: "8%", corpus: cost(8), gain: cost(8) - today },
  ];
  const monthly = sipInstalment(future, years * 12, 12);
  const highlight: ReportHighlight = {
    kicker: "A 12% SIP",
    title: "Monthly SIP that funds this future cost",
    value: monthly,
    body: `Invested every month for ${years} years at 12%, this instalment reaches the inflated cost.`,
    foot: `${years} years   ·   12% illustration`,
  };
  const delays: DelayCard[] = [1, 3, 5].map((cut) => ({
    label: cut === 1 ? "Wait 1 more year" : `Wait ${cut} more years`,
    loss: Math.max(0, cost(rate, years + cut) - future),
    note: "The same purchase, at the inflation rate you entered.",
  }));
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "The same purchase at different inflation rates",
    benchmarkRateLabel: "Inflation",
    benchmarkValueLabel: "Future cost",
    delayHeading: "The cost of waiting to buy",
  };
}

function ciiAdvisory(purchase: number, sale: number, indexedTax: number) {
  const nominal = Math.max(0, sale - purchase);
  const tax20 = nominal * 0.2;
  const tax125 = nominal * 0.125;
  const benchmarks: BenchmarkRow[] = [
    { name: "20% of the plain gain", rate: "20%", corpus: tax20, gain: nominal },
    { name: "12.5% without indexation", rate: "12.5%", corpus: tax125, gain: nominal },
    { name: "20% with indexation", rate: "20%", corpus: indexedTax, gain: Math.max(0, sale - purchase) },
  ];
  const highlight: ReportHighlight = {
    kicker: "Indexation",
    title: "Estimated tax on the indexed gain",
    value: indexedTax,
    body: `Against 20% of the gain before indexation, indexation changes the estimate by ${inr(tax20 - indexedTax)}.`,
    foot: `Plain gain ${inr(nominal)}`,
  };
  const delays: DelayCard[] = [
    { label: "No indexation at 12.5%", loss: Math.max(0, tax125 - indexedTax), note: "Extra tax versus this indexed estimate." },
    { label: "No indexation at 20%", loss: Math.max(0, tax20 - indexedTax), note: "The 20% rate on the gain before indexation." },
    {
      label: "Indexed 20% vs 12.5%",
      loss: Math.abs(indexedTax - tax125),
      note: indexedTax <= tax125 ? "Indexation at 20% is the lower estimate here." : "12.5% of the plain gain is the lower estimate here.",
    },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "Estimated tax with and without indexation",
    benchmarkRateLabel: "Tax rate",
    benchmarkValueLabel: "Estimated tax",
    delayHeading: "How the tax estimate moves",
  };
}

function netWorthAdvisory(assets: number, liabilities: number, net: number) {
  const share = (part: number) => (assets > 0 ? `${((part / assets) * 100).toFixed(1)}%` : "—");
  const benchmarks: BenchmarkRow[] = [
    { name: "Assets", rate: "100%", corpus: assets, gain: 0 },
    { name: "Liabilities", rate: share(liabilities), corpus: liabilities, gain: 0 },
    { name: "Net worth", rate: share(Math.max(0, net)), corpus: net, gain: net },
  ];
  const ratio = assets > 0 ? (liabilities / assets) * 100 : 0;
  const highlight: ReportHighlight = {
    kicker: "Balance sheet",
    title: liabilities > 0 ? "Liabilities as a share of assets" : "No liabilities were entered",
    value: net,
    body: liabilities > 0
      ? `Debts are ${ratio.toFixed(1)}% of the assets in this snapshot. Net worth is assets minus those debts.`
      : "Net worth equals the assets you listed.",
    foot: `Assets ${inr(assets)}   ·   Debts ${inr(liabilities)}`,
  };
  const delays: DelayCard[] = [
    { label: "Debts 10% higher", loss: liabilities * 0.1, note: "Net worth falls by a tenth of today's debts." },
    { label: "Assets 10% lower", loss: assets * 0.1, note: "The same debts, a smaller asset base." },
    { label: "A new debt of 10%", loss: assets * 0.1, note: "Borrowing a tenth of today's assets." },
  ];
  return {
    benchmarks,
    highlight,
    delays,
    benchmarkHeading: "Assets, liabilities and net worth",
    benchmarkRateLabel: "Share",
    benchmarkValueLabel: "Amount",
    delayHeading: "How this snapshot can move",
  };
}

function emiInterest(principal: number, annual: number, months: number) {
  if (principal <= 0 || months <= 0 || annual <= 0) return 0;
  const monthly = annual / 100 / 12;
  const pow = Math.pow(1 + monthly, months);
  const emi = (principal * monthly * pow) / (pow - 1);
  return Math.max(0, emi * months - principal);
}

function monthsFromLabel(label: string, fallbackYears: number) {
  const match = label.match(/(\d+)\s*months/i);
  if (match) return Math.max(1, Number(match[1]));
  return Math.max(1, fallbackYears) * 12;
}

function swpEnding(corpus: number, monthly: number, months: number, annual: number) {
  if (months <= 0) return Math.max(0, corpus);
  const monthlyRate = Math.pow(1 + annual / 100, 1 / 12) - 1;
  let balance = Math.max(0, corpus);
  for (let month = 0; month < months; month += 1) {
    balance -= Math.min(balance, Math.max(0, monthly));
    balance *= 1 + monthlyRate;
  }
  return Math.max(0, balance);
}

function sipInstalment(target: number, months: number, rate: number) {
  if (months <= 0 || target <= 0) return 0;
  const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
  if (monthlyRate === 0) return target / months;
  const denominator = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return denominator > 0 ? target / denominator : 0;
}
