import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';

export default function LGPDConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    // Check if user has already accepted our LGPD terms
    const hasAccepted = localStorage.getItem('sintedorp_lgpd_accepted');
    if (!hasAccepted) {
      // Show with a brief delay for a polished entering visual transition
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sintedorp_lgpd_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Visual Consent Floating Banner */}
      <div 
        id="lgpd-banner"
        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 md:max-w-3xl md:mx-auto bg-brand-charcoal text-white rounded-2xl p-5 border border-white/10 shadow-2xl z-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn text-left font-sans"
      >
        <div className="flex gap-3.5 items-start">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>Privacidade e Segurança (LGPD)</span>
              <span className="text-xxs uppercase tracking-wider px-1.5 py-0.5 bg-green-500/20 text-green-400 font-extrabold rounded">Ativo</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              O portal do SINTEDORP utiliza cookies e tecnologias de rastreamento para aperfeiçoar sua experiência e garantir o suporte aos trabalhadores de acordo com o marco regulatório da Lei Geral de Proteção de Dados (Lei nº 13.709/18).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto mt-2 md:mt-0 justify-end">
          <button 
            onClick={() => setIsPolicyOpen(true)}
            className="text-xxs sm:text-xs text-gray-400 hover:text-white font-bold py-2.5 px-3.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Termos</span>
          </button>
          
          <button 
            onClick={handleAccept}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-xxs sm:text-xs py-2.5 px-4.5 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmar e Aceitar</span>
          </button>
        </div>
      </div>

      {/* Simplified Modal display for Legal Terms of LGPD */}
      {isPolicyOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99] animate-fadeIn">
          <div className="bg-white text-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-red" />
                <h3 className="font-display font-black text-base sm:text-lg text-gray-800 tracking-tight leading-none">
                  Declaração de Conformidade LGPD
                </h3>
              </div>
              <button 
                onClick={() => setIsPolicyOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 overflow-y-auto py-5 pr-2 text-xs text-gray-600 space-y-4 leading-relaxed text-justify">
              <p>
                O <strong>SINDICATO DOS TRABALHADORES DOMÉSTICOS DE RIBEIRÃO PRETO E REGIÃO (SINTEDORP)</strong> assume o compromisso de tratar os dados coletados com transparência, zelo e em estrita consonância com os objetivos do mandado constitucional de defesa professional.
              </p>
              
              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">1. Dos Dados Coletados no Formulário e Cadastro</h4>
              <p>
                Os dados enviados de forma voluntária por meio dos portais ou cadastros de associação (tais como nome total, e-mail de contato, CPF, data de nascimento, cargo, remuneração base e endereço profissional) destinam-se exclusivamente para a formalização da associação sindical, intermediação de acordos junto à rede securitária e fomento à assessoria contábil ou jurídica do trabalhador.
              </p>

              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">2. Da Segurança e Compartilhamento de Dados</h4>
              <p>
                Implementamos controles técnicos e administrativos adequados na salvaguarda dos seus dados. Não há transferência de dados pessoais a terceiros para exploração econômica ou comercialização publicitária. O compartilhamento ocorre única e obrigatoriamente perante sistemas oficiais autorizados por lei (tais como eSocial e as companhias de seguro coletivo contratadas para emissão da apólice obrigatória).
              </p>

              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">3. Dos Direitos das Titulares dos Dados</h4>
              <p>
                Qualquer assistida ou contribuinte possui plenos direitos previstos pelo Artigo 18 da LGPD, podendo solicitar a qualquer instante por meio da nossa central de atendimento presencial ou WhatsApp a retificação, portabilidade ou exclusão do registro em nosso cadastro interno, observados os prazos legais de salvaguarda tributária ou documental.
              </p>
            </div>

            {/* Footer action button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2 shrink-0">
              <button 
                onClick={() => setIsPolicyOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              >
                Fechar
              </button>
              <button 
                onClick={() => {
                  handleAccept();
                  setIsPolicyOpen(false);
                }}
                className="bg-[#22c55e] hover:bg-green-600 text-white font-black text-xs py-2.5 px-4.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Aceitar e Continuar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
