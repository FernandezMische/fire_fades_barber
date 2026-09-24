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
      <div className="flex items-center justify-between px-4 md:px-12 py-3 md:py-4">
        {/* Logo — tap goes home */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Go to homepage"
        >
          <img
            src="/images/ff_logo.png"
            alt="Fire Fades"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <div className="hidden sm:block text-left">
            <span className="font-heading text-lg md:text-xl tracking-[0.3em] text-bone block leading-none">
              FIRE
            </span>
            <span className="font-heading text-[10px] md:text-xs tracking-[0.5em] text-copper block leading-none">
              FADES
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`font-heading text-sm uppercase tracking-widest transition-colors duration-300 ${
                page === link.id ? "text-copper" : "text-bone hover:text-copper"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNav("booking")} className="btn-primary text-sm">
            Book Now
          </button>
        </nav>

        {/* Mobile burger — 44×44, always visible, high contrast */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 text-bone border border-ash hover:border-copper active:bg-smoke transition-colors shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden bg-smoke border-t border-ash">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`font-heading text-lg uppercase tracking-widest text-left transition-colors ${
                  page === link.id ? "text-copper" : "text-bone hover:text-copper"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("booking")}
              className="btn-primary text-center mt-2"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}