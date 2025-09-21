import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { Menu } from "lucide-react";
import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function MapOverlay() {
  const [overlays, setOverlays] = useState({
    traffic: false,
    transit: false,
    bike: false,
    weather: false,
    population: false,
    economics: false,
    industry: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleOverlay = (key: keyof typeof overlays) => {
    setOverlays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);


  const [menuMaxWidth, setMenuMaxWidth] = useState<number | undefined>();

  useEffect(() => {
		if (triggerRef.current && panelRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const panelRect = panelRef.current.getBoundingClientRect();

			// distance from panel left to menu icon left
			setMenuMaxWidth(triggerRect.left - panelRect.left - 16); // 8px gap
		}
	}, [menuOpen]);

  return (
    <div ref={panelRef} className="relative w-full h-full">
      <MapContainer
        center={[38.9072, -77.0369]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
        <ZoomControl position="bottomleft" />
      </MapContainer>

      {/* Menu icon */}
      <Button
        variant="outline"
        className="absolute top-3 right-3 h-8 p-2 rounded z-[1000]"
        ref={triggerRef}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <Menu />
      </Button>

      {/* Custom horizontal menu */}
      {menuOpen && (
        <div
          className="absolute top-0 left-0 flex gap-2 p-2 bg-background border rounded shadow overflow-x-auto whitespace-nowrap z-[1000]"
          style={{ maxWidth: menuMaxWidth }}
        >
          {Object.keys(overlays).map((key) => (
            <button
              key={key}
              onClick={() => toggleOverlay(key as keyof typeof overlays)}
              className={`flex-shrink-0 rounded px-4 py-2 ${
                overlays[key as keyof typeof overlays]
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
