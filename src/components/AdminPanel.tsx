import React, { useState, useEffect } from 'react';
import { Associado } from '../types';
import { Users, Search, Check, Trash2, ShieldAlert, Award, ChevronDown, CheckCircle, Clock } from 'lucide-react';

const FALLBACK_ASSOCIADOS: Associado[] = [
  {
    id: "SIND-541289",
    nome: "Maria das Graças Silva",
    email: "maria.graca@gmail.com",
    whatsapp: "(16) 98822-1134",
    cidade: "Ribeirão Preto",
    categoria: "Empregada Doméstica",
    dataCadastro: "10/05/2026",
    status: "Aprovado"
  },
  {
    id: "SIND-238471",
    nome: "Carlos Eduardo Nogueira",
    email: "carlinhos_edu@outlook.com",
    whatsapp: "(16) 99121-8890",
    cidade: "Brodowski",
    categoria: "Caseiro (Chácara/Sítio)",
    dataCadastro: "24/05/2026",
    status: "Pendente"
  },
  {
    id: "SIND-904125",
    nome: "Regina Helena Souza",
    email: "reginasouza.cuidadora@gmail.com",
    whatsapp: "(16) 98144-5512",
    cidade: "Sertãozinho",
    categoria: "Cuidador(a) de Idoso",
    dataCadastro: "02/06/2026",
    status: "Aprovado"
  }
];

interface AdminPanelProps {
  associadosList: Associado[];
  onRefresh: () => void;
}

export default function AdminPanel({ associadosList, onRefresh }: AdminPanelProps) {
  const [list, setList] = useState<Associado[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [carteirinhaAtiva, setCarteirinhaAtiva] = useState<Associado | null>(null);

  // Sync with local Storage list and fallbacks
  useEffect(() => {
    const existing = localStorage.getItem('sintedorp_associados');
    if (existing) {
      setList(JSON.parse(existing));
    } else {
      localStorage.setItem('sintedorp_associados', JSON.stringify(FALLBACK_ASSOCIADOS));
      setList(FALLBACK_ASSOCIADOS);
    }
  }, [associadosList]);

  // Handle status toggle
  const handleToggleStatus = (id: string) => {
    const updated = list.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Aprovado' ? 'Pendente' : 'Aprovado' as any };
      }
      return item;
    });
    localStorage.setItem('sintedorp_associados', JSON.stringify(updated));
    setList(updated);
    onRefresh();
  };

  // Handle deletion
  const handleDelete = (id: string) => {
    const updated = list.filter(item => item.id !== id);
    localStorage.setItem('sintedorp_associados', JSON.stringify(updated));
    setList(updated);
    onRefresh();
  };

  // Clear list to test state
  const handleResetData = () => {
    if (window.confirm("Deseja restaurar a lista com os cadastros modelo do Sindicato?")) {
      localStorage.setItem('sintedorp_associados', JSON.stringify(FALLBACK_ASSOCIADOS));
      setList(FALLBACK_ASSOCIADOS);
      onRefresh();
    }
  };

  const filtered = list.filter(item => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.categoria && item.categoria.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'todos' || item.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const totalPendentes = list.filter(i => i.status === 'Pendente').length;
  const totalAprovados = list.filter(i => i.status === 'Aprovado').length;

  return (
    <section className="py-12 px-4 sm:px-6 bg-brand-beige/50 font-sans text-brand-charcoal text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
              Auditoria de Pré-Filiações Recebidas
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-gray-800 mt-1">
              Painel Geral de Cadastros
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Use esta seção em tempo real para gerenciar e validar pré-cadastros enviados pelo formulário do site. Os dados são salvos em base local de forma persistente.
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-white text-gray-600 hover:text-brand-red hover:border-brand-red rounded-xl text-xs font-bold border border-gray-200 shadow-xs transition-all cursor-pointer self-start"
          >
            Restaurar Cadastros Modelo
          </button>
        </div>

        {/* Counter cards banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Total Recebidos</span>
            <span className="text-3xl font-display font-black text-brand-charcoal inline-block mt-1">{list.length}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Fichas Pendentes</span>
              <span className="text-3xl font-display font-black text-brand-orange inline-block mt-1">{totalPendentes}</span>
            </div>
            <Clock className="w-8 h-8 text-brand-orange/20" />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Fichas Deferidas</span>
              <span className="text-3xl font-display font-black text-green-600 inline-block mt-1">{totalAprovados}</span>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500/20" />
          </div>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pt-2">
          {/* Search filter text */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtre associados por nome, cidade ou cargo..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none font-medium focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          {/* Status selector */}
          <div className="flex bg-white border border-gray-200 p-1 rounded-xl self-start">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'pendente', label: 'Pendentes' },
              { id: 'aprovado', label: 'Aprovados' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedStatus(cat.id)}
                className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedStatus === cat.id
                    ? 'bg-brand-charcoal text-white'
                    : 'text-gray-500 hover:text-brand-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Split Grid: Results table on Left(8 cols) vs carteirinha card generator on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/75 overflow-hidden shadow-xs">
            {/* Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50/75 border-b border-gray-100/50 text-gray-500 font-bold uppercase tracking-wider text-xxs">
                    <th className="py-4 px-5">Reg / Associado</th>
                    <th className="py-4 px-4">Local / Cargo</th>
                    <th className="py-4 px-4">Contato</th>
                    <th className="py-4 px-4">Status Ficha</th>
                    <th className="py-4 px-5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-55/40 transition-colors">
                        <td className="py-4.5 px-5">
                          <div className="font-semibold text-gray-800 leading-tight">{item.nome}</div>
                          <div className="font-mono text-xxs text-gray-400 mt-1">{item.id}</div>
                        </td>
                        <td className="py-4.5 px-4">
                          <div className="text-gray-700 font-medium">{item.categoria}</div>
                          <div className="text-xs text-brand-orange font-bold mt-0.5">{item.cidade}</div>
                        </td>
                        <td className="py-4.5 px-4 text-xs font-medium text-gray-600">
                          <div>Tel: {item.whatsapp}</div>
                          <div className="text-gray-400 mt-0.5">{item.email}</div>
                        </td>
                        <td className="py-4.5 px-4">
                          <button
                            onClick={() => handleToggleStatus(item.id)}
                            className={`px-3 py-1 rounded-full text-xxs font-bold cursor-pointer border ${
                              item.status === 'Aprovado'
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'bg-orange-50 border-orange-200 text-brand-orange'
                            }`}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td className="py-4.5 px-5 text-right flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setCarteirinhaAtiva(item)}
                            className="p-2 rounded bg-red-50 text-brand-red border border-brand-red/10 hover:bg-brand-red hover:text-white transition-all text-xs font-bold cursor-pointer"
                            title="Gerar Carteirinha"
                          >
                            Carteira
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                        Nenhum filiado ou cadastro corresponde às pesquisas selecionadas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Carteirinha display: 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {carteirinhaAtiva ? (
              <div className="bg-gradient-to-br from-brand-charcoal to-gray-850 text-white rounded-2xl p-6 border border-brand-charcoal/20 shadow-xl text-left relative overflow-hidden animate-fadeIn">
                {/* RFID badge header */}
                <div className="absolute inset-0 bg-[radial-gradient(#e0323c_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-10"></div>
                <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-brand-red/30 rounded-full blur-3xl -z-10"></div>
                
                <div className="relative z-10 flex flex-col gap-6">
                  {/* badge header */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-red leading-none">
                        CARTEIRA OFICIAL
                      </span>
                      <span className="text-[9px] text-gray-400 font-medium mt-0.5 font-mono">
                        SINTEDORP - BIÊNIO 2026
                      </span>
                    </div>
                    {/* circular gold seal */}
                    <div className="w-8 h-8 rounded-full bg-brand-orange bg-opacity-20 flex items-center justify-center border border-brand-orange/40">
                      <Award className="w-4 h-4 text-brand-orange" />
                    </div>
                  </div>

                  {/* ID detail */}
                  <div>
                    <div className="font-display font-black text-lg text-brand-beige leading-snug">
                      {carteirinhaAtiva.nome}
                    </div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-1">
                      {carteirinhaAtiva.categoria}
                    </div>
                  </div>

                  {/* properties column block */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">ID Registro</span>
                      <span className="font-mono font-bold text-white block mt-0.2">{carteirinhaAtiva.id}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Localidade</span>
                      <span className="font-bold text-brand-orange block mt-0.2">{carteirinhaAtiva.cidade}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Data Filiação</span>
                      <span className="text-gray-200 block mt-0.2">{carteirinhaAtiva.dataCadastro}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-mono">Autorização</span>
                      <span className="text-green-400 font-bold block mt-0.2 uppercase text-xxs">ATIVADO</span>
                    </div>
                  </div>

                  {/* barcode block simulator */}
                  <div className="flex flex-col items-center gap-1 bg-white p-2.5 rounded-lg border border-white/10">
                    {/* SVG mockup lines of barcode */}
                    <svg className="w-full h-8 text-black" fill="currentColor" viewBox="0 0 100 20">
                      <rect x="0" y="0" width="2" height="20" />
                      <rect x="4" y="0" width="1" height="20" />
                      <rect x="7" y="0" width="3" height="20" />
                      <rect x="12" y="0" width="1" height="20" />
                      <rect x="15" y="0" width="2" height="20" />
                      <rect x="19" y="0" width="4" height="20" />
                      <rect x="25" y="0" width="1" height="20" />
                      <rect x="28" y="0" width="2" height="20" />
                      <rect x="32" y="0" width="1" height="20" />
                      <rect x="35" y="0" width="3" height="20" />
                      <rect x="40" y="0" width="2" height="20" />
                      <rect x="45" y="0" width="1" height="20" />
                      <rect x="48" y="0" width="4" height="20" />
                      <rect x="54" y="0" width="1" height="20" />
                      <rect x="57" y="0" width="2" height="20" />
                      <rect x="61" y="0" width="3" height="20" />
                      <rect x="66" y="0" width="1" height="20" />
                      <rect x="69" y="0" width="2" height="20" />
                      <rect x="73" y="0" width="4" height="20" />
                      <rect x="79" y="0" width="1" height="20" />
                      <rect x="82" y="0" width="3" height="20" />
                      <rect x="87" y="0" width="2" height="20" />
                      <rect x="91" y="0" width="1" height="20" />
                      <rect x="94" y="0" width="4" height="20" />
                    </svg>
                    <span className="text-[8px] font-mono font-bold text-gray-500 tracking-[5px]">
                      SINTEDORP{carteirinhaAtiva.id}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert("Comprovante de associação gerado para impressão com sucesso! PDF provisório enviado ao dispositivo.");
                      setCarteirinhaAtiva(null);
                    }}
                    className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Baixar PDF de Impressão
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200/70 p-6 rounded-2xl flex flex-col justify-center items-center text-center py-10">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-800">Emissão de Credenciais</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                  Clique no botão <strong className="text-brand-red">Carteira</strong> ao lado de qualquer associado para gerar visualmente a carteirinha virtual dele.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
