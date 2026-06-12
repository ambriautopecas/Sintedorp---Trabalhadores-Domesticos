import React, { useState } from 'react';

interface ChartDataItem {
  name: string;
  value: number;
}

interface MonthlyChartProps {
  data: ChartDataItem[];
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Determine the highest value to calibrate our bar heights
  const maxVal = Math.max(...data.map(item => item.value), 1);

  return (
    <div className="w-full font-sans select-none relative" id="custom-monthly-chart">
      {/* Chart Grid Area */}
      <div className="relative h-56 w-full flex items-end gap-3 sm:gap-6 border-b border-gray-100 pb-2">
        
        {/* Horizontal Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2">
          {[1, 0.75, 0.5, 0.25, 0].map((ratio, idx) => {
            const gridValue = Math.round(maxVal * ratio);
            return (
              <div key={idx} className="w-full flex items-center justify-between border-t border-dashed border-gray-100/80 h-0 text-[10px] font-mono text-gray-400">
                <span className="bg-white/80 pr-1.5 leading-none z-10">{gridValue}</span>
              </div>
            );
          })}
        </div>

        {/* The Bars */}
        <div className="relative z-10 w-full h-full flex items-end justify-between px-2 sm:px-6">
          {data.map((item, idx) => {
            const heightPercent = `${(item.value / maxVal) * 100}%`;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                
                {/* Micro Tooltip (Shows when hovered) */}
                <div
                  className={`absolute -top-10 bg-brand-charcoal text-white text-[10px] sm:text-xs font-black py-1.5 px-3 rounded-lg shadow-md transition-all duration-200 pointer-events-none flex flex-col items-center gap-0.5 z-20 ${
                    isHovered ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-2 scale-90'
                  }`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span className="text-brand-orange">{item.name}</span>
                  <span>{item.value} novos</span>
                  <div className="w-2 h-2 bg-brand-charcoal rotate-45 -mt-0.5 relative top-1.5"></div>
                </div>

                {/* Animated Column Bar */}
                <div 
                  className="w-full max-w-[40px] rounded-t-lg transition-all duration-300 relative cursor-pointer overflow-hidden shadow-sm"
                  style={{ 
                    height: heightPercent,
                    background: isHovered 
                      ? 'linear-gradient(to top, #d92d32 0%, #ff7849 100%)' 
                      : 'linear-gradient(to top, #f26c36 0%, #d92d32 100%)'
                  }}
                >
                  {/* Gloss shine effect on hover */}
                  <div className={`absolute inset-y-0 left-0 w-1/3 bg-white/10 skew-x-12 transition-all duration-300 ${
                    isHovered ? 'translate-x-full opacity-30' : '-translate-x-full opacity-0'
                  }`} />
                </div>

                {/* Indicator dot */}
                <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-all duration-300 ${
                  isHovered ? 'bg-brand-red scale-125 shadow-xs' : 'bg-transparent'
                }`} />

              </div>
            );
          })}
        </div>
      </div>

      {/* X Axis Labels */}
      <div className="w-full flex justify-between px-2 sm:px-6 mt-2 pt-1 font-mono text-[10.5px] font-bold text-gray-400">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className={`w-full max-w-[40px] text-center transition-all duration-200 uppercase ${
              hoveredIdx === idx ? 'text-brand-red font-black' : 'text-gray-400'
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
