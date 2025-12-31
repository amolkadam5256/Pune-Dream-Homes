// pages/public/buy/BuyPage.jsx
import React, { useState, useEffect } from "react";
import HeroBanner from "../../../components/PublicComp/buyHomePage/ReadytoMove/HeroBanner";
import FilterSection from "../../../components/PublicComp/buyHomePage/ReadytoMove/FilterSection";
import PropertyCard from "../../../components/PublicComp/buyHomePage/ReadytoMove/PropertyCard";
import PropertyDetails from "../../../components/PublicComp/buyHomePage/ReadytoMove/PropertyDetails";
import { properties } from "../../../constants/propertyData";
import { filterProperties, sortProperties } from "../../../utils/helpers";

const BuyPage = ({ initialFilters = {}, title = "Properties" }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    bhk: "all",
    budget: "all",
    furnishing: "all",
    search: "",
    sortBy: "newest",
    propertyType: "all",
    possession: "all",
    status: "all",
    agentType: "all",
    ownerName: "", // New field for filtering by owner name
    ...initialFilters,
  });
  const [displayCount, setDisplayCount] = useState(8);

  // Filter and sort properties
  const filteredProperties = sortProperties(
    filterProperties(properties, filters),
    filters.sortBy
  );

  const propertiesToShow = filteredProperties.slice(0, displayCount);
  const hasMoreProperties = filteredProperties.length > displayCount;

  const handleQuickSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
    setDisplayCount(8);
    // When searching, find the section to scroll to
    const filterEl = document.getElementById("filter-section");
    if (filterEl) {
      filterEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToListings = () => {
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => setDisplayCount((prev) => prev + 8);

  useEffect(() => {
    setDisplayCount(8);
    // If initialFilters change (e.g. navigation between different buy pages), update filters
    setFilters((prev) => ({
      ...prev,
      ...initialFilters,
    }));
  }, [initialFilters]);

  if (selectedProperty) {
    return (
      <PropertyDetails
        property={selectedProperty}
        onBack={handleBackToListings}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBanner onQuickSearch={handleQuickSearch} />
      <div className="container mx-auto px-4 py-8">
        <div id="filter-section">
          <FilterSection
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredProperties.length}
          />
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length === 0
                ? "No properties found"
                : `${filteredProperties.length} ${title} Available`}
            </h2>
            {(filters.search ||
              (filters.ownerName && filters.ownerName !== "")) && (
              <p className="text-gray-600 mt-2">
                Showing results for{" "}
                {filters.search && `Location/Term: "${filters.search}"`}
                {filters.search && filters.ownerName && " and "}
                {filters.ownerName && `Owner: "${filters.ownerName}"`}
              </p>
            )}
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {propertiesToShow.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {hasMoreProperties && (
              <div className="text-center py-8">
                <button
                  onClick={handleLoadMore}
                  className="text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 shadow-lg hover:scale-105"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Load More Properties
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    +{Math.min(8, filteredProperties.length - displayCount)}
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Properties Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find what you're
              looking for.
            </p>
            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  bhk: "all",
                  budget: "all",
                  search: "",
                  ownerName: "",
                  propertyType: "all",
                  furnishing: "all",
                  possession: "all",
                })
              }
              className="text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
