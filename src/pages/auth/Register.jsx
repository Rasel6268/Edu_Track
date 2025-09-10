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
  FaIdCard,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const { Userregister } = useAuth();

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

      // Send remaining data to your backend
      const res = await fetch("http://localhost:5000/students/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok) {
        toast.success("Registration Successful! Welcome aboard.");
      } else {
        toast.error(resData.message || "Backend registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 md:p-6 py-16">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side: Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                Join Our Learning Community
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Create your account to access exclusive resources
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 md:mb-8">
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
                <div className="space-y-4 md:space-y-5 animate-fadeIn">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    <FaUser className="mr-2 text-indigo-600" /> Personal Info
                  </h2>

                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Gender *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["male", "female"].map((g) => (
                        <label
                          key={g}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer text-sm md:text-base ${
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
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number required",
                        })}
                        placeholder="+8801XXXXXXXXX"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition-colors text-sm md:text-base"
                  >
                    Continue to Academic Info →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 md:space-y-5 animate-fadeIn">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-indigo-600" /> Academic
                    Info
                  </h2>

                  {/* College */}
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      College / University *
                    </label>
                    <input
                      type="text"
                      {...register("college", {
                        required: "College is required",
                      })}
                      placeholder="Jagannath University"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
                    />
                    {errors.college && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.college.message}
                      </p>
                    )}
                  </div>

                  {/* Student ID */}
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Student ID *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("studentId", {
                          required: "Student ID required",
                        })}
                        placeholder="2021-12345"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Major *
                    </label>
                    <select
                      {...register("major", { required: true })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Year *
                    </label>
                    <select
                      {...register("year", { required: true })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                      className="bg-gray-200 text-gray-700 px-4 md:px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 md:space-y-5 animate-fadeIn">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    <FaLock className="mr-2 text-indigo-600" /> Account Details
                  </h2>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        {...register("email", { required: "Email required" })}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                    <label className="block text-gray-700 mb-1 text-sm md:text-base">
                      Password *
                    </label>
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
                        className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
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
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition-colors text-sm md:text-base"
                  >
                    🎓 Create Account
                  </button>

                  <div className="my-4 text-center text-gray-500 text-sm md:text-base">
                    or
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    <FaGoogle className="mr-2 text-red-500" /> Sign up with Google
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Side: Images & Stats */}
        <div className="hidden lg:block space-y-6">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Students collaborating"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Collaborative Learning
                    </h3>
                    <p className="text-indigo-200 text-xs">
                      Work together to achieve academic excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group mt-8">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Graduation celebration"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Lifelong Connections
                    </h3>
                    <p className="text-indigo-200 text-xs">
                      Build lasting relationships beyond graduation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Academic success"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Academic Excellence
                    </h3>
                    <p className="text-indigo-200 text-xs">
                      Reach your full potential with us
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative group mt-8">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
              <div className="relative h-56 rounded-xl overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Innovation and growth"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Innovation & Growth
                    </h3>
                    <p className="text-indigo-200 text-xs">
                      Be part of groundbreaking changes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-2xl md:text-3xl font-bold text-indigo-600">10K+</h4>
              <p className="text-gray-600 text-xs md:text-sm mt-2">Active Members</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-2xl md:text-3xl font-bold text-purple-600">95%</h4>
              <p className="text-gray-600 text-xs md:text-sm mt-2">Success Rate</p>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
              <h4 className="text-2xl md:text-3xl font-bold text-pink-600">24/7</h4>
              <p className="text-gray-600 text-xs md:text-sm mt-2">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;