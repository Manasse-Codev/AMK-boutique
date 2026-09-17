import React from 'react';
import { DISPLAY_PHONE } from '../../services/whatsappService';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="border-b border-brand-border/60 bg-brand-sand/50 text-[11px] tracking-[0.22em] uppercase py-2.5 px-6 flex justify-between items-center text-brand-espresso/70 select-none">
      <span>Atelier Artisanal • Daloa, Côte d'Ivoire</span>
      <span className="hidden md:inline font-medium text-brand-espresso">
        Créations sur-mesure en ruban de satin haut de gamme
      </span>
      <div className="flex items-center gap-4">
        <span className="text-brand-caramel font-semibold">À partir de 5 000 FCFA</span>
        <span className="text-brand-espresso/40">|</span>
        <a
          href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
          className="hover:text-brand-caramel transition-colors font-medium"
        >
          {DISPLAY_PHONE}
        </a>
      </div>
    </div>
  );
};
