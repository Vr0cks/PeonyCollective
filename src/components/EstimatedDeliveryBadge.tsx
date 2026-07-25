'use client';

import React from 'react';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

interface EstimatedDeliveryBadgeProps {
  labLocation?: string;
  isPeonyVip?: boolean;
}

export const EstimatedDeliveryBadge: React.FC<EstimatedDeliveryBadgeProps> = ({
  labLocation = 'İstanbul Lüks İnceleme Laboratuvarı',
  isPeonyVip = false,
}) => {
  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 my-3 text-xs text-neutral-300">
      <div className="flex items-center gap-2 font-medium text-amber-300 mb-2">
        <Clock className="w-4 h-4 text-amber-400" />
        <span>Tahmini İnceleme & Teslimat Süreci</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center my-2">
        <div className="bg-neutral-800/60 p-2 rounded-lg border border-neutral-700/50">
          <div className="text-amber-400 font-bold">1. Adım</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Satıcı → Lab (24 saat)</div>
        </div>
        <div className="bg-neutral-800/60 p-2 rounded-lg border border-amber-500/30">
          <div className="text-emerald-400 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Entrupy AI
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Fiziksel İnceleme (1 İş Günü)</div>
        </div>
        <div className="bg-neutral-800/60 p-2 rounded-lg border border-neutral-700/50">
          <div className="text-amber-400 font-bold flex items-center justify-center gap-1">
            <Truck className="w-3 h-3" /> Alıcı Kurye
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Sigortalı Teslimat (24-48 Saat)</div>
        </div>
      </div>

      <p className="text-[11px] text-neutral-400 text-center mt-2 italic">
        * Tüm ürünler {labLocation} bünyesinde 3 boyutlu mikroskop ve Entrupy AI yapay zekası ile
        doğrulanır. Akredite edilmeden ödeme satıcıya aktarılmaz.
      </p>
    </div>
  );
};
