import React, { useState } from "react";
import {
  Building2,
  Home,
  Key,
  TrendingUp,
  Users,
  Settings,
  X,
  ChevronDown,
  LogOut,
  FileText,
  BarChart3,
  Plus,
  Menu,
  MessageSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeMenu,
  setActiveMenu,
}) => {
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth(); // Access auth context

  const menuItems = [
    // ... items (keep existing)
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/admin/admin-dashboard",
    },
    {
      id: "properties",
      label: "Properties",
      icon: Building2,
      hasSubmenu: true,
      submenu: [
        {
          id: "all-properties",
          label: "All Properties",
          path: "/admin/properties/all",
        },
        { id: "buy", label: "Buy Properties", path: "/admin/properties/buy" },
        {
          id: "rent",
          label: "Rent Properties",
          path: "/admin/properties/rent",
        },
        { id: "sell", label: "Sell Listings", path: "/admin/properties/sell" },
      ],
    },
    {
      id: "add-property",
      label: "Add Property",
      icon: Plus,
      path: "/admin/properties/add",
      highlight: true,
    },
    {
      id: "inquiries",
      label: "Inquiries",
      icon: MessageSquare,
      badge: null,
      path: "/admin/inquiries",
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      path: "/admin/users",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    // Optional: Add confirmation later if needed, but requirements just say "click logut it logout users"
    logout();
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {sidebarOpen && (
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-1">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-dark leading-tight">
              Admin Panel
            </span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-8rem)] scrollbar-hide">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.hasSubmenu ? (
              <div
                onClick={() => {
                  setActiveMenu(item.id);
                  if (item.hasSubmenu) {
                    setPropertiesExpanded(!propertiesExpanded);
                  }
                }}
                className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id
                    ? "bg-primary-lightest/50 text-primary"
                    : "text-neutral hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                {sidebarOpen && (
                  <>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        propertiesExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id || location.pathname === item.path
                    ? "bg-primary-lightest/50 text-primary"
                    : "text-neutral hover:bg-gray-50"
                } ${
                  item.highlight
                    ? "bg-linear-to-r from-primary to-primary-dark-1 text-white hover:from-primary-dark-1 hover:to-primary-dark-2 shadow-md"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-5 h-5 ${item.highlight ? "text-white" : ""}`}
                  />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                {sidebarOpen && item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}

            {/* Submenu */}
            {item.hasSubmenu && sidebarOpen && propertiesExpanded && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-2">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.id}
                    to={subitem.path}
                    onClick={() => setActiveMenu(subitem.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeMenu === subitem.id ||
                      location.pathname === subitem.path
                        ? "bg-primary-lightest/30 text-primary font-medium"
                        : "text-neutral hover:bg-gray-50"
                    }`}
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-primary-light-1 flex items-center justify-center text-white font-bold shadow-sm">
            {user?.firstName ? user.firstName[0].toUpperCase() : "A"}
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-neutral truncate">{user?.email}</p>
            </div>
          )}
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white rounded-lg transition-colors text-neutral hover:text-red-500 hover:shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
