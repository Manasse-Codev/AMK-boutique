import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOUQUETS_CATALOG } from '../../data/bouquets';
import { buildDirectInquiryWhatsAppUrl, formatPrice } from '../../services/whatsappService';
import { useCart } from '../../hooks/useCart';

export const CollectionsGrid: React.FC = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const b1 = BOUQUETS_CATALOG[0]; // Bouquet simple
  const b2 = BOUQUETS_CATALOG[1]; // Bouquet avec papillon / couronne
  const b3 = BOUQUETS_CATALOG[2]; // Bouquet avec 2 couleurs
  const b4 = BOUQUETS_CATALOG[3]; // Bouquet avec paillettes
  const b5 = BOUQUETS_CATALOG[4]; // Bouquet avec nounours
  const b6 = BOUQUETS_CATALOG[5]; // Bouquet avec chocolats

  const handleAddToCart = (bouquet: (typeof BOUQUETS_CATALOG)[0]) => {
    const defaultSize = bouquet.sizes[0] || { roses: 12, price: bouquet.startingPrice };
    addToCart({
      bouquetId: bouquet.id,
      name: bouquet.name,
      price: defaultSize.price || bouquet.startingPrice,
      image: bouquet.image,
      quantity: 1,
      rosesCount: defaultSize.roses,
      colorName: bouquet.availableColors[0]?.name || 'Nuance Classique',
      selectedOptions: bouquet.availableOptions,
    });
    setAddedId(bouquet.id);
    setTimeout(() => {
      setAddedId((current) => (current === bouquet.id ? null : current));
    }, 1800);
  };

  return (
    <section id="creations" className="py-24 border-b border-brand-border/70 max-w-[1580px] mx-auto px-6 md:px-12">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-brand-border/60 pb-8">
        <div>
          <span className="badge-pill text-brand-caramel font-bold">Catalogue Curaté</span>
          <h2 className="font-serif text-title-xl text-brand-espresso mt-2">
            NOS CRÉATIONS
          </h2>
        </div>
        <p className="text-sm md:text-base text-brand-espresso/60 max-w-md mt-4 md:mt-0 font-light">
          Chaque collection incarne une intention particulière. Des compositions audacieuses aux teintes harmonieuses, conçues pour marquer les mémoires.
        </p>
      </div>

      {/* Editorial Product Grid with alternating proportions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        {/* 01 - BOUQUET SIMPLE (Large Featured Card - Col 7) */}
        <div className="md:col-span-7 group flex flex-col justify-between border border-brand-border bg-brand-cream p-5 hover:border-brand-espresso transition-all duration-300">
          <div>
            <div className="flex justify-between items-center text-xs tracking-[0.2em] text-brand-espresso/60 mb-3">
              <span className="text-brand-caramel font-mono font-bold">{b1.collectionCode}</span>
              <div className="text-right">
                <span className="font-semibold text-brand-espresso block">À partir de {formatPrice(b1.startingPrice)}</span>
                {b1.priceNote && (
                  <span className="text-[10px] text-brand-espresso/60 block">{b1.priceNote}</span>
                )}
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-brand-sand">
              <img
                src={b1.image}
                alt={b1.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 bg-brand-espresso/90 text-white text-[11px] tracking-widest uppercase px-3 py-1 backdrop-blur-sm">
                {b1.badge}
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <Link to={`/bouquets/${b1.slug}`}>
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                    {b1.name}
                  </h3>
                </Link>
                <p className="text-xs md:text-sm text-brand-charcoal/70 mt-2 max-w-lg leading-relaxed">
                  {b1.description}
                </p>
                {b1.availableOptions && (
                  <div className="mt-2 text-[11px] text-brand-espresso/70">
                    <span className="font-semibold text-brand-espresso">Options disponibles :</span> {b1.availableOptions.join(' • ')}
                  </div>
                )}
              </div>
              <a
                href={buildDirectInquiryWhatsAppUrl(b1.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-brand-espresso flex items-center justify-center group-hover:bg-brand-caramel group-hover:border-brand-caramel group-hover:text-white transition-all shrink-0 ml-4"
                aria-label="Commander sur WhatsApp"
              >
                <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleAddToCart(b1)}
                className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold px-4 py-2.5 transition-all duration-300 ${
                  addedId === b1.id
                    ? 'bg-brand-caramel text-white scale-[1.02]'
                    : 'text-white bg-brand-espresso hover:bg-brand-caramel'
                }`}
              >
                {addedId === b1.id ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>✓ Ajouté au panier</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>
              <Link
                to={`/bouquets/${b1.slug}`}
                className="text-xs uppercase tracking-[0.18em] font-medium text-brand-espresso/70 hover:text-brand-caramel transition-colors"
              >
                Personnaliser &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 02 - BOUQUET AVEC PAPILLON / COURONNE (Taller Vertical Card - Col 5) */}
        <div className="md:col-span-5 group flex flex-col justify-between border border-brand-border bg-brand-sand/40 p-5 hover:border-brand-espresso transition-all duration-300">
          <div>
            <div className="flex justify-between items-center text-xs tracking-[0.2em] text-brand-espresso/60 mb-3">
              <span className="text-brand-caramel font-mono font-bold">{b2.collectionCode}</span>
              <div className="text-right">
                <span className="font-semibold text-brand-espresso block">À partir de {formatPrice(b2.startingPrice)}</span>
                {b2.priceNote && (
                  <span className="text-[10px] text-brand-espresso/60 block">{b2.priceNote}</span>
                )}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-sand">
              <img
                src={b2.image}
                alt={b2.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 bg-brand-espresso/90 text-white text-[11px] tracking-widest uppercase px-3 py-1 backdrop-blur-sm">
                {b2.badge}
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <Link to={`/bouquets/${b2.slug}`}>
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                    {b2.name}
                  </h3>
                </Link>
                <p className="text-xs md:text-sm text-brand-charcoal/70 mt-2 leading-relaxed">
                  {b2.description}
                </p>
                {b2.availableOptions && (
                  <div className="mt-2 text-[11px] text-brand-espresso/70">
                    <span className="font-semibold text-brand-espresso">Options disponibles :</span> {b2.availableOptions.join(' • ')}
                  </div>
                )}
              </div>
              <a
                href={buildDirectInquiryWhatsAppUrl(b2.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-brand-espresso flex items-center justify-center group-hover:bg-brand-caramel group-hover:border-brand-caramel group-hover:text-white transition-all shrink-0 ml-4"
                aria-label="Commander sur WhatsApp"
              >
                <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleAddToCart(b2)}
                className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold px-4 py-2.5 transition-all duration-300 ${
                  addedId === b2.id
                    ? 'bg-brand-caramel text-white scale-[1.02]'
                    : 'text-white bg-brand-espresso hover:bg-brand-caramel'
                }`}
              >
                {addedId === b2.id ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>✓ Ajouté au panier</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>
              <Link
                to={`/bouquets/${b2.slug}`}
                className="text-xs uppercase tracking-[0.18em] font-medium text-brand-espresso/70 hover:text-brand-caramel transition-colors"
              >
                Personnaliser &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 03 - BOUQUET AVEC 2 COULEURS (Col 3 on lg, Col 6 on md) */}
        <div className="md:col-span-6 lg:col-span-3 group flex flex-col justify-between border border-brand-border bg-brand-cream p-5 hover:border-brand-espresso transition-all duration-300">
          <div>
            <div className="flex justify-between items-center text-xs tracking-[0.2em] text-brand-espresso/60 mb-3">
              <span className="text-brand-caramel font-mono font-bold">{b3.collectionCode}</span>
              <span className="font-semibold text-brand-espresso text-right">À partir de {formatPrice(b3.startingPrice)}</span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-brand-sand">
              <img
                src={b3.image}
                alt={b3.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {b3.badge && (
                <div className="absolute bottom-2 left-2 bg-brand-espresso/90 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 backdrop-blur-sm">
                  {b3.badge}
                </div>
              )}
            </div>
          </div>
          <div className="pt-5">
            <Link to={`/bouquets/${b3.slug}`}>
              <h3 className="font-serif text-lg md:text-xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                {b3.name}
              </h3>
            </Link>
            <p className="text-xs text-brand-charcoal/70 mt-1.5 leading-relaxed line-clamp-2">
              {b3.description}
            </p>
            {b3.availableOptions && (
              <span className="text-[10px] text-brand-espresso/70 block mt-1">
                Options : {b3.availableOptions.join(' • ')}
              </span>
            )}
            <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleAddToCart(b3)}
                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold px-3 py-2 transition-all duration-300 ${
                  addedId === b3.id
                    ? 'bg-brand-caramel text-white scale-[1.02]'
                    : 'text-white bg-brand-espresso hover:bg-brand-caramel'
                }`}
              >
                {addedId === b3.id ? (
                  <>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>✓ Ajouté</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Panier</span>
                  </>
                )}
              </button>
              <Link to={`/bouquets/${b3.slug}`} className="text-brand-caramel tracking-widest uppercase hover:underline">
                Découvrir &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 04 - BOUQUET AVEC PAILLETTES (Col 3 on lg, Col 6 on md) */}
        <div className="md:col-span-6 lg:col-span-3 group flex flex-col justify-between border border-brand-border bg-brand-cream p-5 hover:border-brand-espresso transition-all duration-300">
          <div>
            <div className="flex justify-between items-center text-xs tracking-[0.2em] text-brand-espresso/60 mb-3">
              <span className="text-brand-caramel font-mono font-bold">{b4.collectionCode}</span>
              <span className="font-semibold text-brand-espresso text-right">À partir de {formatPrice(b4.startingPrice)}</span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-brand-sand">
              <img
                src={b4.image}
                alt={b4.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {b4.badge && (
                <div className="absolute bottom-2 left-2 bg-brand-espresso/90 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 backdrop-blur-sm">
                  {b4.badge}
                </div>
              )}
            </div>
          </div>
          <div className="pt-5">
            <Link to={`/bouquets/${b4.slug}`}>
              <h3 className="font-serif text-lg md:text-xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                {b4.name}
              </h3>
            </Link>
            <p className="text-xs text-brand-charcoal/70 mt-1.5 leading-relaxed line-clamp-2">
              {b4.description}
            </p>
            {b4.availableOptions && (
              <span className="text-[10px] text-brand-espresso/70 block mt-1">
                Options : {b4.availableOptions.join(' • ')}
              </span>
            )}
            <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleAddToCart(b4)}
                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold px-3 py-2 transition-all duration-300 ${
                  addedId === b4.id
                    ? 'bg-brand-caramel text-white scale-[1.02]'
                    : 'text-white bg-brand-espresso hover:bg-brand-caramel'
                }`}
              >
                {addedId === b4.id ? (
                  <>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>✓ Ajouté</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Panier</span>
                  </>
                )}
              </button>
              <Link to={`/bouquets/${b4.slug}`} className="text-brand-caramel tracking-widest uppercase hover:underline">
                Découvrir &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 05 - BOUQUET AVEC NOUNOURS (Col 3 on lg, Col 6 on md) */}
        <div className="md:col-span-6 lg:col-span-3 group flex flex-col justify-between border border-brand-border bg-brand-sand/40 p-5 hover:border-brand-espresso transition-all duration-300">
          <div>
            <div className="flex justify-between items-center text-xs tracking-[0.2em] text-brand-espresso/60 mb-3">
              <span className="text-brand-caramel font-mono font-bold">{b5.collectionCode}</span>
              <span className="font-semibold text-brand-espresso text-right">À partir de {formatPrice(b5.startingPrice)}</span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-brand-sand">
              <img
                src={b5.image}
                alt={b5.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {b5.badge && (
                <div className="absolute bottom-2 left-2 bg-brand-espresso/90 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 backdrop-blur-sm">
                  {b5.badge}
                </div>
              )}
            </div>
          </div>
          <div className="pt-5">
            <Link to={`/bouquets/${b5.slug}`}>
              <h3 className="font-serif text-lg md:text-xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                {b5.name}
              </h3>
            </Link>
            <p className="text-xs text-brand-charcoal/70 mt-1.5 leading-relaxed line-clamp-2">
              {b5.description}
            </p>
            {b5.availableOptions && (
              <span className="text-[10px] text-brand-espresso/70 block mt-1">
                Options : {b5.availableOptions.join(' • ')}
              </span>
            )}
            <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleAddToCart(b5)}
                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold px-3 py-2 transition-all duration-300 ${
                  addedId === b5.id
                    ? 'bg-brand-caramel text-white scale-[1.02]'
                    : 'text-white bg-brand-espresso hover:bg-brand-caramel'
                }`}
              >
                {addedId === b5.id ? (
                  <>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>✓ Ajouté</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Panier</span>
                  </>
                )}
              </button>
              <Link to={`/bouquets/${b5.slug}`} className="text-brand-caramel tracking-widest uppercase hover:underline">
                Découvrir &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 06 - BOUQUET AVEC CHOCOLATS (Col 3 on lg, Col 6 on md) */}
        <div className="md:col-span-6 lg:col-span-3 group flex flex-col justify-between border border-brand-border bg-brand-cream p-5 hover:border-brand-espresso transition-all duration-300">
          <div>
            <div className="flex justify-between items-center text-xs tracking-[0.2em] text-brand-espresso/60 mb-3">
              <span className="text-brand-caramel font-mono font-bold">{b6.collectionCode}</span>
              <span className="font-semibold text-brand-espresso text-right">À partir de {formatPrice(b6.startingPrice)}</span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-brand-sand">
              <img
                src={b6.image}
                alt={b6.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {b6.badge && (
                <div className="absolute bottom-2 left-2 bg-brand-espresso/90 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 backdrop-blur-sm">
                  {b6.badge}
                </div>
              )}
            </div>
          </div>
          <div className="pt-5">
            <Link to={`/bouquets/${b6.slug}`}>
              <h3 className="font-serif text-lg md:text-xl text-brand-espresso group-hover:text-brand-caramel transition-colors">
                {b6.name}
              </h3>
            </Link>
            <p className="text-xs text-brand-charcoal/70 mt-1.5 leading-relaxed line-clamp-2">
              {b6.description}
            </p>
            {b6.availableOptions && (
              <span className="text-[10px] text-brand-espresso/70 block mt-1">
                Options : {b6.availableOptions.join(' • ')}
              </span>
            )}
            <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleAddToCart(b6)}
                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold px-3 py-2 transition-all duration-300 ${
                  addedId === b6.id
                    ? 'bg-brand-caramel text-white scale-[1.02]'
                    : 'text-white bg-brand-espresso hover:bg-brand-caramel'
                }`}
              >
                {addedId === b6.id ? (
                  <>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>✓ Ajouté</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Panier</span>
                  </>
                )}
              </button>
              <Link to={`/bouquets/${b6.slug}`} className="text-brand-caramel tracking-widest uppercase hover:underline">
                Découvrir &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
