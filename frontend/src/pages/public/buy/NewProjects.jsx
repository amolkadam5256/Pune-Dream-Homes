import React from "react";
import BuyPage from "./BuyPage";

const NewProjects = () => {
  return (
    <BuyPage
      initialFilters={{ status: "New Launch" }}
      title="New Launch Projects"
    />
  );
};

export default NewProjects;
