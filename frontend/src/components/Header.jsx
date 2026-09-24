import React, { useState } from "react";

export default function Header({ page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "booking", label: "Contact" },
  ];

  const handleNav = (id) => {
    setPage(id);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur border-b border-ash">
      <div className="container-wide flex items-center justify-between px-6 md:px-12 py-4">
        <button onClick={() => handleNav("home")} className="flex items-center gap-3 group">
          <img src="/images/ff_logo.png" alt="Fire Fades logo" className="h-12 w-auto object-contain" />
          <div className="text-left">
            <span className="font-heading text-xl tracking-[0.3em] text-bone block leading-none">FIRE</span>
            <span className="font-heading text-xs tracking-[0.5em] text-copper block leading-none">FADES</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleNav(link.id)}
              className={`font-heading text-sm uppercase tracking-widest transition-colors duration-300 ${page === link.id ? "text-copper" : "text-bone hover:text-copper"}`}>
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNav("booking")} className="btn-primary text-sm">Book Now</button>
        </nav>

        <button className="md:hidden text-bone p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-smoke border-t border-ash">
          <nav className="flex flex-col px-6 py-6 gap-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNav(link.id)}
                className={`font-heading text-lg uppercase tracking-widest text-left ${page === link.id ? "text-copper" : "text-bone"}`}>
                {link.label}
              </button>
            ))}
            <button onClick={() => handleNav("booking")} className="btn-primary text-center mt-2">Book Now</button>
          </nav>
        </div>
      )}

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-copper p-3">
        <button onClick={() => handleNav("booking")} className="w-full font-heading uppercase tracking-widest text-bone text-sm py-2">
          Reserve Now
        </button>
      </div>
    </header>
  );
}