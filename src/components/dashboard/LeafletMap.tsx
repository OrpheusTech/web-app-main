import React, { useEffect, useRef } from 'react';
import { ContaminantType, FilterState, ToxinInfo, FieldData } from '@/types/dashboard';

interface LeafletMapProps {
  activeLayers: ContaminantType[];
  filters: FilterState;
  onToxinSelect: (toxin: ToxinInfo) => void;
  onFieldSelect: (field: FieldData) => void;
}

// Sample contamination data
const contaminationData: ToxinInfo[] = [
  {
    id: 'lead-1',
    name: 'Lead Contamination',
    icon: '⚠️',
    hazardType: '☢️',
    source: 'Industrial runoff',
    impact: 'Neurological damage, developmental issues',
    description: 'Elevated lead levels detected in soil samples near former industrial site',
    coordinates: [39.8283, -98.5795],
    severity: 'high',
    category: 'heavy-metals'
  },
  {
    id: 'pesticide-1',
    name: 'Glyphosate Residue',
    icon: '🌾',
    hazardType: '🧬',
    source: 'Agricultural pesticide application',
    impact: 'Potential carcinogen, endocrine disruptor',
    description: 'Elevated glyphosate levels from recent herbicide application',
    coordinates: [41.8781, -87.6298],
    severity: 'moderate',
    category: 'pesticides'
  },
  {
    id: 'nitrate-1',
    name: 'Nitrate Runoff',
    icon: '💧',
    hazardType: '🌿',
    source: 'Fertilizer application',
    impact: 'Water contamination, eutrophication',
    description: 'Elevated nitrate levels from over-fertilization',
    coordinates: [40.7589, -111.8883],
    severity: 'moderate',
    category: 'fertilizer-runoff'
  },
  {
    id: 'pcb-1',
    name: 'PCB Contamination',
    icon: '🏭',
    hazardType: '☣️',
    source: 'Legacy industrial waste',
    impact: 'Carcinogenic, bioaccumulative',
    description: 'Polychlorinated biphenyls from old electrical equipment',
    coordinates: [40.7128, -74.0060],
    severity: 'high',
    category: 'industrial-byproducts'
  }
];

const fieldData: FieldData[] = [
  {
    id: 'field-1',
    location: 'Johnson County, IA',
    coordinates: [41.6611, -91.5302],
    severity: 'low',
    contaminants: ['Nitrates'],
    crops: ['Corn', 'Soybeans'],
    lastTested: '2024-03-15',
    soilHealth: 78,
    recommendations: ['Reduce nitrogen fertilizer', 'Implement cover crops']
  },
  {
    id: 'field-2',
    location: 'Lancaster County, NE',
    coordinates: [40.8136, -96.7026],
    severity: 'moderate',
    contaminants: ['Atrazine', 'Glyphosate'],
    crops: ['Corn'],
    lastTested: '2024-02-20',
    soilHealth: 65,
    recommendations: ['Switch to organic herbicides', 'Soil remediation needed']
  }
];

const LeafletMap: React.FC<LeafletMapProps> = ({ activeLayers, filters, onToxinSelect, onFieldSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initializeMap = async () => {
      try {
        // Dynamic import of Leaflet to avoid SSR issues
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Initialize map
        const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create custom icon function
        const createCustomIcon = (color: string, emoji: string) => {
          return L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: 3px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                cursor: pointer;
              ">
                ${emoji}
              </div>
            `,
            className: 'custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });
        };

        // Add contamination markers
        contaminationData.forEach(toxin => {
          const color = toxin.severity === 'high' ? '#dc2626' : 
                       toxin.severity === 'moderate' ? '#ea580c' : '#16a34a';
          
          const marker = L.marker(toxin.coordinates as [number, number], {
            icon: createCustomIcon(color, toxin.icon)
          }).addTo(map);

          marker.bindPopup(`
            <div style="padding: 12px; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 18px;">${toxin.icon}</span>
                <div>
                  <h3 style="font-weight: bold; font-size: 14px; margin: 0; color: #1f2937;">${toxin.name}</h3>
                  <p style="font-size: 12px; margin: 0; color: #6b7280;">${toxin.source}</p>
                </div>
              </div>
              
              <div style="margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 12px; font-weight: 500;">Risk Level:</span>
                  <span style="font-size: 12px; padding: 2px 8px; border-radius: 12px; font-weight: 500; 
                    background-color: ${toxin.severity === 'high' ? '#fef2f2' : 
                                      toxin.severity === 'moderate' ? '#fff7ed' : '#f0fdf4'};
                    color: ${toxin.severity === 'high' ? '#b91c1c' : 
                            toxin.severity === 'moderate' ? '#c2410c' : '#166534'};">
                    ${toxin.severity.toUpperCase()}
                  </span>
                </div>
                <p style="font-size: 12px; color: #6b7280; margin: 4px 0;">${toxin.impact}</p>
              </div>
              
              <button onclick="window.selectToxin('${toxin.id}')" 
                style="width: 100%; font-size: 12px; background-color: #2563eb; color: white; 
                       padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer;">
                View Details
              </button>
            </div>
          `);
        });

        // Add field markers
        fieldData.forEach(field => {
          const color = field.severity === 'high' ? '#dc2626' : 
                       field.severity === 'moderate' ? '#ea580c' : '#16a34a';
          
          const marker = L.marker(field.coordinates, {
            icon: createCustomIcon(color, '🌾')
          }).addTo(map);

          marker.bindPopup(`
            <div style="padding: 12px; min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 18px;">🌾</span>
                <div>
                  <h3 style="font-weight: bold; font-size: 14px; margin: 0; color: #1f2937;">${field.location}</h3>
                  <p style="font-size: 12px; margin: 0; color: #6b7280;">Crops: ${field.crops.join(', ')}</p>
                </div>
              </div>
              
              <div style="margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 12px; font-weight: 500;">Soil Health:</span>
                  <span style="font-size: 12px; font-weight: 600; color: #2563eb;">${field.soilHealth}%</span>
                </div>
                <p style="font-size: 12px; color: #6b7280; margin: 0;">Last tested: ${field.lastTested}</p>
              </div>
              
              <button onclick="window.selectField('${field.id}')" 
                style="width: 100%; font-size: 12px; background-color: #16a34a; color: white; 
                       padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer;">
                Analyze Field
              </button>
            </div>
          `);
        });

        // Global functions for popup buttons
        (window as any).selectToxin = (toxinId: string) => {
          const toxin = contaminationData.find(t => t.id === toxinId);
          if (toxin) onToxinSelect(toxin);
        };

        (window as any).selectField = (fieldId: string) => {
          const field = fieldData.find(f => f.id === fieldId);
          if (field) onFieldSelect(field);
        };

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onToxinSelect, onFieldSelect]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
        <h4 className="font-semibold text-sm mb-3 text-gray-800">Risk Level Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700">High Risk</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700">Moderate Risk</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-xs text-gray-700">Low Risk</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">⚠️</span>
            <span className="text-xs text-gray-600">Contamination Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🌾</span>
            <span className="text-xs text-gray-600">Agricultural Fields</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
