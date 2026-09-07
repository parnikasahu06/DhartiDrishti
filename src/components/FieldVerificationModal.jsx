import React, { useState } from 'react';
import { 
  CheckSquare, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FieldVerificationModal({ isOpen, onClose, zone, onVerifyZone }) {
  if (!isOpen || !zone) return null;

  const [checklist, setChecklist] = useState(
    zone.fieldChecklist || [
      { id: 'c1', label: 'Ground Fissure & Structural Crack Survey', completed: true },
      { id: 'c2', label: 'Existing Crack Meter / Extensometer Cross-Check', completed: true },
      { id: 'c3', label: 'Site Observation & Slope Wall Inspection', completed: false }
    ]
  );

  const [notes, setNotes] = useState(
    zone.inspectorNotes || 'Field team inspected slope wall boundary. Tensile hairline cracks observed near haul road boundary. In-situ extensometer confirms movement.'
  );

  const isAlreadyVerified = zone.status === 'VERIFIED';
  const [isSubmitted, setIsSubmitted] = useState(isAlreadyVerified);

  const toggleCheck = (id) => {
    setChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const handleVerify = () => {
    setIsSubmitted(true);
    onVerifyZone(zone.id, notes);

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#3b82f6']
      });
    } catch (e) {
      console.log('Confetti playback');
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-emerald-500/30 p-6 shadow-2xl overflow-hidden flex flex-col gap-5">

        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-wider">
                FIELD VERIFICATION PROTOCOL
              </div>
              <h2 className="text-xl font-bold font-display-title text-white">
                SITE: {zone.name}
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

        {/* Requirement 3: AI ALERT → PRIORITIZED INSPECTION → FIELD VERIFICATION → AUTHORITY DECISION */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between text-[11px] font-mono-tech shadow-inner">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>AI ALERT</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>PRIORITIZED INSPECTION</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className={`flex items-center gap-1.5 font-bold ${isSubmitted ? 'text-emerald-400' : 'text-slate-300'}`}>
            <span className={`w-2 h-2 rounded-full ${isSubmitted ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>FIELD VERIFICATION</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="flex items-center gap-1.5 text-blue-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>AUTHORITY DECISION</span>
          </div>
        </div>

        {/* Checklist & Inspector Notes */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono-tech text-slate-200 uppercase tracking-wider">
              FIELD INSPECTION CHECKLIST
            </span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold ${
              isSubmitted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {isSubmitted ? 'FIELD VERIFICATION RECORDED' : 'INSPECTION REQUIRED'}
            </span>
          </div>

          <div className="flex flex-col gap-2 my-1">
            {checklist.map((item) => (
              <label
                key={item.id}
                onClick={() => !isSubmitted && toggleCheck(item.id)}
                className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                  isSubmitted ? 'cursor-default' : 'cursor-pointer'
                } ${
                  item.completed
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-950/50 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[11px] font-mono-tech text-slate-400 font-semibold uppercase">
              Field Inspector Observations & Extensometer Notes:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitted}
              rows={3}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs font-mono-tech text-slate-200 focus:outline-none focus:border-emerald-500/50 disabled:opacity-80"
              placeholder="Enter site observations or instrument readings..."
            />
          </div>
        </div>

        {/* Requirement 3: FINAL GOVERNANCE MESSAGE */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-emerald-500/40 text-center flex flex-col items-center justify-center gap-1 shadow-lg">
          <div className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            CORE GOVERNANCE PRINCIPLE
          </div>
          <div className="text-sm font-extrabold font-mono-tech text-white tracking-widest">
            AI RECOMMENDS &nbsp;·&nbsp; HUMANS VERIFY &nbsp;·&nbsp; AUTHORITIES DECIDE
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            Cancel
          </button>

          {!isSubmitted ? (
            <button
              onClick={handleVerify}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono-tech uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>MARK AS VERIFIED</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-mono-tech font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                FIELD VERIFICATION RECORDED
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-mono-tech uppercase transition-all shadow-md cursor-pointer ml-3"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
