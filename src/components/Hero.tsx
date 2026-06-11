import React from 'react';
import { ShieldCheck, Heart, Users, ArrowRight, Gavel, Facebook, Instagram } from 'lucide-react';
import { SINDICATO_INFO } from '../data';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="inicio" className="relative py-12 md:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-white via-brand-beige/30 to-brand-beige/60 font-sans">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-brand-red/5 blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-brand-red/10 rounded-full text-brand-red text-xs font-bold uppercase tracking-wider animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
            Fundado em 1994 • Luta Constante
          </div>

          <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase font-display leading-tight">
            SINDICATO DOS TRABALHADORES E TRABALHADORAS EM DOMICÍLIO NA RESIDÊNCIA E PARA PESSOA
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-brand-charcoal tracking-tight leading-none">
            Valorizando quem cuida dos <span className="text-brand-red underline decoration-brand-orange/40 decoration-wavy decoration-2">lares</span> e das <span className="text-brand-red">pessoas</span> do Brasil.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Representamos com orgulho a categoria de trabalhadoras e trabalhadores domésticos em Ribeirão Preto e região desde 1994. Desde 2023, ampliamos nossa representação legal para <strong className="text-brand-charcoal">mais de 520 municípios do Estado de São Paulo</strong>.
          </p>

          <p className="text-sm sm:text-base text-gray-500 font-medium">
            🛡️ Defesa unificada de direitos trabalhistas • Convênios médicos e de lazer • Assessoria jurídica gratuita.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-2">
            <button
              onClick={() => onNavigate('cadastro')}
              className="px-8 py-4 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl font-bold font-display shadow-lg hover:shadow-xl hover:shadow-brand-red/10 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Quero me Associar</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('calculadora')}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 rounded-xl font-bold font-display shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Simulador de Direitos</span>
              <span className="text-xs bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded font-mono">PEC</span>
            </button>
          </div>

          {/* Social Networks Prominent Block */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-gray-100 shadow-sm w-full max-w-2xl mt-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">✨ Acompanhe Nossas Redes Sociais:</span>
            <div className="flex flex-wrap gap-2.5">
              <a 
                href="https://www.facebook.com/profile.php?id=61589438697024&rdid=jWreFclgpLIEO2Qa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Gnj8VBpST%2F#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-xs font-bold cursor-pointer shadow-2xs"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook do Sindicato</span>
              </a>
              <a 
                href="https://www.instagram.com/sintedorp.org2026/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-50 border border-pink-100 text-pink-700 hover:bg-gradient-to-r hover:from-[#c13584] hover:to-[#f56040] hover:text-white hover:border-transparent transition-all text-xs font-bold cursor-pointer shadow-2xs"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram Oficial</span>
              </a>
            </div>
          </div>

          {/* Mini benefits pills */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 text-xs text-gray-500 border-t border-gray-200/60 pt-6 w-full">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>Homologação Segura</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gavel className="w-4 h-4 text-brand-red" />
              <span>Advocacia do Trabalho</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-brand-red" />
              <span>Descontos Médicos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-red" />
              <span>Suporte eSocial</span>
            </div>
          </div>

        </div>

        {/* Right Column: Modern Graphic Collage and Sliders Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-[420px] lg:max-w-none">
            {/* Main Decorative Card */}
            <div className="relative rounded-2xl bg-gradient-to-tr from-brand-charcoal to-brand-charcoal/90 text-white p-6 sm:p-8 shadow-2xl overflow-hidden border border-brand-charcoal/20">
              
              {/* background noise styling */}
              <div className="absolute inset-0 bg-[radial-gradient(#e0323c_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 rounded bg-brand-red text-white text-[10px] font-bold tracking-widest uppercase">
                    REGISTRO SINDICAL MTE
                  </div>
                  <span className="text-xs font-mono text-gray-400">D.O.U. 12/02/1996</span>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-2xl text-brand-beige">
                    SINTEDORP
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Processo nº 46.000.000437-95
                  </p>
                </div>

                <a 
                  href="https://cbdt.org.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-charcoal/60 hover:bg-brand-charcoal/80 rounded-xl p-4 border border-white/5 hover:border-brand-orange/30 flex flex-col gap-3 transition-all cursor-pointer group/cbdt"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange bg-opacity-20 flex items-center justify-center text-brand-orange shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 group-hover/cbdt:text-brand-orange transition-colors">Central Oficial</div>
                      <div className="text-sm font-bold text-white leading-tight group-hover/cbdt:text-brand-orange transition-colors">Filiado à CBDT Nacional</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-400 pt-2 border-t border-white/5 flex justify-between items-center">
                    <span>CNPJ do Sindicato: <span className="font-mono text-white">{SINDICATO_INFO.cnpj}</span></span>
                    <span className="text-brand-orange text-[10px] underline">Ver site →</span>
                  </div>
                </a>

                {/* SINTEDORP Official Logo inside Union ID Card */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex items-center justify-center border border-white/20 shrink-0 p-1">
                    <img 
                      src={SINDICATO_INFO.logoUrl} 
                      alt="Logo SINTEDORP" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-brand-orange font-bold uppercase tracking-wider">Trabalhador Protegido</div>
                    <div className="text-sm font-bold mt-0.5">Associe-se ao Sindicato</div>
                    <div className="text-[11px] text-gray-300">Garantia de auxílio profissional desde 1994</div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-brand-orange bg-opacity-20 rounded-full blur-xl"></div>
            </div>

            {/* Back Accent Shapes */}
            <div className="absolute -top-3 -right-3 w-full h-full bg-brand-red rounded-2xl -z-10 rotate-2 opacity-10"></div>
            <div className="absolute -bottom-3 -left-3 w-full h-full bg-brand-orange rounded-2xl -z-20 -rotate-1 opacity-5"></div>

            {/* Highlight bubble */}
            <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl p-3 flex items-center gap-2 border border-gray-100 max-w-[170px]">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                ✓
              </span>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Conselho Jurídico</p>
                <p className="text-xs font-bold text-gray-800 leading-tight">PEC das Domésticas</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-4 bg-white shadow-xl rounded-2xl p-4 border border-gray-100">
              <p className="text-2xl font-black text-brand-red text-left leading-none">32 <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">anos de lutas</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
