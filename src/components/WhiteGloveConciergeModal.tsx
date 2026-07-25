'use client';

import React, { useState } from 'react';
import { Crown, Sparkles, Shield, PhoneCall, Building2, CheckCircle2 } from 'lucide-react';

interface WhiteGloveConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhiteGloveConciergeModal: React.FC<WhiteGloveConciergeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [serviceType, setServiceType] = useState<'valet' | 'private_showroom' | 'horologist'>('private_showroom');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-neutral-950 border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full text-amber-50 shadow-2xl relative">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Crown className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold font-serif">Peony Black Label VIP Concierge</h2>
        </div>
        <p className="text-xs text-neutral-400 mb-4">
          Ultra lüks saat ve çanta koleksiyoncuları için özel zırhlı kurye, showroom randevusu ve özel uzman danışmanlığı.
        </p>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-amber-200">Talebiniz Alındı</h3>
            <p className="text-xs text-neutral-300 mt-2">
              Özel VIP Temsilciniz 15 dakika içerisinde sizinle iletişime geçecektir.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-6 py-2.5 rounded-lg"
            >
              Kapat
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1.5">Hizmet Türü</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('private_showroom')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    serviceType === 'private_showroom'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1" />
                  Showroom Randevusu
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('valet')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    serviceType === 'valet'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <Shield className="w-4 h-4 mx-auto mb-1" />
                  Zırhlı Kurye Teslimat
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('horologist')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    serviceType === 'horologist'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mx-auto mb-1" />
                  Saat/Çanta Uzmanı
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Ad Soyad / Şirket Unvanı</label>
              <input
                type="text"
                placeholder="Örn: Rahmi Bey / VIP"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Direkt Telefon / WhatsApp</label>
              <input
                type="tel"
                placeholder="+90 532 ..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-neutral-900 border border-neutral-800 text-neutral-400 py-2.5 rounded-lg hover:text-white"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-1 hover:brightness-110"
              >
                <PhoneCall className="w-4 h-4" /> VIP Randevu Oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
