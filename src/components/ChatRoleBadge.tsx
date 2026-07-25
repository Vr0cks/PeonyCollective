'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Crown } from 'lucide-react';

export type UserRole = 'admin' | 'lab_authenticator' | 'seller' | 'buyer';

interface ChatRoleBadgeProps {
  role: UserRole;
  name: string;
}

export const ChatRoleBadge: React.FC<ChatRoleBadgeProps> = ({ role, name }) => {
  switch (role) {
    case 'admin':
    case 'lab_authenticator':
      return (
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 text-xs px-2.5 py-1 rounded-full font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>{name}</span>
          <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold uppercase ml-1">
            Peony Lab Yetkilisi
          </span>
        </div>
      );
    case 'seller':
      return (
        <div className="inline-flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-2.5 py-1 rounded-full font-medium">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{name}</span>
          <span className="text-[10px] text-neutral-400 font-mono">(Onaylı Satıcı)</span>
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center gap-1 text-neutral-300 text-xs font-medium">
          <span>{name}</span>
        </div>
      );
  }
};
