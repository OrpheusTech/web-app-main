import React, { useState, useRef, useEffect } from 'react';
import { FilterState } from '@/types/dashboard';
import { Search, X, Sparkles, MapPin, Calendar, Filter, ChevronDown, Trash2 } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

interface FilterChip {
  id: string;
  label: string;
  value: string;
  type: string;
  color: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [smartSearch, setSmartSearch] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterChips, setFilterChips] = useState<FilterChip[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // AI-powered search suggestions
  const searchSuggestions = [
    "high-risk pesticide fields in North Dakota",
    "industrial waste sites near water sources",
    "heavy metal contamination in agricultural areas",
    "recent detections above safety thresholds",
    "microplastic contamination in coastal regions",
    "radiological sites requiring immediate attention",
    "organic solvents in urban industrial zones",
    "lead contamination in residential areas",
    "PCB levels exceeding regulatory limits"
  ];

  useEffect(() => {
    // Generate AI suggestions based on search input
    if (smartSearch.length > 2) {
      const suggestions = searchSuggestions.filter(s => 
        s.toLowerCase().includes(smartSearch.toLowerCase())
      ).slice(0, 5);
      setAiSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setAiSuggestions([]);
      setShowSuggestions(false);
    }
  }, [smartSearch]);

  useEffect(() => {
    // Update filter chips based on current filters
    const chips: FilterChip[] = [];
    
    if (filters.search) {
      chips.push({
        id: 'search',
        label: `Search: "${filters.search}"`,
        value: filters.search,
        type: 'search',
        color: 'bg-blue-100 text-blue-700 border-blue-200'
      });
    }
    
    if (filters.contaminationType !== 'all') {
      chips.push({
        id: 'type',
        label: `Type: ${filters.contaminationType.replace('-', ' ')}`,
        value: filters.contaminationType,
        type: 'contaminationType',
        color: 'bg-purple-100 text-purple-700 border-purple-200'
      });
    }
    
    if (filters.severity !== 'all') {
      chips.push({
        id: 'severity',
        label: `Severity: ${filters.severity}`,
        value: filters.severity,
        type: 'severity',
        color: 'bg-red-100 text-red-700 border-red-200'
      });
    }
    
    if (filters.source !== 'all') {
      chips.push({
        id: 'source',
        label: `Source: ${filters.source}`,
        value: filters.source,
        type: 'source',
        color: 'bg-green-100 text-green-700 border-green-200'
      });
    }
    
    if (filters.dateRange.start || filters.dateRange.end) {
      const dateLabel = filters.dateRange.start && filters.dateRange.end 
        ? `${filters.dateRange.start} to ${filters.dateRange.end}`
        : filters.dateRange.start 
          ? `After ${filters.dateRange.start}`
          : `Before ${filters.dateRange.end}`;
      
      chips.push({
        id: 'date',
        label: `Date: ${dateLabel}`,
        value: `${filters.dateRange.start}-${filters.dateRange.end}`,
        type: 'dateRange',
        color: 'bg-amber-100 text-amber-700 border-amber-200'
      });
    }
    
    setFilterChips(chips);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      contaminationType: 'all',
      region: '',
      severity: 'all',
      source: 'all',
      cropCompatibility: 'all',
      dateRange: { start: '', end: '' }
    });
    setSmartSearch('');
  };

  const removeFilterChip = (chipId: string, chipType: string) => {
    switch (chipType) {
      case 'search':
        handleFilterChange('search', '');
        setSmartSearch('');
        break;
      case 'contaminationType':
        handleFilterChange('contaminationType', 'all');
        break;
      case 'severity':
        handleFilterChange('severity', 'all');
        break;
      case 'source':
        handleFilterChange('source', 'all');
        break;
      case 'dateRange':
        handleDateRangeChange('start', '');
        handleDateRangeChange('end', '');
        break;
    }
  };

  const handleSmartSearch = (query: string) => {
    setSmartSearch(query);
    handleFilterChange('search', query);
    setShowSuggestions(false);
    
    // AI parsing logic (simplified)
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('high-risk') || lowerQuery.includes('high risk')) {
      handleFilterChange('severity', 'high');
    }
    
    if (lowerQuery.includes('pesticide')) {
      handleFilterChange('contaminationType', 'pesticides');
    }
    
    if (lowerQuery.includes('heavy metal')) {
      handleFilterChange('contaminationType', 'heavy-metals');
    }
    
    if (lowerQuery.includes('industrial')) {
      handleFilterChange('source', 'industrial');
    }
    
    if (lowerQuery.includes('agricultural')) {
      handleFilterChange('source', 'agricultural');
    }
  };

  const quickFilters = [
    { label: '🔴 High Risk', action: () => handleFilterChange('severity', 'high') },
    { label: '🏭 Industrial', action: () => handleFilterChange('source', 'industrial') },
    { label: '🌾 Agricultural', action: () => handleFilterChange('source', 'agricultural') },
    { label: '📅 Recent (30d)', action: () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      handleDateRangeChange('start', thirtyDaysAgo);
      handleDateRangeChange('end', today);
    }}
  ];

  return (
    <div className="space-y-4">
      {/* AI-Powered Smart Search */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-blue-700">AI Smart Search</h3>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Try: 'high-risk pesticide fields in ND' or 'industrial waste near water'"
            value={smartSearch}
            onChange={(e) => setSmartSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSmartSearch(smartSearch);
              }
            }}
            onFocus={() => setShowSuggestions(aiSuggestions.length > 0)}
            className="w-full pl-10 pr-10 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          {smartSearch && (
            <button
              onClick={() => {
                setSmartSearch('');
                handleFilterChange('search', '');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* AI Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {aiSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSmartSearch(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-blue-500" />
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      {filterChips.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Active Filters ({filterChips.length})
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Clear All
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => (
              <div
                key={chip.id}
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium
                  ${chip.color} transition-all duration-200 hover:scale-105
                `}
              >
                <span>{chip.label}</span>
                <button
                  onClick={() => removeFilterChip(chip.id, chip.type)}
                  className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Filters</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={filter.action}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-gray-700">Advanced Filters</span>
          <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Contamination Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Contamination Type</label>
              <select
                value={filters.contaminationType}
                onChange={(e) => handleFilterChange('contaminationType', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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

            {/* Severity Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Severity Level</label>
              <select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Levels</option>
                <option value="low">🟢 Low Risk</option>
                <option value="moderate">🟡 Moderate Risk</option>
                <option value="high">🔴 High Risk</option>
              </select>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Contamination Source</label>
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Sources</option>
                <option value="agricultural">🌾 Agricultural</option>
                <option value="industrial">🏭 Industrial</option>
                <option value="urban">🏢 Urban</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Detection Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <h3 className="text-sm font-semibold text-emerald-700">AI Insights</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-emerald-700">
              <strong>Trending:</strong> 23% increase in microplastic detections this quarter
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-emerald-700">
              <strong>Alert:</strong> 3 new high-risk sites detected in agricultural zones
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-emerald-700">
              <strong>Recommendation:</strong> Focus monitoring on industrial corridor regions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
