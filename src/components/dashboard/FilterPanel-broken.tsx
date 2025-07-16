import React, { useState } from 'react';
import { FilterState } from '@/types/dashboard';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (key: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: value
      }
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      region: '',
      severity: 'all',
      source: 'all',
      cropCompatibility: 'all',
      dateRange: { start: '', end: '' }
    });
    setSearchTerm('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.region) count++;
    if (filters.severity !== 'all') count++;
    if (filters.source !== 'all') count++;
    if (filters.cropCompatibility !== 'all') count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  };

  const presetFilters = [
    {
      name: 'High Risk Areas',
      icon: '🚨',
      filters: { severity: 'high', source: 'all', cropCompatibility: 'all' }
    },
    {
      name: 'Agricultural Focus',
      icon: '🌾',
      filters: { severity: 'all', source: 'agricultural', cropCompatibility: 'all' }
    },
    {
      name: 'Industrial Zones',
      icon: '🏭',
      filters: { severity: 'all', source: 'industrial', cropCompatibility: 'all' }
    },
    {
      name: 'Recent Alerts',
      icon: '⏰',
      filters: { severity: 'moderate', source: 'all', cropCompatibility: 'all' }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search & Reset */}
      <div className="space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🔍</span>
          <input
            type="text"
            placeholder="Search regions, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/80 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 text-sm"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-600 font-medium">Active Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Preset Filters */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {presetFilters.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                Object.entries(preset.filters).forEach(([key, value]) => {
                  handleFilterChange(key as keyof FilterState, value);
                });
              }}
              className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <div className="text-lg mb-1">{preset.icon}</div>
              <div className="text-xs font-medium text-purple-800">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="text-purple-600">📍</span>
          Region
        </label>
        <select
          value={filters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="w-full p-3 bg-white/80 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 text-sm"
        >
          <option value="">All Regions</option>
          <option value="midwest">Midwest</option>
          <option value="northeast">Northeast</option>
          <option value="southeast">Southeast</option>
          <option value="southwest">Southwest</option>
          <option value="west">West</option>
        </select>
      </div>

      {/* Severity Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="text-purple-600">⚠️</span>
          Risk Level
        </label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 rounded-xl">
          {['all', 'low', 'moderate', 'high'].map((severity) => (
            <button
              key={severity}
              onClick={() => handleFilterChange('severity', severity)}
              className={`py-2 px-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                filters.severity === severity
                  ? 'bg-white shadow-sm text-purple-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Source Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="text-purple-600">🏗️</span>
          Contamination Source
        </label>
        <select
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          className="w-full p-3 bg-white/80 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 text-sm"
        >
          <option value="all">All Sources</option>
          <option value="industrial">Industrial</option>
          <option value="agricultural">Agricultural</option>
          <option value="urban">Urban</option>
        </select>
      </div>

      {/* Crop Compatibility Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="text-purple-600">🌱</span>
          Crop Compatibility
        </label>
        <select
          value={filters.cropCompatibility}
          onChange={(e) => handleFilterChange('cropCompatibility', e.target.value)}
          className="w-full p-3 bg-white/80 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 text-sm"
        >
          <option value="all">All Crops</option>
          <option value="corn">Corn</option>
          <option value="wheat">Wheat</option>
          <option value="soy">Soy</option>
          <option value="vegetables">Vegetables</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="text-purple-600">📅</span>
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">From</label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full p-2 bg-white/80 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">To</label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full p-2 bg-white/80 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="pt-4 border-t border-purple-100">
        <h4 className="font-semibold text-gray-800 mb-3">Advanced Options</h4>
        <div className="space-y-3">
          <button className="w-full p-3 text-left bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-xl transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-indigo-800">🤖 AI-Powered Recommendations</div>
                <div className="text-xs text-indigo-600">Get smart filter suggestions</div>
              </div>
              <span className="text-indigo-400 group-hover:text-indigo-600 transition-colors">→</span>
            </div>
          </button>
          
          <button className="w-full p-3 text-left bg-gradient-to-r from-teal-50 to-green-50 hover:from-teal-100 hover:to-green-100 border border-teal-200 rounded-xl transition-all duration-200 group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-teal-800">💾 Save Filter Preset</div>
                <div className="text-xs text-teal-600">Create custom filter templates</div>
              </div>
              <span className="text-teal-400 group-hover:text-teal-600 transition-colors">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
    if (filters.source !== 'all') count++;
    if (filters.cropCompatibility !== 'all') count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-4">
          {/* Region Selector */}
          <div className="space-y-2">
            <Label htmlFor="region" className="text-sm font-medium flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Location
            </Label>
            <div className="relative">
              <Input
                id="region"
                placeholder="State, county, or zip..."
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="text-sm h-9"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Severity Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Risk Level
            </Label>
            <Select 
              value={filters.severity} 
              onValueChange={(value) => handleFilterChange('severity', value)}
            >
              <SelectTrigger className="text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Low Risk
                  </div>
                </SelectItem>
                <SelectItem value="moderate">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Moderate Risk
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    High Risk
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Source Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              <Factory className="h-3 w-3" />
              Source Type
            </Label>
            <Select 
              value={filters.source} 
              onValueChange={(value) => handleFilterChange('source', value)}
            >
              <SelectTrigger className="text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="industrial">🏭 Industrial</SelectItem>
                <SelectItem value="agricultural">🌾 Agricultural</SelectItem>
                <SelectItem value="urban">🏢 Urban/Municipal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Crop Compatibility */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              <Wheat className="h-3 w-3" />
              Crop Impact
            </Label>
            <Select 
              value={filters.cropCompatibility} 
              onValueChange={(value) => handleFilterChange('cropCompatibility', value)}
            >
              <SelectTrigger className="text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="corn">🌽 Corn</SelectItem>
                <SelectItem value="wheat">🌾 Wheat</SelectItem>
                <SelectItem value="soy">🫘 Soybeans</SelectItem>
                <SelectItem value="vegetables">🥬 Vegetables</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Testing Period
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="text-sm h-9"
                placeholder="Start"
              />
              <Input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="text-sm h-9"
                placeholder="End"
              />
            </div>
          </div>

          {/* Reset Button */}
          {activeFilterCount > 0 && (
            <Button 
              onClick={resetFilters}
              variant="outline" 
              className="w-full text-sm h-9"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset Filters
            </Button>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm"
                className="text-xs h-8 bg-blue-600 hover:bg-blue-700"
              >
                🧪 Request Test
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="text-xs h-8"
              >
                📊 Get Report
              </Button>
            </div>
            <Button 
              size="sm"
              className="w-full text-xs h-8 bg-green-600 hover:bg-green-700"
            >
              🌱 AI Recommendations
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3 w-3 text-gray-600" />
              <p className="text-xs font-medium text-gray-700">Dashboard Stats</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <p className="text-gray-500">Fields Analyzed</p>
                <p className="font-bold text-green-600 text-lg">1,247</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">High Risk Areas</p>
                <p className="font-bold text-red-600 text-lg">23</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Tests Requested</p>
                <p className="font-bold text-blue-600 text-lg">156</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Avg Soil Health</p>
                <p className="font-bold text-orange-600 text-lg">72%</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default FilterPanel;
