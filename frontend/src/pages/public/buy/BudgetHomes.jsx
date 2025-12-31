import React from "react";
import BuyPage from "./BuyPage";

const BudgetHomes = () => {
  return (
    <BuyPage
      initialFilters={{ budget: "0-5000000" }}
      title="Budget Homes (Under 50 Lac)"
    />
  );
};

export default BudgetHomes;
