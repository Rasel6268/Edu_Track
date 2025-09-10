import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const StudentProfile = () => {
  const API_URL = "https://edu-track-backend-zeta.vercel.app";
  const { user } = useAuth();
  const [student, setStudent] = useState({});
  const [editedStudent, setEditedStudent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/students?email=${user.email}`
        );

        const studentData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        setStudent(studentData);
        setEditedStudent(studentData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student data");
        setLoading(false);
        console.error("Error fetching student:", err);
      }
    };

    if (user?.email) {
      fetchStudentData();
    }
  }, [user]);

  const isMale =
    student.gender === "male"
      ? "https://i.ibb.co/CK5hcvzc/casual-guy-icon-bust-800-wht.png"
      : "https://i.ibb.co/KjDK5w7q/user-avatar-female-9.png";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedStudent(student);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/students/${student._id}`,
        editedStudent
      );

      // Handle both array and object responses
      const updatedStudent = Array.isArray(response.data.student)
        ? response.data.student[0]
        : response.data.student;

      setStudent(updatedStudent);
      setEditedStudent(updatedStudent);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update student data");
      console.error("Error updating student:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 opacity-10">
        <svg
          className="w-24 h-24 text-indigo-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      </div>

      <div className="fixed bottom-10 right-10 opacity-10">
        <svg
          className="w-20 h-20 text-indigo-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header with Academic Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 text-white relative">
            <div className="absolute top-4 right-6 opacity-20">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Student Profile</h1>
            <p className="opacity-90">
              Manage your academic information and personal details
            </p>
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
                      src={
                        (student.gender === "male"
                          ? "https://i.ibb.co/CK5hcvzc/casual-guy-icon-bust-800-wht.png"
                          : "https://i.ibb.co/KjDK5w7q/user-avatar-female-9.png")
                      }
                      alt={student.fullName}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg z-10"
                    />
                    <button className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full shadow-md hover:bg-indigo-600 transition z-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editedStudent.fullName || ""}
                        onChange={handleChange}
                        className="text-center bg-gray-100 rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    ) : (
                      student.fullName || "Not provided"
                    )}
                  </h2>
                  <p className="text-gray-600">
                    {isEditing ? (
                      <select
                        name="gender"
                        value={editedStudent.gender || ""}
                        onChange={handleChange}
                        className="bg-gray-100 rounded-md px-2 py-1 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : student.gender ? (
                      student.gender.charAt(0).toUpperCase() +
                      student.gender.slice(1)
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>

                {/* Student ID Card */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-5 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-20">
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Student ID</h3>
                  <p className="text-center font-mono tracking-wide text-lg">
                    {student.studentId || "Not assigned"}
                  </p>
                  <div className="flex justify-center mt-4">
                    <div className="bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {student.fullName
                            ? student.fullName.charAt(0).toUpperCase()
                            : "S"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Performance */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Academic Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Year</span>
                      <span className="font-semibold text-indigo-600">
                        {student.year || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Faculty</span>
                      <span className="font-semibold text-indigo-600">
                        {student.faculty || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {student.user_role
                          ? student.user_role.charAt(0).toUpperCase() +
                            student.user_role.slice(1)
                          : "Student"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Detailed Information */}
              <div className="lg:w-2/3">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                    <svg
                      className="w-5 h-5 text-indigo-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14v6m0 0l-3-3m3 3l3-3"
                      ></path>
                    </svg>
                    Academic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        University
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="college"
                          value={editedStudent.college || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">
                          {student.college || "Not provided"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Faculty
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="faculty"
                          value={editedStudent.faculty || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">
                          {student.faculty || "Not provided"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Department
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="department"
                          value={editedStudent.department || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">
                          {student.department || "Not provided"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Year
                      </span>
                      {isEditing ? (
                        <select
                          name="year"
                          value={editedStudent.year || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                          <option value="">Select Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="5th Year">5th Year</option>
                        </select>
                      ) : (
                        <span className="text-gray-800">
                          {student.year || "Not provided"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Student ID
                      </span>
                      <span className="text-gray-800 font-mono">
                        {student.studentId || "Not provided"}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Role
                      </span>
                      <span className="text-gray-800 capitalize">
                        {student.user_role || "student"}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4 border-b pb-2 flex items-center">
                    <svg
                      className="w-5 h-5 text-indigo-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Email
                      </span>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedStudent.email || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">
                          {student.email || "Not provided"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Phone
                      </span>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedStudent.phone || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      ) : (
                        <span className="text-gray-800">
                          {student.phone || "Not provided"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium text-sm">
                        Gender
                      </span>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={editedStudent.gender || ""}
                          onChange={handleChange}
                          className="bg-white rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <span className="text-gray-800 capitalize">
                          {student.gender || "Not provided"}
                        </span>
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
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
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
