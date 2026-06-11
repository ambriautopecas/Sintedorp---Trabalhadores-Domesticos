import React, { useState } from 'react';
import { LISTED_CITIES } from '../data';
import { MapPin, Search, Grid, Eye, CheckCircle, HelpCircle } from 'lucide-react';
import CoverageMap from './CoverageMap';

export default function CitiesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState(false);

  const filteredCities = LISTED_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCityFromMap = (cityName: string) => {
    setSearchTerm(cityName === "Ribeirão Preto" ? "" : cityName);
  };

  return (
    <section id="cidades" className="py-16 px-4 sm:px-6 bg-white text-brand-charcoal font-sans text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Banner Headers */}
        <div className="max-w-3xl flex flex-col gap-3">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
            Território de Atuação do Sindicato
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-gray-800">
            Mais de 520 Cidades Conveniadas
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Sediados em Ribeirão Preto - SP, ampliamos nossa cobertura jurídica em 2023 para representar trabalhadores de 520 municípios do estado de São Paulo. Passe o mouse ou clique no mapa abaixo para explorar nossas regionais e parceiros locais, ou pesquise sua cidade:
          </p>
        </div>

        {/* Interactive Regional Coverage Map */}
        <CoverageMap 
          onSelectCity={handleSelectCityFromMap}
          selectedCityName={searchTerm}
        />

        {/* Searching input bar */}
        <div className="relative max-w-md w-full">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procure por sua cidade (Ex: Brodowski...)"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red font-medium text-sm sm:text-base transition-all outline-none"
          />
        </div>

        {/* Dynamic List Grid */}
        <div className="bg-brand-beige/50 rounded-2xl p-6 border border-gray-200/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-base text-brand-charcoal flex items-center gap-2">
              <Grid className="w-4 h-4 text-brand-orange" />
              <span>Cidades Atendidas Diretas ({filteredCities.length})</span>
            </h3>
            <span className="text-xxs font-mono uppercase bg-brand-orange bg-opacity-25 text-brand-orange px-2 py-0.5 rounded font-black">
              São Paulo
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 bg-white/80 border border-gray-100 rounded-xl flex items-center gap-2 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight leading-tight">
                    {city.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-6 text-gray-400 text-sm">
                Nenhum município específico encontrado sob esse termo.
              </div>
            )}
          </div>

          {/* Expanded 520 cities explainer */}
          <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-800">Sua cidade não está na lista principal de 28 municípios sementes?</h4>
                <p className="text-xs text-gray-400 mt-0.5 max-w-xl">
                  Não se preocupe! Nós atendemos outras localidades do interior paulista onde não há representação sindical própria ativa. Entre em contato para validarmos.
                </p>
              </div>
            </div>

            <button
              onClick={() => setExpandedSection(!expandedSection)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 hover:border-gray-300 transition-all flex items-center gap-1.5 cursor-pointer text-gray-600 bg-white"
            >
              <Eye className="w-4 h-4" />
              <span>{expandedSection ? 'Recolher Termo' : 'Ler Regras de Extensão'}</span>
            </button>
          </div>

          {expandedSection && (
            <div className="mt-4 bg-white border border-gray-100 rounded-xl p-5 text-xs text-gray-500 leading-relaxed animate-fadeIn">
              Conforme decisões homologadas no MTE e estatuto corporativo registrado, o SINDICATO DOS TRABALHADORES DOMÉSTICOS DE RIBEIRÃO PRETO E REGIÃO possui atribuição para estender serviços jurídicos de homologação, assessoria e conveniado para toda a mesorregião do norte-oeste de São Paulo, cobrindo o vácuo representativo de pequenos municípios. Portanto, residentes de pequenos povoados e distritos circunvizinhos possuem pleno amparo de filiação individual.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
