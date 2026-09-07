import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  Layers, 
  Activity, 
  Cpu, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FastForward,
  X,
  Radio
} from 'lucide-react';
import DeformationChart from './DeformationChart';

export default function AnalysisWorkflowModal({ isOpen, onClose, zone }) {
  if (!isOpen || !zone) return null;

  const [currentStage, setCurrentStage] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 6 Stages matching exact prompt requirement
  const STAGES = [
    {
      id: 1,
      stepNumber: '01',
      title: 'SENTINEL-1 SAR',
      subtitle: 'Satellite observation received',
      desc: 'Acquiring C-band Synthetic Aperture Radar (SAR) imagery from Sentinel-1 constellation in Interferometric Wide (IW) swath mode.',
      icon: Radar,
      duration: 1100,
    },
    {
      id: 2,
      stepNumber: '02',
      title: 'SBAS-InSAR',
      subtitle: 'Surface displacement extracted',
      desc: 'Processing Small Baseline Subset interferometry. Unwrapping interferometric phase using SNAPHU with GACOS zenith delay correction.',
      icon: Layers,
      duration: 1100,
    },
    {
      id: 3,
      stepNumber: '03',
      title: 'DEFORMATION TIME SERIES',
      subtitle: 'Multi-temporal trend established',
      desc: 'MintPy baseline inversion across 24 historical acquisitions establishing millimeter displacement rate.',
      icon: Activity,
      duration: 1100,
    },
    {
      id: 4,
      stepNumber: '04',
      title: 'LSTM FORECAST',
      subtitle: '30-day movement forecast generated',
      desc: 'Stacked LSTM neural network modeling 30-day ground movement trajectory with 95% confidence bounds.',
      icon: Cpu,
      duration: 1100,
    },
    {
      id: 5,
      stepNumber: '05',
      title: 'RISK ENGINE',
      subtitle: 'Severity ranking completed',
      desc: 'Evaluating multi-factor severity score incorporating velocity rate, acceleration shift, and structural proximity.',
      icon: ShieldAlert,
      duration: 1100,
    },
    {
      id: 6,
      stepNumber: '06',
      title: 'EARLY WARNING',
      subtitle: 'Field inspection recommended',
      desc: 'Synthesizing explainable evidence package and dispatching prioritized field verification task.',
      icon: AlertTriangle,
      duration: 1400,
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    if (currentStage <= 6) {
      const timer = setTimeout(() => {
        if (currentStage < 6) {
          setCurrentStage((prev) => prev + 1);
        } else {
          setTimeout(() => {
            onClose();
          }, 1600);
        }
      }, STAGES[currentStage - 1].duration);

      return () => clearTimeout(timer);
    }
  }, [currentStage, isAutoPlaying, onClose]);

  const activeStageData = STAGES[currentStage - 1];
  const IconComponent = activeStageData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel-glow rounded-2xl border border-cyan-500/40 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col gap-6">
        
        {/* Radar scan grid overlay */}
        <div className="bg-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
        <div className="scanline-overlay" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold uppercase">
                  AUTOMATED PIPELINE WORKFLOW
                </span>
                <span className="text-xs text-slate-400 font-mono-tech">
                  TARGET: {zone.id} · {zone.name}
                </span>
              </div>
              <h2 className="text-lg font-bold font-display-title text-white">
                SATELLITE TO EARLY WARNING PIPELINE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentStage < 6) setCurrentStage(6);
                else onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-mono-tech text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Fast Forward</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6 Stage Horizontal Progress Pipeline */}
        <div className="relative z-10 grid grid-cols-6 gap-2">
          {STAGES.map((stg) => {
            const isCompleted = currentStage > stg.id;
            const isCurrent = currentStage === stg.id;
            return (
              <div
                key={stg.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentStage(stg.id);
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                  isCurrent
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    : isCompleted
                    ? 'bg-slate-900/80 border-cyan-500/40 text-cyan-400'
                    : 'bg-slate-900/40 border-white/5 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono-tech font-bold">
                  <span>{stg.stepNumber}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  ) : null}
                </div>
                <div className="text-[10px] font-bold truncate">{stg.title}</div>
              </div>
            );
          })}
        </div>

        {/* Main Stage Pipeline Display */}
        <div className="relative z-10 p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/30 min-h-[280px] flex flex-col justify-between shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                <IconComponent className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-mono-tech text-cyan-400 font-bold tracking-widest uppercase mb-1">
                  STAGE {activeStageData.stepNumber} · {activeStageData.title}
                </div>
                <h3 className="text-xl font-bold text-white font-display-title">
                  “{activeStageData.subtitle}”
                </h3>
                <p className="text-xs text-slate-300 max-w-xl mt-1.5 leading-relaxed">
                  {activeStageData.desc}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>PIPELINE ACTIVE</span>
            </div>
          </div>

          {/* Dynamic Stage Canvas Graphics */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-white/10 min-h-[140px] flex items-center justify-center relative overflow-hidden">
            {currentStage === 1 && (
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-24 h-24 rounded-full border border-cyan-500/40 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-radar-sweep origin-center bg-gradient-to-tr from-cyan-500/20 to-transparent" />
                  <Radar className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
                <span className="text-xs font-mono-tech text-cyan-300">
                  Sentinel-1 C-band SAR Orbit Pass Received
                </span>
              </div>
            )}

            {currentStage === 2 && (
              <div className="flex flex-col items-center gap-2 w-full max-w-md">
                <div className="text-xs font-mono-tech text-slate-300 flex items-center justify-between w-full">
                  <span>Phase Interferogram Fringes</span>
                  <span>SNAPHU Unwrapped Displacement</span>
                </div>
                <div className="w-full h-8 rounded bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-cyan-400 to-purple-500 opacity-80 animate-pulse flex items-center justify-center">
                  <span className="text-[10px] font-mono-tech text-slate-950 font-bold bg-white/80 px-2 py-0.5 rounded">
                    SBAS Phase-to-Displacement Conversion
                  </span>
                </div>
                <span className="text-[11px] font-mono-tech text-slate-400">
                  GACOS Tropospheric Delay Correction Applied
                </span>
              </div>
            )}

            {currentStage === 3 && (
              <div className="w-full">
                <div className="text-xs font-mono-tech text-cyan-300 mb-1 text-center">
                  Multi-Temporal Displacement Baseline (24 Historical Acquisitions)
                </div>
                <DeformationChart zone={zone} animateForecast={false} />
              </div>
            )}

            {currentStage === 4 && (
              <div className="w-full">
                <div className="text-xs font-mono-tech text-orange-400 mb-1 text-center font-bold">
                  Stacked LSTM Neural Network Generating 30-Day Movement Forecast...
                </div>
                <DeformationChart zone={zone} animateForecast={true} />
              </div>
            )}

            {currentStage === 5 && (
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-[10px] font-mono-tech text-slate-400 uppercase">RISK SCORE</div>
                  <div className="text-4xl font-bold font-mono-tech text-orange-400 my-1">
                    {zone.riskScore} <span className="text-base font-normal text-slate-500">/ 100</span>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <div className="text-[10px] font-mono-tech text-slate-400 uppercase">SEVERITY RANKING</div>
                  <div className="px-3 py-1 rounded-lg bg-orange-500/20 border border-orange-500/50 text-orange-400 font-bold font-mono-tech text-sm mt-1">
                    {zone.priorityBadge}
                  </div>
                </div>
              </div>
            )}

            {currentStage === 6 && (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-mono-tech text-sm uppercase tracking-wider">
                    EARLY WARNING DISPATCHED
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {zone.recommendedAction} for {zone.id}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono-tech">
          <span>Dharti Drishti Satellite Decision Support System</span>
          <span>Pipeline Stage {currentStage} of 6</span>
        </div>
      </div>
    </div>
  );
}
