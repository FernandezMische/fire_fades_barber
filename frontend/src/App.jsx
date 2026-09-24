import React, { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Terms from "./pages/Terms";
import PromoModal from "./components/PromoModal";

export default function App() {
  const [page, setPage] = useState("home");
  const [showPromo, setShowPromo] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPromo(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClaimDiscount = () => {
    setDiscountApplied(true);
    setShowPromo(false);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <Home setPage={setPage} discountApplied={discountApplied} />;
      case "services": return <Services setPage={setPage} discountApplied={discountApplied} />;
      case "about": return <About />;
      case "booking": return <Booking discountApplied={discountApplied} />;
      case "terms": return <Terms />;
      default: return <Home setPage={setPage} discountApplied={discountApplied} />;
    }
  };

  return (
    <Layout page={page} setPage={setPage}>
      {renderPage()}
      {showPromo && (
        <PromoModal
          onClose={() => setShowPromo(false)}
          onClaim={handleClaimDiscount}
        />
      )}
    </Layout>
  );
}