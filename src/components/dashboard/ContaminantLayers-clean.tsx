import React, { useState } from 'react';
import { ContaminantType } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff, Layers, Info } from 'lucide-react';

interface ContaminantLayersProps {
  activeLayers: ContaminantType[];
  onLayerToggle: (layer: ContaminantType) => void;
}

interface LayerConfig {
  type: ContaminantType;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  count: number;
}

const layerConfigs: LayerConfig[] = [
  {
    type: 'heavy-metals',
    name: 'Heavy Metals',
    icon: '⚗️',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200 hover:bg-red-100',
    description: 'Lead, mercury, cadmium contamination',
    count: 24
  },
  {
    type: 'pesticides',
    name: 'Pesticides',
    icon: '🌾',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    description: 'Herbicides, insecticides, fungicides',
    count: 18
  },
  {
    type: 'industrial-byproducts',
    name: 'Industrial Waste',
    icon: '🏭',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    description: 'PCBs, dioxins, industrial chemicals',
    count: 12
  },
  {
    type: 'plastic-microplastics',
    name: 'Microplastics',
    icon: '🔬',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    description: 'Plastic particles and fragments',
    count: 31
  },
  {
    type: 'organic-solvents',
    name: 'Organic Solvents',
    icon: '🧪',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
    description: 'TCE, benzene, chlorinated compounds',
    count: 15
  },
  {
    type: 'radiological',
    name: 'Radiological',
    icon: '☢️',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    description: 'Radioactive contamination',
    count: 7
  }
];

const ContaminantLayers: React.FC<ContaminantLayersProps> = ({ activeLayers, onLayerToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isLayerActive = (type: ContaminantType) => activeLayers.includes(type);

  const handleQuickAction = (action: 'all' | 'none' | 'high-priority') => {
    if (action === 'all') {
      layerConfigs.forEach(config => {
        if (!isLayerActive(config.type)) {
          onLayerToggle(config.type);
        }
      });
    } else if (action === 'none') {
      activeLayers.forEach(layer => onLayerToggle(layer));
    } else if (action === 'high-priority') {
      const highPriorityLayers: ContaminantType[] = ['heavy-metals', 'pesticides', 'radiological'];
      highPriorityLayers.forEach(layer => {
        if (!isLayerActive(layer)) {
          onLayerToggle(layer);
        }
      });
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" />
            Contamination Layers
            <Badge variant="secondary" className="ml-2">
              {activeLayers.length}
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="space-y-3">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('all')}
              className="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-200"
            >
              Show All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('none')}
              className="text-xs bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 border-gray-200"
            >
              Hide All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction('high-priority')}
              className="text-xs bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 border-red-200"
            >
              High Priority
            </Button>
          </div>

          {/* Layer Toggle Grid */}
          <div className="space-y-2">
            {layerConfigs.map((config) => {
              const isActive = isLayerActive(config.type);
              return (
                <div
                  key={config.type}
                  className={`
                    relative group p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? `${config.bgColor} border-current animate-pulse-ring` 
                      : 'bg-white/80 border-gray-200 hover:bg-gray-50'
                    }
                    hover:shadow-md hover:scale-[1.02] transform
                  `}
                  onClick={() => onLayerToggle(config.type)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${isActive ? 'animate-bounce' : ''}`}>
                        {config.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${config.color} group-hover:font-semibold transition-all`}>
                            {config.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {config.count}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {config.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle info click
                        }}
                      >
                        <Info className="h-3 w-3" />
                      </Button>
                      <Switch
                        checked={isActive}
                        onCheckedChange={() => onLayerToggle(config.type)}
                        className="data-[state=checked]:bg-emerald-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Layers Summary */}
          {activeLayers.length > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-emerald-800">
                    Active Layers ({activeLayers.length})
                  </h4>
                  <p className="text-sm text-emerald-600 mt-1">
                    Displaying {layerConfigs.filter(l => isLayerActive(l.type)).reduce((sum, l) => sum + l.count, 0)} contamination sites
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('none')}
                  className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ContaminantLayers;
