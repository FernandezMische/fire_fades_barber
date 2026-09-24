import React, { useState } from "react";
import { shopInfo, openingHours } from "../data/siteData";
import BookingModal from "../components/BookingModal";

export default function Booking({ discountApplied }) {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <>
      <section className="section-padding pt-24 md:pt-32">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-20">
            <p className="font-script text-copper text-2xl sm:text-3xl mb-2">Reserve</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-bone mb-5 md:mb-6">
              Book Your Chair
            </h1>
            <p className="text-bone/50 max-w-xl mx-auto mb-6 md:mb-10 text-sm md:text-base px-2">
              Select your service, pick your master, choose your time. We'll handle the rest.
            </p>
            {discountApplied && (
              <div className="inline-block bg-copper/20 border border-copper text-copper font-heading uppercase tracking-widest text-[10px] md:text-xs px-4 py-2 mb-6">
                20% First-Visit Discount Applied
              </div>
            )}
            <div>
              <button
                onClick={() => setShowBooking(true)}
                className="btn-primary text-base md:text-lg px-8 md:px-12 py-3 md:py-4"
              >
                Start Booking
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* VISIT US */}
            <div>
              <h2 className="font-heading text-xl md:text-2xl text-bone mb-6 md:mb-8 border-b border-ash pb-3 md:pb-4">
                Visit Us
              </h2>
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-copper font-heading text-xs tracking-widest uppercase mb-2">
                    Address
                  </h3>
                  <p className="text-bone/70 text-sm md:text-base">{shopInfo.address}</p>
                </div>
                <div>
                  <h3 className="text-copper font-heading text-xs tracking-widest uppercase mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${shopInfo.phone}`}
                    className="text-bone/70 hover:text-copper transition-colors text-sm md:text-base"
                  >
                    {shopInfo.phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-copper font-heading text-xs tracking-widest uppercase mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${shopInfo.email}`}
                    className="text-bone/70 hover:text-copper transition-colors text-sm md:text-base"
                  >
                    {shopInfo.email}
                  </a>
                </div>
              </div>
              <div className="mt-6 md:mt-8 border border-ash h-56 md:h-64 flex items-center justify-center">
                <p className="text-bone/30 text-xs md:text-sm font-heading uppercase tracking-widest text-center px-4">
                  Google Map Embed Here
                </p>
              </div>
            </div>

            {/* HOURS */}
            <div>
              <h2 className="font-heading text-xl md:text-2xl text-bone mb-6 md:mb-8 border-b border-ash pb-3 md:pb-4">
                Opening Hours
              </h2>
              <ul className="space-y-3 md:space-y-4">
                {openingHours.map((item) => (
                  <li
                    key={item.day}
                    className="flex justify-between items-center py-2 md:py-3 border-b border-ash/50"
                  >
                    <span className="font-heading text-bone/60 text-xs md:text-sm uppercase tracking-wider">
                      {item.day}
                    </span>
                    <span
                      className={`font-heading text-xs md:text-sm ${
                        item.hours === "Closed" ? "text-copper" : "text-bone"
                      }`}
                    >
                      {item.hours}
                    </span>
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