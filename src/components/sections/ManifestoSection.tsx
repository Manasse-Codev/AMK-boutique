import React from 'react';
import { flatlayToolsImg } from '../../data/bouquets';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="py-24 border-b border-brand-border/70 bg-brand-sand/30">
      <div className="max-w-[1580px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <span className="badge-pill text-brand-caramel font-bold block mb-4">
              Notre Manifeste Floral
            </span>
            <h2 className="font-serif text-title-xl text-brand-espresso">
              UNE ATTENTION<br />
              <span className="font-serif-italic font-light">QUI RESTE.</span>
            </h2>
            <div className="w-16 h-0.5 bg-brand-caramel my-6" />
            <p className="text-base md:text-lg text-brand-charcoal leading-relaxed font-light">
              Chaque bouquet est pensé comme un cadeau unique. Des créations faites avec soin pour accompagner les anniversaires, déclarations d'amour, mariages, célébrations et tous les moments précieux de votre vie.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div className="border-l-2 border-brand-espresso pl-4">
                <span className="block text-2xl font-serif font-bold text-brand-espresso">+500</span>
                <span className="text-[11px] tracking-wider uppercase text-brand-espresso/60">
                  Créations façonnées à Daloa
                </span>
              </div>
              <div className="border-l-2 border-brand-caramel pl-4">
                <span className="block text-2xl font-serif font-bold text-brand-caramel">100%</span>
                <span className="text-[11px] tracking-wider uppercase text-brand-espresso/60">
                  Satin confectionné à la main
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-7">
              <div className="relative overflow-hidden border border-brand-border shadow-lg">
                <img
                  src={flatlayToolsImg}
                  alt="Outils d'artisanat, rubans de satin et ciseaux dorés chez AMK Bouquets"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-4 bg-brand-cream border-t border-brand-border flex justify-between text-xs tracking-wider">
                  <span className="font-medium text-brand-espresso">Artisanat du satin & précision</span>
                  <span className="text-brand-caramel font-mono">Daloa, CI</span>
                </div>
              </div>
            </div>
            <div className="sm:col-span-5 sm:-mt-8">
              <div className="bg-brand-espresso text-brand-cream p-7 border border-brand-border shadow-xl">
                <span className="text-[10px] tracking-[0.25em] uppercase text-brand-gold block mb-2">
                  Excellence Florale
                </span>
                <p className="font-serif italic text-lg leading-snug">
                  « Les fleurs fraîches s'éteignent en quelques jours. Nos bouquets de satin scellent l'émotion pour toujours. »
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] tracking-widest uppercase">
                  <span className="text-brand-cream/60">Fondatrice AMK</span>
                  <span className="text-brand-gold font-serif">Atelier Daloa</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
