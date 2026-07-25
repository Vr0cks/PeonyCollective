'use client';

import React from 'react';
import { PackageCheck, ShieldCheck, Banknote, Clock, CheckCircle2 } from 'lucide-react';

export type PayoutStatus = 'order_placed' | 'in_transit_to_lab' | 'lab_inspecting' | 'lab_approved' | 'payout_transferred';

interface SellerPayoutTrackerProps {
  currentStatus: PayoutStatus;
  orderId: string;
  expectedPayoutAmount: number;
  expectedPayoutDate?: string;
}

export const SellerPayoutTracker: React.FC<SellerPayoutTrackerProps> = ({
  currentStatus,
  orderId,
  expectedPayoutAmount,
  expectedPayoutDate = 'Lab Onayından Sonra 24 Saat İçinde',
}) => {
  const steps = [
    { id: 'order_placed', label: 'Sipariş Verildi', icon: Clock },
    { id: 'in_transit_to_lab', label: 'Lab Yolda', icon: PackageCheck },
    { id: 'lab_inspecting', label: 'Entrupy / Lab İncelemede', icon: ShieldCheck },
    { id: 'lab_approved', label: 'Akredite Edildi', icon: CheckCircle2 },
    { id: 'payout_transferred', label: 'IBAN Hakediş Yatırıldı', icon: Banknote },
  ];

  const getStepIndex = (status: PayoutStatus) => {
    return steps.findIndex((s) => s.id === status);
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-neutral-200">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-4 text-xs">
        <div>
          <span className="text-neutral-400">Sipariş No:</span>{' '}
          <span className="font-mono text-amber-400 font-bold">{orderId}</span>
        </div>
        <div className="text-right">
          <span className="text-neutral-400">Hesaba Yatacak Tutar:</span>{' '}
          <span className="text-emerald-400 font-bold text-sm">
            {expectedPayoutAmount.toLocaleString('tr-TR')} TL
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-between my-6">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'bg-amber-500 border-amber-400 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-500'
                } ${isCurrent ? 'ring-4 ring-amber-500/30 scale-110' : ''}`}
              >
                <StepIcon className="w-5 h-5" />
              </div>
              <span
                className={`text-[11px] mt-2 font-medium max-w-[80px] text-center ${
                  isDone ? 'text-amber-200' : 'text-neutral-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-800/80 text-xs text-neutral-400 flex items-center justify-between">
        <span>Hakediş Ödeme Takvimi:</span>
        <span className="text-amber-300 font-medium">{expectedPayoutDate}</span>
      </div>
    </div>
  );
};
