import type { Bouquet } from '../types';
import royalBlueImg from '../assets/images/rose_royal_blue_gold.png';
import crimsonBrownImg from '../assets/images/rose_crimson_brown.png';
import blushChampagneImg from '../assets/images/rose_blush_champagne.png';
import flatlayToolsImg from '../assets/images/flatlay_ribbons_tools.png';

export { royalBlueImg, crimsonBrownImg, blushChampagneImg, flatlayToolsImg };

export const BOUQUETS_CATALOG: Bouquet[] = [
  {
    id: 'bouquet-satin-classique',
    slug: 'bouquets-en-satin',
    name: 'Bouquets en Satin',
    subtitle: 'Roses sculpturales d\'atelier',
    collectionCode: '01 / GAMME SIGNATURE',
    collectionName: 'Collection Classique',
    startingPrice: 5000,
    basePrice: 8000,
    image: blushChampagneImg,
    images: [blushChampagneImg, crimsonBrownImg, royalBlueImg],
    category: 'signature',
    badge: 'Collection Classique',
    description: 'Roses sculpturales confectionnées à la main dans un satin de haute densité. Finition soyeuse et ruban d\'habillage coordonné.',
    detailedDescription: 'Chaque pétale est découpé, chauffé et assemblé à la main dans notre atelier de Daloa. Un tombé impeccable, un éclat satiné discret et une tenue éternelle qui conserve toute son intensité au fil des années.',
    specifications: {
      composition: 'Satin haute densité premium',
      finitions: 'Ruban coordonné & finition tranche invisible',
      durabilite: 'Éternelle (ne fane jamais)',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Rose Poudré & Champagne', priceFormatted: '12 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
      { name: 'Cramoisi & Chocolat', priceFormatted: '16 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Bleu Royal & Or', priceFormatted: '15 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
    ],
    sizes: [
      { roses: 12, label: '12 Roses (Doux regard)', price: 8000 },
      { roses: 20, label: '20 Roses (Élégance)', price: 15000 },
      { roses: 30, label: '30 Roses (Grand Amour)', price: 22000 },
      { roses: 50, label: '50 Roses (Prestige Royal)', price: 35000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-personnalise',
    slug: 'bouquets-personnalises',
    name: 'Bouquets Personnalisés',
    subtitle: 'Sceau de cire, initiales & perles fines',
    collectionCode: '02 / SUR-MESURE',
    collectionName: 'Sur-Mesure d\'Exception',
    startingPrice: 10000,
    basePrice: 16000,
    image: crimsonBrownImg,
    images: [crimsonBrownImg, royalBlueImg, blushChampagneImg],
    category: 'sur-mesure',
    badge: 'Sceau de Cire & Perles',
    description: 'Choix libre de palettes, initiales dorées, cachets de cire personnalisés et perles serties au cœur des boutons de roses.',
    detailedDescription: 'L\'expérience ultime de la haute confection florale. Vous choisissez l\'harmonie de satin, la typographie du cachet monogrammé et les ornements précieux pour un cadeau unique au monde.',
    specifications: {
      composition: 'Roses de satin, perles fines & cire à cacheter',
      finitions: 'Initiales monogrammées & épingles nacrées',
      durabilite: 'Conservation à vie',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Cramoisi & Chocolat', priceFormatted: '16 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Bleu Royal & Or', priceFormatted: '15 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
      { name: 'Rose Poudré & Champagne', priceFormatted: '12 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
    ],
    sizes: [
      { roses: 12, label: '12 Roses personnalisées', price: 10000 },
      { roses: 20, label: '20 Roses personnalisées', price: 18000 },
      { roses: 30, label: '30 Roses d\'Or', price: 26000 },
      { roses: 50, label: '50 Roses Pièce d\'Art', price: 42000 }
    ],
    customizable: true
  },
  {
    id: 'coffret-cadeau',
    slug: 'bouquets-cadeaux',
    name: 'Bouquets Cadeaux',
    subtitle: 'Boîte rigide haute couture & carte manuscrite',
    collectionCode: '03 / COFFRET CADEAU',
    collectionName: 'Coffret Prêt-à-Offrir',
    startingPrice: 12000,
    basePrice: 15000,
    image: royalBlueImg,
    images: [royalBlueImg, crimsonBrownImg],
    category: 'cadeaux',
    badge: 'Prêt à Offrir',
    description: 'Compositions prêtes à offrir dans un emballage rigide haute couture avec carte de vœux manuscrite.',
    detailedDescription: 'Présenté dans un écrin haute tenue doublé de papier de soie soyeux, avec ruban monogrammé scellé et carte calligraphiée personnalisée.',
    specifications: {
      composition: 'Bouquet de satin & boîte rigide de luxe',
      finitions: 'Papier de soie, sceau et carte calligraphiée',
      durabilite: 'Éternelle',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Bleu Royal & Or', priceFormatted: '15 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
      { name: 'Cramoisi & Chocolat', priceFormatted: '16 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
    ],
    sizes: [
      { roses: 15, label: 'Écrin Médium (15 roses)', price: 12000 },
      { roses: 25, label: 'Écrin Prestige (25 roses)', price: 20000 },
      { roses: 40, label: 'Grand Écrin Impérial (40 roses)', price: 32000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-peluche',
    slug: 'bouquets-avec-peluches',
    name: 'Bouquets avec Peluches',
    subtitle: 'Tendresse infinie & satin doux',
    collectionCode: '04 / DOUCEUR',
    collectionName: 'Collection Tendresse',
    startingPrice: 8000,
    basePrice: 10000,
    image: blushChampagneImg,
    images: [blushChampagneImg, royalBlueImg],
    category: 'peluches',
    badge: 'Douceur & Tendresse',
    description: 'L\'alliance tendre de roses de satin satinées et de douces figurines peluches pour faire fondre les cœurs.',
    detailedDescription: 'Une création pleine de poésie et de douceur. La peluche délicatement intégrée au centre des roses apporte une touche réconfortante et mémorable.',
    specifications: {
      composition: 'Roses en satin & peluche douce premium',
      finitions: 'Rubans organza et perles douces',
      durabilite: 'Conservation à vie',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Rose Poudré & Blanc Neige', priceFormatted: '10 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
      { name: 'Bleu Nuit & Nuage', priceFormatted: '10 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
    ],
    sizes: [
      { roses: 10, label: '10 Roses + 1 Peluche', price: 8000 },
      { roses: 18, label: '18 Roses + 1 Peluche de Luxe', price: 14000 },
      { roses: 30, label: '30 Roses + 2 Peluches', price: 25000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-romantique',
    slug: 'bouquets-romantiques',
    name: 'Romantiques & Événements',
    subtitle: 'Fiançailles, anniversaires, mariages & Saint-Valentin',
    collectionCode: '05 & 06 / OCCASIONS',
    collectionName: 'Célébrations Majestueuses',
    startingPrice: 15000,
    basePrice: 18000,
    image: crimsonBrownImg,
    images: [crimsonBrownImg, royalBlueImg, blushChampagneImg],
    category: 'romantique',
    badge: 'Grands Événements',
    description: 'Fiançailles, anniversaires, mariages, Saint-Valentin et cérémonies d\'exception dans tout le Haut-Sassandra.',
    detailedDescription: 'Des volumes spectaculaires pensés pour sublimer vos moments les plus précieux. Conçus pour résister au temps sans jamais perdre de leur magnificence.',
    specifications: {
      composition: 'Jusqu\'à 100 roses de satin dense',
      finitions: 'Papillons filigranés or & perles serties',
      durabilite: 'Souvenir impérissable',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Cramoisi Passion & Cacao', priceFormatted: '18 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Bleu Majesté & Or Impérial', priceFormatted: '18 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
    ],
    sizes: [
      { roses: 20, label: '20 Roses Passion', price: 15000 },
      { roses: 30, label: '30 Roses Célébration', price: 22000 },
      { roses: 50, label: '50 Roses Grand Amour', price: 35000 },
      { roses: 100, label: '100 Roses Déclaration Royale', price: 65000 }
    ],
    customizable: true
  }
];

export const FEATURED_BOUQUET: Bouquet = {
  id: 'le-somptueux',
  slug: 'le-somptueux-edition-limitee',
  name: '« Le Somptueux »',
  subtitle: 'Bouquet de 30 roses de satin rouge rubis et marron glacé',
  collectionCode: 'PIÈCE MAÎTRESSE DU MOIS',
  collectionName: 'Édition Limitée d\'Atelier',
  startingPrice: 18000,
  basePrice: 18000,
  image: crimsonBrownImg,
  images: [crimsonBrownImg, royalBlueImg, blushChampagneImg],
  category: 'signature',
  badge: 'Best-seller Événements',
  description: 'Une création d\'une rare intensité dramatique. Composé de 30 boutons de satin façonnés méticuleusement, sertis d\'épingles à perles ivoire nacrées et scellé par notre cachet de cire doré monogrammé.',
  detailedDescription: 'Une création d\'une rare intensité dramatique. Composé de 30 boutons de satin façonnés méticuleusement, sertis d\'épingles à perles ivoire nacrées et scellé par notre cachet de cire doré monogrammé. Une composition architecturale digne des grands défilés de mode.',
  specifications: {
    composition: '30 Roses en satin premium',
    finitions: 'Perles fines nacrées & Sceau de cire',
    durabilite: 'Éternelle (ne fane jamais)',
    atelier: 'Confectionné avec amour à Daloa'
  },
  availableColors: [
    { name: 'Cramoisi Impérial & Cacao', priceFormatted: '18 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
    { name: 'Bleu Majesté & Or', priceFormatted: '18 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
  ],
  sizes: [
    { roses: 30, label: '30 Roses Pièce Maîtresse', price: 18000 }
  ],
  isFeatured: true,
  customizable: true
};
