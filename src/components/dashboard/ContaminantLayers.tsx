import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContaminantType, ContaminantLayer } from '@/types/dashboard';
import { Eye, EyeOff, Layers, Info } from 'lucide-react';
import { useState } from 'react';

interface ContaminantLayersProps {
  activeLayers: ContaminantType[];
  onLayerToggle: (layer: ContaminantType) => void;
}

const contaminantLayers: ContaminantLayer[] = [
  {
    type: 'heavy-metals',
    name: 'Heavy Metals',
    description: 'Lead, mercury, cadmium, arsenic',
    color: '#dc2626',
    icon: '☢️',
    enabled: false
  },
  {
    type: 'pesticides',
    name: 'Pesticides',
    description: 'Herbicides, insecticides, fungicides',
    color: '#ea580c',
    icon: '🧬',
    enabled: false
  },
  {
    type: 'industrial-byproducts',
    name: 'Industrial Byproducts',
    description: 'PCBs, dioxins, PAHs',
    color: '#7c2d12',
    icon: '🏭',
    enabled: false
  },
  {
    type: 'plastic-microplastics',
    name: 'Plastic/Microplastics',
    description: 'Plastic particles, polymer residues',
    color: '#0369a1',
    icon: '♻️',
    enabled: false
  },
  {
    type: 'fertilizer-runoff',
    name: 'Fertilizer Runoff',
    description: 'Nitrates, phosphates, ammonia',
    color: '#059669',
    icon: '💧',
    enabled: false
  },
  {
    type: 'organic-pollutants',
    name: 'Organic Pollutants',
    description: 'PFAS, pharmaceuticals, VOCs',
    color: '#7c3aed',
    icon: '🌿',
    enabled: false
  },
  {
    type: 'radioactive-rare',
    name: 'Radioactive & Rare',
    description: 'Uranium, thorium, rare earth elements',
    color: '#be123c',
    icon: '☣️',
    enabled: false
  }
];

const ContaminantLayers: React.FC<ContaminantLayersProps> = ({ 
  activeLayers, 
  onLayerToggle 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const activeCount = activeLayers.length;
  const totalCount = contaminantLayers.length;

  const handleShowAll = () => {
    contaminantLayers.forEach(layer => {
      if (!activeLayers.includes(layer.type)) {
        onLayerToggle(layer.type);
      }
    });
  };

  const handleHideAll = () => {
    activeLayers.forEach(layer => onLayerToggle(layer));
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" />
            Toxin Layers
            <Badge variant="secondary" className="ml-2">
              {activeCount}/{totalCount}
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
          {/* Quick actions */}
          <div className="flex gap-2 mb-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleShowAll}
              className="flex-1 text-xs h-8"
              disabled={activeCount === totalCount}
            >
              Show All
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleHideAll}
              className="flex-1 text-xs h-8"
              disabled={activeCount === 0}
            >
              Hide All
            </Button>
          </div>

          {/* Layer toggles */}
          <div className="space-y-2">
            {contaminantLayers.map((layer) => {
              const isActive = activeLayers.includes(layer.type);
              
              return (
                <div 
                  key={layer.type}
                  className="group relative flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div 
                      className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: isActive ? layer.color : 'transparent',
                        borderColor: layer.color 
                      }}
                    />
                    <span className="text-lg flex-shrink-0">{layer.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-gray-800 truncate">
                        {layer.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onMouseEnter={() => setShowTooltip(layer.type)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => onLayerToggle(layer.type)}
                      className="data-[state=checked]:bg-blue-600 scale-75"
                    />
                  </div>

                  {/* Tooltip */}
                  {showTooltip === layer.type && (
                    <div className="absolute left-full ml-2 z-50 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {layer.description}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-2 border-b-2 border-r-2 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Active layers summary */}
          {activeCount > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-1">
                🎯 Active Filters
              </p>
              <p className="text-xs text-blue-600">
                Showing {activeCount} contamination layer{activeCount !== 1 ? 's' : ''} on map
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-700 font-medium mb-1">
              💡 Tips
            </p>
            <p className="text-xs text-amber-600">
              Toggle layers to focus on specific contaminants. Click map markers for details.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ContaminantLayers;
