'use client';

import React, { useState } from 'react';
import { Filter, Sparkles, ShieldCheck } from 'lucide-react';

export interface FilterState {
  hardwareColor: string;
  materialType: string;
  condition: string;
  hasSpaTreatment: boolean | null;
  odorScoreMax: number | null;
  fullSetOnly: boolean;
}

interface LuxuryProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export const LuxuryProductFilter: React.FC<LuxuryProductFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    hardwareColor: '',
    materialType: '',
    condition: '',
    hasSpaTreatment: null,
    odorScoreMax: null,
    fullSetOnly: false,
  });

  const handleChange = (key: keyof FilterState, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="bg-neutral-900/90 border border-amber-500/20 rounded-xl p-5 text-amber-50 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
        <Filter className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold text-lg text-amber-200">Kıl Kuyruk / Lüks Detay Filtresi</h3>
        <span className="ml-auto text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Hassas Arama
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {/* Metal / Aksesuar Rengi */}
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">
            Aksesuar Metal Rengi (Hardware)
          </label>
          <select
            value={filters.hardwareColor}
            onChange={(e) => handleChange('hardwareColor', e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Tümü (Gold, Silver, Rose...)</option>
            <option value="GHW">Gold Hardware (GHW)</option>
            <option value="PHW">Palladium / Silver (PHW)</option>
            <option value="RGHW">Rose Gold (RGHW)</option>
            <option value="RUTH">Ruthenium / Black</option>
          </select>
        </div>

        {/* Deri / Malzeme Tipi */}
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">
            Deri & Malzeme Türü
          </label>
          <select
            value={filters.materialType}
            onChange={(e) => handleChange('materialType', e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Tüm Deri Türleri</option>
            <option value="Togo">Hermès Togo</option>
            <option value="Epsom">Hermès Epsom</option>
            <option value="Clemence">Hermès Clémence</option>
            <option value="Caviar">Chanel Caviar</option>
            <option value="Lambskin">Chanel Lambskin</option>
            <option value="Monogram Canvas">LV Monogram Canvas</option>
          </select>
        </div>

        {/* Kondisyon Durumu */}
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Kondisyon</label>
          <select
            value={filters.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Tümü</option>
            <option value="Sıfır / Etiketli">Sıfır / Etiketli (Unworn)</option>
            <option value="Çok İyi (Pristine)">Çok İyi (Pristine)</option>
            <option value="İyi (Good)">İyi (Good)</option>
          </select>
        </div>
      </div>

      {/* Ekstra Kıl Kuyruk Özellikleri */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-neutral-800/60 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white">
          <input
            type="checkbox"
            checked={filters.fullSetOnly}
            onChange={(e) => handleChange('fullSetOnly', e.target.checked)}
            className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-amber-500"
          />
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sadece Full Set (Kutu + Fatura + Toz Torbası)
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white">
          <input
            type="checkbox"
            checked={filters.hasSpaTreatment === true}
            onChange={(e) => handleChange('hasSpaTreatment', e.target.checked ? true : null)}
            className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-amber-500"
          />
          Spa / Profesyonel Bakım Görmüş
        </label>
      </div>
    </div>
  );
};
