import React from 'react';
import { 
  Cpu, 
  X, 
  Radar, 
  Layers, 
  Activity, 
  ShieldAlert, 
  Database,
  FileCheck,
  UserCheck,
  Building,
  CloudRain
} from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Requirement 8 exact pipeline steps
  const PIPELINE_NODES = [
    {
      step: '01',
      title: 'Sentinel-1 SAR',
      subtitle: 'Spaceborne C-Band Radar',
      tech: 'Synthetic Aperture Radar',
      icon: Radar,
      color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400',
    },
    {
      step: '02',
      title: 'SBAS-InSAR',
      subtitle: 'Surface Displacement Extraction',
      tech: 'Small Baseline Interferometry',
      icon: Layers,
      color: 'border-blue-500/40 bg-blue-950/40 text-blue-400',
    },
    {
      step: '03',
      title: 'ISCE2 / MintPy',
      subtitle: 'Inversion & Processing Engine',
      tech: 'SNAPHU Unwrapping',
      icon: Database,
      color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-400',
    },
    {
      step: '04',
      title: 'Atmospheric + DEM Corrections',
      subtitle: 'Phase Delay Correction',
      tech: 'GACOS + SRTM 30m',
      icon: CloudRain,
      color: 'border-sky-500/40 bg-sky-950/40 text-sky-400',
    },
    {
      step: '05',
      title: 'Deformation Time Series',
      subtitle: 'Millimeter Velocity Trend',
      tech: 'Multi-Temporal Baseline',
      icon: Activity,
      color: 'border-purple-500/40 bg-purple-950/40 text-purple-400',
    },
    {
      step: '06',
      title: 'LSTM Forecasting',
      subtitle: '30-Day Predictive Model',
      tech: 'Stacked Recurrent Neural Net',
      icon: Cpu,
      color: 'border-amber-500/40 bg-amber-950/40 text-amber-400',
    },
    {
      step: '07',
      title: 'Severity Ranking',
      subtitle: 'Risk Score Matrix',
      tech: 'Velocity + Acceleration Engine',
      icon: ShieldAlert,
      color: 'border-orange-500/40 bg-orange-950/40 text-orange-400',
    },
    {
      step: '08',
      title: 'Explainable Alert',
      subtitle: 'Decision Support Package',
      tech: 'Audit Evidence Drivers',
      icon: FileCheck,
      color: 'border-red-500/40 bg-red-950/40 text-red-400',
    },
    {
      step: '09',
      title: 'Field Verification',
      subtitle: 'Human-in-the-Loop Audit',
      tech: 'In-Situ Extensometer Check',
      icon: UserCheck,
      color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl overflow-hidden flex flex-col gap-6 max-h-[90vh] overflow-y-auto custom-scrollbar">

        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono-tech text-cyan-400 font-bold uppercase tracking-widest">
                TECHNICAL ARCHITECTURE
              </div>
              <h2 className="text-xl font-bold font-display-title text-white">
                SYSTEM ARCHITECTURE & PROCESSING PIPELINE
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative">
          {PIPELINE_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.step}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 relative transition-all hover:scale-[1.02] ${node.color}`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-lg bg-slate-950/60 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-tech font-bold opacity-60">
                    STEP {node.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold font-display-title text-white">
                    {node.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {node.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 text-[10px] font-mono-tech opacity-90">
                  {node.tech}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-mono-tech uppercase transition-all cursor-pointer shadow-md"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
}
