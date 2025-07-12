import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveMap from '../components/dashboard/InteractiveMap';
import ContaminantLayers from '../components/dashboard/ContaminantLayers';
import FilterPanel from '../components/dashboard/FilterPanel';
import ToxinInfoPanel from '../components/dashboard/ToxinInfoPanel';
import StatsActionBar from '../components/dashboard/StatsActionBar';
import { ContaminantType, FilterState, ToxinInfo, FieldData } from '@/types/dashboard';
import { ChevronLeft, ChevronRight, Layers, Filter, TrendingUp, AlertTriangle, MapPin, Activity } from 'lucide-react';

const Dashboard = () => {
  const [selectedToxin, setSelectedToxin] = useState<ToxinInfo | null>(null);
  const [activeLayers, setActiveLayers] = useState<ContaminantType[]>(['heavy-metals', 'pesticides']);
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
  const [isLiveData, setIsLiveData] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<FieldData[]>([]);

  // Animated stats with counting effect
  const [animatedStats, setAnimatedStats] = useState({
    totalSites: 0,
    activeSites: 0,
    highRisk: 0,
    remediation: 0
  });

  const targetStats = {
    totalSites: 1247,
    activeSites: 892,
    highRisk: 34,
    remediation: 156
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedStats({
          totalSites: Math.floor(targetStats.totalSites * easeOut),
          activeSites: Math.floor(targetStats.activeSites * easeOut),
          highRisk: Math.floor(targetStats.highRisk * easeOut),
          remediation: Math.floor(targetStats.remediation * easeOut)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(targetStats);
        }
      }, interval);
    };

    animateStats();
  }, []);

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
    if (compareMode && selectedForComparison.length < 2 && !selectedForComparison.includes(field)) {
      setSelectedForComparison(prev => [...prev, field]);
    } else {
      setSelectedField(field);
    }
  };

  const handleZoomToAll = () => {
    // Zoom out to show all sites
    console.log('Zooming to show all sites');
  };

  const handleFilterHighRisk = () => {
    setFilters(prev => ({ ...prev, severity: 'high' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-stone-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Navigation */}
      <Navigation />
      
      {/* Dashboard Content */}
      <div className="pt-16 min-h-screen">
        <div className="flex h-[calc(100vh-4rem)] relative">
          
          {/* Left Sidebar - Contamination Layers */}
          <div className={`
            bg-white/90 backdrop-blur-xl border-r border-emerald-100 shadow-xl transition-all duration-500 ease-out z-30
            ${leftPanelOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'}
            lg:relative absolute inset-y-0 left-0
          `}>
            {/* Sidebar Header */}
            <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <Layers className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-emerald-900">Contamination Layers</h2>
                    <p className="text-sm text-emerald-600">
                      {activeLayers.length} active layer{activeLayers.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setLeftPanelOpen(false)}
                  className="p-2 hover:bg-emerald-100 rounded-lg transition-colors lg:hidden"
                >
                  <ChevronLeft className="h-5 w-5 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <ContaminantLayers
                activeLayers={activeLayers}
                onLayerToggle={handleLayerToggle}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative">
            {/* Map Area */}
            <div className="flex-1 relative">
              <InteractiveMap
                activeLayers={activeLayers}
                filters={filters}
                onToxinSelect={handleToxinSelect}
                onFieldSelect={handleFieldSelect}
              />

              {/* Floating Controls */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                {!leftPanelOpen && (
                  <button
                    onClick={() => setLeftPanelOpen(true)}
                    className="group bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl border border-emerald-100 hover:bg-emerald-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-emerald-700 hidden sm:block">Layers</span>
                    </div>
                  </button>
                )}

                {/* Live Data Toggle */}
                <button
                  onClick={() => setIsLiveData(!isLiveData)}
                  className={`group p-3 rounded-xl shadow-lg border transition-all duration-300 ${
                    isLiveData 
                      ? 'bg-green-500 border-green-400 text-white' 
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Activity className={`h-5 w-5 ${isLiveData ? 'animate-pulse' : ''}`} />
                </button>

                {/* Compare Mode Toggle */}
                <button
                  onClick={() => {
                    setCompareMode(!compareMode);
                    setSelectedForComparison([]);
                  }}
                  className={`group p-3 rounded-xl shadow-lg border transition-all duration-300 ${
                    compareMode 
                      ? 'bg-blue-500 border-blue-400 text-white' 
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                {!rightPanelOpen && (
                  <button
                    onClick={() => setRightPanelOpen(true)}
                    className="group bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:shadow-xl border border-blue-100 hover:bg-blue-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-blue-700 hidden sm:block">Filters</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Interactive Stats Cards */}
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleZoomToAll}
                      className="group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 p-4 rounded-xl border border-blue-100 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="text-2xl font-bold text-blue-700 group-hover:scale-110 transition-transform">
                            {animatedStats.totalSites.toLocaleString()}
                          </div>
                          <div className="text-xs text-blue-600 font-medium">Total Sites</div>
                          <div className="text-xs text-emerald-600 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            +12% this month
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-emerald-600" />
                        <div>
                          <div className="text-2xl font-bold text-emerald-700">
                            {animatedStats.activeSites.toLocaleString()}
                          </div>
                          <div className="text-xs text-emerald-600 font-medium">Active Monitoring</div>
                          <div className="text-xs text-emerald-600">Real-time data</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleFilterHighRisk}
                      className="group bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 p-4 rounded-xl border border-red-100 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div className="text-left">
                          <div className="text-2xl font-bold text-red-700 group-hover:scale-110 transition-transform">
                            {animatedStats.highRisk}
                          </div>
                          <div className="text-xs text-red-600 font-medium">High Risk Areas</div>
                          <div className="text-xs text-emerald-600 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 rotate-180" />
                            -8% improvement
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-amber-600" />
                        <div>
                          <div className="text-2xl font-bold text-amber-700">
                            {animatedStats.remediation}
                          </div>
                          <div className="text-xs text-amber-600 font-medium">In Remediation</div>
                          <div className="text-xs text-amber-600">Active projects</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Export Data
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Filters */}
          <div className={`
            bg-white/90 backdrop-blur-xl border-l border-blue-100 shadow-xl transition-all duration-500 ease-out z-30
            ${rightPanelOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full'}
            lg:relative absolute inset-y-0 right-0
          `}>
            {/* Sidebar Header */}
            <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Filter className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">Smart Filters</h2>
                    <p className="text-sm text-blue-600">AI-powered search & filtering</p>
                  </div>
                </div>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors lg:hidden"
                >
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={(newFilters) => setFilters(newFilters)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {(leftPanelOpen || rightPanelOpen) && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => {
              setLeftPanelOpen(false);
              setRightPanelOpen(false);
            }}
          />
        )}

        {/* Toxin Info Modal */}
        {selectedToxin && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <ToxinInfoPanel
                toxin={selectedToxin}
                onClose={() => setSelectedToxin(null)}
              />
            </div>
          </div>
        )}

        {/* Field Comparison Modal */}
        {compareMode && selectedForComparison.length === 2 && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Field Comparison</h2>
                  <button
                    onClick={() => {
                      setCompareMode(false);
                      setSelectedForComparison([]);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6">
                {selectedForComparison.map((field, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{field.location}</h3>
                    <div className="space-y-2 text-sm">
                      <div>Severity: <span className="font-medium">{field.severity}</span></div>
                      <div>Soil Health: <span className="font-medium">{field.soilHealth}%</span></div>
                      <div>Last Tested: <span className="font-medium">{field.lastTested}</span></div>
                      <div>Contaminants: <span className="font-medium">{field.contaminants.join(', ')}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile FAB for collapsed state */}
        <div className="lg:hidden">
          {!leftPanelOpen && !rightPanelOpen && (
            <div className="fixed bottom-6 right-6 z-30">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setLeftPanelOpen(true)}
                  className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Layers className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setRightPanelOpen(true)}
                  className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Filter className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
