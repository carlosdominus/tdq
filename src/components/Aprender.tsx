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
      title: 'Tudo sobre a Pectina Cítrica',
      preview: 'O que é, onde encontrar e como preparar seu escudo em pó.',
      content: '• O QUE É:\nA Pectina Cítrica é uma fibra natural solúvel extraída da casca branca e polpa de frutas cítricas (como laranjas, limões e maçãs). Quando misturada à baba líquida do quiabo, ela age como um potente escudo biológico de suporte na corrente sanguínea, sequestrando novas micropartículas de plásticos domésticos que você ingere no dia a dia antes que elas consigam se alojar no tecido esponjoso da próstata.\n\n• ONDE ENCONTRAR / COMPRAR:\n1. Lojas de produtos naturais de bairro ou zonas cerealistas de sua cidade (procure por "Pectina Cítrica em pó pura" ou grau alimentício).\n2. Farmácias de manipulação física ou online.\n3. Sites de comércio eletrônico confiáveis (como Mercado Livre, Shopee ou Amazon).\n\n• COMO PREPARAR E TOMAR:\n1. Pegue 100ml a 150ml da baba de quiabo coada e limpa (preparada de véspera).\n2. Adicione 1 colher de chá rasa (cerca de 3g a 5g) de Pectina Cítrica em pó purificada em temperatura ambiente.\n3. Misture vigorosamente com uma colher por 30 a 60 segundos até homogeneizar por completo.\n4. Beba logo pela manhã em jejum. Dica: segure na boca por 30 segundos sob a língua para uma absorção sublingual direta antes de engolir.\n\n• ALTERNATIVA CASEIRA RÁPIDA:\nCaso não encontre a pectina em pó pura imediatamente, você pode espremer o suco fresco de 1 laranja média ou limão inteiro (que contêm alta concentração de pectina cítrica de forma natural) diretamente na baba de quiabo coada e beber em jejum.'
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
      content: 'P: Onde compro a Pectina Cítrica?\nR: Conforme explicado no guia acima, você a encontra em pó em lojas de produtos naturais físicas, cerealistas, farmácias de manipulação ou na internet (Mercado Livre, Shopee). Se não tiver, use suco de laranja/limão fresco como substituto imediato.\n\nP: Posso tomar mais de uma vez ao dia em jejum?\nR: Não se recomenda tomar duas doses. Respeite as orientações recomendadas para que a desobstrução e relaxamento muscular ocorram de forma equilibrada e gradual.\n\nP: Devo suspender as medicações prescritas?\nR: Nunca altere suas receitas médicas sem consulta. O quiabo é um alimento natural e complementa perfeitamente sua rotina sem efeitos colaterais nocivos.'
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
          As lições acima foram revisadas por nossa <strong>equipe de urologistas e especialistas em saúde integrativa</strong> e representam o estado da arte do protocolo prático do quiabo na desobstrução prostática natural.
        </p>
      </div>

    </div>
  );
}
