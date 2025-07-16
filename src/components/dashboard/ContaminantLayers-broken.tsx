import React, { useState } from 'react';
import { ContaminantType } from '@/types/dashboard';

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
    description: 'Plastic particles, polymer residues',
    count: 31
  },
  {
    type: 'fertilizer-runoff',
    name: 'Fertilizer Runoff',
    icon: '💧',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
    description: 'Nitrogen, phosphorus compounds',
    count: 27
  },
  {
    type: 'organic-pollutants',
    name: 'Organic Pollutants',
    icon: '🧬',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
    description: 'PAHs, organic solvents',
    count: 15
  },
  {
    type: 'radioactive-rare',
    name: 'Radioactive Materials',
    icon: '☢️',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    description: 'Uranium, radon, radioactive isotopes',
    count: 3
  }
];

const ContaminantLayers: React.FC<ContaminantLayersProps> = ({ activeLayers, onLayerToggle }) => {
  const [selectedAll, setSelectedAll] = useState(false);

  const handleSelectAll = () => {
    if (selectedAll) {
      // Deselect all
      activeLayers.forEach(layer => onLayerToggle(layer));
    } else {
      // Select all that aren't already active
      layerConfigs.forEach(config => {
        if (!activeLayers.includes(config.type)) {
          onLayerToggle(config.type);
        }
      });
    }
    setSelectedAll(!selectedAll);
  };

  const isActive = (layer: ContaminantType) => activeLayers.includes(layer);

  return (
    <div className="space-y-4">
      {/* Select All Toggle */}
      <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <div>
          <h3 className="font-semibold text-emerald-800">Layer Controls</h3>
          <p className="text-xs text-emerald-600">Toggle all contamination layers</p>
        </div>
        <button
          onClick={handleSelectAll}
          className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
            selectedAll ? 'bg-emerald-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 ${
              selectedAll ? 'left-6' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-3">
        {layerConfigs.map((config) => {
          const active = isActive(config.type);
          
          return (
            <div
              key={config.type}
              className={`group relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                active
                  ? `${config.bgColor} ring-2 ring-offset-2 ring-emerald-300 shadow-lg scale-[1.02]`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
              onClick={() => onLayerToggle(config.type)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Icon with glow effect when active */}
                  <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                    active ? `bg-white shadow-lg ${config.color}` : 'bg-white/50'
                  }`}>
                    <span className={`text-xl transition-transform duration-300 ${
                      active ? 'scale-110' : 'scale-100'
                    }`}>
                      {config.icon}
                    </span>
                    {active && (
                      <div className="absolute inset-0 rounded-xl bg-current opacity-10 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Layer Info */}
                  <div className="flex-1">
                    <h4 className={`font-semibold transition-colors duration-200 ${
                      active ? config.color : 'text-gray-700'
                    }`}>
                      {config.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">{config.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{config.count} sites</span>
                      {active && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Visible
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                  active ? 'bg-emerald-500' : 'bg-gray-300'
                }`}>
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                      active ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      {/* Active Layers Summary */}
      {activeLayers.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
          <h4 className="font-semibold text-emerald-800 mb-2">Active Layers</h4>
          <div className="flex flex-wrap gap-2">
            {activeLayers.map((layer) => {
              const config = layerConfigs.find(c => c.type === layer);
              if (!config) return null;
              
              return (
                <span
                  key={layer}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${config.bgColor} ${config.color}`}
                >
                  <span>{config.icon}</span>
                  {config.name}
                </span>
              );
            })}
          </div>
          <button
            onClick={() => activeLayers.forEach(layer => onLayerToggle(layer))}
            className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear all layers
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 space-y-2">
        <h4 className="font-semibold text-gray-800">Quick Filters</h4>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 text-xs bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 transition-colors">
            High Risk Only
          </button>
          <button className="p-2 text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg border border-orange-200 transition-colors">
            Recent Alerts
          </button>
          <button className="p-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors">
            Agricultural Areas
          </button>
          <button className="p-2 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200 transition-colors">
            Industrial Zones
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContaminantLayers;

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
