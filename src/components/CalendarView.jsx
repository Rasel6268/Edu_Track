import React, { useState, useMemo } from 'react';
import { FiChevronLeft, FiChevronRight, FiCoffee, FiBook } from 'react-icons/fi';

const CalendarView = ({ classSchedules, selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get all days in the month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    
    // Add empty days for the first week
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Check if a day is Friday or Saturday (official vacation)
  const isOfficialVacation = (date) => {
    if (!date) return false;
    const dayOfWeek = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday
  };

  // Format date to match the format in classSchedules (YYYY-MM-DD)
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format month and year for display
  const monthYearString = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  // Get attendance for a specific date
  const getDayAttendance = (date) => {
    if (!date) return { present: 0, total: 0, hasClasses: false };
    
    const dateStr = formatDate(date);
    const dayClasses = classSchedules.filter(cls => cls.date === dateStr);
    const presentCount = dayClasses.filter(cls => cls.attendance === 'present').length;
    
    return {
      present: presentCount,
      total: dayClasses.length,
      percentage: dayClasses.length > 0 ? (presentCount / dayClasses.length) * 100 : 0,
      hasClasses: dayClasses.length > 0
    };
  };

  // Get color class based on attendance percentage
  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Attendance Calendar</h3>
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiChevronLeft />
          </button>
          <span className="text-md font-medium text-gray-700">
            {monthYearString}
          </span>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-16 bg-gray-50 rounded-lg"></div>;
          }
          
          const isVacation = isOfficialVacation(day);
          const attendance = getDayAttendance(day);
          const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div 
              key={day.getTime()}
              onClick={() => !isVacation && onDateSelect(day)}
              className={`h-16 border rounded-lg p-2 ${
                isVacation ? 'bg-gray-100 cursor-default' : 'cursor-pointer transition-all hover:shadow-md'
              } ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isToday ? 'ring-2 ring-blue-200' : ''}`}
            >
              <div className="flex justify-between items-start h-full">
                <span className={`text-sm font-medium ${
                  isToday ? 'text-blue-600' : 
                  isVacation ? 'text-gray-500' : 'text-gray-800'
                }`}>
                  {day.getDate()}
                </span>
                
                {isVacation ? (
                  <div className="text-right w-full">
                    <div className="text-xs text-gray-500 mb-1 flex items-center justify-end">
                      <FiCoffee className="mr-1" size={10} />
                      Vacation
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-1"></div>
                  </div>
                ) : attendance.hasClasses ? (
                  <div className="text-right">
                    <div className="text-xs text-gray-600 mb-1">
                      {attendance.present}/{attendance.total}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${getAttendanceColor(attendance.percentage)}`}
                        style={{ width: `${attendance.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 mt-2 text-right flex items-center justify-end">
                    <FiBook className="mr-1" size={10} />
                    No classes
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>80-100%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
          <span>50-79%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span>0-49%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
          <span>Vacation</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 border border-blue-400 rounded-full mr-1"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;