import React from "react";
import { useParams } from "react-router-dom";
import BuyPage from "./BuyPage";

const BudgetListing = () => {
  const { range } = useParams();

  const rangeMap = {
    "under-50lac": { filter: "0-5000000", title: "Homes under 50 Lac" },
    "50lac-1cr": {
      filter: "5000000-10000000",
      title: "Homes between 50 Lac - 1 Cr",
    },
    "1cr-1.5cr": {
      filter: "10000000-15000000",
      title: "Homes between 1 Cr - 1.5 Cr",
    },
    "above-1.5cr": {
      filter: "15000000-999999999",
      title: "Premium Homes above 1.5 Cr",
    },
  };

  const config = rangeMap[range] || { filter: "all", title: "Properties" };

  return (
    <BuyPage initialFilters={{ budget: config.filter }} title={config.title} />
  );
};

export default BudgetListing;
