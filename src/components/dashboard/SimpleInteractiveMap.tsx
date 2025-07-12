import React, { useEffect, useRef, useState } from 'react';

interface SimpleMapProps {
  data?: any[];
  selectedSite?: string | null;
  showHeatmap?: boolean;
  mapStyle?: string;
  animateMarkers?: boolean;
  enableClustering?: boolean;
  onSiteSelect?: (siteId: string) => void;
}

const SimpleInteractiveMap: React.FC<SimpleMapProps> = (props) => {
  const [mapReady, setMapReady] = useState(false);

  // Sample data for display
  const sampleSites = [
    { id: '1', name: 'North Dakota Agricultural Zone', severity: 'high', type: 'Pesticides', level: '85 ppm' },
    { id: '2', name: 'Iowa Corn Belt', severity: 'moderate', type: 'Heavy Metals', level: '42 ppm' },
    { id: '3', name: 'Texas Industrial Corridor', severity: 'high', type: 'Industrial Waste', level: '127 ppm' },
    { id: '4', name: 'California Central Valley', severity: 'low', type: 'Microplastics', level: '12 ppm' },
    { id: '5', name: 'Illinois Prairie', severity: 'moderate', type: 'Organic Solvents', level: '38 ppm' },
    { id: '6', name: 'Nebraska Farmland', severity: 'low', type: 'Fertilizer Runoff', level: '8 ppm' },
    { id: '7', name: 'Kansas Wheat Fields', severity: 'moderate', type: 'Heavy Metals', level: '55 ppm' },
    { id: '8', name: 'Montana Ranch Country', severity: 'low', type: 'Radiological', level: '3 ppm' },
    { id: '9', name: 'Michigan Agricultural Belt', severity: 'high', type: 'Pesticides', level: '92 ppm' },
    { id: '10', name: 'Minnesota Lakes Region', severity: 'moderate', type: 'Microplastics', level: '28 ppm' }
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'moderate': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleSiteClick = (siteId: string) => {
    if (props.onSiteSelect) {
      props.onSiteSelect(siteId);
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B5563' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        />
      </div>

      {/* Map Content */}
      {mapReady ? (
        <div className="relative h-full w-full p-8">
          {/* Simulated US Map with site markers */}
          <div className="relative w-full h-full">
            {/* US outline background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg viewBox="0 0 500 300" className="w-full h-full max-w-lg">
                <path
                  d="M100 150 Q150 100 200 120 Q250 80 300 100 Q350 90 400 120 Q420 140 400 180 Q380 200 350 190 Q300 210 250 200 Q200 220 150 200 Q120 180 100 150"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="2"
                  className="opacity-40"
                />
              </svg>
            </div>

            {/* Site markers */}
            <div className="absolute inset-0">
              {sampleSites.map((site, index) => {
                const positions = [
                  { top: '30%', left: '25%' }, // North Dakota
                  { top: '45%', left: '35%' }, // Iowa
                  { top: '70%', left: '40%' }, // Texas
                  { top: '60%', left: '15%' }, // California
                  { top: '40%', left: '38%' }, // Illinois
                  { top: '50%', left: '45%' }, // Nebraska
                  { top: '55%', left: '42%' }, // Kansas
                  { top: '25%', left: '50%' }, // Montana
                  { top: '35%', left: '48%' }, // Michigan
                  { top: '30%', left: '45%' }  // Minnesota
                ];

                const position = positions[index] || { top: '50%', left: '50%' };

                return (
                  <div
                    key={site.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ top: position.top, left: position.left }}
                    onClick={() => handleSiteClick(site.id)}
                  >
                    {/* Marker */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-125 ${
                        site.severity === 'high' ? 'animate-pulse' : ''
                      }`}
                      style={{ backgroundColor: getSeverityColor(site.severity) }}
                    />
                    
                    {/* Ripple effect for high risk */}
                    {site.severity === 'high' && (
                      <div
                        className="absolute top-0 left-0 w-4 h-4 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: getSeverityColor(site.severity) }}
                      />
                    )}

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800 mb-1">{site.name}</div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div><strong>Type:</strong> {site.type}</div>
                          <div><strong>Level:</strong> {site.level}</div>
                          <div className="flex items-center gap-1">
                            <strong>Severity:</strong>
                            <span 
                              className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                site.severity === 'high' ? 'bg-red-100 text-red-700' :
                                site.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}
                            >
                              {site.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Loading State */
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="mb-4">
              <svg className="animate-spin mx-auto h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Interactive Map</h3>
            <p className="text-gray-600 text-sm">Initializing environmental monitoring visualization...</p>
          </div>
        </div>
      )}

      {/* Legend */}
      {mapReady && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-[1000]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">Contamination Levels</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">High Risk ({sampleSites.filter(s => s.severity === 'high').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Moderate Risk ({sampleSites.filter(s => s.severity === 'moderate').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Low Risk ({sampleSites.filter(s => s.severity === 'low').length})</span>
            </div>
          </div>
        </div>
      )}

      {/* Site Counter */}
      {mapReady && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-[1000]">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">
              {sampleSites.length} Sites Monitored
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Hover markers for details
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleInteractiveMap;
