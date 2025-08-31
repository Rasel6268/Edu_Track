import React, { useState } from 'react';
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
  FiTrendingDown
} from 'react-icons/fi';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'English', 'Chemistry'];
  const classSchedule = [
    { id: 1, subject: 'Mathematics', date: '2023-10-10', time: '09:00 - 10:30', room: 'Room 302', status: 'present' },
    { id: 2, subject: 'Physics', date: '2023-10-10', time: '11:00 - 12:30', room: 'Room 405', status: 'present' },
    { id: 3, subject: 'Computer Science', date: '2023-10-10', time: '14:00 - 15:30', room: 'Lab 101', status: 'absent' },
    { id: 4, subject: 'Mathematics', date: '2023-10-11', time: '09:00 - 10:30', room: 'Room 302', status: 'present' },
    { id: 5, subject: 'English', date: '2023-10-11', time: '11:00 - 12:30', room: 'Room 201', status: 'late' },
    { id: 6, subject: 'Chemistry', date: '2023-10-12', time: '09:00 - 10:30', room: 'Lab 203', status: 'present' },
    { id: 7, subject: 'Physics', date: '2023-10-12', time: '11:00 - 12:30', room: 'Room 405', status: 'absent' },
  ];

  const attendanceStats = {
    total: 20,
    present: 15,
    absent: 3,
    late: 2,
    percentage: 85
  };

  // Filter classes based on selected filters
  const filteredClasses = classSchedule.filter(cls => {
    const matchesSubject = filterSubject === 'all' || cls.subject === filterSubject;
    const matchesSearch = cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cls.room.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Calculate subject-wise attendance
  const subjectStats = subjects.map(subject => {
    const subjectClasses = classSchedule.filter(cls => cls.subject === subject);
    const presentClasses = subjectClasses.filter(cls => cls.status === 'present').length;
    const totalClasses = subjectClasses.length;
    const percentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
    
    return {
      subject,
      present: presentClasses,
      total: totalClasses,
      percentage
    };
  });

  const markAttendance = (classId, status) => {
    // In a real app, this would update the attendance status in your database
    console.log(`Marking class ${classId} as ${status}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <FiCheck className="inline mr-1" />;
      case 'absent': return <FiX className="inline mr-1" />;
      case 'late': return <FiClock className="inline mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Tracking</h2>
        <p className="text-gray-600">Manage and view your class attendance records</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Classes</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{attendanceStats.total}</h3>
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
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{attendanceStats.present}</h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>75% of total</span>
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
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{attendanceStats.absent}</h3>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <FiTrendingDown size={16} className="mr-1" />
                <span>15% of total</span>
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
              <p className="text-gray-500 text-sm font-medium">Attendance Rate</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{attendanceStats.percentage}%</h3>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <FiTrendingUp size={16} className="mr-1" />
                <span>+5% from last month</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
            <div className="flex space-x-2">
              <button 
                onClick={() => setView('daily')}
                className={`flex-1 py-2 rounded-lg text-sm ${view === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Daily
              </button>
              <button 
                onClick={() => setView('weekly')}
                className={`flex-1 py-2 rounded-lg text-sm ${view === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setView('monthly')}
                className={`flex-1 py-2 rounded-lg text-sm ${view === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select 
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
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
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center text-sm">
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
            <h3 className="text-lg font-semibold text-gray-800">Attendance Records</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <FiChevronLeft />
              </button>
              <span className="text-sm text-gray-600">Oct 10-16, 2023</span>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <FiChevronRight />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Subject</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Time</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Room</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(cls => (
                  <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-800">{cls.date}</td>
                    <td className="py-4 text-sm font-medium text-gray-800">{cls.subject}</td>
                    <td className="py-4 text-sm text-gray-600">{cls.time}</td>
                    <td className="py-4 text-sm text-gray-600">{cls.room}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cls.status)}`}>
                        {getStatusIcon(cls.status)}
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => markAttendance(cls.id, 'present')}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Mark as Present"
                        >
                          <FiCheck size={16} />
                        </button>
                        <button 
                          onClick={() => markAttendance(cls.id, 'absent')}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Mark as Absent"
                        >
                          <FiX size={16} />
                        </button>
                        <button 
                          onClick={() => markAttendance(cls.id, 'late')}
                          className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                          title="Mark as Late"
                        >
                          <FiClock size={16} />
                        </button>
                      </div>
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
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Subject-wise Attendance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjectStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 text-sm mb-2">{stat.subject}</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-gray-800">{stat.percentage}%</span>
                <div className={`p-2 rounded-full ${stat.percentage >= 80 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {stat.percentage >= 80 ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
                </div>
              </div>
              <div className="text-xs text-gray-600">
                {stat.present} of {stat.total} classes attended
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${stat.percentage >= 80 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Attendance Calendar</h3>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {/* Empty days for the start of the month */}
          {[...Array(3)].map((_, i) => (
            <div key={`empty-${i}`} className="h-16 bg-gray-50 rounded-lg"></div>
          ))}
          
          {/* Calendar days with attendance indicators */}
          {[...Array(31)].map((_, i) => {
            const day = i + 1;
            const dateStr = `2023-10-${day < 10 ? '0' + day : day}`;
            const dayClasses = classSchedule.filter(cls => cls.date === dateStr);
            const presentCount = dayClasses.filter(cls => cls.status === 'present').length;
            const totalCount = dayClasses.length;
            
            return (
              <div key={day} className="h-16 border border-gray-200 rounded-lg p-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{day}</span>
                  {totalCount > 0 && (
                    <span className={`text-xs ${presentCount === totalCount ? 'text-green-600' : 'text-red-600'}`}>
                      {presentCount}/{totalCount}
                    </span>
                  )}
                </div>
                {totalCount > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full ${presentCount === totalCount ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${(presentCount / totalCount) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;