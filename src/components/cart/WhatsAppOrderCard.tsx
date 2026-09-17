import React, { useState, useRef, useMemo } from 'react';
import html2canvas from 'html2canvas';
import type { CartItem } from '../../types';
import {
  formatPrice,
  buildCartWhatsAppUrl,
  getOrderTextMessage,
  generateOrderReference,
  DISPLAY_PHONE,
  WORKSHOP_LOCATION,
  type CustomerInfo,
} from '../../services/whatsappService';

interface WhatsAppOrderCardProps {
  items: CartItem[];
  onClose?: () => void;
  showControls?: boolean;
}

export const WhatsAppOrderCard: React.FC<WhatsAppOrderCardProps> = ({
  items,
  onClose,
  showControls = true,
}) => {
  // Customer coordinates state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('Daloa');
  const [customerNotes, setCustomerNotes] = useState('');

  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Stable order reference
  const orderRef = useMemo(() => generateOrderReference('client'), []);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalPrice = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalRoses = items.reduce((acc, it) => acc + (it.rosesCount || 0) * it.quantity, 0);

  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const customerData: CustomerInfo = {
    name: customerName.trim(),
    phone: customerPhone.trim(),
    location: customerLocation.trim(),
    notes: customerNotes.trim(),
  };

  // Copy plain text of the order
  const handleCopyText = async () => {
    try {
      const text = getOrderTextMessage(items, customerData);
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setFeedbackMessage("Texte de la commande copié dans le presse-papier !");
      setTimeout(() => {
        setCopiedText(false);
        setFeedbackMessage(null);
      }, 3500);
    } catch (e) {
      console.error('Failed to copy text', e);
    }
  };

  // Capture Card to Canvas
  const captureCardCanvas = async (): Promise<HTMLCanvasElement | null> => {
    if (!cardRef.current) return null;
    return await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FCF9F4',
      logging: false,
    });
  };

  // Direct Send to WhatsApp with customer details + order
  const handleSendToWhatsApp = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);
    setFeedbackMessage(null);

    const messageText = getOrderTextMessage(items, customerData);
    const whatsappUrl = buildCartWhatsAppUrl(items, customerData);
    const filename = 'commande-amk-bouquets.png';

    try {
      const canvas = await captureCardCanvas();
      if (!canvas) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setIsProcessing(false);
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          setIsProcessing(false);
          return;
        }

        const imageFile = new File([blob], filename, { type: 'image/png' });

        // 1. Mobile devices: native Web Share
        if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
          try {
            await navigator.share({
              title: "Commande AMK Bouquets • Daloa",
              text: messageText,
              files: [imageFile],
            });
            setIsProcessing(false);
            return;
          } catch (shareErr: unknown) {
            if ((shareErr as Error)?.name === 'AbortError') {
              setIsProcessing(false);
              return;
            }
          }
        }

        // 2. Desktop: Copy image to clipboard
        try {
          if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopiedImage(true);
          }
        } catch (clipErr) {
          console.log('Clipboard image write not allowed', clipErr);
        }

        // 3. Open WhatsApp
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        setIsProcessing(false);
        setFeedbackMessage("Commande transmise sur WhatsApp ! L'image est aussi copiée dans votre presse-papier.");
        setTimeout(() => setFeedbackMessage(null), 8000);
      }, 'image/png');
    } catch (err) {
      console.error('Error sending order to WhatsApp', err);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsProcessing(false);
    }
  };

  // Download card as PNG
  const handleDownloadImage = async () => {
    setIsProcessing(true);
    try {
      const canvas = await captureCardCanvas();
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'commande-amk-bouquets.png';
        link.href = dataUrl;
        link.click();
        setFeedbackMessage("Fiche de commande téléchargée (PNG) !");
        setTimeout(() => setFeedbackMessage(null), 4000);
      }
    } catch (e) {
      console.error('Failed to download image', e);
    } finally {
      setIsProcessing(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    setIsProcessing(true);
    try {
      const canvas = await captureCardCanvas();
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (blob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopiedImage(true);
            setFeedbackMessage("Image de la commande copiée dans le presse-papier !");
            setTimeout(() => {
              setCopiedImage(false);
              setFeedbackMessage(null);
            }, 4000);
          }
          setIsProcessing(false);
        }, 'image/png');
      } else {
        setIsProcessing(false);
      }
    } catch (e) {
      console.error('Failed to copy image', e);
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-brand-border/80 shadow-2xl overflow-hidden font-sans text-brand-espresso">
      
      {/* Top Header Bar */}
      {showControls && (
        <div className="bg-brand-espresso text-brand-cream px-6 py-3.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-sand">
              Fiche de Commande • AMK Bouquets Daloa
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center hover:bg-white/15 text-brand-cream/80 hover:text-white transition-colors text-sm"
              aria-label="Fermer"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Dynamic Feedback Banner */}
      {feedbackMessage && (
        <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-900 px-6 py-3 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{feedbackMessage}</span>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* FORMULAIRE : COORDONNÉES DU CLIENT */}
      <div className="p-5 md:p-6 bg-brand-sand/30 border-b border-brand-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">👤</span>
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-brand-espresso">
            Coordonnées du Client
          </h3>
          <span className="text-[10px] text-brand-espresso/60 font-sans ml-auto">
            (Renseignez vos coordonnées pour la commande)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Nom du client */}
          <div>
            <label className="block text-[11px] font-semibold text-brand-espresso uppercase tracking-wider mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ex: Marie Kouamé"
              className="w-full px-3 py-2 text-xs bg-white border border-brand-border focus:border-brand-espresso focus:outline-none text-brand-espresso"
            />
          </div>

          {/* Téléphone WhatsApp */}
          <div>
            <label className="block text-[11px] font-semibold text-brand-espresso uppercase tracking-wider mb-1">
              Téléphone / WhatsApp *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Ex: +225 07 12 34 56 78"
              className="w-full px-3 py-2 text-xs bg-white border border-brand-border focus:border-brand-espresso focus:outline-none text-brand-espresso"
            />
          </div>

          {/* Ville / Lieu de livraison */}
          <div>
            <label className="block text-[11px] font-semibold text-brand-espresso uppercase tracking-wider mb-1">
              Ville ou Lieu de retrait / livraison
            </label>
            <input
              type="text"
              value={customerLocation}
              onChange={(e) => setCustomerLocation(e.target.value)}
              placeholder="Ex: Daloa (ou Abidjan, etc.)"
              className="w-full px-3 py-2 text-xs bg-white border border-brand-border focus:border-brand-espresso focus:outline-none text-brand-espresso"
            />
          </div>

          {/* Note ou Remarque */}
          <div>
            <label className="block text-[11px] font-semibold text-brand-espresso uppercase tracking-wider mb-1">
              Remarque éventuelle (optionnel)
            </label>
            <input
              type="text"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Ex: Date souhaitée, occasion..."
              className="w-full px-3 py-2 text-xs bg-white border border-brand-border focus:border-brand-espresso focus:outline-none text-brand-espresso"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LA FICHE OFFICIELLE : COORDONNÉES CLIENT & COMMANDES                      */}
      {/* ========================================================================= */}
      <div
        ref={cardRef}
        className="p-6 md:p-10 bg-[#FCF9F4] relative border-b border-[#E9E0D2]"
      >
        {/* Filigrane discret */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center font-serif text-[18vw] font-bold select-none text-brand-espresso">
          AMK
        </div>

        {/* En-tête */}
        <div className="text-center border-b border-brand-border/70 pb-6 relative">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-brand-gold/60 flex items-center justify-center bg-brand-cream shadow-sm">
            <svg className="w-7 h-7 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.5 5.5H5.5V9.5L2 12l3.5 2.5V18.5H9.5L12 22l2.5-3.5H18.5V14.5L22 12l-3.5-2.5V5.5H14.5L12 2zm0 4.5c2.48 0 4.5 2.02 4.5 4.5 0 2.05-1.37 3.78-3.25 4.31v1.69h-2.5v-1.69C8.87 14.78 7.5 13.05 7.5 11c0-2.48 2.02-4.5 4.5-4.5z" />
            </svg>
          </div>

          <span className="font-display font-bold text-2xl md:text-3xl tracking-[0.25em] text-brand-espresso block">
            AMK BOUQUETS
          </span>
          <span className="font-sans text-[11px] tracking-[0.35em] text-brand-caramel uppercase font-bold block mt-1">
            BON DE COMMANDE
          </span>
          <span className="text-[11px] text-brand-espresso/60 font-mono block mt-1">
            Atelier de Confection • {WORKSHOP_LOCATION}
          </span>

          <div className="mt-4 pt-3 border-t border-brand-border/50 flex flex-wrap justify-between items-center text-xs tracking-wider text-brand-espresso/70 gap-2">
            <div>
              <span className="font-semibold text-brand-espresso">RÉFÉRENCE :</span>{' '}
              <span className="font-mono text-brand-caramel font-bold">{orderRef}</span>
            </div>
            <div>
              <span className="font-semibold text-brand-espresso">DATE :</span> {dateStr}
            </div>
          </div>
        </div>

        {/* Bloc Coordonnées Client sur la carte */}
        <div className="my-5 p-4 bg-brand-sand/50 border border-brand-border/80">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-espresso block mb-2 font-mono">
            👤 Coordonnées du Client
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-brand-espresso/60">Nom : </span>
              <strong className="text-brand-espresso">
                {customerName.trim() || 'Non renseigné'}
              </strong>
            </div>
            <div>
              <span className="text-brand-espresso/60">Téléphone : </span>
              <strong className="text-brand-espresso">
                {customerPhone.trim() || 'Non renseigné'}
              </strong>
            </div>
            <div>
              <span className="text-brand-espresso/60">Lieu / Ville : </span>
              <span className="text-brand-espresso font-medium">
                {customerLocation.trim() || 'Daloa'}
              </span>
            </div>
            {customerNotes.trim() && (
              <div>
                <span className="text-brand-espresso/60">Note : </span>
                <span className="italic text-brand-espresso/90">
                  « {customerNotes.trim()} »
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Détail des Commandes */}
        <div className="my-6">
          <div className="bg-brand-sand/70 px-4 py-2 border-y border-brand-border/80 flex justify-between items-center text-xs uppercase tracking-[0.2em] font-bold text-brand-espresso">
            <span>Bouquets Commandés</span>
            <span>Total</span>
          </div>

          {items.length === 0 ? (
            <p className="text-center py-8 text-sm italic text-brand-espresso/50">
              Votre panier est vide.
            </p>
          ) : (
            <div className="divide-y divide-brand-border/50">
              {items.map((it, idx) => (
                <div key={it.id || idx} className="py-4 flex gap-4 items-start justify-between">
                  <div className="flex gap-3.5 items-start">
                    <img
                      src={it.image}
                      alt={it.name}
                      crossOrigin="anonymous"
                      className="w-14 h-14 object-cover border border-brand-border bg-white shrink-0 mt-0.5"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-brand-espresso">
                        <span className="font-mono text-brand-caramel font-bold mr-1.5">{it.quantity}x</span>
                        {it.name}
                      </h4>
                      <div className="text-xs text-brand-charcoal/80 space-y-0.5 mt-1">
                        {it.rosesCount && (
                          <span className="block">
                            • Composition : <strong className="font-medium text-brand-espresso">{it.rosesCount} roses</strong> de satin {it.colorName ? `(${it.colorName})` : ''}
                          </span>
                        )}
                        {it.customRibbonText && (
                          <span className="block text-brand-caramel font-serif italic text-xs bg-brand-sand/50 px-2.5 py-1 border-l-2 border-brand-caramel mt-1.5">
                            Ruban personnalisé : « {it.customRibbonText} »
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-serif font-bold text-base text-brand-espresso">
                      {formatPrice(it.price * it.quantity)}
                    </span>
                    {it.quantity > 1 && (
                      <span className="text-[10px] text-brand-espresso/60 block font-mono">
                        ({formatPrice(it.price)} / u)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totaux */}
        <div className="border-t-2 border-brand-espresso/80 pt-4 space-y-2">
          <div className="flex justify-between text-xs tracking-wider text-brand-espresso/70">
            <span>Nombre total de roses :</span>
            <span className="font-bold text-brand-espresso">{totalRoses} roses de satin</span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t border-brand-border/80">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-espresso">
              MONTANT TOTAL DE LA COMMANDE :
            </span>
            <span className="font-serif text-3xl font-bold text-brand-espresso text-right">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* Pied de carte & Sceau */}
        <div className="mt-8 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-brand-charcoal/80 space-y-1 text-center sm:text-left">
            <span className="font-semibold text-brand-espresso uppercase tracking-wider block text-[11px]">
              Règlement de la commande :
            </span>
            <p className="text-[11px]">
              Orange Money ({DISPLAY_PHONE}) • Wave • Espèces
            </p>
            <p className="font-serif italic text-brand-gold text-xs pt-1">
              « Que tout ce que vous faites soit fait avec amour. » — 1 Co 16:14
            </p>
          </div>

          {/* Sceau doré officiel */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#C8A366] bg-gradient-to-br from-[#DFBA73] via-[#C8A366] to-[#99732F] p-1 shadow-md flex flex-col items-center justify-center text-center text-white select-none rotate-3">
              <span className="text-[8px] tracking-widest uppercase font-bold">AMK BOUQUETS</span>
              <span className="text-xs font-serif font-bold my-0.5">DALOA</span>
              <span className="text-[7px] tracking-wider uppercase font-semibold">FAIT MAIN</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BARRE D'ACTIONS WHATSAPP                                                  */}
      {/* ========================================================================= */}
      <div className="p-4 md:p-6 bg-white space-y-3">
        
        {/* Bouton principal WhatsApp */}
        <button
          type="button"
          onClick={handleSendToWhatsApp}
          disabled={items.length === 0 || isProcessing}
          className={`w-full py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase transition duration-300 shadow-md flex items-center justify-center gap-3 ${
            items.length > 0 && !isProcessing
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-brand-border text-brand-espresso/40 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Génération & Transmission sur WhatsApp...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
              </svg>
              <span>Envoyer la Commande sur WhatsApp (+225 05 64 88 91 20)</span>
            </>
          )}
        </button>

        {/* Boutons secondaires */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {/* Télécharger PNG */}
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isProcessing}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-brand-border hover:border-brand-espresso bg-brand-sand/30 hover:bg-brand-sand text-brand-espresso text-[11px] font-semibold tracking-wider uppercase transition-colors"
            title="Télécharger l'image PNG de la commande"
          >
            <svg className="w-3.5 h-3.5 text-brand-caramel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Télécharger PNG</span>
          </button>

          {/* Copier Image */}
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={isProcessing}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-brand-border hover:border-brand-espresso bg-brand-sand/30 hover:bg-brand-sand text-brand-espresso text-[11px] font-semibold tracking-wider uppercase transition-colors"
            title="Copier l'image de la commande dans le presse-papier"
          >
            <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{copiedImage ? '✓ Image copiée' : 'Copier Image'}</span>
          </button>

          {/* Copier Texte */}
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-brand-border hover:border-brand-espresso bg-brand-sand/30 hover:bg-brand-sand text-brand-espresso text-[11px] font-semibold tracking-wider uppercase transition-colors"
            title="Copier le texte de la commande"
          >
            <svg className="w-3.5 h-3.5 text-brand-espresso/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copiedText ? '✓ Texte copié' : 'Copier Texte'}</span>
          </button>

          {/* Imprimer */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-brand-border hover:border-brand-espresso text-brand-espresso text-[11px] font-semibold tracking-wider uppercase transition-colors"
            title="Imprimer la commande"
          >
            <svg className="w-3.5 h-3.5 text-brand-espresso/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Imprimer</span>
          </button>
        </div>

      </div>

    </div>
  );
};
