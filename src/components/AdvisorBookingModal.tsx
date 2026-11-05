import React, { useState } from "react";
import { saveForm } from "../lib/saveForm";

interface AdvisorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptyForm = { name: "", phone: "", email: "", time: "", notes: "" };

export default function AdvisorBookingModal({ isOpen, onClose }: AdvisorBookingModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const close = () => {
    setError("");
    setSaved(false);
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveForm("mutual-fund-advisor", {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        time: form.time.trim(),
        notes: form.notes.trim(),
      });
      setSaved(true);
      setForm(emptyForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-[#091540]/75 border-0" aria-label="Close booking form" onClick={close} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="advisor-booking-title"
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E3E8F4] p-6 sm:p-8 font-[var(--fs)]"
      >
        <button type="button" onClick={close} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EEF2FB] text-[#374151] border-0 cursor-pointer font-bold" aria-label="Close">
          ✕
        </button>
        <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">MyAnmol Advisory</span>
        <h2 id="advisor-booking-title" className="font-[var(--fd)] text-2xl font-extrabold text-[#091540] mt-2 mb-2">Speak with an Advisor</h2>
        <p className="text-sm text-[#6B7280] font-light mb-5">Share your details and an advisor will call you to plan the next step.</p>
        {saved ? (
          <div className="rounded-2xl bg-[#EFF8E2] text-[#091540] p-5">
            <p className="font-bold">Your request is saved.</p>
            <p className="text-sm mt-1">An advisor will contact you to plan the next step.</p>
            <button type="button" onClick={close} className="mt-4 h-11 px-5 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs border-0 cursor-pointer">Close</button>
          </div>
        ) : (
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <label className="grid gap-1 text-xs font-bold text-[#091540]">
              Name
              <input required name="name" autoComplete="name" value={form.name} onChange={update("name")} className="h-11 px-3 rounded-xl border border-[#E3E8F4] font-medium" />
            </label>
            <label className="grid gap-1 text-xs font-bold text-[#091540]">
              Phone number
              <input required name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} className="h-11 px-3 rounded-xl border border-[#E3E8F4] font-medium" />
            </label>
            <label className="grid gap-1 text-xs font-bold text-[#091540]">
              Email ID
              <input required name="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} className="h-11 px-3 rounded-xl border border-[#E3E8F4] font-medium" />
            </label>
            <label className="grid gap-1 text-xs font-bold text-[#091540]">
              Preferred time
              <input name="time" value={form.time} onChange={update("time")} placeholder="For example, tomorrow at 11 AM" className="h-11 px-3 rounded-xl border border-[#E3E8F4] font-medium" />
            </label>
            <label className="grid gap-1 text-xs font-bold text-[#091540]">
              What would you like to plan?
              <textarea name="notes" value={form.notes} onChange={update("notes")} rows={3} className="px-3 py-2 rounded-xl border border-[#E3E8F4] font-medium" />
            </label>
            {error && <p className="m-0 text-sm text-rose-700" role="alert">{error}</p>}
            <button type="submit" disabled={saving} className="h-12 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs border-0 cursor-pointer disabled:opacity-60">
              {saving ? "Saving…" : "Submit"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
