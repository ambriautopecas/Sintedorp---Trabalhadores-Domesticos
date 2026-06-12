import React from 'react';
import { SINDICATO_INFO } from '../data';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-brand-charcoal text-white font-sans text-left border-t-4 border-brand-red">
      {/* Upper footer columns */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Bio segment */}
        <div className="md:col-span-5 flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src={SINDICATO_INFO.logoUrl} 
                alt="Logo SINTEDORP" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white">
              SINTEDORP
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
            Fundado em 20/06/1994, com registro publicado em Diário Oficial da União. Fortalecendo as lutas e as conquistas profissionais da categoria de trabalhadores e trabalhadoras domésticos no estado de SP.
          </p>

          <div className="flex flex-col gap-1 text-[10px] text-gray-500 font-mono mt-1">
            <span>CNPJ: {SINDICATO_INFO.cnpj}</span>
            <span>Código Sindical: {SINDICATO_INFO.codigoSindical}</span>
            <span>Processo no MTE: {SINDICATO_INFO.processoMTE}</span>
            <span>D.O.U.: {SINDICATO_INFO.registroDOU}</span>
          </div>
        </div>

        {/* Contacts column */}
        <div className="md:col-span-4 flex flex-col gap-4 text-left">
          <h4 className="font-display font-bold text-sm text-brand-beige uppercase tracking-widest border-b border-white/10 pb-2">
            Nossa Sede e Endereço
          </h4>

          <div className="flex flex-col gap-3 text-xs sm:text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white leading-tight">{SINDICATO_INFO.contatos.endereco}</p>
                <p className="text-gray-400 text-xs mt-0.5">{SINDICATO_INFO.contatos.bairro} - CEP: {SINDICATO_INFO.contatos.cep}</p>
                <p className="text-brand-orange text-xs font-semibold">{SINDICATO_INFO.contatos.cidade} - {SINDICATO_INFO.contatos.estado}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <a href={`tel:${SINDICATO_INFO.contatos.telefoneFixo.replace(/\D/g, '')}`} className="hover:text-brand-orange transition-colors">
                {SINDICATO_INFO.contatos.telefoneFixo}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
              <a 
                href={`https://wa.me/55${SINDICATO_INFO.contatos.whatsapp.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-green-400 transition-colors"
              >
                {SINDICATO_INFO.contatos.whatsapp} (WhatsApp)
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <a href={`mailto:${SINDICATO_INFO.contatos.email}`} className="hover:text-brand-orange transition-colors">
                {SINDICATO_INFO.contatos.email}
              </a>
            </div>
          </div>
        </div>

        {/* Map visualization simulator column */}
        <div className="md:col-span-3 flex flex-col gap-4 text-left">
          <h4 className="font-display font-bold text-sm text-brand-beige uppercase tracking-widest border-b border-white/10 pb-2">
            Localização Sede
          </h4>

          <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl overflow-hidden relative group">
            {/* Map image or simulation cards */}
            <div className="h-28 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] bg-brand-charcoal border border-white/10 rounded-lg flex flex-col items-center justify-center p-3 text-center border-dashed">
              <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1.5 leading-tight">{SINDICATO_INFO.contatos.endereco}</span>
              <span className="text-[9px] text-gray-500 font-semibold">{SINDICATO_INFO.contatos.cidade} - SP</span>
            </div>

            <a 
              href="https://maps.google.com/?q=Avenida+Caramuru+451+Ribeirao+Preto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2.5 w-full py-1.5 bg-white/10 hover:bg-white text-white hover:text-brand-charcoal text-xxs font-bold rounded-lg transition-all text-center block"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>

      </div>

      {/* Sindicato Filiation Bar */}
      <div className="bg-white/5 py-4 border-t border-white/5 px-4 sm:px-6 text-xs text-gray-400 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <a 
            href="https://cbdt.org.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer group/footer-cbdt"
          >
            <span className="p-1 px-2.5 rounded bg-brand-orange text-white text-xxs font-black uppercase group-hover/footer-cbdt:bg-brand-red transition-all">
              Filiado Oficial
            </span>
            <div className="text-left font-medium">
              <p className="text-white text-xs leading-none group-hover/footer-cbdt:text-brand-orange transition-all">{SINDICATO_INFO.filiacao} ↗</p>
              <p className="text-xxs text-gray-500 mt-0.5">CNPJ CBDT: {SINDICATO_INFO.cnpjCBDT}</p>
            </div>
          </a>

          {/* Social Icons row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xxs sm:text-xs text-gray-400 font-bold uppercase tracking-wider hidden sm:inline">Conheça o Sindicato Digital:</span>
            <a 
              href="https://www.facebook.com/profile.php?id=61589438697024&rdid=jWreFclgpLIEO2Qa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Gnj8VBpST%2F#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-red text-white hover:bg-brand-red flex items-center gap-2 transition-all cursor-pointer text-xs font-bold shadow-xs"
              title="Acompanhe nosso Facebook oficial!"
            >
              <Facebook className="w-4 h-4 text-brand-orange group-hover:text-white" />
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/sintedorp.org2026/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-red text-white hover:bg-brand-red flex items-center gap-2 transition-all cursor-pointer text-xs font-bold shadow-xs"
              title="Siga-nos no Instagram oficial!"
            >
              <Instagram className="w-4 h-4 text-brand-orange group-hover:text-white" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lower static credit signature */}
      <div className="bg-brand-charcoal py-6 border-t border-white/5 px-4 sm:px-6 text-xxs tracking-wider text-gray-500 uppercase">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <span>© SINDICATO DOS TRABALHADORES DOMÉSTICOS DE RIBEIRÃO PRETO E REGIÃO — 1994 - {currentYear}</span>
          <span className="normal-case font-medium text-gray-400">
            Feito por{' '}
            <a 
              href="https://eficazbot.com.br/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-orange hover:text-brand-red font-bold transition-all underline decoration-brand-orange/30 hover:decoration-brand-red"
            >
              EficazBot
            </a>
          </span>
        </div>
      </div>

    </footer>
  );
}
