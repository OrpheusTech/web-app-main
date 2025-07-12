import { useState } from "react";
import Navigation from "@/components/Navigation";
import InteractiveGlobalMap from "@/components/InteractiveGlobalMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Globe,
  BarChart3,
  Settings,
  Download,
  Maximize2,
  Minimize2
} from "lucide-react";

const MapDashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stats = [
    {
      title: "Active Monitoring Sites",
      value: "12",
      icon: <Activity className="h-4 w-4" />,
      change: "+2",
      trend: "up",
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Water Quality Index",
      value: "78%",
      icon: <Droplets className="h-4 w-4" />,
      change: "-3%",
      trend: "down",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Air Quality Index",
      value: "72%",
      icon: <Wind className="h-4 w-4" />,
      change: "+5%",
      trend: "up",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Critical Alerts",
      value: "3",
      icon: <AlertTriangle className="h-4 w-4" />,
      change: "-1",
      trend: "down",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      site: "Thames Estuary",
      type: "Water Quality",
      severity: "High",
      time: "2 hours ago",
      description: "Elevated mercury levels detected"
    },
    {
      id: 2,
      site: "Industrial Zone A",
      type: "Air Quality", 
      severity: "Medium",
      time: "4 hours ago",
      description: "PM2.5 levels above threshold"
    },
    {
      id: 3,
      site: "Agricultural Area B",
      type: "Soil Contamination",
      severity: "Low",
      time: "6 hours ago", 
      description: "Pesticide residue detected"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <Navigation />
      
      <div className="pt-20">
        {/* Header Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Global Environmental Monitor
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time monitoring of environmental conditions worldwide
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4 mr-2" />
                  ) : (
                    <Maximize2 className="h-4 w-4 mr-2" />
                  )}
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-6">
          <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            
            {/* Stats Cards - Hidden in fullscreen */}
            {!isFullscreen && (
              <>
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`${stat.color}`}>
                          {stat.icon}
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          vs last week
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {/* Map Section */}
            <div className={`${isFullscreen ? 'col-span-1' : 'col-span-1 lg:col-span-4'}`}>
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Interactive Global Map
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <Globe className="h-3 w-3 mr-1" />
                        Live Data
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className={`${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'} rounded-lg overflow-hidden`}>
                    <InteractiveGlobalMap />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts Panel - Hidden in fullscreen */}
            {!isFullscreen && (
              <div className="col-span-1 lg:col-span-4">
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              alert.severity === 'High' ? 'bg-red-500' :
                              alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {alert.site}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {alert.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              alert.severity === 'High' ? 'destructive' :
                              alert.severity === 'Medium' ? 'secondary' : 'outline'
                            }>
                              {alert.severity}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              {alert.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapDashboard };
