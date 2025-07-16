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
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col overflow-hidden">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Dashboard Content - with top padding to account for fixed navigation */}
      <div className="flex-1 flex relative pt-20 gap-4 p-4"> {/* Added gap and padding for modern spacing */}
        {/* Left Sidebar - Contamination Layers */}
        <div className={`w-80 flex-shrink-0 z-20 transition-all duration-500 ease-in-out ${
          leftPanelOpen ? 'translate-x-0 opacity-100' : '-translate-x-80 opacity-0'
        }`}>
          <div className="w-full h-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-emerald-200/50 overflow-hidden">
            <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <span className="text-emerald-600 text-lg">🛡️</span>
                  </div>
                  Contamination Layers
                </h2>
                <button
                  onClick={() => setLeftPanelOpen(false)}
                  className="p-2 hover:bg-emerald-100 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <span className="text-emerald-600">✕</span>
                </button>
              </div>
              <p className="text-sm text-emerald-600 mt-2">Toggle layers to visualize contamination data</p>
            </div>
            <div className="p-6 overflow-y-auto">{/* Custom scrollbar styling can be added */}
              <ContaminantLayers
                activeLayers={activeLayers}
                onLayerToggle={handleLayerToggle}
              />
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 flex flex-col relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-200/50 overflow-hidden">
          <div className="flex-1">
            <InteractiveMap
              activeLayers={activeLayers}
              filters={filters}
              onToxinSelect={handleToxinSelect}
              onFieldSelect={handleFieldSelect}
            />
          </div>
          
          {/* Bottom Stats Bar */}
          <div className="flex-shrink-0 bg-gradient-to-r from-emerald-800/95 to-teal-800/95 backdrop-blur-xl border-t border-emerald-300/30">
            <StatsActionBar
              selectedField={selectedField}
              onClose={handleCloseFieldPanel}
            />
          </div>
        </div>

        {/* Right Sidebar - Filters */}
        <div className={`w-80 flex-shrink-0 z-20 transition-all duration-500 ease-in-out ${
          rightPanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-80 opacity-0'
        }`}>
          <div className="w-full h-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-purple-200/50 overflow-hidden">
            <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-purple-800 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <span className="text-purple-600 text-lg">🔍</span>
                  </div>
                  Analysis Filters
                </h2>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  className="p-2 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-110"
                >
                  <span className="text-purple-600">✕</span>
                </button>
              </div>
              <p className="text-sm text-purple-600 mt-2">Refine data visualization parameters</p>
            </div>
            <div className="p-6 overflow-y-auto">{/* Custom scrollbar styling can be added */}
              <FilterPanel
                filters={filters}
                onFiltersChange={(newFilters) => setFilters(newFilters)}
              />
            </div>
          </div>
        </div>

        {/* Panel Toggle Buttons - Modern floating style */}
        {!leftPanelOpen && (
          <div className="absolute left-6 top-6 z-30">
            <button
              onClick={() => setLeftPanelOpen(true)}
              className="group bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-emerald-200/50 hover:bg-emerald-50 transition-all duration-300 hover:scale-110"
              title="Open Layers Panel"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-xl group-hover:scale-110 transition-transform">🛡️</span>
                <span className="text-emerald-700 font-medium text-sm">Layers</span>
              </div>
            </button>
          </div>
        )}

        {!rightPanelOpen && (
          <div className="absolute right-6 top-6 z-30">
            <button
              onClick={() => setRightPanelOpen(true)}
              className="group bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-purple-200/50 hover:bg-purple-50 transition-all duration-300 hover:scale-110"
              title="Open Filters Panel"
            >
              <div className="flex items-center gap-2">
                <span className="text-purple-600 text-xl group-hover:scale-110 transition-transform">🔍</span>
                <span className="text-purple-700 font-medium text-sm">Filters</span>
              </div>
            </button>
          </div>
        )}

        {/* Toxin Info Modal - Enhanced with modern styling */}
        {selectedToxin && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50 animate-in slide-in-from-bottom-4 duration-300">
              <ToxinInfoPanel
                toxin={selectedToxin}
                onClose={() => setSelectedToxin(null)}
              />
            </div>
          </div>
        )}

        {/* AI Insights Floating Panel */}
        <div className="absolute bottom-6 right-6 z-40">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-2xl shadow-2xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-80">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">AI Insights</h3>
                  <p className="text-xs text-gray-600">Real-time analysis</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-600">⚠️</span>
                    <span className="text-sm font-medium text-amber-800">Anomaly Detected</span>
                  </div>
                  <p className="text-xs text-amber-700">Unusual lead concentration spike in Johnson County</p>
                </div>
                
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-600">📈</span>
                    <span className="text-sm font-medium text-emerald-800">Trend Analysis</span>
                  </div>
                  <p className="text-xs text-emerald-700">Soil health improving by 12% this quarter</p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-600">💡</span>
                    <span className="text-sm font-medium text-blue-800">Recommendation</span>
                  </div>
                  <p className="text-xs text-blue-700">Consider cover crops in high-nitrate areas</p>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium">
                View Detailed Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Message - Enhanced */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-emerald-900/95 to-teal-900/95 backdrop-blur-sm z-40 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-sm">
            <div className="relative mb-6">
              <div className="text-6xl mb-4 animate-bounce">📱</div>
              <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 animate-ping"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-emerald-100">Mobile Dashboard</h2>
            <p className="text-emerald-200 mb-6 leading-relaxed">
              The full dashboard experience is optimized for desktop and tablet devices. Mobile version coming soon!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => document.querySelector('.md\\:hidden')?.classList.add('hidden')}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                Continue Anyway
              </button>
              <p className="text-xs text-emerald-300">
                ⚠️ Some features may not work properly on mobile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
