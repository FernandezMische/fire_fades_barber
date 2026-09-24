import React, { useState } from "react";
import { services, barbers } from "../data/siteData";
import BookingModal from "../components/BookingModal";

export default function Home({ setPage, discountApplied }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80"
            alt="Barber cutting hair"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl">
          <p className="font-script text-copper text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4">
            Fire Fades
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-bone leading-none mb-5 md:mb-6">
            Sharp Cuts.
            <br />
            Sharp Minds.
          </h1>
          <p className="text-bone/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-2">
            Premium grooming for the modern gentleman. Walk in as you are. Walk out as you should be.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button onClick={() => setShowBooking(true)} className="btn-primary">
              Book Your Chair
            </button>
            <button onClick={() => setPage("services")} className="btn-outline">
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-script text-copper text-2xl mb-2">Our Arsenal</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-bone">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="border border-ash p-6 md:p-8 hover:border-copper transition-all duration-300 group"
              >
                <h3 className="font-heading text-lg md:text-xl text-bone mb-3 group-hover:text-copper transition-colors">
                  {s.name}
                </h3>
                <p className="text-bone/50 text-sm leading-relaxed mb-6">{s.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-heading text-copper text-xl md:text-2xl">R{s.price}</span>
                  <button
                    onClick={() => setShowBooking(true)}
                    className="text-bone/60 hover:text-copper text-xs font-heading uppercase tracking-widest transition-colors"
                  >
                    Book This &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 md:mt-12">
            <button onClick={() => setPage("services")} className="btn-outline">
              See Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section-padding bg-smoke">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80"
              alt="Barber shop interior"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-script text-copper text-2xl mb-2">The Philosophy</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-bone mb-5 md:mb-6">
              More Than
              <br />
              A Haircut.
            </h2>
            <p className="text-bone/60 leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
              Fire Fades isn't just a barber shop. It's a sanctuary for the modern man. A place where
              precision meets personality, and every cut tells a story.
            </p>
            <p className="text-bone/60 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              Our masters don't just cut hair — they craft confidence. From classic fades to sharp
              beard sculpts, every detail is intentional.
            </p>
            <button onClick={() => setPage("about")} className="btn-outline">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* THE MASTERS */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-script text-copper text-2xl mb-2">The Masters</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-bone">
              Meet Your Barbers
            </h2>
          </div>
          {/* 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {barbers.map((b) => (
              <div key={b.id} className="group text-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-5 md:mb-6">
                  <img
                    src={b.image}
                    alt={b.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/0 transition-all duration-500" />
                </div>
                <h3 className="font-heading text-lg md:text-xl text-bone mb-1">{b.name}</h3>
                <p className="text-copper text-xs font-heading uppercase tracking-widest mb-2">
                  {b.title}
                </p>
                <p className="text-bone/40 text-sm">{b.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-copper py-16 md:py-20">
        <div className="container-wide text-center px-5 sm:px-6">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl text-bone mb-5 md:mb-6">
            Ready for a Sharp Cut?
          </h2>
          <p className="text-bone/80 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
            Book your chair today and experience grooming the way it should be.
          </p>
          <button
            onClick={() => setShowBooking(true)}
            className="inline-block bg-charcoal text-bone font-heading uppercase tracking-widest px-8 md:px-10 py-3 md:py-4 hover:bg-bone hover:text-charcoal transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </section>

      {showBooking && (
        <BookingModal onClose={() => setShowBooking(false)} discountApplied={discountApplied} />
      )}
    </>
  );
}