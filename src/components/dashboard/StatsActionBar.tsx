import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, AlertTriangle, Beaker, Brain, FileText, X } from 'lucide-react';
import { FieldData } from '@/types/dashboard';

interface StatsActionBarProps {
  selectedField: FieldData | null;
  onClose: () => void;
}

const StatsActionBar: React.FC<StatsActionBarProps> = ({ selectedField, onClose }) => {
  const generalStats = {
    fieldsAnalyzed: 1247,
    highRiskAreas: 23,
    avgSoilHealth: 72,
    testsRequested: 156,
    remediationActive: 12
  };

  if (selectedField) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              🌾
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Field Analysis</h3>
              <p className="text-sm text-gray-600">{selectedField.location}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Contamination Level</p>
            <div className="flex items-center gap-2">
              <Badge 
                className={`${
                  selectedField.severity === 'high' ? 'bg-red-100 text-red-700' :
                  selectedField.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}
              >
                {selectedField.severity?.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Soil Health Score</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-600">{selectedField.soilHealth}%</span>
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Primary Contaminants</p>
            <p className="font-medium text-gray-800">{selectedField.contaminants?.join(', ')}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Crops Grown</p>
            <p className="font-medium text-gray-800">{selectedField.crops?.join(', ')}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Beaker className="h-4 w-4 mr-2" />
            Request Soil Test
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Brain className="h-4 w-4 mr-2" />
            AI Recommendations
          </Button>
          <Button size="sm" variant="outline">
            View History
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Dashboard Overview</h3>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          Live Data
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity className="h-4 w-4 text-green-600" />
            <p className="text-sm text-gray-500">Fields Analyzed</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{generalStats.fieldsAnalyzed.toLocaleString()}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-gray-500">High Risk Areas</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{generalStats.highRiskAreas}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-gray-500">Avg Soil Health</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">{generalStats.avgSoilHealth}%</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Beaker className="h-4 w-4 text-purple-600" />
            <p className="text-sm text-gray-500">Tests Requested</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">{generalStats.testsRequested}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Brain className="h-4 w-4 text-orange-600" />
            <p className="text-sm text-gray-500">Active Remediation</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">{generalStats.remediationActive}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Beaker className="h-4 w-4 mr-2" />
          Request Soil Test
        </Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          <Brain className="h-4 w-4 mr-2" />
          AI Recommendations
        </Button>
        <Button size="sm" variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
    </Card>
  );
};

export default StatsActionBar;
