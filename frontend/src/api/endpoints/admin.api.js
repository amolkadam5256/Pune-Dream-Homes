// frontend/src/api/endpoints/admin.api.js

import apiClient from "../client";

export const adminAPI = {
  // Get all users (with optional params)
  getUsers: async (params) => {
    const response = await apiClient.get("/admin/users", { params });
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await apiClient.post("/admin/users", userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  },
};
