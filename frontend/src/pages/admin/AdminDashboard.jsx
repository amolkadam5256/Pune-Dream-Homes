import React from "react";

import StatCard from "../../components/adminComp/StatCard";
import RecentActivity from "../../components/adminComp/RecentActivity";
import PropertyPerformance from "../../components/adminComp/PropertyPerformance";
import { Building2, Home, Key, TrendingUp } from "lucide-react";

const mockStats = {
  totalProperties: 156,
  buyProperties: 89,
  rentProperties: 45,
  sellProperties: 22,
  activeUsers: 1234,
  inquiries: 89,
};

const AdminDashboard = () => {
  return (
    <>
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Dashboard Overview
        </h1>
        <p className="text-neutral">
          Welcome back! Here's what's happening with your properties today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Properties"
          value={mockStats.totalProperties}
          icon={Building2}
          color="bg-gradient-to-br from-primary to-primary-dark-1"
          change={12.5}
        />
        <StatCard
          title="Buy Listings"
          value={mockStats.buyProperties}
          icon={Home}
          color="bg-gradient-to-br from-green-500 to-green-600"
          change={8.2}
        />
        <StatCard
          title="Rent Listings"
          value={mockStats.rentProperties}
          icon={Key}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          change={5.4}
        />
        <StatCard
          title="Sell Requests"
          value={mockStats.sellProperties}
          icon={TrendingUp}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          change={-2.1}
        />
      </div>

      {/* Recent Activity & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <PropertyPerformance />
      </div>
    </>
  );
};

export default AdminDashboard;
