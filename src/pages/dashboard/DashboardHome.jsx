import React, { useState } from "react";
import { useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiBell,
  FiCheckSquare,
  FiDollarSign,
  FiBook,
  FiTarget,
  FiPieChart,
  FiPlus,
  FiCheck,
  FiX,
  FiUser,
  FiBookOpen,
  FiBarChart2,
  FiCpu,
  FiMessageSquare,
  FiTrendingUp,
  FiTrendingDown,
  FiAward,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import BudgetOverview from "../../components/BudgetOverview";

const DashboardHome = () => {
  const { user } = useAuth();
  const API_URL = "https://edu-track-backend-zeta.vercel.app/schedule";
  const API = "https://edu-track-backend-zeta.vercel.app";
  const [todayClasses, setTodayClasses] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [classSchedules, setClassSchedules] = useState([]);

  const [studyTasks, setStudyTasks] = useState([]);

  const markAttendance = (classId, status) => {
    setTodayClasses((classes) =>
      classes.map((cls) =>
        cls.id === classId ? { ...cls, attendance: status } : cls
      )
    );
  };
  console.log(scheduleData);
  useEffect(() => {
    if (!user) return;

    const fetchTodayClasses = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/${user.email}`);
        setScheduleData(res.data);
        const today = new Date()
          .toLocaleDateString("en-US", {
            weekday: "long",
          })
          .toLowerCase();

        const todayData = res.data.filter(
          (cls) => cls.day.toLowerCase() === today
        );

        setTodayClasses(todayData);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchGoald = async () => {
      const goalsRes = await axios.get(`${API}/goals/${user.email}`);
      setStudyTasks(goalsRes.data.goals || []);
    };

    const fetchAttendance = async () => {
      if (!user?.email) return;

      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/schedules/${user.email}`);
        setClassSchedules(res.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayClasses();
    fetchGoald();
    fetchAttendance();
  }, [user]);

  const toggleTaskCompletion = (taskId) => {
    setStudyTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const calculateAttendanceRate = () => {
    let total = 0;
    let present = 0;

    scheduleData.forEach((cls) => {
      if (cls.attendance) {
        total++;
        if (cls.attendance === "present") present++;
      }
      //console.log(cls)
    });

    return total > 0 ? Math.round((present / total) * 100) : 0;
  };
 

  const attendanceRate = calculateAttendanceRate();
  const totalClasses = scheduleData.length;
  const pendingTasks = studyTasks.filter((t) => !t.completed).length;
  const completedTasks = studyTasks.filter((t) => t.completed).length;

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Classes</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {totalClasses}
              </h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>+2 from last week</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiCalendar className="text-blue-600" size={24} />
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
                {attendanceRate}%
              </h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>+5% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiCheckSquare className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Weekly Budget</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                $180
              </h3>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <FiTrendingDown size={16} className="mr-1" />
                <span>-$20 from last week</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FiDollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Tasks Completed
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {completedTasks}/{pendingTasks}
              </h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>+3 from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiTarget className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiCalendar className="mr-2" /> Today's Classes
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {todayClasses.filter((c) => c.attendance === "pending").length}{" "}
              Pending
            </span>
          </div>

          <div className="space-y-4">
            {todayClasses.length === 0 && !loading && (
              <p className="text-gray-500">No classes scheduled for today 🎉</p>
            )}

            {todayClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-4 h-12 ${
                    classItem.color || "bg-blue-500"
                  } rounded-lg mr-4`}
                ></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">
                    {classItem.subject}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <FiClock className="mr-1" size={14} />
                    {classItem.startTime} - {classItem.endTime}
                    <span className="mx-2">•</span>
                    {classItem.room}
                  </div>
                </div>
                <div>
                  {classItem.attendance === "present" ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                      <FiCheck className="mr-1" size={14} />
                      Present
                    </span>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => markAttendance(classItem.id, "present")}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 transition-colors flex items-center"
                      >
                        <FiCheck className="mr-1" size={14} />
                      </button>
                      <button
                        onClick={() => markAttendance(classItem.id, "absent")}
                        className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full hover:bg-red-200 transition-colors flex items-center"
                      >
                        <FiX className="mr-1" size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiTarget className="mr-2" /> Study Tasks
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {studyTasks.filter((t) => !t.completed).length} Pending
            </span>
          </div>

          <div className="space-y-4">
            {studyTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    task.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {task.completed && <FiCheck size={12} />}
                </button>
                <div className="flex-1 ml-3">
                  <h4
                    className={`font-medium ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {task.subject}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mx-2">•</span>
                    <span>
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Budget Overview */}
        <BudgetOverview></BudgetOverview>

        {/* AI Suggestions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <FiCpu className="mr-2" /> AI Suggestions
          </h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <FiClock className="mr-2" /> Time Allocation
              </h4>
              <p className="text-sm text-blue-700">
                Based on your schedule, we recommend allocating 2 hours for
                Physics practice today.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <FiDollarSign className="mr-2" /> Spending Alert
              </h4>
              <p className="text-sm text-green-700">
                You spent 30% more on snacks this week; maybe cook more?
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                <FiBook className="mr-2" /> Study Focus
              </h4>
              <p className="text-sm text-purple-700">
                Your upcoming exam is heavy on Calculus. Prioritize Math
                revision sessions.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                <FiAward className="mr-2" /> Achievement
              </h4>
              <p className="text-sm text-yellow-700">
                You've maintained 92% attendance this month! Keep it up!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <FiCalendar className="mr-2" /> Upcoming Events
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-lg inline-block mb-2">
              <FiBookOpen size={16} />
            </div>
            <h4 className="font-medium text-gray-800">Math Quiz</h4>
            <p className="text-sm text-gray-600">Tomorrow • 10:00 AM</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="bg-green-100 text-green-700 p-2 rounded-lg inline-block mb-2">
              <FiBarChart2 size={16} />
            </div>
            <h4 className="font-medium text-gray-800">Physics Lab</h4>
            <p className="text-sm text-gray-600">Wed, Oct 12 • 2:00 PM</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="bg-purple-100 text-purple-700 p-2 rounded-lg inline-block mb-2">
              <FiMessageSquare size={16} />
            </div>
            <h4 className="font-medium text-gray-800">Group Study</h4>
            <p className="text-sm text-gray-600">Thu, Oct 13 • 4:00 PM</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <div className="bg-red-100 text-red-700 p-2 rounded-lg inline-block mb-2">
              <FiDollarSign size={16} />
            </div>
            <h4 className="font-medium text-gray-800">Budget Review</h4>
            <p className="text-sm text-gray-600">Sun, Oct 16 • 11:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
