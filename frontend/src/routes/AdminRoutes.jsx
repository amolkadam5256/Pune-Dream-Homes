import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AdminRoutes() {
  return (
    <Route
      path="/admin"
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="admin-dashboard" element={<AdminDashboard />} />
      {/* You can add more admin routes here */}
    </Route>
  );
}

export default AdminRoutes;
