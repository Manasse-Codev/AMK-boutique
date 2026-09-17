import type { CartItem, CustomOrderRequest } from '../types';

export const WHATSAPP_PHONE = '2250564889120';
export const DISPLAY_PHONE = '+225 05 64 88 91 20';
export const WORKSHOP_LOCATION = "Daloa, Côte d'Ivoire";

export function formatPrice(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

export function generateOrderReference(type: 'client' | 'artisan'): string {
  const d = new Date();
  const ym = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return type === 'artisan'
    ? `ATEL-DALOA-${ym}-${randomSuffix}`
    : `CMD-CLIENT-${ym}-${randomSuffix}`;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  location?: string;
  notes?: string;
}

/**
 * Returns clean, elegant order text containing client coordinates and ordered items
 */
export function getOrderTextMessage(items: CartItem[], customer?: CustomerInfo): string {
  if (items.length === 0) return "Votre panier AMK Bouquets est vide.";

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalRoses = items.reduce((sum, item) => sum + (item.rosesCount || 0) * item.quantity, 0);
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const customerBlock = customer && (customer.name || customer.phone || customer.location)
    ? `👤 *COORDONNÉES CLIENT :*\n` +
      (customer.name ? `• Nom : *${customer.name}*\n` : '') +
      (customer.phone ? `• Téléphone : *${customer.phone}*\n` : '') +
      (customer.location ? `• Ville / Lieu : *${customer.location}*\n` : '') +
      (customer.notes ? `• Remarque : _${customer.notes}_\n` : '') +
      `\n`
    : '';

  const itemsList = items
    .map(
      (item, idx) =>
        `🌹 *${idx + 1}. ${item.name}* (x${item.quantity})\n` +
        (item.rosesCount ? `   ▫️ Composition : ${item.rosesCount} roses de satin\n` : '') +
        (item.colorName ? `   ▫️ Nuance : ${item.colorName}\n` : '') +
        (item.customRibbonText ? `   ▫️ Ruban : « *${item.customRibbonText}* »\n` : '') +
        `   ▫️ Prix : *${formatPrice(item.price * item.quantity)}*`
    )
    .join('\n\n');

  return (
    `⚜️ *COMMANDE AMK BOUQUETS • DALOA* ⚜️\n` +
    `📅 *Date :* ${dateStr}\n\n` +
    customerBlock +
    `──────────────────────────────────────────\n` +
    `💐 *DÉTAIL DE LA COMMANDE*\n` +
    `──────────────────────────────────────────\n\n` +
    `${itemsList}\n\n` +
    `──────────────────────────────────────────\n` +
    `• Nombre de roses : ${totalRoses} roses sculpturales\n` +
    `• *MONTANT TOTAL :* *${formatPrice(total)}*\n` +
    `• *Modalités de règlement :* Orange Money (${DISPLAY_PHONE}), Wave, Espèces\n\n` +
    `« _Que tout ce que vous faites soit fait avec amour._ » — 1 Co 16:14\n` +
    `*AMK BOUQUETS • DALOA*`
  );
}

/**
 * Returns formatted text of client order (kept for backwards compatibility)
 */
export function getClientOrderTextMessage(items: CartItem[], customer?: CustomerInfo | string): string {
  const cust = typeof customer === 'object' ? customer : undefined;
  return getOrderTextMessage(items, cust);
}

/**
 * Returns formatted workshop text (now streamlined to customer info & order details)
 */
export function getArtisanWorkshopTextMessage(items: CartItem[], customer?: CustomerInfo | string): string {
  const cust = typeof customer === 'object' ? customer : undefined;
  return getOrderTextMessage(items, cust);
}

/**
 * Returns the text of the cart order (backwards compatibility)
 */
export function getCartOrderTextMessage(items: CartItem[], customer?: CustomerInfo): string {
  return getOrderTextMessage(items, customer);
}

/**
 * Builds the WhatsApp URL with the clean order text and customer details
 */
export function buildCartWhatsAppUrl(items: CartItem[], customer?: CustomerInfo): string {
  if (items.length === 0) return `https://wa.me/${WHATSAPP_PHONE}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(getOrderTextMessage(items, customer))}`;
}

export function buildArtisanWhatsAppUrl(items: CartItem[], customer?: CustomerInfo | string): string {
  const cust = typeof customer === 'object' ? customer : undefined;
  return buildCartWhatsAppUrl(items, cust);
}

export function buildClientWhatsAppUrl(items: CartItem[], customer?: CustomerInfo | string): string {
  const cust = typeof customer === 'object' ? customer : undefined;
  return buildCartWhatsAppUrl(items, cust);
}

/**
 * Builds WhatsApp URL for a configured bouquet from the interactive builder
 */
export function buildConfiguredOrderWhatsAppUrl(params: {
  name: string;
  rosesCount: number | string;
  quantity: number;
  total: number;
  colorName?: string;
  customMessage?: string;
}): string {
  const customMsg = params.customMessage?.trim() || 'Aucun mot doux précisé';

  const text =
    `*COMMANDE AMK BOUQUETS*\n\n` +
    `• Modèle : ${params.name}\n` +
    (params.colorName ? `• Teinte : ${params.colorName}\n` : '') +
    `• Roses : ${params.rosesCount} roses de satin\n` +
    `• Quantité : ${params.quantity}\n` +
    `• Total estimé : ${formatPrice(params.total)}\n` +
    `• Message ruban : ${customMsg}\n` +
    `• Lieu : ${WORKSHOP_LOCATION}\n\n` +
    `Bonjour, je souhaite valider cette commande avec vous !`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds WhatsApp URL for a custom creation request form
 */
export function buildCustomRequestWhatsAppUrl(data: CustomOrderRequest): string {
  const text =
    `*DEMANDE DE CRÉATION SUR-MESURE*\n\n` +
    `• Client : ${data.name}\n` +
    `• Téléphone : ${data.phone}\n` +
    `• Occasion : ${data.occasion}\n` +
    `• Budget : ${data.budget}\n` +
    `• Lieu de livraison : ${data.location || 'Daloa'}\n` +
    `• Souhaits & détails : ${data.details || 'Selon inspiration artisane'}\n\n` +
    `Bonjour AMK Bouquets, pouvez-vous me proposer une création selon ces critères ?`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct inquiry link
 */
export function buildDirectInquiryWhatsAppUrl(subject?: string): string {
  const text = subject
    ? `Bonjour AMK Bouquets, je souhaite me renseigner concernant : ${subject}.`
    : `Bonjour AMK Bouquets, je désire commander un bouquet sur-mesure confectionné à Daloa.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
