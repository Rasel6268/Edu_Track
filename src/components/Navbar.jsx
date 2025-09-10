import { useState, useEffect } from "react";
import {
  FaHome,
  FaBook,
  FaTasks,
  FaQuestion,
  FaWallet,
  FaSmile,
  FaUsers,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaBell,
  FaMoon,
  FaSun,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";

export default function PremiumNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(darkMode ? "Light mode enabled" : "Dark mode enabled");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    logout()
      .then(() => {
        navigate("/login");
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Logout error: " + error.message);
      });
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden lg:flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-900 to-purple-800 dark:from-gray-900 dark:to-gray-800 fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-2xl backdrop-blur-md bg-opacity-95 dark:bg-opacity-95"
            : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1
            className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            EduSphere
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1 mx-8">
          {[
            { path: "/", icon: FaHome, label: "Home" },
            { path: "/courses", icon: FaBook, label: "Courses" },
            { path: "/tasks", icon: FaTasks, label: "Tasks" },
            { path: "/community", icon: FaUsers, label: "Community" },
            { path: "/pricing", icon: FaWallet, label: "Pricing" },
            { path: "/about", icon: FaSmile, label: "About" },
            { path: "/faq", icon: FaQuestion, label: "FAQ" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActiveRoute(item.path)
                    ? "bg-indigo-700 text-white shadow-inner"
                    : "text-gray-300 hover:bg-indigo-800 hover:text-white"
                }`}
              >
                <Icon className="mr-2" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative group">
            <div className="flex items-center bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 rounded-full px-3 py-2 transition-all duration-300 group-hover:bg-opacity-70 group-focus-within:ring-2 group-focus-within:ring-cyan-500">
              <FaSearch className="text-gray-400 group-focus-within:text-cyan-400" />
              <input
                type="text"
                placeholder="Search courses, resources..."
                className="ml-2 bg-transparent border-none outline-none text-white placeholder-gray-400 w-40 transition-all duration-300 group-focus-within:w-52"
              />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-opacity-70"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
          </button>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-opacity-70">
            <FaBell />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white animate-pulse">
              3
            </span>
          </button>

          {/* Avatar Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none transition-transform duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg border-2 border-white border-opacity-20">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-lg" />
                  )}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-gray-800 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-lg rounded-xl shadow-2xl py-2 z-50 border border-gray-700 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email || "user@example.com"}
                    </p>
                  </div>

                  <a
                    
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    <FaUser className="mr-3 text-gray-400" />
                    <Link to='/dashboard/profile'>Profile</Link>
                  </a>
                  <a
                    href="/dashboard"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    <FaHome className="mr-3 text-gray-400" />
                    <span>Dashboard</span>
                  </a>
                  <a
                    href="/dashboard/group"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    <FaPlus className="mr-3 text-gray-400" />
                    <span>Create Group</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors"
                  >
                    <FaCog className="mr-3 text-gray-400" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <FaSignOutAlt className="mr-3 text-gray-400" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`lg:hidden bg-gradient-to-r from-indigo-900 to-purple-800 dark:from-gray-900 dark:to-gray-800 fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-2xl backdrop-blur-md bg-opacity-95 dark:bg-opacity-95"
            : ""
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex items-center">
            <div
              className="bg-gradient-to-br from-cyan-400 to-blue-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1
              className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate("/")}
            >
              EduSphere
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="w-9 h-9 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="px-5 pb-5 bg-indigo-900 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-lg">
            {/* User Info */}
            {user && (
              <div className="bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 rounded-xl p-4 mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <FaUser className="text-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="#profile"
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <FaUser className="mr-2" size={12} />
                    <span>Profile</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <FaCog className="mr-2" size={12} />
                    <span>Settings</span>
                  </a>
                  <a
                    href="/dashboard/group"
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <FaPlus className="mr-2" size={12} />
                    <span>Create Group</span>
                  </a>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <FaSignOutAlt className="mr-2" size={12} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-2">
              {[
                { path: "/", icon: FaHome, label: "Home" },
                { path: "/courses", icon: FaBook, label: "Courses" },
                { path: "/tasks", icon: FaTasks, label: "Tasks" },
                { path: "/community", icon: FaUsers, label: "Community" },
                { path: "/pricing", icon: FaWallet, label: "Pricing" },
                { path: "/about", icon: FaSmile, label: "About" },
                { path: "/faq", icon: FaQuestion, label: "FAQ" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActiveRoute(item.path)
                        ? "bg-indigo-700 text-white"
                        : "text-gray-300 hover:bg-indigo-800 hover:text-white"
                    }`}
                  >
                    <Icon className="mr-3" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Auth Buttons for non-logged in users */}
            {!user && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-colors text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Add padding to content below navbar */}
      <div className="h-24 lg:h-20"></div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}