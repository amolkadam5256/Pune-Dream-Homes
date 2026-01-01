import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CustomerLayout from "../layouts/CustomerLayout";
import CustomerDashboard from "../pages/customer/CustomerDashboard";

function CustomerRoutes() {
  return (
    <Route
      path="/customer"
      element={
        <ProtectedRoute roles={["CUSTOMER"]}>
          <CustomerLayout />
        </ProtectedRoute>
      }
    >
      <Route path="customer-dashboard" element={<CustomerDashboard />} />
      {/* You can add more customer routes here */}
    </Route>
  );
}

export default CustomerRoutes;
