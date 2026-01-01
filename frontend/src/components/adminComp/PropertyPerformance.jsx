import React from "react";

const PropertyPerformance = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
      <h3 className="text-lg font-bold text-dark mb-6">Property Performance</h3>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral font-medium">Views Today</span>
            <span className="font-bold text-dark">1,234</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-primary to-primary-dark-1 h-2.5 rounded-full shadow-sm"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral font-medium">Inquiries</span>
            <span className="font-bold text-dark">89</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-green-500 to-green-600 h-2.5 rounded-full shadow-sm"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral font-medium">Conversions</span>
            <span className="font-bold text-dark">23</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-purple-500 to-purple-600 h-2.5 rounded-full shadow-sm"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPerformance;
