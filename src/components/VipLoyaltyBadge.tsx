'use client';

import React from 'react';
import { Crown, Sparkles, Zap, Award } from 'lucide-react';

export type LoyaltyTier = 'Silver' | 'Gold' | 'Platinum' | 'Black Label';

interface VipLoyaltyBadgeProps {
  salesCount: number;
  totalVolumeTL?: number;
}

export const calculateVipTier = (salesCount: number, volume: number = 0): {
  tier: LoyaltyTier;
  commissionRate: number;
  perks: string[];
} => {
  if (salesCount >= 15 || volume >= 1000000) {
    return {
      tier: 'Black Label',
      commissionRate: 5,
      perks: ['%5 Özel Komisyon Oranı', 'Zırhlı Kurye Ücretsiz VIP Teslimat', 'Öncelikli Lab İnceleme (4 Saat)'],
    };
  }
  if (salesCount >= 8 || volume >= 500000) {
    return {
      tier: 'Platinum',
      commissionRate: 8,
      perks: ['%8 İndirimli Komisyon', 'Öncelikli Drop Bildirimleri', '7/24 Özel Temsilci'],
    };
  }
  if (salesCount >= 3 || volume >= 150000) {
    return {
      tier: 'Gold',
      commissionRate: 10,
      perks: ['%10 Standart Komisyon', 'Ücretsiz Kargo', 'Erken Drop Erişimi'],
    };
  }
  return {
    tier: 'Silver',
    commissionRate: 12,
    perks: ['%12 Komisyon Oranı', 'Doğrulanmış Üyelik Rozeti'],
  };
};

export const VipLoyaltyBadge: React.FC<VipLoyaltyBadgeProps> = ({ salesCount, totalVolumeTL = 0 }) => {
  const { tier, commissionRate, perks } = calculateVipTier(salesCount, totalVolumeTL);

  const getTierColor = () => {
    switch (tier) {
      case 'Black Label':
        return 'from-amber-400 via-neutral-900 to-black text-amber-300 border-amber-500/50';
      case 'Platinum':
        return 'from-slate-300 to-slate-500 text-slate-100 border-slate-400';
      case 'Gold':
        return 'from-amber-500 to-yellow-600 text-amber-100 border-amber-400';
      case 'Silver':
      default:
        return 'from-neutral-700 to-neutral-800 text-neutral-300 border-neutral-600';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getTierColor()} border rounded-xl p-4 text-xs shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 font-bold text-sm">
          <Crown className="w-4 h-4" />
          <span>{tier} Kulüp Üyesi</span>
        </div>
        <span className="bg-black/40 px-2 py-0.5 rounded text-[11px] font-mono">
          Komisyon: %{commissionRate}
        </span>
      </div>

      <div className="space-y-1 mt-3 pt-2 border-t border-white/10">
        <div className="text-[11px] text-neutral-300 font-semibold mb-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" /> Üyelik Ayrıcalıkları:
        </div>
        {perks.map((perk, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
            <Award className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>{perk}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
