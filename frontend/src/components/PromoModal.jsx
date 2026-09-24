import React, { useEffect } from "react";

export default function PromoModal({ onClose, onClaim }) {
  // Phone back button closes the modal
  useEffect(() => {
    // Push a fake history entry so back button has something to pop
    window.history.pushState({ promoOpen: true }, "");
    const handlePop = () => onClose();
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [onClose]);

  // Click on the dark backdrop (not the inner card) closes it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-smoke border border-copper max-w-md w-full p-8 md:p-12 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-ash hover:bg-copper text-bone/70 hover:text-bone rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
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