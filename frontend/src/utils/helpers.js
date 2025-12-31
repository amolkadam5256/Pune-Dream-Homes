// utils/helpers.js - Utility Helper Functions

/**
 * Format price in Indian currency format
 * @param {number} price - Price in rupees
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lac`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(2)}K`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
};

/**
 * Format price per sqft
 * @param {number} pricePerSqft
 * @returns {string}
 */
export const formatPricePerSqft = (pricePerSqft) => {
  return `₹${pricePerSqft.toLocaleString("en-IN")}/sqft`;
};

/**
 * Format area in sqft
 * @param {number} area
 * @returns {string}
 */
export const formatArea = (area) => {
  return `${area.toLocaleString("en-IN")} sqft`;
};

/**
 * Filter properties based on search criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} filters - Filter object
 * @returns {Array} - Filtered properties
 */
export const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    // BHK Filter
    if (filters.bhk && filters.bhk !== "all") {
      if (property.bhk !== parseInt(filters.bhk)) return false;
    }

    // Budget Filter
    if (filters.budget && filters.budget !== "all") {
      const portions = filters.budget.split("-").map(Number);
      const min = portions[0];
      const max = portions[1];
      if (property.price < min) return false;
      if (max && property.price > max) return false;
    }

    // Status Filter
    if (filters.status && filters.status !== "all") {
      if (property.status !== filters.status) return false;
    }

    // Agent Type Filter (for Owner Properties)
    if (filters.agentType && filters.agentType !== "all") {
      if (property.agentType !== filters.agentType) return false;
    }

    // Possession Filter
    if (filters.possession && filters.possession !== "all") {
      // Simplified mapping for the filter options in FilterSection
      const status = property.status.toLowerCase();
      if (filters.possession === "immediate" && status !== "ready to move")
        return false;
      if (filters.possession.includes("months") && status === "ready to move")
        return false;
    }

    // Furnishing Filter
    if (filters.furnishing && filters.furnishing !== "all") {
      if (property.furnishing !== filters.furnishing) return false;
    }

    // Owner Search (By Name)
    if (filters.ownerName && filters.ownerName.trim() !== "") {
      const ownerQuery = filters.ownerName.toLowerCase();
      if (
        !property.agentName ||
        !property.agentName.toLowerCase().includes(ownerQuery)
      ) {
        return false;
      }
    }

    // Search Filter (location, title, area)
    if (filters.search && filters.search.trim() !== "") {
      const searchTerm = filters.search.toLowerCase();
      const matchesLocation = (property.location || "")
        .toLowerCase()
        .includes(searchTerm);
      const matchesTitle = (property.title || "")
        .toLowerCase()
        .includes(searchTerm);
      const matchesArea = (property.area || "")
        .toLowerCase()
        .includes(searchTerm);

      if (!matchesLocation && !matchesTitle && !matchesArea) return false;
    }

    // Property Type Filter
    if (filters.propertyType && filters.propertyType !== "all") {
      const selectedType = filters.propertyType.toLowerCase();
      const propertyType = (property.propertyType || "").toLowerCase();

      // Check for category matches or specific matches
      const matchesCategory =
        (selectedType === "flat" &&
          (propertyType.includes("flat") ||
            propertyType.includes("apartment"))) ||
        (selectedType === "house" &&
          (propertyType.includes("house") ||
            propertyType.includes("villa") ||
            propertyType.includes("bungalow"))) ||
        (selectedType === "plot" &&
          (propertyType.includes("plot") || propertyType.includes("land"))) ||
        (selectedType === "office" && propertyType.includes("office")) ||
        (selectedType === "commercial" &&
          (propertyType.includes("commercial") ||
            propertyType.includes("shop") ||
            propertyType.includes("showroom")));

      const matchesSpecific = propertyType.includes(selectedType);

      if (!matchesCategory && !matchesSpecific) return false;
    }

    return true;
  });
};

/**
 * Sort properties
 * @param {Array} properties
 * @param {string} sortBy - 'price-low', 'price-high', 'area-low', 'area-high', 'newest'
 * @returns {Array}
 */
export const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "area-low":
      return sorted.sort(
        (a, b) => (a.carpetArea || a.superArea) - (b.carpetArea || b.superArea)
      );
    case "area-high":
      return sorted.sort(
        (a, b) => (b.carpetArea || b.superArea) - (a.carpetArea || a.superArea)
      );
    case "newest":
      return sorted; // Already sorted by posting time in data
    default:
      return sorted;
  }
};

/**
 * Get property type label
 * @param {Object} property
 * @returns {string}
 */
export const getPropertyTypeLabel = (property) => {
  return `${property.bhk} BHK ${property.furnishing}`;
};

/**
 * Get time ago string
 * @param {string} postedTime
 * @returns {string}
 */
export const getTimeAgo = (postedTime) => {
  // Simple implementation - can be enhanced
  return postedTime;
};

/**
 * Truncate text
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Generate property URL slug
 * @param {Object} property
 * @returns {string}
 */
export const generateSlug = (property) => {
  const title = property.title.toLowerCase().replace(/\s+/g, "-");
  const location = property.location.toLowerCase().replace(/\s+/g, "-");
  return `${title}-${location}-${property.id}`;
};

/**
 * Check if property is new
 * @param {string} postedTime
 * @returns {boolean}
 */
export const isNewProperty = (postedTime) => {
  const hourMatch = postedTime.match(/(\d+)\s*hour/i);
  if (hourMatch) {
    const hours = parseInt(hourMatch[1]);
    return hours <= 24;
  }
  return false;
};

/**
 * Get badge color based on status
 * @param {string} status
 * @returns {string}
 */
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Ready to Move":
      return "bg-green-100 text-green-700";
    case "Under Construction":
      return "bg-yellow-100 text-yellow-700";
    case "New Launch":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

/**
 * Get transaction badge color
 * @param {string} transaction
 * @returns {string}
 */
export const getTransactionBadgeColor = (transaction) => {
  switch (transaction) {
    case "New Property":
      return "bg-blue-100 text-blue-700";
    case "Resale":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

/**
 * Calculate EMI (approximate)
 * @param {number} principal - Loan amount
 * @param {number} rate - Annual interest rate (in percentage)
 * @param {number} tenure - Loan tenure in years
 * @returns {number}
 */
export const calculateEMI = (principal, rate = 8.5, tenure = 20) => {
  const monthlyRate = rate / (12 * 100);
  const months = tenure * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};

/**
 * Share property
 * @param {Object} property
 */
export const shareProperty = (property) => {
  const url = `${window.location.origin}/property/${generateSlug(property)}`;
  const text = `Check out this ${property.bhk} BHK in ${property.location}, ${
    property.area
  } for ${formatPrice(property.price)}`;

  if (navigator.share) {
    navigator
      .share({
        title: property.title,
        text: text,
        url: url,
      })
      .catch((err) => console.log("Error sharing:", err));
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }
};

/**
 * Get property highlights
 * @param {Object} property
 * @returns {Array}
 */
export const getPropertyHighlights = (property) => {
  const highlights = [];

  if (property.facing.includes("East")) {
    highlights.push("East Facing");
  }
  if (property.parking.includes("2")) {
    highlights.push("2 Parking");
  }
  if (property.furnishing === "Furnished") {
    highlights.push("Fully Furnished");
  }
  if (property.amenities.includes("Air Conditioned")) {
    highlights.push("AC Available");
  }
  if (property.balconies >= 2) {
    highlights.push(`${property.balconies} Balconies`);
  }

  return highlights;
};
