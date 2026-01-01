import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/adminComp/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllProperties from "../pages/admin/properties/AllProperties";
import AddProperty from "../pages/admin/properties/AddProperty";
import Inquiries from "../pages/admin/Inquiries";
import Users from "../pages/admin/Users";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

function AdminRoutes() {
  return (
    <Route
      path="/admin"
      element={
        <ProtectedRoute roles={["ADMIN"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="admin-dashboard" element={<AdminDashboard />} />
      <Route path="properties/all" element={<AllProperties />} />
      <Route path="properties/buy" element={<AllProperties />} />{" "}
      {/* reusing AllProperties for now */}
      <Route path="properties/rent" element={<AllProperties />} />{" "}
      {/* reusing AllProperties for now */}
      <Route path="properties/sell" element={<AllProperties />} />{" "}
      {/* reusing AllProperties for now */}
      <Route path="properties/add" element={<AddProperty />} />
      <Route path="inquiries" element={<Inquiries />} />
      <Route path="users" element={<Users />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  );
}

export default AdminRoutes;
