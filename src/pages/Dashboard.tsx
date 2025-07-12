import { useState } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveMap from '../components/dashboard/InteractiveMap-enhanced';
import ContaminantLayers from '../components/dashboard/ContaminantLayers-enhanced';
import FilterPanel from '../components/dashboard/FilterPanel-enhanced';
import ToxinInfoPanel from '../components/dashboard/ToxinInfoPanel';
import StatsActionBar from '../components/dashboard/StatsActionBar';
import { ContaminantType, FilterState, ToxinInfo, FieldData } from '@/types/dashboard';

// Sample contamination data
const generateSampleData = () => {
  const locations = [
    { name: 'North Dakota Agricultural Zone', lat: 47.5515, lng: -101.0020 },
    { name: 'Iowa Corn Belt', lat: 42.0115, lng: -93.2105 },
    { name: 'Texas Industrial Corridor', lat: 29.7755, lng: -95.3678 },
    { name: 'California Central Valley', lat: 36.7783, lng: -119.4179 },
    { name: 'Illinois Prairie', lat: 40.3363, lng: -89.0022 },
    { name: 'Nebraska Farmland', lat: 41.2033, lng: -98.4842 },
    { name: 'Kansas Wheat Fields', lat: 38.5766, lng: -98.6087 },
    { name: 'Montana Ranch Country', lat: 47.0527, lng: -109.6333 },
    { name: 'Michigan Agricultural Belt', lat: 44.2619, lng: -85.4220 },
    { name: 'Minnesota Lakes Region', lat: 46.3944, lng: -94.6859 }
  ];

  const contaminationTypes = ['heavy-metals', 'pesticides', 'industrial-byproducts', 'microplastics', 'organic-solvents'];
  const severities: ('low' | 'moderate' | 'high')[] = ['low', 'moderate', 'high'];
  const sources = ['agricultural', 'industrial', 'urban'];

  return locations.map((location, index) => ({
    id: `site-${index + 1}`,
    location: location.name,
    coordinates: { lat: location.lat, lng: location.lng },
    type: contaminationTypes[Math.floor(Math.random() * contaminationTypes.length)],
    level: Math.random() * 100,
    unit: 'ppm',
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    lastDetected: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

const Dashboard = () => {
  const [selectedToxin, setSelectedToxin] = useState<ToxinInfo | null>(null);
  const [activeLayers, setActiveLayers] = useState<ContaminantType[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    contaminationType: 'all',
    region: '',
    severity: 'all',
    source: 'all',
    cropCompatibility: 'all',
    dateRange: { start: '', end: '' }
  });
  const [selectedField, setSelectedField] = useState<FieldData | null>(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'street' | 'terrain' | 'dark'>('street');

  // Generate sample contamination data
  const contaminationData = generateSampleData();

  const handleLayerToggle = (layer: ContaminantType) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const handleToxinSelect = (toxin: ToxinInfo) => {
    setSelectedToxin(toxin);
  };

  const handleFieldSelect = (field: FieldData) => {
    setSelectedField(field);
  };

  const handleCloseFieldPanel = () => {
    setSelectedField(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      
      {/* Dashboard Content */}
      <div className="pt-16">
        <div className="max-w-full mx-auto p-4">
          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-5rem)]">
            
            {/* Left Sidebar - Contamination Layers */}
            {leftPanelOpen && (
              <div className="col-span-3">
                <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
                  <div className="p-4 border-b bg-emerald-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
                        <span className="text-emerald-600">🛡️</span>
                        Layers
                      </h2>
                      <button
                        onClick={() => setLeftPanelOpen(false)}
                        className="p-1 hover:bg-emerald-100 rounded text-emerald-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <ContaminantLayers
                      activeLayers={activeLayers}
                      onLayerToggle={handleLayerToggle}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Main Map Area */}
            <div className={`${leftPanelOpen && rightPanelOpen ? 'col-span-6' : leftPanelOpen || rightPanelOpen ? 'col-span-9' : 'col-span-12'}`}>
              <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
                <div className="flex-1 relative">
                  <InteractiveMap
                    data={contaminationData}
                    selectedSite={selectedSite}
                    showHeatmap={showHeatmap}
                    mapStyle={mapStyle}
                    animateMarkers={true}
                    enableClustering={true}
                    onSiteSelect={setSelectedSite}
                  />
                </div>
                <div className="border-t bg-gray-50">
                  <StatsActionBar
                    selectedField={selectedField}
                    onClose={handleCloseFieldPanel}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Filters */}
            {rightPanelOpen && (
              <div className="col-span-3">
                <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
                  <div className="p-4 border-b bg-blue-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                        <span className="text-blue-600">🔍</span>
                        Filters
                      </h2>
                      <button
                        onClick={() => setRightPanelOpen(false)}
                        className="p-1 hover:bg-blue-100 rounded text-blue-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={(newFilters) => setFilters(newFilters)}
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Panel Toggle Buttons */}
          <div className="fixed top-20 left-4 z-50 flex flex-col gap-2">
            {!leftPanelOpen && (
              <button
                onClick={() => setLeftPanelOpen(true)}
                className="bg-white shadow-lg border rounded-lg p-3 hover:bg-emerald-50 transition-colors"
                title="Open Layers Panel"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600">�️</span>
                  <span className="text-sm font-medium text-emerald-700">Layers</span>
                </div>
              </button>
            )}
          </div>

          <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
            {!rightPanelOpen && (
              <button
                onClick={() => setRightPanelOpen(true)}
                className="bg-white shadow-lg border rounded-lg p-3 hover:bg-blue-50 transition-colors"
                title="Open Filters Panel"
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">�</span>
                  <span className="text-sm font-medium text-blue-700">Filters</span>
                </div>
              </button>
            )}
          </div>

          {/* Toxin Info Modal */}
          {selectedToxin && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <ToxinInfoPanel
                  toxin={selectedToxin}
                  onClose={() => setSelectedToxin(null)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
