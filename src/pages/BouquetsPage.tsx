import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { Toast } from '../components/ui/Toast';
import { BOUQUETS_CATALOG } from '../data/bouquets';
import { formatPrice, buildDirectInquiryWhatsAppUrl } from '../services/whatsappService';
import { useCart } from '../hooks/useCart';
import { usePageSEO } from '../hooks/usePageSEO';

export const BouquetsPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  usePageSEO({
    title: "Catalogue Bouquets en Satin — Créations Éternelles dès 5 000 FCFA | AMK Bouquets",
    description: "Explorez notre collection complète de bouquets de roses en satin : gammes Signature, coffrets cadeaux, sur-mesure et bouquets de cérémonie confectionnés à Daloa.",
    canonicalPath: "/bouquets",
  });

  const categories = [
    { id: 'all', label: 'Toutes les Créations' },
    { id: 'signature', label: 'Signature Satin' },
    { id: 'sur-mesure', label: 'Sur-Mesure' },
    { id: 'cadeaux', label: 'Coffrets Cadeaux' },
    { id: 'peluches', label: 'Avec Peluches' },
    { id: 'romantique', label: 'Romantique & Cérémonies' },
  ];

  const filteredBouquets = selectedCategory === 'all'
    ? BOUQUETS_CATALOG
    : BOUQUETS_CATALOG.filter((b) => b.category === selectedCategory);

  const handleAddToCart = (bouquet: (typeof BOUQUETS_CATALOG)[0]) => {
    const defaultSize = bouquet.sizes[0] || { roses: 20, price: bouquet.startingPrice };
    addToCart({
      bouquetId: bouquet.id,
      name: bouquet.name,
      price: defaultSize.price || bouquet.startingPrice,
      image: bouquet.image,
      quantity: 1,
      rosesCount: defaultSize.roses,
      colorName: bouquet.availableColors[0]?.name || 'Nuance Classique',
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-espresso">
      <AnnouncementBar />
      <Header />

      <main className="max-w-[1580px] mx-auto px-6 md:px-12 py-16">
        {/* Page Header */}
        <div className="border-b border-brand-border/70 pb-10 mb-12">
          <span className="badge-pill text-brand-caramel font-bold block mb-3">
            Atelier AMK Bouquets • Daloa
          </span>
          <h1 className="font-serif text-huge text-brand-espresso leading-none">
            CATALOGUE COMPLET
          </h1>
          <p className="text-sm md:text-base text-brand-charcoal/70 mt-4 max-w-xl font-light">
            Découvrez nos bouquets de satin façonnés un à un à la main. Choisissez votre modèle ou demandez une personnalisation intégrale.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs uppercase tracking-[0.16em] px-5 py-2.5 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-espresso text-brand-cream font-semibold shadow-sm'
                    : 'bg-brand-sand/60 text-brand-espresso hover:bg-brand-sand border border-brand-border/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBouquets.map((b) => (
            <div
              key={b.id}
              className="group border border-brand-border bg-brand-sand/20 hover:bg-brand-cream hover:border-brand-espresso transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center text-xs tracking-widest text-brand-espresso/60 mb-3">
                  <span className="text-brand-caramel font-mono font-bold">{b.collectionCode}</span>
                  <span className="font-semibold text-brand-espresso">Dès {formatPrice(b.startingPrice)}</span>
                </div>

                <div className="relative aspect-square overflow-hidden bg-brand-sand mb-5">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {b.badge && (
                    <div className="absolute bottom-3 left-3 bg-brand-espresso/90 text-white text-[10px] tracking-widest uppercase px-3 py-1 backdrop-blur-sm">
                      {b.badge}
                    </div>
                  )}
                </div>

                <h2 className="font-serif text-2xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                  {b.name}
                </h2>
                <p className="text-xs text-brand-charcoal/70 mt-2 line-clamp-3 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(b)}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-white bg-brand-espresso hover:bg-brand-caramel py-2.5 px-3 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Ajouter au panier</span>
                  </button>
                  <a
                    href={buildDirectInquiryWhatsAppUrl(b.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-espresso flex items-center justify-center hover:bg-brand-caramel hover:border-brand-caramel hover:text-white transition-all shrink-0"
                    aria-label="Commander sur WhatsApp"
                    title="Commander sur WhatsApp"
                  >
                    <svg className="w-4 h-4 -rotate-45 hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-0.5">
                  <Link
                    to={`/bouquets/${b.slug}`}
                    className="uppercase tracking-[0.16em] font-medium text-brand-caramel hover:underline"
                  >
                    Détails & Tailles &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};
