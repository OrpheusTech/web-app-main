import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '@/types/dashboard';
import { Filter, RotateCcw, Search, MapPin, AlertTriangle, Factory, Wheat, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
