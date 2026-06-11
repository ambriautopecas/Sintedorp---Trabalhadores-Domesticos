import React, { useState, useMemo } from 'react';
import { MapPin, Phone, HelpCircle, Check, Compass, ShieldAlert } from 'lucide-react';

interface MapCity {
  name: string;
  x: number;
  y: number;
  region: string;
  desc: string;
}

interface CoverageMapProps {
  onSelectCity: (cityName: string) => void;
  selectedCityName: string;
}

export default function CoverageMap({ onSelectCity, selectedCityName }: CoverageMapProps) {
  const [hoveredCity, setHoveredCity] = useState<MapCity | null>(null);

  const mapCities: MapCity[] = useMemo(() => [
    { name: "Ribeirão Preto", x: 250, y: 195, region: "Sede Central", desc: "Avenida Caramuru, 451 - Nossa sede oferece atendimento jurídico integral, homologações e convênios locais." },
    { name: "Sertãozinho", x: 175, y: 195, region: "Região Metropolitana", desc: "Força industrial. Cobertura SINTEDORP plena com atendimento via plantão regional e canais virtuais." },
    { name: "Brodowski", x: 295, y: 140, region: "Região Metropolitana", desc: "Apoio total às trabalhadoras de Brodoswdki com suporte a convênios médicos e fiscalização." },
    { name: "Cravinhos", x: 275, y: 245, region: "Região Metropolitana", desc: "Fácil acesso à Sede. Homologações e assessoria jurídica prioritária para toda a categoria das domésticas." },
    { name: "Batatais", x: 345, y: 110, region: "Região Metropolitana", desc: "Presença consolidada. Registro do Seguro de Vida e convênio odontológico plenamente homologados." },
    { name: "Jardinópolis", x: 250, y: 135, region: "Região Metropolitana", desc: "Suporte e intermediação de conflitos rápido para trabalhadoras domésticas e cuidadores." },
    { name: "Serrana", x: 305, y: 195, region: "Região Metropolitana", desc: "Ampla abrangência de representação de mensalistas e diaristas com suporte do acordo coletivo." },
    { name: "Dumont", x: 200, y: 230, region: "Região Metropolitana", desc: "Proximidade integrada de atendimento. Defesa jurídica contra descontos de moradia e transporte." },
    { name: "Jaboticabal", x: 105, y: 220, region: "Região Metropolitana", desc: "Suporte sindical integral. Atendimento de segunda a sexta pelos canais telefônicos e plantão administrativo." },
    { name: "Monte Alto", x: 65, y: 195, region: "Região Metropolitana", desc: "Fronteira oeste de abrangência. Assistência de homologações facilitada de forma 100% digital." },
    { name: "Orlândia", x: 220, y: 70, region: "Região Metropolitana", desc: "Pólo norte regional. Custeio obrigatório de seguro de vida e vale alimentação garantidos em convenção." },
    { name: "Pontal", x: 170, y: 140, region: "Região Metropolitana", desc: "Orientação e combate às pressões de oposição patronal com link direto à fiscalização do MPT." },
    { name: "Cajuru", x: 375, y: 205, region: "Região Metropolitana", desc: "Assistência de previdência social, auxílio-doença e salário-maternidade em nossa central SINTEDORP." },
    { name: "Santa Rosa do Viterbo", x: 350, y: 270, region: "Região Metropolitana", desc: "Amparo estendido do piso salarial reajustado e vale-refeição sem desconto em folha." },
    { name: "São Simão", x: 295, y: 290, region: "Região Metropolitana", desc: "Preservação histórica dos direitos domésticos e acompanhamento de contratos do eSocial." }
  ], []);

  const selectedCity = mapCities.find(c => c.name.toLowerCase() === selectedCityName.toLowerCase());

  // Current display city (either selected, hovered, or Central Sede by default)
  const displayCity = hoveredCity || selectedCity || mapCities[0];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs flex flex-col lg:flex-row gap-6 relative overflow-hidden h-full">
      {/* Interactive Map Visual */}
      <div className="flex-1 bg-[#FCFAF7] rounded-xl border border-gray-100 p-4 relative flex flex-col justify-between min-h-[340px] select-none">
        
        {/* Map Header details */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-orange animate-pulse" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Mapa de Abrangência</span>
          </div>
          <span className="text-xxs font-mono bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Área Homologada
          </span>
        </div>

        {/* SVG Canvas Map Area */}
        <div className="relative w-full aspect-[5/4] max-w-[450px] mx-auto my-auto">
          <svg 
            viewBox="0 0 500 380" 
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
          >
            {/* Concentric radial rings for distance from Ribeirao */}
            <circle cx="250" cy="195" r="60" fill="none" stroke="#f43f5e" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="250" cy="195" r="120" fill="none" stroke="#f43f5e" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="250" cy="195" r="180" fill="none" stroke="#f43f5e" strokeOpacity="0.02" strokeWidth="1" strokeDasharray="2 2" />

            {/* Hub-and-Spoke Connection Dash Lines */}
            {mapCities.map((city) => {
              if (city.name === "Ribeirão Preto") return null;
              const isHighlighted = hoveredCity?.name === city.name || selectedCityName.toLowerCase() === city.name.toLowerCase();
              return (
                <line
                  key={`line-${city.name}`}
                  x1="250"
                  y1="195"
                  x2={city.x}
                  y2={city.y}
                  stroke={isHighlighted ? "#f43f5e" : "#e5e7eb"}
                  strokeWidth={isHighlighted ? "1.5" : "0.75"}
                  strokeDasharray={isHighlighted ? "none" : "3 3"}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* City Markers/Pins on Map */}
            {mapCities.map((city) => {
              const isSede = city.name === "Ribeirão Preto";
              const isSelected = selectedCityName.toLowerCase() === city.name.toLowerCase();
              const isHovered = hoveredCity?.name === city.name;
              const isActive = isSelected || isHovered;

              return (
                <g 
                  key={`g-${city.name}`}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => onSelectCity(city.name)}
                  className="cursor-pointer group"
                >
                  {/* Outer breathing ring for selected or hovered */}
                  {(isActive || isSede) && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isSede ? "14" : "10"}
                      fill={isSede ? "#f97316" : "#f43f5e"}
                      fillOpacity={isActive ? "0.25" : "0.12"}
                      className={isActive || isSede ? "animate-pulse" : ""}
                    />
                  )}

                  {/* Inner exact point node */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isSede ? "6" : "4"}
                    fill={isSede ? "#f97316" : (isActive ? "#f43f5e" : "#9ca3af")}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Absolute label text above or below node to reduce overlaps */}
                  <text
                    x={city.x}
                    y={city.y + (city.y > 195 ? 15 : -10)}
                    textAnchor="middle"
                    className={`font-sans select-none text-[8px] sm:text-[9px] font-bold pointer-events-none transition-all duration-300 ${
                      isActive 
                        ? 'fill-brand-red text-xs filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] font-black' 
                        : isSede 
                        ? 'fill-brand-orange font-black' 
                        : 'fill-gray-400'
                    }`}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend instructions */}
        <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-3 border-t border-gray-100 pt-2 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Sede Central
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-red"></span> Subsedes & Cidades Atendidas
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">Passe o mouse ou toque para explorar</span>
        </div>

      </div>

      {/* Selected City Details Panel */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col justify-between gap-5 text-left bg-[#FCFAF7]/40 p-4.5 rounded-xl border border-gray-100">
        <div className="flex flex-col gap-3">
          
          <div className="flex items-center justify-between">
            <span className="text-xxs font-mono uppercase bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded font-bold">
              {displayCity.region}
            </span>
            <span className="inline-flex items-center gap-0.5 text-xxs font-bold text-green-600">
              <Check className="w-3.5 h-3.5" />
              100% Coberta
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-red animate-bounce" />
            <h4 className="font-display font-black text-lg text-gray-800 leading-tight">
              {displayCity.name}
            </h4>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed text-left min-h-[70px] bg-white p-3 rounded-lg border border-gray-100 italic">
            "{displayCity.desc}"
          </p>

          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-1.5 text-xxs font-bold text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <span>Convenções Coletivas Ativas em 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-xxs font-bold text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
              <span>Proteção e Auxílio Jurídico Garantidos</span>
            </div>
          </div>
        </div>

        {/* Core Direct Action calls */}
        <div className="flex flex-col gap-2 mt-2">
          {displayCity.name !== "Ribeirão Preto" ? (
            <button
              onClick={() => onSelectCity(displayCity.name)}
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Ver na Lista Abaixo</span>
            </button>
          ) : (
            <a
              href="#cadastro"
              className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <CompSedeButtonIcon />
              <span>Visitar Nossa Sede</span>
            </a>
          )}

          <a
            href={`https://wa.me/5516988068810?text=Ol%C3%A1%20SINTEDORP%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20o%20trabalho%20dom%C3%A9stico%20em%20${encodeURIComponent(displayCity.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-green-600" />
            <span>Suporte para {displayCity.name}</span>
          </a>
        </div>

      </div>

    </div>
  );
}

// Icon for sede button
function CompSedeButtonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M3 22h18" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
