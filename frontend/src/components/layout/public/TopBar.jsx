import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import images from "../../../assets/images/images";
import { useAuth } from "../../../context/AuthContext";

const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-(--color-primary)" : "bg-(--color-primary)/95"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-1 min-w-0">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img
                src={images.logo}
                alt="DomainName"
                className="h-8 sm:h-10 object-contain brightness-0 invert"
              />
            </Link>
          </div>

          {/* RIGHT SECTION - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            {/* PDH Prime */}
            <Link
              to="/mb-prime"
              className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors text-xs font-medium"
            >
              <FaCrown className="shrink-0" />
              <span className="whitespace-nowrap">PDH Prime</span>
            </Link>

            {/* Desktop Login/Profile */}
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    switch (user.role?.toUpperCase()) {
                      case "ADMIN":
                        navigate("/admin/admin-dashboard");
                        break;
                      case "CUSTOMER":
                        navigate("/customer/customer-dashboard");
                        break;
                      case "BUILDER":
                        navigate("/builder/dashboard");
                        break;
                      default:
                        navigate("/customer/customer-dashboard");
                    }
                  }}
                  className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors text-xs font-medium"
                >
                  <FaUser className="shrink-0" />
                  <span className="whitespace-nowrap">
                    Hi,{" "}
                    {user?.firstName?.split(" ")[0] ||
                      user?.name?.split(" ")[0] ||
                      user?.email ||
                      "User"}
                  </span>
                </button>
                <button
                  onClick={() => logout()}
                  className="text-white hover:text-yellow-300 text-xs font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors text-xs font-medium"
              >
                <FaUser className="shrink-0" />
                <span className="whitespace-nowrap">Login</span>
              </Link>
            )}

            {/* Post Property */}
            <Link
              to="/post-property"
              className="bg-white text-(--color-primary) font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-(--color-primary) transition-all whitespace-nowrap text-xs shadow-md"
            >
              Post Property FREE
            </Link>
          </div>

          {/* MOBILE/TABLET RIGHT SECTION */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Post Property */}
            <Link
              to="/post-property"
              className="bg-white text-[var(--color-primary)] font-bold px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-xs rounded-lg hover:bg-yellow-300 transition-all whitespace-nowrap shadow-md shrink-0"
            >
              Post FREE
            </Link>

            {/* Mobile Menu Toggle (Moved to Right) */}
            <button
              className="lg:hidden text-white p-1 hover:bg-white/10 rounded transition-colors shrink-0 ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl rounded-lg mt-3 p-4">
            <div className="space-y-3">
              {/* MB Prime Mobile */}
              <Link
                to="/mb-prime"
                className="flex items-center gap-3 text-gray-800 hover:text-[var(--color-primary)] hover:bg-blue-50 py-2.5 px-3 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaCrown className="text-lg shrink-0" />
                <span className="font-semibold text-xs">MB Prime</span>
              </Link>

              {/* Mobile Menu Login/Profile */}
              {user ? (
                <>
                  <button
                    onClick={() => {
                      switch (user.role?.toUpperCase()) {
                        case "ADMIN":
                          navigate("/admin/admin-dashboard");
                          break;
                        case "CUSTOMER":
                          navigate("/customer/customer-dashboard");
                          break;
                        case "BUILDER":
                          navigate("/builder/dashboard");
                          break;
                        default:
                          navigate("/customer/customer-dashboard");
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-800 hover:text-[var(--color-primary)] hover:bg-blue-50 py-2.5 px-3 rounded-lg transition-colors w-full text-left"
                  >
                    <FaUser className="text-lg shrink-0" />
                    <span className="font-semibold text-xs">
                      My Profile (
                      {user?.firstName?.split(" ")[0] ||
                        user?.name?.split(" ")[0] ||
                        user?.email ||
                        "User"}
                      )
                    </span>
                  </button>

                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full text-left text-gray-800 hover:text-(--color-primary) hover:bg-blue-50 py-2.5 px-3 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-lg shrink-0" />
                    <span className="font-semibold text-xs">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex items-center gap-3 text-gray-800 hover:text-[var(--color-primary)] hover:bg-blue-50 py-2.5 px-3 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser className="text-lg shrink-0" />
                  <span className="font-semibold text-xs">Login / Signup</span>
                </Link>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-bold text-gray-800 text-xs mb-2 px-3">
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/buy"
                    className="text-gray-700 hover:text-(--color-primary) hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Buy
                  </Link>
                  <Link
                    to="/rent"
                    className="text-gray-700 hover:text-(--color-primary) hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Rent
                  </Link>
                  <Link
                    to="/commercial"
                    className="text-gray-700 hover:text-(--color-primary) hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Commercial
                  </Link>
                  <Link
                    to="/projects"
                    className="text-gray-700 hover:text-(--color-primary) hover:bg-blue-50 text-xs p-3 bg-gray-50 rounded-lg transition-colors text-center font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
