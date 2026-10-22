export const DISCLAIMER =
  "This illustration is educational. It is not a recommendation, an offer, or a guarantee of returns. Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Past performance does not indicate future results. Equity long-term capital gains above Rs 1,25,000 in a financial year are taxed at 12.5% without indexation, under current law. Other products follow their own tax rules. Anmol Share Broking Pvt. Ltd. is an AMFI-registered Mutual Fund Distributor, ARN 114893. Contact mutualfunds@myanmol.com.";

export const INVEST_STEPS = [
  { title: "Complete KYC", body: "Keep PAN, Aadhaar and a cancelled cheque ready so the folio can be opened." },
  { title: "Authorise the debit", body: "Register an e-NACH or UPI mandate for the amount shown in this report." },
  { title: "Match the portfolio", body: "Allocate across funds that fit the horizon and the risk on page 1." },
];

export const LOAN_STEPS = [
  { title: "Compare the sanction", body: "Set this EMI beside the lender's offer, including fees and insurance." },
  { title: "Choose the tenure", body: "A shorter tenure raises the EMI and cuts the interest in this schedule." },
  { title: "Register the debit", body: "Put the EMI on auto-debit before the due date." },
];

export function inr(value: number) {
  const sign = value < 0 ? "-" : "";
  const formatted = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(Math.abs(value)));
  return `${sign}₹${formatted}`;
}

export function riskLabel(rate: number) {
  if (rate < 8) return "Conservative";
  if (rate <= 10) return "Moderate";
  if (rate <= 13) return "Moderately Aggressive";
  return "Aggressive";
}

export function realValue(nominal: number, years: number, inflation = 6) {
  const span = Math.max(years, 0);
  return nominal / Math.pow(1 + inflation / 100, span);
}

export function displayRows<T>(rows: T[]) {
  if (rows.length <= 12) return rows;
  return [...rows.slice(0, 8), ...rows.slice(-2)];
}

/** Start-of-month SIP, matching the SIP calculator. */
export function sipFuture(monthly: number, months: number, annualRate: number) {
  if (months <= 0 || monthly <= 0) return 0;
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  if (monthlyRate === 0) return monthly * months;
  return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
}

export function delayNote(full: number, atSixMonths: number, atOneYear: number, atThreeYears: number) {
  return `Waiting changes the result. Six months later the illustration is ${inr(full - atSixMonths)} lower, one year later ${inr(full - atOneYear)} lower, and three years later ${inr(full - atThreeYears)} lower.`;
}
