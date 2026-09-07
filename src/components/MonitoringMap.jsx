import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers, ShieldAlert, CheckCircle, Navigation, Radio, Info } from 'lucide-react';
import { CHHATTISGARH_CENTER } from '../data/mockData';

// Fix Leaflet default marker icon broken assets in React/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to center map on active zone change
function MapCenterController({ activeZone }) {
  const map = useMap();
  useEffect(() => {
    if (activeZone) {
      map.flyTo([activeZone.lat, activeZone.lng], 12, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [activeZone, map]);
  return null;
}

// Custom Leaflet DivIcon generator for deep-tech risk markers
function createCustomMarkerIcon(zone, isSelected) {
  const colorMap = {
    LOW: '#10b981',      // Emerald Green
    MEDIUM: '#f59e0b',   // Amber Yellow
    HIGH: '#f97316',     // Orange
    CRITICAL: '#ef4444', // Red
  };

  const color = colorMap[zone.riskLevel] || '#3b82f6';
  const isVerified = zone.status === 'VERIFIED';
  
  const iconHtml = `
    <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
      <!-- Radar Pulse Ring for selected or critical -->
      ${(isSelected || zone.riskLevel === 'CRITICAL' || zone.riskLevel === 'HIGH') && !isVerified ? `
        <div class="absolute w-12 h-12 rounded-full opacity-60 animate-ping" style="background-color: ${color}; opacity: 0.25;"></div>
        <div class="absolute w-16 h-16 rounded-full border border-dashed animate-spin" style="border-color: ${color}; opacity: 0.4; animation-duration: 8s;"></div>
      ` : ''}

      <!-- Outer Glow -->
      <div class="relative flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg transition-all duration-300 ${isSelected ? 'scale-125 z-50' : 'scale-100 hover:scale-110'}" 
           style="background: #0f172a; border-color: ${color}; box-shadow: 0 0 15px ${color}80;">
        
        <!-- Core Indicator -->
        <div class="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold font-mono text-slate-950" 
             style="background-color: ${color};">
          ${isVerified ? '✓' : ''}
        </div>
      </div>

      <!-- Badge Label -->
      <div class="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/90 border border-white/10 text-[10px] font-mono-tech text-white shadow-md flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${color};"></span>
        <span>${zone.id}</span>
        <span class="text-slate-400 font-bold">${zone.currentDeformation}mm</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

// Synthetic Korba Open Cast Mining Polygon Boundaries
const KORBA_MINING_POLYGON = [
  [22.395, 82.610],
  [22.410, 82.680],
  [22.370, 82.780],
  [22.320, 82.760],
  [22.300, 82.670],
  [22.340, 82.600],
];

const RAIGARH_MINING_POLYGON = [
  [21.930, 83.350],
  [21.940, 83.430],
  [21.870, 83.420],
  [21.860, 83.360],
];

export default function MonitoringMap({ zones, activeZone, onSelectZone }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col">
      {/* Top Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-white/10 text-xs font-mono-tech text-slate-200 shadow-xl backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>REGION: <strong className="text-white">CHHATTISGARH MINING BELT</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">7 ACTIVE SITES</span>
        </div>

        {/* Prototype Honesty Notice Badge */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono-tech text-slate-300 backdrop-blur-md">
          <Info className="w-3 h-3 text-cyan-400" />
          <span>PROTOTYPE MODE · DEMONSTRATION DATASET</span>
        </div>
      </div>

      {/* Map Element */}
      <div className="w-full h-full relative z-0">
        <MapContainer
          center={CHHATTISGARH_CENTER}
          zoom={10}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
        >
          {/* Dark Basemap Tiles (CartoDB Dark Matter) */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; Sentinel-1 InSAR SBAS'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {/* Mining Concession Boundary Overlays */}
          <Polygon
            positions={KORBA_MINING_POLYGON}
            pathOptions={{
              color: '#06b6d4',
              weight: 1.5,
              dashArray: '6, 6',
              fillColor: '#06b6d4',
              fillOpacity: 0.06,
            }}
          >
            <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-[10px] font-mono-tech text-cyan-300 font-semibold opacity-70">
              KORBA COALFIELD CONCESSION
            </Tooltip>
          </Polygon>

          <Polygon
            positions={RAIGARH_MINING_POLYGON}
            pathOptions={{
              color: '#f59e0b',
              weight: 1.5,
              dashArray: '6, 6',
              fillColor: '#f59e0b',
              fillOpacity: 0.05,
            }}
          />

          {/* Controller for Smooth Map Pan/Zoom */}
          <MapCenterController activeZone={activeZone} />

          {/* Monitoring Markers */}
          {zones.map((zone) => {
            const isSelected = activeZone?.id === zone.id;
            return (
              <Marker
                key={zone.id}
                position={[zone.lat, zone.lng]}
                icon={createCustomMarkerIcon(zone, isSelected)}
                eventHandlers={{
                  click: () => onSelectZone(zone),
                }}
              >
                <Popup>
                  <div className="p-1 font-sans text-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 mb-2">
                      <strong className="text-white text-sm font-bold">{zone.id}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold ${
                        zone.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                        zone.riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                        zone.riskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {zone.priorityBadge}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs mb-1">
                      <strong className="text-slate-400">Location:</strong> {zone.locationName}
                    </p>

                    <div className="grid grid-cols-2 gap-2 my-2 p-2 rounded bg-slate-900/80 border border-slate-800 font-mono-tech">
                      <div>
                        <div className="text-[10px] text-slate-400">DEFORMATION</div>
                        <div className="text-cyan-400 font-bold text-sm">{zone.currentDeformation} mm</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">30D FORECAST</div>
                        <div className="text-amber-400 font-bold text-sm">{zone.forecast30Day} mm</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectZone(zone)}
                      className="w-full mt-1 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md"
                    >
                      SELECT FOR ANALYSIS →
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/90 border border-white/10 backdrop-blur-md text-xs font-mono-tech text-slate-300">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Risk Levels:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span>Low (-2mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            <span>Medium (-6mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
            <span>High (-12mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span>Critical (&gt;-20mm)</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <span>Click any marker on map to view ground deformation analysis</span>
        </div>
      </div>
    </div>
  );
}
