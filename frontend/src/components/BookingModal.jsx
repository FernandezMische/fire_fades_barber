import React, { useState } from "react";
import { services, barbers, shopInfo } from "../data/siteData";
import CalendarButtons from "./CalendarButtons";
import emailjs from "@emailjs/browser";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DISCOUNT_RATE = 0.20;

// EmailJS credentials
const EMAILJS_SERVICE_ID = "service_m5glr3e";
const EMAILJS_CUSTOMER_TEMPLATE = "template_mkuhkhb";
const EMAILJS_SHOP_TEMPLATE = "template_r1j24te";
const EMAILJS_PUBLIC_KEY = "VQ_k-OewNyCbDqork";

export default function BookingModal({ onClose, discountApplied = false }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: "", barber: "", date: "", time: "",
    name: "", email: "", phone: "", notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookingRef] = useState(() => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `FF-${yy}${mm}${dd}-${rand}`;
  });

  const times = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"];

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const selectedService = services.find((s) => s.id === form.service);

  const effectivePrice = (price) =>
    discountApplied ? Math.round(price * (1 - DISCOUNT_RATE)) : price;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = [];
  for (let i = 0; i < 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  const firstDayOffset = days[0].getDay();
  const padCells = Array.from({ length: firstDayOffset });

  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-ZA", {
      weekday: "long", day: "numeric", month: "long",
    });
  };

  const isClosed = (date) => date.getDay() === 1;
  const isToday = (date) => date.toDateString() === today.toDateString();

  const handleDateSelect = (key) => {
    setForm((prev) => ({ ...prev, date: key, time: "" }));
  };

  const canProceed = () => {
    if (step === 1) return form.service;
    if (step === 2) return form.barber;
    if (step === 3) return form.date && form.time;
    return form.name && form.email && form.phone;
  };

  const goBack = () => step > 1 && setStep(step - 1);

  // Shared payload used by both emails
  const bookingData = {
    booking_ref: bookingRef,
    to_name: form.name,
    customer_email: form.email,
    customer_phone: form.phone,
    service: selectedService?.name,
    duration: `${selectedService?.duration} min`,
    barber: form.barber === "any" ? "Any available" : form.barber,
    date: formatDateDisplay(form.date),
    time: form.time,
    total: discountApplied
      ? `R${effectivePrice(selectedService?.price || 0)} (20% off)`
      : `R${selectedService?.price}`,
    notes: form.notes || "None",
    shop_name: shopInfo.name,
    shop_address: shopInfo.address,
    shop_phone: shopInfo.phone,
  };

  // Send confirmation to the CUSTOMER
  const sendCustomerConfirmation = async () => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE,
        { ...bookingData, to_email: form.email },
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error("Customer email failed:", err);
    }
  };

  // Send notification to the SHOP OWNER
  const sendShopNotification = async () => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_SHOP_TEMPLATE,
        { ...bookingData, to_email: shopInfo.notificationEmail },
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error("Shop notification failed:", err);
    }
  };

  const handleConfirm = async () => {
    if (!canProceed() || isSubmitting) return;
    setIsSubmitting(true);
    await Promise.all([sendCustomerConfirmation(), sendShopNotification()]);
    setIsSubmitting(false);
    setStep(5);
  };

  const goNext = () => canProceed() && setStep(step + 1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-smoke border border-ash w-full max-w-2xl max-h-[90vh] flex flex-col">
        {step === 5 ? (
          <>
            <button onClick={onClose} className="absolute top-3 right-3 text-bone/40 hover:text-copper text-3xl leading-none z-20" aria-label="Close">&times;</button>
            <div className="flex-1 overflow-y-auto flex flex-col items-center text-center px-6 py-6">
              <div className="w-12 h-12 border-2 border-copper rounded-full flex items-center justify-center mb-3 shrink-0">
                <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-bone tracking-wider mb-1">You're Locked In.</h3>
              <p className="text-bone/50 text-[10px] font-heading uppercase tracking-[0.25em] mb-4">Booking Confirmed</p>
              <div className="border border-copper/40 bg-copper/5 px-4 py-2 mb-4 w-full max-w-sm">
                <p className="text-bone/50 text-[9px] font-heading uppercase tracking-[0.25em] mb-1">Booking Reference</p>
                <p className="text-copper font-heading text-base tracking-[0.2em]">{bookingRef}</p>
              </div>
              <div className="border border-ash w-full max-w-sm mb-4 text-left">
                <div className="divide-y divide-ash/60">
                  <div className="flex justify-between gap-4 px-4 py-2 text-xs"><span className="text-bone/50 font-heading uppercase tracking-wider">Name</span><span className="text-bone text-right truncate">{form.name}</span></div>
                  <div className="flex justify-between gap-4 px-4 py-2 text-xs"><span className="text-bone/50 font-heading uppercase tracking-wider">Service</span><span className="text-bone text-right">{selectedService?.name}</span></div>
                  <div className="flex justify-between gap-4 px-4 py-2 text-xs"><span className="text-bone/50 font-heading uppercase tracking-wider">Date</span><span className="text-bone text-right">{formatDateDisplay(form.date)}</span></div>
                  <div className="flex justify-between gap-4 px-4 py-2 text-xs"><span className="text-bone/50 font-heading uppercase tracking-wider">Time</span><span className="text-bone text-right">{form.time}</span></div>
                  <div className="flex justify-between gap-4 px-4 py-2 text-xs">
                    <span className="text-bone/50 font-heading uppercase tracking-wider">Total</span>
                    <span className="text-copper font-heading text-right">
                      {discountApplied && selectedService ? (<>
                        R{effectivePrice(selectedService.price)}
                        <span className="text-bone/30 text-[10px] line-through ml-2">R{selectedService.price}</span>
                      </>) : (<>R{selectedService?.price}</>)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-sm text-left mb-4">
                <p className="text-bone/50 text-[9px] font-heading uppercase tracking-[0.25em] mb-2 text-center">What Happens Next</p>
                <ul className="space-y-1.5 text-[11px] text-bone/60">
                  <li className="flex gap-2"><span className="text-copper">✦</span>A confirmation has been sent to <span className="text-bone">{form.email}</span></li>
                  <li className="flex gap-2"><span className="text-copper">✦</span>You'll get a reminder 1 hour before your appointment</li>
                  <li className="flex gap-2"><span className="text-copper">✦</span>Need to reschedule? Call us on <span className="text-bone">{shopInfo.phone}</span></li>
                </ul>
              </div>
              <CalendarButtons form={form} service={selectedService} discountApplied={discountApplied} />
            </div>
            <div className="border-t border-ash p-3 text-center shrink-0">
              <button onClick={onClose} className="text-bone/50 hover:text-copper text-[10px] font-heading uppercase tracking-[0.25em] transition-colors">Close &amp; Return to Site</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-3 right-3 text-bone/40 hover:text-copper text-3xl leading-none z-20" aria-label="Close">&times;</button>
            <div className="flex border-b border-ash shrink-0">
              {["Service", "Master", "Date & Time", "Details"].map((label, i) => (
                <div key={label} className={`flex-1 text-center py-4 font-heading text-[10px] sm:text-xs uppercase tracking-widest ${step === i + 1 ? "text-copper border-b-2 border-copper" : "text-bone/40"}`}>{label}</div>
              ))}
            </div>
            {discountApplied && (
              <div className="bg-copper/15 border-b border-copper/40 px-4 py-2 text-center shrink-0">
                <span className="text-copper font-heading text-[10px] uppercase tracking-widest">✦ 20% First-Visit Discount Applied</span>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="font-heading text-xl text-bone mb-4">Select Your Service</h3>
                  {services.map((s) => (
                    <button key={s.id} onClick={() => update("service", s.id)} className={`w-full text-left p-4 border transition-all ${form.service === s.id ? "border-copper bg-copper/10" : "border-ash hover:border-bone/30"}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-heading text-bone">{s.name}</span>
                        <div className="text-right">
                          {discountApplied ? (<>
                            <span className="text-copper font-heading">R{effectivePrice(s.price)}</span>
                            <span className="text-bone/30 text-xs line-through ml-2">R{s.price}</span>
                          </>) : (<span className="text-copper font-heading">R{s.price}</span>)}
                        </div>
                      </div>
                      <p className="text-bone/40 text-xs mt-1">{s.duration} min</p>
                    </button>
                  ))}
                </div>
              )}
              {step === 2 && (
                <div className="space-y-3">
                  <h3 className="font-heading text-xl text-bone mb-4">Choose Your Master</h3>
                  <button onClick={() => update("barber", "any")} className={`w-full text-left p-4 border transition-all ${form.barber === "any" ? "border-copper bg-copper/10" : "border-ash hover:border-bone/30"}`}>
                    <span className="font-heading text-bone">Any Available Master</span>
                    <p className="text-bone/40 text-xs mt-1">First available chair</p>
                  </button>
                  {barbers.map((b) => (
                    <button key={b.id} onClick={() => update("barber", b.id)} className={`w-full text-left p-4 border transition-all flex items-center gap-4 ${form.barber === b.id ? "border-copper bg-copper/10" : "border-ash hover:border-bone/30"}`}>
                      <img src={b.image} alt={b.name} className="w-12 h-12 object-cover grayscale" />
                      <div>
                        <span className="font-heading text-bone">{b.name}</span>
                        <p className="text-bone/40 text-xs mt-1">{b.specialty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {step === 3 && (
                <div>
                  <h3 className="font-heading text-xl text-bone mb-4">Pick Date & Time</h3>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {WEEKDAYS.map((d) => (<div key={d} className="text-center text-bone/40 text-[10px] font-heading uppercase py-2">{d}</div>))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {padCells.map((_, i) => (<div key={`pad-${i}`} />))}
                    {days.map((d) => {
                      const key = formatDateKey(d);
                      const closed = isClosed(d);
                      const selected = form.date === key;
                      return (
                        <button key={key} type="button" disabled={closed} onClick={() => handleDateSelect(key)} className={`min-h-[44px] flex flex-col items-center justify-center text-sm font-heading border transition-all ${closed ? "text-bone/20 border-ash/30 cursor-not-allowed" : selected ? "bg-copper text-bone border-copper" : "text-bone/80 border-ash hover:border-copper hover:bg-copper/10"}`}>
                          <span>{d.getDate()}</span>
                          {isToday(d) && (<span className={`text-[7px] uppercase tracking-wider ${selected ? "text-bone" : "text-copper"}`}>Today</span>)}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 mt-4 text-[10px] font-heading uppercase tracking-widest text-bone/40">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 border border-copper inline-block" /> Selected</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 border border-ash/30 inline-block" /> Closed</span>
                  </div>
                  {form.date && (<div className="mt-4 text-copper text-xs font-heading uppercase tracking-widest">Selected: {formatDateDisplay(form.date)}</div>)}
                  {form.date && (
                    <div className="mt-6 pt-6 border-t border-ash">
                      <div className="text-bone/60 text-xs font-heading uppercase tracking-widest mb-3">Available times</div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {times.map((t) => (
                          <button key={t} type="button" onClick={() => update("time", t)} className={`py-2 text-xs font-heading tracking-wider border transition-all ${form.time === t ? "border-copper bg-copper text-bone" : "border-ash text-bone/60 hover:border-bone/30 hover:bg-copper/10"}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl text-bone mb-4">Your Details</h3>
                  {[
                    { field: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                    { field: "email", label: "Email", type: "email", placeholder: "john@example.com" },
                    { field: "phone", label: "Phone", type: "tel", placeholder: "082 123 4567" },
                  ].map((input) => (
                    <div key={input.field}>
                      <label className="block text-bone/60 text-sm mb-2">{input.label}</label>
                      <input type={input.type} value={form[input.field]} onChange={(e) => update(input.field, e.target.value)} placeholder={input.placeholder} className="w-full bg-charcoal border border-ash text-bone p-3 focus:border-copper outline-none" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-bone/60 text-sm mb-2">Notes (optional)</label>
                    <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2} placeholder="Any special requests?" className="w-full bg-charcoal border border-ash text-bone p-3 focus:border-copper outline-none resize-none" />
                  </div>
                  <div className="border border-ash p-4 mt-4">
                    <h4 className="font-heading text-copper text-sm tracking-widest mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between"><span className="text-bone/60">Service</span><span className="text-bone">{selectedService?.name}</span></p>
                      <p className="flex justify-between"><span className="text-bone/60">Duration</span><span className="text-bone">{selectedService?.duration} min</span></p>
                      <p className="flex justify-between">
                        <span className="text-bone/60">Price</span>
                        <span className="text-copper font-heading">
                          {discountApplied && selectedService ? (<>
                            R{effectivePrice(selectedService.price)}
                            <span className="text-bone/30 text-xs line-through ml-2">R{selectedService.price}</span>
                          </>) : (<>R{selectedService?.price}</>)}
                        </span>
                      </p>
                      <p className="flex justify-between"><span className="text-bone/60">Date</span><span className="text-bone">{formatDateDisplay(form.date)}</span></p>
                      <p className="flex justify-between"><span className="text-bone/60">Time</span><span className="text-bone">{form.time}</span></p>
                    </div>
                    {discountApplied && (
                      <p className="mt-3 pt-3 border-t border-ash text-copper text-[10px] font-heading uppercase tracking-widest text-center">
                        You save R{(selectedService?.price || 0) - effectivePrice(selectedService?.price || 0)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4 p-4 md:p-5 border-t border-ash shrink-0 bg-smoke">
              <button onClick={goBack} disabled={step === 1} className={`font-heading uppercase tracking-widest text-xs px-4 py-3 transition-all ${step === 1 ? "text-bone/20 cursor-not-allowed" : "text-bone/60 hover:text-copper border border-ash hover:border-copper"}`}>
                &larr; Back
              </button>
              <div className="text-bone/40 text-[10px] font-heading uppercase tracking-widest">Step {step} / 4</div>
              {step < 4 ? (
                <button onClick={goNext} disabled={!canProceed()} className={`font-heading uppercase tracking-widest text-xs px-6 py-3 transition-all ${canProceed() ? "bg-copper text-bone hover:bg-gold hover:text-charcoal" : "bg-ash text-bone/30 cursor-not-allowed"}`}>Continue &rarr;</button>
              ) : (
                <button onClick={handleConfirm} disabled={!canProceed() || isSubmitting} className={`font-heading uppercase tracking-widest text-xs px-6 py-3 transition-all ${canProceed() && !isSubmitting ? "bg-copper text-bone hover:bg-gold hover:text-charcoal" : "bg-ash text-bone/30 cursor-not-allowed"}`}>
                  {isSubmitting ? "Sending…" : "Confirm →"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}