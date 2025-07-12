import React from 'react';

interface SimpleMapProps {
  data?: any[];
  selectedSite?: string | null;
  showHeatmap?: boolean;
  mapStyle?: string;
  animateMarkers?: boolean;
  enableClustering?: boolean;
  onSiteSelect?: (siteId: string) => void;
}

const SimpleMap: React.FC<SimpleMapProps> = (props) => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
      <div className="text-center p-8">
        <div className="mb-4">
          <svg 
            className="mx-auto h-16 w-16 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Interactive Map
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Environmental monitoring visualization
        </p>
        <div className="space-y-2 text-xs text-gray-500">
          <div>📍 127 Sites Monitored</div>
          <div>🔴 23 High Risk • 🟡 31 Moderate • 🟢 73 Low Risk</div>
          <div>🗺️ Interactive features loading...</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;
