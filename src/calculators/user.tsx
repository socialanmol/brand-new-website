import { createContext, useContext } from "react";

export type CalculatorUser = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

const CalculatorUserContext = createContext<CalculatorUser | null>(null);

export function CalculatorUserProvider({ user, children }: { user: CalculatorUser; children: React.ReactNode }) {
  return <CalculatorUserContext.Provider value={user}>{children}</CalculatorUserContext.Provider>;
}

export function useCalculatorUser() {
  return useContext(CalculatorUserContext);
}
