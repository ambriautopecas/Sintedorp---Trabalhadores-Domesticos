import React, { useState } from 'react';
import { Phone, Mail, Award, Menu, X, Landmark, Heart, Users, Facebook, Instagram } from 'lucide-react';
import { SINDICATO_INFO } from '../data';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

export default function Header({ activeSection, setActiveSection, isAdminOpen, setIsAdminOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'direitos', label: 'Guia de Direitos' },
    { id: 'calculadora', label: 'Simulador Trabalhista' },
    { id: 'cidades', label: 'Cidades Atendidas' },
    { id: 'documentos', label: 'Editais e Informativos' },
    { id: 'cadastros-obrigatorios', label: 'Cadastros Obrigatórios' },
    { id: 'faq-sindicato', label: 'Perguntas Frequentes' },
    { id: 'cadastro', label: 'Associe-se' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsAdminOpen(false);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to the top or section if on same page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 font-sans">
      {/* Top Banner Contact Line */}
      <div className="bg-brand-charcoal text-brand-beige py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a 
              href={`tel:${SINDICATO_INFO.contatos.telefoneFixo.replace(/\D/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>{SINDICATO_INFO.contatos.telefoneFixo}</span>
            </a>
            <a 
              href={`https://wa.me/55${SINDICATO_INFO.contatos.whatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>WhatsApp: {SINDICATO_INFO.contatos.whatsapp}</span>
            </a>
            <a 
              href={`mailto:${SINDICATO_INFO.contatos.email}`} 
              className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              <span>{SINDICATO_INFO.contatos.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300 text-xxs sm:text-xs">
            <a 
              href="https://cbdt.org.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 py-0.5 bg-brand-red text-white rounded font-bold border border-brand-red/30 hover:bg-brand-red-hover transition-all cursor-pointer"
            >
              Filiado à CBDT
            </a>
            <span className="h-4 w-px bg-white/10 hidden md:inline"></span>
            
            <a 
              href="https://www.facebook.com/profile.php?id=61589438697024&rdid=jWreFclgpLIEO2Qa&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Gnj8VBpST%2F#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-white hover:text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2] hover:border-[#1877F2] border border-[#1877F2]/30 px-2 py-0.5 rounded-lg transition-all font-semibold cursor-pointer"
              title="Facebook do Sindicato"
            >
              <Facebook className="w-3 h-3" />
              <span>Facebook</span>
            </a>

            <a 
              href="https://www.instagram.com/sintedorp.org2026/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-white hover:text-white bg-gradient-to-r from-[#8a3ab9]/20 to-[#e95950]/20 hover:from-[#8a3ab9] hover:to-[#e95950] border border-[#e95950]/30 px-2 py-0.5 rounded-lg transition-all font-semibold cursor-pointer"
              title="Instagram do Sindicato"
            >
              <Instagram className="w-3 h-3" />
              <span>Instagram</span>
            </a>

            <span className="hidden lg:inline text-gray-500">| CNPJ: {SINDICATO_INFO.cnpj}</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-white py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand Brand */}
          <div 
            onClick={() => handleNavClick('inicio')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm transition-transform group-hover:scale-105 shrink-0 p-0.5 overflow-hidden">
              {!logoError ? (
                <img 
                  src={SINDICATO_INFO.logoUrl} 
                  alt="Logo SINTEDORP" 
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Landmark className="w-6 h-6 text-brand-red" />
              )}
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold border border-white">
                ✓
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-brand-charcoal group-hover:text-brand-red transition-colors">
                  SINTEDORP
                </span>
                <span className="text-xxs uppercase font-bold tracking-widest text-brand-orange bg-orange-50 px-1 py-0.2 rounded border border-orange-100">
                  Ribeirão Preto
                </span>
              </div>
              <p className="text-[10px] text-gray-500 leading-tight hidden sm:block max-w-[280px]">
                Sindicato dos Trabalhadores Domésticos desde 1994
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && !isAdminOpen;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-red text-white shadow-sm font-semibold'
                      : 'text-gray-600 hover:text-brand-red hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            {/* Divider */}
            <span className="h-5 w-px bg-gray-200 mx-2"></span>

            {/* Admin toggle key indicator */}
            <button
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setActiveSection('');
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAdminOpen 
                  ? 'bg-brand-charcoal text-white border-brand-charcoal' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Painel de Cadastros</span>
            </button>
          </nav>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Admin Key Mobile */}
            <button
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setActiveSection('');
              }}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                isAdminOpen ? 'bg-brand-charcoal text-white border-brand-charcoal' : 'bg-white text-gray-600 border-gray-200'
              }`}
              title="Painel de Cadastros"
            >
              <Users className="w-4 h-4" />
            </button>

            {/* Menu Hambúrguer */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 animate-fadeIn shadow-inner font-sans">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && !isAdminOpen;
              return (
                <button
                  key={item.id}
                  id={`nav-item-mob-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-brand-red text-white font-semibold'
                      : 'text-gray-600 hover:text-brand-red hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
