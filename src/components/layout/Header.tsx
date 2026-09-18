import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { buildDirectInquiryWhatsAppUrl } from '../../services/whatsappService';

export const Header: React.FC = () => {
  const { totalCount, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { label: 'Accueil', hash: '#accueil', to: '/' },
    { label: 'Créations', hash: '#creations', to: '/bouquets' },
    { label: 'Pièce Maîtresse', hash: '#featured', to: '/#featured' },
    { label: 'Sur-Mesure', hash: '#sur-mesure', to: '/sur-mesure' },
    { label: 'Lookbook', hash: '#galerie', to: '/#galerie' },
    { label: "L'Atelier", hash: '#atelier', to: '/#atelier' },
  ];

  const handleNavClick = (hash: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-md border-b border-brand-border/70 transition-all duration-300">
      <div className="max-w-[1580px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
        
        {/* Brand Logo / Wordmark */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full border border-brand-caramel flex items-center justify-center bg-brand-caramel/10 group-hover:bg-brand-caramel transition-colors duration-300">
            <span className="font-serif font-bold text-brand-caramel group-hover:text-white transition-colors text-lg">
              A
            </span>
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-[0.18em] text-brand-espresso block leading-none">
              AMK
            </span>
            <span className="font-sans text-[9px] tracking-[0.35em] text-brand-caramel uppercase block mt-1 font-semibold">
              BOUQUETS • DALOA
            </span>
          </div>
        </Link>

        {/* Minimal Editorial Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-9 text-xs uppercase tracking-[0.24em] font-medium text-brand-espresso/85">
          {navLinks.map((link) => (
            isHome ? (
              <a
                key={link.label}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.hash);
                }}
                className="hover:text-brand-caramel transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-caramel hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-brand-caramel transition-colors py-1"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-4">
          
          {/* Direct WhatsApp Call */}
          <a
            href={buildDirectInquiryWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] px-4 py-2.5 bg-brand-caramel hover:bg-brand-amber text-white font-medium transition duration-300 shadow-sm"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
            </svg>
            <span>Commander WhatsApp</span>
          </a>

          {/* Cart Drawer Trigger Button with Motion badge */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={toggleCart}
            className="relative flex items-center gap-2.5 border border-brand-espresso/80 hover:border-brand-espresso bg-transparent hover:bg-brand-sand/50 text-brand-espresso text-xs uppercase tracking-[0.18em] px-4 py-2.5 transition duration-300"
            aria-label="Ouvrir le panier"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden md:inline">Panier</span>
            <motion.span
              key={totalCount}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.32, 1] }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="w-5 h-5 bg-brand-espresso text-brand-cream text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {totalCount}
            </motion.span>
          </motion.button>

          {/* Mobile Menu Burger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-espresso hover:text-brand-caramel transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-brand-border bg-brand-cream px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-xs uppercase tracking-[0.24em] font-medium text-brand-espresso">
            {navLinks.map((link) => (
              isHome ? (
                <a
                  key={link.label}
                  href={link.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.hash);
                  }}
                  className="py-2 border-b border-brand-border/40 hover:text-brand-caramel transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-brand-border/40 hover:text-brand-caramel transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          <div className="pt-2">
            <a
              href={buildDirectInquiryWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] py-3 bg-brand-caramel text-white font-medium"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
              </svg>
              <span>Commander sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
