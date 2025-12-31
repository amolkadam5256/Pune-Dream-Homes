import React from "react";
import BuyPage from "./BuyPage";

const PremiumHomes = () => {
  return (
    <BuyPage
      initialFilters={{ budget: "15000000-999999999" }}
      title="Premium & Luxury Homes"
    />
  );
};

export default PremiumHomes;
