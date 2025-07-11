import React from 'react';
import { ContaminantType, FilterState, ToxinInfo } from '@/types/dashboard';

interface InteractiveMapProps {
  activeLayers: ContaminantType[];
  filters: FilterState;
  onToxinSelect: (toxin: ToxinInfo) => void;
  onFieldSelect: (field: any) => void;
}

const InteractiveMapFallback: React.FC<InteractiveMapProps> = ({
  activeLayers,
  filters,
  onToxinSelect,
  onFieldSelect
}) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Soil Map</h3>
        <p className="text-gray-600 mb-4">Loading map components...</p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active Layers: {activeLayers.length}</p>
          <p className="text-sm text-gray-500">
            Filters: {filters.severity !== 'all' ? `${filters.severity} severity` : 'All severities'}
          </p>
        </div>
        
        <button 
          onClick={() => onToxinSelect({
            id: 'test',
            name: 'Test Contamination',
            icon: '🧪',
            hazardType: '☣️',
            source: 'Test source',
            impact: 'Test impact',
            description: 'Test description',
            coordinates: [0, 0],
            severity: 'moderate',
            category: 'heavy-metals'
          })}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Interaction
        </button>
      </div>
    </div>
  );
};

export default InteractiveMapFallback;
