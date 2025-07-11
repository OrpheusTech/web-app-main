import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, ExternalLink, AlertTriangle, Info, Microscope } from 'lucide-react';
import { ToxinInfo } from '@/types/dashboard';

interface ToxinInfoPanelProps {
  toxin: ToxinInfo;
  onClose: () => void;
}

const ToxinInfoPanel: React.FC<ToxinInfoPanelProps> = ({ toxin, onClose }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3 pr-8">
            <div className="text-3xl">{toxin.icon}</div>
            <div>
              <CardTitle className="text-xl text-gray-800">
                {toxin.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{toxin.hazardType}</span>
                <Badge className={getSeverityColor(toxin.severity)}>
                  {toxin.severity.toUpperCase()} RISK
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <Info className="h-4 w-4" />
              Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {toxin.description}
            </p>
          </div>

          <Separator />

          {/* Source & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🏭 Source</h4>
              <p className="text-sm text-gray-600">{toxin.source}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⚠️ Health Impact</h4>
              <p className="text-sm text-gray-600">{toxin.impact}</p>
            </div>
          </div>

          <Separator />

          {/* Health Threshold */}
          {toxin.healthThreshold && (
            <>
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <Microscope className="h-4 w-4" />
                  Health Threshold
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800 font-medium">
                    {toxin.healthThreshold}
                  </p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Regulatory Information */}
          {toxin.regulatoryInfo && (
            <>
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  Regulatory Information
                </h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-800">
                    {toxin.regulatoryInfo}
                  </p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Remediation Links */}
          {toxin.remediationLinks && toxin.remediationLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                🔗 Remediation Resources
              </h3>
              <div className="space-y-2">
                {toxin.remediationLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-sm"
                    onClick={() => window.open(link, '_blank')}
                  >
                    <span>View Resource {index + 1}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              📊 Generate Report
            </Button>
            <Button variant="outline" className="flex-1">
              🧪 Request Testing
            </Button>
            <Button variant="outline" className="flex-1">
              🌱 Get Solutions
            </Button>
          </div>

          {/* Location Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">
              📍 Location Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Coordinates</p>
                <p className="font-mono text-gray-700">
                  {toxin.coordinates[0].toFixed(4)}, {toxin.coordinates[1].toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p className="text-gray-700 capitalize">
                  {toxin.category.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToxinInfoPanel;
