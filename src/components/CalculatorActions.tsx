import { useState } from "react";
import { renderCalculatorPdf } from "../calculators/pdf";
import type { CalculatorReport } from "../calculators/types";
import { useReportRequest } from "../calculators/user";

type Props = {
  report: CalculatorReport;
  tone?: "light" | "onDark" | "line";
};

export default function CalculatorActions({ report, tone = "light" }: Props) {
  const requestReport = useReportRequest();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState<"mail" | "pdf" | null>(null);

  async function buildPdf(name: string) {
    return renderCalculatorPdf(report, name || "Investor");
  }

  async function download() {
    const person = await requestReport();
    if (!person) return;
    setBusy("pdf");
    setStatus("");
    try {
      const bytes = await buildPdf(person.name);
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      const blob = new Blob([copy.buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `MyAnmol-${report.slug}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("PDF saved to this device.");
    } catch {
      setStatus("The PDF could not be created.");
    } finally {
      setBusy(null);
    }
  }

  async function email() {
    const person = await requestReport();
    if (!person) return;
    setBusy("mail");
    setStatus("");
    try {
      const bytes = await buildPdf(person.name);
      const response = await fetch("/api/calculator-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: report.slug,
          heading: report.heading,
          pdfBase64: bytesToBase64(bytes),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "The report could not be emailed.");
      setStatus(`Sent to ${person.email}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "The report could not be emailed.");
    } finally {
      setBusy(null);
    }
  }

  if (tone === "line") {
    return (
      <button type="button" className="ma-btn-line" onClick={email} disabled={busy !== null}>
        {busy === "mail" ? "Sending…" : "Email my projection"}
      </button>
    );
  }

  if (tone === "onDark") {
    return (
      <>
        <button type="button" className="ma-btn-ghost" onClick={email} disabled={busy !== null}>
          {busy === "mail" ? "Sending…" : "Email"}
        </button>
        <button type="button" className="ma-btn-white" onClick={download} disabled={busy !== null}>
          {busy === "pdf" ? "Preparing…" : "Download PDF"}
        </button>
        {status && <p style={{ gridColumn: "1 / -1", margin: 0, color: "#dbe4ff", fontSize: 12 }}>{status}</p>}
      </>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={email}
          disabled={busy !== null}
          className="inline-flex items-center h-11 px-4 rounded-[8px] bg-[#8DC63F] text-[#091540] font-extrabold text-xs disabled:opacity-60"
        >
          {busy === "mail" ? "Sending…" : "Email"}
        </button>
        <button
          type="button"
          onClick={download}
          disabled={busy !== null}
          className="inline-flex items-center h-11 px-4 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs disabled:opacity-60"
        >
          {busy === "pdf" ? "Preparing…" : "Download PDF"}
        </button>
      </div>
      {status && <p className="m-0 max-w-[280px] text-right text-xs text-[#374151]">{status}</p>}
    </div>
  );
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const size = 0x8000;
  for (let index = 0; index < bytes.length; index += size) {
    binary += String.fromCharCode(...bytes.subarray(index, index + size));
  }
  return btoa(binary);
}
