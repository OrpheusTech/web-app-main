import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  Settings, 
  Layers, 
  Filter, 
  RotateCcw, 
  Maximize2, 
  Moon, 
  Sun, 
  Satellite,
  Map as MapIcon,
  Mountain,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
  Activity
} from 'lucide-react';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidG9tZm9sbGV0dCIsImEiOiJjbWN0cG55eTEwM3QxMm1vc3ZhbWNsbm14In0.XmKC7eHchn-DTc_2BxomGg';

interface MonitoringSite {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  severity: 'low' | 'moderate' | 'high';
  type: string;
  level: string;
  description: string;
  lastUpdated: string;
  source: 'industrial' | 'agricultural' | 'urban';
  status: 'active' | 'monitoring' | 'remediated';
}

interface MapFilters {
  severity: string[];
  types: string[];
  sources: string[];
  showActive: boolean;
  showMonitoring: boolean;
  showRemediated: boolean;
}

interface SettingsState {
  theme: 'light' | 'dark';
  updateInterval: number;
  showLabels: boolean;
  clusterMarkers: boolean;
  autoRefresh: boolean;
}

const InteractiveGlobalMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [selectedSite, setSelectedSite] = useState<MonitoringSite | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'light',
    updateInterval: 30,
    showLabels: true,
    clusterMarkers: false,
    autoRefresh: true
  });

  const [filters, setFilters] = useState<MapFilters>({
    severity: ['high', 'moderate', 'low'],
    types: [],
    sources: [],
    showActive: true,
    showMonitoring: true,
    showRemediated: false
  });

  // Sample monitoring sites data - in production this would come from your backend
  const [monitoringSites] = useState<MonitoringSite[]>([
    {
      id: 'site-1',
      name: 'North Dakota Agricultural Zone',
      coordinates: [-101.0020, 47.5515],
      severity: 'high',
      type: 'Pesticides',
      level: '85 ppm',
      description: 'Elevated pesticide contamination in agricultural areas',
      lastUpdated: '2025-01-12T10:30:00Z',
      source: 'agricultural',
      status: 'active'
    },
    {
      id: 'site-2',
      name: 'Amazon Rainforest, Brazil',
      coordinates: [-62.2159, -3.4653],
      severity: 'moderate',
      type: 'Deforestation Chemicals',
      level: '42 ppm',
      description: 'Chemical contamination from deforestation activities',
      lastUpdated: '2025-01-12T09:15:00Z',
      source: 'industrial',
      status: 'monitoring'
    },
    {
      id: 'site-3',
      name: 'Sahara Desert, Morocco',
      coordinates: [-7.0926, 31.7917],
      severity: 'high',
      type: 'Industrial Waste',
      level: '127 ppm',
      description: 'High industrial waste contamination levels',
      lastUpdated: '2025-01-12T08:45:00Z',
      source: 'industrial',
      status: 'active'
    },
    {
      id: 'site-4',
      name: 'Central Europe, Germany',
      coordinates: [10.4515, 51.1657],
      severity: 'low',
      type: 'Microplastics',
      level: '12 ppm',
      description: 'Low levels of microplastic contamination',
      lastUpdated: '2025-01-12T07:20:00Z',
      source: 'urban',
      status: 'monitoring'
    },
    {
      id: 'site-5',
      name: 'Siberian Tundra, Russia',
      coordinates: [66.5950, 66.5950],
      severity: 'moderate',
      type: 'Permafrost Chemicals',
      level: '38 ppm',
      description: 'Moderate contamination from melting permafrost',
      lastUpdated: '2025-01-12T06:10:00Z',
      source: 'industrial',
      status: 'monitoring'
    },
    {
      id: 'site-6',
      name: 'Great Barrier Reef, Australia',
      coordinates: [147.6992, -18.2871],
      severity: 'high',
      type: 'Ocean Acidification',
      level: '89 ppm',
      description: 'High ocean acidification contamination',
      lastUpdated: '2025-01-12T05:30:00Z',
      source: 'industrial',
      status: 'active'
    },
    {
      id: 'site-7',
      name: 'Ganges Delta, India',
      coordinates: [90.6309, 22.9734],
      severity: 'high',
      type: 'Heavy Metals',
      level: '95 ppm',
      description: 'Severe heavy metal contamination in waterways',
      lastUpdated: '2025-01-12T04:15:00Z',
      source: 'industrial',
      status: 'active'
    },
    {
      id: 'site-8',
      name: 'Antarctic Peninsula',
      coordinates: [-57.0000, -63.2467],
      severity: 'low',
      type: 'Radiological',
      level: '3 ppm',
      description: 'Low radiological contamination detected',
      lastUpdated: '2025-01-12T03:45:00Z',
      source: 'industrial',
      status: 'monitoring'
    },
    {
      id: 'site-9',
      name: 'Nile Delta, Egypt',
      coordinates: [31.3785, 31.0409],
      severity: 'moderate',
      type: 'Agricultural Runoff',
      level: '28 ppm',
      description: 'Moderate contamination from agricultural runoff',
      lastUpdated: '2025-01-12T02:20:00Z',
      source: 'agricultural',
      status: 'monitoring'
    },
    {
      id: 'site-10',
      name: 'Canadian Arctic',
      coordinates: [-95.0000, 74.7118],
      severity: 'moderate',
      type: 'Oil Spill Residue',
      level: '52 ppm',
      description: 'Moderate oil contamination in Arctic waters',
      lastUpdated: '2025-01-12T01:30:00Z',
      source: 'industrial',
      status: 'monitoring'
    },
    {
      id: 'site-11',
      name: 'Tokyo Bay, Japan',
      coordinates: [139.6503, 35.6762],
      severity: 'high',
      type: 'Industrial Chemicals',
      level: '103 ppm',
      description: 'High industrial chemical contamination',
      lastUpdated: '2025-01-12T00:45:00Z',
      source: 'industrial',
      status: 'active'
    },
    {
      id: 'site-12',
      name: 'Congo Basin, Africa',
      coordinates: [15.8277, -0.2280],
      severity: 'moderate',
      type: 'Mining Waste',
      level: '45 ppm',
      description: 'Moderate mining waste contamination',
      lastUpdated: '2025-01-11T23:15:00Z',
      source: 'industrial',
      status: 'monitoring'
    }
  ]);

  const getMapStyle = useCallback((style: string, theme: string) => {
    const baseStyles = {
      streets: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/streets-v12',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
      terrain: 'mapbox://styles/mapbox/outdoors-v12'
    };
    return baseStyles[style as keyof typeof baseStyles] || baseStyles.streets;
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'high': return '#DC2626'; // red-600
      case 'moderate': return '#EA580C'; // orange-600
      case 'low': return '#16A34A'; // green-600
      default: return '#6B7280'; // gray-500
    }
  }, []);

  const getSeverityConfig = useCallback((severity: string) => {
    switch (severity) {
      case 'high':
        return { color: '#DC2626', bgColor: '#FEE2E2', textColor: '#991B1B' };
      case 'moderate':
        return { color: '#EA580C', bgColor: '#FED7AA', textColor: '#C2410C' };
      case 'low':
        return { color: '#16A34A', bgColor: '#DCFCE7', textColor: '#15803D' };
      default:
        return { color: '#6B7280', bgColor: '#F3F4F6', textColor: '#374151' };
    }
  }, []);

  const initializeMap = useCallback(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: getMapStyle(mapStyle, settings.theme),
      center: [0, 20], // Center on world view
      zoom: 2,
      projection: 'globe' as any // Use globe projection for better world view
    });

    map.current.on('load', () => {
      setIsLoaded(true);
      
      // Add fog for 3D effect
      map.current!.setFog({
        color: 'rgb(186, 210, 235)', // Light blue
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness
        'space-color': 'rgb(11, 11, 25)', // Background color
        'star-intensity': 0.6 // Stars
      });

      // Enable globe transition at low zoom levels
      map.current!.on('zoom', () => {
        if (map.current!.getZoom() > 5) {
          map.current!.setProjection('mercator');
        } else {
          map.current!.setProjection('globe' as any);
        }
      });

      addMarkersToMap();
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-left');

  }, [mapStyle, settings.theme, getMapStyle]);

  const addMarkersToMap = useCallback(() => {
    if (!map.current || !isLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.custom-marker');
    markers.forEach(marker => marker.remove());

    // Filter sites based on current filters
    const filteredSites = monitoringSites.filter(site => {
      if (!filters.severity.includes(site.severity)) return false;
      if (filters.types.length > 0 && !filters.types.includes(site.type)) return false;
      if (filters.sources.length > 0 && !filters.sources.includes(site.source)) return false;
      
      switch (site.status) {
        case 'active': return filters.showActive;
        case 'monitoring': return filters.showMonitoring;
        case 'remediated': return filters.showRemediated;
        default: return true;
      }
    });

    filteredSites.forEach((site, index) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${getSeverityColor(site.severity)};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        z-index: ${1000 + index};
      `;

      // Add pulsing animation for high severity
      if (site.severity === 'high') {
        el.style.animation = 'pulse 2s infinite';
        const style = document.createElement('style');
        style.textContent = `
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 ${getSeverityColor(site.severity)}40; }
            70% { box-shadow: 0 0 0 10px transparent; }
            100% { box-shadow: 0 0 0 0 transparent; }
          }
        `;
        document.head.appendChild(style);
      }

      // Add hover effects
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
        el.style.zIndex = '2000';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.zIndex = `${1000 + index}`;
      });

      // Add click handler
      el.addEventListener('click', () => {
        setSelectedSite(site);
        map.current!.flyTo({
          center: site.coordinates,
          zoom: 8,
          duration: 2000
        });
      });

      // Create popup for hover
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">${site.name}</h3>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${getSeverityColor(site.severity)};"></span>
            <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 500;">${site.severity} Risk</span>
          </div>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;"><strong>Type:</strong> ${site.type}</p>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;"><strong>Level:</strong> ${site.level}</p>
          <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">${site.description}</p>
          <p style="margin: 4px 0 0 0; font-size: 10px; color: #9ca3af;">Click for details</p>
        </div>
      `);

      el.addEventListener('mouseenter', () => {
        popup.addTo(map.current!);
      });

      el.addEventListener('mouseleave', () => {
        popup.remove();
      });

      new mapboxgl.Marker(el)
        .setLngLat(site.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [monitoringSites, filters, getSeverityColor, isLoaded]);

  // Initialize map
  useEffect(() => {
    if (!map.current) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [initializeMap]);

  // Update map style when changed
  useEffect(() => {
    if (map.current && isLoaded) {
      map.current.setStyle(getMapStyle(mapStyle, settings.theme));
      map.current.once('styledata', addMarkersToMap);
    }
  }, [mapStyle, settings.theme, getMapStyle, addMarkersToMap, isLoaded]);

  // Update markers when filters change
  useEffect(() => {
    addMarkersToMap();
  }, [addMarkersToMap, filters]);

  const handleStyleChange = (style: 'streets' | 'satellite' | 'terrain') => {
    setMapStyle(style);
  };

  const resetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [0, 20],
        zoom: 2,
        duration: 2000
      });
      setSelectedSite(null);
    }
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings(prev => ({ ...prev, theme: newTheme }));
    setIsDarkMode(newTheme === 'dark');
  };

  const filteredStats = {
    total: monitoringSites.filter(site => {
      if (!filters.severity.includes(site.severity)) return false;
      if (filters.types.length > 0 && !filters.types.includes(site.type)) return false;
      if (filters.sources.length > 0 && !filters.sources.includes(site.source)) return false;
      switch (site.status) {
        case 'active': return filters.showActive;
        case 'monitoring': return filters.showMonitoring;
        case 'remediated': return filters.showRemediated;
        default: return true;
      }
    }).length,
    high: monitoringSites.filter(site => site.severity === 'high' && filters.severity.includes('high')).length,
    moderate: monitoringSites.filter(site => site.severity === 'moderate' && filters.severity.includes('moderate')).length,
    low: monitoringSites.filter(site => site.severity === 'low' && filters.severity.includes('low')).length
  };

  return (
    <div className={`relative w-full h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Floating Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
        {/* Left Controls */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Live Status Indicator */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Live Monitoring</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{filteredStats.total} sites</span>
            </div>
          </div>

          {/* Map Style Toggle */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 p-2">
            <div className="flex gap-1">
              <button
                onClick={() => handleStyleChange('streets')}
                className={`p-2 rounded-md transition-colors ${
                  mapStyle === 'streets' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title="Street View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStyleChange('satellite')}
                className={`p-2 rounded-md transition-colors ${
                  mapStyle === 'satellite' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title="Satellite View"
              >
                <Satellite className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStyleChange('terrain')}
                className={`p-2 rounded-md transition-colors ${
                  mapStyle === 'terrain' 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title="Terrain View"
              >
                <Mountain className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Quick Actions */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 p-2">
            <div className="flex gap-1">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-md transition-colors ${
                  showFilters 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title="Filters"
              >
                <Filter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowLayers(!showLayers)}
                className={`p-2 rounded-md transition-colors ${
                  showLayers 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title="Layers"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-md transition-colors ${
                  showSettings 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={resetView}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-20 left-4 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 z-20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Risk Levels */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Risk Levels</label>
                <div className="space-y-2">
                  {['high', 'moderate', 'low'].map(severity => {
                    const config = getSeverityConfig(severity);
                    return (
                      <label key={severity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.severity.includes(severity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                severity: [...prev.severity, severity]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                severity: prev.severity.filter(s => s !== severity)
                              }));
                            }
                          }}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: config.color }}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{severity} Risk</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.showActive}
                      onChange={(e) => setFilters(prev => ({ ...prev, showActive: e.target.checked }))}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active Sites</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.showMonitoring}
                      onChange={(e) => setFilters(prev => ({ ...prev, showMonitoring: e.target.checked }))}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Monitoring</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.showRemediated}
                      onChange={(e) => setFilters(prev => ({ ...prev, showRemediated: e.target.checked }))}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Remediated</span>
                  </label>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filtered Results</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{filteredStats.total}</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Sites</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-center">
                    <div className="font-bold text-red-700 dark:text-red-400">{filteredStats.high}</div>
                    <div className="text-red-600 dark:text-red-500">High Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layers Panel */}
      {showLayers && (
        <div className="absolute top-20 right-4 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 z-20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Map Layers
              </h3>
              <button
                onClick={() => setShowLayers(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showLabels}
                    onChange={(e) => setSettings(prev => ({ ...prev, showLabels: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Show Site Labels</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.clusterMarkers}
                    onChange={(e) => setSettings(prev => ({ ...prev, clusterMarkers: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Cluster Markers</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-20 right-4 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 z-20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>

              {/* Auto Refresh */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoRefresh}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoRefresh: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Auto Refresh Data</span>
                </label>
              </div>

              {/* Update Interval */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Update Interval (seconds)
                </label>
                <select
                  value={settings.updateInterval}
                  onChange={(e) => setSettings(prev => ({ ...prev, updateInterval: Number(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={10}>10 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site Detail Panel */}
      {selectedSite && (
        <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-600/50 z-20">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{selectedSite.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getSeverityColor(selectedSite.severity) }}
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                    {selectedSite.severity} Risk
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                    {selectedSite.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSite(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Contaminant:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedSite.type}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Level:</span>
                  <p className="text-gray-600 dark:text-gray-400">{selectedSite.level}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Source:</span>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">{selectedSite.source}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(selectedSite.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{selectedSite.description}</p>
              </div>

              {selectedSite.severity === 'high' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium text-sm">Critical Priority</span>
                  </div>
                  <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                    This site requires immediate attention and remediation efforts.
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                  View Details
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading Global Map</h3>
            <p className="text-gray-600 dark:text-gray-400">Initializing interactive environmental monitoring...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveGlobalMap;
