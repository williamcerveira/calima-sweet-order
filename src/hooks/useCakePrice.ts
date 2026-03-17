import { useMemo } from 'react';
import {
  FillingTier,
  TIER_PRICES,
  FILLINGS,
  ACETATE_BASE_PRICE,
  ACETATE_NUTELLA_EXTRA,
  type CakeType,
} from '@/data/menu-data';

export interface CakeConfig {
  type: CakeType;
  weight: number;
  mass: string;
  fillings: string[];
  fillingExtras: string[];
  topping: string;
  cakeTopper: string | null;
  addNutella?: boolean; // acetate only
}

export interface PriceBreakdown {
  basePerKg: number;
  extrasPerKg: number;
  toppingPerKg: number;
  totalPerKg: number;
  subtotalKg: number;
  topperPrice: number;
  total: number;
  highestTier: FillingTier;
}

export function calculateCakePrice(config: CakeConfig): PriceBreakdown {
  if (config.type === 'acetate') {
    const basePerKg = ACETATE_BASE_PRICE;
    const nutellaExtra = config.addNutella ? ACETATE_NUTELLA_EXTRA : 0;
    const totalPerKg = basePerKg + nutellaExtra;
    const subtotalKg = totalPerKg * config.weight;
    return {
      basePerKg,
      extrasPerKg: nutellaExtra,
      toppingPerKg: 0,
      totalPerKg,
      subtotalKg,
      topperPrice: 0,
      total: subtotalKg,
      highestTier: 'premium',
    };
  }

  // Determine highest tier from selected fillings
  let highestTier: FillingTier = 'traditional';
  for (const fname of config.fillings) {
    const f = FILLINGS.find((fi) => fi.name === fname);
    if (!f) continue;
    if (f.tier === 'premium') {
      highestTier = 'premium';
      break;
    }
    if (f.tier === 'special') highestTier = 'special';
  }

  const basePerKg = TIER_PRICES[highestTier];
  const extrasPerKg = config.fillingExtras.length > 0 ? 12 * config.fillingExtras.length : 0;

  let toppingPerKg = 0;
  if (config.topping === 'Ganache Chocolate Nobre') toppingPerKg = 20;

  const totalPerKg = basePerKg + extrasPerKg + toppingPerKg;
  const subtotalKg = totalPerKg * config.weight;

  let topperPrice = 0;
  if (config.cakeTopper === 'Simples') topperPrice = 22;
  if (config.cakeTopper === 'Em Camadas / Laminado') topperPrice = 35;

  const total = subtotalKg + topperPrice;

  return {
    basePerKg,
    extrasPerKg,
    toppingPerKg,
    totalPerKg,
    subtotalKg,
    topperPrice,
    total,
    highestTier,
  };
}

export function useCakePrice(config: CakeConfig | null) {
  return useMemo(() => {
    if (!config || !config.weight || config.fillings.length === 0) return null;
    return calculateCakePrice(config);
  }, [config]);
}
