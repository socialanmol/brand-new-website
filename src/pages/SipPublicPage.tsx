import { lazy, Suspense } from "react";
import SipUnderConstruction from "./SipUnderConstruction";

const DraftSipPage = import.meta.env.PROD ? null : lazy(() => import("./SystematicInvestmentPlan"));

export default function SipPublicPage() {
  if (import.meta.env.PROD || !DraftSipPage) return <SipUnderConstruction />;
  return (
    <Suspense fallback={null}>
      <DraftSipPage />
    </Suspense>
  );
}
