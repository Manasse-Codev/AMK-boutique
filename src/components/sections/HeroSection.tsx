import React from 'react';
import { bouquetBleuPapillonsImg } from '../../data/bouquets';
import { buildDirectInquiryWhatsAppUrl } from '../../services/whatsappService';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-brand-border/70 pt-8 pb-14 px-6 md:px-12 max-w-[1580px] mx-auto"
    >
      {/* Editorial Tagline Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 border-b border-brand-border/40 pb-6">
        <div className="md:col-span-3">
          <span className="badge-pill px-3 py-1 bg-brand-sand border border-brand-border text-brand-espresso font-semibold inline-block">
            Édition 2025
          </span>
          <p className="text-xs text-brand-espresso/60 tracking-wider mt-3">
            Maison artisanale fondée en Côte d'Ivoire. Chaque pétale plié à la main avec précision.
          </p>
        </div>
        <div className="md:col-span-6 text-center md:text-left">
          <p className="text-sm md:text-base font-serif italic text-brand-caramel">
            « Des créations élégantes et personnalisées pour offrir une attention unique et durable à vos proches. »
          </p>
        </div>
        <div className="md:col-span-3 text-right">
          <div className="inline-flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-espresso/50">
              Gamme de Prix
            </span>
            <span className="text-xl md:text-2xl font-serif font-bold text-brand-espresso">
              À PARTIR DE 5 000 FCFA
            </span>
          </div>
        </div>
      </div>

      {/* Monumental Typography & Asymmetric Image Showcase */}
      <div className="my-auto py-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Editorial Giant Headline */}
        <div className="lg:col-span-8 z-10">
          <h1 className="font-serif text-huge text-brand-espresso font-normal leading-[0.86]">
            DES BOUQUETS<br />
            <span className="font-serif-italic font-light text-brand-caramel">FAITS AVEC</span><br />
            <span className="stroke-text hover:text-brand-espresso transition-all duration-500 cursor-default">
              AMOUR.
            </span>
          </h1>

          {/* Supporting Editorial Details & CTAs */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row sm:items-center gap-5 md:gap-8 max-w-xl">
            <a
              href="#creations"
              className="inline-flex items-center justify-center gap-3 bg-brand-espresso text-brand-cream px-8 py-4 text-xs tracking-[0.22em] uppercase font-semibold hover:bg-brand-caramel transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <span>Découvrir les bouquets</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href={buildDirectInquiryWhatsAppUrl('Commande sur-mesure')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-bold text-brand-espresso hover:text-brand-caramel transition-colors group"
            >
              <span className="w-8 h-8 rounded-full border border-brand-espresso/30 flex items-center justify-center group-hover:border-brand-caramel group-hover:bg-brand-caramel/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                </svg>
              </span>
              <span>Commander sur WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Asymmetrical Floating Editorial Visual Composition */}
        <div className="lg:col-span-4 relative mt-6 lg:mt-0">
          {/* Main Hero Card: Royal Blue Bouquet with Shimmering Gold */}
          <div className="relative group cursor-pointer overflow-hidden border border-brand-border bg-brand-sand/60 p-3 shadow-2xl">
            <div className="relative overflow-hidden aspect-[4/5] bg-brand-sand">
              <img
                src={bouquetBleuPapillonsImg}
                alt="Bouquet de roses en ruban de satin Bleu Royal et Papillons d'Or fait main à Daloa - AMK Bouquets"
                loading="eager"
                fetchPriority="high"
                width="800"
                height="1000"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-brand-espresso/90 text-brand-cream text-[10px] tracking-[0.2em] uppercase px-3 py-1 backdrop-blur-sm">
                Collection Royale
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 text-brand-espresso text-[11px] font-serif font-bold px-3 py-1.5 shadow-md">
                Bleu Majesté & Papillons d'Or
              </div>
            </div>
            <div className="pt-3 pb-1 flex justify-between items-center text-xs tracking-wider">
              <span className="font-serif italic text-brand-espresso/70">
                Ruban satin impérial & perles dorées
              </span>
              <span className="text-brand-caramel font-semibold">Daloa Atelier</span>
            </div>
          </div>

          {/* Overlapping Mini Badge (Duck Spot sticker layout) */}
          <div className="absolute -bottom-8 -left-10 hidden sm:flex items-center gap-3 bg-brand-cream border border-brand-border p-3 shadow-xl max-w-[240px]">
            <div className="w-10 h-10 rounded-full bg-brand-caramel text-white flex items-center justify-center font-bold text-xs shrink-0">
              100%
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-brand-espresso block">Fait Main & Éternel</span>
              <span className="text-brand-espresso/60 text-[10px]">Ne fane jamais. Souvenir impérissable.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Hero Bottom Architectural Info Bar */}
      <div className="border-t border-brand-border/60 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs tracking-[0.18em] uppercase text-brand-espresso/70">
        <div>
          <span className="text-brand-caramel font-bold block mb-1">01 / Matières</span>
          <span className="text-[11px]">Satin soyeux de première qualité</span>
        </div>
        <div>
          <span className="text-brand-caramel font-bold block mb-1">02 / Savoir-Faire</span>
          <span className="text-[11px]">Confection artisanale sur-mesure</span>
        </div>
        <div>
          <span className="text-brand-caramel font-bold block mb-1">03 / Localisation</span>
          <span className="text-[11px]">Atelier à Daloa, Côte d'Ivoire</span>
        </div>
        <div>
          <span className="text-brand-caramel font-bold block mb-1">04 / Personnalisation</span>
          <span className="text-[11px]">Couleurs, mots doux & décorations</span>
        </div>
      </div>

    </section>
  );
};
