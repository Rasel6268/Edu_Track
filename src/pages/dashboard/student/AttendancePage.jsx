import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import {
  FiCalendar,
  FiCheck,
  FiX,
  FiUser,
  FiBook,
  FiFilter,
  FiSearch,
  FiDownload,
  FiPrinter,
  FiBarChart2,
  FiClock,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiEdit,
  FiTrendingUp,
  FiTrendingDown,
  FiAlertCircle,
} from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import CalendarView from "../../../components/CalendarView";
import Loader from "../../../components/loader";

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("daily");
  const [filterSubject, setFilterSubject] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  });
  const [showNotification, setShowNotification] = useState(false);
  const API_URL = "http://localhost:3001";
  const { user } = useAuth();

  const [classSchedules, setClassSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const subjects = [
    ...new Set(classSchedules.map((subject) => subject.subject)),
  ];

  // Fetch attendance data
  const fetchAttendance = async () => {
    if (!user?.email) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/schedule/${user.email}`);
      setClassSchedules(res.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchAttendance();
    }
  }, [user?.email]);

  // Calculate attendance statistics
  const attendanceStats = useMemo(() => {
    const total = classSchedules.length;
    const present = classSchedules.filter(
      (cls) => cls.attendance === "present"
    ).length;
    const absent = classSchedules.filter(
      (cls) => cls.attendance === "absent"
    ).length;
    const late = classSchedules.filter(
      (cls) => cls.attendance === "late"
    ).length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, late, percentage };
  }, [classSchedules]);

  // Check for low attendance and show notification
  useEffect(() => {
    if (attendanceStats.percentage < 75) {
      setShowNotification(true);
      // Auto-hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [attendanceStats.percentage]);

  // Filter classes based on selected filters
  const filteredClasses = useMemo(() => {
    return classSchedules.filter((cls) => {
      const classDate = new Date(cls.date);
      const matchesDateRange =
        classDate >= dateRange.start && classDate <= dateRange.end;
      const matchesSubject =
        filterSubject === "all" || cls.subject === filterSubject;
      const matchesSearch =
        cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.room.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDateRange && matchesSubject && matchesSearch;
    });
  }, [classSchedules, filterSubject, searchTerm, dateRange]);

  // Calculate subject-wise attendance
  const subjectStats = useMemo(() => {
    return subjects.map((subject) => {
      const subjectClasses = classSchedules.filter(
        (cls) => cls.subject === subject
      );
      const presentClasses = subjectClasses.filter(
        (cls) => cls.attendance === "present"
      ).length;
      const totalClasses = subjectClasses.length;
      const percentage =
        totalClasses > 0
          ? Math.round((presentClasses / totalClasses) * 100)
          : 0;

      return {
        subject,
        present: presentClasses,
        total: totalClasses,
        percentage,
      };
    });
  }, [classSchedules, subjects]);

  // Update attendance status
  const markAttendance = async (classId, status) => {
    try {
      // Update in the backend
      await axios.patch(`${API_URL}/attendance/${classId}`, {
        status,
        updatedBy: user.email,
      });

      // Update locally for immediate UI feedback
      setClassSchedules((prev) =>
        prev.map((cls) =>
          cls.id === classId ? { ...cls, attendance: status } : cls
        )
      );
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  // Export attendance data as CSV
  const exportToCSV = () => {
    const headers = ["Date", "Subject", "Time", "Room", "Status"];
    const csvData = filteredClasses.map((cls) => [
      cls.date,
      cls.subject,
      `${cls.startTime}-${cls.endTime}`,
      cls.room,
      cls.attendance.charAt(0).toUpperCase() + cls.attendance.slice(1),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (attendance) => {
    switch (attendance) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (attendance) => {
    switch (attendance) {
      case "present":
        return <FiCheck className="inline mr-1" />;
      case "absent":
        return <FiX className="inline mr-1" />;
      case "late":
        return <FiClock className="inline mr-1" />;
      default:
        return null;
    }
  };

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Get date range based on view (daily, weekly, monthly)
  const getDateRange = () => {
    const today = new Date(selectedDate);
    const start = new Date(today);

    if (view === "weekly") {
      start.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    } else if (view === "monthly") {
      start.setDate(1); // Start of month
    }

    return { start, end: new Date(today) };
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-6">
      {/* Notification for low attendance */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md z-50 flex items-center">
          <FiAlertCircle className="mr-2" />
          <span>Warning: Your attendance is below 75%</span>
          <button
            className="ml-4 text-red-700 hover:text-red-900"
            onClick={() => setShowNotification(false)}
          >
            <FiX />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Attendance Tracking
        </h2>
        <p className="text-gray-600">
          Manage and view your class attendance records
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Classes</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {attendanceStats.total}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiBook className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Present</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {attendanceStats.present}
              </h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>
                  {attendanceStats.total > 0
                    ? Math.round(
                        (attendanceStats.present / attendanceStats.total) * 100
                      )
                    : 0}
                  % of total
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiCheck className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Absent</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {attendanceStats.absent}
              </h3>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <FiTrendingDown size={16} className="mr-1" />
                <span>
                  {attendanceStats.total > 0
                    ? Math.round(
                        (attendanceStats.absent / attendanceStats.total) * 100
                      )
                    : 0}
                  % of total
                </span>
              </div>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <FiX className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Attendance Rate
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {attendanceStats.percentage}%
              </h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>Overall attendance rate</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiBarChart2 className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FiFilter className="mr-2" /> Filters & Controls
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setView("daily")}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  view === "daily"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setView("weekly")}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  view === "weekly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setView("monthly")}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  view === "monthly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={formatDate(dateRange.start)}
                onChange={(e) =>
                  setDateRange({
                    ...dateRange,
                    start: new Date(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                value={formatDate(dateRange.end)}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: new Date(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={exportToCSV}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center text-sm"
            >
              <FiDownload className="mr-2" /> Export
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center text-sm">
              <FiPrinter className="mr-2" /> Print
            </button>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Attendance Records
            </h3>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setSelectedDate(newDate);
                }}
              >
                <FiChevronLeft />
              </button>
              <span className="text-sm text-gray-600">
                {getDateRange().start.toLocaleDateString()} -{" "}
                {getDateRange().end.toLocaleDateString()}
              </span>
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setSelectedDate(newDate);
                }}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Subject
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Time
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Room
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => (
                  <tr
                    key={cls.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 text-sm text-gray-800">{cls.date}</td>
                    <td className="py-4 text-sm font-medium text-gray-800">
                      {cls.subject}
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {cls.startTime}-{cls.endTime}
                    </td>
                    <td className="py-4 text-sm text-gray-600">{cls.room}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          cls.attendance
                        )}`}
                      >
                        {getStatusIcon(cls.attendance)}
                        {cls.attendance
                          ? cls.attendance.charAt(0).toUpperCase() +
                            cls.attendance.slice(1)
                          : "Not Marked"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredClasses.length === 0 && (
              <div className="text-center py-8">
                <FiBook className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">No attendance records found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subject-wise Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Subject-wise Attendance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjectStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 text-sm mb-2">
                {stat.subject}
              </h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-gray-800">
                  {stat.percentage}%
                </span>
                <div
                  className={`p-2 rounded-full ${
                    stat.percentage >= 80
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {stat.percentage >= 80 ? (
                    <FiTrendingUp size={16} />
                  ) : (
                    <FiTrendingDown size={16} />
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-600">
                {stat.present} of {stat.total} classes attended
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    stat.percentage >= 80 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <CalendarView
        classSchedules={classSchedules}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </div>
  );
};

export default AttendancePage;
