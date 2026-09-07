import React from 'react';
import { 
  HelpCircle, 
  X, 
  TrendingDown, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';
import DeformationChart from './DeformationChart';

export default function ExplainabilityModal({ isOpen, onClose, zone, onStartVerification }) {
  if (!isOpen || !zone) return null;

  const { evidence } = zone;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
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

        {/* 3 Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Evidence 1: Persistent deformation */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">Evidence 01</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">
                  {evidence?.persistentDeformation?.status || 'CRITICAL'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-mono-tech">
                {evidence?.persistentDeformation?.title || 'Persistent Deformation'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                {evidence?.persistentDeformation?.desc || 'Continuous linear downward deformation detected over 12 months.'}
              </p>
            </div>
            <div className="text-sm font-bold font-mono-tech text-cyan-400 pt-2 border-t border-white/5">
              {evidence?.persistentDeformation?.value}
            </div>
          </div>

          {/* Evidence 2: Increasing trend */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">Evidence 02</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                  {evidence?.increasingTrend?.status || 'WARNING'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-mono-tech">
                {evidence?.increasingTrend?.title || 'Increasing Acceleration Trend'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                {evidence?.increasingTrend?.desc || 'Substantial rate acceleration observed in recent acquisitions.'}
              </p>
            </div>
            <div className="text-sm font-bold font-mono-tech text-amber-400 pt-2 border-t border-white/5">
              {evidence?.increasingTrend?.value}
            </div>
          </div>

          {/* Evidence 3: Forecast deterioration */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-slate-400 font-bold uppercase">Evidence 03</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold">
                  {evidence?.forecastDeterioration?.status || 'CRITICAL'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white font-mono-tech">
                {evidence?.forecastDeterioration?.title || 'Forecast Deterioration'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                {evidence?.forecastDeterioration?.desc || 'Predictive model projects continued downward trend breaching thresholds.'}
              </p>
            </div>
            <div className="text-sm font-bold font-mono-tech text-orange-400 pt-2 border-t border-white/5">
              {evidence?.forecastDeterioration?.value}
            </div>
          </div>
        </div>

        {/* Observed -> Forecast Graph */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono-tech text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              OBSERVED → FORECAST TRAJECTORY
            </span>
            <span className="text-[11px] font-mono-tech text-slate-400">
              Confidence Level: 95%
            </span>
          </div>
          <DeformationChart zone={zone} />
        </div>

        {/* Scientific Explanation Box */}
        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-200 leading-relaxed">
            <strong className="text-cyan-300 block font-mono-tech mb-0.5">Decision-Support & Prioritization Context:</strong>
            “Risk is elevated because the observed deformation trend is persistent and the model forecasts continued movement. 
            Dharti Drishti functions strictly as an early-warning decision-support system to prioritize human field verification and authority action.”
          </div>
        </div>

        {/* Modal Actions */}
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
            <span>Proceed to Field Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
