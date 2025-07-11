import { useState } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveMap from '../components/dashboard/InteractiveMap';
import ContaminantLayers from '../components/dashboard/ContaminantLayers';
import FilterPanel from '../components/dashboard/FilterPanel';
import ToxinInfoPanel from '../components/dashboard/ToxinInfoPanel';
import StatsActionBar from '../components/dashboard/StatsActionBar';
import { ContaminantType, FilterState, ToxinInfo, FieldData } from '@/types/dashboard';

const Dashboard = () => {
  const [selectedToxin, setSelectedToxin] = useState<ToxinInfo | null>(null);
  const [activeLayers, setActiveLayers] = useState<ContaminantType[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    region: '',
    severity: 'all',
    source: 'all',
    cropCompatibility: 'all',
    dateRange: { start: '', end: '' }
  });
  const [selectedField, setSelectedField] = useState<FieldData | null>(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

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
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Dashboard Content - with top padding to account for fixed navigation */}
      <div className="flex-1 flex relative pt-20"> {/* pt-20 matches the h-20 of navigation */}
        {/* Left Sidebar - Contaminant Layers */}
        <div className={`w-80 flex-shrink-0 z-20 transition-all duration-300 ${
          leftPanelOpen ? 'translate-x-0' : '-translate-x-80'
        }`}>
          <div className="w-full h-full bg-white/95 backdrop-blur-sm shadow-2xl overflow-y-auto border-r border-gray-200">
            <div className="p-4 border-b bg-gray-50/80">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-blue-600">🛡️</span>
                  Contamination Layers
                </h2>
                <button
                  onClick={() => setLeftPanelOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  ❌
                </button>
              </div>
            </div>
            <div className="p-4">
              <ContaminantLayers
                activeLayers={activeLayers}
                onLayerToggle={handleLayerToggle}
              />
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 flex flex-col relative">
          <InteractiveMap
            activeLayers={activeLayers}
            filters={filters}
            onToxinSelect={handleToxinSelect}
            onFieldSelect={handleFieldSelect}
          />
          
          {/* Bottom Stats Bar */}
          <div className="flex-shrink-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
            <StatsActionBar
              selectedField={selectedField}
              onClose={handleCloseFieldPanel}
            />
          </div>
        </div>

        {/* Right Sidebar - Filters */}
        <div className={`w-80 flex-shrink-0 z-20 transition-all duration-300 ${
          rightPanelOpen ? 'translate-x-0' : 'translate-x-80'
        }`}>
          <div className="w-full h-full bg-white/95 backdrop-blur-sm shadow-2xl overflow-y-auto border-l border-gray-200">
            <div className="p-4 border-b bg-gray-50/80">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-purple-600">🔍</span>
                  Analysis Filters
                </h2>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  ❌
                </button>
              </div>
            </div>
            <div className="p-4">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>
        </div>

        {/* Panel Toggle Buttons - positioned relative to map area */}
        {!leftPanelOpen && (
          <div className="absolute left-4 top-4 z-30">
            <button
              onClick={() => setLeftPanelOpen(true)}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors"
              title="Open Layers Panel"
            >
              <span className="text-blue-600">🛡️</span>
            </button>
          </div>
        )}

        {!rightPanelOpen && (
          <div className="absolute right-4 top-4 z-30">
            <button
              onClick={() => setRightPanelOpen(true)}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors"
              title="Open Filters Panel"
            >
              <span className="text-purple-600">🔍</span>
            </button>
          </div>
        )}

        {/* Toxin Info Modal */}
        {selectedToxin && (
          <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <ToxinInfoPanel
                toxin={selectedToxin}
                onClose={() => setSelectedToxin(null)}
              />
            </div>
          </div>
        )}

        {/* Mobile Responsive Message */}
        <div className="md:hidden absolute inset-0 bg-gray-900/95 backdrop-blur-sm z-40 flex items-center justify-center p-6">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-2xl font-bold mb-4">Mobile Version Coming Soon</h2>
            <p className="text-gray-300 mb-4">
              For the best experience, please use a desktop or tablet device.
            </p>
            <button
              onClick={() => document.querySelector('.md\\:hidden')?.classList.add('hidden')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
