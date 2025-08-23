import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Info, RotateCcw, Globe, Map as MapIcon, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Moon, Sun } from "lucide-react";

// Set your Mapbox access token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidG9tZm9sbGV0dCIsImEiOiJjbWN0cG55eTEwM3QxMm1vc3ZhbWNsbm14In0.XmKC7eHchn-DTc_2BxomGg";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MonitoringSite {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  status: "active" | "warning" | "critical" | "offline";
  contaminantLevel: number;
  waterQuality: number;
  airQuality: number;
  lastUpdate: string;
  type: "water" | "air" | "soil";
}

const monitoringSites: MonitoringSite[] = [
  // {
  //   id: 'site-001',
  //   name: 'New York Harbor',
  //   country: 'United States',
  //   coordinates: [-74.0060, 40.7128],
  //   status: 'active',
  //   contaminantLevel: 12,
  //   waterQuality: 88,
  //   airQuality: 76,
  //   lastUpdate: '2024-01-15 14:30',
  //   type: 'water'
  // },
  // {
  //   id: 'site-002',
  //   name: 'Thames Estuary',
  //   country: 'United Kingdom',
  //   coordinates: [0.1276, 51.5074],
  //   status: 'warning',
  //   contaminantLevel: 28,
  //   waterQuality: 72,
  //   airQuality: 68,
  //   lastUpdate: '2024-01-15 14:25',
  //   type: 'water'
  // },
  // {
  //   id: 'site-003',
  //   name: 'Tokyo Bay',
  //   country: 'Japan',
  //   coordinates: [139.6917, 35.6895],
  //   status: 'active',
  //   contaminantLevel: 8,
  //   waterQuality: 92,
  //   airQuality: 84,
  //   lastUpdate: '2024-01-15 14:35',
  //   type: 'water'
  // },
  // {
  //   id: 'site-004',
  //   name: 'Sydney Harbor',
  //   country: 'Australia',
  //   coordinates: [151.2093, -33.8688],
  //   status: 'active',
  //   contaminantLevel: 6,
  //   waterQuality: 94,
  //   airQuality: 89,
  //   lastUpdate: '2024-01-15 14:40',
  //   type: 'water'
  // },
  // {
  //   id: 'site-005',
  //   name: 'Amazon Basin',
  //   country: 'Brazil',
  //   coordinates: [-60.0261, -3.4653],
  //   status: 'critical',
  //   contaminantLevel: 45,
  //   waterQuality: 58,
  //   airQuality: 62,
  //   lastUpdate: '2024-01-15 14:20',
  //   type: 'water'
  // },
  // {
  //   id: 'site-006',
  //   name: 'Mediterranean Coast',
  //   country: 'Spain',
  //   coordinates: [2.1734, 41.3851],
  //   status: 'warning',
  //   contaminantLevel: 32,
  //   waterQuality: 69,
  //   airQuality: 71,
  //   lastUpdate: '2024-01-15 14:28',
  //   type: 'water'
  // },
  // {
  //   id: 'site-007',
  //   name: 'Mumbai Harbor',
  //   country: 'India',
  //   coordinates: [72.8777, 19.0760],
  //   status: 'warning',
  //   contaminantLevel: 38,
  //   waterQuality: 64,
  //   airQuality: 59,
  //   lastUpdate: '2024-01-15 14:22',
  //   type: 'water'
  // },
  // {
  //   id: 'site-008',
  //   name: 'Cape Town Bay',
  //   country: 'South Africa',
  //   coordinates: [18.4241, -33.9249],
  //   status: 'active',
  //   contaminantLevel: 14,
  //   waterQuality: 85,
  //   airQuality: 82,
  //   lastUpdate: '2024-01-15 14:33',
  //   type: 'water'
  // }
];

const getStatusColor = (status: string): string => {
  switch (status) {
    case "active":
      return "#10b981"; // green
    case "warning":
      return "#f59e0b"; // amber
    case "critical":
      return "#ef4444"; // red
    case "offline":
      return "#6b7280"; // gray
    default:
      return "#6b7280";
  }
};

const getStatusBadgeVariant = (status: string): string => {
  switch (status) {
    case "active":
      return "default";
    case "warning":
      return "secondary";
    case "critical":
      return "destructive";
    case "offline":
      return "outline";
    default:
      return "outline";
  }
};

const InteractiveGlobalMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSite, setSelectedSite] = useState<MonitoringSite | null>(null);
  const [filter, setFilter] = useState<
    "all" | "active" | "warning" | "critical"
  >("all");
  const [mapProjection, setMapProjection] = useState<"globe" | "mercator">(
    "globe"
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const popupsRef = useRef<{ [key: string]: mapboxgl.Popup }>({});

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (!mapContainer.current) return;

    // Initialize map with dark-v10 for better aesthetics
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 20], // Center on world
      zoom: 2,
      projection: "globe" as const,
    });

    // Add only essential native Mapbox controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      }),
      "top-right"
    );

    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add monitoring sites as markers
    monitoringSites.forEach((site) => {
      const el = document.createElement("div");
      el.className = "monitoring-marker";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = getStatusColor(site.status);
      el.style.border = "3px solid white";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
      el.style.cursor = "pointer";
      el.style.transition = "all 0.3s ease";

      // Add pulse animation for critical sites
      if (site.status === "critical") {
        el.style.animation = "pulse 2s infinite";
      }

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(site.coordinates)
        .addTo(map.current!);

      markersRef.current[site.id] = marker;

      // Add click handler
      el.addEventListener("click", () => {
        setSelectedSite(site);
        map.current?.flyTo({
          center: site.coordinates,
          zoom: 6,
          duration: 2000,
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Filter markers based on selected filter
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([siteId, marker]) => {
      const site = monitoringSites.find((s) => s.id === siteId);
      if (site) {
        const shouldShow = filter === "all" || site.status === filter;
        const element = marker.getElement();
        element.style.display = shouldShow ? "block" : "none";
      }
    });
  }, [filter]);

  const resetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [0, 20],
        zoom: 2,
        duration: 2000,
      });

      setSelectedSite(null);
    }
  };

  // Enhanced settings functionality
  const toggleMapProjection = () => {
    if (map.current) {
      const newProjection = mapProjection === "globe" ? "mercator" : "globe";
      setMapProjection(newProjection);
      map.current.setProjection(newProjection as "globe" | "mercator");
    }
  };

  const toggleMapTheme = () => {
    if (map.current) {
      const newStyle = isDarkMode
        ? "mapbox://styles/mapbox/light-v11"
        : "mapbox://styles/mapbox/dark-v10";
      setIsDarkMode(!isDarkMode);
      map.current.setStyle(newStyle);
    }
  };

  const resetFilters = () => {
    setFilter("all");
    setSelectedSite(null);
  };

  const activeSites = monitoringSites.filter(
    (site) => site.status === "active"
  ).length;
  const warningSites = monitoringSites.filter(
    (site) => site.status === "warning"
  ).length;
  const criticalSites = monitoringSites.filter(
    (site) => site.status === "critical"
  ).length;

  return (
    <TooltipProvider>
      <div className="relative w-full h-full min-h-[600px] bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        {/* Map Container */}
        <div ref={mapContainer} className="absolute inset-0 rounded-xl" />

        {/* Enhanced Status Overview & Interactive Legend */}
        <div className="absolute top-4 left-4 z-10 space-y-3">
          <Card className="p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Global Monitoring Status
            </h3>
            <div className="space-y-3">
              {/* Interactive Risk Level Filters */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center justify-between text-xs p-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        filter === "critical"
                          ? "bg-red-100 dark:bg-red-900/30 ring-2 ring-red-500"
                          : "hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                      onClick={() =>
                        setFilter(filter === "critical" ? "all" : "critical")
                      }
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          Critical Sites:
                        </span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                      <Badge
                        variant="destructive"
                        className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      >
                        {criticalSites}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      High contamination levels requiring immediate attention
                      (&gt;40% contamination)
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center justify-between text-xs p-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        filter === "warning"
                          ? "bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-500"
                          : "hover:bg-amber-50 dark:hover:bg-amber-900/20"
                      }`}
                      onClick={() =>
                        setFilter(filter === "warning" ? "all" : "warning")
                      }
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          Warning Sites:
                        </span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      >
                        {warningSites}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Moderate contamination levels needing monitoring (20-40%
                      contamination)
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex items-center justify-between text-xs p-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        filter === "active"
                          ? "bg-green-100 dark:bg-green-900/30 ring-2 ring-green-500"
                          : "hover:bg-green-50 dark:hover:bg-green-900/20"
                      }`}
                      onClick={() =>
                        setFilter(filter === "active" ? "all" : "active")
                      }
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          Active Sites:
                        </span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {activeSites}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Normal operation with low contamination levels (&lt;20%
                      contamination)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-300">
                  Total Sites:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {monitoringSites.length}
                </span>
              </div>

              {filter !== "all" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full text-xs h-auto py-1 rounded-lg"
                >
                  Show All Sites
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Enhanced Settings Panel */}
        <div className="absolute top-4 right-4 z-10">
          <Card className="p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 rounded-xl shadow-lg">
            <div className="flex flex-col gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={resetView}
                    className="h-10 w-10 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset map view to global perspective</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMapProjection}
                    className="h-10 w-10 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {mapProjection === "globe" ? (
                      <MapIcon className="h-4 w-4" />
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle between globe and flat map projection</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMapTheme}
                    className="h-10 w-10 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                   {isDarkMode ? (
                      <p>Switch to light map theme</p>
                    ) : (
                      <p>Switch to dark map theme</p>
                    )}
                </TooltipContent>
              </Tooltip>
            </div>
          </Card>
        </div>

        {/* Enhanced Selected Site Details */}
        {selectedSite && (
          <div className="absolute bottom-4 right-4 z-10 max-w-sm">
            <Card className="p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-0 rounded-xl shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {selectedSite.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedSite.country}
                  </p>
                </div>
                <Badge
                  variant={
                    getStatusBadgeVariant(selectedSite.status) as
                      | "default"
                      | "secondary"
                      | "destructive"
                      | "outline"
                  }
                  className="rounded-lg"
                >
                  {selectedSite.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      Contamination Level
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedSite.contaminantLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        selectedSite.contaminantLevel > 40
                          ? "bg-red-500"
                          : selectedSite.contaminantLevel > 20
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${selectedSite.contaminantLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      Water Quality
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedSite.waterQuality}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${selectedSite.waterQuality}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      Air Quality
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedSite.airQuality}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-500 transition-all duration-500"
                      style={{ width: `${selectedSite.airQuality}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated: {selectedSite.lastUpdate}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default InteractiveGlobalMap;
