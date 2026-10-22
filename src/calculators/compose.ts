import type { CalculatorReport, YearRow } from "./types";
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

function shell(partial: Omit<CalculatorReport, "disclaimer" | "showMultiplier" | "bar" | "chartTitle"> & Partial<Pick<CalculatorReport, "showMultiplier" | "bar" | "chartTitle">>): CalculatorReport {
  return {
    showMultiplier: true,
    bar: "closing",
    chartTitle: "Year-by-year path",
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
    columns: GROWTH_COLUMNS,
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
    columns: GROWTH_COLUMNS,
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
