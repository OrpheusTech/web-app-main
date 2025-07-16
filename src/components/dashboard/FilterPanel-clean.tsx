import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Filter, X, ChevronDown, Sparkles } from 'lucide-react';

interface FilterState {
  search: string;
  contaminationType: string;
  severity: string;
  source: string;
  cropCompatibility: string;
  dateRange: {
    start: string;
    end: string;
  };
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.contaminationType !== 'all') count++;
    if (filters.severity !== 'all') count++;
    if (filters.source !== 'all') count++;
    if (filters.cropCompatibility !== 'all') count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

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
      severity: 'all',
      source: 'all',
      cropCompatibility: 'all',
      dateRange: { start: '', end: '' }
    });
  };

  const applyPreset = (preset: string) => {
    const presets = {
      'agricultural': {
        ...filters,
        contaminationType: 'pesticides',
        cropCompatibility: 'high-impact',
        source: 'agricultural'
      },
      'industrial': {
        ...filters,
        contaminationType: 'heavy-metals',
        severity: 'high',
        source: 'industrial'
      },
      'recent': {
        ...filters,
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0]
        }
      }
    };

    onFiltersChange(presets[preset as keyof typeof presets]);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="h-5 w-5 text-emerald-600" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 text-xs text-gray-500 hover:text-red-600"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contamination sites..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 bg-gradient-to-r from-gray-50 to-white border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        {/* Quick Filter Presets */}
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => applyPreset('agricultural')}
            className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200"
          >
            🌾 Agricultural
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => applyPreset('industrial')}
            className="text-xs bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200"
          >
            🏭 Industrial
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => applyPreset('recent')}
            className="text-xs bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 border-orange-200"
          >
            📅 Recent
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
            {/* Contamination Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contamination Type</label>
              <Select value={filters.contaminationType} onValueChange={(value) => handleFilterChange('contaminationType', value)}>
                <SelectTrigger className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="heavy-metals">Heavy Metals</SelectItem>
                  <SelectItem value="pesticides">Pesticides</SelectItem>
                  <SelectItem value="industrial-byproducts">Industrial Byproducts</SelectItem>
                  <SelectItem value="plastic-microplastics">Microplastics</SelectItem>
                  <SelectItem value="organic-solvents">Organic Solvents</SelectItem>
                  <SelectItem value="radiological">Radiological</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Severity Level</label>
              <Select value={filters.severity} onValueChange={(value) => handleFilterChange('severity', value)}>
                <SelectTrigger className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="critical">⚫ Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contamination Source</label>
              <Select value={filters.source} onValueChange={(value) => handleFilterChange('source', value)}>
                <SelectTrigger className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="urban">Urban Development</SelectItem>
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Crop Compatibility */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Crop Impact</label>
              <Select value={filters.cropCompatibility} onValueChange={(value) => handleFilterChange('cropCompatibility', value)}>
                <SelectTrigger className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
                  <SelectValue placeholder="All impacts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact Levels</SelectItem>
                  <SelectItem value="low-impact">Low Impact</SelectItem>
                  <SelectItem value="moderate-impact">Moderate Impact</SelectItem>
                  <SelectItem value="high-impact">High Impact</SelectItem>
                  <SelectItem value="unsuitable">Unsuitable for Crops</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Detection Date Range</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="bg-gradient-to-r from-gray-50 to-white border-gray-200"
                />
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="bg-gradient-to-r from-gray-50 to-white border-gray-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <h4 className="font-medium text-blue-800">AI Recommendations</h4>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            Based on current data patterns, consider filtering for:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleFilterChange('severity', 'high')}
              className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              High Severity Sites
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => applyPreset('recent')}
              className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              Recent Detections
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
