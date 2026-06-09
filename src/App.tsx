/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, 
  BookOpen, 
  Activity,
  User,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Leaf,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Sub-components
import ProstateVisualizer from './components/ProstateVisualizer';
import SymptomChecker from './components/SymptomChecker';
import ProtocolGuide from './components/ProtocolGuide';
import UserProfile from './components/UserProfile';
import Aprender from './components/Aprender';

import { SymptomScore, ProgressEntry } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'protocolo' | 'aprender' | 'perfil' | 'sintomas' | 'vpower'>('home');
  const [showUpsell, setShowUpsell] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [dayCounter, setDayCounter] = useState(14);
  const [lastNightsData, setLastNightsData] = useState<ProgressEntry[]>([]);

  // System listener to sync stats instantly when user completes step or updates name
  const syncLocalStorageData = () => {
    const name = localStorage.getItem('mpa_user_name');
    if (name) {
      setUserName(name);
      setIsOnboarded(true);
    } else {
      setIsOnboarded(false);
    }

    // Days counter based on start date
    const storedDate = localStorage.getItem('mpa_start_date');
    if (storedDate) {
      const diffTime = Math.abs(Date.now() - new Date(storedDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDayCounter(diffDays || 1);
    } else {
      setDayCounter(14); // Default to simulated day 14 progress bar
    }

    // Check if protocol done today
    const completedDays: string[] = JSON.parse(localStorage.getItem('mpa_protocol_log') || '[]');
    const todayStr = new Date().toISOString().split('T')[0];
    setIsCompletedToday(completedDays.includes(todayStr));

    // Pull last nights tracking log data from local storage
    const storedLogs = localStorage.getItem('mpa_progress_log');
    if (storedLogs) {
      const logs: ProgressEntry[] = JSON.parse(storedLogs);
      setLastNightsData(logs.slice(-5)); // Get latest 5 nights
    } else {
      // Seed nice default mock logs for presentation
      const defaultLogs: ProgressEntry[] = [
        { date: '28/05', wakeUps: 3, streamStrength: 3, sleepQuality: 'Regular' },
        { date: '29/05', wakeUps: 3, streamStrength: 3, sleepQuality: 'Bem' },
        { date: '30/05', wakeUps: 2, streamStrength: 4, sleepQuality: 'Bem' },
        { date: '31/05', wakeUps: 1, streamStrength: 5, sleepQuality: 'Bem' }
      ];
      setLastNightsData(defaultLogs);
    }
  };

  useEffect(() => {
    syncLocalStorageData();

    // Listen to parent storage updates
    window.addEventListener('storage', syncLocalStorageData);
    return () => {
      window.removeEventListener('storage', syncLocalStorageData);
    };
  }, []);

  useEffect(() => {
    if (isOnboarded) {
      const upsellShown = localStorage.getItem('mpa_upsell_shown');
      if (!upsellShown) {
        setShowUpsell(true);
      }
    }
  }, [isOnboarded]);

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      const cleanName = nameInput.trim();
      localStorage.setItem('mpa_user_name', cleanName);
      localStorage.setItem('mpa_start_date', new Date().toISOString());
      
      // Default initial daily log seeds
      const initialLogs: ProgressEntry[] = [
        { date: 'Ontem', wakeUps: 3, streamStrength: 2, sleepQuality: 'Regular' }
      ];
      localStorage.setItem('mpa_progress_log', JSON.stringify(initialLogs));

      setUserName(cleanName);
      setIsOnboarded(true);
      setActiveTab('home');
      syncLocalStorageData();
    }
  };

  // Rotate expert quotes on Home Tab
  const getMotivationalMessage = (day: number) => {
    if (day <= 6) return "O composto biológico já começou a purificar seu organismo. Mantenha a consistência.";
    if (day <= 13) return "🏆 Uma semana completa! Seu fluxo urinário começa a ganhar mais estabilidade agora.";
    if (day <= 20) return "Duas semanas consecutivas. Você está desobstruindo as ranhuras do tecido.";
    if (day <= 29) return "Foco total: O pico de absorção da uretra entra em ação máxima esta semana.";
    if (day <= 59) return "🏆 Um mês vencido de proteção! Acordar livre de ardência no meio da noite é seu novo normal.";
    if (day <= 89) return "Dois meses de limpeza de microplásticos. Você recuperou seu bem-estar completo.";
    return "🏆 90 dias completos! Sua próstata voltou ao tamanho ideal original. Excelente jornada!";
  };

  // Onboarding Screen Rendering (If userName not set yet)
  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center font-sans px-4 py-8" id="onboarding-root">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 text-center">
          
          <div className="inline-flex bg-[#EAF3FB] p-4 rounded-2xl text-5xl mb-4 select-none">
            🌿
          </div>

          <h2 className="text-3xl font-black text-[#1A1A2E] tracking-tight mb-2 font-heading leading-tight">
            Meu ProstaApp
          </h2>
          <p className="text-[15px] font-semibold text-[#555B6E] leading-relaxed mb-6 max-w-xs mx-auto">
            Por favor, nos informe seu nome para que o aplicativo possa personalizar o seu protocolo de desobstrução prostática.
          </p>

          <form onSubmit={handleOnboardingSubmit} className="space-y-4">
            <div className="text-left">
              <label htmlFor="user-onboard-name" className="block text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
                Qual o seu primeiro nome?
              </label>
              <input
                id="user-onboard-name"
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ex primeiramente: João Antônio"
                className="w-full h-14 px-4 border-2 border-slate-200 rounded-2xl text-[16px] font-bold text-[#1A1A2E] placeholder-slate-400 focus:outline-none focus:border-[#2A7FD4] bg-[#F4F6F9]/40 transition-colors"
                maxLength={18}
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-[#1A3F8B] hover:bg-[#153472] text-white font-black text-[17px] uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              Começar Meu Protocolo →
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-[#555B6E] font-bold">
            <span className="text-[#3DAA5C]">🔐</span> Acesso 100% vitalício e seguro no portal
          </div>
        </div>
      </div>
    );
  }

  // Circular progress math
  const progressPercent = Math.min(100, (dayCounter / 90) * 100);
  const circleRadius = 50;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col font-sans text-slate-800 transition-all pb-24" id="app-root-demographics">
      {/* Top Header Navigation Panel */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EAF3FB] flex items-center justify-center font-bold text-lg text-[#1A3F8B] select-none shadow-sm">
              🌿
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-[#1A1A2E] text-base leading-none tracking-tight">Meu ProstaApp</span>
              <span className="text-[10px] text-[#3DAA5C] font-black uppercase tracking-wider font-mono mt-1">
                ✦ Protocolo do Quiabo
              </span>
            </div>
          </button>

          {/* Profile Bubble on top as requested: "perfil, tira do menu inferior e põe uma bolinha la em cima" */}
          <button 
            onClick={() => setActiveTab('perfil')}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
              activeTab === 'perfil' 
                ? 'border-[#2A7FD4] bg-[#EAF3FB] text-[#1A3F8B] scale-105 shadow-sm' 
                : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
            title="Seu Perfil, Progresso e Suporte"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Panel Content centered viewport */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
        
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-module"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-5"
            >
              {/* Daily greeting and focus summary */}
              <div className="text-left pb-1">
                <span className="text-[#555B6E] text-sm font-extrabold font-sans uppercase tracking-wider">Seja bem-vindo de volta</span>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Olá, {userName}!</h2>
                <p className="text-sm text-[#555B6E] font-semibold mt-0.5">Seu objetivo de hoje: Limpar toxinas e desinflamar.</p>
              </div>

              {/* Progress Ring Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#2A7FD4] font-mono">
                  Seu Progresso de Conservação
                </span>
                
                {/* SVG Circular Ring */}
                <div className="relative w-40 h-40 my-4 flex items-center justify-center">
                  <svg width="150" height="150" viewBox="0 0 120 120" className="transform -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r={circleRadius}
                      className="text-slate-100 stroke-current"
                      strokeWidth="11"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r={circleRadius}
                      className="text-[#1A3F8B] stroke-current"
                      strokeWidth="11"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#1A1A2E] leading-none font-mono">
                      {dayCounter}
                    </span>
                    <span className="text-[11px] text-[#555B6E] font-bold mt-1 uppercase tracking-wider">
                      de 90 dias
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#555B6E] leading-relaxed font-semibold italic max-w-xs px-2">
                  "{getMotivationalMessage(dayCounter)}"
                </p>
              </div>

              {/* Huge Quick Action Button section */}
              <div>
                {!isCompletedToday ? (
                  <button
                    onClick={() => setActiveTab('protocolo')}
                    style={{ minHeight: '64px' }}
                    className="w-full bg-[#3DAA5C] hover:bg-[#338e4b] text-white font-black text-xl uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-b-4 border-[#2c7942]"
                  >
                    🥬 Fazer o Protocolo Hoje →
                  </button>
                ) : (
                  <div className="w-full bg-[#E8F5EE] border-2 border-[#3DAA5C]/20 p-5 rounded-2xl text-center select-none shadow-sm">
                    <div className="w-10 h-10 bg-[#3DAA5C] text-white font-black rounded-full flex items-center justify-center text-lg mx-auto mb-2 shadow-sm">
                      ✓
                    </div>
                    <span className="block font-black text-emerald-800 text-lg uppercase tracking-wide">
                      Protocolo Feito hoje!
                    </span>
                    <span className="block text-xs text-[#3DAA5C] font-semibold mt-1">
                      Excelente disciplina. Até amanhã cedo em jejum!
                    </span>
                  </div>
                )}
              </div>

              {/* "Últimas noites" visualizer block */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-left">
                <span className="block text-xs font-black text-slate-400 uppercase tracking-wider font-mono mb-2.5">
                  Últimas Noites Acordando
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {lastNightsData.map((log, index) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center flex flex-col items-center">
                      <span className="text-xs text-[#555B6E] font-bold font-mono">{log.date}</span>
                      <strong className="text-[#1A3F8B] text-lg font-black font-mono block mt-1">
                        {log.wakeUps}x
                      </strong>
                      <span className="text-[9px] text-[#555B6E] uppercase font-bold mt-0.5">vezes</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-[#555B6E] font-semibold flex items-center gap-1 flex-wrap justify-between">
                  <span>*Os dados são alimentados pelo formulário no seu <strong>Perfil</strong></span>
                  <button 
                    onClick={() => setActiveTab('perfil')}
                    className="text-[#2A7FD4] underline font-bold"
                  >
                    Registrar hoje
                  </button>
                </div>
              </div>

              {/* Prostate Visualizer Simulator Card embedded on Home tab for senior motivation! */}
              <div className="pt-2">
                <ProstateVisualizer />
              </div>

              {/* IPSS Quick Diagnosis Check entry inside Home */}
              <div className="bg-[#EAF3FB] p-5 rounded-3xl border border-[#2A7FD4]/10 text-left flex items-start gap-3.5">
                <span className="text-3xl select-none">📋</span>
                <div>
                  <h4 className="font-extrabold text-[#1A3F8B] text-base">Teste Clínico de Graus (IPSS)</h4>
                  <p className="text-xs text-[#555B6E] leading-relaxed mt-1 font-semibold">
                    Caso sinta que seu quadro urinário mudou, refaça o nosso formulário IPSS para recalcular o diâmetro prostático teórico.
                  </p>
                  <button
                    onClick={() => setActiveTab('sintomas')}
                    className="text-xs text-[#1A3F8B] font-black uppercase tracking-wider flex items-center mt-2.5 gap-1 select-none cursor-pointer hover:underline"
                  >
                    Iniciar Teste Completo <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'protocolo' && (
            <motion.div
              key="protocol-module"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ProtocolGuide />
            </motion.div>
          )}

          {activeTab === 'aprender' && (
            <motion.div
              key="learn-module"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Aprender />
            </motion.div>
          )}

          {activeTab === 'perfil' && (
            <motion.div
              key="profile-module"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <UserProfile />
            </motion.div>
          )}

          {activeTab === 'sintomas' && (
            <motion.div
              key="sintomas-module"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <SymptomChecker onScoreCalculated={() => {}} />
            </motion.div>
          )}

          {activeTab === 'vpower' && (
            <motion.div
              key="vpower-module"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="-mx-4 -my-5 h-[calc(100vh-120px)] flex flex-col overflow-hidden"
              id="vpower-iframe-container"
            >
              <iframe
                src="https://tudoprahoje.site/tdq/vpower/menu-inferior/"
                className="w-full h-full border-none flex-1 bg-white"
                title="V-Power"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Primary Bottom Navigation - 4 Simple tabs for senior citizens */}
      <footer className="bg-white border-t border-slate-200 py-3 fixed bottom-0 left-0 right-0 z-40 shadow-xl block">
        <div className="max-w-md mx-auto px-4 flex justify-between gap-1 text-center select-none">
          
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center flex-1 cursor-pointer transition-all ${
              activeTab === 'home' ? 'text-[#1A3F8B] scale-105 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <Activity className="w-6 h-6 stroke-[2.3]" />
            <span className="text-[12px] mt-1">Início</span>
          </button>

          <button
            onClick={() => setActiveTab('protocolo')}
            className={`flex flex-col items-center flex-1 cursor-pointer transition-all ${
              activeTab === 'protocolo' ? 'text-[#1A3F8B] scale-105 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <Leaf className="w-6 h-6 stroke-[2.3]" />
            <span className="text-[12px] mt-1 font-bold">Protocolo</span>
          </button>

          <button
            onClick={() => setActiveTab('aprender')}
            className={`flex flex-col items-center flex-1 cursor-pointer transition-all ${
              activeTab === 'aprender' ? 'text-[#1A3F8B] scale-105 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <BookOpen className="w-6 h-6 stroke-[2.3]" />
            <span className="text-[12px] mt-1 font-bold">Aprender</span>
          </button>

          <button
            onClick={() => setActiveTab('vpower')}
            className={`flex flex-col items-center flex-1 cursor-pointer transition-all ${
              activeTab === 'vpower' ? 'text-amber-600 scale-105 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
            id="vpower-nav-tab"
          >
            <Sparkles className={`w-6 h-6 stroke-[2.3] ${activeTab === 'vpower' ? 'fill-amber-400 stroke-amber-600 text-amber-600' : ''}`} />
            <span className="text-[12px] mt-1 font-bold">V-Power</span>
          </button>

        </div>
      </footer>

      {/* Upsell First Access Overlay */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex flex-col" id="upsell-modal-container">
          <button
            onClick={() => {
              localStorage.setItem('mpa_upsell_shown', 'true');
              setShowUpsell(false);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold cursor-pointer w-12 h-12 flex items-center justify-center rounded-full z-[10000] select-none hover:bg-white/10 transition-colors focus:outline-none"
            id="close-upsell-btn"
            aria-label="Fechar"
            style={{ textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}
          >
            ✕
          </button>
          <iframe
            src="https://tudoprahoje.site/tdq/vpower/front"
            className="w-full h-full border-none flex-1"
            title="Acesso V-Power"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
}
