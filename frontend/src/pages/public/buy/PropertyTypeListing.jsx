import React from "react";
import { useParams } from "react-router-dom";
import BuyPage from "./BuyPage";

const PropertyTypeListing = () => {
  const { type } = useParams();

  const typeMap = {
    "flats-pune": { filter: "flat", title: "Flats in Pune" },
    "house-pune": { filter: "house", title: "Houses for Sale in Pune" },
    "villa-pune": { filter: "villa", title: "Villas in Pune" },
    "plot-pune": { filter: "plot", title: "Residential & Commercial Plots" },
    "office-pune": { filter: "office", title: "Office Spaces" },
    "commercial-pune": { filter: "commercial", title: "Commercial Spaces" },
  };

  const config = typeMap[type] || { filter: "all", title: "Properties" };

  return (
    <BuyPage
      initialFilters={{ propertyType: config.filter }}
      title={config.title}
    />
  );
};

export default PropertyTypeListing;
