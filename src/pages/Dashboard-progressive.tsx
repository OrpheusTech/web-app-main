import React, { useState, Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import SimpleMap from '../components/dashboard/SimpleMap-working';
import { Activity, Map, Filter, BarChart3, Settings, Menu, X, ChevronLeft, ChevronRight, Sparkles, MapPin, Layers } from 'lucide-react';
import { FilterState } from '@/types/dashboard';

// Lazy load enhanced components
const EnhancedFilterPanel = lazy(() => import('../components/dashboard/FilterPanel-enhanced'));
const EnhancedContaminantLayers = lazy(() => import('../components/dashboard/ContaminantLayers-enhanced'));

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
  const [useEnhancedFeatures, setUseEnhancedFeatures] = useState(false);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const statisticsData = [
    {
      title: 'Total Sites Monitored',
      value: '127',
      subtitle: 'Across 12 states',
      trend: '+3 new this week',
      color: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-100',
      textColor: 'text-blue-900',
      valueColor: 'text-blue-600',
      subtitleColor: 'text-blue-700'
    },
    {
      title: 'High Risk Sites',
      value: '23',
      subtitle: 'Requiring immediate attention',
      trend: '-2 remediated today',
      color: 'from-red-50 to-pink-50',
      borderColor: 'border-red-100',
      textColor: 'text-red-900',
      valueColor: 'text-red-600',
      subtitleColor: 'text-red-700'
    },
    {
      title: 'Active Monitoring',
      value: '89%',
      subtitle: 'Real-time sensor coverage',
      trend: '+5% this quarter',
      color: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-100',
      textColor: 'text-green-900',
      valueColor: 'text-green-600',
      subtitleColor: 'text-green-700'
    },
    {
      title: 'Data Points Today',
      value: '12.4K',
      subtitle: 'Collected in last 24h',
      trend: 'Real-time updates',
      color: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-100',
      textColor: 'text-purple-900',
      valueColor: 'text-purple-600',
      subtitleColor: 'text-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      {/* Enhanced Features Toggle */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Environmental Intelligence Dashboard</h1>
              <p className="text-gray-600 text-sm">Real-time contamination monitoring and analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live Data</span>
              </div>
              <button
                onClick={() => setUseEnhancedFeatures(!useEnhancedFeatures)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  useEnhancedFeatures 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {useEnhancedFeatures ? 'Enhanced Mode' : 'Basic Mode'}
                </span>
              </button>
              <button
                onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Filter className="h-4 w-4" />
              </button>
              <button
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statisticsData.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 border ${stat.borderColor} transform hover:scale-105 transition-all duration-200 cursor-pointer`}
            >
              <h3 className={`text-sm font-semibold ${stat.textColor} mb-2`}>{stat.title}</h3>
              <p className={`text-2xl font-bold ${stat.valueColor} mb-1`}>{stat.value}</p>
              <p className={`text-xs ${stat.subtitleColor} mb-2`}>{stat.subtitle}</p>
              <div className="flex items-center gap-1">
                <div className={`w-1 h-1 ${stat.valueColor.replace('text-', 'bg-')} rounded-full`}></div>
                <p className={`text-xs ${stat.subtitleColor}`}>{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-280px)]">
          {/* Left Sidebar - Filters & Layers */}
          {leftPanelOpen && (
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border h-full flex flex-col">
                <div className="p-4 border-b bg-gray-50 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters & Layers
                    </h2>
                    <button
                      onClick={() => setLeftPanelOpen(false)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {useEnhancedFeatures ? (
                    <Suspense fallback={
                      <div className="p-4">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    }>
                      <EnhancedFilterPanel 
                        filters={filters} 
                        onFiltersChange={handleFilterChange}
                      />
                    </Suspense>
                  ) : (
                    <div className="p-4 space-y-6">
                      {/* Basic Filters */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                        <input
                          type="text"
                          placeholder="Search locations, contaminants..."
                          value={filters.search}
                          onChange={(e) => setFilters({...filters, search: e.target.value})}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Contamination Type</label>
                        <select
                          value={filters.contaminationType}
                          onChange={(e) => setFilters({...filters, contaminationType: e.target.value as any})}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Severity Level</label>
                        <select
                          value={filters.severity}
                          onChange={(e) => setFilters({...filters, severity: e.target.value as any})}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Levels</option>
                          <option value="low">🟢 Low Risk</option>
                          <option value="moderate">🟡 Moderate Risk</option>
                          <option value="high">🔴 High Risk</option>
                        </select>
                      </div>

                      {/* Enhanced Features Prompt */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                          <h3 className="text-sm font-semibold text-blue-800">Enhanced Features Available</h3>
                        </div>
                        <p className="text-xs text-blue-700 mb-3">
                          Enable enhanced mode for AI-powered search, advanced filtering, and interactive layers.
                        </p>
                        <button
                          onClick={() => setUseEnhancedFeatures(true)}
                          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                        >
                          Enable Enhanced Mode
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Map Area */}
          <div className={`col-span-12 ${leftPanelOpen ? 'lg:col-span-6' : rightPanelOpen ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            <div className="bg-white rounded-xl shadow-sm border h-full flex flex-col">
              <div className="p-4 border-b bg-gray-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Interactive Monitoring Map
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                      <MapPin className="h-3 w-3" />
                      127 Sites
                    </div>
                    <select className="text-sm border border-gray-200 rounded-lg px-2 py-1">
                      <option>Street View</option>
                      <option>Satellite</option>
                      <option>Terrain</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <SimpleMap />
                {useEnhancedFeatures && (
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Layers className="h-3 w-3 text-blue-600" />
                      <span className="text-blue-700 font-medium">Enhanced Map Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Analytics */}
          {rightPanelOpen && (
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border h-full flex flex-col">
                <div className="p-4 border-b bg-gray-50 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Analytics & Insights
                    </h2>
                    <button
                      onClick={() => setRightPanelOpen(false)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                  {/* Risk Distribution */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Risk Distribution</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'High Risk', value: 18, color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
                        { label: 'Moderate', value: 24, color: 'bg-yellow-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
                        { label: 'Low Risk', value: 58, color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-700' }
                      ].map((item, index) => (
                        <div key={index} className={`p-3 ${item.bgColor} rounded-lg border`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                              <span className={`text-sm font-medium ${item.textColor}`}>{item.label}</span>
                            </div>
                            <span className={`text-sm font-bold ${item.textColor}`}>{item.value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { type: 'alert', title: 'High Lead Levels', location: 'North Dakota Agricultural Zone', time: '2h ago', color: 'red' },
                        { type: 'detection', title: 'Pesticide Detection', location: 'Iowa Corn Belt', time: '5h ago', color: 'yellow' },
                        { type: 'remediation', title: 'Site Remediated', location: 'Texas Industrial Corridor', time: '1d ago', color: 'green' },
                        { type: 'monitoring', title: 'New Sensor Online', location: 'California Central Valley', time: '2d ago', color: 'blue' }
                      ].map((activity, index) => (
                        <div key={index} className={`p-3 bg-${activity.color}-50 border border-${activity.color}-200 rounded-lg`}>
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full mt-2`}></div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium text-${activity.color}-800`}>{activity.title}</p>
                              <p className={`text-xs text-${activity.color}-600`}>{activity.location}</p>
                              <p className={`text-xs text-${activity.color}-500 mt-1`}>{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights */}
                  {useEnhancedFeatures && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        AI Insights
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">
                            <strong>Trending:</strong> 23% increase in microplastic detections this quarter
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">
                            <strong>Alert:</strong> 3 new high-risk sites detected in agricultural zones
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">
                            <strong>Recommendation:</strong> Focus monitoring on industrial corridor regions
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
