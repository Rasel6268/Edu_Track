import React from 'react';

const Loader = () => {
    return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
            <div className="relative w-24 h-12 mx-auto mb-8">
            <div className="absolute w-16 h-4 bg-black rounded-t-lg top-0 left-4"></div>
            <div className="absolute w-24 h-2 bg-gray-700 top-4"></div>
            <div className="absolute w-8 h-8 bg-blue-600 rounded-full -bottom-2 left-8 animate-ping opacity-75"></div>
          </div>

          {/* Animated Pens */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="w-2 h-8 bg-blue-600 rounded-full transform rotate-12 animate-bounce"></div>
            <div className="w-2 h-8 bg-red-500 rounded-full transform -rotate-12 animate-bounce delay-200"></div>
            <div className="w-2 h-8 bg-green-500 rounded-full transform rotate-12 animate-bounce delay-300"></div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Preparing Your EduTrack</h2>
          <p className="text-gray-600 mb-6">Loading your academic resources...</p>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
          </div>

          {/* Subtle Education Elements */}
          <div className="flex justify-center space-x-8 mt-8 opacity-75">
            <div className="w-6 h-6 bg-purple-500 rounded-lg transform rotate-45 animate-pulse"></div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="w-6 h-6 bg-green-500 rounded-lg transform rotate-45 animate-pulse delay-300"></div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-progress {
            animation: progress 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
};

export default Loader;