import React from 'react';
import { DISPLAY_PHONE, WORKSHOP_LOCATION } from '../../services/whatsappService';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-cream pt-20 pb-12 border-t border-brand-charcoal">
      <div className="max-w-[1580px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-brand-caramel flex items-center justify-center bg-brand-caramel/20">
                <span className="font-serif font-bold text-xs text-brand-caramel">AMK</span>
              </div>
              <span className="font-display font-semibold text-lg tracking-[0.25em] text-white">
                AMK BOUQUETS
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-light max-w-sm">
              Maison artisanale de confection de bouquets de roses en satin de luxe. Des attentions durables conçues avec amour à Daloa pour toutes vos occasions heureuses.
            </p>
            <div className="mt-6 text-xs text-brand-gold font-serif italic">
              « Que tout ce que vous faites se fasse avec amour. » — 1 Co 16:14
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-bold block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-white/70">
              <li><a href="/#accueil" className="hover:text-brand-caramel transition-colors">Accueil</a></li>
              <li><a href="/#creations" className="hover:text-brand-caramel transition-colors">Collections Signature</a></li>
              <li><a href="/#featured" className="hover:text-brand-caramel transition-colors">Le Bouquet du Moment</a></li>
              <li><a href="/#sur-mesure" className="hover:text-brand-caramel transition-colors">Créations Sur-Mesure</a></li>
              <li><a href="/#galerie" className="hover:text-brand-caramel transition-colors">Galerie Photo</a></li>
              <li><a href="/#atelier" className="hover:text-brand-caramel transition-colors">L'Atelier de Daloa</a></li>
            </ul>
          </div>

          {/* Contact & Localisation */}
          <div className="md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-bold block mb-4">
              Atelier & Contact
            </span>
            <div className="space-y-3 text-xs tracking-wider text-white/80">
              <p><strong className="text-white font-serif">AMK BOUQUETS</strong></p>
              <p className="text-white/60">{WORKSHOP_LOCATION}, Région du Haut-Sassandra</p>
              <p>
                <span className="text-white/40">WhatsApp / Tel :</span>
                <a
                  href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                  className="text-brand-caramel font-bold hover:underline ml-1"
                >
                  {DISPLAY_PHONE}
                </a>
              </p>
              <p>
                <span className="text-white/40">Tarifs :</span>
                <span className="text-white ml-1">À partir de 5 000 FCFA</span>
              </p>
              <div className="pt-2">
                <span className="inline-block bg-white/10 text-white/80 px-3 py-1 text-[10px] tracking-widest uppercase">
                  Livraison locale & Expéditions nationales
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-widest uppercase text-white/40">
          <div>
            © 2025 AMK BOUQUETS. Tous droits réservés. Daloa, Côte d'Ivoire.
          </div>
          <div className="mt-4 sm:mt-0 font-serif italic text-white/60">
            Haute Façon Florale en Ruban de Satin
          </div>
        </div>

      </div>
    </footer>
  );
};
