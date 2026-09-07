import React, { useState } from 'react';
import Header from './components/Header';
import MonitoringMap from './components/MonitoringMap';
import AnalysisPanel from './components/AnalysisPanel';
import AnalysisWorkflowModal from './components/AnalysisWorkflowModal';
import ExplainabilityModal from './components/ExplainabilityModal';
import FieldVerificationModal from './components/FieldVerificationModal';
import ArchitectureModal from './components/ArchitectureModal';
import { MONITORING_ZONES } from './data/mockData';

export default function App() {
  const [zones, setZones] = useState(MONITORING_ZONES);
  const [activeZoneId, setActiveZoneId] = useState('KRB-03'); // Default high priority zone

  // Modal open states
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isExplainabilityOpen, setIsExplainabilityOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  // Active Zone Object
  const activeZone = zones.find((z) => z.id === activeZoneId) || zones[0];

  // Handler for selecting zone from map or list
  const handleSelectZone = (selectedZone) => {
    setActiveZoneId(selectedZone.id);
  };

  // Handler to update zone status to VERIFIED
  const handleVerifyZone = (zoneId, inspectorNotes) => {
    setZones((prevZones) =>
      prevZones.map((z) => {
        if (z.id === zoneId) {
          return {
            ...z,
            status: 'VERIFIED',
            verifiedAt: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            inspectorNotes: inspectorNotes || z.inspectorNotes,
          };
        }
        return z;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Command Center Header */}
      <Header
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        activeZone={activeZone}
      />

      {/* Main 16:9 Command Center Grid Container */}
      <main className="flex-1 w-full p-4 lg:p-6 flex flex-col lg:flex-row gap-5 max-w-[1920px] mx-auto overflow-hidden">
        {/* LEFT COLUMN (~55%): Interactive Chhattisgarh Monitoring Map */}
        <section className="w-full lg:w-[56%] h-[550px] lg:h-[calc(100vh-120px)] flex flex-col gap-3">
          {/* Quick Zone Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[11px] font-mono-tech text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">
              Select Zone:
            </span>
            {zones.map((z) => {
              const isSelected = z.id === activeZoneId;
              const isVerified = z.status === 'VERIFIED';
              return (
                <button
                  key={z.id}
                  onClick={() => handleSelectZone(z)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono-tech transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      z.riskLevel === 'CRITICAL' ? 'bg-red-500' :
                      z.riskLevel === 'HIGH' ? 'bg-orange-500' :
                      z.riskLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                  <span>{z.id}</span>
                  {isVerified && <span className="text-emerald-400 text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Interactive Leaflet Map */}
          <div className="flex-1 w-full h-full relative">
            <MonitoringMap
              zones={zones}
              activeZone={activeZone}
              onSelectZone={handleSelectZone}
            />
          </div>
        </section>

        {/* RIGHT COLUMN (~45%): Selected Zone Command Panel */}
        <section className="w-full lg:w-[44%] h-auto lg:h-[calc(100vh-120px)] flex flex-col">
          <AnalysisPanel
            zone={activeZone}
            onRunAnalysis={() => setIsWorkflowOpen(true)}
            onOpenExplainability={() => setIsExplainabilityOpen(true)}
            onStartVerification={() => setIsVerificationOpen(true)}
          />
        </section>
      </main>

      {/* MODAL 1: Sequential 5-7s Satellite Workflow HUD */}
      <AnalysisWorkflowModal
        isOpen={isWorkflowOpen}
        onClose={() => setIsWorkflowOpen(false)}
        zone={activeZone}
      />

      {/* MODAL 2: Explainability View ("WHY WAS THIS ZONE FLAGGED?") */}
      <ExplainabilityModal
        isOpen={isExplainabilityOpen}
        onClose={() => setIsExplainabilityOpen(false)}
        zone={activeZone}
        onStartVerification={() => setIsVerificationOpen(true)}
      />

      {/* MODAL 3: Field Verification Workflow */}
      <FieldVerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        zone={activeZone}
        onVerifyZone={handleVerifyZone}
      />

      {/* MODAL 4: Technical System Architecture Diagram */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}
