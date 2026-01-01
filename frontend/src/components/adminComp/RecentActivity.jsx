import React from "react";
import { Users } from "lucide-react";

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Inquired about:{" "}
                  <span className="text-blue-600 font-medium">
                    3 BHK in Koregaon Park
                  </span>
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {i}h ago
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
