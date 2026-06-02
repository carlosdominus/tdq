/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Activity, ChevronRight, HelpCircle } from 'lucide-react';
import { SymptomScore } from '../types';

interface SymptomCheckerProps {
  onScoreCalculated: (score: SymptomScore) => void;
}

const QUESTIONS = [
  {
    key: 'incompleteEmptying' as const,
    label: 'Sensação de bexiga cheia',
    description: 'Com que frequência, no último mês, você sentiu que a bexiga não esvaziou totalmente após urinar?',
    options: ['Nunca (0 pts)', 'Raras vezes (1 pt)', 'Menos da metade (2 pts)', 'Metade das vezes (3 pts)', 'Mais da metade (4 pts)', 'Quase sempre (5 pts)']
  },
  {
    key: 'frequency' as const,
    label: 'Urgência frequente (menos de 2 horas)',
    description: 'Com que frequência você precisou urinar novamente menos de duas horas após ter urinado?',
    options: ['Nunca (0 pts)', 'Raras vezes (1 pt)', 'Menos da metade (2 pts)', 'Metade das vezes (3 pts)', 'Mais da metade (4 pts)', 'Quase sempre (5 pts)']
  },
  {
    key: 'intermittency' as const,
    label: 'Urina interrompida (para e começa)',
    description: 'Com que frequência você percebeu que o jato de urina parou e recomeçou várias vezes durante o ato?',
    options: ['Nunca (0 pts)', 'Raras vezes (1 pt)', 'Menos da metade (2 pts)', 'Metade das vezes (3 pts)', 'Mais da metade (4 pts)', 'Quase sempre (5 pts)']
  },
  {
    key: 'urgency' as const,
    label: 'Dificuldade de segurar a urina',
    description: 'Com que frequência você achou difícil conter a urina quando sentiu vontade urgente?',
    options: ['Nunca (0 pts)', 'Raras vezes (1 pt)', 'Menos da metade (2 pts)', 'Metade das vezes (3 pts)', 'Mais da metade (4 pts)', 'Quase sempre (5 pts)']
  },
  {
    key: 'weakStream' as const,
    label: 'Jato urinário fraco ou fino',
    description: 'Com que frequência você percebeu que o jato de urina estava fraco, fino ou sem força?',
    options: ['Nunca (0 pts)', 'Raras vezes (1 pt)', 'Menos da metade (2 pts)', 'Metade das vezes (3 pts)', 'Mais da metade (4 pts)', 'Quase sempre (5 pts)']
  },
  {
    key: 'straining' as const,
    label: 'Fazer força para iniciar',
    description: 'Com que frequência você precisou fazer força ou empurrar para conseguir iniciar a micção?',
    options: ['Nunca (0 pts)', 'Raras vezes (1 pt)', 'Menos da metade (2 pts)', 'Metade das vezes (3 pts)', 'Mais da metade (4 pts)', 'Quase sempre (5 pts)']
  },
  {
    key: 'nocturia' as const,
    label: 'Levantar durante a noite',
    description: 'Em média, quantas vezes você precisou acordar no meio da noite para urinar no último mês?',
    options: ['Nenhuma vez (0 pts)', '1 vez por noite (1 pt)', '2 vezes por noite (2 pts)', '3 vezes por noite (3 pts)', '4 vezes por noite (4 pts)', '5 ou mais vezes (5 pts)']
  }
];

export default function SymptomChecker({ onScoreCalculated }: SymptomCheckerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<SymptomScore>({
    incompleteEmptying: 0,
    frequency: 0,
    intermittency: 0,
    urgency: 0,
    weakStream: 0,
    straining: 0,
    nocturia: 0
  });

  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (val: number) => {
    const qKey = QUESTIONS[currentIdx].key;
    const newScores = { ...scores, [qKey]: val };
    setScores(newScores);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
      onScoreCalculated(newScores);
    }
  };

  const handleReset = () => {
    setScores({
      incompleteEmptying: 0,
      frequency: 0,
      intermittency: 0,
      urgency: 0,
      weakStream: 0,
      straining: 0,
      nocturia: 0
    });
    setCurrentIdx(0);
    setIsFinished(false);
  };

  const totalScore = 
    scores.incompleteEmptying + 
    scores.frequency + 
    scores.intermittency + 
    scores.urgency + 
    scores.weakStream + 
    scores.straining + 
    scores.nocturia;

  let severity = 'Grau Leve de Sintomas';
  let severityColor = 'text-green-700 bg-[#E8F5EE] border-[#3DAA5C]/10';
  let textDescription = 'Seu score indica um quadro leve de sintomas e obstrução. Continuar o protocolo diariamente ajudará a evitar que resíduos novos piorem o quadro.';

  if (totalScore >= 20) {
    severity = 'Grau Severo de Sintomas (Obstrução Avançada)';
    severityColor = 'text-[#D94F4F] bg-red-50 border-red-155 border-red-100';
    textDescription = 'Atenção: Seu score indica obstrução e compressão severa da uretra. Seus sintomas merecem foco total e consistência máxima diária no Protocolo do Quiabo em jejum para aliviar e desinchar a resposta inflamatória.';
  } else if (totalScore >= 8) {
    severity = 'Grau Moderado de Sintomas (Obstrução Médio)';
    severityColor = 'text-[#1A3F8B] bg-[#EAF3FB] border-[#2A7FD4]/20';
    textDescription = 'Seu score indica compressão moderada na uretra. Consumir a baba de quiabo com pectina cítrica de manhã ajudará a reverter a inflamação de microplásticos nas esponjas da próstata.';
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 max-w-xl mx-auto text-left" id="symptom-checker-card-large font-sans">
      
      {/* Title */}
      <div className="flex items-center gap-3.5 mb-5 border-b border-slate-100 pb-4">
        <div className="p-3 bg-[#EAF3FB] rounded-xl text-[#1A3F8B] shrink-0">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-[#1A1A2E] text-xl leading-tight">Avaliação de Sintomas IPSS</h3>
          <p className="text-[13px] text-[#555B6E] font-semibold mt-0.5">Mapeamento reconhecido cientificamente para a saúde masculina</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz-step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4 text-left"
          >
            {/* Step Counter */}
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 font-sans tracking-wide">
              <span className="uppercase tracking-wider">Mapeamento Clínico</span>
              <span>Pergunta {currentIdx + 1} de {QUESTIONS.length}</span>
            </div>

            {/* Question Label */}
            <div>
              <h4 className="font-extrabold text-[#1A1A2E] text-xl leading-snug">
                {QUESTIONS[currentIdx].label}
              </h4>
              <p className="text-sm leading-relaxed text-[#555B6E] mt-1.5 font-semibold">
                {QUESTIONS[currentIdx].description}
              </p>
            </div>

            {/* Scale visual row */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-[#1A3F8B] h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Enormous Option Buttons */}
            <div className="grid grid-cols-1 gap-2.5 mt-2">
              {QUESTIONS[currentIdx].options.map((opt, val) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(val)}
                  className="w-full text-left px-5 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#2A7FD4] rounded-2xl text-[15px] text-slate-800 font-extrabold transition-all shadow-sm flex justify-between items-center group cursor-pointer"
                  style={{ minHeight: '56px' }}
                >
                  <span>{opt}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1A3F8B] group-hover:translate-x-1.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6"
          >
            {/* Severity Diagnosis Header */}
            <div className={`p-5 rounded-2xl border-2 flex flex-col gap-2 ${severityColor}`}>
              <span className="text-xs font-bold uppercase tracking-wider font-sans">Nível Mapeado</span>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="text-xl font-black">{severity}</span>
                <span className="text-sm font-black bg-white/80 px-3.5 py-1 rounded-full border border-current font-mono shadow-sm">
                  Score: {totalScore} / 35
                </span>
              </div>
            </div>

            {/* Doctor Note Interpretation card */}
            <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl">
              <div className="flex items-start gap-3">
                <span className="text-3xl select-none">👨🏼‍⚕️</span>
                <div>
                  <h4 className="font-extrabold text-[#1A1A2E] text-base">Orientação do Dr. Haroldo</h4>
                  <p className="text-sm text-[#555B6E] leading-relaxed mt-1.5 font-semibold">
                    {textDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Scientific disclaimer */}
            <p className="text-xs text-slate-400 leading-relaxed italic border-l-4 border-slate-200 pl-3">
              *A ferramenta utiliza o Índice Internacional de Sintomas Prostáticos (I-PSS), amplamente validado na urologia médica. Guarde este resultado e refaça a cada 15 dias de protocolo para monitorar seu desdobramento de melhora.
            </p>

            {/* Big Action buttons */}
            <button
              onClick={handleReset}
              className="w-full h-14 flex items-center justify-center gap-2 bg-[#1A3F8B] hover:bg-opacity-95 text-white rounded-2xl text-[16px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md mt-2"
            >
              <RefreshCw className="w-4 h-4 line" /> Refazer Mapeamento de Sintomas
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
