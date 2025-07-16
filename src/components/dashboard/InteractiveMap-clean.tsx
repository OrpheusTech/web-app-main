import React, { useState, useEffect } from 'react';
import { ContaminantType, FilterState, ToxinInfo, FieldData } from '@/types/dashboard';

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
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadMap = async () => {
      try {
        setIsLoading(true);
        setLoadingProgress(0);
        
        // Simulate loading progress for better UX
        const progressInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 15;
          });
        }, 200);
        
        // Give a moment for the component to mount properly
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Import the LeafletMap component
        const LeafletMapModule = await import('./LeafletMap');
        const LeafletMapComponent = LeafletMapModule.default;
        
        if (LeafletMapComponent) {
          clearInterval(progressInterval);
          setLoadingProgress(100);
          
          // Small delay to show 100% completion
          setTimeout(() => {
            setMapComponent(() => LeafletMapComponent);
            setError(null);
            setIsLoading(false);
          }, 300);
        } else {
          throw new Error('LeafletMap component not found');
        }
      } catch (err) {
        console.error('Failed to load map component:', err);
        setError('Failed to load interactive map. Please refresh the page.');
        setIsLoading(false);
        setLoadingProgress(0);
      }
    };

    loadMap();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full relative bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl flex items-center justify-center overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="text-center z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200 max-w-md">
          <div className="relative mb-6">
            <div className="text-6xl mb-4 animate-bounce">🗺️</div>
            <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 animate-ping"></div>
          </div>
          
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Loading Interactive Map</h3>
          <p className="text-emerald-600 mb-6">Preparing environmental data visualization...</p>
          
          {/* Progress bar */}
          <div className="w-full bg-emerald-100 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          
          <div className="text-sm text-emerald-700 font-medium">{loadingProgress}% Complete</div>
          
          {/* Loading dots */}
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-100 rounded-2xl flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200 max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Map Loading Error</h3>
          <p className="text-red-600 mb-6">{error}</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105"
            >
              🔄 Reload Page
            </button>
            <button 
              onClick={() => {
                setError(null);
                setIsLoading(true);
                setLoadingProgress(0);
                // Retry loading
                const loadMap = async () => {
                  try {
                    const progressInterval = setInterval(() => {
                      setLoadingProgress((prev) => {
                        if (prev >= 90) {
                          clearInterval(progressInterval);
                          return 90;
                        }
                        return prev + 15;
                      });
                    }, 200);
                    
                    await new Promise(resolve => setTimeout(resolve, 100));
                    const LeafletMapModule = await import('./LeafletMap');
                    const LeafletMapComponent = LeafletMapModule.default;
                    if (LeafletMapComponent) {
                      clearInterval(progressInterval);
                      setLoadingProgress(100);
                      setTimeout(() => {
                        setMapComponent(() => LeafletMapComponent);
                        setError(null);
                        setIsLoading(false);
                      }, 300);
                    }
                  } catch (err) {
                    setError('Failed to load interactive map. Please refresh the page.');
                    setIsLoading(false);
                    setLoadingProgress(0);
                  }
                };
                loadMap();
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!MapComponent) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6">
          <div className="text-4xl mb-2 animate-spin">⚙️</div>
          <p className="text-indigo-600 font-medium">Initializing map components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Map Status Indicator */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-emerald-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-emerald-700">Live Data</span>
        </div>
      </div>
      
      {/* Layer Count Indicator */}
      {props.activeLayers.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-purple-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-purple-700">
              {props.activeLayers.length} layer{props.activeLayers.length !== 1 ? 's' : ''} active
            </span>
          </div>
        </div>
      )}
      
      <MapComponent {...props} />
    </div>
  );
};

export default InteractiveMap;
