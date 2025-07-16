import React, { useState } from 'react';
import { ContaminantType } from '@/types/dashboard';
import { ChevronDown, ChevronUp, Info, Eye, EyeOff, Zap } from 'lucide-react';

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
  riskLevel: 'low' | 'medium' | 'high';
  category: 'Chemical' | 'Biological' | 'Physical' | 'Radiological';
  healthImpact: string;
}

const layerConfigs: LayerConfig[] = [
  {
    type: 'heavy-metals',
    name: 'Heavy Metals',
    icon: '⚗️',
    color: 'text-red-700',
    bgColor: 'bg-gradient-to-r from-red-50 to-orange-50',
    description: 'Lead, mercury, cadmium contamination',
    count: 247,
    riskLevel: 'high',
    category: 'Chemical',
    healthImpact: 'Neurological damage, organ failure, developmental issues'
  },
  {
    type: 'pesticides',
    name: 'Pesticides',
    icon: '🌾',
    color: 'text-amber-700',
    bgColor: 'bg-gradient-to-r from-amber-50 to-yellow-50',
    description: 'Herbicides, insecticides, fungicides',
    count: 189,
    riskLevel: 'medium',
    category: 'Chemical',
    healthImpact: 'Endocrine disruption, cancer risk, reproductive issues'
  },
  {
    type: 'industrial-byproducts',
    name: 'Industrial Waste',
    icon: '🏭',
    color: 'text-purple-700',
    bgColor: 'bg-gradient-to-r from-purple-50 to-indigo-50',
    description: 'PCBs, dioxins, industrial chemicals',
    count: 123,
    riskLevel: 'high',
    category: 'Chemical',
    healthImpact: 'Cancer, immune system suppression, birth defects'
  },
  {
    type: 'plastic-microplastics',
    name: 'Microplastics',
    icon: '🔬',
    color: 'text-blue-700',
    bgColor: 'bg-gradient-to-r from-blue-50 to-cyan-50',
    description: 'Plastic particles and fragments',
    count: 312,
    riskLevel: 'medium',
    category: 'Physical',
    healthImpact: 'Gastrointestinal issues, potential hormone disruption'
  },
  {
    type: 'organic-solvents',
    name: 'Organic Solvents',
    icon: '🧪',
    color: 'text-emerald-700',
    bgColor: 'bg-gradient-to-r from-emerald-50 to-green-50',
    description: 'TCE, benzene, chlorinated compounds',
    count: 156,
    riskLevel: 'high',
    category: 'Chemical',
    healthImpact: 'Liver damage, nervous system effects, cancer risk'
  },
  {
    type: 'radiological',
    name: 'Radiological',
    icon: '☢️',
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-r from-orange-50 to-red-50',
    description: 'Radioactive contamination',
    count: 47,
    riskLevel: 'high',
    category: 'Radiological',
    healthImpact: 'Radiation sickness, cancer, genetic damage'
  }
];

const ContaminantLayers: React.FC<ContaminantLayersProps> = ({ activeLayers, onLayerToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Chemical']);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const isLayerActive = (type: ContaminantType) => activeLayers.includes(type);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleQuickAction = (action: 'all' | 'none' | 'high-risk') => {
    if (action === 'all') {
      layerConfigs.forEach(config => {
        if (!isLayerActive(config.type)) {
          onLayerToggle(config.type);
        }
      });
    } else if (action === 'none') {
      activeLayers.forEach(layer => onLayerToggle(layer));
    } else if (action === 'high-risk') {
      const highRiskLayers = layerConfigs.filter(l => l.riskLevel === 'high');
      highRiskLayers.forEach(layer => {
        if (!isLayerActive(layer.type)) {
          onLayerToggle(layer.type);
        }
      });
    }
  };

  const highlightAllInCategory = (category: string) => {
    const categoryLayers = layerConfigs.filter(l => l.category === category);
    categoryLayers.forEach(layer => {
      if (!isLayerActive(layer.type)) {
        onLayerToggle(layer.type);
      }
    });
  };

  const categories = Array.from(new Set(layerConfigs.map(l => l.category)));

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction('all')}
            className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Eye className="h-3 w-3 inline mr-1" />
            Show All
          </button>
          <button
            onClick={() => handleQuickAction('none')}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105"
          >
            <EyeOff className="h-3 w-3 inline mr-1" />
            Hide All
          </button>
          <button
            onClick={() => handleQuickAction('high-risk')}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105"
          >
            ⚠️ High Risk Only
          </button>
        </div>
      </div>

      {/* Categorized Layers */}
      <div className="space-y-3">
        {categories.map(category => {
          const categoryLayers = layerConfigs.filter(l => l.category === category);
          const isExpanded = expandedCategories.includes(category);
          const activeCategoryLayers = categoryLayers.filter(l => isLayerActive(l.type)).length;

          return (
            <div key={category} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Category Header */}
              <div 
                className="p-4 bg-gradient-to-r from-gray-50 to-stone-50 border-b border-gray-100 cursor-pointer hover:bg-gradient-to-r hover:from-gray-100 hover:to-stone-100 transition-all duration-200"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-gray-600" />
                      )}
                      <h3 className="font-semibold text-gray-800">{category}</h3>
                    </div>
                    {activeCategoryLayers > 0 && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        {activeCategoryLayers} active
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      highlightAllInCategory(category);
                    }}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    Highlight All
                  </button>
                </div>
              </div>

              {/* Category Layers */}
              {isExpanded && (
                <div className="p-4 space-y-3">
                  {categoryLayers.map((config) => {
                    const isActive = isLayerActive(config.type);
                    return (
                      <div
                        key={config.type}
                        className={`
                          relative group p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                          ${isActive 
                            ? `${config.bgColor} border-current shadow-lg scale-[1.02]` 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => onLayerToggle(config.type)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`text-2xl ${isActive ? 'animate-pulse' : ''}`}>
                              {config.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-semibold ${config.color}`}>
                                  {config.name}
                                </h4>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getRiskBadgeColor(config.riskLevel)}`}>
                                  {config.riskLevel.toUpperCase()}
                                </span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                  {config.count}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {config.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onMouseEnter={() => setShowTooltip(config.type)}
                              onMouseLeave={() => setShowTooltip(null)}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 hover:bg-white/50 rounded-lg transition-colors opacity-70 hover:opacity-100"
                            >
                              <Info className="h-4 w-4 text-gray-600" />
                            </button>
                            
                            {/* Custom Toggle Switch */}
                            <div className={`
                              relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer
                              ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}
                            `}>
                              <div className={`
                                absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
                                ${isActive ? 'left-7' : 'left-1'}
                              `} />
                            </div>
                          </div>
                        </div>

                        {/* Active indicator pulse */}
                        {isActive && (
                          <div className="absolute top-2 right-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                          </div>
                        )}

                        {/* Tooltip */}
                        {showTooltip === config.type && (
                          <div className="absolute z-50 bottom-full left-4 right-4 mb-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
                            <div className="font-medium mb-1">Health Impact:</div>
                            <div>{config.healthImpact}</div>
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Summary */}
      {activeLayers.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-emerald-800 mb-1">
                {activeLayers.length} Active Layer{activeLayers.length !== 1 ? 's' : ''}
              </h4>
              <p className="text-sm text-emerald-600">
                Monitoring {layerConfigs.filter(l => isLayerActive(l.type)).reduce((sum, l) => sum + l.count, 0)} contamination sites
              </p>
            </div>
            <button
              onClick={() => handleQuickAction('none')}
              className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm font-medium rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContaminantLayers;
