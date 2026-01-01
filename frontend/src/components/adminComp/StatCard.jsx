import React from "react";

const StatCard = ({ title, value, icon: Icon, color, change }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-neutral mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-dark">{value}</h3>
        {change && (
          <p
            className={`text-sm mt-2 font-medium flex items-center ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs mr-2 ${
                change > 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
            </span>
            from last month
          </p>
        )}
      </div>
      <div className={`p-4 rounded-xl ${color} shadow-lg shadow-opacity-20`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;
