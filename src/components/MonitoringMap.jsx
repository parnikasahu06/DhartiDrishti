import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Radio, Info, Layers } from 'lucide-react';
import { CHHATTISGARH_CENTER } from '../data/mockData';

// Fix Leaflet default marker icon broken assets
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapCenterController({ activeZone }) {
  const map = useMap();
  useEffect(() => {
    if (activeZone) {
      map.flyTo([activeZone.lat, activeZone.lng], 11.5, {
        duration: 1.0,
        easeLinearity: 0.25,
      });
    }
  }, [activeZone, map]);
  return null;
}

function createCustomMarkerIcon(zone, isSelected) {
  const colorMap = {
    LOW: '#10b981',      // Emerald
    MEDIUM: '#f59e0b',   // Amber
    HIGH: '#f97316',     // Orange
    CRITICAL: '#ef4444', // Red
  };

  const color = colorMap[zone.riskLevel] || '#3b82f6';
  const isVerified = zone.status === 'VERIFIED';
  
  const iconHtml = `
    <div class="relative flex items-center justify-center cursor-pointer" style="transform: translate(-50%, -50%); z-index: ${isSelected ? 9999 : 100};">
      <!-- Dominant Radar Pulse Ring for selected marker -->
      ${isSelected ? `
        <div class="absolute w-16 h-16 rounded-full opacity-75 animate-ping" style="background-color: ${color}; opacity: 0.35;"></div>
        <div class="absolute w-20 h-20 rounded-full border-2 border-dashed animate-spin" style="border-color: ${color}; opacity: 0.6; animation-duration: 6s;"></div>
      ` : ''}

      <!-- Outer Marker Ring -->
      <div class="relative flex items-center justify-center ${isSelected ? 'w-10 h-10 border-3 scale-110' : 'w-8 h-8 border-2 hover:scale-110'} rounded-full shadow-2xl transition-all duration-300" 
           style="background: #070a12; border-color: ${color}; box-shadow: 0 0 ${isSelected ? '25px' : '12px'} ${color};">
        
        <!-- Core Indicator -->
        <div class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold font-mono text-slate-950" 
             style="background-color: ${color}; font-weight: 800;">
          ${isVerified ? '✓' : ''}
        </div>
      </div>

      <!-- Badge Label -->
      <div class="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-md bg-slate-950/95 border border-white/20 text-[10px] font-mono-tech text-white shadow-xl flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full" style="background-color: ${color};"></span>
        <span class="font-bold">${zone.id}</span>
        <span class="text-slate-300">${zone.currentDeformation}mm</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

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
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-white/10 text-xs font-mono-tech text-slate-200 shadow-xl backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>REGION: <strong className="text-white">CHHATTISGARH MINING BELT</strong></span>
        </div>

        {/* Real Location / Illustrative Values Pill */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/90 border border-amber-500/30 text-[11px] font-mono-tech text-amber-300 shadow-xl backdrop-blur-md">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>LOCATION: REAL · DEFORMATION VALUES: ILLUSTRATIVE</span>
        </div>
      </div>

      {/* Leaflet Map */}
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
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {/* Mining Concession Boundary Overlays */}
          <Polygon
            positions={KORBA_MINING_POLYGON}
            pathOptions={{
              color: '#06b6d4',
              weight: 2,
              dashArray: '6, 6',
              fillColor: '#06b6d4',
              fillOpacity: 0.08,
            }}
          >
            <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-[10px] font-mono-tech text-cyan-300 font-bold tracking-wider opacity-80">
              KORBA COALFIELD CONCESSION
            </Tooltip>
          </Polygon>

          <Polygon
            positions={RAIGARH_MINING_POLYGON}
            pathOptions={{
              color: '#f59e0b',
              weight: 2,
              dashArray: '6, 6',
              fillColor: '#f59e0b',
              fillOpacity: 0.06,
            }}
          />

          <MapCenterController activeZone={activeZone} />

          {/* Markers */}
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

                    <button
                      onClick={() => onSelectZone(zone)}
                      className="w-full mt-2 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md"
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

      {/* Requirement 5: Updated Demo Risk Bands Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/95 border border-white/10 backdrop-blur-md text-xs font-mono-tech text-slate-300 shadow-2xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold text-[11px] uppercase tracking-wider">DEMO RISK BANDS:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-slate-200">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              <span className="text-slate-200">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
              <span className="text-slate-200">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <span className="text-slate-200">Critical</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 italic">
            Illustrative thresholds for prototype demonstration
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Click any monitoring point to select zone
        </div>
      </div>
    </div>
  );
}
