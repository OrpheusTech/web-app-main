import React, { useState, useEffect } from 'react';
import { ContaminantType, FilterState, ToxinInfo, FieldData } from '@/types/dashboard';
import ErrorBoundary from '@/components/ErrorBoundary';

interface InteractiveMapProps {
  activeLayers: ContaminantType[];
  filters: FilterState;
  onToxinSelect: (toxin: ToxinInfo) => void;
  onFieldSelect: (field: FieldData) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = (props) => {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<InteractiveMapProps> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Dynamic import to handle SSR issues with Leaflet
        const LeafletMapModule = await import('./LeafletMap');
        const LeafletMap = (LeafletMapModule as any).default || LeafletMapModule;
        setMapComponent(() => LeafletMap);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load map component:', err);
        setError('Failed to load map. Please refresh the page.');
        setIsLoading(false);
      }
    };

    loadMap();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Interactive Map</h3>
          <p className="text-gray-600">Initializing map components...</p>
          
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200">
        <div className="text-center p-8">
          <div className="text-6xl mb-4 text-red-500">⚠️</div>
          <h3 className="text-2xl font-bold text-red-800 mb-2">Map Loading Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (!MapComponent) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Map Unavailable</h3>
          <p className="text-gray-600">Map component could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <MapComponent {...props} />
    </ErrorBoundary>
  );
};

export default InteractiveMap;
