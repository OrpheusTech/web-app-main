import React from 'react';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Environmental Intelligence Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Sites Monitored</h3>
              <p className="text-3xl font-bold text-blue-600">127</p>
              <p className="text-sm text-blue-700 mt-1">Across 12 states</p>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-red-900 mb-2">High Risk Sites</h3>
              <p className="text-3xl font-bold text-red-600">23</p>
              <p className="text-sm text-red-700 mt-1">Requiring immediate attention</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Remediated Sites</h3>
              <p className="text-3xl font-bold text-green-600">89</p>
              <p className="text-sm text-green-700 mt-1">Successfully cleaned</p>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Interactive Map Loading...
            </h2>
            <p className="text-gray-600">
              The enhanced dashboard with interactive map, AI-powered search, and real-time data visualization is being loaded.
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading enhanced features...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
