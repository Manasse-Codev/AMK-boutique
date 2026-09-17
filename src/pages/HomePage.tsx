import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/sections/HeroSection';
import { ManifestoSection } from '../components/sections/ManifestoSection';
import { CollectionsGrid } from '../components/bouquet/CollectionsGrid';
import { FeaturedBouquet } from '../components/bouquet/FeaturedBouquet';
import { ProductConfigurator } from '../components/bouquet/ProductConfigurator';
import { CustomOrderSection } from '../components/sections/CustomOrderSection';
import { GallerySection } from '../components/sections/GallerySection';
import { AtelierSection } from '../components/sections/AtelierSection';
import { WhatsAppCtaSection } from '../components/sections/WhatsAppCtaSection';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { Toast } from '../components/ui/Toast';
import { usePageSEO } from '../hooks/usePageSEO';

export const HomePage: React.FC = () => {
  const location = useLocation();

  usePageSEO({
    title: "AMK Bouquets — Maison de Bouquets en Satin de Luxe | Daloa, Côte d'Ivoire",
    description: "Atelier artisanal de confection de bouquets de roses en ruban de satin à Daloa. Créations florales éternelles, personnalisées et faites main dès 5 000 FCFA.",
    canonicalPath: "/",
  });

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-espresso selection:bg-brand-caramel selection:text-white">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <CollectionsGrid />
        <FeaturedBouquet />
        <ProductConfigurator />
        <CustomOrderSection />
        <GallerySection />
        <AtelierSection />
        <WhatsAppCtaSection />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};
