import React from 'react';

const SimpleMap: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Soil Dashboard</h2>
        <p className="text-gray-600">Map loading...</p>
        <div className="mt-4 w-full h-64 bg-green-200 rounded-lg flex items-center justify-center">
          <span className="text-green-800">🗺️ Map Container</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;
