// components/PropertyDetails.jsx
import React, { useState } from "react";
import {
  ChevronRight,
  MapPin,
  Heart,
  Share2,
  Phone,
  Building2,
  Bed,
  Bath,
  Maximize2,
  Car,
  Home,
  CheckCircle2,
  Calendar,
  Mail,
  User,
  MessageSquare,
  Download,
  ChevronLeft,
} from "lucide-react";
import {
  formatPrice,
  formatPricePerSqft,
  shareProperty,
  calculateEMI,
} from "../../../../utils/helpers";

const PropertyDetails = ({ property, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Get images array
  const getPropertyImages = () => {
    if (!property.images) return [];
    if (Array.isArray(property.images)) return property.images;
    return [property.images];
  };

  const propertyImages = getPropertyImages();
  const imageCount = propertyImages.length;
  const currentImage = propertyImages[currentImageIndex];
  const shouldShowImage = currentImage && !imageError;

  // Handle image navigation
  const handleNextImage = () => {
    if (imageCount > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
      setImageError(false);
    }
  };

  const handlePrevImage = () => {
    if (imageCount > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
      setImageError(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleShare = () => {
    shareProperty(property);
  };

  const handleContact = () => {
    alert(`Contact ${property.agentName} at phone`);
  };

  const emi = calculateEMI(property.price * 0.8); // 80% loan

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      {onBack && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Properties</span>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="rounded-2xl h-96 mb-8 relative overflow-hidden shadow-lg bg-gray-100">
          {shouldShowImage ? (
            <img
              src={currentImage}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark-2) 100%)",
              }}
            >
              <Building2 className="w-32 h-32 text-white opacity-30" />
            </div>
          )}

          {/* Image Navigation Arrows */}
          {imageCount > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="font-semibold">
              {imageCount > 0
                ? `${currentImageIndex + 1} / ${imageCount} Photos`
                : "No Photos Available"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={handleShare}
              className="p-3 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-3 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {property.bhk} BHK in {property.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin
                    className="w-5 h-5 mr-2"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span className="text-lg">
                    {property.location}, {property.area}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                  <span className="text-lg text-gray-500">
                    {formatPricePerSqft(property.pricePerSqft)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    {property.status}
                  </span>
                  <span
                    className="px-4 py-2 rounded-lg font-semibold"
                    style={{
                      backgroundColor: "var(--color-primary-lightest)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {property.transaction}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">
                    {property.ownership}
                  </span>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    About Property
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              )}
            </div>

            {/* Property Details Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Property Details
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Bedrooms */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Bed
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bedrooms</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.bhk} BHK
                    </p>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Bath
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bathrooms</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>

                {/* Carpet Area */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Maximize2
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {property.carpetArea ? "Carpet Area" : "Super Area"}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.carpetArea || property.superArea} sqft
                    </p>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Car
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Parking</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.parking}
                    </p>
                  </div>
                </div>

                {/* Floor */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Building2
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Floor</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.floor}
                    </p>
                  </div>
                </div>

                {/* Balconies */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Home
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Balconies</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.balconies}
                    </p>
                  </div>
                </div>

                {/* Facing */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Facing</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.facing}
                    </p>
                  </div>
                </div>

                {/* Furnishing */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Building2
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Furnishing</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.furnishing}
                    </p>
                  </div>
                </div>

                {/* Overlooking */}
                <div className="flex items-start gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary-lightest)" }}
                  >
                    <Home
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Overlooking</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.overlooking}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMI Calculator */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                EMI Calculator
              </h2>
              <p className="text-gray-600 mb-4">
                Estimated monthly EMI for this property
              </p>
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: "var(--color-primary-lightest)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {formatPrice(emi)}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  *Based on 80% loan amount at 8.5% interest for 20 years
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Agent
              </h3>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {property.agentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {property.agentName}
                    </p>
                    {property.agentServed && (
                      <p className="text-sm text-gray-500">
                        {property.agentServed} Buyers Served
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Posted {property.postedTime}
                </p>
              </div>

              <button
                onClick={handleContact}
                className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <Phone className="w-5 h-5" />
                Get Phone Number
              </button>

              <button
                className="w-full text-white py-4 rounded-lg font-semibold transition-colors mb-3"
                style={{ backgroundColor: "var(--color-primary)" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor =
                    "var(--color-primary-dark-1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "var(--color-primary)")
                }
                onClick={() => setShowContactForm(!showContactForm)}
              >
                {showContactForm ? "Hide Form" : "Send Message"}
              </button>

              {showContactForm && (
                <div className="space-y-3 pt-4 border-t border-gray-100 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                    style={{ focusBorderColor: "var(--color-primary)" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-primary)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-primary)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-primary)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-primary)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                  ></textarea>
                  <button
                    className="w-full text-white py-3 rounded-lg font-semibold transition-colors"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        "var(--color-primary-dark-1)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--color-primary)")
                    }
                  >
                    Send Inquiry
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  Share this property
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex-1 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600 mx-auto" />
                  </button>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex-1 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 mx-auto ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button className="flex-1 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-5 h-5 text-gray-600 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
