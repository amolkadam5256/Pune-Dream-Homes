import React from "react";
import { Search, Bell } from "lucide-react";

const TopHeader = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-40 sticky top-0">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search properties, users, or anything..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent border-2 rounded-xl focus:bg-white focus:outline-none focus:ring-0 focus:border-blue-100 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 hover:bg-gray-50 rounded-xl transition-colors group">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
