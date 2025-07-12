import React from 'react';
import { FieldData } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StatsActionBarProps {
  selectedField?: FieldData | null;
  onClose?: () => void;
}

const StatsActionBar: React.FC<StatsActionBarProps> = ({ selectedField, onClose }) => {
  const stats = [
    { label: 'Total Sites', value: '1,247', color: 'text-blue-600' },
    { label: 'Active Monitoring', value: '892', color: 'text-green-600' },
    { label: 'High Risk', value: '34', color: 'text-red-600' },
    { label: 'Remediation', value: '156', color: 'text-orange-600' }
  ];

  if (selectedField) {
    return (
      <div className="p-4 border-t bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-semibold text-gray-800">{selectedField.location}</h3>
              <p className="text-sm text-gray-600">
                Last tested: {selectedField.lastTested}
              </p>
            </div>
            <div className="flex gap-2">
              {selectedField.contaminants.map((contaminant, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {contaminant}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Soil Health:</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${selectedField.soilHealth}%` }}
                />
              </div>
              <span className="text-sm font-medium">{selectedField.soilHealth}%</span>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Export Data
          </Button>
          <Button size="sm">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsActionBar;
