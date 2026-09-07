import React from 'react';
import { Radar, Layers, Cpu, ShieldAlert, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
import { SATELLITE_METADATA } from '../data/mockData';

export default function Header({ onOpenArchitecture, activeZone }) {
  return (
    <header className="w-full bg-[#090d16]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 z-30 sticky top-0 shadow-2xl">
      {/* Left: Brand Identity & Title */}
      <div className="flex items-center gap-3.5">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Radar className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display-title text-xl font-bold tracking-tight text-white flex items-center gap-2">
              DHARTI DRISHTI
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 uppercase tracking-widest">
                v2.4 SAR-AI
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Satellite-Based Ground Deformation Early-Warning System for Mining-Affected Rural Regions
          </p>
        </div>
      </div>

      {/* Center/Right: Badges & System Status */}
      <div className="flex items-center flex-wrap gap-3">
        {/* Prototype Honesty Banner */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono-tech">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>PROTOTYPE MODE · DEMONSTRATION DATA</span>
        </div>

        {/* System Operational Status */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-300 font-mono-tech">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-emerald-400 font-semibold uppercase tracking-wider">System Operational</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Last observation: <strong className="text-white font-medium">{SATELLITE_METADATA.lastObservation}</strong>
          </span>
        </div>

        {/* Architecture Toggle Button */}
        <button
          onClick={onOpenArchitecture}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-medium transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>System Architecture</span>
        </button>
      </div>
    </header>
  );
}
