import React, { useState } from 'react';
import { 
  FiUsers, 
  FiPlus, 
  FiSearch, 
  FiMessageSquare, 
  FiCalendar,
  FiBook,
  FiCheckSquare,
  FiPaperclip,
  FiUserPlus,
  FiSettings,
  FiBell,
  FiX,
  FiCheck,
  FiSend,
  FiFileText,
  FiVideo
} from 'react-icons/fi';

const GroupStudy = () => {
  const [activeTab, setActiveTab] = useState('my-groups');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const myGroups = [
    {
      id: 1,
      name: 'Mathematics Study Group',
      subject: 'Mathematics',
      members: 5,
      upcomingSession: 'Tomorrow, 3 PM',
      unreadMessages: 3
    },
    {
      id: 2,
      name: 'Physics Lab Partners',
      subject: 'Physics',
      members: 3,
      upcomingSession: 'Oct 20, 2 PM',
      unreadMessages: 0
    },
    {
      id: 3,
      name: 'Computer Science Team',
      subject: 'Computer Science',
      members: 4,
      upcomingSession: 'No upcoming sessions',
      unreadMessages: 7
    }
  ];

  const allGroups = [
    {
      id: 4,
      name: 'Chemistry Study Circle',
      subject: 'Chemistry',
      members: 8,
      upcomingSession: 'Today, 5 PM',
      isPublic: true
    },
    {
      id: 5,
      name: 'Literature Discussion',
      subject: 'English Literature',
      members: 6,
      upcomingSession: 'Oct 22, 4 PM',
      isPublic: true
    },
    {
      id: 6,
      name: 'History Research Team',
      subject: 'History',
      members: 4,
      upcomingSession: 'Oct 25, 11 AM',
      isPublic: false
    }
  ];

  const groupMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Admin', joined: '2 weeks ago' },
    { id: 2, name: 'Maria Garcia', role: 'Member', joined: '5 days ago' },
    { id: 3, name: 'David Kim', role: 'Member', joined: '3 days ago' },
    { id: 4, name: 'Sarah Wilson', role: 'Member', joined: '1 day ago' },
  ];

  const groupMessages = [
    { id: 1, user: 'Alex Johnson', text: 'Welcome everyone to the study group!', time: '2:30 PM' },
    { id: 2, user: 'Maria Garcia', text: 'Thanks for creating this group. When should we schedule our first session?', time: '2:32 PM' },
    { id: 3, user: 'David Kim', text: 'I\'ve uploaded the chapter notes for everyone.', time: '2:45 PM' },
    { id: 4, user: 'You', text: 'I think Thursday afternoon works for most people?', time: '2:48 PM' },
  ];

  const sharedResources = [
    { id: 1, name: 'Calculus Chapter 3 Notes.pdf', type: 'pdf', uploadedBy: 'David Kim', date: '2 hours ago' },
    { id: 2, name: 'Practice Problem Set.docx', type: 'doc', uploadedBy: 'Alex Johnson', date: '1 day ago' },
    { id: 3, name: 'Important Formulas Sheet.pdf', type: 'pdf', uploadedBy: 'Maria Garcia', date: '2 days ago' },
  ];

  const studyGoals = [
    { id: 1, text: 'Complete Chapter 3 exercises', completed: true, completedBy: '3/5 members' },
    { id: 2, text: 'Prepare for Midterm Exam', completed: false, completedBy: '1/5 members' },
    { id: 3, text: 'Create summary flashcards', completed: false, completedBy: '2/5 members' },
  ];

  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    description: '',
    isPublic: true
  });

  const [inviteStudentId, setInviteStudentId] = useState('');

  const createGroup = () => {
    // In a real app, this would call an API to create the group
    console.log('Creating new group:', newGroup);
    setShowCreateModal(false);
    setNewGroup({ name: '', subject: '', description: '', isPublic: true });
  };

  const inviteToGroup = () => {
    // In a real app, this would call an API to invite the student
    console.log('Inviting student:', inviteStudentId, 'to group:', selectedGroup?.name);
    setShowInviteModal(false);
    setInviteStudentId('');
  };

  const joinGroup = (groupId) => {
    // In a real app, this would call an API to join the group
    console.log('Joining group:', groupId);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiUsers className="mr-2 text-blue-600" /> Study Groups
        </h2>
        <p className="text-gray-600">Collaborate with peers and achieve your study goals together</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('my-groups')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'my-groups' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            My Groups
          </button>
          <button 
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'discover' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Discover
          </button>
          {selectedGroup && (
            <button 
              onClick={() => setActiveTab('group-detail')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'group-detail' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {selectedGroup.name}
            </button>
          )}
        </div>
      </div>

      {/* My Groups View */}
      {activeTab === 'my-groups' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">My Study Groups</h3>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FiPlus className="mr-2" /> Create Group
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map(group => (
              <div 
                key={group.id} 
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedGroup(group);
                  setActiveTab('group-detail');
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-800">{group.name}</h4>
                  {group.unreadMessages > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {group.unreadMessages} new
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
                    {group.subject}
                  </span>
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FiCalendar className="mr-2" />
                  <span>{group.upcomingSession}</span>
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm">
                  View Group
                </button>
              </div>
            ))}
          </div>

          {myGroups.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <FiUsers className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">You haven't joined any groups yet</h3>
              <p className="text-gray-600 mb-4">Join existing groups or create your own to start studying with peers</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center mx-auto"
              >
                <FiPlus className="mr-2" /> Create Your First Group
              </button>
            </div>
          )}
        </div>
      )}

      {/* Discover Groups View */}
      {activeTab === 'discover' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Discover Groups</h3>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search groups..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGroups.map(group => (
              <div key={group.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-800">{group.name}</h4>
                  {!group.isPublic && (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      Private
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
                    {group.subject}
                  </span>
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FiCalendar className="mr-2" />
                  <span>{group.upcomingSession}</span>
                </div>
                <button 
                  onClick={() => joinGroup(group.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
                >
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Detail View */}
      {activeTab === 'group-detail' && selectedGroup && (
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{selectedGroup.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
                    {selectedGroup.subject}
                  </span>
                  <span>{selectedGroup.members} members</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center text-sm"
                >
                  <FiUserPlus className="mr-2" /> Invite
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center text-sm">
                  <FiSettings className="mr-2" /> Settings
                </button>
              </div>
            </div>

            <div className="flex space-x-4 border-b border-gray-200">
              <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">Chat</button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600">Resources</button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600">Study Goals</button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600">Schedule</button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600">Members</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Panel */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
              <h4 className="font-semibold text-gray-800 mb-4">Group Chat</h4>
              
              <div className="h-96 overflow-y-auto mb-4 space-y-4">
                {groupMessages.map(message => (
                  <div key={message.id} className={`flex ${message.user === 'You' ? 'justify-end' : ''}`}>
                    <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${message.user === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <div className="font-medium text-sm text-gray-700">{message.user}</div>
                      <p className="text-gray-800">{message.text}</p>
                      <div className="text-xs text-gray-500 text-right mt-1">{message.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg">
                  <FiPaperclip size={20} />
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                  <FiSend size={20} />
                </button>
              </div>
            </div>

            {/* Group Info Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Session */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FiCalendar className="mr-2" /> Upcoming Session
                </h4>
                <div className="text-center py-4">
                  <p className="text-gray-600">No sessions scheduled</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                    Schedule a session
                  </button>
                </div>
              </div>

              {/* Study Goals */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FiCheckSquare className="mr-2" /> Group Goals
                </h4>
                <div className="space-y-3">
                  {studyGoals.map(goal => (
                    <div key={goal.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${goal.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                        {goal.completed && <FiCheck size={12} />}
                      </div>
                      <div className="flex-1 ml-3">
                        <p className={`text-sm ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {goal.text}
                        </p>
                        <p className="text-xs text-gray-500">{goal.completedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 text-sm">
                  Add new goal
                </button>
              </div>

              {/* Recent Resources */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FiBook className="mr-2" /> Recent Resources
                </h4>
                <div className="space-y-3">
                  {sharedResources.map(resource => (
                    <div key={resource.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 text-blue-800 rounded-lg mr-3">
                        <FiFileText size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{resource.name}</p>
                        <p className="text-xs text-gray-500">By {resource.uploadedBy} • {resource.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 text-sm">
                  View all resources
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Study Group</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Advanced Calculus Study Group"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mathematics"
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup({...newGroup, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  placeholder="What is this group about?"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="isPublic"
                  checked={newGroup.isPublic}
                  onChange={(e) => setNewGroup({...newGroup, isPublic: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  Public group (anyone can join)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={createGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Invite to Group</h3>
            <p className="text-gray-600 mb-4">Invite a student to join {selectedGroup?.name}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input 
                type="text" 
                placeholder="Enter student ID"
                value={inviteStudentId}
                onChange={(e) => setInviteStudentId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={inviteToGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupStudy;