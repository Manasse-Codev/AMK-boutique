import React from 'react';
import { useCart } from '../../hooks/useCart';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-brand-espresso text-brand-cream border border-brand-gold/40 shadow-2xl py-3 px-5 flex items-center gap-4 transition-all duration-300">
      <div className="w-2 h-2 rounded-full bg-brand-caramel animate-ping" />
      <span className="text-xs tracking-wider font-medium">{toastMessage}</span>
      <button
        onClick={openCart}
        className="text-[11px] text-brand-gold uppercase tracking-widest font-semibold hover:underline"
      >
        Voir Panier
      </button>
      <button
        onClick={clearToast}
        className="text-white/60 hover:text-white text-xs ml-1"
        aria-label="Fermer la notification"
      >
        ✕
      </button>
    </div>
  );
};
