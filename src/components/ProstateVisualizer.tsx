/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trash2, Droplets, ShieldAlert, CheckCircle } from 'lucide-react';

export default function ProstateVisualizer() {
  const [days, setDays] = useState(1);

  // Shrink rate calculations based on the 67% reduction study in the copy
  const prostateSizePercent = Math.max(33, 100 - (days * 2.2)); // from 100% (inflamed/huge) down to 33% (healthy size)
  const plasticsCount = Math.max(0, Math.round(100 - (days * 3.3))); // microplastics getting expelled
  const streamStrength = Math.min(100, Math.round(15 + (days * 2.8))); // flow rate improving

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-xl mx-auto" id="prostate-visualizer-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">Simulador de Desobstrução</h3>
          <p className="text-xs text-slate-500">Veja o efeito do Protocolo do Quiabo no seu corpo dia após dia</p>
        </div>
      </div>

      {/* Visual Animation Box */}
      <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden flex flex-col justify-between p-4 border border-slate-800">
        <div className="flex justify-between items-center z-10">
          <span className="text-slate-400 text-xs font-mono">Simulador Clínico 3.2</span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
            {days === 30 ? 'Desobstrução Completa' : 'Filtração Ativa'}
          </span>
        </div>

        {/* Anatomical Representation (SVG-based visual engine) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-2">
          <svg width="240" height="180" viewBox="0 0 240 180" className="opacity-90">
            {/* Bladder (Bexiga) */}
            <path
              d="M 60 40 Q 120 10 180 40 Q 190 70 120 70 Q 50 70 60 40 Z"
              fill="#2563eb"
              fillOpacity="0.25"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="120" y="38" fill="#93c5fd" fontSize="10" textAnchor="middle" fontWeight="bold">BEXIGA</text>

            {/* Urine in bladder */}
            <path
              d="M 70 50 Q 120 35 170 50 Q 170 65 120 68 Q 70 65 70 50 Z"
              fill="#3b82f6"
              fillOpacity="0.5"
            />

            {/* Urethra (Canal que passa no meio da próstata) */}
            <line
              x1="120"
              y1="70"
              x2="120"
              y2="170"
              stroke={days > 15 ? '#3b82f6' : '#ef4444'}
              strokeWidth={Math.max(1.5, streamStrength / 12)}
              strokeDasharray={days > 15 ? 'none' : '2'}
              className="transition-all duration-300"
            />

            {/* Prostate (Próstata ao redor da uretra) */}
            <motion.circle
              cx="120"
              cy="105"
              r={(prostateSizePercent / 100) * 36 + 18}
              fill={days < 10 ? '#f73b3b' : days < 20 ? '#f59e0b' : '#10b981'}
              fillOpacity="0.2"
              stroke={days < 10 ? '#ef4444' : days < 20 ? '#f59e0b' : '#10b981'}
              strokeWidth="2"
              className="transition-all duration-500"
            />
            
            {/* Urethra constraint visuals */}
            {days < 15 && (
              <path
                d="M 110 105 Q 115 105 119 105"
                stroke="#f87171"
                strokeWidth="2"
              />
            )}
            {days < 15 && (
              <path
                d="M 130 105 Q 125 105 121 105"
                stroke="#f87171"
                strokeWidth="2"
              />
            )}

            <text x="120" y="108" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold" className="drop-shadow bg-black/50">
              PRÓSTATA
            </text>

            {/* Microplastics inside the prostate tissue (They fade out as days go by!) */}
            {Array.from({ length: 15 }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / 15;
              const rOffset = ((prostateSizePercent / 100) * 20 + 10) * (i % 2 === 0 ? 0.5 : 0.85);
              const px = 120 + Math.cos(angle) * rOffset;
              const py = 105 + Math.sin(angle) * rOffset;
              
              // Only render if within plastic percentage
              return i * 7 < plasticsCount ? (
                <circle
                  key={i}
                  cx={px}
                  cy={py}
                  r="2.5"
                  fill="#fbbf24"
                  stroke="#d97706"
                  strokeWidth="0.5"
                  className="animate-pulse"
                />
              ) : null;
            })}

            {/* Expelled microplastic particles flowing out with urine */}
            {days > 1 && days < 28 && (
              <g className="animate-bounce">
                <circle cx="120" cy="140" r="1.5" fill="#fbbf24" />
                <circle cx="121" cy="155" r="1.5" fill="#fbbf24" />
              </g>
            )}
          </svg>
        </div>

        {/* Realtime stats hud inside the simulator */}
        <div className="flex justify-between items-end z-10 w-full mt-auto">
          <div className="text-left">
            <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Tamanho Próstata</span>
            <span className={`text-sm font-bold font-mono ${days < 15 ? 'text-red-400' : 'text-emerald-400'}`}>
              {days < 10 ? 'Inchada' : days < 20 ? 'Reduzindo' : 'Normal'} ({Math.round(prostateSizePercent)}%)
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Jato Urinário</span>
            <span className="text-sm font-bold font-mono text-blue-400 flex items-center justify-end gap-1">
              <Droplets className="w-3.5 h-3.5 inline text-blue-500 animate-pulse" /> {streamStrength}%
            </span>
          </div>
        </div>
      </div>

      {/* Control Slider */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-600 text-xs font-semibold flex items-center gap-1.5">
            Tempo com o Protocolo (Dias):
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
            Dia {days}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
          id="simulation-time-slider"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
          <span>Dia 1 (Início)</span>
          <span>Dia 15 (Esvaziamento livre)</span>
          <span>Dia 30 (Alívio completo)</span>
        </div>
      </div>

      {/* Quick Summary Box */}
      <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5 text-slate-400" /> Microplásticos remanescentes:
          </span>
          <span className="font-semibold text-slate-700 font-mono">{(plasticsCount * 1).toFixed(0)}%</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Pressão do jato urinário:
          </span>
          <span className="font-semibold text-emerald-600 font-mono">
            {days < 10 ? 'Fio fraco e interrompido' : days < 20 ? 'Sem falhas e continuo' : 'Forte e barulhento!'}
          </span>
        </div>

        {days < 10 ? (
          <div className="flex gap-2 items-start text-[11px] bg-red-50 text-red-700 p-2.5 rounded-lg border border-red-100 mt-1">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <p>
              <strong>Próstata Espetada:</strong> O acúmulo invisível de plástico (equivalente a uma tampinha) está agindo como farpas. A urina fica presa. Continue com o checklist diário de baba de quiabo para criar a atração magnética de desobstrução.
            </p>
          </div>
        ) : (
          <div className="flex gap-2 items-start text-[11px] bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-100 mt-1">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <p>
              <strong>Alívio Ativo:</strong> O Rhamnogalacturonano está limpando as farpas microscópicas. Com a eliminação do plástico, as paredes inflamadas da sua próstata começam a murchar, desobstruindo a uretra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
