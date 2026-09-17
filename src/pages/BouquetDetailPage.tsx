import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BOUQUETS_CATALOG } from '../data/bouquets';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { Toast } from '../components/ui/Toast';
import { useCart } from '../hooks/useCart';
import { usePageSEO } from '../hooks/usePageSEO';
import { buildConfiguredOrderWhatsAppUrl, formatPrice } from '../services/whatsappService';
import type { Bouquet } from '../types';

export const BouquetDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const bouquet = BOUQUETS_CATALOG.find((b) => b.slug === slug);

  if (!bouquet) {
    return <Navigate to="/bouquets" replace />;
  }

  return <BouquetDetailContent bouquet={bouquet} />;
};

const BouquetDetailContent: React.FC<{ bouquet: Bouquet }> = ({ bouquet }) => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState<string>(bouquet.image);
  const [selectedColor, setSelectedColor] = useState<string>(bouquet.availableColors[0]?.name || 'Nuance Classique');
  const [selectedSize, setSelectedSize] = useState(bouquet.sizes[1] || bouquet.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [customMessage, setCustomMessage] = useState<string>('');

  const unitPrice = selectedSize.price;
  const totalPrice = unitPrice * quantity;

  // Schema.org Product structured data for Google Shopping / Rich Snippets
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bouquet.name,
    description: bouquet.detailedDescription || bouquet.description,
    image: bouquet.image.startsWith('http') ? bouquet.image : `https://amk-bouquets.ci${bouquet.image}`,
    sku: bouquet.id,
    category: bouquet.category,
    brand: {
      '@type': 'Brand',
      name: 'AMK Bouquets',
    },
    offers: {
      '@type': 'Offer',
      price: unitPrice,
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock',
      url: `https://amk-bouquets.ci/bouquets/${bouquet.slug}`,
      priceValidUntil: '2027-12-31',
      seller: {
        '@type': 'Organization',
        name: 'AMK Bouquets Daloa',
      },
    },
  };

  usePageSEO({
    title: `${bouquet.name} — Bouquet en Satin Haut de Gamme | AMK Bouquets Daloa`,
    description: `${bouquet.description} Confectionné à la main à Daloa dès ${formatPrice(bouquet.startingPrice)}. Personnalisation couleur & ruban disponible.`,
    canonicalPath: `/bouquets/${bouquet.slug}`,
    ogImage: activeImage,
    schemaData: productSchema,
  });

  const handleAddToCart = () => {
    addToCart({
      bouquetId: bouquet.id,
      name: bouquet.name,
      price: unitPrice,
      image: activeImage,
      quantity: quantity,
      rosesCount: selectedSize.roses,
      colorName: selectedColor,
      customRibbonText: customMessage.trim() || undefined,
    });
  };

  const handleWhatsAppOrder = () => {
    const url = buildConfiguredOrderWhatsAppUrl({
      name: bouquet.name,
      rosesCount: selectedSize.roses,
      quantity: quantity,
      total: totalPrice,
      colorName: selectedColor,
      customMessage: customMessage,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-espresso">
      <AnnouncementBar />
      <Header />

      <main className="max-w-[1580px] mx-auto px-6 md:px-12 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-[0.2em] text-brand-espresso/60 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-brand-caramel">Accueil</Link>
          <span>/</span>
          <Link to="/bouquets" className="hover:text-brand-caramel">Créations</Link>
          <span>/</span>
          <span className="text-brand-espresso font-semibold">{bouquet.name}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Visual Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] border border-brand-border bg-brand-sand overflow-hidden shadow-sm">
              <img
                src={activeImage}
                alt={bouquet.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {bouquet.badge && (
                <div className="absolute top-4 left-4 bg-brand-espresso text-white text-[10px] tracking-widest uppercase px-3 py-1">
                  {bouquet.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {bouquet.images.length > 1 && (
              <div className="flex gap-3">
                {bouquet.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 border p-1 bg-white focus:outline-none transition-all ${
                      activeImage === img
                        ? 'border-2 border-brand-caramel ring-2 ring-brand-caramel/20'
                        : 'border-brand-border hover:border-brand-caramel'
                    }`}
                    aria-label={`Vue ${idx + 1}`}
                  >
                    <img src={img} alt={`Miniature ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Information & Configurator */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="badge-pill text-brand-caramel font-bold block mb-2">
                {bouquet.collectionCode}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-espresso font-normal">
                {bouquet.name}
              </h1>
              {bouquet.subtitle && (
                <p className="font-serif italic text-brand-gold text-lg mt-1">
                  {bouquet.subtitle}
                </p>
              )}

              <div className="mt-5 border-y border-brand-border/80 py-4 flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-3xl font-bold text-brand-espresso">
                    {formatPrice(unitPrice)}
                  </span>
                  <span className="text-[11px] text-brand-espresso/60 block mt-0.5">
                    {quantity > 1 ? `Sous-total (${quantity} bouquets) : ${formatPrice(totalPrice)}` : 'Prix de confection'}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-brand-caramel font-semibold">
                  Atelier Daloa
                </span>
              </div>

              <p className="text-sm text-brand-charcoal/80 mt-6 leading-relaxed font-light">
                {bouquet.detailedDescription || bouquet.description}
              </p>

              {/* Color Options */}
              <div className="mt-8">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-3">
                  Palette de Couleurs : <span className="text-brand-caramel font-serif lowercase italic">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {bouquet.availableColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.name);
                        setActiveImage(color.image);
                      }}
                      className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors ${
                        selectedColor === color.name
                          ? 'border border-brand-caramel bg-brand-espresso text-white'
                          : 'border border-brand-border bg-white text-brand-espresso hover:border-brand-espresso'
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rose Count / Size Selection */}
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-3">
                  Composition & Nombre de Roses :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bouquet.sizes.map((size) => (
                    <button
                      key={size.roses}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 text-left border text-xs transition-all ${
                        selectedSize.roses === size.roses
                          ? 'border-brand-caramel bg-brand-sand/50 ring-1 ring-brand-caramel'
                          : 'border-brand-border bg-white hover:border-brand-espresso'
                      }`}
                    >
                      <span className="font-semibold text-brand-espresso block">{size.label}</span>
                      <span className="text-brand-caramel font-mono font-bold mt-1 block">
                        {formatPrice(size.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Ribbon Message */}
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                  Message personnalisé sur le ruban ou carte de vœux :
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Ex: Pour la plus belle, Joyeux Anniversaire..."
                  className="w-full bg-white border border-brand-border text-xs px-4 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                />
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso">
                  Quantité :
                </span>
                <div className="flex border border-brand-border bg-white h-10 w-32">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 hover:bg-brand-sand font-bold text-brand-espresso flex items-center justify-center"
                    aria-label="Moins"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-full text-center text-xs font-bold text-brand-espresso bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 hover:bg-brand-sand font-bold text-brand-espresso flex items-center justify-center"
                    aria-label="Plus"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-brand-border space-y-3">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-brand-caramel hover:bg-brand-amber text-white py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                  </svg>
                  <span>Commander sur WhatsApp (+225 05 64 88 91 20)</span>
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="border border-brand-espresso hover:bg-brand-espresso hover:text-white text-brand-espresso py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>

              {/* Workshop Specifications */}
              {bouquet.specifications && (
                <div className="mt-8 bg-brand-sand/40 border border-brand-border/60 p-5 text-xs space-y-2">
                  <span className="font-serif font-bold text-sm text-brand-espresso block mb-3">
                    Spécifications d'Atelier
                  </span>
                  <div className="flex justify-between py-1 border-b border-brand-border/40">
                    <span className="text-brand-espresso/60">Composition :</span>
                    <span className="font-medium text-brand-espresso">{bouquet.specifications.composition}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-brand-border/40">
                    <span className="text-brand-espresso/60">Finitions :</span>
                    <span className="font-medium text-brand-espresso">{bouquet.specifications.finitions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-brand-border/40">
                    <span className="text-brand-espresso/60">Durabilité :</span>
                    <span className="font-medium text-brand-gold">{bouquet.specifications.durabilite}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-espresso/60">Atelier :</span>
                    <span className="font-medium text-brand-espresso">{bouquet.specifications.atelier}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};
