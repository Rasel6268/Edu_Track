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
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function PremiumNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const {user,logout} = useAuth()
   const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  
  const logoutHandler = () => {
  logout()
    .then(() => {
      navigate("/login");
      toast.success("User logged out successfully");
    })
    .catch((error) => {
      toast.error("Logout error:", error.message);
    });
};

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-900 to-purple-800 dark:from-gray-900 dark:to-gray-800 sticky z-50">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            EduSphere
          </h1>
        </div>

      

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="flex items-center bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 rounded-full px-3 py-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent border-none outline-none text-white placeholder-gray-400 w-40"
              />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
            <FaBell />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </button>

          {/* Avatar Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg border-2 border-white border-opacity-20">
                  <FaUser className="text-white text-lg" />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-gray-800 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl py-2 z-50 border border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-gray-400">john@example.com</p>
                  </div>

                  <a
                    href="#profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <FaUser className="mr-3 text-gray-400" />
                    <span>Profile</span>
                  </a>
                  <a
                    href="#dashboard"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <FaHome className="mr-3 text-gray-400" />
                    <span>Dashboard</span>
                  </a>
                  <a
                    href="/dashboard/group"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <FaPlus className="mr-3 text-gray-400" />
                    <span>Create Group</span>
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <FaCog className="mr-3 text-gray-400" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <a
                    
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <FaSignOutAlt className="mr-3 text-gray-400" />
                   <button onClick={logoutHandler}>Sign out</button>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <a
                href="/login"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-gradient-to-r from-indigo-900 to-purple-800 dark:from-gray-900 dark:to-gray-800 shadow-2xl rounded-xl mx-4 mt-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              EduSphere
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="w-9 h-9 rounded-full bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <span className="text-xl">✕</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="px-5 pb-5">
            <div className="bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 rounded-xl p-4 mb-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                  <FaUser className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
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
                <a
                  className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <FaSignOutAlt className="mr-2" size={12} />
                  <button onClick={logoutHandler}>Sign out</button>
                </a>
              </div>
            </div>

            
          </div>
        )}
      </nav>

     
    </>
  );
}
