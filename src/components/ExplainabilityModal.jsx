import React from 'react';
import { 
  HelpCircle, 
  X, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  ArrowRight,
  Info
} from 'lucide-react';
import DeformationChart from './DeformationChart';

export default function ExplainabilityModal({ isOpen, onClose, zone, onStartVerification }) {
  if (!isOpen || !zone) return null;

  const { evidence } = zone;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl overflow-hidden flex flex-col gap-5 max-h-[90vh] overflow-y-auto custom-scrollbar">

        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider">
                EXPLAINABLE AI RISK AUDIT · {zone.id}
              </div>
              <h2 className="text-xl font-bold font-display-title text-white">
                WHY WAS THIS ZONE FLAGGED?
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

        {/* Requirement 2: 3 Simple Evidence Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Bullet 1: Persistent deformation */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">Evidence 01</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">
                  CRITICAL
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-mono-tech">
                Persistent deformation
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Continuous linear downward displacement detected across historical SAR baseline.
              </p>
            </div>
            <div className="text-sm font-bold font-mono-tech text-cyan-400 pt-2 border-t border-white/5">
              {evidence?.persistentDeformation?.value || '-1.25 mm / month'}
            </div>
          </div>

          {/* Bullet 2: Increasing velocity trend */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">Evidence 02</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                  WARNING
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-mono-tech">
                Increasing velocity trend
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Significant velocity acceleration detected in recent satellite passes.
              </p>
            </div>
            <div className="text-sm font-bold font-mono-tech text-amber-400 pt-2 border-t border-white/5">
              {evidence?.increasingTrend?.value || '+42% Velocity Shift'}
            </div>
          </div>

          {/* Bullet 3: Forecast indicates continued movement */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">Evidence 03</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold">
                  CRITICAL
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-mono-tech">
                Forecast indicates continued movement
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                LSTM neural network projects trajectory breaching critical safety limits in 30 days.
              </p>
            </div>
            <div className="text-sm font-bold font-mono-tech text-orange-400 pt-2 border-t border-white/5">
              {evidence?.forecastDeterioration?.value || '-18.7 mm @ 30 Days'}
            </div>
          </div>
        </div>

        {/* Observed vs Forecast Graph */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono-tech text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              OBSERVED VS FORECAST DISPLACEMENT
            </span>
            <span className="text-[11px] font-mono-tech text-slate-400">
              Confidence Band: 95%
            </span>
          </div>
          <DeformationChart zone={zone} />
        </div>

        {/* Requirement 2: AI RECOMMENDATION Box */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-200 leading-relaxed">
            <div className="text-amber-400 font-bold font-mono-tech text-xs uppercase mb-0.5">
              AI RECOMMENDATION: Prioritize field inspection
            </div>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Risk is elevated because the observed deformation trend is persistent and the model forecasts continued movement. 
              Dharti Drishti serves as an early-warning decision-support tool to prioritize field inspection resources.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            Close Window
          </button>
          
          <button
            onClick={() => {
              onClose();
              onStartVerification();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <span>START FIELD VERIFICATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
