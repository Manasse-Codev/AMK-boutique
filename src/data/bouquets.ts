import type { Bouquet } from '../types';
import royalBlueImg from '../assets/images/rose_royal_blue_gold.png';
import crimsonBrownImg from '../assets/images/rose_crimson_brown.png';
import blushChampagneImg from '../assets/images/rose_blush_champagne.png';
import flatlayToolsImg from '../assets/images/flatlay_ribbons_tools.png';
import bouquetBleuPapillonsImg from '../assets/images/bouquet_bleu_papillons.jpg';
import bouquetCoeurBicoloreImg from '../assets/images/bouquet_coeur_bicolore.jpg';
import bouquetPelucheStitchImg from '../assets/images/bouquet_peluche_stitch.jpg';

export {
  royalBlueImg,
  crimsonBrownImg,
  blushChampagneImg,
  flatlayToolsImg,
  bouquetBleuPapillonsImg,
  bouquetCoeurBicoloreImg,
  bouquetPelucheStitchImg
};

export const BOUQUETS_CATALOG: Bouquet[] = [
  {
    id: 'bouquet-simple',
    slug: 'bouquet-simple',
    name: 'Bouquet simple',
    subtitle: 'Roses sculpturales d\'atelier en satin uni',
    collectionCode: '01 / ESSENTIEL',
    collectionName: 'Collection Essentielle',
    startingPrice: 5000,
    basePrice: 5000,
    priceNote: 'Prix variable selon le volume.',
    image: blushChampagneImg,
    images: [blushChampagneImg, crimsonBrownImg, royalBlueImg],
    category: 'signature',
    badge: 'Prix d\'Atelier',
    description: 'Roses confectionnées à la main dans un satin de haute densité uni. Finition soyeuse et ruban d\'habillage coordonné.',
    detailedDescription: 'Chaque pétale est découpé, chauffé et assemblé à la main dans notre atelier de Daloa. Un tombé impeccable, un éclat satiné discret et une tenue éternelle qui conserve toute son intensité au fil des années.',
    availableOptions: ['Volume', 'Couleurs'],
    specifications: {
      composition: 'Satin haute densité uni premium',
      finitions: 'Ruban coordonné & finition tranche invisible',
      durabilite: 'Éternelle (ne fane jamais)',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Rose Poudré & Champagne', priceFormatted: 'À partir de 5 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
      { name: 'Cramoisi & Chocolat', priceFormatted: 'À partir de 5 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Bleu Royal & Or', priceFormatted: 'À partir de 5 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
    ],
    sizes: [
      { roses: 7, label: '7 Roses (Format Délicat)', price: 5000 },
      { roses: 12, label: '12 Roses (Doux regard)', price: 8000 },
      { roses: 20, label: '20 Roses (Élégance)', price: 12000 },
      { roses: 30, label: '30 Roses (Grand Amour)', price: 18000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-papillon-couronne',
    slug: 'bouquet-avec-papillon-couronne',
    name: 'Bouquet avec papillon / couronne',
    subtitle: 'Papillons filigranés or ou couronne princière',
    collectionCode: '02 / MAJESTÉ',
    collectionName: 'Collection Royale',
    startingPrice: 6000,
    basePrice: 6000,
    priceNote: 'Prix variable selon le volume.',
    image: bouquetBleuPapillonsImg,
    images: [bouquetBleuPapillonsImg, royalBlueImg, crimsonBrownImg],
    category: 'signature',
    badge: 'Ornements Royaux',
    description: 'Roses en satin bleu royal sublimées par des papillons dorés aériens ou une délicate couronne dorée.',
    detailedDescription: 'Création phare de notre atelier de Daloa. Roses de satin d\'un bleu royal intense accompagnées de magnifiques papillons aux reflets métalliques dorés qui semblent s\'envoler au-dessus des pétales.',
    availableOptions: ['Volume', 'Couleurs', 'Papillon', 'Couronne'],
    specifications: {
      composition: 'Roses en satin bleu royal & ornements or',
      finitions: 'Papillons dorés découpés au laser ou couronne',
      durabilite: 'Conservation à vie',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Bleu Royal & Or', priceFormatted: 'À partir de 6 000 FCFA', image: bouquetBleuPapillonsImg, hex: '#1C3F73' },
      { name: 'Cramoisi & Or', priceFormatted: 'À partir de 6 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Rose Poudré & Or', priceFormatted: 'À partir de 6 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
    ],
    sizes: [
      { roses: 10, label: '10 Roses + Papillons Dorés', price: 6000 },
      { roses: 16, label: '16 Roses + Papillons / Couronne', price: 10000 },
      { roses: 25, label: '25 Roses + Ornements Royaux', price: 16000 },
      { roses: 40, label: '40 Roses Pièce Majestueuse', price: 25000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-2-couleurs',
    slug: 'bouquet-avec-2-couleurs',
    name: 'Bouquet avec 2 couleurs',
    subtitle: 'Harmonie bicolore sculptée en cœur ou dégradé',
    collectionCode: '03 / DUO D\'AMOUR',
    collectionName: 'Collection Bicolore',
    startingPrice: 8000,
    basePrice: 8000,
    priceNote: 'Prix variable selon le volume.',
    image: bouquetCoeurBicoloreImg,
    images: [bouquetCoeurBicoloreImg, crimsonBrownImg, blushChampagneImg],
    category: 'romantique',
    badge: 'Design Cœur & Duo',
    description: 'Composition harmonieuse associant deux nuances de satin, avec motif en cœur et rubans bordeaux.',
    detailedDescription: 'Véritable pièce de virtuosité artisanale : un cœur rouge cramoisi intense enveloppé d\'une couronne de roses champagne nacrées, habillé d\'un tombé de papier architecturé et d\'un grand nœud de satin.',
    availableOptions: ['Volume', 'Couleurs'],
    specifications: {
      composition: 'Roses en satin bicolores haute tenue',
      finitions: 'Disposition sculpturale en cœur & ruban bordeaux',
      durabilite: 'Éternelle',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Cramoisi Rubis & Ivoire Champagne', priceFormatted: 'À partir de 8 000 FCFA', image: bouquetCoeurBicoloreImg, hex: '#8B1E2B' },
      { name: 'Bleu Royal & Blanc Neige', priceFormatted: 'À partir de 8 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
      { name: 'Rose Poudré & Blanc Nacré', priceFormatted: 'À partir de 8 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
    ],
    sizes: [
      { roses: 12, label: '12 Roses Bicolores', price: 8000 },
      { roses: 20, label: '20 Roses (Motif Cœur Duo)', price: 14000 },
      { roses: 30, label: '30 Roses (Grand Cœur Bicolore)', price: 20000 },
      { roses: 50, label: '50 Roses Pièce Royale', price: 35000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-paillettes',
    slug: 'bouquet-avec-paillettes',
    name: 'Bouquet avec paillettes',
    subtitle: 'Pétales scintillants & reflets féeriques',
    collectionCode: '04 / SCINTILLANT',
    collectionName: 'Collection Pailletée',
    startingPrice: 10000,
    basePrice: 10000,
    priceNote: 'Prix variable selon le volume.',
    image: crimsonBrownImg,
    images: [crimsonBrownImg, bouquetPelucheStitchImg, blushChampagneImg],
    category: 'signature',
    badge: 'Éclat & Paillettes',
    description: 'Roses en satin travaillées avec incrustations de paillettes scintillantes pour une brillance éternelle.',
    detailedDescription: 'Un jeu de lumière saisissant sous chaque angle. Les paillettes fixées avec soin sur le velouté du satin apportent une texture précieuse et un éclat féerique à la création florale.',
    availableOptions: ['Volume', 'Couleurs', 'Paillettes'],
    specifications: {
      composition: 'Roses de satin & paillettes fines scintillantes',
      finitions: 'Fixation haute résistance & ruban satin coordonné',
      durabilite: 'Conservation à vie',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Cramoisi Pailleté & Or', priceFormatted: 'À partir de 10 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Rose Féerique Scintillant', priceFormatted: 'À partir de 10 000 FCFA', image: bouquetPelucheStitchImg, hex: '#E8C5B8' },
      { name: 'Bleu Nuit Pailleté', priceFormatted: 'À partir de 10 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
    ],
    sizes: [
      { roses: 15, label: '15 Roses Scintillantes', price: 10000 },
      { roses: 25, label: '25 Roses Paillettes d\'Or', price: 16000 },
      { roses: 40, label: '40 Roses Grand Éclat Féerique', price: 25000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-nounours',
    slug: 'bouquet-avec-nounours',
    name: 'Bouquet avec nounours',
    subtitle: 'Roses de satin & figurine peluche de tendresse',
    collectionCode: '05 / TENDRESSE',
    collectionName: 'Collection Peluche',
    startingPrice: 13000,
    basePrice: 13000,
    priceNote: 'Prix variable selon le volume.',
    image: bouquetPelucheStitchImg,
    images: [bouquetPelucheStitchImg, blushChampagneImg, bouquetBleuPapillonsImg],
    category: 'peluches',
    badge: 'Peluche & Satin',
    description: 'L\'alliance craquante de roses de satin rose & pailletées avec une adorable peluche au centre.',
    detailedDescription: 'Un cadeau inoubliable pour faire fondre le cœur de l\'être aimé. Présenté ici avec notre modèle Stitch rose, entouré de roses poudrées et de roses pailletées framboise avec un habillage géométrique délicat.',
    availableOptions: ['Volume', 'Couleurs', 'Nounours', 'Paillettes'],
    specifications: {
      composition: 'Roses en satin, paillettes & peluche douce',
      finitions: 'Habillage papier rose poudré & ruban coordonné',
      durabilite: 'Conservation à vie',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Rose Poudré & Stitch Rose', priceFormatted: 'À partir de 13 000 FCFA', image: bouquetPelucheStitchImg, hex: '#E8C5B8' },
      { name: 'Bleu Majesté & Nounours Câlin', priceFormatted: 'À partir de 13 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
      { name: 'Cramoisi Passion & Ourson Rouge', priceFormatted: 'À partir de 13 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
    ],
    sizes: [
      { roses: 12, label: 'Bouquet + 1 Peluche (Format Tendre)', price: 13000 },
      { roses: 20, label: '20 Roses + Peluche de Luxe & Paillettes', price: 18000 },
      { roses: 30, label: '30 Roses + Peluche & Finitions Prestige', price: 26000 }
    ],
    customizable: true
  },
  {
    id: 'bouquet-chocolats',
    slug: 'bouquet-avec-chocolats',
    name: 'Bouquet avec chocolats',
    subtitle: 'Gourmandise raffinée & fleurs éternelles (Ferrero Rocher)',
    collectionCode: '06 / GOURMAND',
    collectionName: 'Collection Gourmande',
    startingPrice: 15000,
    basePrice: 15000,
    priceNote: 'Exemple : Ferrero Rocher. Prix variable selon le volume.',
    image: royalBlueImg,
    images: [royalBlueImg, crimsonBrownImg, bouquetCoeurBicoloreImg],
    category: 'cadeaux',
    badge: 'Ferrero Rocher & Satin',
    description: 'Compositions de roses en satin associées à de délicieuses bouchées chocolatées (Ferrero Rocher).',
    detailedDescription: 'L\'ultime cadeau romantique associant la splendeur éternelle de nos roses en satin et la gourmandise des chocolats raffinés (Ferrero Rocher). Idéal pour la Saint-Valentin, les anniversaires et les grandes déclarations.',
    availableOptions: ['Volume', 'Couleurs', 'Chocolats'],
    specifications: {
      composition: 'Roses de satin & chocolats de prestige (Ferrero Rocher)',
      finitions: 'Incrustation sécurisée & emballage de luxe',
      durabilite: 'Roses éternelles',
      atelier: 'Confectionné avec amour à Daloa'
    },
    availableColors: [
      { name: 'Bleu Majesté & Ferrero Rocher', priceFormatted: 'À partir de 15 000 FCFA', image: royalBlueImg, hex: '#1C3F73' },
      { name: 'Cramoisi Cacao & Chocolats Dorés', priceFormatted: 'À partir de 15 000 FCFA', image: crimsonBrownImg, hex: '#8B1E2B' },
      { name: 'Ivoire & Chocolats Délicats', priceFormatted: 'À partir de 15 000 FCFA', image: blushChampagneImg, hex: '#E8C5B8' },
    ],
    sizes: [
      { roses: 12, label: '12 Roses + Écrin Ferrero Rocher', price: 15000 },
      { roses: 20, label: '20 Roses + Chocolats Ferrero Sélection', price: 22000 },
      { roses: 30, label: '30 Roses + Cascade de Chocolats Prestige', price: 32000 }
    ],
    customizable: true
  }
];

export const FEATURED_BOUQUET: Bouquet = {
  id: 'bouquet-coeur-bicolore-featured',
  slug: 'bouquet-avec-2-couleurs',
  name: '« Cœur Bicolore & Satin Royal »',
  subtitle: 'Harmonie de roses cramoisi rubis & ivoire champagne en cœur',
  collectionCode: 'PIÈCE MAÎTRESSE DU MOIS',
  collectionName: 'Édition Spéciale d\'Atelier',
  startingPrice: 8000,
  basePrice: 8000,
  priceNote: 'Prix variable selon le volume.',
  image: bouquetCoeurBicoloreImg,
  images: [bouquetCoeurBicoloreImg, bouquetBleuPapillonsImg, bouquetPelucheStitchImg],
  category: 'romantique',
  badge: 'Best-seller de l\'Atelier',
  description: 'Une création d\'une rare intensité dramatique. Cœur de roses de satin rouge bordeaux enveloppé de boutons ivoire champagne et scellé d\'un grand nœud ruban assorti.',
  detailedDescription: 'Une composition sculpturale confectionnée pétale par pétale à Daloa. Le contraste bicolore crée un effet de profondeur saisissant qui sublime chaque instant marquant.',
  availableOptions: ['Volume', 'Couleurs'],
  specifications: {
    composition: 'Roses en satin bicolores premium',
    finitions: 'Motif cœur sculpté & grand ruban de satin',
    durabilite: 'Éternelle (ne fane jamais)',
    atelier: 'Confectionné avec amour à Daloa'
  },
  availableColors: [
    { name: 'Cramoisi Rubis & Ivoire Champagne', priceFormatted: 'À partir de 8 000 FCFA', image: bouquetCoeurBicoloreImg, hex: '#8B1E2B' },
    { name: 'Bleu Majesté & Or', priceFormatted: 'À partir de 8 000 FCFA', image: bouquetBleuPapillonsImg, hex: '#1C3F73' },
  ],
  sizes: [
    { roses: 12, label: '12 Roses Bicolores', price: 8000 },
    { roses: 20, label: '20 Roses (Motif Cœur)', price: 14000 },
    { roses: 30, label: '30 Roses Pièce Maîtresse', price: 20000 }
  ],
  isFeatured: true,
  customizable: true
};
