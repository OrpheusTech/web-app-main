import React from 'react';
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
    remediationActive: 12,
    trendsImproving: 67
  };

  if (selectedField) {
    return (
      <div className="bg-gradient-to-r from-emerald-800/95 to-teal-800/95 backdrop-blur-xl border-t border-emerald-300/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">🌾</span>
            </div>
            <div>
              <h3 className="font-bold text-emerald-100 text-lg">Field Analysis</h3>
              <p className="text-emerald-200">{selectedField.location}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-emerald-700/50 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <span className="text-emerald-200 text-xl">✕</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">⚠️</span>
              <p className="text-sm text-emerald-200 font-medium">Risk Level</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                selectedField.severity === 'high' ? 'bg-red-500 text-white' :
                selectedField.severity === 'moderate' ? 'bg-orange-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {selectedField.severity?.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">🌱</span>
              <p className="text-sm text-emerald-200 font-medium">Soil Health</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-100">{selectedField.soilHealth}%</span>
              <div className="flex-1 bg-emerald-900/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${selectedField.soilHealth}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">🧪</span>
              <p className="text-sm text-emerald-200 font-medium">Contaminants</p>
            </div>
            <div className="text-emerald-100">
              <span className="text-xl font-bold">{selectedField.contaminants.length}</span>
              <p className="text-xs text-emerald-300">{selectedField.contaminants.join(', ')}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">📅</span>
              <p className="text-sm text-emerald-200 font-medium">Last Tested</p>
            </div>
            <p className="text-emerald-100 font-semibold">{selectedField.lastTested}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400">🌾</span>
              <p className="text-sm text-emerald-200 font-medium">Crops</p>
            </div>
            <p className="text-emerald-100 font-semibold text-sm">{selectedField.crops.join(', ')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
            <span>📊</span>
            Detailed Analysis
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
            <span>🤖</span>
            AI Recommendations
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
            <span>🚨</span>
            Schedule Testing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-800/95 to-teal-800/95 backdrop-blur-xl border-t border-emerald-300/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl">📊</span>
          </div>
          <div>
            <h3 className="font-bold text-emerald-100 text-lg">Environmental Dashboard</h3>
            <p className="text-emerald-200">Real-time contamination monitoring</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400">🏞️</span>
            <p className="text-xs text-emerald-200 font-medium">Fields Analyzed</p>
          </div>
          <p className="text-2xl font-bold text-emerald-100">{generalStats.fieldsAnalyzed.toLocaleString()}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-red-400/20 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-400">🚨</span>
            <p className="text-xs text-emerald-200 font-medium">High Risk Areas</p>
          </div>
          <p className="text-2xl font-bold text-red-300">{generalStats.highRiskAreas}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/20 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400">🌱</span>
            <p className="text-xs text-emerald-200 font-medium">Avg Soil Health</p>
          </div>
          <p className="text-2xl font-bold text-emerald-100">{generalStats.avgSoilHealth}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-blue-400/20 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">🧪</span>
            <p className="text-xs text-emerald-200 font-medium">Tests Pending</p>
          </div>
          <p className="text-2xl font-bold text-blue-300">{generalStats.testsRequested}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-orange-400/20 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-400">🔧</span>
            <p className="text-xs text-emerald-200 font-medium">Active Remediation</p>
          </div>
          <p className="text-2xl font-bold text-orange-300">{generalStats.remediationActive}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-green-400/20 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">📈</span>
            <p className="text-xs text-emerald-200 font-medium">Improving Areas</p>
          </div>
          <p className="text-2xl font-bold text-green-300">{generalStats.trendsImproving}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
          <span>📊</span>
          Generate Report
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
          <span>🤖</span>
          AI Analysis
        </button>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
          <span>📤</span>
          Export Data
        </button>
        <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
          <span>⚙️</span>
          Settings
        </button>
      </div>
    </div>
  );
};

export default StatsActionBar;
