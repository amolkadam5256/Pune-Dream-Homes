import React from "react";
import BuyPage from "./BuyPage";

const OwnerProperties = () => {
  return (
    <BuyPage
      initialFilters={{ agentType: "Owner" }}
      title="Direct from Owner Properties"
    />
  );
};

export default OwnerProperties;
