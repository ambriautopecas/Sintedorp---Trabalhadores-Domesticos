import React, { useState } from 'react';
import { Mail, Copy, Check, ShieldAlert, CreditCard, HeartPulse, Sparkles, Send } from 'lucide-react';

interface RegistryCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  emails: string[];
}

export default function MandatoryRegistrations() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const registries: RegistryCard[] = [
    {
      id: 'seguro-vida',
      title: 'Seguro de Vida Coletivo',
      subtitle: 'Corretora de Seguros',
      badge: 'Custeio Obrigatório do Empregador',
      description: 'Conforme Cláusula do Acordo Coletivo 2026-2027, o pagamento mensal do Seguro de Vida Coletivo de R$ 40,00 deve ser encaminhado obrigatoriamente para a corretora reguladora responsável pela apólice coletiva.',
      emails: ['julianasanches.segurosx8@gmail.com']
    },
    {
      id: 'cartao-alimentacao',
      title: 'Cartão Alimentação / VR',
      subtitle: 'Benefício Mensal e-Social',
      badge: 'Sem Descontos na Folha',
      description: 'Todo empregado abrangido tem direito ao benefício mensal mínimo de R$ 230,00 sem descontos de participação. Envie os dados contratuais para fins de cadastramento e emissão do cartão das domésticas.',
      emails: ['cartaodosdomesticos.org@gmail.com', 'emilsonrocha.x8seguros@gmail.com']
    },
    {
      id: 'contribuicao-assistencial',
      title: 'Contribuição Assistencial',
      subtitle: 'Desconto em Folha do Seguro Coletivo',
      badge: 'Descontada do Trabalhador',
      description: 'Arrecadação compulsória autorizada em Assembleia Geral e resguardada pelo Tema 935 do STF. Sendo aplicável a todo trabalhador que não apresentou oposição, envie a base de desconto mensal em e-Social para o canal oficial de registros.',
      emails: ['trabalhadoresdomesticos.org@gmail.com']
    }
  ];

  const handleCopyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section id="cadastros-obrigatorios" className="py-16 px-4 sm:px-6 bg-white font-sans text-brand-charcoal text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff2e6] text-[#b35900] border border-[#ffe0cc] rounded-full text-xs font-bold uppercase tracking-wider self-start">
            <ShieldAlert className="w-4 h-4 text-brand-orange animate-pulse" />
            <span>Obrigações do Empregador &amp; Contator</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-gray-800">
            Cadastros Obrigatórios do Acordo Coletivo
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Prezados empregadores e escritórios de contabilidade, enviem os dados cadastrais obrigatórios dos empregados aos e-mails específicos de cada serviço conveniado para garantir a homologação integral dos benefícios e evitar penalidades.
          </p>
        </div>

        {/* Big Warning Callout Alert */}
        <div className="bg-[#fcf8f2] border-l-4 border-brand-orange rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-xs">
          <Sparkles className="w-8 h-8 text-brand-orange shrink-0 hidden sm:block" />
          <div className="flex-1 text-left">
            <strong className="text-sm font-bold text-gray-800 block mb-0.5">Aviso Importante sobre o Piso Salarial 2026-2027</strong>
            <p className="text-xs sm:text-sm text-gray-600">
              O piso salarial correto da categoria atualmente em vigor para a jornada de <span className="font-bold text-brand-orange">44 Horas Semanais</span> é de <span className="font-bold text-brand-orange">R$ 1.915,48</span>. Certifique-se de realizar o e-Social em estrita harmonia com esta convenção.
            </p>
          </div>
        </div>

        {/* Registries Cards Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {registries.map((reg) => (
            <div 
              key={reg.id}
              className="bg-[#faf7f3]/50 hover:bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between gap-6 shadow-xs hover:shadow-md transition-all duration-300 hover:border-brand-orange-light/30 relative overflow-hidden group"
            >
              {/* Highlight line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-brand-orange transition-all duration-300"></div>

              {/* Card Top Section info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f5ebe0] text-[#705235] font-mono leading-none">
                    {reg.badge}
                  </span>
                  
                  {reg.id === 'seguro-vida' ? (
                    <HeartPulse className="w-5 h-5 text-brand-red shrink-0" />
                  ) : reg.id === 'cartao-alimentacao' ? (
                    <CreditCard className="w-5 h-5 text-brand-orange shrink-0" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0" />
                  )}
                </div>

                <div className="text-left mt-2">
                  <h4 className="font-display font-black text-lg text-gray-800 tracking-tight leading-snug">
                    {reg.title}
                  </h4>
                  <span className="text-xxs sm:text-xs text-gray-400 font-bold block mt-0.5 font-mono">
                    Canal: {reg.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-left mt-1 text-justify">
                  {reg.description}
                </p>
              </div>

              {/* Emails List Container section */}
              <div className="border-t border-gray-200/60 pt-4 flex flex-col gap-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">
                  E-mail Oficial p/ Envio das Informações:
                </span>
                
                <div className="flex flex-col gap-2">
                  {reg.emails.map((email) => {
                    const isCopied = copiedEmail === email;
                    return (
                      <div 
                        key={email}
                        className="bg-white border border-gray-150 rounded-xl p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xs group/email-row hover:border-brand-orange/40 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-[11px] sm:text-xs font-mono font-medium text-gray-700 truncate select-all">{email}</span>
                        </div>

                        <div className="flex gap-1.5 shrink-0">
                          {/* Copy code button */}
                          <button
                            onClick={() => handleCopyToClipboard(email)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isCopied 
                                ? 'bg-green-50 border-green-200 text-green-600' 
                                : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-500 hover:text-brand-orange'
                            }`}
                            title={isCopied ? 'Copiado!' : 'Copiar e-mail'}
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          {/* Trigger mail sender button */}
                          <a
                            href={`mailto:${email}?subject=Cadastro ${reg.title} - SINTEDORP`}
                            className="p-1.5 bg-orange-50 hover:bg-brand-orange border border-brand-orange-light/20 hover:border-transparent text-brand-orange hover:text-white rounded-lg transition-all"
                            title="Enviar e-mail diretamente"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
