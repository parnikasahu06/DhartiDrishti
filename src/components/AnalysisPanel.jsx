import React from 'react';
import { 
  Play, 
  HelpCircle, 
  CheckSquare, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import DeformationChart from './DeformationChart';

export default function AnalysisPanel({ 
  zone, 
  onRunAnalysis, 
  onOpenExplainability, 
  onStartVerification 
}) {
  if (!zone) {
    return (
      <div className="w-full h-full glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center">
        <Activity className="w-12 h-12 text-slate-600 animate-pulse mb-3" />
        <p className="text-slate-400 text-sm">Select a monitoring zone on the map to begin deformation analysis</p>
      </div>
    );
  }

  const isVerified = zone.status === 'VERIFIED';

  const riskColorClasses = {
    CRITICAL: 'text-red-400 border-red-500/40 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    HIGH: 'text-orange-400 border-orange-500/40 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]',
    MEDIUM: 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    LOW: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  };

  const riskScoreBar = {
    CRITICAL: 'bg-red-500 shadow-[0_0_12px_#ef4444]',
    HIGH: 'bg-orange-500 shadow-[0_0_12px_#f97316]',
    MEDIUM: 'bg-amber-500 shadow-[0_0_12px_#f59e0b]',
    LOW: 'bg-emerald-500 shadow-[0_0_12px_#10b981]',
  };

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-5 border border-white/10 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
      {/* Zone Header Info */}
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-cyan-400 font-bold uppercase tracking-widest">
              {zone.id}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {zone.district} District
            </span>
            {isVerified && (
              <span className="flex items-center gap-1 text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                FIELD VERIFIED
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold font-display-title text-white tracking-tight">
            {zone.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {zone.locationName} · {zone.lat.toFixed(4)}°N, {zone.lng.toFixed(4)}°E
          </p>
        </div>

        {/* Priority Badge */}
        <div className={`px-3 py-1.5 rounded-lg border font-mono-tech text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 ${riskColorClasses[zone.riskLevel]}`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{zone.priorityBadge}</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Metric 1: Observed Displacement */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
          <div className="text-[11px] font-mono-tech text-slate-400 font-medium">Ground Deformation</div>
          <div className="text-2xl font-bold font-mono-tech text-cyan-400 my-1">
            {zone.currentDeformation} <span className="text-xs font-normal text-slate-400">mm</span>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Observed SAR Time-Series
          </div>
        </div>

        {/* Metric 2: Trend */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
          <div className="text-[11px] font-mono-tech text-slate-400 font-medium">Velocity Trend</div>
          <div className="text-sm font-bold font-mono-tech text-amber-400 my-1 flex items-center gap-1.5 uppercase">
            <TrendingDown className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{zone.trend}</span>
          </div>
          <div className="text-[10px] text-slate-400">
            {zone.trendRate} mm / month
          </div>
        </div>

        {/* Metric 3: 30-Day Forecast */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
          <div className="text-[11px] font-mono-tech text-slate-400 font-medium">30-Day LSTM Forecast</div>
          <div className="text-2xl font-bold font-mono-tech text-orange-400 my-1">
            {zone.forecast30Day} <span className="text-xs font-normal text-slate-400">mm</span>
          </div>
          <div className="text-[10px] text-slate-400">
            Target Horizon: Oct 2026
          </div>
        </div>
      </div>

      {/* Deformation Time-Series Chart */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-mono-tech text-slate-200 uppercase tracking-wider">
              Surface Displacement Time-Series & LSTM Projection
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono-tech">
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="w-3 h-0.5 bg-cyan-400 rounded"></span> Observed
            </span>
            <span className="flex items-center gap-1 text-orange-400">
              <span className="w-3 h-0.5 border-t border-dashed border-orange-400"></span> Forecast
            </span>
          </div>
        </div>
        <DeformationChart zone={zone} />
      </div>

      {/* Risk Engine & Recommendation Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className={`w-4 h-4 ${zone.riskLevel === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'}`} />
            <span className="text-xs font-bold font-mono-tech text-white uppercase tracking-wider">
              Risk Engine Severity Ranking
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-slate-400 text-xs">Score:</span>
            <span className={`text-lg font-bold font-mono-tech ${zone.riskLevel === 'CRITICAL' ? 'text-red-400' : zone.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-amber-400'}`}>
              {zone.riskScore}
            </span>
            <span className="text-slate-500 text-xs font-mono-tech">/ 100</span>
          </div>
        </div>

        {/* Risk Score Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${riskScoreBar[zone.riskLevel]}`}
            style={{ width: `${zone.riskScore}%` }}
          />
        </div>

        {/* Flagged Reasons */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-300">
          <div className="text-[11px] font-mono-tech text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
            Key Risk Drivers:
          </div>
          {zone.flaggedReasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>

        {/* Recommended Action Box */}
        <div className="mt-1 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-amber-400 font-mono-tech uppercase font-bold block">Recommended Action</span>
              <strong className="text-white text-xs">{zone.recommendedAction}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action CTAs */}
      <div className="flex flex-col gap-2.5 mt-1">
        {/* CTA 1: RUN SATELLITE ANALYSIS */}
        <button
          onClick={onRunAnalysis}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer group border border-cyan-400/40"
        >
          <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
          <span>RUN SATELLITE ANALYSIS</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse ml-auto" />
        </button>

        {/* Secondary Action Row */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* CTA 2: WHY WAS THIS ZONE FLAGGED? */}
          <button
            onClick={onOpenExplainability}
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Why Flagged?</span>
          </button>

          {/* CTA 3: START FIELD VERIFICATION */}
          <button
            onClick={onStartVerification}
            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isVerified
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/60 hover:bg-amber-900/60 border-amber-500/40 text-amber-300'
            }`}
          >
            {isVerified ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Field Verified</span>
              </>
            ) : (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Field Verify</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
