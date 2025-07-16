export type ContaminantType = 
  | 'heavy-metals'
  | 'pesticides'
  | 'industrial-byproducts'
  | 'plastic-microplastics'
  | 'fertilizer-runoff'
  | 'organic-pollutants'
  | 'radioactive-rare'
  | 'organic-solvents'
  | 'radiological';

export interface ToxinInfo {
  id: string;
  name: string;
  icon: string;
  hazardType: '☢️' | '☣️' | '🧬' | '💧' | '🔬' | '🌿' | '⚗️';
  source: string;
  impact: string;
  description: string;
  healthThreshold?: string;
  regulatoryInfo?: string;
  remediationLinks?: string[];
  coordinates: [number, number];
  severity: 'low' | 'moderate' | 'high';
  category: ContaminantType;
}

export interface FilterState {
  search: string;
  contaminationType: string;
  region: string;
  severity: 'all' | 'low' | 'moderate' | 'high';
  source: 'all' | 'industrial' | 'agricultural' | 'urban';
  cropCompatibility: 'all' | 'corn' | 'wheat' | 'soy' | 'vegetables' | 'low-impact' | 'moderate-impact' | 'high-impact' | 'unsuitable';
  dateRange: {
    start: string;
    end: string;
  };
}

export interface FieldData {
  id: string;
  location: string;
  coordinates: [number, number];
  severity: 'low' | 'moderate' | 'high';
  contaminants: string[];
  crops: string[];
  lastTested: string;
  soilHealth: number;
  recommendations: string[];
}

export interface ContaminantLayer {
  type: ContaminantType;
  name: string;
  description: string;
  color: string;
  icon: string;
  enabled: boolean;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
