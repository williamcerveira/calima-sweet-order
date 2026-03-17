export type FillingTier = 'traditional' | 'special' | 'premium';

export interface Filling {
  name: string;
  tier: FillingTier;
}

export interface SweetItem {
  name: string;
  pricePerUnit: number;
  minQuantity: number;
}

export interface SweetCategory {
  name: string;
  items: SweetItem[];
}

export const WEIGHTS = [1.3, 1.5, 2, 3, 4] as const;

export const WEIGHT_SERVINGS: Record<number, string> = {
  1.3: '6-8 fatias',
  1.5: '10-12 fatias',
  2: '16-17 fatias',
  3: '18-25 fatias',
  4: '26-38 fatias',
};

export const MASSES = ['Baunilha', 'Chocolate'] as const;

export const TIER_PRICES: Record<FillingTier, number> = {
  traditional: 70,
  special: 80,
  premium: 90,
};

export const TIER_LABELS: Record<FillingTier, string> = {
  traditional: 'Tradicional',
  special: 'Especial',
  premium: 'Premium',
};

export const FILLINGS: Filling[] = [
  { name: 'Brigadeiro de ninho', tier: 'traditional' },
  { name: 'Brigadeiro de chocolate cremoso', tier: 'traditional' },
  { name: 'Cocada cremosa', tier: 'traditional' },
  { name: 'Creme belga de chocolate', tier: 'special' },
  { name: 'Ganache', tier: 'special' },
  { name: 'Brigadeiro de Nutella', tier: 'special' },
  { name: 'Creme Belga com Morango', tier: 'special' },
  { name: 'Quatro Leites', tier: 'special' },
  { name: 'Ninho com Abacaxi', tier: 'special' },
  { name: 'Abacaxi com coco', tier: 'special' },
  { name: 'Creme de maracujá', tier: 'special' },
  { name: 'Ameixa com doce de leite', tier: 'premium' },
  { name: 'Mousse de Ferrero', tier: 'premium' },
  { name: 'Mousse de chocolate branco com geleia morango', tier: 'premium' },
  { name: 'Mousse de Ninho', tier: 'premium' },
  { name: 'Ninho com Nutella', tier: 'premium' },
];

export const FILLING_EXTRAS = [
  { name: 'Morango', pricePerKg: 12 },
  { name: 'Geleia de Morango', pricePerKg: 12 },
  { name: 'Geleia Frutas Vermelhas', pricePerKg: 12 },
];

export const TOPPINGS = [
  { name: 'Chantininho', pricePerKg: 0 },
  { name: 'Ganache Chocolate Nobre', pricePerKg: 20 },
];

export const CAKE_TOPPERS = [
  { name: 'Simples', price: 22 },
  { name: 'Em Camadas / Laminado', price: 35 },
];

export const ACETATE_BASE_PRICE = 110;
export const ACETATE_NUTELLA_EXTRA = 12;

export const SWEET_CATEGORIES: SweetCategory[] = [
  {
    name: 'Brigadeiros Tradicionais',
    items: [
      { name: 'Ninho', pricePerUnit: 1.70, minQuantity: 25 },
      { name: 'Beijinho', pricePerUnit: 1.70, minQuantity: 25 },
      { name: 'Dois Amores', pricePerUnit: 1.70, minQuantity: 25 },
      { name: 'Brigadeiro tradicional', pricePerUnit: 1.70, minQuantity: 25 },
    ],
  },
  {
    name: 'Brigadeiros Especiais',
    items: [
      { name: 'Churros', pricePerUnit: 1.90, minQuantity: 25 },
      { name: 'Olho de Sogra', pricePerUnit: 1.90, minQuantity: 25 },
      { name: 'Ferrero', pricePerUnit: 1.90, minQuantity: 25 },
      { name: 'Ninho com Nutella', pricePerUnit: 1.90, minQuantity: 25 },
      { name: 'Mini Brownies', pricePerUnit: 1.90, minQuantity: 25 },
    ],
  },
  {
    name: 'Mini Trufas',
    items: [
      { name: 'Brigadeiro', pricePerUnit: 2.80, minQuantity: 25 },
      { name: 'Cocada Cremosa', pricePerUnit: 2.80, minQuantity: 25 },
      { name: 'Nozes', pricePerUnit: 2.80, minQuantity: 25 },
      { name: 'Ninho', pricePerUnit: 2.80, minQuantity: 25 },
    ],
  },
  {
    name: 'Doces Finos',
    items: [
      { name: 'Galícia com Cereja', pricePerUnit: 3.20, minQuantity: 25 },
      { name: 'Galícia com Physalis', pricePerUnit: 3.20, minQuantity: 25 },
      { name: 'Galícia de Ferrero', pricePerUnit: 3.20, minQuantity: 25 },
      { name: 'Galícia de Maracujá', pricePerUnit: 3.20, minQuantity: 25 },
      { name: 'Camafeu de Nozes', pricePerUnit: 3.20, minQuantity: 25 },
      { name: 'Bombons de Nutte', pricePerUnit: 3.20, minQuantity: 25 },
    ],
  },
];

export type CakeType = 'traditional' | 'acetate';

export const CAKE_CATEGORIES = [
  { id: 'traditional' as CakeType, name: 'Bolos Tradicionais / Especiais / Premium' },
  { id: 'acetate' as CakeType, name: 'Bolo no Acetato' },
];

export const MENU_CATEGORIES = [
  { id: 'cakes', name: 'Bolos' },
  { id: 'sweets', name: 'Doces' },
];
