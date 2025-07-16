import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map-styles.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WorkingMapProps {
  data?: any[];
  selectedSite?: string | null;
  showHeatmap?: boolean;
  mapStyle?: string;
  animateMarkers?: boolean;
  enableClustering?: boolean;
  onSiteSelect?: (siteId: string) => void;
}

const WorkingMap: React.FC<WorkingMapProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Sample contamination data
  const sampleData = [
    { id: '1', name: 'North Dakota Agricultural Zone', lat: 47.5515, lng: -101.0020, severity: 'high', type: 'Pesticides', level: '85 ppm' },
    { id: '2', name: 'Iowa Corn Belt', lat: 42.0115, lng: -93.2105, severity: 'moderate', type: 'Heavy Metals', level: '42 ppm' },
    { id: '3', name: 'Texas Industrial Corridor', lat: 29.7755, lng: -95.3678, severity: 'high', type: 'Industrial Waste', level: '127 ppm' },
    { id: '4', name: 'California Central Valley', lat: 36.7783, lng: -119.4179, severity: 'low', type: 'Microplastics', level: '12 ppm' },
    { id: '5', name: 'Illinois Prairie', lat: 40.3363, lng: -89.0022, severity: 'moderate', type: 'Organic Solvents', level: '38 ppm' },
    { id: '6', name: 'Nebraska Farmland', lat: 41.2033, lng: -98.4842, severity: 'low', type: 'Fertilizer Runoff', level: '8 ppm' },
    { id: '7', name: 'Kansas Wheat Fields', lat: 38.5766, lng: -98.6087, severity: 'moderate', type: 'Heavy Metals', level: '55 ppm' },
    { id: '8', name: 'Montana Ranch Country', lat: 47.0527, lng: -109.6333, severity: 'low', type: 'Radiological', level: '3 ppm' },
    { id: '9', name: 'Michigan Agricultural Belt', lat: 44.2619, lng: -85.4220, severity: 'high', type: 'Pesticides', level: '92 ppm' },
    { id: '10', name: 'Minnesota Lakes Region', lat: 46.3944, lng: -94.6859, severity: 'moderate', type: 'Microplastics', level: '28 ppm' }
  ];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    console.log('Initializing map...'); // Debug log

    try {
      // Initialize the map
      const map = L.map(mapRef.current, {
        center: [39.8283, -98.5795], // Center of continental US
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
      });

      console.log('Map created successfully'); // Debug log

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      console.log('Tile layer added'); // Debug log

    // Function to get marker color based on severity
    const getMarkerColor = (severity: string) => {
      switch (severity) {
        case 'high': return '#EF4444';
        case 'moderate': return '#F59E0B';
        case 'low': return '#10B981';
        default: return '#6B7280';
      }
    };

    // Function to create custom icon
    const createCustomIcon = (severity: string) => {
      const color = getMarkerColor(severity);
      return L.divIcon({
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background-color: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ${severity === 'high' ? 'animation: pulse 2s infinite;' : ''}
          "></div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.7; }
              100% { transform: scale(1); opacity: 1; }
            }
          </style>
        `,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
    };

    // Add markers for each site
    sampleData.forEach((site, index) => {
      const marker = L.marker([site.lat, site.lng], {
        icon: createCustomIcon(site.severity)
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${site.name}</h3>
            <span style="
              background-color: ${site.severity === 'high' ? '#fee2e2' : site.severity === 'moderate' ? '#fef3c7' : '#d1fae5'};
              color: ${site.severity === 'high' ? '#dc2626' : site.severity === 'moderate' ? '#d97706' : '#059669'};
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 10px;
              font-weight: 600;
              text-transform: uppercase;
            ">${site.severity}</span>
          </div>
          <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
            <div style="margin-bottom: 4px;">
              <strong>Type:</strong> ${site.type}
            </div>
            <div style="margin-bottom: 4px;">
              <strong>Level:</strong> ${site.level}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>Coordinates:</strong> ${site.lat.toFixed(4)}, ${site.lng.toFixed(4)}
            </div>
            ${site.severity === 'high' ? `
              <div style="
                background-color: #fee2e2;
                border: 1px solid #fecaca;
                border-radius: 6px;
                padding: 6px;
                margin-top: 8px;
              ">
                <div style="display: flex; align-items: center; gap: 4px; color: #dc2626; font-size: 11px; font-weight: 600;">
                  ⚠️ High Risk Alert
                </div>
                <div style="color: #dc2626; font-size: 10px; margin-top: 2px;">
                  Immediate attention required. Exceeds safety thresholds.
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup'
      });

      // Add click handler
      marker.on('click', () => {
        if (props.onSiteSelect) {
          props.onSiteSelect(site.id);
        }
      });

      // Animate marker appearance with delay
      setTimeout(() => {
        marker.setOpacity(1);
      }, index * 200);
    });

    // Add zoom controls styling
    map.getContainer().style.borderRadius = '8px';      mapInstanceRef.current = map;

      console.log('Map setup complete with', sampleData.length, 'markers'); // Debug log
      setMapLoaded(true);

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(error instanceof Error ? error.message : 'Unknown error occurred');
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
      
      {/* Loading State */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
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

      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg flex items-center justify-center">
          <div className="text-center p-8">
            <div className="mb-4">
              <svg className="mx-auto h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Map Loading Error</h3>
            <p className="text-red-600 text-sm mb-4">{mapError}</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">10</div>
                  <div className="text-gray-600">Sites Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">4</div>
                  <div className="text-gray-600">High Risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Map Legend - Only show when map is loaded */}
      {mapLoaded && !mapError && (
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
              <span className="text-xs text-gray-600">High Risk ({sampleData.filter(s => s.severity === 'high').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Moderate Risk ({sampleData.filter(s => s.severity === 'moderate').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Low Risk ({sampleData.filter(s => s.severity === 'low').length})</span>
            </div>
          </div>
        </div>
      )}

      {/* Site Counter - Only show when map is loaded */}
      {mapLoaded && !mapError && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-[1000]">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">
              {sampleData.length} Sites Monitored
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Click markers for details
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkingMap;
