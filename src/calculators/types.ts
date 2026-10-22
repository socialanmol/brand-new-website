export type YearRow = {
  label: string;
  deposit: number;
  invested: number;
  gain: number;
  closing: number;
};

export type ReportNote = {
  title: string;
  body: string;
};

export type CalculatorReport = {
  slug: string;
  heading: string;
  eyebrow: string;
  frequency: string;
  objective: string;
  risk: string;
  metrics: { label: string; value: string }[];
  heroLabel: string;
  heroValue: number;
  primaryLabel: string;
  primaryValue: number;
  secondaryLabel: string;
  secondaryValue: number;
  rows: YearRow[];
  chartTitle: string;
  columns: [string, string, string, string, string];
  bar: "closing" | "deposit";
  showMultiplier: boolean;
  comparisons: { title: string; value: number; note: string }[];
  notes: ReportNote[];
  inflationNote: string;
  realValue: number;
  steps: ReportNote[];
  disclaimer: string;
  narrative: string;
};
