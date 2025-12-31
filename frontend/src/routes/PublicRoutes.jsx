// src/routes/PublicRoutes.jsx
import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import PDH_Prime from "../pages/public/PDH_Prime";
import SalesEnquiry from "../pages/public/help/SalesEnquiry";
import ChatWithUs from "../pages/public/help/ChatWithUs";
import HelpCenter from "../pages/public/help/HelpCenter";
import Ready_to_move from "../pages/public/buy/Ready_to_move";
import OwnerProperties from "../pages/public/buy/OwnerProperties";
import BudgetHomes from "../pages/public/buy/BudgetHomes";
import PremiumHomes from "../pages/public/buy/PremiumHomes";
import NewProjects from "../pages/public/buy/NewProjects";
import PropertyTypeListing from "../pages/public/buy/PropertyTypeListing";
import BudgetListing from "../pages/public/buy/BudgetListing";

function PublicRoutes() {
  return (
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="mb-prime" element={<PDH_Prime />} />
      <Route path="help/center" element={<HelpCenter />} />
      <Route path="help/sales-enquiry" element={<SalesEnquiry />} />
      <Route path="help/chat" element={<ChatWithUs />} />
      <Route path="buy/ready-to-move" element={<Ready_to_move />} />
      <Route path="buy/owner-properties" element={<OwnerProperties />} />
      <Route path="buy/budget-homes" element={<BudgetHomes />} />
      <Route path="buy/premium-homes" element={<PremiumHomes />} />
      <Route path="buy/new-projects" element={<NewProjects />} />
      <Route path="buy/budget/:range" element={<BudgetListing />} />
      <Route path="buy/:type" element={<PropertyTypeListing />} />

      {/* <Route path="property/:id" element={<PropertyDetails />} /> */}
      {/* <Route path="about" element={<About />} /> */}
      {/* <Route path="contact" element={<Contact />} /> */}
    </Route>
  );
}

export default PublicRoutes;
