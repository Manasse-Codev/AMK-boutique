import React from 'react';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { Toast } from '../components/ui/Toast';
import { CustomOrderSection } from '../components/sections/CustomOrderSection';
import { ProductConfigurator } from '../components/bouquet/ProductConfigurator';
import { usePageSEO } from '../hooks/usePageSEO';

export const CustomPage: React.FC = () => {
  usePageSEO({
    title: "Création de Bouquet en Satin sur-mesure | Atelier AMK Bouquets Daloa",
    description: "Composez votre bouquet éternel sur-mesure à Daloa : choix libre des nuances de satin, nombre de roses, ruban personnalisé et ornements exclusifs.",
    canonicalPath: "/sur-mesure",
  });

  return (
    <div className="min-h-screen bg-brand-cream text-brand-espresso">
      <AnnouncementBar />
      <Header />
      <main>
        <div className="max-w-[1580px] mx-auto px-6 md:px-12 pt-12">
          <span className="badge-pill text-brand-caramel font-bold block mb-2">
            Haute Façon & Sur-Mesure • Daloa
          </span>
          <h1 className="font-serif text-title-xl text-brand-espresso">
            CRÉATIONS SUR-MESURE
          </h1>
          <p className="text-sm md:text-base text-brand-charcoal/70 mt-3 max-w-xl font-light">
            Donnez libre cours à votre imagination : choisissez vos nuances de satin, la taille, et personnalisez les moindres détails avec notre artisane.
          </p>
        </div>
        <ProductConfigurator />
        <CustomOrderSection />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};
