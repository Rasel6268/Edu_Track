import React from 'react';

const Analytics = () => {
    return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <p className="text-gray-600">Detailed analytics and metrics</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Performance Metrics</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm">Last Week</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Last Month</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Last Year</button>
          </div>
        </div>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Analytics chart visualization</p>
        </div>
      </div>
    </>
  );
};

export default Analytics;