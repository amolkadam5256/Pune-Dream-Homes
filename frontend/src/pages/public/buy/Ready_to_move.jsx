import React from "react";
import BuyPage from "./BuyPage";

const ReadyToMove = () => {
  return (
    <BuyPage
      initialFilters={{ status: "Ready to Move" }}
      title="Ready to Move Properties"
    />
  );
};

export default ReadyToMove;
