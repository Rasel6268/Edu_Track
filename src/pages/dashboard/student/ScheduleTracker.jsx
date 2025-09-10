import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../../components/loader";

const ScheduleTracker = () => {
  const API_URL = "http://localhost:3001/schedule";
  const API = "http://localhost:3001";
  const [activeView, setActiveView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Mathematics class starts in 15 minutes",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      message: "Physics assignment due tomorrow",
      time: "30 min ago",
      read: false,
    },
    {
      id: 3,
      message: "Computer Science lab session cancelled",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const [newClass, setNewClass] = useState({
    subject: "",
    startTime: "09:00",
    endTime: "10:00",
    day: "monday",
    room: "",
    color: "blue",
    notification: true,
    notificationTime: 15,
    date: "",
  });

  const [scheduleData, setScheduleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Complete days array
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchSchedules = async () => {
    if (!user?.email) return;
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/${user.email}`);
      console.log(res);

      const grouped = {};
      daysOfWeek.forEach((day) => {
        grouped[day] = [];
      });

      res.data.forEach((cls) => {
        if (grouped[cls.day]) {
          grouped[cls.day].push(cls);
        }
      });

      setScheduleData(grouped);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      toast.error("Failed to load schedules");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const timeSlots = [];
  for (let hour = 8; hour <= 17; hour++) {
    for (let min = 0; min < 60; min += 30) {
      timeSlots.push(
        `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`
      );
    }
  }

  const colorClasses = {
    blue: "bg-blue-100 border-blue-300 text-blue-800",
    purple: "bg-purple-100 border-purple-300 text-purple-800",
    green: "bg-green-100 border-green-300 text-green-800",
    yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
    red: "bg-red-100 border-red-300 text-red-800",
    indigo: "bg-indigo-100 border-indigo-300 text-indigo-800",
    pink: "bg-pink-100 border-pink-300 text-pink-800",
  };

  const handleAddClass = async () => {
    if (!newClass.subject) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const newClassData = {
        subject: newClass.subject,
        startTime: newClass.startTime,
        endTime: newClass.endTime,
        room: newClass.room,
        color: newClass.color,
        day: newClass.day,
        createdBy: user.email,
        date: newClass.date,
      };
      console.log(newClassData)

      await axios.post(`${API_URL}/add`, newClassData);
      toast.success("Class added successfully!");

      // Refresh the schedule data
      fetchSchedules();

      setShowAddModal(false);
      setNewClass({
       
        subject: "",
        startTime: "09:00",
        endTime: "10:00",
        day: "monday",
        room: "",
        date: "",
        color: "blue",
        notification: true,
        notificationTime: 15,
      });

      if (newClass.notification) {
        const newNotification = {
          id: Date.now(),
          message: `Added new class: ${newClass.subject} on ${newClass.day} at ${newClass.startTime}`,
          time: "Just now",
          read: false,
        };
        setNotifications([newNotification, ...notifications]);
      }
    } catch (error) {
      console.error("Error adding class:", error);
      toast.error("Failed to add class");
    }
  };

  const markAttendance = async (classId, day, status) => {
    console.log(status);
    try {
      await axios.patch(`${API_URL}/${classId}/attendance`, {
        attendance: status,
      });

      // Update local state
      const updatedSchedule = { ...scheduleData };
      const classIndex = updatedSchedule[day].findIndex(
        (c) => c._id === classId
      );
      if (classIndex !== -1) {
        updatedSchedule[day][classIndex].attendance = status;
        setScheduleData(updatedSchedule);
      }

      const classTitle = updatedSchedule[day][classIndex].subject;
      const newNotification = {
        id: Date.now(),
        message: `Marked attendance for ${classTitle} as ${status}`,
        time: "Just now",
        read: false,
      };
      setNotifications([newNotification, ...notifications]);
      toast.success(`Attendance marked as ${status}`);
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const getUpcomingClasses = () => {
    const today = new Date().getDay();
    const todayName = daysOfWeek[today];

    const upcoming = [];
    if (scheduleData[todayName]) {
      scheduleData[todayName].forEach((c) => {
        const [h, m] = c.startTime.split(":").map(Number);
        const classTime = new Date();
        classTime.setHours(h, m, 0, 0);

        if (classTime > new Date()) {
          upcoming.push({
            ...c,
            day: "Today",
            minutesLeft: Math.floor((classTime - new Date()) / (1000 * 60)),
          });
        }
      });
    }

    // Check next days
    for (let i = 1; i <= 2; i++) {
      const nextDay = (today + i) % 7;
      const nextDayName = daysOfWeek[nextDay];

      if (scheduleData[nextDayName]) {
        const dayLabel = i === 1 ? "Tomorrow" : dayNames[nextDay];
        scheduleData[nextDayName].forEach((c) =>
          upcoming.push({ ...c, day: dayLabel, minutesLeft: null })
        );
      }
    }

    return upcoming
      .sort((a, b) => {
        if (a.minutesLeft !== null && b.minutesLeft !== null)
          return a.minutesLeft - b.minutesLeft;
        if (a.minutesLeft !== null) return -1;
        if (b.minutesLeft !== null) return 1;
        return 0;
      })
      .slice(0, 3);
  };

  const getWeeklyStats = () => {
    let total = 0,
      completed = 0,
      marked = 0;
    Object.values(scheduleData).forEach((dayClasses) => {
      total += dayClasses.length;
      dayClasses.forEach((c) => {
        if (c.attendance === "present") {
          completed++;
          marked++;
        } else if (c.attendance === "absent") {
          marked++;
        }
      });
    });
    console.log(marked)
    

    const attendanceRate =
      marked > 0 ? Math.round((completed / marked) * 100) : 0;
    const upcomingClasses = getUpcomingClasses().length;

    return {
      totalClasses: total,
      completedClasses: completed,
      attendanceRate,
      upcomingClasses,
    };
  };

  if (isLoading) {
    return <Loader></Loader>
  }

  const weeklyStats = getWeeklyStats();
  const upcomingClasses = getUpcomingClasses();
  const currentDayName = daysOfWeek[new Date().getDay()];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Class Schedule Tracker
            </h1>
            <p className="text-gray-600">
              Stay organized with your classes and assignments
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNotificationSettings(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>🔔</span> Notifications
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>+</span> Add Class
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm">Total Classes</h3>
            <p className="text-2xl font-bold">{weeklyStats.totalClasses}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm">Completed</h3>
            <p className="text-2xl font-bold">{weeklyStats.completedClasses}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm">Attendance Rate</h3>
            <p className="text-2xl font-bold">{weeklyStats.attendanceRate}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm">Upcoming</h3>
            <p className="text-2xl font-bold">{weeklyStats.upcomingClasses}</p>
          </div>
        </div>

        {/* Main Content and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main */}
          <div className="lg:w-3/4">
            {/* View toggle */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeView === "daily"
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveView("daily")}
                >
                  Daily View
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeView === "weekly"
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveView("weekly")}
                >
                  Weekly View
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">◀</button>
                <span className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <button className="p-2 rounded-lg hover:bg-gray-100">▶</button>
              </div>
            </div>

            {/* Daily / Weekly View */}
            {activeView === "daily" ? (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Today's Schedule - {dayNames[new Date().getDay()]}
                </h2>
                <div className="relative">
                  {timeSlots.map((time, index) => (
                    <div key={index} className="flex border-t border-gray-200">
                      <div className="w-16 py-2 text-sm text-gray-500">
                        {time}
                      </div>
                      <div className="flex-1 py-2 relative min-h-[4rem]">
                        {scheduleData[currentDayName]
                          ?.filter((c) => c.startTime === time)
                          .map((classItem) => (
                            <div
                              key={classItem._id}
                              className={`absolute left-0 right-0 p-2 rounded-lg border ${
                                colorClasses[classItem.color]
                              } shadow-sm`}
                              style={{
                                top: "0.5rem",
                                height: `calc(${
                                  ((parseInt(classItem.endTime.split(":")[0]) *
                                    60 +
                                    parseInt(classItem.endTime.split(":")[1]) -
                                    (parseInt(
                                      classItem.startTime.split(":")[0]
                                    ) *
                                      60 +
                                      parseInt(
                                        classItem.startTime.split(":")[1]
                                      ))) /
                                    30) *
                                  2.5
                                }rem)`,
                                zIndex: 10,
                              }}
                            >
                              <div className="font-medium">
                                {classItem.subject}
                              </div>
                              <div className="text-xs">
                                {classItem.room} • {classItem.startTime} -{" "}
                                {classItem.endTime}
                              </div>
                              <div className="mt-2 flex gap-2">
                                {classItem.attendance === "present" ? (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded cursor-pointer">
                                    Present
                                  </span>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        markAttendance(
                                          classItem._id,
                                          currentDayName,
                                          "present"
                                        )
                                      }
                                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 cursor-pointer"
                                    >
                                      Present
                                    </button>
                                    <button
                                      onClick={() =>
                                        markAttendance(
                                          classItem._id,
                                          currentDayName,
                                          "absent"
                                        )
                                      }
                                      className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200 cursor-pointer"
                                    >
                                      Absent
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr>
                      <th className="border p-2">Time</th>
                      {shortDayNames.map((d, index) => (
                        <th key={index} className="border p-2">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-sm text-gray-500">
                          {time}
                        </td>
                        {daysOfWeek.map((day, index2) => (
                          <td key={index2} className="border p-2 relative h-16">
                            {scheduleData[day]
                              ?.filter((c) => c.startTime === time)
                              .map((classItem) => (
                                <div
                                  key={classItem._id}
                                  className={`p-1 rounded border ${
                                    colorClasses[classItem.color]
                                  } text-xs`}
                                >
                                  <div className="font-medium">
                                    {classItem.subject}
                                  </div>
                                  <div className="text-xs opacity-70">
                                    {classItem.room}
                                  </div>
                                  <div className="mt-1">
                                    {classItem.attendance === "present" ? (
                                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                    ) : classItem.attendance === "absent" ? (
                                      <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                    ) : (
                                      <span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            {/* Upcoming Classes */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-2">Upcoming Classes</h3>
              {upcomingClasses.length > 0 ? (
                upcomingClasses.map((c) => (
                  <div key={c._id} className="border-b py-2 last:border-b-0">
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-gray-500">
                      {c.day} • {c.startTime} - {c.endTime}
                    </div>
                    {c.minutesLeft !== null && (
                      <div className="text-xs text-blue-600">
                        in {c.minutesLeft} minutes
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No upcoming classes</p>
              )}
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-2 text-sm border-b last:border-b-0 ${
                        n.read ? "text-gray-400" : "text-gray-800 font-medium"
                      }`}
                    >
                      <div>{n.message}</div>
                      <div className="text-xs text-gray-500">{n.time}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No notifications</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Class Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Class</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newClass.subject}
                    onChange={(e) =>
                      setNewClass({ ...newClass, subject: e.target.value })
                    }
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newClass.startTime}
                      onChange={(e) =>
                        setNewClass({ ...newClass, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newClass.endTime}
                      onChange={(e) =>
                        setNewClass({ ...newClass, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day of Week
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newClass.day}
                    onChange={(e) => {
                      const selectedDay = e.target.value;
                      // Calculate the date for the selected day in the current week
                      const today = new Date();
                      const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
                      const targetDay = dayNames.findIndex(
                        (d) => d.toLowerCase() === selectedDay.toLowerCase()
                      );

                      // Calculate the difference in days
                      let diff = targetDay - currentDay;
                      if (diff < 0) diff += 7; // If the day has passed this week, get next week

                      const targetDate = new Date(today);
                      targetDate.setDate(today.getDate() + diff);

                      // Format as YYYY-MM-DD
                      const year = targetDate.getFullYear();
                      const month = String(targetDate.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(targetDate.getDate()).padStart(2, "0");
                      const dateStr = `${year}-${month}-${day}`;

                      setNewClass({
                        ...newClass,
                        day: selectedDay,
                        date: dateStr,
                      });
                    }}
                  >
                    {dayNames.map((day, index) => (
                      <option key={index} value={daysOfWeek[index]}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date (auto-set based on day selection)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    value={newClass.date || ""}
                    readOnly
                    placeholder="Select a day above"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room/Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newClass.room}
                    onChange={(e) =>
                      setNewClass({ ...newClass, room: e.target.value })
                    }
                    placeholder="e.g., Room 302"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Coding
                  </label>
                  <div className="flex space-x-2 mt-1">
                    {Object.keys(colorClasses).map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newClass.color === color
                            ? "border-gray-800"
                            : "border-white"
                        } ${colorClasses[color].split(" ")[0]}`}
                        onClick={() => setNewClass({ ...newClass, color })}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notification-toggle"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={newClass.notification}
                    onChange={(e) =>
                      setNewClass({
                        ...newClass,
                        notification: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="notification-toggle"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Enable reminder notification
                  </label>
                </div>
                {newClass.notification && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notify me before class
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newClass.notificationTime}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          notificationTime: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="5">5 minutes before</option>
                      <option value="15">15 minutes before</option>
                      <option value="30">30 minutes before</option>
                      <option value="60">1 hour before</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleAddClass}
                  disabled={!newClass.subject || !newClass.room}
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings Modal */}
        {showNotificationSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Notification Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Push Notifications
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Sound Alerts
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Notification Time
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="5">5 minutes before</option>
                    <option value="15" selected>
                      15 minutes before
                    </option>
                    <option value="30">30 minutes before</option>
                    <option value="60">1 hour before</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setShowNotificationSettings(false)}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTracker;
