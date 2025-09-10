import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { 
  AiOutlineDashboard, 
  AiOutlineSchedule, 
  AiOutlineCheckCircle, 
  AiOutlineRobot, 
  AiOutlineBell, 
  AiOutlineSetting 
} from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const {logout} = useAuth()


  const notifications = [
    { id: 1, message: 'Mathematics class starts in 15 minutes', time: '10 min ago', read: false },
    { id: 2, message: 'Physics assignment due tomorrow', time: '30 min ago', read: false },
    { id: 3, message: 'Computer Science lab session cancelled', time: '1 hour ago', read: true },
  ];

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <AiOutlineDashboard size={20} /> },
    { to: '/dashboard/schedule', label: 'Class Schedule', icon: <AiOutlineSchedule size={20} /> },
    { to: '/dashboard/budgets', label: 'budgets Traker', icon: <AiOutlineSchedule size={20} /> },
    { to: '/dashboard/attendance', label: 'Attendance', icon: <AiOutlineCheckCircle size={20} /> },
    { to: '/dashboard/ai-planner', label: 'AI Study Planner', icon: <AiOutlineRobot size={20} /> },
    { to: '/dashboard/notifications', label: 'Notifications', icon: <AiOutlineBell size={20} /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <AiOutlineSetting size={20} /> },
  ];
 const logouthandler = () => {
  logout(); 
  toast.success("Logged out successfully!"); // show success message
};

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-blue-700">
          <h1 className="text-2xl font-bold text-white">EduTrack</h1>
          <p className="text-blue-200 text-sm mt-1">Student Dashboard</p>
        </div>

        <nav className="p-2 mt-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center w-full p-3 mb-2 rounded-lg transition-all duration-200 ${location.pathname === link.to ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-700 hover:text-white'}`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-blue-700/30 mx-3 rounded-lg hidden md:block">
          <p className="text-blue-200 text-sm mb-2">Weekly Stats</p>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-white font-bold text-lg">12</p>
              <p className="text-blue-200 text-xs">Classes</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">92%</p>
              <p className="text-blue-200 text-xs">Attendance</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">3</p>
              <p className="text-blue-200 text-xs">Assignments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden transition-transform duration-200"
            >
              ☰
            </button>
            <h2 className="text-lg font-semibold text-gray-800 ml-2">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative transition-colors"
              >
                <AiOutlineBell size={22} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl z-10 border border-gray-200 animate-fadeIn">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800 w-full text-center">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FaUserCircle size={28} className="text-blue-600" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200 animate-fadeIn">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">John Doe</p>
                    <p className="text-xs text-gray-500">Computer Science</p>
                  </div>
                  <div className="p-2 flex flex-col">
                    <Link to='/dashboard/profile' className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">👤 Profile</Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">⚙️ Settings</button>
                    <button onClick={logouthandler} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">🚪 Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 flex-1">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
