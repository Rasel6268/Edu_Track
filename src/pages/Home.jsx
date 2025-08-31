import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  FaCalendarAlt, FaBook, FaGraduationCap, FaMoneyBillWave, 
  FaSmile, FaUsers, FaBell, FaTrophy, FaClock, FaCheckCircle, 
  FaChartLine, FaLightbulb, FaUserFriends, FaDownload, 
  FaArrowRight, FaPlay, FaStar, FaQuoteLeft
} from "react-icons/fa";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

export default function OverviewPage() {
  const [counters, setCounters] = useState({ students: 0, groups: 0, tasks: 0, quizzes: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const {user} = useAuth()
 
  
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        students: prev.students < 12500 ? prev.students + 100 : 12500,
        groups: prev.groups < 3200 ? prev.groups + 50 : 3200,
        tasks: prev.tasks < 98000 ? prev.tasks + 500 : 98000,
        quizzes: prev.quizzes < 45000 ? prev.quizzes + 200 : 45000
      }));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { 
      icon: <FaCalendarAlt className="text-3xl text-blue-600" />, 
      title: "Class Schedule Tracker", 
      description: "Never miss a class with reminders and attendance tracking.",
      color: "from-blue-500 to-blue-700"
    },
    { 
      icon: <FaBook className="text-3xl text-purple-600" />, 
      title: "Study Planner & Pomodoro", 
      description: "Plan your tasks, focus, and track study progress.",
      color: "from-purple-500 to-purple-700"
    },
    { 
      icon: <FaGraduationCap className="text-3xl text-green-600" />, 
      title: "Exam Q&A Generator", 
      description: "Generate AI-powered practice questions for exams.",
      color: "from-green-500 to-green-700"
    },
    { 
      icon: <FaMoneyBillWave className="text-3xl text-yellow-600" />, 
      title: "Budget Tracker", 
      description: "Track expenses and pocket money easily.",
      color: "from-yellow-500 to-yellow-700"
    },
    { 
      icon: <FaSmile className="text-3xl text-pink-600" />, 
      title: "Mood Tracker & Motivation", 
      description: "Monitor mood, get tips, and stay motivated.",
      color: "from-pink-500 to-pink-700"
    },
    { 
      icon: <FaUsers className="text-3xl text-indigo-600" />, 
      title: "Group Study & Social", 
      description: "Collaborate with peers and share study resources.",
      color: "from-indigo-500 to-indigo-700"
    },
    { 
      icon: <FaBell className="text-3xl text-red-600" />, 
      title: "Smart Notifications", 
      description: "AI-based reminders and suggestions for better productivity.",
      color: "from-red-500 to-red-700"
    },
    { 
      icon: <FaTrophy className="text-3xl text-orange-600" />, 
      title: "Gamification & Progress", 
      description: "Earn badges, points, and track your streaks.",
      color: "from-orange-500 to-orange-700"
    }
  ];

  const benefits = [
    { 
      icon: <FaClock className="text-2xl text-blue-600" />, 
      title: "Saves Time", 
      description: "Manage classes, tasks, and studies in one place.",
      stats: "Save up to 10 hours weekly"
    },
    { 
      icon: <FaCheckCircle className="text-2xl text-green-600" />, 
      title: "Better Exam Prep", 
      description: "AI-generated study help for improved exam performance.",
      stats: "92% report better grades"
    },
    { 
      icon: <FaChartLine className="text-2xl text-purple-600" />, 
      title: "Financial Control", 
      description: "Keep finances and expenses in check with smart tracking.",
      stats: "Reduce unnecessary spending by 35%"
    },
    { 
      icon: <FaLightbulb className="text-2xl text-yellow-600" />, 
      title: "Stay Motivated", 
      description: "Gamification, streaks, and mood tracking keep you going.",
      stats: "87% higher consistency"
    },
    { 
      icon: <FaUserFriends className="text-2xl text-indigo-600" />, 
      title: "Collaborative Learning", 
      description: "Study with peers in a social, collaborative environment.",
      stats: "2.5x more engagement"
    },
    { 
      icon: <FaDownload className="text-2xl text-pink-600" />, 
      title: "All-in-One Solution", 
      description: "Everything you need for student life in a single app.",
      stats: "8 apps in 1"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      text: "This app transformed how I manage my studies. The exam generator alone is worth it!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Engineering Student",
      text: "Finally, an app that understands student life. The budget tracker saved me from overspending!",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Medical Student",
      text: "The study planner and mood tracker keep me balanced during stressful exam periods.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      rating: 4
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: ["Basic schedule tracking", "Limited study planner", "3 exam generators per month", "Basic budget tracking"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro Student",
      price: "$4.99",
      period: "per month",
      description: "Everything you need to excel",
      features: ["Unlimited schedule tracking", "Advanced study planner", "Unlimited exam generators", "Advanced budget analytics", "Mood tracking", "Group study features"],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Campus Plan",
      price: "Custom",
      period: "per institution",
      description: "For universities and colleges",
      features: ["All Pro features", "Campus-wide analytics", "Custom branding", "Dedicated support", "Integration with LMS", "Admin dashboard"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/4 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -right-20 top-2/3 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute left-1/2 bottom-0 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-ping"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ x: -50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium">Trusted by 125,000+ students worldwide</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your All-in-One <span className="text-yellow-300">Student Life</span> Platform
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-md">
              Track classes, plan study, manage budget, boost productivity, and stay motivated — all in one app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button 
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free <FiArrowRight />
              </motion.button>
              <motion.button 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="text-sm" /> Watch Demo
              </motion.button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/40?img=${item}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-blue-100 text-sm">
                Join <span className="font-bold">12,500+</span> students already using StudyLife
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center relative"
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Student using app" 
                  className="w-full h-auto"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-white text-blue-900 p-4 rounded-2xl shadow-lg flex items-center z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-yellow-400 p-2 rounded-full mr-3">
                  <FaTrophy className="text-blue-900"/>
                </div>
                <div>
                  <p className="font-bold">98%</p>
                  <p className="text-xs">Satisfaction</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white text-blue-900 p-4 rounded-2xl shadow-lg z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 inline-block text-sm" />
                    ))}
                  </div>
                  <p className="font-bold">4.9/5</p>
                </div>
                <p className="text-xs">App Store Rating</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scrolling animation */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative" ref={ref}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Trusted by Students Worldwide
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of students who have transformed their academic journey
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(counters).map(([key, value], index) => (
              <motion.div 
                key={key} 
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-white"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">{value.toLocaleString()}+</h3>
                  <p className="text-gray-700 font-medium capitalize">
                    {key === "tasks" ? "Tasks Completed" : key === "quizzes" ? "Quizzes Generated" : key}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive features are designed to address every aspect of student life
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
                <div className="mt-4 text-center">
                  <button className="text-blue-600 font-medium text-sm flex items-center justify-center gap-1 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Designed for Modern Student Life</h2>
              <p className="text-gray-600 mb-6">
                Our intuitive interface makes it easy to manage all aspects of your student journey. 
                From tracking your class schedule to managing your budget, everything is just a tap away.
              </p>
              
              <div className="space-y-4">
                {[
                  "Clean, modern interface optimized for productivity",
                  "Sync across all your devices seamlessly",
                  "Customizable dashboard to fit your needs",
                  "Dark mode for late-night study sessions"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-1">
                      <FiCheck className="text-green-600" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                Explore Features <FiArrowRight />
              </button>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="App interface" 
                  className="rounded-2xl shadow-2xl z-10 relative"
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg z-20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaChartLine className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">35% more</p>
                      <p className="text-xs text-gray-600">productivity reported</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-tr from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Students Love StudyLife</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed to address the unique challenges students face everyday
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600 mb-3">{benefit.description}</p>
                    <div className="bg-gray-100 px-3 py-2 rounded-lg inline-block">
                      <p className="text-sm font-medium text-gray-800">{benefit.stats}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students who transformed their academic experience
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-12">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className={`absolute inset-0 p-8 md:p-12 transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === activeTestimonial ? 1 : 0 }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/3">
                      <div className="relative">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="rounded-2xl shadow-lg w-full max-w-xs mx-auto"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-white py-2 px-4 rounded-2xl shadow-md">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-sm" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      <FaQuoteLeft className="text-blue-600 text-4xl mb-6 opacity-30" />
                      <p className="text-xl text-gray-700 italic mb-8">"{testimonial.text}"</p>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for your student journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all transform hover:-translate-y-2 ${plan.popular ? 'border-2 border-blue-600 relative' : 'border border-gray-200'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    {plan.period !== "forever" && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-xl font-medium transition-colors ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Ready to Transform Your Student Life?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Join thousands of students who are already achieving more with less stress
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center gap-2 mx-auto">
              Start Your Smarter Student Life Today! <FiArrowRight />
            </button>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-blue-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Free to get started. No credit card required.
          </motion.p>
        </div>
      </section>
    </div>
  );
}