import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer'
import InteractiveGlobalMap from '../components/InteractiveGlobalMap';
import { Upload, Map, Filter, BarChart3, Settings, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PanelLayout from '@/components/ui/panel-layout'


interface FilterState {
  search: string;
  contaminationType: 'all' | 'heavy-metals' | 'pesticides' | 'industrial-byproducts' | 'plastic-microplastics' | 'organic-solvents' | 'radiological';
  region: string;
  severity: 'all' | 'low' | 'moderate' | 'high';
  source: 'all' | 'agricultural' | 'industrial' | 'urban';
  cropCompatibility: 'all' | 'corn' | 'soybeans' | 'wheat' | 'cotton';
  dateRange: {
    start: string;
    end: string;
  };
}

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    contaminationType: 'all',
    region: '',
    severity: 'all',
    source: 'all',
    cropCompatibility: 'all',
    dateRange: { start: '', end: '' }
  });
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="pt-24 pb-12 bg-gradient-to-br from-background to-card">
      <Navigation />
      <PanelLayout/>
      <Footer />
    </div>
  );
};

export default Dashboard;
