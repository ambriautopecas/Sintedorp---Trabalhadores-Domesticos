import React, { useState } from 'react';
import { WORKING_CATEGORIES } from '../data';
import { Users, Hourglass, HelpCircle, Award, CheckCircle } from 'lucide-react';

export default function ReimaginedStats() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const statItems = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      value: "+2000",
      label: "Associados Ativos",
      sub: "União que consolida novos reajustes e acordos"
    },
    {
      icon: <Hourglass className="w-6 h-6 text-white" />,
      value: "32 Anos",
      label: "De História e Luta",
      sub: "Fundado em Ribeirão Preto em 20 de Junho de 1994"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      value: "+1000",
      label: "Causas Ganhas",
      sub: "Ações judiciais, horas extras e rescisões quitadas"
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      value: "15 Prêmios",
      label: "Certificações Sociais",
      sub: "Conselho ético de honra e mérito comunitário"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-brand-charcoal text-white font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e0323c_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center shadow-md shadow-brand-red/10">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-black text-brand-beige leading-none">
                  {stat.value}
                </div>
                <div className="text-sm font-bold mt-1 text-white">
                  {stat.label}
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories of Covered Workers Block */}
        <div className="border-t border-white/10 pt-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-brand-orange">
              QUEM SÃO OS PROFISSIONAIS REPRESENTADOS?
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-brand-beige">
              Apoio Integral a Todos os Trabalhadores Residenciais
            </h2>
            <p className="text-sm text-gray-400">
              Se você trabalha prestando serviços no âmbito residencial de terceiros ou cuidados a pessoas, você está amparado legalmente pelo SINTEDORP. Toque sobre qualquer categoria abaixo para ler sua especificação profissional:
            </p>
          </div>

          {/* Dynamic Categories Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-8">
            {WORKING_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(isSelected ? null : idx)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer border ${
                    isSelected 
                      ? 'bg-brand-red border-brand-red text-white shadow-lg' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive display for category selection */}
          {selectedCategory !== null && (
            <div className="mt-6 bg-brand-red bg-opacity-10 border border-brand-red/30 rounded-2xl p-5 text-left max-w-4xl mx-auto animate-fadeIn">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange mt-1.5 shrink-0"></span>
                <div>
                  <h4 className="font-display font-bold text-base text-brand-beige">
                    {WORKING_CATEGORIES[selectedCategory].name}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">
                    {WORKING_CATEGORIES[selectedCategory].description}. O SINTEDORP garante que as normas de piso salarial acordadas coletivamente, férias remuneradas, horas extraordinárias reguladas e suporte em rescisão contratual se aplicam integralmente a esta categoria.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
