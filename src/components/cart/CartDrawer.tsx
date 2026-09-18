import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../services/whatsappService';
import { WhatsAppOrderModal } from './WhatsAppOrderModal';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalCount, checkoutWhatsApp } = useCart();
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Close with Escape key on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closeCart]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Subtle Glassmorphism Dark Backdrop Overlay */}
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCart}
              className="absolute inset-0 bg-brand-espresso/50 backdrop-blur-sm transition-opacity"
              aria-hidden="true"
            />

            {/* Lateral Drawer Panel with Glassmorphism & Spring Motion */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
              <motion.div
                key="cart-panel"
                initial={{ x: '100%', opacity: 0.92, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: '100%', opacity: 0.92, scale: 0.98 }}
                transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 }}
                className="w-screen max-w-md bg-gradient-to-b from-brand-cream/95 via-brand-cream/90 to-brand-cream/95 backdrop-blur-xl border-l border-white/60 shadow-[-12px_0_35px_-5px_rgba(43,30,22,0.18)] h-full flex flex-col justify-between p-5 sm:p-7 md:p-8 relative z-10"
              >
                {/* Staggered Content Container (Appears slightly after drawer panel) */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-col h-full justify-between min-h-0"
                >
                  {/* Drawer Header */}
                  <div className="shrink-0">
                    <div className="flex justify-between items-center border-b border-brand-border/70 pb-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-serif text-2xl text-brand-espresso tracking-tight">VOTRE PANIER</h3>
                          <span className="text-[11px] font-mono font-bold bg-brand-sand/80 text-brand-espresso px-2 py-0.5 border border-brand-border/80">
                            {totalCount} {totalCount > 1 ? 'articles' : 'article'}
                          </span>
                        </div>
                        <span className="text-[11px] text-brand-caramel uppercase tracking-[0.2em] font-semibold block mt-0.5">
                          Sélection d'Atelier • Daloa
                        </span>
                      </div>
                      <button
                        onClick={closeCart}
                        className="w-9 h-9 border border-brand-border hover:border-brand-espresso flex items-center justify-center text-brand-espresso hover:bg-white/60 transition-colors"
                        aria-label="Fermer le panier (Échap)"
                        title="Fermer (Échap)"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Cart Items List with Smooth Enter/Exit Motion & Thumb-Friendly Scroll */}
                  <div className="flex-1 overflow-y-auto divide-y divide-brand-border/60 my-3 pr-1">
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-12 h-12 rounded-full border border-brand-border mx-auto flex items-center justify-center text-brand-espresso/40 mb-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <p className="text-sm font-serif italic text-brand-espresso/60">
                          Votre panier est actuellement vide.
                        </p>
                        <p className="text-xs text-brand-charcoal/60 mt-1 max-w-xs">
                          Découvrez nos créations en satin et ajoutez un bouquet d'exception.
                        </p>
                      </div>
                    ) : (
                      <AnimatePresence initial={false}>
                        {items.map((item, index) => (
                          <motion.div
                            key={item.id || index}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 25, height: 0, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.25 }}
                            className="py-4 flex gap-4 items-start"
                          >
                            <img
                              src={item.image}
                              className="w-16 h-16 object-cover border border-brand-border bg-brand-sand shrink-0 shadow-sm"
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

                              {/* Quantity Controls & Delete Action */}
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex border border-brand-border bg-white/80 text-xs">
                                  <button
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                    className="px-2 py-0.5 hover:bg-brand-sand font-bold text-brand-espresso transition-colors"
                                    aria-label="Diminuer"
                                  >
                                    -
                                  </button>
                                  <span className="px-2.5 py-0.5 font-semibold text-brand-espresso">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                    className="px-2 py-0.5 hover:bg-brand-sand font-bold text-brand-espresso transition-colors"
                                    aria-label="Augmenter"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeFromCart(index)}
                                  className="text-[11px] text-red-700/80 hover:text-red-700 hover:underline ml-2 transition-colors"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Drawer Footer & Checkout Summary (Always Pinned at Bottom) */}
                  <div className="shrink-0 border-t border-brand-border/70 pt-4 space-y-3">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-brand-espresso/70">
                        <span>Sous-total :</span>
                        <span className="font-semibold text-brand-espresso">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-brand-espresso/70">
                        <span>Livraison :</span>
                        <span className="text-[11px] italic text-brand-caramel">Calculée selon destination (Daloa & CI)</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2 border-t border-brand-border/50">
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-espresso">
                          Total :
                        </span>
                        <span className="font-serif text-2xl font-bold text-brand-espresso">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-brand-charcoal/70 leading-tight">
                      Confectionné à la main à Daloa • Retrait à l'atelier ou expédition sécurisée.
                    </p>

                    <div className="space-y-2 pt-1">
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
                        <span>Passer la commande</span>
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

                      <div className="flex items-center justify-between pt-1.5 text-[11px]">
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
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Order Card Modal */}
      <WhatsAppOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        items={items}
      />
    </>
  );
};
