import React, { useState } from 'react';
import { LISTED_CITIES, WORKING_CATEGORIES } from '../data';
import { Associado } from '../types';
import { Landmark, ArrowRight, User, Phone, MapPin, Mail, Sparkles, CheckCircle2, Award } from 'lucide-react';

interface AssociationFormProps {
  onSuccess: (newMember: Associado) => void;
}

export default function AssociationForm({ onSuccess }: AssociationFormProps) {
  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('Ribeirão Preto');
  const [categoria, setCategoria] = useState('Empregada Doméstica');
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!nome.trim() || !email.trim() || !whatsapp.trim() || !cidade || !categoria) {
      setErrorText('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    // Simplistic email and whatsapp regex checks
    if (!email.includes('@')) {
      setErrorText('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newMember: Associado = {
        id: 'SIND-' + Math.floor(Math.random() * 900000 + 100000),
        nome: nome.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        cidade,
        categoria,
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        status: 'Pendente'
      };

      // Save into localStorage list array
      const existing = localStorage.getItem('sintedorp_associados');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newMember);
      localStorage.setItem('sintedorp_associados', JSON.stringify(list));

      // Trigger callback to parent component
      onSuccess(newMember);

      // Clean fields
      setNome('');
      setEmail('');
      setWhatsapp('');
      setCidade('Ribeirão Preto');
      setCategoria('Empregada Doméstica');
      
      setSubmitting(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <section id="cadastro" className="py-16 px-4 sm:px-6 bg-white font-sans text-brand-charcoal text-left relative overflow-hidden">
      {/* Curved backing accents */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Callout text and statistics / reassurance */}
        <div className="lg:col-span-5 flex flex-col gap-6 items-start">
          <div className="inline-flex items-center gap-1 bg-red-50 text-brand-red border border-brand-red/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5" />
            <span>Associação Digital Segura</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-gray-800">
            Filie-se ao SINTEDORP e Fortaleça Categoria
          </h2>
          
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Quer estar sempre por dentro de seus reajustes anuais de pisos salariais, as novas regras do eSocial e dispor de advogados especializados para te atender sempre que precisar? 
          </p>

          <p className="text-sm font-semibold text-gray-600">
            🤝 Associe-se de forma simples e rápida preenchendo o formulário ao lado. Nossa junta de análise entrará em contato via WhatsApp com você para concluir sua emissão de carteirinha oficial em 24 horas!
          </p>

          {/* Sindicato guarantee notes */}
          <div className="flex flex-col gap-3 py-4 w-full">
            <div className="flex items-start gap-2.5 bg-brand-beige border border-gray-100 p-4 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-brand-red text-white text-xs font-black flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Corte de Abusos</h4>
                <p className="text-xs text-gray-400 mt-0.5">Te defendemos contra horas extras não pagas e eSocial incorreto.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-brand-beige border border-gray-100 p-4 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-brand-red text-white text-xs font-black flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Assessoria Médica</h4>
                <p className="text-xs text-gray-400 mt-0.5">Parcerias com laboratórios de exames e clínicas odontológicas para associados.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Fully styled form container */}
        <div className="lg:col-span-7 bg-brand-beige/50 border border-gray-200/60 p-6 sm:p-10 rounded-2xl shadow-sm relative">
          
          {success ? (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-lg border-2 border-white">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-black text-gray-800 tracking-tight">
                  Cadastro Realizado com Sucesso!
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  Agradecemos a sua confiança. A nossa secretaria administrativa já recebeu o seu registro e entrará em contato com você pelo Whatsapp nas próximas horas.
                </p>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="mt-6 px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Voltar ao Formulário
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="font-display font-extrabold text-lg text-gray-800 flex items-center gap-1.5">
                  <Landmark className="w-5 h-5 text-brand-orange" />
                  <span>Emissão de Ficha de Pré-Associação</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Insira os seus dados básicos abaixo (* campos obrigatórios)</p>
              </div>

              {errorText && (
                <div className="p-3 bg-red-50 border-l-4 border-brand-red text-xs text-brand-red font-medium rounded-r-lg">
                  {errorText}
                </div>
              )}

              {/* Input Nome */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>Nome Completo *</span>
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome por extenso"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                />
              </div>

              {/* Row: Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>Endereço de E-mail *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>WhatsApp / Celular *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(16) 99999-9999"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row: City selector and Category selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Sua Cidade de Atuação *</span>
                  </label>
                  <select
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 outline-none cursor-pointer"
                  >
                    {LISTED_CITIES.map((c, idx) => (
                      <option key={idx} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Outro (SP)">Outro Município de SP</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                    <span>Categoria Profissional *</span>
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 outline-none cursor-pointer"
                  >
                    {WORKING_CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Button block */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full p-4 mt-2 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl font-bold font-display shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
              >
                <span>{submitting ? 'Gravando cadastro...' : 'Quero me Associar e Garantir Direitos'}</span>
                {!submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
