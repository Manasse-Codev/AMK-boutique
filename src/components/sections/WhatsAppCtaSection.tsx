import React from 'react';
import { DISPLAY_PHONE, buildDirectInquiryWhatsAppUrl } from '../../services/whatsappService';

export const WhatsAppCtaSection: React.FC = () => {
  return (
    <section className="py-28 bg-brand-sand text-brand-espresso border-b border-brand-border/70 relative overflow-hidden">
      
      <div className="max-w-[1580px] mx-auto px-6 md:px-12 text-center relative z-10">
        
        <span className="badge-pill px-4 py-1.5 bg-brand-cream border border-brand-border text-brand-espresso font-semibold inline-block mb-6">
          Commande Directe & Réactive
        </span>

        <h2 className="font-serif text-title-xl text-brand-espresso max-w-4xl mx-auto leading-[0.92]">
          VOTRE PROCHAIN BOUQUET<br />
          <span className="font-serif-italic font-light text-brand-caramel">COMMENCE ICI.</span>
        </h2>

        <p className="text-sm md:text-lg text-brand-espresso/75 max-w-2xl mx-auto mt-6 font-light">
          Discutez directement avec notre artisane sur WhatsApp pour choisir vos nuances, convenir de la date et valider votre livraison à Daloa ou partout en Côte d'Ivoire.
        </p>

        {/* Direct Phone & WhatsApp Callouts */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={buildDirectInquiryWhatsAppUrl("Commande d'un bouquet en satin")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-caramel hover:bg-brand-amber text-white px-10 py-5 text-xs font-bold tracking-[0.22em] uppercase transition duration-300 shadow-xl hover:shadow-2xl"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
            </svg>
            <span>COMMANDER SUR WHATSAPP</span>
          </a>

          <a
            href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-brand-espresso px-8 py-5 text-xs font-bold tracking-[0.2em] uppercase text-brand-espresso hover:bg-brand-espresso hover:text-white transition duration-300"
          >
            <span>APPELER : {DISPLAY_PHONE}</span>
          </a>
        </div>

        {/* Quick WhatsApp Format Generator preview */}
        <div className="mt-14 max-w-xl mx-auto bg-brand-cream border border-brand-border p-6 text-left shadow-sm">
          <span className="text-[10px] uppercase tracking-widest text-brand-caramel font-bold block mb-2">
            Modèle de message instantané :
          </span>
          <pre className="text-xs text-brand-espresso/80 font-mono whitespace-pre-wrap bg-brand-sand/50 p-4 border border-brand-border/60">
Nom : [Votre Nom]
Bouquet choisi : [Modèle ou Sur-Mesure]
Quantité : 1
Budget : 15 000 FCFA
Date souhaitée : [Date de remise]
Lieu : Daloa (ou expédition)
Mot doux : [Votre message pour le ruban]</pre>
        </div>

      </div>
    </section>
  );
};
