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

export type BenchmarkRow = {
  name: string;
  rate: string;
  corpus: number;
  gain: number;
};

export type DelayCard = {
  label: string;
  loss: number;
  note: string;
};

export type ReportHighlight = {
  kicker: string;
  title: string;
  value: number;
  body: string;
  foot: string;
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
  benchmarks: BenchmarkRow[];
  benchmarkHeading: string;
  benchmarkRateLabel: string;
  benchmarkValueLabel: string;
  highlight: ReportHighlight | null;
  delays: DelayCard[];
  delayHeading: string;
  notes: ReportNote[];
  inflationNote: string;
  realValue: number;
  steps: ReportNote[];
  disclaimer: string;
  narrative: string;
};
