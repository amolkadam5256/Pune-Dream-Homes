// App.jsx - Main Application Component with Load More
import React, { useState, useEffect } from "react";
import HeroBanner from "../../../components/PublicComp/buyHomePage/ReadytoMove/HeroBanner";
import FilterSection from "../../../components/PublicComp/buyHomePage/ReadytoMove/FilterSection";
import PropertyCard from "../../../components/PublicComp/buyHomePage/ReadytoMove/PropertyCard";
import PropertyDetails from "../../../components/PublicComp/buyHomePage/ReadytoMove/PropertyDetails";
import { properties } from "../../../constants/propertyData";
import { filterProperties, sortProperties } from "../../../utils/helpers";
import { ChevronUp } from "lucide-react";

const Ready_to_move = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    bhk: "all",
    budget: "all",
    furnishing: "all",
    search: "",
    sortBy: "newest",
    propertyType: "all",
    possession: "all",
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [displayCount, setDisplayCount] = useState(8); // Show 8 properties initially

  // Filter and sort properties
  const filteredProperties = sortProperties(
    filterProperties(properties, filters),
    filters.sortBy
  );

  // Get properties to display based on displayCount
  const propertiesToShow = filteredProperties.slice(0, displayCount);
  const hasMoreProperties = filteredProperties.length > displayCount;

  // Handle quick search from hero banner
  const handleQuickSearch = (searchTerm) => {
    setFilters({
      ...filters,
      search: searchTerm,
    });
    setDisplayCount(8); // Reset to 8 when searching
    // Scroll to results
    setTimeout(() => {
      const filterSection = document.getElementById("filter-section");
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Handle view property details
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle back to listings
  const handleBackToListings = () => {
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle load more
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 8); // Load 8 more properties
  };

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(8);
  }, [filters]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If property is selected, show details page
  if (selectedProperty) {
    return (
      <PropertyDetails
        property={selectedProperty}
        onBack={handleBackToListings}
      />
    );
  }

  // Main listings page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner onQuickSearch={handleQuickSearch} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div id="filter-section">
          <FilterSection
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredProperties.length}
          />
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length === 0
              ? "No properties found"
              : `${filteredProperties.length} ${
                  filteredProperties.length === 1 ? "Property" : "Properties"
                } Available`}
          </h2>
          {filters.search && (
            <p className="text-gray-600 mt-2">
              Showing results for "
              <span className="font-semibold">{filters.search}</span>"
            </p>
          )}
          {filteredProperties.length > 8 && (
            <p className="text-gray-500 text-sm mt-1">
              Showing {propertiesToShow.length} of {filteredProperties.length}{" "}
              properties
            </p>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
              {propertiesToShow.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreProperties && (
              <div className="text-center py-8">
                <button
                  onClick={handleLoadMore}
                  className="text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2 shadow-lg"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor =
                      "var(--color-primary-dark-1)";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "var(--color-primary)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Load More Properties
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    +{Math.min(8, filteredProperties.length - displayCount)}
                  </span>
                </button>
                <p className="text-gray-500 text-sm mt-3">
                  {filteredProperties.length - displayCount} more{" "}
                  {filteredProperties.length - displayCount === 1
                    ? "property"
                    : "properties"}{" "}
                  available
                </p>
              </div>
            )}

            {/* All Loaded Message */}
            {!hasMoreProperties && filteredProperties.length > 8 && (
              <div className="text-center py-8">
                <p className="text-gray-600 font-medium">
                  ✓ All properties loaded
                </p>
              </div>
            )}
          </>
        ) : (
          // No Results State
          <div className="text-center py-16">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary-lightest)" }}
            >
              <svg
                className="w-12 h-12"
                style={{ color: "var(--color-primary)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Properties Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any properties matching your criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setFilters({
                  bhk: "all",
                  budget: "all",
                  furnishing: "all",
                  search: "",
                  sortBy: "newest",
                  propertyType: "all",
                  possession: "all",
                });
                setDisplayCount(8);
              }}
              className="text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: "var(--color-primary)" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "var(--color-primary-dark-1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "var(--color-primary)")
              }
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ready_to_move;
