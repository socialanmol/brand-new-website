import { createContext, useContext } from "react";

export type CalculatorUser = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

type ReportAccess = {
  user: CalculatorUser | null;
  requestReport: () => Promise<CalculatorUser | null>;
};

const CalculatorUserContext = createContext<ReportAccess>({
  user: null,
  requestReport: async () => null,
});

export function CalculatorUserProvider({ value, children }: { value: ReportAccess; children: React.ReactNode }) {
  return <CalculatorUserContext.Provider value={value}>{children}</CalculatorUserContext.Provider>;
}

export function useCalculatorUser() {
  return useContext(CalculatorUserContext).user;
}

export function useReportRequest() {
  return useContext(CalculatorUserContext).requestReport;
}
