import React, { useState } from "react";
import { services } from "../data/siteData";
import BookingModal from "../components/BookingModal";

export default function Services({ setPage, discountApplied }) {
  const [showBooking, setShowBooking] = useState(false);

  const categories = [...new Set(services.map((s) => s.category))];

  const handleBook = () => {
    setShowBooking(true);
  };

  return (
    <>
      <section className="section-padding pt-24 md:pt-32">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-20">
            <p className="font-script text-copper text-2xl sm:text-3xl mb-2">The Menu</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-bone mb-5 md:mb-6">
              Services
            </h1>
            <p className="text-bone/50 max-w-2xl mx-auto text-sm md:text-base px-2">
              Every service is a craft. Every cut is a statement. Choose your weapon.
            </p>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-12 md:mb-16">
              <h2 className="font-heading text-copper text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 border-b border-ash pb-3 md:pb-4">
                {cat}
              </h2>
              <div className="space-y-4 md:space-y-6">
                {services
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 p-5 md:p-6 border border-ash hover:border-copper transition-all duration-300 group"
                    >
                      <div className="flex-1">
                        <h3 className="font-heading text-lg md:text-xl text-bone mb-2 group-hover:text-copper transition-colors">
                          {s.name}
                        </h3>
                        <p className="text-bone/50 text-sm">{s.description}</p>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8">
                        <div className="text-left md:text-right">
                          <p className="font-heading text-xl md:text-2xl text-copper">
                            R{s.price}
                          </p>
                          <p className="text-bone/40 text-xs">{s.duration} min</p>
                        </div>
                        <button
                          onClick={() => handleBook(s.id)}
                          className="border border-bone/30 text-bone font-heading uppercase tracking-widest text-xs px-5 md:px-6 py-3 hover:bg-copper hover:border-copper transition-all duration-300 whitespace-nowrap"
                        >
                          Book This
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-12 md:mt-16">
            <button onClick={() => setPage("booking")} className="btn-primary">
              Book Your Chair
            </button>
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