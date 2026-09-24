import React from "react";
import { shopInfo, barbers } from "../data/siteData";

const DISCOUNT_RATE = 0.20;

export default function CalendarButtons({ form, service, discountApplied = false }) {
  const barberName =
    form.barber === "any"
      ? "Any available master"
      : barbers.find((b) => b.id === form.barber)?.name || form.barber;

  const effectivePrice = discountApplied && service
    ? Math.round(service.price * (1 - DISCOUNT_RATE))
    : service?.price;

  const parseDateTime = (dateStr, timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return new Date(
      `${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
    );
  };

  const startDate = parseDateTime(form.date, form.time);
  const endDate = new Date(startDate.getTime() + (service?.duration || 45) * 60000);

  const formatICSDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const priceLine = discountApplied
    ? `Price: R${effectivePrice} (20% first-visit discount, was R${service?.price})`
    : `Price: R${service?.price}`;

  const eventDescription = `Service: ${service?.name}
Duration: ${service?.duration} min
${priceLine}
Master: ${barberName}
Phone: ${shopInfo.phone}${form.notes ? `\nNotes: ${form.notes}` : ""}`.trim();

  // ---- Google Calendar ----
  const googleCalendarUrl = () => {
    const start = formatICSDate(startDate);
    const end = formatICSDate(endDate);
    const title = encodeURIComponent(`${service?.name} at ${shopInfo.name}`);
    const details = encodeURIComponent(eventDescription);
    const location = encodeURIComponent(shopInfo.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  // ---- Apple Calendar / Outlook (.ics download) ----
  const downloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Fire Fades//Booking//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@firefades.co.za`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${service?.name} at ${shopInfo.name}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, "\\n")}`,
      `LOCATION:${shopInfo.address}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT1H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fire-fades-${form.date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <a
        href={googleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary text-sm text-center inline-flex items-center justify-center gap-2 w-full"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
        Add to Google Calendar
      </a>

      <button
        onClick={downloadICS}
        className="btn-outline text-sm inline-flex items-center justify-center gap-2 w-full"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        Add to Apple Calendar (.ics)
      </button>
    </div>
  );
}