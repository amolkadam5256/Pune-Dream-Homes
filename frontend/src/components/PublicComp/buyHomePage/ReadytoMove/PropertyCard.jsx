// components/PropertyCard.jsx - Fixed with proper image display
import React, { useState } from "react";
import {
  Home,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Car,
  ChevronRight,
  Heart,
  Share2,
  Phone,
  Building2,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import {
  formatPrice,
  formatPricePerSqft,
  getStatusBadgeColor,
  getTransactionBadgeColor,
  shareProperty,
} from "../../../../utils/helpers";

const PropertyCard = ({ property, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images array
  const getPropertyImages = () => {
    if (!property.images) return [];
    // If it's already an array, return it
    if (Array.isArray(property.images)) return property.images;
    // If it's a single image, wrap in array
    return [property.images];
  };

  const propertyImages = getPropertyImages();
  const imageCount = propertyImages.length;
  const currentImage = propertyImages[currentImageIndex];

  // Handle next/previous image
  const handleNextImage = (e) => {
    e.stopPropagation();
    if (imageCount > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (imageCount > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    shareProperty(property);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleContact = (e) => {
    e.stopPropagation();
    alert(`Contact ${property.agentName}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
      onClick={() => onViewDetails(property)}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {currentImage ? (
          // Display the actual image
          <img
            src={currentImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              // If image fails to load, hide it and show fallback
              e.target.style.display = "none";
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = "flex";
              }
            }}
          />
        ) : null}

        {/* Fallback gradient background (shows if no image or image fails) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
            currentImage ? "hidden" : "flex"
          }`}
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark-2) 100%)",
          }}
        >
          <Building2 className="w-20 h-20 text-white opacity-30" />
        </div>

        {/* Image Navigation Arrows (only show if multiple images) */}
        {imageCount > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <span
            className={`${getStatusBadgeColor(
              property.status
            )} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm`}
          >
            <CheckCircle2 className="w-3 h-3" />
            {property.status}
          </span>
          {property.transaction === "New Property" && (
            <span
              className={`${getTransactionBadgeColor(
                property.transaction
              )} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm`}
            >
              New
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={handleLike}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className="bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Image Count */}
        {imageCount > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 backdrop-blur-sm">
            {imageCount > 1
              ? `${currentImageIndex + 1}/${imageCount}`
              : `${imageCount} Photo${imageCount !== 1 ? "s" : ""}`}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title & Location */}
        <h3
          className="text-xl font-bold text-gray-900 mb-1 transition-colors line-clamp-1"
          style={{
            color: "inherit",
          }}
          onMouseEnter={(e) => (e.target.style.color = "var(--color-primary)")}
          onMouseLeave={(e) => (e.target.style.color = "inherit")}
        >
          {property.bhk > 0 ? `${property.bhk} BHK | ` : ""}
          {property.title}
        </h3>
        <div className="flex items-center text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          {property.propertyType}
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="truncate">
            {property.location}, {property.area}
          </span>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
          {property.bhk > 0 && (
            <div className="flex items-center gap-2">
              <Bed
                className="w-4 h-4"
                style={{ color: "var(--color-primary)" }}
              />
              <span className="text-sm font-medium">{property.bhk} BHK</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-2">
              <Bath
                className="w-4 h-4"
                style={{ color: "var(--color-primary)" }}
              />
              <span className="text-sm font-medium">
                {property.bathrooms} Bath
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Maximize2
              className="w-4 h-4"
              style={{ color: "var(--color-primary)" }}
            />
            <span className="text-sm font-medium">
              {property.carpetArea || property.superArea} sqft
            </span>
          </div>
        </div>

        {/* Additional Info Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.furnishing && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "var(--color-primary-lightest)",
                color: "var(--color-primary)",
              }}
            >
              {property.furnishing}
            </span>
          )}
          {property.floor && property.floor !== "G" && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              Floor: {property.floor}
            </span>
          )}
          {property.facing && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              {property.facing} Facing
            </span>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </span>
            <span className="text-sm text-gray-500">
              {formatPricePerSqft(property.pricePerSqft)}
            </span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Listed by</p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {property.agentName}
            </p>
            {property.agentServed && (
              <p className="text-xs text-gray-500">
                {property.agentServed} Buyers Served
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500 ml-2">{property.postedTime}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(property);
            }}
            className="flex-1 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--color-primary-dark-1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--color-primary)")
            }
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleContact}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
