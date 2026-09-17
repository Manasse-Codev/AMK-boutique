export interface BouquetSizeOption {
  roses: number;
  label: string;
  price: number;
}

export interface BouquetColorOption {
  name: string;
  priceFormatted: string;
  image: string;
  hex?: string;
}

export interface Bouquet {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  collectionCode: string;
  collectionName: string;
  startingPrice: number;
  basePrice: number;
  image: string;
  images: string[];
  category: 'signature' | 'sur-mesure' | 'cadeaux' | 'peluches' | 'romantique';
  badge?: string;
  description: string;
  detailedDescription?: string;
  specifications?: {
    composition: string;
    finitions: string;
    durabilite: string;
    atelier: string;
  };
  availableColors: BouquetColorOption[];
  sizes: BouquetSizeOption[];
  isFeatured?: boolean;
  customizable: boolean;
}

export interface CartItem {
  id: string;
  bouquetId?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  rosesCount?: number;
  colorName?: string;
  customRibbonText?: string;
}

export interface CustomOrderRequest {
  name: string;
  phone: string;
  occasion: string;
  budget: string;
  location: string;
  details: string;
}
