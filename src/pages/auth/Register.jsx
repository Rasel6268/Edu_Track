import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaBook,
  FaChartLine,
  FaUsers,
  FaCertificate,
  FaIdCard,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const { Userregister } = useAuth();
  console.log(Userregister);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const nextStep = async () => {
    let valid = false;
    if (step === 1) valid = await trigger(["fullName", "gender", "phone"]);
    if (step === 2)
      valid = await trigger(["college", "studentId", "major", "year"]);
    if (step === 3) valid = await trigger(["email", "password"]);
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data) => {
  const { email, password, ...rest } = data;

  try {
    
    await Userregister(email, password);

    // 2️⃣ Send remaining data to your backend
    const res = await fetch("http://localhost:5000/students/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      toast.success("Registration Successful! Welcome aboard.");
      console.log(resData);
    } else {
      toast.error(resData.message || "Backend registration failed");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Left Side - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">
              Join Our Learning Community
            </h1>
            <p className="text-gray-600 mt-2">
              Create your account to access exclusive resources
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 mx-1 rounded-full ${
                    step >= s ? "bg-indigo-600" : "bg-gray-300"
                  } transition-all`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-semibold">
              <span className={step >= 1 ? "text-indigo-600" : ""}>
                Personal
              </span>
              <span className={step >= 2 ? "text-indigo-600" : ""}>
                Academic
              </span>
              <span className={step >= 3 ? "text-indigo-600" : ""}>
                Account
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <FaUser className="mr-2 text-indigo-600" /> Personal Info
                </h2>

                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 mb-1">Gender *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["male", "female"].map((g) => (
                      <label
                        key={g}
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          watch("gender") === g
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          value={g}
                          {...register("gender", { required: true })}
                          className="sr-only"
                        />
                        <span className="capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">
                      Please select gender
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone number required",
                      })}
                      placeholder="+8801XXXXXXXXX"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md"
                >
                  Continue to Academic Info →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <FaGraduationCap className="mr-2 text-indigo-600" /> Academic
                  Info
                </h2>

                {/* College */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    {...register("college", {
                      required: "College is required",
                    })}
                    placeholder="Jagannath University"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {errors.college && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.college.message}
                    </p>
                  )}
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Student ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("studentId", {
                        required: "Student ID required",
                      })}
                      placeholder="2021-12345"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <FaIdCard className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {errors.studentId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.studentId.message}
                    </p>
                  )}
                </div>

                {/* Major */}
                <div>
                  <label className="block text-gray-700 mb-1">Major *</label>
                  <select
                    {...register("major", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select Major</option>
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Economics</option>
                    <option>English</option>
                    <option>Other</option>
                  </select>
                  {errors.major && (
                    <p className="text-red-500 text-xs mt-1">
                      Major is required
                    </p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-gray-700 mb-1">Year *</label>
                  <select
                    {...register("year", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Graduate</option>
                  </select>
                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">
                      Year is required
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <FaLock className="mr-2 text-indigo-600" /> Account Details
                </h2>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email", { required: "Email required" })}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password required",
                        minLength: {
                          value: 8,
                          message: "Min 8 characters",
                        },
                      })}
                      placeholder="********"
                      className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md"
                >
                  🎓 Create Account
                </button>

                <div className="my-4 text-center text-gray-500">or</div>
                <button
                  type="button"
                  className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  <FaGoogle className="mr-2 text-red-500" /> Sign up with Google
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right Side - Image / Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-10">
        <img
          src="https://cdn.dribbble.com/users/1486701/screenshots/15118263/media/8a5af45ffb391d4c90c4f88c205a75a0.png?resize=800x600&vertical=center"
          alt="Education Illustration"
          className="w-full max-w-lg rounded-2xl shadow-2xl"
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
