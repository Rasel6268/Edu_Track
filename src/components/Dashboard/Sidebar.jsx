import { useState } from 'react';
import { FaHome, FaThLarge, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from 'react-router';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/dashboard', name: 'Dashboard', icon: <FaThLarge /> },
    { path: '/calendar', name: 'Calendar', icon: <FaCalendarAlt /> },
    { path: '/profile', name: 'Profile', icon: <FaUser /> },
  ];

  return (
    <aside className={`bg-gray-800 text-white h-screen ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300 fixed lg:relative z-50`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Brand Name</h1>}
        <button onClick={toggleSidebar} className="lg:hidden">
          {/* Hamburger icon */}
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="flex items-center p-4 hover:bg-gray-700">
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;