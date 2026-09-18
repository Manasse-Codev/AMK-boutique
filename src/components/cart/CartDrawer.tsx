import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../services/whatsappService';
import { WhatsAppOrderModal } from './WhatsAppOrderModal';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, clearCart, totalPrice, checkoutWhatsApp } = useCart();
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-brand-espresso/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream border-l border-brand-border h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl relative z-10">
          
          {/* Drawer Header */}
          <div>
            <div className="flex justify-between items-center border-b border-brand-border/70 pb-5">
              <div>
                <span className="badge-pill text-brand-caramel font-bold">Sélection d'Atelier</span>
                <h3 className="font-serif text-2xl text-brand-espresso mt-0.5">VOTRE PANIER</h3>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 border border-brand-border hover:border-brand-espresso flex items-center justify-center text-brand-espresso hover:bg-brand-sand transition-colors"
                aria-label="Fermer le panier"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-brand-border/60 max-h-[52vh] overflow-y-auto pr-1 mt-4">
              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full border border-brand-border mx-auto flex items-center justify-center text-brand-espresso/40 mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-sm font-serif italic text-brand-espresso/60">
                    Votre panier est actuellement vide.
                  </p>
                  <p className="text-xs text-brand-charcoal/60 mt-1">
                    Découvrez nos créations en satin et ajoutez un bouquet d'exception.
                  </p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={item.id || index} className="py-4 flex gap-4 items-start">
                    <img
                      src={item.image}
                      className="w-16 h-16 object-cover border border-brand-border bg-brand-sand shrink-0"
                      alt={item.name}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-brand-espresso truncate">
                        {item.name}
                      </h4>
                      {item.rosesCount && (
                        <span className="text-[11px] text-brand-espresso/70 block">
                          {item.rosesCount} roses de satin {item.colorName ? `• ${item.colorName}` : ''}
                        </span>
                      )}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <span className="text-[10px] text-brand-charcoal/70 block mt-0.5">
                          Options : {item.selectedOptions.join(' • ')}
                        </span>
                      )}
                      {item.customRibbonText && (
                        <span className="text-[10px] text-brand-caramel italic block truncate mt-0.5">
                          Ruban: « {item.customRibbonText} »
                        </span>
                      )}
                      <span className="text-xs font-semibold text-brand-espresso mt-1 block">
                        {formatPrice(item.price)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex border border-brand-border bg-white text-xs">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 hover:bg-brand-sand font-bold text-brand-espresso"
                            aria-label="Diminuer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-semibold text-brand-espresso">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-brand-sand font-bold text-brand-espresso"
                            aria-label="Augmenter"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-[11px] text-red-700 hover:underline ml-2"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Drawer Footer & Checkout */}
          <div className="border-t border-brand-border/70 pt-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-brand-espresso/70">
                Total Estimé :
              </span>
              <span className="font-serif text-2xl font-bold text-brand-espresso">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <p className="text-[11px] text-brand-charcoal/70 leading-tight">
              Confectionné à la main à Daloa • Retrait à l'atelier ou expédition sécurisée.
            </p>

            <div className="space-y-2">
              <button
                onClick={checkoutWhatsApp}
                disabled={items.length === 0}
                className={`w-full py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 flex items-center justify-center gap-2.5 ${
                  items.length > 0
                    ? 'bg-brand-caramel hover:bg-brand-amber text-white shadow-md'
                    : 'bg-brand-border text-brand-espresso/40 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                </svg>
                <span>Commander via WhatsApp</span>
              </button>

              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowOrderModal(true)}
                  className="w-full py-2.5 px-4 text-xs font-semibold tracking-[0.16em] uppercase border border-brand-espresso/50 hover:border-brand-espresso hover:bg-brand-sand/60 text-brand-espresso flex items-center justify-center gap-2 transition duration-200"
                >
                  <svg className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <span>Aperçu des Fiches de Commande</span>
                </button>
              )}

              <div className="flex items-center justify-between pt-2 text-[11px]">
                {items.length > 0 ? (
                  <>
                    <Link
                      to="/panier"
                      onClick={closeCart}
                      className="text-brand-caramel font-semibold hover:underline"
                    >
                      Voir le panier complet &rarr;
                    </Link>
                    <button
                      onClick={clearCart}
                      className="text-brand-espresso/50 hover:text-red-700 underline"
                    >
                      Vider
                    </button>
                  </>
                ) : (
                  <button
                    onClick={closeCart}
                    className="text-brand-espresso/80 hover:text-brand-caramel ml-auto font-medium"
                  >
                    Continuer mes visites &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WhatsApp Order Card Modal */}
      <WhatsAppOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        items={items}
      />
    </div>
  );
};
