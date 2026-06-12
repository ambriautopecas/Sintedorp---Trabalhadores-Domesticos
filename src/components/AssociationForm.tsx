import React, { useState } from 'react';
import { LISTED_CITIES, WORKING_CATEGORIES } from '../data';
import { Associado } from '../types';
import { Landmark, ArrowRight, User, Phone, MapPin, Mail, Sparkles, CheckCircle2, Award, Printer } from 'lucide-react';
import { printFicha } from '../utils/printFicha';

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
  const [lastSubmitted, setLastSubmitted] = useState<Associado | null>(null);

  const generateWhatsAppLink = () => {
    if (!lastSubmitted) return '#';
    const text = `*NOVO CADASTRO DE PRÉ-ASSOCIAÇÃO VIA SITE SINTEDORP* 🌐\n\nOlá SINTEDORP! Gostaria de formalizar meu cadastro realizado através do site oficial:\n\n👤 *Nome Completo:* ${lastSubmitted.nome}\n📍 *Cidade de Atuação:* ${lastSubmitted.cidade}\n💼 *Profissão:* ${lastSubmitted.categoria}\n📱 *WhatsApp/Contato:* ${lastSubmitted.whatsapp}\n✉️ *E-mail:* ${lastSubmitted.email}\n🔢 *ID Provisório:* ${lastSubmitted.id}\n📅 *Data de Solicitação:* ${lastSubmitted.dataCadastro}\n\n_Cadastro enviado pelo portal oficial do SINTEDORP (EficazBot)._`;
    return `https://wa.me/5516988068810?text=${encodeURIComponent(text)}`;
  };

  const generateEmailLink = () => {
    if (!lastSubmitted) return '#';
    const subject = `[SITE SINTEDORP] Novo Cadastro de Pré-Associação - ${lastSubmitted.nome}`;
    const body = `Olá SINTEDORP,\n\nUm novo cadastro de pré-associação foi registrado através do site oficial do sindicato.\n\nSeguem os detalhes da ficha:\n\n- Nome Completo: ${lastSubmitted.nome}\n- Cidade de Atuação: ${lastSubmitted.cidade}\n- Categoria Profissional: ${lastSubmitted.categoria}\n- WhatsApp / Celular: ${lastSubmitted.whatsapp}\n- Endereço de E-mail: ${lastSubmitted.email}\n- ID Provisório: ${lastSubmitted.id}\n- Data do Cadastro: ${lastSubmitted.dataCadastro}\n- Origem: Formulário do Site SINTEDORP (EficazBot)\n\nAtenciosamente,\nSuporte do Portal SINTEDORP`;
    return `mailto:sintedorp.org@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePrintDraft = () => {
    if (!nome.trim() || !whatsapp.trim()) {
      setErrorText('Por favor, preencha pelo menos o Nome Completo e WhatsApp para gerar a Ficha em PDF.');
      return;
    }
    setErrorText('');

    const draftMember: Associado = {
      id: 'SIND-PROVISÓRIO',
      nome: nome.trim(),
      email: email.trim() || 'Não informado',
      whatsapp: whatsapp.trim(),
      cidade,
      categoria,
      dataCadastro: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente',
      origem: 'Rascunho Impresso via Site'
    };

    printFicha(draftMember);
  };

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
        status: 'Pendente',
        origem: 'Website'
      };

      // Save into localStorage list array
      const existing = localStorage.getItem('sintedorp_associados');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newMember);
      localStorage.setItem('sintedorp_associados', JSON.stringify(list));

      // Trigger callback to parent component
      onSuccess(newMember);

      // Keep in state to generate custom links
      setLastSubmitted(newMember);

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
            <div className="text-center py-6 flex flex-col items-center justify-center gap-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-lg border-2 border-white">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-display font-black text-gray-800 tracking-tight">
                  Pré-cadastro Realizado!
                </h3>
                <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
                  Agradecemos a confiança. Seus dados foram guardados no sistema do site e estão disponíveis para homologação da secretaria.
                </p>
              </div>

              {/* Action boxes for directly sending to WhatsApp and Email */}
              <div className="w-full text-left bg-white p-4.5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-3.5 my-2">
                <div>
                  <h4 className="text-xs font-black uppercase text-brand-orange tracking-widest flex items-center gap-1.5 border-b border-gray-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Aprovação Imediata: Enviar Ficha
                  </h4>
                  <p className="text-xxs sm:text-xs text-gray-500 mt-1.5 leading-relaxed">
                    Ajude-nos a aprovar sua carteirinha em minutos! Clique em um dos botões abaixo para encaminhar sua ficha finalizada diretamente aos canais oficiais do Sindicato:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-1">
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Enviar no WhatsApp</span>
                  </a>

                  <a
                    href={generateEmailLink()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-charcoal hover:bg-gray-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current shrink-0" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Enviar por E-mail</span>
                  </a>
                </div>

                {/* Print button on Success screen */}
                <button
                  type="button"
                  onClick={() => lastSubmitted && printFicha(lastSubmitted)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer hover:scale-[1.01] mt-1"
                >
                  <Printer className="w-4.5 h-4.5" />
                  <span>Imprimir Ficha Completa (PDF)</span>
                </button>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="mt-2 px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
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

              {/* Dual Button Block: Digital Submit & Instant PDF Generation */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2.5">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-[2] p-4 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl font-bold font-display shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                >
                  <span>{submitting ? 'Gravando ficha...' : 'Quero me Associar e Garantir Direitos'}</span>
                  {!submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>

                <button
                  type="button"
                  onClick={handlePrintDraft}
                  className="flex-1 p-4 bg-white border border-gray-200 hover:border-brand-orange text-gray-700 hover:text-brand-orange rounded-xl font-bold font-display shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Gera o arquivo PDF oficial preenchido com seus dados"
                >
                  <Printer className="w-4.5 h-4.5 animate-pulse" />
                  <span>Imprimir PDF</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
