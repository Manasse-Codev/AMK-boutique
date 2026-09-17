import React from 'react';
import { FEATURED_BOUQUET, crimsonBrownImg } from '../../data/bouquets';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../services/whatsappService';

export const FeaturedBouquet: React.FC = () => {
  const { addToCart } = useCart();
  const bouquet = FEATURED_BOUQUET;

  const handleAddToCart = () => {
    addToCart({
      bouquetId: bouquet.id,
      name: `${bouquet.name} (30 Roses)`,
      price: bouquet.basePrice,
      image: bouquet.image,
      quantity: 1,
      rosesCount: 30,
      colorName: 'Cramoisi Impérial & Cacao',
    });
  };

  const handleWhatsAppOrder = () => {
    const text =
      `*COMMANDE AMK BOUQUETS*\n\n` +
      `• Modèle : ${bouquet.name}\n` +
      `• Édition : Cramoisi Impérial & Cacao (30 roses)\n` +
      `• Prix : ${formatPrice(bouquet.basePrice)}\n` +
      `• Lieu : Daloa, Côte d'Ivoire\n\n` +
      `Bonjour, je souhaite commander la Pièce Maîtresse « Le Somptueux » avec vous !`;
    window.open(`https://wa.me/2250564889120?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="featured" className="py-24 bg-brand-espresso text-brand-cream overflow-hidden relative">
      
      {/* Background subtle texture watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center font-serif text-[20vw] font-bold select-none text-white whitespace-nowrap">
        AMK ATELIER
      </div>

      <div className="max-w-[1580px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/20 pb-8 mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-brand-caramel font-bold block mb-2">
              Pièce Maîtresse du Mois
            </span>
            <h2 className="font-serif text-title-xl text-white">LE BOUQUET DU MOMENT</h2>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <span className="text-[11px] tracking-widest uppercase text-white/50 block">Édition Limitée</span>
            <span className="font-serif text-2xl text-brand-gold font-bold">Cramoisi Impérial & Cacao</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Large High Fashion Photo */}
          <div className="lg:col-span-7">
            <div className="relative border border-white/20 bg-brand-dark p-3 shadow-2xl">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={crimsonBrownImg}
                  alt="Bouquet de roses en satin Cramoisi Impérial et Ruban Chocolat confectionné à Daloa - AMK Bouquets"
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating tag */}
              <div className="absolute top-8 left-8 bg-brand-caramel text-white text-xs tracking-widest uppercase px-4 py-2 font-semibold shadow-lg">
                Best-seller Événements
              </div>
            </div>
          </div>

          {/* Editorial Specs & Instant Order Box */}
          <div className="lg:col-span-5 space-y-8">
            
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-serif text-4xl md:text-5xl text-white font-normal">
                  {bouquet.name}
                </span>
              </div>
              <p className="font-serif italic text-brand-gold text-lg">
                {bouquet.subtitle}
              </p>
              <div className="mt-4 text-3xl font-serif font-bold text-brand-caramel">
                {formatPrice(bouquet.basePrice)}
                <span className="text-xs text-white/50 font-sans font-normal tracking-wider uppercase block mt-1">
                  Livraison soignée disponible à Daloa
                </span>
              </div>
            </div>

            <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
              {bouquet.detailedDescription}
            </p>

            {/* Specifications list */}
            <div className="border-t border-b border-white/15 py-5 space-y-3 text-xs tracking-wider">
              <div className="flex justify-between">
                <span className="text-white/60">Composition :</span>
                <span className="font-medium text-white">{bouquet.specifications?.composition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Finitions :</span>
                <span className="font-medium text-white">{bouquet.specifications?.finitions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Durabilité :</span>
                <span className="font-medium text-brand-gold">{bouquet.specifications?.durabilite}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Atelier :</span>
                <span className="font-medium text-white">{bouquet.specifications?.atelier}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-brand-caramel hover:bg-brand-amber text-white text-center py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                </svg>
                <span>Commander sur WhatsApp</span>
              </button>
              
              <button
                onClick={handleAddToCart}
                className="border border-white/40 hover:border-white text-white text-center py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300"
              >
                Ajouter au panier
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
