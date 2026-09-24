import React from "react";

export default function PromoModal({ onClose, onClaim }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-smoke border border-copper max-w-md w-full p-8 md:p-12 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-bone/40 hover:text-copper text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        <p className="font-script text-copper text-3xl mb-4">Welcome</p>
        <h2 className="font-heading text-2xl md:text-3xl text-bone tracking-wider mb-4">
          First Time at Fire Fades?
        </h2>
        <p className="text-bone/60 text-sm mb-8 leading-relaxed">
          Get <span className="text-copper font-semibold">20% off</span> your first cut.
          Join the club and stay sharp.
        </p>
        <button onClick={onClaim} className="btn-primary w-full">
          Claim My 20% Off
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-bone/40 hover:text-bone/60 text-xs transition-colors"
        >
          No thanks, I'm already sharp.
        </button>
      </div>
    </div>
  );
}