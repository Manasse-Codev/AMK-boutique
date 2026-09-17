import React from 'react';
import { crimsonBrownImg, flatlayToolsImg, blushChampagneImg, royalBlueImg } from '../../data/bouquets';
import { buildDirectInquiryWhatsAppUrl } from '../../services/whatsappService';

export const GallerySection: React.FC = () => {
  return (
    <section id="galerie" className="py-24 border-b border-brand-border/70 max-w-[1580px] mx-auto px-6 md:px-12">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-brand-border/60 pb-8">
        <div>
          <span className="badge-pill text-brand-caramel font-bold">Lookbook & Archives</span>
          <h2 className="font-serif text-title-xl text-brand-espresso mt-2">
            QUELQUES CRÉATIONS
          </h2>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-espresso/60">Atelier Daloa</span>
          <span className="block text-sm font-serif italic text-brand-caramel">
            Photographies réelles des réalisations
          </span>
        </div>
      </div>

      {/* Asymmetrical Gallery Grid (editorial photo layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Photo 1: Big Vertical Crimson Bouquet (Col 4) */}
        <div className="md:col-span-4 group">
          <div className="relative overflow-hidden border border-brand-border aspect-[3/4] bg-brand-sand">
            <img
              src={crimsonBrownImg}
              alt="Bouquet en satin cramoisi et chocolat"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-brand-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs tracking-widest uppercase font-serif">
                Crimson & Cacao Monogramme
              </span>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-xs tracking-wider">
            <span className="font-serif text-brand-espresso font-medium">BOUQUET N°018</span>
            <span className="text-brand-caramel font-bold">16 000 FCFA</span>
          </div>
        </div>

        {/* Center Staggered Stack: Ribbon details + Horizontal layout (Col 5) */}
        <div className="md:col-span-5 space-y-8">
          <div className="group">
            <div className="relative overflow-hidden border border-brand-border aspect-[16/9] bg-brand-sand">
              <img
                src={flatlayToolsImg}
                alt="Matières de satin, rubans et ciseaux de créateur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="mt-3 flex justify-between text-xs tracking-wider">
              <span className="font-serif text-brand-espresso font-medium">L'ART DU RUBAN & DES PERLES</span>
              <span className="text-brand-espresso/60 uppercase">Détails d'atelier</span>
            </div>
          </div>

          <div className="group">
            <div className="relative overflow-hidden border border-brand-border aspect-square bg-brand-sand">
              <img
                src={blushChampagneImg}
                alt="Bouquet de roses satin rose et champagne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="mt-3 flex justify-between text-xs tracking-wider">
              <span className="font-serif text-brand-espresso font-medium">BOUQUET N°007 • DOUCEUR</span>
              <span className="text-brand-caramel font-bold">12 000 FCFA</span>
            </div>
          </div>
        </div>

        {/* Photo 3: Royal Blue Bouquet with tall composition (Col 3) */}
        <div className="md:col-span-3 group">
          <div className="relative overflow-hidden border border-brand-border aspect-[4/5] bg-brand-sand">
            <img
              src={royalBlueImg}
              alt="Bouquet royal bleu et or"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-brand-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs tracking-widest uppercase font-serif">
                Bleu Impérial & Feuilles d'Or
              </span>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-xs tracking-wider">
            <span className="font-serif text-brand-espresso font-medium">BOUQUET N°024</span>
            <span className="text-brand-caramel font-bold">15 000 FCFA</span>
          </div>

          {/* Editorial note box */}
          <div className="mt-8 border border-brand-border bg-brand-sand/50 p-6 text-center">
            <span className="font-serif italic text-sm text-brand-espresso block mb-1">
              Envie d'une composition inédite ?
            </span>
            <p className="text-[11px] text-brand-espresso/60 mb-4">
              Envoyez-nous votre photo d'inspiration sur WhatsApp.
            </p>
            <a
              href={buildDirectInquiryWhatsAppUrl('Photo d\'inspiration personnalisée')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-brand-caramel text-brand-caramel text-xs font-semibold tracking-wider uppercase hover:text-brand-espresso transition-colors"
            >
              Envoyer une photo &rarr;
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
