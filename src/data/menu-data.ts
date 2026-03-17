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

export interface ProductCard {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  image: string;
  category: 'bolos' | 'doces-finos' | 'brigadeiros';
  modalType: 'cake-traditional' | 'cake-acetate' | 'sweet';
  sweetCategoryIndex?: number; // for sweets, index into SWEET_CATEGORIES
}

export const WEIGHTS = [1.3, 1.5, 2, 3, 4] as const;

export const WEIGHT_SERVINGS: Record<number, string> = {
  1.3: '6–8 fatias',
  1.5: '10–12 fatias',
  2: '16–17 fatias',
  3: '18–25 fatias',
  4: '26–38 fatias',
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

// Product cards for the vitrine grid
export const PRODUCT_CARDS: ProductCard[] = [
  {
    id: 'bolo-personalizado',
    name: 'Bolo Personalizado',
    description: 'Escolha recheios Tradicionais, Especiais ou Premium. Massa de baunilha ou chocolate com cobertura à sua escolha.',
    priceLabel: 'A partir de R$ 70,00/kg',
    image: 'card-bolo',
    category: 'bolos',
    modalType: 'cake-traditional',
  },
  {
    id: 'bolo-acetato',
    name: 'Bolo no Acetato',
    description: 'Camadas generosas de creme e chocolate envoltas em acetato transparente. Opção de Nutella.',
    priceLabel: 'R$ 110,00/kg',
    image: 'card-acetato',
    category: 'bolos',
    modalType: 'cake-acetate',
  },
  {
    id: 'brigadeiros-tradicionais',
    name: 'Brigadeiros Tradicionais',
    description: 'Ninho, Beijinho, Dois Amores e Brigadeiro Tradicional. Pedido mínimo de 25 unidades por sabor.',
    priceLabel: 'R$ 1,70 / unidade',
    image: 'card-brigadeiros',
    category: 'brigadeiros',
    modalType: 'sweet',
    sweetCategoryIndex: 0,
  },
  {
    id: 'brigadeiros-especiais',
    name: 'Brigadeiros Especiais',
    description: 'Churros, Olho de Sogra, Ferrero, Ninho com Nutella e Mini Brownies. Mín. 25un por sabor.',
    priceLabel: 'R$ 1,90 / unidade',
    image: 'card-brigadeiros',
    category: 'brigadeiros',
    modalType: 'sweet',
    sweetCategoryIndex: 1,
  },
  {
    id: 'mini-trufas',
    name: 'Mini Trufas',
    description: 'Brigadeiro, Cocada Cremosa, Nozes e Ninho. Irresistíveis em qualquer ocasião. Mín. 25un por sabor.',
    priceLabel: 'R$ 2,80 / unidade',
    image: 'card-trufas',
    category: 'brigadeiros',
    modalType: 'sweet',
    sweetCategoryIndex: 2,
  },
  {
    id: 'doces-finos',
    name: 'Doces Finos',
    description: 'Galícias, Camafeu de Nozes e Bombons de Nutte. Elegância e sofisticação. Mín. 25un por sabor.',
    priceLabel: 'R$ 3,20 / unidade',
    image: 'card-doces-finos',
    category: 'doces-finos',
    modalType: 'sweet',
    sweetCategoryIndex: 3,
  },
];

export const VITRINE_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'bolos', label: 'Bolos' },
  { id: 'doces-finos', label: 'Doces Finos' },
  { id: 'brigadeiros', label: 'Brigadeiros' },
];
