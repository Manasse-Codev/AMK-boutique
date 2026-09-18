import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { Toast } from '../components/ui/Toast';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../services/whatsappService';
import { WhatsAppOrderCard } from '../components/cart/WhatsAppOrderCard';
import { WhatsAppOrderModal } from '../components/cart/WhatsAppOrderModal';
import { usePageSEO } from '../hooks/usePageSEO';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, checkoutWhatsApp } = useCart();
  const [showModal, setShowModal] = useState(false);

  usePageSEO({
    title: "Votre Panier & Validation de Commande | AMK Bouquets Daloa",
    description: "Vérifiez les bouquets de votre panier AMK Bouquets et transmettez votre commande personnalisée à notre atelier floral de Daloa via WhatsApp.",
    canonicalPath: "/panier",
    noIndex: true, // Évite le duplicate content sur les paniers utilisateur
  });

  return (
    <div className="min-h-screen bg-brand-cream text-brand-espresso">
      <AnnouncementBar />
      <Header />

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <span className="badge-pill text-brand-caramel font-bold block mb-2">
          Récapitulatif de Commande
        </span>
        <h1 className="font-serif text-title-xl text-brand-espresso mb-8">
          VOTRE PANIER
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center border border-brand-border bg-brand-sand/30 p-8">
            <h2 className="font-serif text-2xl text-brand-espresso mb-3">Votre panier est vide</h2>
            <p className="text-sm text-brand-charcoal/70 mb-8 max-w-md mx-auto font-light">
              Explorez nos collections de bouquets en satin faits avec amour à Daloa.
            </p>
            <Link
              to="/bouquets"
              className="inline-block bg-brand-caramel hover:bg-brand-amber text-white text-xs uppercase tracking-[0.2em] font-semibold py-4 px-8 transition-colors"
            >
              Découvrir nos créations
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Items List (Col 8) */}
              <div className="lg:col-span-8 border border-brand-border bg-white divide-y divide-brand-border/60">
                {items.map((item, index) => (
                  <div key={item.id || index} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover border border-brand-border bg-brand-sand shrink-0"
                      />
                      <div>
                        <h2 className="font-serif text-lg font-bold text-brand-espresso">
                          {item.name}
                        </h2>
                        {item.rosesCount && (
                          <span className="text-xs text-brand-espresso/70 block">
                            {item.rosesCount} roses de satin {item.colorName ? `• ${item.colorName}` : ''}
                          </span>
                        )}
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <span className="text-xs text-brand-charcoal/70 block mt-0.5">
                            Options : {item.selectedOptions.join(' • ')}
                          </span>
                        )}
                        {item.customRibbonText && (
                          <span className="text-xs text-brand-caramel italic block mt-0.5">
                            Ruban: « {item.customRibbonText} »
                          </span>
                        )}
                        <span className="text-sm font-semibold text-brand-espresso mt-1 block">
                          {formatPrice(item.price)} / unité
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex border border-brand-border bg-brand-sand/30">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="px-3 py-1 font-bold text-brand-espresso hover:bg-brand-sand"
                          aria-label="Diminuer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold text-xs flex items-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-3 py-1 font-bold text-brand-espresso hover:bg-brand-sand"
                          aria-label="Augmenter"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <span className="font-serif font-bold text-base text-brand-espresso block">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-xs text-red-700 hover:underline mt-1"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-brand-sand/30 flex justify-between items-center text-xs">
                  <button
                    onClick={clearCart}
                    className="text-brand-espresso/60 hover:text-red-700 underline"
                  >
                    Vider tout le panier
                  </button>
                  <Link to="/bouquets" className="text-brand-caramel font-semibold hover:underline">
                    + Continuer vos achats
                  </Link>
                </div>
              </div>

              {/* Summary & Checkout Box (Col 4) */}
              <div className="lg:col-span-4 border border-brand-border bg-brand-sand/40 p-6 md:p-8 space-y-6">
                <h2 className="font-serif text-2xl text-brand-espresso border-b border-brand-border pb-4">
                  Total de Commande
                </h2>

                <div className="space-y-3 text-xs tracking-wider">
                  <div className="flex justify-between text-base font-serif font-bold text-brand-espresso pt-2">
                    <span>Total Estimé :</span>
                    <span className="text-xl text-brand-espresso">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-light">
                  Chaque création est façonnée à la main avec amour dans notre atelier de Daloa. La validation s'effectue directement avec l'artisane sur WhatsApp.
                </p>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={checkoutWhatsApp}
                    className="w-full bg-brand-caramel hover:bg-brand-amber text-white py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                    </svg>
                    <span>VALIDER SUR WHATSAPP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="w-full border border-brand-espresso/60 hover:border-brand-espresso hover:bg-brand-sand/60 text-brand-espresso py-3 px-4 text-xs font-semibold tracking-[0.16em] uppercase transition duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <span>Aperçu des Fiches de Commande</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Embedded Luxury WhatsApp Order Card Section */}
            <div id="carte-commande" className="mt-16 pt-12 border-t border-brand-border/70">
              <div className="text-center mb-8">
                <span className="badge-pill text-brand-caramel font-bold">Commande Officielle • Daloa</span>
                <h2 className="font-serif text-3xl md:text-4xl text-brand-espresso mt-2">
                  VOTRE FICHE DE COMMANDE
                </h2>
                <p className="text-xs md:text-sm text-brand-charcoal/70 mt-2 max-w-lg mx-auto font-light">
                  Renseignez vos coordonnées ci-dessous pour transmettre directement votre commande à l'atelier sur WhatsApp (+225 05 64 88 91 20).
                </p>
              </div>

              <WhatsAppOrderCard items={items} showControls={true} />
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <Toast />

      <WhatsAppOrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        items={items}
      />
    </div>
  );
};
