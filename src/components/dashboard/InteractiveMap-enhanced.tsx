import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, MapPin, Layers, ZoomIn, ZoomOut, Crosshair, Maximize2, X } from 'lucide-react';

// Contamination Data type definition
interface ContaminationData {
  id: string;
  location: string;
  coordinates: { lat: number; lng: number };
  type: string;
  level: number;
  unit: string;
  severity: 'low' | 'moderate' | 'high';
  source: string;
  lastDetected: string;
}

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  data: ContaminationData[];
  selectedSite?: string | null;
  showHeatmap?: boolean;
  mapStyle?: 'satellite' | 'street' | 'terrain' | 'dark';
  animateMarkers?: boolean;
  enableClustering?: boolean;
  onSiteSelect?: (siteId: string) => void;
}

// Custom animated marker component
const AnimatedMarker: React.FC<{
  position: [number, number];
  site: ContaminationData;
  isSelected: boolean;
  onSelect: () => void;
  animationDelay: number;
}> = ({ position, site, isSelected, onSelect, animationDelay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (site.severity === 'high') {
        setIsPulsing(true);
      }
    }, animationDelay * 100);

    return () => clearTimeout(timer);
  }, [animationDelay, site.severity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'moderate': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const createCustomIcon = () => {
    const color = getSeverityColor(site.severity);
    const pulseClass = isPulsing ? 'animate-pulse' : '';
    const scaleClass = isSelected ? 'scale-125' : 'scale-100';
    const opacityClass = isVisible ? 'opacity-100' : 'opacity-0';
    
    return L.divIcon({
      html: `
        <div class="relative transition-all duration-500 ${opacityClass} ${scaleClass}">
          <div class="w-6 h-6 rounded-full border-2 border-white shadow-lg ${pulseClass}" 
               style="background-color: ${color};">
          </div>
          ${isSelected ? `
            <div class="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-white animate-ping" 
                 style="background-color: ${color}; opacity: 0.6;">
            </div>
          ` : ''}
          ${site.severity === 'high' ? `
            <div class="absolute top-0 left-0 w-6 h-6 rounded-full animate-pulse" 
                 style="background-color: ${color}; opacity: 0.3;">
            </div>
          ` : ''}
        </div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <Marker
      position={position}
      icon={createCustomIcon()}
      eventHandlers={{
        click: onSelect,
      }}
    >
      <Popup className="custom-popup">
        <div className="p-2 min-w-[250px]">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">{site.location}</h3>
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${site.severity === 'high' ? 'bg-red-100 text-red-700' : 
                site.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-green-100 text-green-700'}
            `}>
              {site.severity.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{site.type.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Level:</span>
              <span className="font-medium">{site.level} {site.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Source:</span>
              <span className="font-medium">{site.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Detected:</span>
              <span className="font-medium">{new Date(site.lastDetected).toLocaleDateString()}</span>
            </div>
          </div>

          {site.severity === 'high' && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-medium">High Risk Alert</span>
              </div>
              <p className="text-xs text-red-600 mt-1">
                Immediate attention required. Exceeds safety thresholds.
              </p>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

// Map controls component
const MapControls: React.FC<{
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
  onFullscreen: () => void;
  mapStyle: string;
  onStyleChange: (style: 'satellite' | 'street' | 'terrain' | 'dark') => void;
}> = ({ onZoomIn, onZoomOut, onCenter, onFullscreen, mapStyle, onStyleChange }) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] space-y-2">
      {/* Map Style Selector */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <select
          value={mapStyle}
          onChange={(e) => onStyleChange(e.target.value as 'satellite' | 'street' | 'terrain' | 'dark')}
          className="p-2 text-xs font-medium border-none outline-none bg-transparent"
        >
          <option value="street">🗺️ Street</option>
          <option value="satellite">🛰️ Satellite</option>
          <option value="terrain">🏔️ Terrain</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>

      {/* Zoom Controls */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <button
          onClick={onZoomIn}
          className="w-full p-2 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <ZoomIn className="h-4 w-4 mx-auto text-gray-600" />
        </button>
        <button
          onClick={onZoomOut}
          className="w-full p-2 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <ZoomOut className="h-4 w-4 mx-auto text-gray-600" />
        </button>
        <button
          onClick={onCenter}
          className="w-full p-2 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <Crosshair className="h-4 w-4 mx-auto text-gray-600" />
        </button>
        <button
          onClick={onFullscreen}
          className="w-full p-2 hover:bg-gray-50 transition-colors"
        >
          <Maximize2 className="h-4 w-4 mx-auto text-gray-600" />
        </button>
      </div>
    </div>
  );
};

// Heat map overlay component
const HeatMapOverlay: React.FC<{ data: ContaminationData[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data.length) return;

    // Create heat map circles for each contamination site
    const heatCircles = data.map(site => {
      const intensity = site.severity === 'high' ? 0.8 : site.severity === 'moderate' ? 0.5 : 0.3;
      const radius = site.severity === 'high' ? 5000 : site.severity === 'moderate' ? 3000 : 1500;
      const color = site.severity === 'high' ? '#EF4444' : site.severity === 'moderate' ? '#F59E0B' : '#10B981';

      return L.circle([site.coordinates.lat, site.coordinates.lng], {
        radius,
        fillColor: color,
        fillOpacity: intensity * 0.3,
        color: color,
        opacity: intensity * 0.6,
        weight: 2,
      });
    });

    const heatLayer = L.layerGroup(heatCircles);
    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  data,
  selectedSite,
  showHeatmap = false,
  mapStyle = 'street',
  animateMarkers = true,
  enableClustering = true,
  onSiteSelect
}) => {
  const [currentStyle, setCurrentStyle] = useState(mapStyle);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<L.Map>(null);

  // Default center on continental US
  const defaultCenter: [number, number] = [39.8283, -98.5795];
  const defaultZoom = 4;

  const getTileLayerUrl = (style: string) => {
    switch (style) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      case 'dark':
        return 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  const getTileLayerAttribution = (style: string) => {
    switch (style) {
      case 'satellite':
      case 'terrain':
        return '&copy; <a href="https://www.esri.com/">Esri</a>';
      case 'dark':
        return '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>';
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    }
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.zoomOut();
    }
  };

  const handleCenter = () => {
    if (mapInstance) {
      mapInstance.setView(defaultCenter, defaultZoom);
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleStyleChange = (style: 'satellite' | 'street' | 'terrain' | 'dark') => {
    setCurrentStyle(style);
  };

  const handleMarkerSelect = (siteId: string) => {
    if (onSiteSelect) {
      onSiteSelect(siteId);
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'h-full'}`}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="h-full w-full rounded-lg"
        ref={(map) => {
          if (map) {
            setMapInstance(map);
          }
        }}
      >
        <TileLayer
          key={currentStyle}
          url={getTileLayerUrl(currentStyle)}
          attribution={getTileLayerAttribution(currentStyle)}
        />

        {/* Heat map overlay */}
        {showHeatmap && <HeatMapOverlay data={data} />}

        {/* Animated markers */}
        {data.map((site, index) => (
          <AnimatedMarker
            key={site.id}
            position={[site.coordinates.lat, site.coordinates.lng]}
            site={site}
            isSelected={selectedSite === site.id}
            onSelect={() => handleMarkerSelect(site.id)}
            animationDelay={animateMarkers ? index : 0}
          />
        ))}

        {/* Add circles for contamination zones */}
        {data.map((site) => (
          <Circle
            key={`circle-${site.id}`}
            center={[site.coordinates.lat, site.coordinates.lng]}
            radius={site.severity === 'high' ? 2000 : site.severity === 'moderate' ? 1200 : 800}
            pathOptions={{
              color: site.severity === 'high' ? '#EF4444' : site.severity === 'moderate' ? '#F59E0B' : '#10B981',
              fillColor: site.severity === 'high' ? '#EF4444' : site.severity === 'moderate' ? '#F59E0B' : '#10B981',
              fillOpacity: 0.1,
              opacity: 0.3,
              weight: 1,
            }}
          />
        ))}
      </MapContainer>

      {/* Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCenter={handleCenter}
        onFullscreen={handleFullscreen}
        mapStyle={currentStyle}
        onStyleChange={handleStyleChange}
      />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="h-4 w-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">Contamination Levels</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Low Risk</span>
          </div>
        </div>
        {showHeatmap && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-red-500"></div>
              <span className="text-xs text-gray-600">Heat Map Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Site Counter */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold text-gray-700">
            {data.length} Sites Monitored
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {data.filter(s => s.severity === 'high').length} High Risk •{' '}
          {data.filter(s => s.severity === 'moderate').length} Moderate •{' '}
          {data.filter(s => s.severity === 'low').length} Low Risk
        </div>
      </div>

      {/* Fullscreen toggle */}
      {isFullscreen && (
        <button
          onClick={handleFullscreen}
          className="absolute top-4 right-20 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-2 hover:bg-gray-50 transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default InteractiveMap;
