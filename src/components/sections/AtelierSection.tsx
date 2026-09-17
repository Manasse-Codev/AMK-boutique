import React from 'react';
import { flatlayToolsImg } from '../../data/bouquets';
import { DISPLAY_PHONE } from '../../services/whatsappService';

export const AtelierSection: React.FC = () => {
  return (
    <section id="atelier" className="py-24 border-b border-brand-border/70 bg-brand-sand/40">
      <div className="max-w-[1580px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="badge-pill text-brand-caramel font-bold block">Philosophie & Foi</span>
            <h2 className="font-serif text-huge text-brand-espresso leading-[0.88]">
              FAIT AVEC<br />
              <span className="font-serif-italic font-light text-brand-caramel">AMOUR.</span>
            </h2>
            
            <div className="pt-4 border-l-2 border-brand-caramel pl-6">
              <p className="font-serif italic text-xl md:text-2xl text-brand-espresso leading-relaxed">
                « Que tout ce que vous faites se fasse avec amour. »
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-caramel font-bold block mt-2">
                — 1 Corinthiens 16:14
              </span>
            </div>

            <p className="text-sm md:text-base text-brand-charcoal leading-relaxed font-light pt-2">
              Chez AMK Bouquets, cette parole n'est pas un simple slogan : c'est notre éthique de travail quotidienne à Daloa. Du premier ruban découpé au dernier point de fixation, chaque bouton de rose en satin est façonné avec une minutie artisanale sans compromis.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 text-xs tracking-wider">
              <div>
                <span className="font-bold text-brand-espresso block mb-1">Matières Pérennes</span>
                <p className="text-brand-espresso/70 text-[11px]">
                  Un satin lourd qui conserve son éclat, ses plis parfaits et son volume au fil des années.
                </p>
              </div>
              <div>
                <span className="font-bold text-brand-espresso block mb-1">Attachement Local</span>
                <p className="text-brand-espresso/70 text-[11px]">
                  Fièrement ancré à Daloa, au cœur de la Côte d'Ivoire, pour rayonner dans tout le pays.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-brand-border bg-white p-4 shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={flatlayToolsImg}
                  alt="Détail de couture et d'assemblage des rubans de satin"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 bg-brand-cream border-t border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="font-serif font-bold text-lg text-brand-espresso block">
                    Atelier AMK Bouquets
                  </span>
                  <span className="text-xs text-brand-espresso/60">
                    Daloa • Région du Haut-Sassandra, Côte d'Ivoire
                  </span>
                </div>
                <a
                  href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                  className="text-xs font-semibold tracking-widest uppercase bg-brand-espresso text-white px-5 py-2.5 hover:bg-brand-caramel transition-colors"
                >
                  Nous Contacter
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
