import { useState, useCallback } from 'react';
import type { CakeConfig, PriceBreakdown } from './useCakePrice';

export interface CartCakeItem {
  id: string;
  type: 'cake';
  config: CakeConfig;
  breakdown: PriceBreakdown;
  total: number;
  summary: string;
}

export interface CartSweetItem {
  id: string;
  type: 'sweet';
  category: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface CartEasterEggItem {
  id: string;
  type: 'easter-egg';
  name: string;
  weight: string;
  quantity: number;
  price: number;
  total: number;
}

export type CartItem = CartCakeItem | CartSweetItem | CartEasterEggItem;

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.total, 0);

  return { items, addItem, removeItem, clearCart, total };
}
