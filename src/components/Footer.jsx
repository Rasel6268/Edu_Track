import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-800 dark:from-gray-900 dark:to-gray-800 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                EduSphere
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering students with the best learning tools and resources to achieve academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 dark:bg-gray-800 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 dark:bg-gray-800 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 dark:bg-gray-800 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-800 dark:bg-gray-800 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-cyan-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-cyan-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-cyan-500 rounded-full"></span>
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates and resources.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 rounded-lg bg-indigo-800 dark:bg-gray-800 border border-indigo-700 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
                required
              />
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-indigo-800 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EduSphere. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="text-gray-300 text-sm mr-2">Made with</span>
              <FaHeart className="text-red-500 mx-1" />
              <span className="text-gray-300 text-sm ml-2">by EduSphere Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}