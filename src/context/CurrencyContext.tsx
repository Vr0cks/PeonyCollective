'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'TRY' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInTRY: number) => string;
  exchangeRates: Record<Currency, number>; // Base: TRY
}

const DEFAULT_RATES: Record<Currency, number> = {
  TRY: 1,
  USD: 0.026, // 1 TRY = 0.026 USD (~38.5 TRY / USD)
  EUR: 0.024, // 1 TRY = 0.024 EUR (~41.5 TRY / EUR)
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('TRY');

  const formatPrice = (amountInTRY: number): string => {
    const converted = amountInTRY * DEFAULT_RATES[currency];

    switch (currency) {
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(converted);
      case 'EUR':
        return new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(converted);
      case 'TRY':
      default:
        return new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: 'TRY',
          maximumFractionDigits: 0,
        }).format(converted);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        exchangeRates: DEFAULT_RATES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
