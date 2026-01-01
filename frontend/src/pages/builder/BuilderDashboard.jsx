import React from "react";

const BuilderDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Builder Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Active Inquiries
          </h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Profile Status</h3>
          <p className="text-green-500 text-sm font-bold mt-2">Active</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
        <div className="text-gray-500 text-center py-8">
          No projects listed yet.
        </div>
      </div>
    </div>
  );
};

export default BuilderDashboard;
