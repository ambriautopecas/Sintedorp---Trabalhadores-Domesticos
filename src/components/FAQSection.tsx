import React, { useState } from 'react';
import { 
  HelpCircle, Search, ChevronDown, ChevronUp, BookOpen, 
  ShieldAlert, Landmark, Building, MessageSquare, Phone, MapPin, X
} from 'lucide-react';
import { FAQ_ITEMS } from '../data';
import { FAQItem } from '../types';

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [openIds, setOpenIds] = useState<string[]>(['faq-2', 'faq-3']); // pre-open a few useful ones

  // Categories mapping for translation and filtering
  const categoriesList = [
    { id: 'todos', label: 'Todos os Assuntos', icon: HelpCircle },
    { id: 'direitos', label: 'Pisos e Leis', icon: BookOpen },
    { id: 'contribuicao', label: 'Benefícios e Cadastros', icon: ShieldAlert },
    { id: 'sindicato', label: 'Sindicato e Filiação', icon: Landmark },
    { id: 'outros', label: 'Diaristas e Outros', icon: Building }
  ];

  const handleToggle = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleOpenAll = () => {
    setOpenIds(filteredFaqs.map(f => f.id));
  };

  const handleCloseAll = () => {
    setOpenIds([]);
  };

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = selectedCategory === 'todos' || faq.category === selectedCategory;
    const cleanSearch = searchQuery.toLowerCase();
    const matchesSearch = 
      faq.question.toLowerCase().includes(cleanSearch) || 
      faq.answer.toLowerCase().includes(cleanSearch);
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-sindicato" className="py-16 px-4 sm:px-6 bg-[#FAF7F3] font-sans text-brand-charcoal text-left relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff2e6] text-[#b35900] border border-[#ffe0cc] rounded-full text-xs font-bold uppercase tracking-wider self-start">
              <HelpCircle className="w-4 h-4 text-brand-orange animate-pulse" />
              <span>Suporte ao Trabalhador e Contadores</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-gray-800 leading-none">
              Dúvidas Frequentes (FAQ)
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Encontre respostas de forma ágil para as dúvidas trabalhistas mais comuns das mensalistas, diaristas e de seus contadores. Economize seu tempo!
            </p>
          </div>

          <div className="flex gap-2 self-start md:self-end">
            <button 
              onClick={handleOpenAll}
              className="text-xs bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 py-1.5 px-3 rounded-lg hover:shadow-2xs transition-all cursor-pointer font-bold"
            >
              Expandir Todos
            </button>
            <button 
              onClick={handleCloseAll}
              className="text-xs bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 py-1.5 px-3 rounded-lg hover:shadow-2xs transition-all cursor-pointer font-bold"
            >
              Recolher Todos
            </button>
          </div>
        </div>

        {/* Search controls & tabs block */}
        <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between">
          
          {/* Categories Tab selector */}
          <div className="flex flex-wrap gap-2 order-2 lg:order-1">
            {categoriesList.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-red border-brand-red text-white shadow-xs'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-80 shrink-0 order-1 lg:order-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquise por termos chaves..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-sm outline-none shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* FAQs Accordion Cards Stack */}
        <div className="flex flex-col gap-4 mt-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div 
                  key={faq.id} 
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-brand-orange/40 bg-white shadow-xs' 
                      : 'border-gray-200 bg-white/70 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => handleToggle(faq.id)}
                    className="w-full text-left px-5 py-4.5 sm:px-6 sm:py-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-display font-extrabold text-sm sm:text-base text-gray-800 tracking-tight leading-snug">
                      {faq.question}
                    </span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-brand-orange text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {/* Accordion expand block */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 sm:p-6 text-xs sm:text-sm text-gray-600 leading-relaxed text-justify bg-[#FCFBF9]/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl py-12 px-6 text-center text-gray-400 text-sm shadow-2xs">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              Nenhuma pergunta corresponde aos filtros aplicados. Tente buscar por outros termos!
            </div>
          )}
        </div>

        {/* Post-FAQ helper banner widget */}
        <div className="bg-brand-charcoal text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-blend-soft-light bg-white/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-brand-orange animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">Sua dúvida ainda não foi resolvida?</h4>
              <p className="text-xs text-gray-400 mt-1">
                Fale conosco diretamente. Nossa equipe está a postos para atuar na sua intermediação trabalhista ou associação.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0 w-full md:w-auto">
            <a 
              href="https://wa.me/5516988068810" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm px-4 lg:px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs w-full sm:w-auto text-center"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp (16) 98806-8810</span>
            </a>
            <a 
              href="#cadastro" 
              className="inline-flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-[#b35900] text-white font-bold text-xs sm:text-sm px-4 lg:px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs w-full sm:w-auto text-center"
            >
              <MapPin className="w-4 h-4" />
              <span>Localizar Sede</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
