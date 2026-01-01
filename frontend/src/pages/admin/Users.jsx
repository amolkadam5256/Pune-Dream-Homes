import React, { useState, useEffect } from "react";
import {
  Users as UsersIcon,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  ChevronDown,
} from "lucide-react";
import { adminAPI } from "../../api/endpoints/admin.api";
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    confirmText: "Okay",
    cancelText: null, // If null, cancel button is hidden (acting as an alert)
    onConfirm: () => {},
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER", // Default role
    isActive: true,
  });

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "ADMIN", label: "Admin" },
    { value: "CUSTOMER", label: "Customer" },
    { value: "BUILDER", label: "Builder" },
  ];

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]); // Re-fetch when role filter changes

  const showStatsModal = (type, title, message, onConfirm = () => {}) => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message,
      confirmText: "Okay",
      cancelText: null,
      onConfirm: () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
        onConfirm();
      },
    });
  };

  const showConfirmModal = (type, title, message, confirmText, onConfirm) => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message,
      confirmText,
      cancelText: "Cancel",
      onConfirm,
    });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (roleFilter !== "all") params.role = roleFilter;

      console.log("Fetching users with params:", params);
      const response = await adminAPI.getUsers(params);
      console.log("Fetch users response:", response);

      if (response.success) {
        setUsers(response.data);
      } else {
        setError("Failed to load data.");
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = { search: searchTerm };
      if (roleFilter !== "all") params.role = roleFilter;
      const response = await adminAPI.getUsers(params);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      showStatsModal("warning", "Search Failed", "Failed to search users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    showConfirmModal(
      "danger",
      "Delete User?",
      "Are you sure you want to delete this user? This action cannot be undone.",
      "Delete",
      async () => {
        try {
          await adminAPI.deleteUser(id);
          setUsers(users.filter((u) => u.id !== id));
          showStatsModal("success", "Success", "User deleted successfully.");
        } catch (err) {
          showStatsModal(
            "danger",
            "Error",
            err.response?.data?.message || "Failed to delete user"
          );
        }
      }
    );
  };

  const handleStatusToggle = async (user) => {
    try {
      const updatedStatus = !user.isActive;
      await adminAPI.updateUser(user.id, { isActive: updatedStatus });
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, isActive: updatedStatus } : u
        )
      );
    } catch (err) {
      showStatsModal("danger", "Error", "Failed to update user status");
    }
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        isActive: user.isActive,
        password: "", // Don't fill password
      });
    } else {
      setEditingUser(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "CUSTOMER",
        isActive: true,
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const dataToUpdate = { ...formData };
        if (!dataToUpdate.password) delete dataToUpdate.password; // Don't send empty password

        await adminAPI.updateUser(editingUser.id, dataToUpdate);
        setIsModalOpen(false);
        showStatsModal(
          "success",
          "User Updated",
          "User details updated successfully."
        );
      } else {
        await adminAPI.createUser(formData);
        setIsModalOpen(false);
        showStatsModal(
          "success",
          "User Created",
          "New user has been created successfully."
        );
      }
      fetchUsers();
    } catch (err) {
      showStatsModal(
        "danger",
        "Operation Failed",
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className="space-y-6">
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark-2">
            User Management
          </h1>
          <p className="text-neutral">
            Manage system users, roles, and permissions.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark-1 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-neutral">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Filter by Role:</span>
          </div>
          <div className="flex bg-primary-lightest/30 rounded-lg p-1">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setRoleFilter(role.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  roleFilter === role.value
                    ? "bg-white text-primary shadow-sm"
                    : "text-neutral hover:text-primary-dark-1"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-primary-lightest/20 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary-lightest/30 border-b border-gray-100 text-xs uppercase text-primary-dark-1 font-semibold tracking-wider">
                <th className="px-6 py-4">User Info</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-neutral"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-primary-lightest/10 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center text-primary-dark-2 font-semibold">
                          {user.firstName?.[0] || user.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-dark">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-neutral">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-primary/10 text-primary"
                            : user.role === "BUILDER"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(user)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          user.isActive
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-neutral text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal(user)}
                          className="p-2 text-neutral hover:text-primary hover:bg-primary-lightest/30 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-neutral hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          disabled={user.id === currentUser?.id}
                          title={
                            user.id === currentUser?.id
                              ? "Cannot delete yourself"
                              : "Delete User"
                          }
                        >
                          <Trash2
                            className={`w-4 h-4 ${
                              user.id === currentUser?.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-neutral"
                  >
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-dark">
                {editingUser ? "Edit User Details" : "Create New User"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full text-neutral transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={!!editingUser}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all ${
                    editingUser ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none bg-white transition-all"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="BUILDER">Builder</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  {editingUser
                    ? "New Password (leave blank to keep current)"
                    : "Password *"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingUser}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              {editingUser && (
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="isActive" className="text-sm text-dark">
                    Account is Active
                  </label>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-dark rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark-1 transition-all font-medium shadow-md"
                >
                  {editingUser ? "Save Changes" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
