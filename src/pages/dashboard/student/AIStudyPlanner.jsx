import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiBook, 
  FiTarget,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiCheck,
  FiX,
  FiCpu,
  FiBarChart2,
  FiBookOpen,
  FiPieChart,
  FiTrendingUp,
  FiBell,
  FiSave,
  FiRefreshCw
} from 'react-icons/fi';

const AIStudyPlanner = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Prepare for Mathematics Final', subject: 'Mathematics', deadline: '2023-12-15', priority: 'high', completed: false },
    { id: 2, title: 'Complete Physics Research Paper', subject: 'Physics', deadline: '2023-11-20', priority: 'medium', completed: false },
    { id: 3, title: 'Learn JavaScript Fundamentals', subject: 'Computer Science', deadline: '2023-11-30', priority: 'low', completed: true },
  ]);

  const [studySessions, setStudySessions] = useState([
    { id: 1, subject: 'Mathematics', topic: 'Calculus', date: '2023-10-15', time: '14:00', duration: 2, completed: false },
    { id: 2, subject: 'Physics', topic: 'Thermodynamics', date: '2023-10-16', time: '10:00', duration: 1.5, completed: false },
    { id: 3, subject: 'Computer Science', topic: 'React Components', date: '2023-10-14', time: '16:00', duration: 2, completed: true },
  ]);

  const [newGoal, setNewGoal] = useState({ title: '', subject: '', deadline: '', priority: 'medium' });
  const [newSession, setNewSession] = useState({ subject: '', topic: '', date: '', time: '', duration: 1 });
  const [aiSuggestions, setAiSuggestions] = useState([
    { id: 1, type: 'schedule', message: 'Based on your performance, schedule more time for Mathematics practice', priority: 'high' },
    { id: 2, type: 'resource', message: 'Recommended resource: Khan Academy Calculus course', priority: 'medium' },
    { id: 3, type: 'reminder', message: 'Your Physics exam is in 2 weeks. Increase study frequency', priority: 'high' },
  ]);

  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'English', 'Chemistry', 'Biology'];
  const priorities = ['low', 'medium', 'high'];

  const addGoal = () => {
    if (newGoal.title && newGoal.subject && newGoal.deadline) {
      setGoals([...goals, { ...newGoal, id: Date.now(), completed: false }]);
      setNewGoal({ title: '', subject: '', deadline: '', priority: 'medium' });
    }
  };

  const addStudySession = () => {
    if (newSession.subject && newSession.topic && newSession.date && newSession.time) {
      setStudySessions([...studySessions, { ...newSession, id: Date.now(), completed: false }]);
      setNewSession({ subject: '', topic: '', date: '', time: '', duration: 1 });
    }
  };

  const toggleGoalCompletion = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const toggleSessionCompletion = (id) => {
    setStudySessions(studySessions.map(session => 
      session.id === id ? { ...session, completed: !session.completed } : session
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const deleteSession = (id) => {
    setStudySessions(studySessions.filter(session => session.id !== id));
  };

  const generateAISuggestions = () => {
    // In a real app, this would call an AI API to generate personalized suggestions
    const newSuggestion = {
      id: Date.now(),
      type: 'schedule',
      message: 'Based on your learning patterns, try studying in 25-minute intervals with 5-minute breaks',
      priority: 'medium'
    };
    setAiSuggestions([newSuggestion, ...aiSuggestions]);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.completed).length;
    return totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiCpu className="mr-2 text-blue-600" /> AI Study Planner
        </h2>
        <p className="text-gray-600">Create personalized study plans with AI-powered recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Study Progress</h3>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <svg className="w-32 h-32" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeDasharray={`${calculateProgress()}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{calculateProgress()}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 text-sm">Goals</p>
              <p className="text-xl font-bold text-blue-800">{goals.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 text-sm">Completed</p>
              <p className="text-xl font-bold text-green-800">{goals.filter(g => g.completed).length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-600 text-sm">Sessions</p>
              <p className="text-xl font-bold text-purple-800">{studySessions.length}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-yellow-600 text-sm">Hours</p>
              <p className="text-xl font-bold text-yellow-800">
                {studySessions.reduce((total, session) => total + session.duration, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiCpu className="mr-2 text-blue-600" /> AI Recommendations
            </h3>
            <button 
              onClick={generateAISuggestions}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center text-sm"
            >
              <FiRefreshCw className="mr-2" /> Generate Suggestions
            </button>
          </div>
          
          <div className="space-y-4">
            {aiSuggestions.map(suggestion => (
              <div key={suggestion.id} className={`p-4 rounded-lg border-l-4 ${suggestion.priority === 'high' ? 'bg-red-50 border-red-500' : suggestion.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' : 'bg-green-50 border-green-500'}`}>
                <div className="flex justify-between items-start">
                  <p className="text-gray-800">{suggestion.message}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority}
                  </span>
                </div>
                <div className="flex mt-3 space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Apply</button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">Dismiss</button>
                </div>
              </div>
            ))}
          </div>
          
          {aiSuggestions.length === 0 && (
            <div className="text-center py-8">
              <FiCpu className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-500">No AI suggestions yet. Generate some to get started!</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Study Goals */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiTarget className="mr-2" /> Study Goals
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <FiPlus className="mr-1" /> Add Goal
            </button>
          </div>
          
          {/* Add Goal Form */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Add New Goal</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newGoal.subject}
                  onChange={(e) => setNewGoal({...newGoal, subject: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={addGoal}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
                >
                  <FiPlus className="mr-1" /> Add
                </button>
              </div>
            </div>
          </div>
          
          {/* Goals List */}
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <button 
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${goal.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                >
                  {goal.completed && <FiCheck size={12} />}
                </button>
                <div className="flex-1 ml-3">
                  <h4 className={`font-medium ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {goal.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{goal.subject}</span>
                    <span className="mx-2">•</span>
                    <span>Due: {goal.deadline}</span>
                    <span className="mx-2">•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
            
            {goals.length === 0 && (
              <div className="text-center py-8">
                <FiTarget className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">No study goals yet. Add some to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Study Sessions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiCalendar className="mr-2" /> Study Sessions
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <FiPlus className="mr-1" /> Add Session
            </button>
          </div>
          
          {/* Add Session Form */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Schedule New Session</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newSession.subject}
                  onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Topic"
                  value={newSession.topic}
                  onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Duration (hours)</label>
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={newSession.duration}
                    onChange={(e) => setNewSession({...newSession, duration: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>0.5h</span>
                    <span>{newSession.duration}h</span>
                    <span>4h</span>
                  </div>
                </div>
                <button 
                  onClick={addStudySession}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
                >
                  <FiPlus className="mr-1" /> Add
                </button>
              </div>
            </div>
          </div>
          
          {/* Sessions List */}
          <div className="space-y-4">
            {studySessions.map(session => (
              <div key={session.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <button 
                  onClick={() => toggleSessionCompletion(session.id)}
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${session.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                >
                  {session.completed && <FiCheck size={12} />}
                </button>
                <div className="flex-1 ml-3">
                  <h4 className={`font-medium ${session.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {session.subject} - {session.topic}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="mr-1" size={14} />
                    <span>{session.date}</span>
                    <span className="mx-2">•</span>
                    <FiClock className="mr-1" size={14} />
                    <span>{session.time} ({session.duration}h)</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteSession(session.id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
            
            {studySessions.length === 0 && (
              <div className="text-center py-8">
                <FiCalendar className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">No study sessions yet. Schedule some to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Study Analytics */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <FiBarChart2 className="mr-2" /> Study Analytics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FiClock className="text-blue-600 mr-2" />
              <span className="text-blue-600 font-medium">Total Study Hours</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">14.5h</p>
            <p className="text-sm text-blue-700">This week</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FiTrendingUp className="text-green-600 mr-2" />
              <span className="text-green-600 font-medium">Productivity</span>
            </div>
            <p className="text-2xl font-bold text-green-800">78%</p>
            <p className="text-sm text-green-700">+5% from last week</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FiBook className="text-purple-600 mr-2" />
              <span className="text-purple-600 font-medium">Subjects Covered</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">3/5</p>
            <p className="text-sm text-purple-700">Mathematics, Physics, CS</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">Study Time Distribution</h4>
          <div className="flex items-center h-6 bg-white rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full flex items-center justify-center text-white text-xs" style={{ width: '40%' }}>
              Math (40%)
            </div>
            <div className="bg-green-500 h-full flex items-center justify-center text-white text-xs" style={{ width: '30%' }}>
              Physics (30%)
            </div>
            <div className="bg-purple-500 h-full flex items-center justify-center text-white text-xs" style={{ width: '20%' }}>
              CS (20%)
            </div>
            <div className="bg-gray-300 h-full flex items-center justify-center text-gray-700 text-xs" style={{ width: '10%' }}>
              Other (10%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudyPlanner;