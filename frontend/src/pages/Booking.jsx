import React, { useState } from "react";
import { shopInfo, openingHours } from "../data/siteData";
import BookingModal from "../components/BookingModal";

export default function Booking({ discountApplied }) {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-wide">
          <div className="text-center mb-20">
            <p className="font-script text-copper text-3xl mb-2">Reserve</p>
            <h1 className="font-heading text-5xl md:text-7xl text-bone mb-6">Book Your Chair</h1>
            <p className="text-bone/50 max-w-xl mx-auto mb-10">Select your service, pick your master, choose your time. We'll handle the rest.</p>
            {discountApplied && (
              <div className="inline-block bg-copper/20 border border-copper text-copper font-heading uppercase tracking-widest text-xs px-4 py-2 mb-6">
                20% First-Visit Discount Applied
              </div>
            )}
            <button onClick={() => setShowBooking(true)} className="btn-primary text-lg px-12 py-4">Start Booking</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-2xl text-bone mb-8 border-b border-ash pb-4">Visit Us</h2>
              <div className="space-y-6">
                <div><h3 className="text-copper font-heading text-xs tracking-widest uppercase mb-2">Address</h3><p className="text-bone/70">{shopInfo.address}</p></div>
                <div><h3 className="text-copper font-heading text-xs tracking-widest uppercase mb-2">Phone</h3><a href={`tel:${shopInfo.phone}`} className="text-bone/70 hover:text-copper transition-colors">{shopInfo.phone}</a></div>
                <div><h3 className="text-copper font-heading text-xs tracking-widest uppercase mb-2">Email</h3><a href={`mailto:${shopInfo.email}`} className="text-bone/70 hover:text-copper transition-colors">{shopInfo.email}</a></div>
              </div>
              <div className="mt-8 border border-ash h-64 flex items-center justify-center">
                <p className="text-bone/30 text-sm font-heading uppercase tracking-widest">Google Map Embed Here</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-bone mb-8 border-b border-ash pb-4">Opening Hours</h2>
              <ul className="space-y-4">
                {openingHours.map((item) => (
                  <li key={item.day} className="flex justify-between items-center py-3 border-b border-ash/50">
                    <span className="font-heading text-bone/60 text-sm uppercase tracking-wider">{item.day}</span>
                    <span className={`font-heading text-sm ${item.hours === "Closed" ? "text-copper" : "text-bone"}`}>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {showBooking && (
        <BookingModal
          onClose={() => setShowBooking(false)}
          discountApplied={discountApplied}
        />
      )}
    </>
  );
}