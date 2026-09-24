import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export function Layout({ children, page, setPage }) {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header page={page} setPage={setPage} />
      <main className="flex-1">{children}</main>
      <Footer setPage={setPage} />

      {/* Mobile-only floating Reserve button — hidden on booking page */}
      {page !== "booking" && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-copper">
          <button
            onClick={() => {
              setPage("booking");
              window.scrollTo(0, 0);
            }}
            className="w-full font-heading uppercase tracking-widest text-bone text-sm py-3"
          >
            Reserve Now
          </button>
        </div>
      )}
    </div>
  );
}