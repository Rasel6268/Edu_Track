import React, { useState } from 'react';

const StudentProfile = () => {
  const [student, setStudent] = useState({
    name: 'Alex Johnson',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80',
    studentId: 'STU-2023-7894',
    university: 'Stanford University',
    department: 'Computer Science',
    email: 'alex.johnson@stanford.edu',
    phone: '+1 (555) 123-4567',
    enrollmentDate: 'September 2021',
    expectedGraduation: 'May 2025',
    dateOfBirth: 'March 15, 2000',
    address: '123 University Ave, Stanford, CA 94305',
    gpa: '3.8',
    major: 'Artificial Intelligence',
    minor: 'Mathematics',
    advisor: 'Dr. Emily Chen'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({...student});

  const handleEdit = () => {
    setIsEditing(true);
    setEditedStudent({...student});
  };

  const handleSave = () => {
    setStudent({...editedStudent});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedStudent({...student});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 opacity-10">
        <svg className="w-24 h-24 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      </div>
      
      <div className="fixed bottom-10 right-10 opacity-10">
        <svg className="w-20 h-20 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header with Academic Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 text-white relative">
            <div className="absolute top-4 right-6 opacity-20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Student Profile</h1>
            <p className="opacity-90">Manage your academic information and personal details</p>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Profile Image and Basic Info */}
              <div className="lg:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-75 blur"></div>
                    <img
                      src={student.image}
                      alt={student.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg z-10"
                    />
                    <button className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full shadow-md hover:bg-indigo-600 transition z-20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedStudent.name}
                        onChange={handleChange}
                        className="text-center bg-gray-100 rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    ) : (
                      student.name
                    )}
                  </h2>
                  <p className="text-gray-600">
                    {isEditing ? (
                      <select
                        name="gender"
                        value={editedStudent.gender}
                        onChange={handleChange}
                        className="bg-gray-100 rounded-md px-2 py-1 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      student.gender
                    )}
                  </p>
                </div>

                {/* Student ID Card */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-5 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-20">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Student ID</h3>
                  <p className="text-center font-mono tracking-wide text-lg">{student.studentId}</p>
                  <div className="flex justify-center mt-4">
                    <div className="bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">AJ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Performance */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Academic Performance
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">GPA</span>
                    <span className="text-2xl font-bold text-indigo-600">{student.gpa}</span>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" style={{width: `${(student.gpa/4)*100}%`}}></div>
                  </div>
                </div>
              </div>

              {/* Right Column - Detailed Information */}
              <div className="lg:w-2/3">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6m0 0l-3-3m3 3l3-3m-5 6l-3-3m3 3l3-3"></path>
                    </svg>
                    Academic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">University</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="university"
                          value={editedStudent.university}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.university}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Department</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="department"
                          value={editedStudent.department}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.department}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Major</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="major"
                          value={editedStudent.major}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.major}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Minor</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="minor"
                          value={editedStudent.minor}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.minor}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Enrollment Date</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="enrollmentDate"
                          value={editedStudent.enrollmentDate}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.enrollmentDate}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Expected Graduation</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="expectedGraduation"
                          value={editedStudent.expectedGraduation}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.expectedGraduation}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Academic Advisor</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="advisor"
                          value={editedStudent.advisor}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.advisor}</span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 border-b pb-2 flex items-center">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Email</span>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedStudent.email}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.email}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Phone</span>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedStudent.phone}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.phone}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">Date of Birth</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="dateOfBirth"
                          value={editedStudent.dateOfBirth}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.dateOfBirth}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-col md:col-span-2">
                      <span className="text-gray-600 font-medium text-sm">Address</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editedStudent.address}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">{student.address}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;