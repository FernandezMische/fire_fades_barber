import React from "react";
import { barbers } from "../data/siteData";

export default function About() {
  return (
    <section className="section-padding pt-32">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="font-script text-copper text-3xl mb-2">Since 2024</p>
            <h1 className="font-heading text-5xl md:text-7xl text-bone mb-8 leading-none">Our<br />Story</h1>
            <p className="text-bone/60 leading-relaxed mb-6">Fire Fades was born from a simple idea: that getting a haircut should feel like an experience, not an errand. We built a space where craft meets culture, where every detail is deliberate.</p>
            <p className="text-bone/60 leading-relaxed mb-6">From the music to the tools to the masters behind the chair, everything at Fire Fades is curated to give you more than just a cut. We're here to make you look sharp, feel sharp, and leave sharper.</p>
            <p className="text-copper font-heading text-sm tracking-widest uppercase">Sharp cuts. Sharp minds.</p>
          </div>
          <div><img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80" alt="Barber shop interior" className="w-full h-[600px] object-cover" /></div>
        </div>

        <div className="text-center mb-16">
          <p className="font-script text-copper text-2xl mb-2">The Masters</p>
          <h2 className="font-heading text-4xl md:text-5xl text-bone">Meet Your Barbers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {barbers.map((b) => (
            <div key={b.id} className="group">
              <div className="relative overflow-hidden mb-6">
                <img src={b.image} alt={b.name} className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              </div>
              <h3 className="font-heading text-2xl text-bone mb-1">{b.name}</h3>
              <p className="text-copper text-xs font-heading uppercase tracking-widest mb-3">{b.title}</p>
              <p className="text-bone/50 text-sm">{b.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}