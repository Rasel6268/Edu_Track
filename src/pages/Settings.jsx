import React from 'react';

const Settings = () => {
   return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Configure your application settings</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="john.doe@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>(GMT-08:00) Pacific Time</option>
              <option>(GMT-07:00) Mountain Time</option>
              <option>(GMT-06:00) Central Time</option>
              <option>(GMT-05:00) Eastern Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Notification Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="email-notifications" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                Email notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="push-notifications" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-700">
                Push notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="sms-notifications" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                SMS notifications
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg mr-3">Cancel</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
        </div>
      </div>
    </>
  );
};

export default Settings;