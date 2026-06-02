/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Shield, Check, ChevronRight, HelpCircle, AlertTriangle } from 'lucide-react';

export default function ProtocolGuide() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userName, setUserName] = useState('José');

  useEffect(() => {
    const storedName = localStorage.getItem('mpa_user_name') || 'Membro';
    setUserName(storedName);
  }, []);

  const handleMarkAsDone = () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Read and save to logs
    const completedDays: string[] = JSON.parse(localStorage.getItem('mpa_protocol_log') || '[]');
    if (!completedDays.includes(dateStr)) {
      completedDays.push(dateStr);
      localStorage.setItem('mpa_protocol_log', JSON.stringify(completedDays));
    }

    // Trigger an update event
    window.dispatchEvent(new Event('storage'));

    // Move to step 4 (Success state!)
    setActiveStep(4);
  };

  const dayNumber = Math.max(1, Math.round((Date.now() - new Date(localStorage.getItem('mpa_start_date') || Date.now()).getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 max-w-xl mx-auto text-left" id="protocol-guide-interactive-stepper">
      {/* Header section with overall progress indicator */}
      <div className="flex items-center justify-between mb-5 border-b border-light pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#EAF3FB] rounded-xl text-[#1A3F8B] font-black shrink-0">
            🌿
          </div>
          <div>
            <h3 className="font-extrabold text-[#1A1A2E] text-lg leading-tight">Guia do Preparo Diário</h3>
            <p className="text-xs text-[#555B6E] font-semibold mt-0.5">Siga o passo a passo com o Dr. Haroldo</p>
          </div>
        </div>

        {activeStep > 0 && activeStep < 4 && (
          <span className="text-xs font-black text-[#2A7FD4] bg-[#EAF3FB] px-3 py-1 rounded-full border border-[#2A7FD4]/10 font-mono">
            Passo {activeStep} de 3
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Welcome introduction */}
        {activeStep === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="text-center py-4 select-none">
              <span className="text-6xl text-center block">🍵</span>
            </div>
            <h4 className="font-extrabold text-[#1A1A2E] text-2xl text-center leading-tight">
              Seu Protocolo Diário do Quiabo
            </h4>
            <p className="text-sm md:text-base leading-relaxed text-[#555B6E] text-center font-semibold">
              Este é o seu roteiro prático diário. São apenas <strong className="text-emerald-600">3 passos simples</strong> recomendados pelo Dr. Haroldo. Faça toda manhã, em jejum, antes do seu café da manhã. Leva menos de 5 minutos!
            </p>

            <div className="p-4 bg-[#EAF3FB]/50 rounded-xl border border-[#2A7FD4]/10 text-xs text-[#555B6E] leading-relaxed flex gap-2.5 items-start font-semibold">
              <span className="text-amber-500 text-lg">💡</span>
              <p>
                <strong>Importante:</strong> Deixe a mistura do Passo 1 pronta na noite anterior para que as moléculas fiquem na viscosidade ideal pela manhã!
              </p>
            </div>

            <button
              onClick={() => setActiveStep(1)}
              className="w-full h-14 bg-[#1A3F8B] hover:bg-opacity-95 text-white font-black text-lg uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              Começar Preparo →
            </button>
          </motion.div>
        )}

        {/* Step 1: Preparar a Baba */}
        {activeStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 pb-2 select-none">
              <span className="text-4xl">🌿</span>
              <div>
                <span className="block text-[11px] font-black text-[#2A7FD4] uppercase tracking-wider font-mono">Noite Anterior</span>
                <h4 className="font-extrabold text-[#1A1A2E] text-xl">Passo 1 — Preparar a baba do quiabo</h4>
              </div>
            </div>

            <div className="space-y-3.5 text-sm font-semibold text-[#555B6E] leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="block text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Você vai precisar de:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-800">
                  <li>2 quiabos frescos médios</li>
                  <li>100ml de água filtrada (temperatura ambiente)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Como fazer:</span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                  <li>Lave bem os quiabos em água corrente.</li>
                  <li>Corte em rodelas bem finas (cerca de 3 a 4 milímetros cada).</li>
                  <li>Coloque as rodelas em 100ml de água filtrada.</li>
                  <li>Deixe de molho por pelo menos <strong className="text-slate-900 border-b-2 border-amber-300">8 horas</strong> (pode deixar tampado na geladeira de véspera).</li>
                  <li>A água ficará gelatinosa e viscosa — isso é o Rhamnogalacturonano concentrado.</li>
                  <li>Coe com uma peneira comum e reserve apenas a baba líquida filtrada.</li>
                </ol>
              </div>
            </div>

            <div className="p-4 bg-[#EAF3FB]/30 rounded-xl border border-[#2A7FD4]/10 text-xs text-slate-700 leading-relaxed font-semibold italic">
              ✨ <strong>Dica do Dr. Haroldo:</strong> "A baba do quiabo funciona como um ímã biológico que gruda e arrasta microplásticos alojados no tecido esponjoso da sua uretra."
            </div>

            <button
              onClick={() => setActiveStep(2)}
              className="w-full h-14 bg-[#1A3F8B] hover:bg-opacity-95 text-white font-black text-lg uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer mt-2"
            >
              Próximo Passo →
            </button>
          </motion.div>
        )}

        {/* Step 2: Adicionar a Pectina Cítrica */}
        {activeStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 pb-2 select-none">
              <span className="text-4xl">🍋</span>
              <div>
                <span className="block text-[11px] font-black text-emerald-600 uppercase tracking-wider font-mono">Pela manhã</span>
                <h4 className="font-extrabold text-[#1A1A2E] text-xl">Passo 2 — Adicionar a Pectina Cítrica</h4>
              </div>
            </div>

            <div className="space-y-3.5 text-sm font-semibold text-[#555B6E] leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="block text-xs uppercase font-bold text-slate-400 mb-1 tracking-wider">Você vai precisar de:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-800">
                  <li>A baba do quiabo que você preparou e coou no Passo 1</li>
                  <li>1 colher de chá rasa (5g) de pectina cítrica em pó</li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Como fazer:</span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                  <li>Coloque a baba de quiabo limpa em um copo pequeno.</li>
                  <li>Adicione exatamente 1 colher de chá rasa de pectina cítrica modificada em pó.</li>
                  <li>Mexa bem com uma colher por 30 segundos até dissolver por completo.</li>
                  <li>O líquido ficará ligeiramente mais consistente.</li>
                </ol>
              </div>
            </div>

            <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-100 text-xs leading-relaxed font-bold flex gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
              <p>
                <strong>Atenção:</strong> Use apenas 1 colher de chá rasa. Não mude a dose sem recomendação. A pectina age como um escudo que evita novos depósitos de plástico.
              </p>
            </div>

            <div className="flex gap-2.5 mt-2">
              <button
                onClick={() => setActiveStep(1)}
                className="w-1/3 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm rounded-2xl transition-all border border-slate-300 cursor-pointer"
              >
                ← Voltar
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="flex-1 h-14 bg-[#1A3F8B] hover:bg-opacity-95 text-white font-black text-base md:text-lg uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
              >
                Último Passo →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Tomar o Composto Sublingual */}
        {activeStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 pb-2 select-none">
              <span className="text-4xl">💧</span>
              <div>
                <span className="block text-[11px] font-black text-amber-600 uppercase tracking-wider font-mono">Consumo correto</span>
                <h4 className="font-extrabold text-[#1A1A2E] text-xl">Passo 3 — Tomar o composto (Sublingual)</h4>
              </div>
            </div>

            <div className="space-y-4 text-sm font-semibold text-[#555B6E] leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="block text-xs uppercase font-bold text-slate-400 mb-1.5 tracking-wider">Como ingerir para absorção total:</span>
                <ol className="list-decimal list-inside space-y-2.5 text-slate-800">
                  <li>Coloque a solução na boca, focando em posicionar embaixo da língua.</li>
                  <li>Segure a solução embaixo da língua por <strong className="text-indigo-900 border-b-2 border-indigo-200">30 segundos inteiros</strong> de relógio.</li>
                  <li>Após os 30 segundos, pode engolir o restante normalmente.</li>
                </ol>
              </div>

              <div className="p-4 bg-[#E8F5EE] text-emerald-800 rounded-xl border border-emerald-100 text-xs leading-relaxed font-bold">
                💡 <strong>Por que embaixo da língua?</strong>
                <br />
                Os minúsculos vasos sanguíneos no assoalho da boca absorvem os compostos limpadores de plástico diretamente no sangue e os entregam na uretra em segundos, evitando que a acidez do seu estômago destrua a bioatividade.
              </div>
            </div>

            <div className="flex gap-2.5 mt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="w-1/3 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm rounded-2xl transition-all border border-slate-300 cursor-pointer"
              >
                ← Voltar
              </button>
              <button
                onClick={handleMarkAsDone}
                className="flex-1 h-14 bg-[#3DAA5C] hover:bg-opacity-95 text-white font-black text-base md:text-lg uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                ✓ Marcar como feito de hoje
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Step Confirmation Success */}
        {activeStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center py-4"
          >
            <div className="w-20 h-20 bg-[#E8F5EE] border-4 border-[#3DAA5C] rounded-full flex items-center justify-center mx-auto shadow-sm select-none">
              <Check className="w-10 h-10 text-[#3DAA5C] stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-[#1A1A2E] text-2xl">
                Protocolo Feito! ✓
              </h4>
              <p className="text-sm md:text-base leading-relaxed text-[#555B6E] font-semibold max-w-sm mx-auto">
                Excelente, <strong>{userName}</strong>! Você completou com sucesso a dose do <strong className="text-emerald-700 border-b-2 border-emerald-200">Dia {dayNumber}</strong>. O composto purificador já começou a agir nas suas glândulas. Nos vemos amanhã!
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 font-medium">
              Não tome mais de uma dose por dia. Consistência é o único segredo do Dr. Haroldo.
            </div>

            <button
              onClick={() => setActiveStep(0)}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black text-lg uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-md"
            >
              Voltar ao Início
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
