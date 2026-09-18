import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast, openCart } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', damping: 24, stiffness: 320 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-brand-espresso/90 backdrop-blur-md text-brand-cream border border-brand-gold/30 shadow-2xl py-3.5 px-5 flex items-center gap-4 max-w-md"
        >
          <div className="w-5 h-5 rounded-full bg-brand-caramel/20 border border-brand-caramel text-brand-caramel flex items-center justify-center text-xs font-bold shrink-0">
            ✓
          </div>
          <span className="text-xs font-medium text-white tracking-wide">
            {toastMessage}
          </span>
          <button
            type="button"
            onClick={() => {
              clearToast();
              openCart();
            }}
            className="text-[11px] text-brand-gold uppercase tracking-widest font-semibold hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 transition-colors shrink-0 ml-1"
          >
            Voir le panier
          </button>
          <button
            type="button"
            onClick={clearToast}
            className="text-white/60 hover:text-white text-xs ml-1 transition-colors"
            aria-label="Fermer la notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
