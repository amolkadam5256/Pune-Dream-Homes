import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import BuilderLayout from "../layouts/BuilderLayout";
import BuilderDashboard from "../pages/builder/BuilderDashboard";

function BuilderRoutes() {
  return (
    <Route
      path="/builder"
      element={
        <ProtectedRoute roles={["BUILDER"]}>
          <BuilderLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<BuilderDashboard />} />
    </Route>
  );
}

export default BuilderRoutes;
