/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';

interface ArticleItem {
  id: number;
  icon: string;
  title: string;
  preview: string;
  content: string;
}

export default function Aprender() {
  const [expandedId, setExpandedId] = useState<number | null>(1); // first article opened by default

  const ARTICLES: ArticleItem[] = [
    {
      id: 1,
      icon: '🔬',
      title: 'Por que sua próstata inchou?',
      preview: 'A verdade que a maioria dos urologistas convencionais não conta.',
      content: 'Sua próstata funciona como uma esponja — ela absorve líquidos do seu sangue o dia todo para produzir o líquido seminal. O problema é que hoje nosso sangue está cheio de micropartículas de plástico, vindas da água engarrafada, da comida aquecida no micro-ondas, de recipientes plásticos e tecidos sintéticos.\n\nEsses microplásticos entram na próstata junto com o líquido que ela absorve. Uma vez lá dentro, seu sistema imunológico não consegue dissolvê-los. O plástico não é um ser vivo (como bactérias ou vírus); o corpo humano simplesmente não tem enzimas para destruí-lo. Então, o sistema imune cria uma inflamação constante ao redor de cada partícula, inchando o órgão de forma crônica.'
    },
    {
      id: 2,
      icon: '🌿',
      title: 'Como o quiabo consegue desinchar?',
      preview: 'O segredo científico está na viscosidade — o Ramnogalacturonano.',
      content: 'A baba do quiabo contém um polímero natural extremamente especial chamado Ramnogalacturonano. Ele possui uma supercarga eletrostática negativa, agindo como um imã potente na corrente sanguínea.\n\nQuando esse composto passa pelos vasos da próstata, ele atrai as partículas de microplástico que estão gerando a inflamação, envolvendo cada uma e conduzindo-as com segurança para fora do corpo através da urina. Pesquisas internacionais comprovam que essa baba limpa até 90% das toxinas microplásticas.'
    },
    {
      id: 3,
      icon: '🍋',
      title: 'Para que serve a pectina cítrica?',
      preview: 'O escudo invisível contra novos plásticos domésticos.',
      content: 'O quiabo limpa o plástico acumulado ao longo de anos. Mas e o plástico novo que você acaba digerindo sem querer no dia seguinte? A Pectina Cítrica age como seu escudo de suporte permanente.\n\nAo se misturar com a baba, a Pectina entra nos tecidos e bloqueia a adesão de novos poluentes em suas glândulas prostáticas. Uma dupla blindagem: o quiabo limpa e dissolve o acúmulo histórico, e a pectina cítrica atua impedindo novos danos.'
    },
    {
      id: 4,
      icon: '📅',
      title: 'Em quanto tempo sentirei melhoras escritas?',
      preview: 'Cronograma evolutivo estimado de desobstrução.',
      content: '• Dias 1 a 7: O composto começa a saturar as esponjas uretrais. Alguns homens sentem o jato inicial mais solto.\n\n• Dias 7 a 21: Pico de eliminação de resíduos. Você pode notar a urina com coloração ou consistência diferente (é o plástico saindo!). Reduzem em até 50% as idas ao banheiro na calada da noite.\n\n• Dias 21 a 60: Alívio crônico. Noites tranquilas e completas de sono saudável sem interrupção urinária.\n\n• Dias 60 a 90: Consolidação orgânica. O órgão retorna progressivamente para o diâmetro original de repouso.'
    },
    {
      id: 5,
      icon: '❓',
      title: 'Perguntas Frequentes & Respostas',
      preview: 'Dúvidas sobre o tratamento e preparação.',
      content: 'P: Onde compro a Pectina Cítrica?\nR: Em qualquer loja de produtos naturais de bairro, zonas cerealistas, farmácias de manipulação ou pela internet (Mercado Livre, Shopee). Procure por "Pectina Cítrica em pó pura".\n\nP: Posso tomar mais de uma vez ao dia em jejum?\nR: Não se recomenda tomar duas doses. Respeite as orientações e horários do Dr. Haroldo para que o jato não aumente de forma descontrolada.\n\nP: Devo suspender as medicações prescritas?\nR: Nunca altere suas receitas médicas sem consulta. O quiabo é um alimento natural e complementa perfeitamente sua rotina sem efeitos colaterais nocivos.'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 max-w-xl mx-auto text-left" id="aprender-educational-module">
      
      {/* Article Title Header */}
      <div className="flex items-center gap-3.5 mb-5 border-b border-slate-100 pb-4">
        <div className="p-3 bg-[#EAF3FB] rounded-xl text-[#1A3F8B] shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-[#1A1A2E] text-xl leading-tight">Biblioteca do Aluno</h3>
          <p className="text-[13px] text-[#555B6E] font-semibold mt-0.5">Entenda as descobertas que curam e protegem seu corpo</p>
        </div>
      </div>

      {/* Accordion Card Container */}
      <div className="space-y-3.5">
        {ARTICLES.map((art) => {
          const isExpanded = expandedId === art.id;
          return (
            <div 
              key={art.id} 
              className={`rounded-2xl border-2 transition-all overflow-hidden ${
                isExpanded 
                  ? 'border-[#2A7FD4] bg-[#EAF3FB]/10 shadow-sm' 
                  : 'border-slate-150 hover:border-slate-300'
              }`}
            >
              {/* Box Trigger header bar */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : art.id)}
                className="w-full p-4 flex items-center justify-between gap-3 cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none" role="img">{art.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-[#1A1A2E] text-base md:text-lg leading-snug">
                      {art.title}
                    </h4>
                    {!isExpanded && (
                      <p className="text-xs text-[#555B6E] font-semibold mt-0.5 max-w-[280px] sm:max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
                        {art.preview}
                      </p>
                    )}
                  </div>
                </div>

                <div className={`p-1.5 rounded-lg ${isExpanded ? 'bg-[#2A7FD4]/10 text-[#1A3F8B]' : 'bg-slate-50 text-slate-400'}`}>
                  {isExpanded ? <ChevronDown className="w-5 h-5 stroke-[2.5]" /> : <ChevronRight className="w-5 h-5 stroke-[2.5]" />}
                </div>
              </button>

              {/* Box expansion container */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-dashed border-slate-205 border-slate-200/50 bg-white/70">
                  <p className="text-sm md:text-base leading-relaxed text-[#555B6E] font-semibold whitespace-pre-line">
                    {art.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-2.5 items-start text-xs text-[#555B6E] font-semibold">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
        <p>
          As lições acima foram revisadas pelo <strong>Dr. Haroldo Vasconcelos</strong> e representam o estado da arte do protocolo prático do quiabo na desobstrução prostática natural.
        </p>
      </div>

    </div>
  );
}
