import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Clock, Smile, Sparkles, TrendingUp } from 'lucide-react';

export default function RightsCalculator() {
  const [ salárioBase, setSalárioBase ] = useState<number>(1915.48); // SINTEDORP floor
  const [ mesesTrabalhados, setMesesTrabalhados ] = useState<number>(12);
  const [ horasSemanais, setHorasSemanais ] = useState<number>(44);
  const [ horasExtras, setHorasExtras ] = useState<number>(0);
  
  // States of calculation result
  const [ activeTab, setActiveTab ] = useState<'decimo' | 'ferias' | 'hora'>('decimo');

  // Calculates 13º
  const decimoSalarioExtra = (salárioBase / 12) * mesesTrabalhados;
  
  // Calculates Férias (Salário base + 1/3)
  const feriasBrutas = (salárioBase / 12 * mesesTrabalhados);
  const terçoConstitucional = feriasBrutas / 3;
  const totalFerias = feriasBrutas + terçoConstitucional;

  // Calculates Hour Pay and Estimating Extra Hours
  const valorHoraPadrao = salárioBase / (horasSemanais * 5); // Simplistic legal factor is usually 220 hrs for 44h/week
  const divisorLegal = horasSemanais === 44 ? 220 : horasSemanais === 36 ? 180 : (horasSemanais * 5);
  const valorHoraComposta = salárioBase / divisorLegal;
  const valorHoraExtra = valorHoraComposta * 1.5; // Min 50%
  const totalHorasExtras = horasExtras * valorHoraExtra;

  return (
    <section id="calculadora" className="py-16 px-4 sm:px-6 bg-brand-charcoal text-white font-sans overflow-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-brand-orange text-xs font-bold uppercase tracking-wider self-center">
            <Calculator className="w-3.5 h-3.5" />
            <span>Ferramenta de Assistência</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-beige tracking-tight col-span-1">
            Simulador de Benefícios e Diretos
          </h2>
          <p className="text-sm text-gray-300">
            Fizemos este simulador para que você mesma possa estimar e conferir se os pagamentos das suas férias, 13º salário ou valor de horas extras estão corretos. É rápido, simples e totalmente confidencial!
          </p>
        </div>

        {/* Calculator Widget Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-3 max-w-5xl mx-auto w-full">
          
          {/* Inputs Section: 5 Cols */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 text-left shadow-lg backdrop-blur-xs">
            <h3 className="font-display font-bold text-lg text-brand-beige border-b border-white/10 pb-3">
              Insira os Seus Dados
            </h3>

            {/* Salary input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-brand-orange" />
                <span>Salário Bruto Mensal (R$)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400 text-sm font-semibold">R$</span>
                <input
                  type="number"
                  value={salárioBase}
                  onChange={(e) => setSalárioBase(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red outline-none text-base"
                />
              </div>
              <p className="text-[10px] text-gray-400">
                O piso salarial do SINTEDORP para a jornada padrão (44h semanais) é de R$ 1.915,48.
              </p>
            </div>

            {/* Worked months slider */}
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-orange" />
                  <span>Meses de Trabalho</span>
                </span>
                <span className="text-brand-orange font-mono text-sm">{mesesTrabalhados} {mesesTrabalhados === 1 ? 'mês' : 'meses'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={mesesTrabalhados}
                onChange={(e) => setMesesTrabalhados(parseInt(e.target.value))}
                className="w-full accent-brand-red bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-gray-400">
                Tempo trabalhado dentro do último ano ou desde a contratação.
              </p>
            </div>

            {/* Weekly working hours selection */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-orange" />
                <span>Carga Horária Semanal: {horasSemanais} horas</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[ 44, 30, 20 ].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => setHorasSemanais(hr)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      horasSemanais === hr
                        ? 'bg-brand-red border-brand-red text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {hr}h / sem
                  </button>
                ))}
              </div>
            </div>

            {/* Extras simulation inline */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <span>Horas Extras no Mês</span>
              </label>
              <input
                type="number"
                value={horasExtras}
                min="0"
                onChange={(e) => setHorasExtras(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Ex: 10 horas extras"
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold focus:outline-none text-sm focus:border-brand-red"
              />
            </div>

          </div>

          {/* Results Block: 7 Cols */}
          <div className="lg:col-span-7 bg-white text-brand-charcoal rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl relative text-left">
            
            {/* Calculation Tabs selector */}
            <div className="flex bg-brand-beige border border-gray-200 p-1.5 rounded-xl">
              {[
                { id: 'decimo', label: '13º Salário' },
                { id: 'ferias', label: 'Férias Proporcionais' },
                { id: 'hora', label: 'Valores por Hora' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer text-center ${
                    activeTab === tab.id
                      ? 'bg-white text-brand-charcoal shadow-sm'
                      : 'text-gray-500 hover:text-brand-charcoal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Outputs rendered based on states */}
            {activeTab === 'decimo' && (
              <div className="flex flex-col gap-5 flex-1 justify-between animate-fadeIn">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange">
                    Estatística do Décimo Terceiro Salário
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Proporcional aos {mesesTrabalhados} meses informados.
                  </p>
                  
                  <div className="mt-6 bg-brand-beige border border-gray-100 p-5 rounded-2xl">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">
                      VALOR ESTIMADO DO 13º BRUTO
                    </span>
                    <span className="text-3xl sm:text-4xl font-display font-black text-brand-red leading-none mt-1 inline-block">
                      R$ {decimoSalarioExtra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span>Proporcionais:</span>
                      <strong className="text-brand-charcoal">{mesesTrabalhados} / 12 avos</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span>1ª Parcela (Limites de Novembro):</span>
                      <strong className="text-brand-charcoal">R$ {(decimoSalarioExtra / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>2ª Parcela (Até 20/Dezembro):</span>
                      <strong className="text-brand-charcoal">R$ {(decimoSalarioExtra / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} *</strong>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">
                    * Nota: A segunda parcela sofre deduções legais de INSS de responsabilidade do empregador.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ferias' && (
              <div className="flex flex-col gap-5 flex-1 justify-between animate-fadeIn">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange">
                    Crédito Estimado para Férias
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Proporcional com bônus constitucional de um Terço (1/3).
                  </p>

                  <div className="mt-6 bg-brand-beige border border-gray-100 p-5 rounded-2xl">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">
                      TOTAL ESTIMADO DE FÉRIAS
                    </span>
                    <span className="text-3xl sm:text-4xl font-display font-black text-brand-red leading-none mt-1 inline-block">
                      R$ {totalFerias.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span>Férias Proporcionais Sêca:</span>
                      <strong className="text-brand-charcoal">R$ {feriasBrutas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span>Adicional de 1/3 Constitucional:</span>
                      <strong className="text-brand-charcoal text-green-600">+ R$ {terçoConstitucional.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hora' && (
              <div className="flex flex-col gap-5 flex-1 justify-between animate-fadeIn">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange">
                    Divisor Salarial e Cálculo de Extras
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Valores detalhados do preço de sua hora regular e adicional.
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-brand-beige border border-gray-100 p-4 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">
                        VALOR DA HORA COMUM
                      </span>
                      <span className="text-2xl font-display font-bold text-brand-charcoal block mt-1">
                        R$ {valorHoraComposta.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="bg-brand-beige border border-gray-100 p-4 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">
                        VALOR DA HORA EXTRA (+50%)
                      </span>
                      <span className="text-2xl font-display font-bold text-brand-red block mt-1">
                        R$ {valorHoraExtra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {horasExtras > 0 && (
                    <div className="mt-5 bg-orange-50 border border-brand-orange/20 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-brand-charcoal block">Adicional Exclussivo do Mês</span>
                        <span className="text-[10px] text-gray-400 block">{horasExtras} horas extras trabalhadas</span>
                      </div>
                      <span className="text-xl font-display font-black text-brand-orange">
                        + R$ {totalHorasExtras.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom help block */}
            <div className="mt-4 pt-4 border-t border-gray-100/60 flex items-center gap-3 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-brand-red shrink-0"></span>
              <span>Estes valores de referência são fictícios para simulação prévia e não excluem o cálculo pormenorizado feito pelos assessores técnicos do sindicato na sede.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
