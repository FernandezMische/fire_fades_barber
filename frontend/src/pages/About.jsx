import React from "react";
import { barbers } from "../data/siteData";

export default function About() {
  return (
    <section className="section-padding pt-24 md:pt-32">
      <div className="container-wide">
        {/* STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
          <div>
            <p className="font-script text-copper text-2xl sm:text-3xl mb-2">Since 2024</p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl text-bone mb-6 md:mb-8 leading-none">
              Our
              <br />
              Story
            </h1>
            <p className="text-bone/60 leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
              Fire Fades was born from a simple idea: that getting a haircut should feel like an
              experience, not an errand. We built a space where craft meets culture, where every
              detail is deliberate.
            </p>
            <p className="text-bone/60 leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
              From the music to the tools to the masters behind the chair, everything at Fire Fades
              is curated to give you more than just a cut. We're here to make you look sharp, feel
              sharp, and leave sharper.
            </p>
            <p className="text-copper font-heading text-sm tracking-widest uppercase">
              Sharp cuts. Sharp minds.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80"
              alt="Barber shop interior"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* THE MASTERS */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-script text-copper text-2xl mb-2">The Masters</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-bone">
            Meet Your Barbers
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {barbers.map((b) => (
            <div key={b.id} className="group">
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-5 md:mb-6">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-bone mb-1">{b.name}</h3>
              <p className="text-copper text-xs font-heading uppercase tracking-widest mb-3">
                {b.title}
              </p>
              <p className="text-bone/50 text-sm">{b.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}