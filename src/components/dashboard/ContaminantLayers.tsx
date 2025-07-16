import React, { useState } from 'react';
import { ContaminantType } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface ContaminantLayersProps {
  activeLayers: ContaminantType[];
  onLayerToggle: (layer: ContaminantType) => void;
}

interface LayerConfig {
  type: ContaminantType;
  name: string;
  icon: string;
  color: string;
  description: string;
  count: number;
}

const layerConfigs: LayerConfig[] = [
  {
    type: 'heavy-metals',
    name: 'Heavy Metals',
    icon: '⚗️',
    color: 'text-red-600',
    description: 'Lead, mercury, cadmium',
    count: 24
  },
  {
    type: 'pesticides',
    name: 'Pesticides',
    icon: '🌾',
    color: 'text-orange-600',
    description: 'Herbicides, insecticides',
    count: 18
  },
  {
    type: 'industrial-byproducts',
    name: 'Industrial Waste',
    icon: '🏭',
    color: 'text-purple-600',
    description: 'PCBs, dioxins',
    count: 12
  },
  {
    type: 'plastic-microplastics',
    name: 'Microplastics',
    icon: '🔬',
    color: 'text-blue-600',
    description: 'Plastic particles',
    count: 31
  },
  {
    type: 'organic-solvents',
    name: 'Organic Solvents',
    icon: '🧪',
    color: 'text-green-600',
    description: 'TCE, benzene',
    count: 15
  },
  {
    type: 'radiological',
    name: 'Radiological',
    icon: '☢️',
    color: 'text-yellow-600',
    description: 'Radioactive materials',
    count: 7
  }
];

const ContaminantLayers: React.FC<ContaminantLayersProps> = ({ activeLayers, onLayerToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isLayerActive = (type: ContaminantType) => activeLayers.includes(type);

  const handleQuickAction = (action: 'all' | 'none') => {
    if (action === 'all') {
      layerConfigs.forEach(config => {
        if (!isLayerActive(config.type)) {
          onLayerToggle(config.type);
        }
      });
    } else if (action === 'none') {
      activeLayers.forEach(layer => onLayerToggle(layer));
    }
  };

  if (isCollapsed) {
    return (
      <Card className="bg-white border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
              Contamination Layers
              {activeLayers.length > 0 && (
                <Badge variant="secondary">{activeLayers.length}</Badge>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(false)}
              className="h-6 w-6 p-0"
            >
              ↓
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
            Contamination Layers
            {activeLayers.length > 0 && (
              <Badge variant="secondary">{activeLayers.length}</Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(true)}
            className="h-6 w-6 p-0"
          >
            ↑
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuickAction('all')}
            className="text-xs"
          >
            Show All
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuickAction('none')}
            className="text-xs"
          >
            Hide All
          </Button>
        </div>

        {/* Layer Toggles */}
        <div className="space-y-2">
          {layerConfigs.map((config) => {
            const isActive = isLayerActive(config.type);
            return (
              <div
                key={config.type}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  isActive ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => onLayerToggle(config.type)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{config.icon}</span>
                    <div>
                      <h3 className={`text-sm font-medium ${config.color}`}>
                        {config.name}
                      </h3>
                      <p className="text-xs text-gray-600">{config.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {config.count}
                    </Badge>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => onLayerToggle(config.type)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Summary */}
        {activeLayers.length > 0 && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-emerald-800">
                  {activeLayers.length} Active Layers
                </h4>
                <p className="text-xs text-emerald-600">
                  {layerConfigs.filter(l => isLayerActive(l.type)).reduce((sum, l) => sum + l.count, 0)} contamination sites
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction('none')}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContaminantLayers;
