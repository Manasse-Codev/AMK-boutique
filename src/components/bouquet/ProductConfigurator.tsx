import React, { useState } from 'react';
import { bouquetBleuPapillonsImg, bouquetCoeurBicoloreImg, bouquetPelucheStitchImg } from '../../data/bouquets';
import { useCart } from '../../hooks/useCart';
import { buildConfiguredOrderWhatsAppUrl, formatPrice } from '../../services/whatsappService';

interface ColorPreset {
  id: string;
  name: string;
  category: string;
  image: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'blue',
    name: 'Bleu Majesté & Papillons d\'Or',
    category: 'Collection Royale',
    image: bouquetBleuPapillonsImg,
  },
  {
    id: 'bicolore',
    name: 'Cœur Bicolore Cramoisi & Ivoire',
    category: 'Collection Bicolore',
    image: bouquetCoeurBicoloreImg,
  },
  {
    id: 'peluche',
    name: 'Rose Poudré & Peluche Stitch',
    category: 'Collection Tendresse',
    image: bouquetPelucheStitchImg,
  },
];

const ROSE_OPTIONS = [
  { value: 7, label: '7 Roses (Format Délicat)', price: 5000 },
  { value: 12, label: '12 Roses (Doux regard)', price: 8000 },
  { value: 20, label: '20 Roses (Élégance)', price: 12000 },
  { value: 30, label: '30 Roses (Grand Amour)', price: 18000 },
];

const COMPATIBLE_OPTIONS = [
  'Papillon',
  'Couronne',
  'Paillettes',
  'Nounours',
  'Chocolats',
];

export const ProductConfigurator: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [customColorMode, setCustomColorMode] = useState(false);
  const [selectedRoses, setSelectedRoses] = useState<number>(12);
  const [quantity, setQuantity] = useState<number>(1);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [selectedEmbellishments, setSelectedEmbellishments] = useState<string[]>(['Papillon']);
  const [isAdded, setIsAdded] = useState(false);

  const currentOption = ROSE_OPTIONS.find((opt) => opt.value === selectedRoses) || ROSE_OPTIONS[1];
  const unitPrice = currentOption.price;
  const totalPrice = unitPrice * quantity;

  const toggleEmbellishment = (opt: string) => {
    setSelectedEmbellishments((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const handleAddToCart = () => {
    addToCart({
      name: `Bouquet ${selectedColor.name}`,
      price: unitPrice,
      image: selectedColor.image,
      quantity: quantity,
      rosesCount: selectedRoses,
      colorName: customColorMode ? 'Nuance sur-mesure' : selectedColor.name,
      customRibbonText: customMessage.trim() || undefined,
      selectedOptions: selectedEmbellishments.length > 0 ? selectedEmbellishments : undefined,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleWhatsAppOrder = () => {
    const url = buildConfiguredOrderWhatsAppUrl({
      name: `Bouquet ${selectedColor.name}`,
      rosesCount: selectedRoses,
      quantity: quantity,
      total: totalPrice,
      colorName: customColorMode ? 'Nuance libre sur-mesure' : selectedColor.name,
      customMessage: customMessage,
      options: selectedEmbellishments,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="configurateur" className="py-24 border-b border-brand-border/70 max-w-[1580px] mx-auto px-6 md:px-12">
      
      <div className="mb-14">
        <span className="badge-pill text-brand-caramel font-bold">Expérience E-Commerce Sur-Mesure</span>
        <h2 className="font-serif text-title-xl text-brand-espresso mt-2">
          CONFIGURER VOTRE COMMANDE
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-sand/30 border border-brand-border p-6 md:p-12">
        
        {/* Left: Interactive Visual Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square border border-brand-border bg-brand-cream overflow-hidden shadow-inner">
            <img
              id="mainProductImage"
              src={selectedColor.image}
              alt="Aperçu du bouquet choisi"
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute top-4 left-4 bg-brand-espresso text-white text-[10px] tracking-widest uppercase px-3 py-1">
              Photographie d'Atelier Réelle
            </div>
            <div className="absolute bottom-4 left-4 bg-white/95 text-brand-espresso text-xs font-serif px-3 py-1.5 shadow-sm">
              {selectedColor.name} • {selectedRoses} roses
            </div>
          </div>
          
          {/* Thumbnail switcher */}
          <div className="grid grid-cols-3 gap-3">
            {COLOR_PRESETS.map((preset) => {
              const isActive = selectedColor.id === preset.id && !customColorMode;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedColor(preset);
                    setCustomColorMode(false);
                  }}
                  className={`aspect-square p-1 bg-white focus:outline-none transition-all ${
                    isActive
                      ? 'border-2 border-brand-caramel ring-2 ring-brand-caramel/20'
                      : 'border border-brand-border hover:border-brand-caramel'
                  }`}
                  aria-label={preset.name}
                >
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Options & Realtime WhatsApp Builder */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span id="selectedProductCategory" className="text-xs uppercase tracking-[0.25em] text-brand-caramel font-semibold">
                  {selectedColor.category}
                </span>
                <h3 id="selectedProductName" className="font-serif text-3xl md:text-4xl text-brand-espresso mt-1">
                  Bouquet {selectedColor.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-brand-espresso/60 block mb-0.5">
                  À partir de
                </span>
                <span id="selectedProductPrice" className="font-serif text-2xl md:text-3xl font-bold text-brand-espresso">
                  {formatPrice(unitPrice)}
                </span>
                <span className="text-[10px] uppercase text-brand-espresso/60 block">
                  {quantity > 1 ? `Total: ${formatPrice(totalPrice)}` : 'Prix variable selon le volume'}
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-brand-charcoal/80 mt-4 leading-relaxed">
              Composé de satin soyeux haute brillance, orné de feuillage raffiné et de papillons filigranés dorés. Un travail minutieux de plissage et d'assemblage artisanal réalisé à Daloa.
            </p>

            {/* Configuration Form Controls */}
            <div className="mt-8 space-y-6">
              
              {/* Color Palette Selector */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-3">
                  Nuance & Palette de satin :
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_PRESETS.map((preset) => {
                    const isSelected = selectedColor.id === preset.id && !customColorMode;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedColor(preset);
                          setCustomColorMode(false);
                        }}
                        className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors ${
                          isSelected
                            ? 'border border-brand-caramel bg-brand-espresso text-white'
                            : 'border border-brand-border bg-white text-brand-espresso hover:border-brand-espresso'
                        }`}
                      >
                        {preset.name}
                      </button>
                    );
                  })}
                  
                  <button
                    type="button"
                    onClick={() => setCustomColorMode(true)}
                    className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors ${
                      customColorMode
                        ? 'border border-brand-caramel bg-brand-espresso text-white'
                        : 'border border-brand-border bg-white text-brand-espresso hover:border-brand-espresso'
                    }`}
                  >
                    Autre nuance (sur-mesure)
                  </button>
                </div>
              </div>

              {/* Number of Roses / Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Volume (Nombre de roses) :
                  </label>
                  <select
                    id="roseCountSelect"
                    value={selectedRoses}
                    onChange={(e) => setSelectedRoses(Number(e.target.value))}
                    className="w-full bg-white border border-brand-border text-xs px-3 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                  >
                    {ROSE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} - À partir de {formatPrice(opt.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                    Quantité de bouquets :
                  </label>
                  <div className="flex border border-brand-border bg-white h-[42px]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-12 text-base font-bold text-brand-espresso hover:bg-brand-sand transition-colors flex items-center justify-center"
                      aria-label="Diminuer la quantité"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      id="orderQuantity"
                      value={quantity}
                      readOnly
                      className="w-full text-center text-xs font-bold text-brand-espresso bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 text-base font-bold text-brand-espresso hover:bg-brand-sand transition-colors flex items-center justify-center"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Options Additionnelles (Papillon, Couronne, Paillettes, Nounours, Chocolats) */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                  Options & Finitions d'Atelier :
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COMPATIBLE_OPTIONS.map((opt) => {
                    const isChecked = selectedEmbellishments.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleEmbellishment(opt)}
                        className={`px-3.5 py-2 text-xs transition-all flex items-center gap-2 ${
                          isChecked
                            ? 'bg-brand-espresso text-white border border-brand-caramel font-semibold shadow-sm'
                            : 'bg-white text-brand-espresso border border-brand-border hover:border-brand-espresso'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-brand-caramel border-brand-caramel text-white' : 'border-brand-border'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Message / Ribbons */}
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-brand-espresso mb-2">
                  Message personnalisé sur le ruban / carte :
                </label>
                <input
                  type="text"
                  id="customRibbonText"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Ex: Joyeux Anniversaire mon Amour, Pour toujours..."
                  className="w-full bg-white border border-brand-border text-xs px-4 py-3 text-brand-espresso focus:border-brand-caramel focus:outline-none"
                />
              </div>

            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-brand-caramel hover:bg-brand-amber text-white py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
              </svg>
              <span>Commander sur WhatsApp (+225 05 64 88 91 20)</span>
            </button>
            
            <button
              onClick={handleAddToCart}
              className={`py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-brand-caramel border border-brand-caramel text-white shadow-sm'
                  : 'border border-brand-espresso hover:bg-brand-espresso hover:text-white text-brand-espresso'
              }`}
            >
              {isAdded ? (
                <>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>✓ Ajouté au panier</span>
                </>
              ) : (
                <span>Ajouter au panier</span>
              )}
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
