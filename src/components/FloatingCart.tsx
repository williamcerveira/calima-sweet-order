import { ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/hooks/useCart';

interface Props {
  items: CartItem[];
  onClick: () => void;
}

export default function FloatingCart({ items, onClick }: Props) {
  if (items.length === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="Ver carrinho"
    >
      <ShoppingBag className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
        {items.length}
      </span>
    </button>
  );
}
