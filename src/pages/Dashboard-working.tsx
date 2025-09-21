import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer'
import InteractiveGlobalMap from '../components/InteractiveGlobalMap';
import { Upload, Map, Filter, BarChart3, Settings, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterState {
  search: string;
  contaminationType: 'all' | 'heavy-metals' | 'pesticides' | 'industrial-byproducts' | 'plastic-microplastics' | 'organic-solvents' | 'radiological';
  region: string;
  severity: 'all' | 'low' | 'moderate' | 'high';
  source: 'all' | 'agricultural' | 'industrial' | 'urban';
  cropCompatibility: 'all' | 'corn' | 'soybeans' | 'wheat' | 'cotton';
  dateRange: {
    start: string;
    end: string;
  };
}

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    contaminationType: 'all',
    region: '',
    severity: 'all',
    source: 'all',
    cropCompatibility: 'all',
    dateRange: { start: '', end: '' }
  });
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <Navigation />
      
      {/* Main Dashboard Container */}
      <div className="relative">
        {/* Dashboard Header */}
        <div className="pt-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Environmental Intelligence Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Real-time contamination monitoring and analysis</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-300">Live Data</span>
                </div>
                <button
                  onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                  className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setRightPanelOpen(!rightPanelOpen)}
                  className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-140px)] p-4">
          {/* Left Sidebar - Filters & Layers */}
          {leftPanelOpen && (
            <div className="col-span-12 md:col-span-4 lg:col-span-3 order-first md:order-none">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full min-h-[500px] flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters & Layers
                    </h2>
                    <button
                      onClick={() => setLeftPanelOpen(false)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Search</label>
                    <input
                      type="text"
                      placeholder="Search locations, contaminants..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Contamination Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Contamination Type</label>
                    <select
                      value={filters.contaminationType}
                      onChange={(e) => handleFilterChange('contaminationType', e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="heavy-metals">Heavy Metals</option>
                      <option value="pesticides">Pesticides</option>
                      <option value="industrial-byproducts">Industrial Byproducts</option>
                      <option value="plastic-microplastics">Microplastics</option>
                      <option value="organic-solvents">Organic Solvents</option>
                      <option value="radiological">Radiological</option>
                    </select>
                  </div>

                  {/* Severity */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Severity Level</label>
                    <select
                      value={filters.severity}
                      onChange={(e) => handleFilterChange('severity', e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="low">🟢 Low Risk</option>
                      <option value="moderate">🟡 Moderate Risk</option>
                      <option value="high">🔴 High Risk</option>
                    </select>
                  </div>

                  {/* Source */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Source</label>
                    <select
                      value={filters.source}
                      onChange={(e) => handleFilterChange('source', e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Sources</option>
                      <option value="agricultural">🌾 Agricultural</option>
                      <option value="industrial">🏭 Industrial</option>
                      <option value="urban">🏢 Urban</option>
                    </select>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Total Sites:</span>
                        <span className="font-medium text-gray-900 dark:text-white">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">High Risk:</span>
                        <span className="font-medium text-red-600 dark:text-red-400">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Moderate Risk:</span>
                        <span className="font-medium text-yellow-600 dark:text-yellow-400">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Low Risk:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Map Area */}
          <div className={`col-span-12 ${leftPanelOpen ? 'md:col-span-8 lg:col-span-6' : rightPanelOpen ? 'md:col-span-8 lg:col-span-9' : 'md:col-span-12'} ${rightPanelOpen && leftPanelOpen ? 'lg:col-span-6' : ''}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full min-h-[500px] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Interactive Monitoring Map
                  </h2>
                  {/* <div className="flex items-center gap-2">
                    <select className="text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-2 py-1">
                      <option>Street View</option>
                      <option>Satellite</option>
                      <option>Terrain</option>
                    </select>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div> */}
                </div>
              </div>
              <div className="flex-1 relative">
                <InteractiveGlobalMap />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Analytics */}
          {rightPanelOpen && (
            <div className="col-span-12 md:col-span-4 lg:col-span-3 order-last">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full min-h-[500px] flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Analytics
                    </h2>
                    <button
                      onClick={() => setRightPanelOpen(false)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                  {/* Risk Distribution */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Risk Distribution</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">High Risk</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Moderate</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Low Risk</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Alerts */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Alerts</h3>
                    {/* <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">High Lead Levels</p>
                            <p className="text-xs text-red-600 dark:text-red-400">North Dakota Agricultural Zone</p>
                            <p className="text-xs text-red-500 dark:text-red-400 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Pesticide Detection</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">Iowa Corn Belt</p>
                            <p className="text-xs text-yellow-500 dark:text-yellow-400 mt-1">5 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Site Remediated</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">Texas Industrial Corridor</p>
                            <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex justify-center mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full max-w-[500px] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Soil Data Upload
                </h2>
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-50 dark:border-gray-700 rounded-lg p-6 text-center m-4">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground mb-4">
                Drag and drop your soil data here, or click to browse
              </p>
              <label className="h-10 px-4 py-2 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                Choose File
                <input type="file" className="hidden" id="fileInput" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
