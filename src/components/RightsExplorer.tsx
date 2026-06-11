import React, { useState } from 'react';
import { 
  Sun, Award, FileCheck, Clock, TrendingUp, Bus, HeartPulse, Moon, 
  ChevronRight, AlertCircle, BookOpen, Search
} from 'lucide-react';
import { RIGHTS_BENEFITS, FAQ_ITEMS } from '../data';
import { RightBenefit } from '../types';

// Strict Icon component mapping to avoid direct string indexing failures
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Sun,
  Award,
  FileCheck,
  Clock,
  TrendingUp,
  Bus,
  HeartPulse,
  Moon
};

export default function RightsExplorer() {
  const [selectedRight, setSelectedRight] = useState<RightBenefit>(RIGHTS_BENEFITS[0]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [faqSearch, setFaqSearch] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(faq => 
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section id="direitos" className="py-16 px-4 sm:px-6 bg-white font-sans text-brand-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-beige text-brand-charcoal border border-gray-200 rounded-full text-xs font-semibold uppercase tracking-wider self-center">
            <BookOpen className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>PEC das Domésticas Atualizada</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-charcoal tracking-tight">
            Guia Completo de Direitos Fundamentais
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Você sabia que a PEC das Domésticas igualou os seus direitos aos de todos os trabalhadores sob a CLT? Aqui no SINTEDORP, garantimos que cada uma destas cláusulas seja respeitada pelo seu empregador.
          </p>
        </div>

        {/* Rights Selector and Detail Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* Rights Left Navigation Tree: 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-1 block text-left">
              Cláusulas de Proteção Trabalhista
            </span>
            
            {RIGHTS_BENEFITS.map((right) => {
              const IconComponent = IconMap[right.iconName] || FileCheck;
              const isSelected = selectedRight.id === right.id;
              
              return (
                <button
                  key={right.id}
                  onClick={() => setSelectedRight(right)}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-beige border-brand-red text-brand-charcoal font-semibold shadow-md translate-x-1'
                      : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold block">{right.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{right.description}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                    isSelected ? 'translate-x-1 text-brand-red' : ''
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Display Panel: 7 columns */}
          <div className="lg:col-span-7 bg-brand-beige/50 border border-gray-200/60 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl -z-10"></div>
            
            {/* Header of Detail */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-gray-200">
              <div>
                <span className="text-xs font-mono font-bold text-brand-orange bg-orange-50 px-2 py-1 rounded">
                  Amparo Legal: {selectedRight.lawReference || 'CLT Federal'}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-brand-charcoal mt-2">
                  {selectedRight.title}
                </h3>
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 shadow-md">
                {React.createElement(IconMap[selectedRight.iconName] || FileCheck, { className: 'w-6 h-6' })}
              </div>
            </div>

            {/* Description Text */}
            <div className="flex flex-col gap-4 text-gray-600">
              <p className="text-sm font-semibold text-brand-charcoal leading-relaxed">
                {selectedRight.description}
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed text-gray-500 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                {selectedRight.fullDetail}
              </p>
            </div>

            {/* Warning callout */}
            <div className="bg-red-50/50 border-l-4 border-brand-red rounded-r-xl p-4 flex gap-3 text-xs text-gray-600">
              <AlertCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-charcoal block mb-0.5">Está tendo algum problema sobre esta regra?</strong>
                Se seu empregador estiver ignorando esta determinação, ou pretendendo fazer descontos inadequados, não hesite: procure nossa assistência para reaver os valores em atraso.
                <button 
                  onClick={() => {
                    const el = document.getElementById('cadastro');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-bold text-brand-red hover:underline block mt-1 cursor-pointer"
                >
                  Entre em contato ou associe-se →
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic FAQ List Block */}
        <div className="mt-12 pt-12 border-t border-gray-100 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                Central de Dúvidas de Diretos
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-charcoal mt-1">
                Perguntas Frequentes do Setor
              </h3>
            </div>
            
            {/* Search FAQ Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Busque por termos (eSocial, Diarista...)"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className="border border-gray-200/70 rounded-xl bg-gray-50/50 hover:bg-white transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 cursor-pointer"
                    >
                      <span className="font-bold text-sm sm:text-base text-gray-800 leading-tight">
                        {faq.question}
                      </span>
                      <span className={`w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-bold shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 bg-brand-red text-white' : ''
                      }`}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-100/60 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-400 text-sm">
                Nenhum verbete de dúvida foi encontrado correspondendo à busca.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
