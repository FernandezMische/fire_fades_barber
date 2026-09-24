import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export function Layout({ children, page, setPage }) {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header page={page} setPage={setPage} />
      <main className="flex-1">{children}</main>
      <Footer setPage={setPage} />
    </div>
  );
}