// components/FilterSection.jsx
import React, { useState } from "react";
import { Filter, Search, X, SlidersHorizontal, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  bhkOptions,
  budgetOptions,
  furnishingOptions,
  propertyTypeOptions,
} from "../../../../constants/propertyData";

const FilterSection = ({ filters, onFilterChange, resultCount }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      bhk: "all",
      budget: "all",
      furnishing: "all",
      search: "",
      sortBy: "newest",
      ownerName: "",
      propertyType: "all",
      possession: "all",
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.bhk !== "all" ||
      filters.budget !== "all" ||
      filters.furnishing !== "all" ||
      filters.search !== "" ||
      (filters.ownerName && filters.ownerName !== "") ||
      filters.propertyType !== "all" ||
      filters.possession !== "all"
    );
  };

  const isOwnerPage = filters.agentType === "Owner";

  return (
    <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden border border-gray-100">
      {/* Header & Search Bar Section */}
      <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-(--color-primary-lightest) rounded-lg">
              <Filter
                className="w-5 h-5"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Search & Filter
              </h2>
              {resultCount !== undefined && (
                <span className="text-xs md:text-sm text-gray-500 font-medium">
                  {resultCount} {resultCount === 1 ? "property" : "properties"}{" "}
                  found
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {hasActiveFilters() && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            )}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95"
              style={{
                backgroundColor: showAdvancedFilters
                  ? "var(--color-primary)"
                  : "white",
                color: showAdvancedFilters ? "white" : "var(--color-primary)",
                border: showAdvancedFilters
                  ? "none"
                  : "1px solid var(--color-primary-light)",
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showAdvancedFilters ? "Hide" : "More"} Filters
            </button>
          </div>
        </div>

        {/* Search Inputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-(--color-primary) transition-colors" />
            <input
              type="text"
              placeholder="Search by location, property, or area..."
              value={filters.search}
              onChange={(e) => handleInputChange("search", e.target.value)}
              className="w-full pl-12 pr-10 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm shadow-sm"
            />
            {filters.search && (
              <button
                onClick={() => handleInputChange("search", "")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {isOwnerPage ? (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-(--color-primary) transition-colors" />
              <input
                type="text"
                placeholder="Search by Owner Name..."
                value={filters.ownerName || ""}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                className="w-full pl-12 pr-10 py-3 md:py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm shadow-sm"
              />
              {filters.ownerName && (
                <button
                  onClick={() => handleInputChange("ownerName", "")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center px-4 py-3 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-600">
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Try adding more filters for precise matches in Pune
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Basic Filters Grid */}
      <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">
            Property Type
          </label>
          <select
            value={filters.propertyType || "all"}
            onChange={(e) => handleInputChange("propertyType", e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm font-semibold text-gray-700 shadow-sm cursor-pointer appearance-none"
          >
            <option value="all">🏢 All Property Types</option>
            {propertyTypeOptions.map((group) => (
              <optgroup
                key={group.label}
                label={group.label}
                className="font-bold"
              >
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">
            Budget Range
          </label>
          <select
            value={filters.budget}
            onChange={(e) => handleInputChange("budget", e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm font-semibold text-gray-700 shadow-sm cursor-pointer"
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                💰 {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || "newest"}
            onChange={(e) => handleInputChange("sortBy", e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm font-semibold text-gray-700 shadow-sm cursor-pointer"
          >
            <option value="newest">🆕 Newest First</option>
            <option value="price-low">📉 Price: Low to High</option>
            <option value="price-high">📈 Price: High to Low</option>
            <option value="area-low">📐 Area: Low to High</option>
            <option value="area-high">🗺️ Area: High to Low</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Section */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gray-50/50 border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Furnishing Filter */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">
                  Furnishing
                </label>
                <select
                  value={filters.furnishing}
                  onChange={(e) =>
                    handleInputChange("furnishing", e.target.value)
                  }
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm font-semibold text-gray-700 shadow-sm"
                >
                  {furnishingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      🛋️ {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* BHK Filter */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">
                  BHK Configuration
                </label>
                <select
                  value={filters.bhk}
                  onChange={(e) => handleInputChange("bhk", e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm font-semibold text-gray-700 shadow-sm"
                >
                  {bhkOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      🏠 {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Possession Status */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-500 ml-1">
                  Possession
                </label>
                <select
                  value={filters.possession || "all"}
                  onChange={(e) =>
                    handleInputChange("possession", e.target.value)
                  }
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary-light) focus:border-(--color-primary) transition-all text-sm font-semibold text-gray-700 shadow-sm"
                >
                  <option value="all">📅 All Possession</option>
                  <option value="immediate">⚡ Immediate</option>
                  <option value="within-3-months">🕒 Within 3 Months</option>
                  <option value="within-6-months">📅 Within 6 Months</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters() && (
              <div className="px-4 md:px-6 pb-6 pt-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">
                    Active:
                  </span>
                  {filters.ownerName && (
                    <Badge
                      label={`Owner: ${filters.ownerName}`}
                      onClear={() => handleInputChange("ownerName", "")}
                    />
                  )}
                  {filters.propertyType !== "all" && (
                    <Badge
                      label={filters.propertyType}
                      onClear={() => handleInputChange("propertyType", "all")}
                    />
                  )}
                  {filters.bhk !== "all" && (
                    <Badge
                      label={`${filters.bhk} BHK`}
                      onClear={() => handleInputChange("bhk", "all")}
                    />
                  )}
                  {filters.budget !== "all" && (
                    <Badge
                      label={
                        budgetOptions.find((o) => o.value === filters.budget)
                          ?.label
                      }
                      onClear={() => handleInputChange("budget", "all")}
                    />
                  )}
                  {filters.furnishing !== "all" && (
                    <Badge
                      label={filters.furnishing}
                      onClear={() => handleInputChange("furnishing", "all")}
                    />
                  )}
                  {filters.search && (
                    <Badge
                      label={`"${filters.search}"`}
                      onClear={() => handleInputChange("search", "")}
                    />
                  )}
                  {filters.possession !== "all" && (
                    <Badge
                      label={`Possession: ${filters.possession}`}
                      onClear={() => handleInputChange("possession", "all")}
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Badge Component
const Badge = ({ label, onClear }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-(--color-primary-lightest) text-(--color-primary) group transition-all hover:bg-(--color-primary) hover:text-white cursor-default shadow-sm border border-(--color-primary-light)/20">
    {label}
    <button
      onClick={onClear}
      className="hover:scale-110 active:scale-90 transition-transform"
    >
      <X className="w-3.5 h-3.5" />
    </button>
  </span>
);

export default FilterSection;
