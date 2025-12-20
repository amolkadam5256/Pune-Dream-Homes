import React from "react";
import { useAuth } from "../../context/AuthContext";

const AgentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
      <p className="text-gray-600">
        Welcome back,{" "}
        <span className="font-semibold text-blue-600">{user?.fullName}</span>!
      </p>
    </div>
  );
};

export default AgentDashboard;
