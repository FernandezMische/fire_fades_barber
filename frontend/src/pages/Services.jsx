import React, { useState } from "react";
import { services } from "../data/siteData";
import BookingModal from "../components/BookingModal";

export default function Services({ setPage, discountApplied }) {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const categories = [...new Set(services.map((s) => s.category))];

  const handleBook = (serviceId) => {
    setSelectedService(serviceId);
    setShowBooking(true);
  };

  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-wide">
          <div className="text-center mb-20">
            <p className="font-script text-copper text-3xl mb-2">The Menu</p>
            <h1 className="font-heading text-5xl md:text-7xl text-bone mb-6">Services</h1>
            <p className="text-bone/50 max-w-2xl mx-auto">Every service is a craft. Every cut is a statement. Choose your weapon.</p>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="mb-16">
              <h2 className="font-heading text-copper text-sm tracking-[0.3em] uppercase mb-8 border-b border-ash pb-4">{cat}</h2>
              <div className="space-y-6">
                {services.filter((s) => s.category === cat).map((s) => (
                  <div key={s.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-ash hover:border-copper transition-all duration-300 group">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl text-bone mb-2 group-hover:text-copper transition-colors">{s.name}</h3>
                      <p className="text-bone/50 text-sm">{s.description}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-heading text-2xl text-copper">R{s.price}</p>
                        <p className="text-bone/40 text-xs">{s.duration} min</p>
                      </div>
                      <button onClick={() => handleBook(s.id)} className="border border-bone/30 text-bone font-heading uppercase tracking-widest text-xs px-6 py-3 hover:bg-copper hover:border-copper transition-all duration-300">
                        Book This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-16">
            <button onClick={() => setPage("booking")} className="btn-primary">Book Your Chair</button>
          </div>
        </div>
      </section>
      {showBooking && (
        <BookingModal
          onClose={() => { setShowBooking(false); setSelectedService(null); }}
          discountApplied={discountApplied}
        />
      )}
    </>
  );
}