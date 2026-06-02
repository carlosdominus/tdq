/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  User, 
  Trash2, 
  TrendingUp, 
  Check, 
  Plus, 
  Minus, 
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ProgressEntry } from '../types';

type ProfileScreen = 'menu' | 'nome' | 'registrar' | 'graficos' | 'garantia';

export default function UserProfile() {
  const [userName, setUserName] = useState<string>('');
  const [nameInput, setNameInput] = useState('');
  const [currentScreen, setCurrentScreen] = useState<ProfileScreen>('menu');

  // Daily log state for "Registrar Hoje"
  const [wakeUps, setWakeUps] = useState<number>(2);
  const [streamStrength, setStreamStrength] = useState<number>(3); // 1 = Muito Fraco, 5 = Muito Forte
  const [sleepQuality, setSleepQuality] = useState<'Mal' | 'Regular' | 'Bem'>('Regular');
  const [logNotes, setLogNotes] = useState('');
  const [showStatusSuccess, setShowStatusSuccess] = useState(false);

  // Loaded logs state
  const [progressLogs, setProgressLogs] = useState<ProgressEntry[]>([]);

  useEffect(() => {
    // Load local storage values
    const storedName = localStorage.getItem('mpa_user_name') || 'Membro';
    setUserName(storedName);
    setNameInput(storedName);

    // Initial logs simulation
    const storedLogs = localStorage.getItem('mpa_progress_log');
    if (storedLogs) {
      setProgressLogs(JSON.parse(storedLogs));
    } else {
      const dummyData: ProgressEntry[] = [
        { date: '25/05', wakeUps: 5, streamStrength: 1, sleepQuality: 'Mal' },
        { date: '26/05', wakeUps: 4, streamStrength: 2, sleepQuality: 'Regular' },
        { date: '27/05', wakeUps: 4, streamStrength: 2, sleepQuality: 'Regular' },
        { date: '28/05', wakeUps: 3, streamStrength: 3, sleepQuality: 'Regular' },
        { date: '29/05', wakeUps: 3, streamStrength: 3, sleepQuality: 'Bem' },
        { date: '30/05', wakeUps: 2, streamStrength: 4, sleepQuality: 'Bem' },
        { date: '31/05', wakeUps: 1, streamStrength: 5, sleepQuality: 'Bem' }
      ];
      localStorage.setItem('mpa_progress_log', JSON.stringify(dummyData));
      setProgressLogs(dummyData);
    }
  }, []);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      localStorage.setItem('mpa_user_name', nameInput.trim());
      setUserName(nameInput.trim());
      // Trigger a reload dispatch for header component
      window.dispatchEvent(new Event('storage'));
      setCurrentScreen('menu');
    }
  };

  const handleSaveDailyLog = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const newEntry: ProgressEntry = {
      date: formattedDate,
      wakeUps,
      streamStrength,
      sleepQuality,
      notes: logNotes.trim() ? logNotes.trim() : undefined
    };

    const updated = progressLogs.filter(item => item.date !== formattedDate);
    const finalLogs = [...updated, newEntry].slice(-10); // Keep last 10 entries for cleaner chart

    localStorage.setItem('mpa_progress_log', JSON.stringify(finalLogs));
    setProgressLogs(finalLogs);
    setShowStatusSuccess(true);
    setLogNotes('');

    // Trigger instant reload on the home tab
    window.dispatchEvent(new Event('storage'));

    // Return to menu or show success, let's keep success message visible and then go back
    setTimeout(() => {
      setShowStatusSuccess(false);
      setCurrentScreen('menu');
    }, 2500);
  };

  const clearAllLogs = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o seu histórico de progresso?')) {
      localStorage.removeItem('mpa_progress_log');
      setProgressLogs([]);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const testWhatsAppSupport = () => {
    const waLink = "https://wa.me/5511999999999?text=" + encodeURIComponent("Olá! Sou aluno do Meu ProstaApp e gostaria de tirar uma dúvida sobre o protocolo do quiabo.");
    window.open(waLink, '_blank');
  };

  const maxWakeUps = Math.max(...progressLogs.map(l => l.wakeUps), 5);

  // Render simple back-to-menu header helper
  const BackHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-8">
      <button
        onClick={() => setCurrentScreen('menu')}
        className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        title="Voltar ao Menu Principal"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
      </button>
      <div>
        <h4 className="font-black text-[#1A1A2E] text-2xl tracking-tight text-left leading-none">{title}</h4>
        <span className="text-xs text-[#555B6E] font-bold uppercase tracking-wider block mt-1 text-left">Painel do Aluno</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-8 max-w-xl mx-auto text-left" id="user-profile-subsystem">
      
      {/* 1. MAIN MENU SCREEN */}
      {currentScreen === 'menu' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Identity Panel */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EAF3FB] border-2 border-[#2A7FD4]/20 flex items-center justify-center text-3xl font-black text-[#1A3F8B] select-none shrink-0 shadow-sm">
                👨🏼‍⚕️
              </div>
              <div className="text-left">
                <span className="text-[11px] font-black text-[#2A7FD4] uppercase tracking-wider block">Aluno Afiliado</span>
                <h3 className="font-extrabold text-slate-900 text-2xl tracking-tight leading-none mt-1">
                  {userName}
                </h3>
                <p className="text-xs text-[#555B6E] font-extrabold mt-1.5">
                  Dia {Math.max(1, Math.round((Date.now() - new Date(localStorage.getItem('mpa_start_date') || Date.now()).getTime()) / (1000 * 60 * 60 * 24)))} no Protocolo
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-[#E8F5EE] text-[#3DAA5C] px-3.5 py-1.5 font-sans rounded-full text-xs font-black shadow-sm shrink-0 border border-[#3DAA5C]/10 select-none">
              Acesso Ativo ✓
            </div>
          </div>

          {/* List of separate sections - Spaced beautifully */}
          <div className="space-y-4">
            <span className="block text-xs uppercase font-extrabold text-[#555B6E] tracking-wider text-left mb-1">
              Selecione o serviço para acessar:
            </span>

            {/* Item 1: Registrar Hoje */}
            <button
              onClick={() => setCurrentScreen('registrar')}
              className="w-full text-left p-5 hover:bg-slate-50 border-2 border-slate-150 hover:border-[#2A7FD4] rounded-2xl transition-all shadow-sm flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EAF3FB] text-[#1A3F8B] flex items-center justify-center text-xl shrink-0">
                  📝
                </div>
                <div>
                  <h4 className="font-black text-[#1A1A2E] text-lg leading-tight">Registrar Meu Dia</h4>
                  <p className="text-xs text-[#555B6E] font-semibold mt-1">Salvar as idas ao banheiro e força de ontem</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1A3F8B] group-hover:translate-x-1 transition-all shrink-0" />
            </button>

            {/* Item 2: Ver Minha Evolução */}
            <button
              onClick={() => setCurrentScreen('graficos')}
              className="w-full text-left p-5 hover:bg-slate-50 border-2 border-slate-150 hover:border-[#2A7FD4] rounded-2xl transition-all shadow-sm flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl shrink-0">
                  📈
                </div>
                <div>
                  <h4 className="font-black text-[#1A1A2E] text-lg leading-tight">Mapeamento & Evolução</h4>
                  <p className="text-xs text-[#555B6E] font-semibold mt-1">Ver gráficos de descalcificação e melhoras</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all shrink-0" />
            </button>

            {/* Item 4: Garantia Blindada */}
            <button
              onClick={() => setCurrentScreen('garantia')}
              className="w-full text-left p-5 hover:bg-slate-50 border-2 border-slate-150 hover:border-[#2A7FD4] rounded-2xl transition-all shadow-sm flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl shrink-0">
                  🛡️
                </div>
                <div>
                  <h4 className="font-black text-[#1A1A2E] text-lg leading-tight">Garantia Blindada de 60 Dias</h4>
                  <p className="text-xs text-[#555B6E] font-semibold mt-1">Investimento 100% protegido e política</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all shrink-0" />
            </button>

            {/* Item 5: Alterar Nome */}
            <button
              onClick={() => setCurrentScreen('nome')}
              className="w-full text-left p-5 hover:bg-slate-50 border-2 border-slate-150 hover:border-[#2A7FD4] rounded-2xl transition-all shadow-sm flex items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center text-xl shrink-0">
                  👤
                </div>
                <div>
                  <h4 className="font-black text-[#1A1A2E] text-lg leading-tight">Alterar Meu Nome</h4>
                  <p className="text-xs text-[#555B6E] font-semibold mt-1">Trocar o nome de exibição no aplicativo</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          </div>

          <p className="text-[11px] text-[#555B6E] text-center font-semibold italic">
            Meu ProstaApp • Todos os direitos reservados.
          </p>
        </div>
      )}

      {/* 2. REGISTRAR DIA SCREEN */}
      {currentScreen === 'registrar' && (
        <div className="animate-fadeIn space-y-8">
          <BackHeader title="Registrar Seu Dia" />

          <p className="text-md leading-relaxed text-[#555B6E] font-semibold text-left">
            Insira os dados referentes ao seu comportamento urinário de ontem para atualizar seus dados e incentivar a desobstrução.
          </p>

          <form onSubmit={handleSaveDailyLog} className="space-y-8 text-left">
            
            {/* Step Question 1 */}
            <div className="space-y-3">
              <label className="block text-slate-950 font-black text-[17px] leading-snug">
                1. Quantas vezes levantou para urinar ontem à noite?
              </label>
              <div className="flex items-center gap-5 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 w-fit">
                <button
                  type="button"
                  onClick={() => setWakeUps(prev => Math.max(0, prev - 1))}
                  className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 font-extrabold border border-slate-200 text-slate-800 text-xl flex items-center justify-center cursor-pointer select-none active:scale-95 transition-all"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>
                <span className="w-12 text-center font-black text-[#1A3F8B] text-2xl font-mono select-none">
                  {wakeUps}
                </span>
                <button
                  type="button"
                  onClick={() => setWakeUps(prev => Math.min(10, prev + 1))}
                  className="w-12 h-12 rounded-xl bg-white hover:bg-slate-100 font-extrabold border border-slate-200 text-slate-800 text-xl flex items-center justify-center cursor-pointer select-none active:scale-95 transition-all"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
                <span className="text-sm text-[#555B6E] font-extrabold pr-4 select-none">vezes</span>
              </div>
            </div>

            {/* Step Question 2 */}
            <div className="space-y-3">
              <label className="block text-slate-950 font-black text-[17px] leading-snug">
                2. Como estava a força do jato urinário?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((strength) => {
                  return (
                    <button
                      key={strength}
                      type="button"
                      onClick={() => setStreamStrength(strength)}
                      className={`py-5 rounded-2xl border-2 text-center font-extrabold text-lg transition-all cursor-pointer flex flex-col items-center justify-center active:scale-95 ${
                        streamStrength === strength
                          ? 'bg-[#1A3F8B] border-[#1A3F8B] text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350 bg-slate-50/20'
                      }`}
                    >
                      <span className="text-xl font-black">{strength}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider mt-1 scale-90">
                        {strength === 1 ? 'Fraco' : strength === 3 ? 'Médio' : strength === 5 ? 'Forte' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Question 3 */}
            <div className="space-y-3">
              <label className="block text-slate-950 font-black text-[17px] leading-snug">
                3. Como você dormiu ontem à noite?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Mal', 'Regular', 'Bem'] as const).map((quality) => (
                  <button
                    key={quality}
                    type="button"
                    onClick={() => setSleepQuality(quality)}
                    className={`py-5 rounded-2xl border-2 text-center font-black text-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                      sleepQuality === quality
                        ? 'bg-[#3DAA5C] border-[#3DAA5C] text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350 bg-slate-50/20'
                    }`}
                  >
                    <span className="text-xl select-none">
                      {quality === 'Mal' ? '😴' : quality === 'Regular' ? '😐' : '😊'}
                    </span>
                    <span>{quality}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional text fields - High Spacing */}
            <div className="space-y-2">
              <label className="block text-slate-950 font-black text-[17px] leading-snug">
                Alguma anotação sobre os sintomas? (Opcional)
              </label>
              <textarea
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="Exemplo: Notei menos ardência, jato bem mais farto e contínuo..."
                className="w-full min-h-[100px] p-4 border border-slate-250 rounded-2xl bg-white text-[15px] focus:outline-none focus:border-[#2A7FD4] placeholder-slate-400 font-medium"
                maxLength={100}
              />
            </div>

            {/* Big Action Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-16 bg-[#3DAA5C] hover:bg-[#328e4b] text-white font-black text-xl uppercase tracking-wider rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5 border-b-4 border-[#246b38]"
              >
                <Check className="w-5 h-5 stroke-[3]" /> Salvar Registro Diário
              </button>
            </div>

            {showStatusSuccess && (
              <div className="p-4 bg-[#E8F5EE] border-2 border-[#3DAA5C]/20 text-[#3DAA5C] text-sm font-black rounded-2xl text-center select-none animate-pulse">
                ✓ Registro gravado com sucesso! Redirecionando...
              </div>
            )}
          </form>
        </div>
      )}

      {/* 3. EVOLUTION GRAPHS SCREEN */}
      {currentScreen === 'graficos' && (
        <div className="animate-fadeIn space-y-8">
          <BackHeader title="Minha Evolução Urinária" />

          <p className="text-md leading-relaxed text-[#555B6E] font-semibold text-left">
            Veja abaixo o mapeamento dia após dia. A diminuição do número de vezes acordando e o fortalecimento do fluxo são indicativos clínicos diretos de descompressão da uretra.
          </p>

          {progressLogs.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-[#555B6E] text-md font-bold">
              Nenhum dado registrado ainda. Acesse "Registrar Diário" no menu anterior para começar seu gráfico.
            </div>
          ) : (
            <div className="space-y-8 text-left">
              
              {/* Graphic 1 */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-extrabold text-[#1A1A2E] uppercase tracking-wider">
                    💤 Idas ao banheiro à Noite (Ideal: Menor)
                  </span>
                  <span className="text-xs text-indigo-800 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full font-bold select-none">Foco Clínico</span>
                </div>

                <div className="w-full h-28 flex items-end justify-between px-2 pt-6 relative border-b border-slate-350">
                  <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-slate-200"></div>
                  <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-slate-200"></div>
                  <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-slate-200"></div>

                  {progressLogs.map((log, index) => {
                    const percentage = Math.max(8, (log.wakeUps / maxWakeUps) * 90);
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                        <span className="text-[11px] font-black text-[#1A3F8B] font-mono mb-1.5 bg-white px-2 py-0.5 rounded border border-slate-100 shadow-sm opacity-90">
                          {log.wakeUps}x
                        </span>
                        <div className="w-7 bg-gradient-to-t from-[#2A7FD4] to-[#1A3F8B] rounded-t-md" style={{ height: `${percentage}px` }} />
                        <span className="text-[10px] font-black text-[#555B6E] mt-2 font-mono">
                          {log.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Graphic 2 */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-extrabold text-[#1A1A2E] uppercase tracking-wider">
                    ⚡ Intensidade do Jato Urinário (Normal: 5)
                  </span>
                  <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold select-none">Recuperação</span>
                </div>

                <div className="w-full h-28 flex items-end justify-between px-2 pt-6 relative border-b border-slate-350">
                  <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-slate-200"></div>
                  <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-slate-200"></div>
                  <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-slate-200"></div>

                  {progressLogs.map((log, index) => {
                    const percentage = (log.streamStrength / 5) * 85;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                        <span className="text-[11px] font-black text-[#3DAA5C] font-mono mb-1.5 bg-white px-1.5 py-0.5 rounded border border-slate-100 shadow-sm opacity-90">
                          F{log.streamStrength}
                        </span>
                        <div className="w-7 bg-gradient-to-t from-[#E8F5EE] to-[#3DAA5C] rounded-t-md" style={{ height: `${percentage}px` }} />
                        <span className="text-[10px] font-black text-[#555B6E] mt-2 font-mono">
                          {log.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Journal Notes (Detailed representation) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h5 className="text-[14px] font-black text-[#1A1A2E] uppercase tracking-wide">Suas anotações no Diário:</h5>
                <div className="space-y-3">
                  {progressLogs.slice().reverse().filter(l => l.notes).map((log, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs">
                      <div className="flex justify-between items-center text-xs text-[#555B6E] font-bold mb-2">
                        <span>📅 Data: {log.date}</span>
                        <span className="text-emerald-700 bg-white border border-slate-100 px-2 py-0.5 rounded-lg select-none">Fluxo {log.streamStrength}/5</span>
                      </div>
                      <p className="text-slate-805 text-sm font-semibold text-slate-800 leading-relaxed italic">"{log.notes}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trash options */}
              <div className="pt-6 text-center">
                <button
                  onClick={clearAllLogs}
                  className="text-xs text-red-500 hover:text-red-700 font-extrabold flex items-center justify-center gap-1.5 mx-auto underline transition-all active:scale-95 bg-red-50/50 hover:bg-red-50 px-4 py-2.5 rounded-xl border border-dashed border-red-250"
                  title="Apagar Histórico"
                >
                  <Trash2 className="w-4 h-4" /> Apagar Todo Histórico do Gráfico
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* 5. GARANTIA BLINDADA 60 DIAS */}
      {currentScreen === 'garantia' && (
        <div className="animate-fadeIn space-y-8 text-left">
          <BackHeader title="Nossa Garantia Legal" />

          <div className="space-y-6">
            <div className="bg-[#EAF3FB]/60 p-6 rounded-2xl border border-[#2A7FD4]/20 space-y-4">
              <h4 className="font-black text-[#1A3F8B] text-xl flex items-center gap-2">
                🛡️ Proteção de Compra de 60 Dias
              </h4>
              <p className="text-[15px] text-[#555B6E] leading-relaxed font-bold">
                A metodologia científica do Dr. Haroldo e o uso regulamentar do <strong>Meu ProstaApp</strong> são amparados por uma garantia integral incondicional de 2 meses.
              </p>
              
              <div className="p-4 bg-white rounded-xl border border-[#2A7FD4]/10 text-sm text-slate-600 space-y-3 leading-relaxed font-semibold">
                <p>
                  <strong>Como requerer seu reembolso de aluno?</strong>
                  <br />
                  Se você aplicar o protocolo do quiabo em jejum com coagem e pectina pelo período estipulado de até 60 dias e não visualizar melhoras perceptíveis na desobstrução, basta nos alertar pelo e-mail:
                </p>
                <div className="text-center font-bold font-mono text-base border-b-2 border-indigo-100 py-1 select-all text-[#1A3F8B]">
                  contato@dominus.site
                </div>
                <p>
                  Efetuaremos a devolução de dobras de cada centavo sem questionamentos cansativos. Confiamos integralmente em nosso suporte e conduta.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 select-none">
              <Award className="w-12 h-12 text-amber-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider font-mono">Homologação Oficial</span>
                <span className="block text-sm text-[#1A1A2E] font-black mt-0.5">Certificado de Autenticidade Dominus #863D7-DB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. EDITAR NOME SCREEN */}
      {currentScreen === 'nome' && (
        <div className="animate-fadeIn space-y-8 text-left">
          <BackHeader title="Alterar Meu Nome" />

          <div className="space-y-6">
            <p className="text-md leading-relaxed text-[#555B6E] font-semibold">
              Digite seu primeiro nome abaixo. Isso ajustará a forma com que Dr. Haroldo guiará seus relatórios e saudações integradas.
            </p>

            <div className="space-y-2">
              <label htmlFor="edit-profile-name-input" className="block text-xs uppercase font-extrabold text-[#555B6E] tracking-wider font-sans">
                Seu Nome de Aluno:
              </label>
              <input
                id="edit-profile-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full h-14 px-4 border-2 border-slate-200 focus:border-[#2A7FD4] rounded-2xl text-lg font-bold text-[#1A1A2E] bg-white focus:outline-none"
                maxLength={18}
                placeholder="Ex primeiramente: João Antônio"
              />
            </div>

            <button
              onClick={handleSaveName}
              className="w-full h-16 bg-[#1A3F8B] hover:bg-opacity-95 text-white font-black text-lg uppercase tracking-wider rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border-b-4 border-indigo-950"
            >
              <Check className="w-5 h-5" /> Salvar Nome Atualizado
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
