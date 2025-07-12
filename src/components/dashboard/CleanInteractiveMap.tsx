import React, { useState, useEffect } from 'react';

interface CleanMapProps {
  onSiteSelect?: (siteId: string) => void;
}

const CleanInteractiveMap: React.FC<CleanMapProps> = ({ onSiteSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Enhanced sample data with global coordinates
  const monitoringSites = [
    { 
      id: 'site-1', 
      name: 'North Dakota Agricultural Zone', 
      severity: 'high', 
      type: 'Pesticides', 
      level: '85 ppm',
      coordinates: { lat: 47.5515, lng: -101.0020 },
      description: 'Elevated pesticide contamination in agricultural areas'
    },
    { 
      id: 'site-2', 
      name: 'Amazon Rainforest, Brazil', 
      severity: 'moderate', 
      type: 'Deforestation Chemicals', 
      level: '42 ppm',
      coordinates: { lat: -3.4653, lng: -62.2159 },
      description: 'Chemical contamination from deforestation activities'
    },
    { 
      id: 'site-3', 
      name: 'Sahara Desert, Morocco', 
      severity: 'high', 
      type: 'Industrial Waste', 
      level: '127 ppm',
      coordinates: { lat: 31.7917, lng: -7.0926 },
      description: 'High industrial waste contamination levels'
    },
    { 
      id: 'site-4', 
      name: 'Central Europe, Germany', 
      severity: 'low', 
      type: 'Microplastics', 
      level: '12 ppm',
      coordinates: { lat: 51.1657, lng: 10.4515 },
      description: 'Low levels of microplastic contamination'
    },
    { 
      id: 'site-5', 
      name: 'Siberian Tundra, Russia', 
      severity: 'moderate', 
      type: 'Permafrost Chemicals', 
      level: '38 ppm',
      coordinates: { lat: 66.5950, lng: 66.5950 },
      description: 'Moderate contamination from melting permafrost'
    },
    { 
      id: 'site-6', 
      name: 'Great Barrier Reef, Australia', 
      severity: 'high', 
      type: 'Ocean Acidification', 
      level: '89 ppm',
      coordinates: { lat: -18.2871, lng: 147.6992 },
      description: 'High ocean acidification contamination'
    },
    { 
      id: 'site-7', 
      name: 'Ganges Delta, India', 
      severity: 'high', 
      type: 'Heavy Metals', 
      level: '95 ppm',
      coordinates: { lat: 22.9734, lng: 90.6309 },
      description: 'Severe heavy metal contamination in waterways'
    },
    { 
      id: 'site-8', 
      name: 'Antarctic Peninsula', 
      severity: 'low', 
      type: 'Radiological', 
      level: '3 ppm',
      coordinates: { lat: -63.2467, lng: -57.0000 },
      description: 'Low radiological contamination detected'
    },
    { 
      id: 'site-9', 
      name: 'Nile Delta, Egypt', 
      severity: 'moderate', 
      type: 'Agricultural Runoff', 
      level: '28 ppm',
      coordinates: { lat: 31.0409, lng: 31.3785 },
      description: 'Moderate contamination from agricultural runoff'
    },
    { 
      id: 'site-10', 
      name: 'Canadian Arctic', 
      severity: 'moderate', 
      type: 'Oil Spill Residue', 
      level: '52 ppm',
      coordinates: { lat: 74.7118, lng: -95.0000 },
      description: 'Moderate oil contamination in Arctic waters'
    },
    { 
      id: 'site-11', 
      name: 'Tokyo Bay, Japan', 
      severity: 'high', 
      type: 'Industrial Chemicals', 
      level: '103 ppm',
      coordinates: { lat: 35.6762, lng: 139.6503 },
      description: 'High industrial chemical contamination'
    },
    { 
      id: 'site-12', 
      name: 'Congo Basin, Africa', 
      severity: 'moderate', 
      type: 'Mining Waste', 
      level: '45 ppm',
      coordinates: { lat: -0.2280, lng: 15.8277 },
      description: 'Moderate mining waste contamination'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          color: '#DC2626', // Clean red
          bgColor: '#FEE2E2',
          textColor: '#991B1B',
          borderColor: '#FECACA'
        };
      case 'moderate':
        return {
          color: '#EA580C', // Clean orange
          bgColor: '#FED7AA',
          textColor: '#C2410C',
          borderColor: '#FDBA74'
        };
      case 'low':
        return {
          color: '#16A34A', // Clean green
          bgColor: '#DCFCE7',
          textColor: '#15803D',
          borderColor: '#BBF7D0'
        };
      default:
        return {
          color: '#6B7280',
          bgColor: '#F3F4F6',
          textColor: '#374151',
          borderColor: '#D1D5DB'
        };
    }
  };

  // Convert lat/lng to screen coordinates for world map
  const convertToScreenCoords = (lat: number, lng: number) => {
    // World bounding box: -90 to 90 lat, -180 to 180 lng
    const latMin = -90;
    const latMax = 90;
    const lngMin = -180;
    const lngMax = 180;
    
    const x = ((lng - lngMin) / (lngMax - lngMin)) * 100;
    const y = ((latMax - lat) / (latMax - latMin)) * 100; // Flip Y axis for screen coordinates
    
    return { x: `${x}%`, y: `${y}%` };
  };

  // Zoom and pan handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(0.5, zoom + delta), 4);
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleSiteClick = (siteId: string) => {
    setSelectedSite(siteId);
    if (onSiteSelect) {
      onSiteSelect(siteId);
    }
  };

  const stats = {
    total: monitoringSites.length,
    high: monitoringSites.filter(s => s.severity === 'high').length,
    moderate: monitoringSites.filter(s => s.severity === 'moderate').length,
    low: monitoringSites.filter(s => s.severity === 'low').length
  };

  return (
    <div 
      className="relative w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 rounded-lg overflow-hidden"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Clean Grid Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="worldGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#CBD5E1" className="dark:stroke-gray-600" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldGrid)" />
        </svg>
      </div>

      {isLoaded ? (
        <>
          {/* Map Content Container */}
          <div 
            className="relative w-full h-full p-6"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {/* Modern World Map SVG */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full opacity-60 dark:opacity-40"
                style={{ filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))' }}
              >
                {/* World Continents - Clean Modern Style */}
                <g fill="rgba(148, 163, 184, 0.25)" stroke="#94A3B8" strokeWidth="1.5" className="dark:fill-gray-600/30 dark:stroke-gray-500">
                  {/* North America */}
                  <path d="M80 120 Q60 100 50 130 Q45 160 55 190 Q70 220 100 215 Q130 210 150 190 Q170 170 165 145 Q160 120 140 110 Q120 105 100 110 Q90 115 80 120 Z" />
                  
                  {/* Greenland */}
                  <path d="M250 80 Q240 70 230 80 Q225 90 230 100 Q240 110 250 105 Q260 100 265 90 Q270 80 260 75 Q250 70 250 80 Z" />
                  
                  {/* South America */}
                  <path d="M160 250 Q145 240 135 260 Q130 280 135 300 Q140 320 145 340 Q150 360 155 380 Q160 400 170 420 Q180 400 185 380 Q190 360 185 340 Q180 320 175 300 Q170 280 165 260 Q162 250 160 250 Z" />
                  
                  {/* Europe */}
                  <path d="M420 100 Q410 90 400 100 Q395 110 400 120 Q410 130 420 125 Q430 120 435 110 Q440 100 435 95 Q430 90 420 95 Q415 97 420 100 Z" />
                  
                  {/* Africa */}
                  <path d="M400 160 Q385 150 375 170 Q370 190 375 210 Q380 230 385 250 Q390 270 395 290 Q400 310 410 330 Q420 310 425 290 Q430 270 425 250 Q420 230 415 210 Q410 190 405 170 Q402 160 400 160 Z" />
                  
                  {/* Asia */}
                  <path d="M450 90 Q430 80 440 100 Q450 120 470 130 Q490 140 520 145 Q550 150 580 155 Q610 160 640 165 Q670 170 700 175 Q730 180 760 175 Q790 170 780 150 Q770 130 750 135 Q730 140 710 145 Q690 150 670 155 Q650 160 630 165 Q610 170 590 165 Q570 160 550 155 Q530 150 510 145 Q490 140 470 135 Q455 125 450 90 Z" />
                  
                  {/* Australia */}
                  <path d="M700 310 Q685 300 675 315 Q670 330 680 340 Q695 350 710 345 Q725 340 730 330 Q735 320 725 315 Q715 310 700 315 Q695 312 700 310 Z" />
                  
                  {/* Antarctica */}
                  <path d="M50 420 Q150 415 250 418 Q350 421 450 424 Q550 427 650 430 Q750 433 850 430 Q950 427 950 445 Q850 448 750 451 Q650 454 550 451 Q450 448 350 445 Q250 442 150 439 Q50 436 50 420 Z" />
                </g>

                {/* Ocean Areas - Subtle */}
                <g fill="rgba(59, 130, 246, 0.08)" opacity="0.7">
                  <ellipse cx="200" cy="200" rx="40" ry="30" />
                  <ellipse cx="600" cy="220" rx="50" ry="35" />
                  <ellipse cx="800" cy="180" rx="35" ry="25" />
                </g>

                {/* Coordinate Grid - Minimal */}
                <g stroke="#CBD5E1" strokeWidth="0.5" fill="none" opacity="0.4" className="dark:stroke-gray-600 dark:opacity-0.2">
                  {/* Major latitude lines */}
                  <path d="M0 125 L1000 125" strokeDasharray="3,6" />
                  <path d="M0 250 L1000 250" strokeDasharray="3,6" />
                  <path d="M0 375 L1000 375" strokeDasharray="3,6" />
                  
                  {/* Major longitude lines */}
                  <path d="M200 0 L200 500" strokeDasharray="3,6" />
                  <path d="M400 0 L400 500" strokeDasharray="3,6" />
                  <path d="M600 0 L600 500" strokeDasharray="3,6" />
                  <path d="M800 0 L800 500" strokeDasharray="3,6" />
                </g>

                {/* Equator - Subtle Reference */}
                <path d="M0 250 L1000 250" stroke="#6366F1" strokeWidth="1" strokeDasharray="5,10" opacity="0.3" className="dark:stroke-blue-400" />
              </svg>
            </div>

            {/* Monitoring Sites */}
            <div className="relative w-full h-full">
              {monitoringSites.map((site, index) => {
                const config = getSeverityConfig(site.severity);
                const isSelected = selectedSite === site.id;
                const screenCoords = convertToScreenCoords(site.coordinates.lat, site.coordinates.lng);
                
                return (
                  <div
                    key={site.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ 
                      top: screenCoords.y, 
                      left: screenCoords.x,
                      animationDelay: `${index * 200}ms`
                    }}
                    onClick={() => handleSiteClick(site.id)}
                  >
                    {/* Main Marker */}
                    <div className="relative">
                      {/* Pulsing Ring for High Risk */}
                      {site.severity === 'high' && (
                        <div 
                          className="absolute inset-0 rounded-full animate-ping opacity-40"
                          style={{ 
                            backgroundColor: config.color,
                            transform: 'scale(1.5)'
                          }}
                        />
                      )}
                      
                      {/* Selection Ring */}
                      {isSelected && (
                        <div 
                          className="absolute inset-0 rounded-full animate-pulse"
                          style={{ 
                            backgroundColor: config.color,
                            opacity: 0.3,
                            transform: 'scale(2)'
                          }}
                        />
                      )}

                      {/* Marker Circle - Clean Design */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-300 ${
                          isSelected ? 'scale-125 shadow-lg' : 'group-hover:scale-110'
                        }`}
                        style={{ backgroundColor: config.color }}
                      />

                      {/* Site Number Badge */}
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                        <span className="text-xs font-semibold text-gray-700">{index + 1}</span>
                      </div>
                    </div>

                    {/* Tooltip - Enhanced Design */}
                    <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <div 
                        className="rounded-xl shadow-xl border p-3 min-w-[220px] backdrop-blur-sm"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          borderColor: config.borderColor 
                        }}
                      >
                        <div className="text-sm">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 leading-tight text-xs">{site.name}</h3>
                            <span 
                              className="px-2 py-0.5 rounded-full text-xs font-medium ml-2 whitespace-nowrap"
                              style={{ 
                                backgroundColor: config.bgColor,
                                color: config.textColor 
                              }}
                            >
                              {site.severity.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-xs text-gray-600">
                            <div><strong>Type:</strong> {site.type}</div>
                            <div><strong>Level:</strong> {site.level}</div>
                            <div className="text-xs text-gray-500">{site.description}</div>
                          </div>

                          {site.severity === 'high' && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center gap-1 text-red-700 text-xs font-medium">
                                <span>⚠️</span>
                                <span>Critical Priority</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Tooltip Arrow */}
                        <div 
                          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                          style={{
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid rgba(255, 255, 255, 0.95)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zoom Controls - Bottom Right */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-40">
            <button
              onClick={() => setZoom(Math.min(zoom * 1.3, 4))}
              className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-200"
              title="Zoom In"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button
              onClick={() => setZoom(Math.max(zoom * 0.7, 0.4))}
              className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-200"
              title="Zoom Out"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 12H6" />
              </svg>
            </button>
            <button
              onClick={resetView}
              className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-200"
              title="Reset View"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Legend & Controls - Top Right */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 p-4 z-30 max-w-xs">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">Global Monitoring</span>
            </div>

            {/* Total Sites */}
            <div className="mb-3">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.total} Sites</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Actively Monitored Worldwide</div>
            </div>

            {/* Risk Levels */}
            <div className="space-y-2 mb-3">
              {[
                { severity: 'high', label: 'High Risk', count: stats.high, desc: 'Immediate attention' },
                { severity: 'moderate', label: 'Moderate Risk', count: stats.moderate, desc: 'Monitor closely' },
                { severity: 'low', label: 'Low Risk', count: stats.low, desc: 'Routine monitoring' }
              ].map(({ severity, label, count, desc }) => {
                const config = getSeverityConfig(severity);
                return (
                  <div key={severity} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: config.color }}
                      />
                      <div>
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Controls */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Controls</div>
                <div>• Scroll to zoom</div>
                <div>• Drag to pan</div>
                <div>• Hover for details</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Loading State */
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="relative mb-4">
              <svg className="animate-spin mx-auto h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Loading Global Environmental Map</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Initializing worldwide monitoring network visualization...</p>
            <div className="flex items-center justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanInteractiveMap;
