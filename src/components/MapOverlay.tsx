import { Menu, X } from "lucide-react";
import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import mapStyle from "../map_style.json";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Separator } from "@/components/ui/separator"

import "leaflet/dist/leaflet.css";

const API_KEY = import.meta.env.VITE_MAP_API_KEY;

export default function MapOverlay() {
	const mapRef = useRef(null); // 👈 store map instance
  
	const [commodities, setCommodities] = useState({
    Soybean: false,
    Corn: false,
    Wheat: false,
    Lumber: false,
    Cotton: false,
    Canola: false,
    Oat: false,
		SunflowerOil: false,
		Hemp: false,
		Cocoa: false,
  });
	const toggleCommodity = (key: keyof typeof commodities) => {
    setCommodities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

	const [overlays, setOverlays] = useState([
		{ name: "Commodity Supply Chain", show: false },
		{ name: "Ecology", show: false },
		{ name: "Soil Mapping", show: false },
	]);
	const toggleOverlay = (name: string) => {
		setOverlays((prev) =>
			prev.map((overlay) =>
				overlay.name === name
					? { ...overlay, show: !overlay.show } // toggle selected one
					: { ...overlay, show: false }         // everything else false
			)
		);
	};

	const [selectedFeature, setSelectedFeature] = useState({company: null, location: null, coordinates: null, commodities: null, type: null});

  const [menuOpen, setMenuOpen] = useState(false);

	const [paneOpen, setPaneOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState(16);

	useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setFontSize(width / 20); // font scales with panel width
      }
    });

    if (panelRef.current) observer.observe(panelRef.current);

    return () => observer.disconnect(); // cleanup when unmounting
  }, []);


	const mapContainer = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!mapContainer.current) return;

		const jsonString = JSON.stringify(mapStyle);
		const replacedString = jsonString.replace(/YOUR_API_KEY/g, API_KEY);
		const style = JSON.parse(replacedString);
		
    const map = new maplibregl.Map({
      container: mapContainer.current, 
      style: style, 
      center: [-98, 39], // center on US
      zoom: 4,
    });

		async function loadImages(map) {
			map.addImage('building-icon', (await map.loadImage('/building-icon.png')).data);
			map.addImage('house-icon', (await map.loadImage('/house-icon.png')).data);
		}
		
		loadImages(map);
		
		mapRef.current = map;

    return () => map.remove();
  }, []);


	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		// Commodity data config
		const commodityLayers = {
			Soybean: {
				id: "soybean-layer",
				sourceId: "soybean-source",
				data: "/geojson/soybean.geojson",
			},
			Corn: {
				id: "corn-layer",
				sourceId: "corn-source",
				data: "/geojson/soybean.geojson",
			},
			Wheat: {
				id: "wheat-layer",
				sourceId: "wheat-source",
				data: "/geojson/soybean.geojson",
			},
			Lumber: {
				id: "lumber-layer",
				sourceId: "lumber-source",
				data: "/geojson/lumber.geojson",
			},
			Cotton: {
				id: "cotton-layer",
				sourceId: "cotton-source",
				data: "/geojson/cotton.geojson",
			},
			Canola: {
				id: "canola-layer",
				sourceId: "canola-source",
				data: "/geojson/canola.geojson",
			},
			Oat: {
				id: "oat-layer",
				sourceId: "oat-source",
				data: "/geojson/oat.geojson",
			},
			SunflowerOil: {
				id: "sunflower-oil-layer",
				sourceId: "sunflower-oil-source",
				data: "/geojson/sunflower-oil.geojson",
			},
			Hemp: {
				id: "hemp-layer",
				sourceId: "hemp-source",
				data: "/geojson/hemp.geojson",
			},
			Cocoa: {
				id: "cocoa-layer",
				sourceId: "cocoa-source",
				data: "/geojson/cocoa.geojson",
			},
		};


		Object.entries(commodities).forEach(([key, active]) => {
			const layer = commodityLayers[key as keyof typeof commodityLayers];
			if (!layer) return; // skip overlays that aren’t in config


			if (active) {
				if (!map.getSource(layer.sourceId)) {

					map.addSource(layer.sourceId, {
						type: "geojson",
						data: layer.data,
					});
					map.addLayer({
						id: layer.id,
						type: 'symbol',
						source: layer.sourceId,
						layout: {
							'icon-image': 'building-icon',
							'icon-size': .04,
						},
					});

					// Add click interaction
					map.on("click", layer.id, (e) => {
						if (!e.features?.length) return;
						const feature = e.features[0];
						setSelectedFeature(feature.properties); // store properties in state
						setPaneOpen(true); // make sure pane opens
					});

					map.on("mouseenter", layer.id, () => {
						map.getCanvas().style.cursor = "pointer";
					});
					map.on("mouseleave", layer.id, () => {
						map.getCanvas().style.cursor = "";
					});
				}
			} else {
				if (map.getLayer(layer.id)) {
					map.removeLayer(layer.id);
					map.removeSource(layer.sourceId);
				}
			}
		});
	}, [commodities]);

	const [inputOpen, setInputOpen] = useState(true);
	const [coords, setCoords] = useState({ lat: "", lng: "" });

	const handleAddMarker = () => {
		setInputOpen(false);
		const latNum = parseFloat(coords.lat);
		const lngNum = parseFloat(coords.lng);

		const map = mapRef.current;
		if (!map) return;

		map.addSource("user-marker", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: { type: "Point", coordinates: [lngNum, latNum] },
      },
    });

    map.addLayer({
      id: "user-marker",
      type: "symbol",
      source: "user-marker",
      layout: {
        "icon-image": "house-icon",
        "icon-size": 0.04,
        "icon-allow-overlap": true,
      },
    });

		map.flyTo({ center: [lngNum, latNum], zoom: 3 });
	};

  return (
    <div ref={panelRef} className="relative w-full h-full">
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

      {/* Menu icon */}
      <Button
        variant="outline"
        className="absolute top-3 right-3 h-8 p-2 rounded z-[3000]"
        ref={triggerRef}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <Menu />
      </Button>

      {menuOpen && (
        <div
          className="absolute top-0 right-0 flex flex-col w-1/4 h-1/2 p-2 bg-background z-[2000]"
        >
					<h1 className="px-4 py-4" style={{ fontSize: `${fontSize / 2}px` }}>Overlays</h1>
					<div className="flex px-2 py-2 overflow-x-auto">
						{overlays.map((overlay) => (
							<button 
								className={`flex-shrink-0 rounded px-4 py-2 mx-1 ${
									overlay.show == true
										? "bg-primary text-primary-foreground"
										: "bg-muted text-muted-foreground"
             			}`}
									onClick={() => toggleOverlay(overlay.name)}
									style={{ fontSize: `${fontSize / 4}px` }}>
								{overlay.name}
							</button>
						))}
					</div>
					{overlays[0].show && <div className="flex flex-wrap overflow-y-auto px-2 py-2">
						{Object.keys(commodities).map((key) => (
							<div className="flex items-center mr-8">
								<button
									key={key}
									onClick={() => toggleCommodity(key as keyof typeof commodities)}
									className={`flex-shrink-0 h-4 w-4 rounded mx-2 my-2 ${
										commodities[key as keyof typeof commodities]
											? "bg-primary"
											: "bg-muted"
									}`}
								>
								</button>
								<p style={{ fontSize: `${fontSize / 4}px` }}>{key}</p>
							</div>
						))}
						</div>
					}
        </div>
      )}

			{paneOpen && (
				<div className="absolute top-0 left-0 bg-card z-[1000] h-full w-1/4 overflow-auto space-y-2">
					<h1 className="mr-8" style={{ fontSize: `${fontSize / 2}px` }}>
						{selectedFeature.company || "Unknown"}
					</h1>
					<p style={{ fontSize: `${fontSize / 4}px` }}>
						{selectedFeature.location || "No location available"}
					</p>
					<p style={{ fontSize: `${fontSize / 4}px` }}>
						{selectedFeature.coordinates || ""}
					</p>
					<p style={{ fontSize: `${fontSize / 4}px` }}>
						{selectedFeature.type || ""}
					</p>
					<p style={{ fontSize: `${fontSize / 4}px` }}>
						{selectedFeature.commodities || ""}
					</p>
					<Separator className="mt-4"/>
					{/*}
					<Accordion type="multiple" style={{ fontSize: `${fontSize / 4}px` }}>
						<AccordionItem value="item-1">
							<AccordionTrigger>Ecology & Land</AccordionTrigger>
							<AccordionContent>
								<p>Content under section 1</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-2">
							<AccordionTrigger>Soil Mapping</AccordionTrigger>
							<AccordionContent>
								<p>Content under section 2</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-3">
							<AccordionTrigger>Production</AccordionTrigger>
							<AccordionContent>
								<p>Content under section 3</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4">
							<AccordionTrigger>Supply Chain</AccordionTrigger>
							<AccordionContent>
								<p>Content under section 4</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					*/}
					<Button variant="ghost" key="close" className="w-0 h-4 absolute top-2 right-2" onClick={() => setPaneOpen(false)}>
						<X/>
					</Button>
				</div>
			)}

			{inputOpen && (
				<div className="absolute h-1/3 w-1/3 inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-card flex flex-col items-center justify-center overflow-auto">
					<input
						type="text"
						placeholder="Latitude"
						value={coords.lat}
						onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
						className="border p-1 rounded w-3/4 bg-muted m-2"
					/>
					<input
						type="text"
						placeholder="Longitude"
						value={coords.lng}
						onChange={(e) => setCoords({ ...coords, lng: e.target.value })}
						className="border p-1 rounded w-3/4 bg-muted m-2"
					/>
					<Button
						onClick={handleAddMarker}
						className="m-2"
					>
						Add Location
					</Button>
				</div>
			)}

    </div>
  );
}
