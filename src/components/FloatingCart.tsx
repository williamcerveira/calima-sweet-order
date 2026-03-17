import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem } from '@/hooks/useCart';

interface Props {
  items: CartItem[];
  total: number;
  onClick: () => void;
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function FloatingCart({ items, total, onClick }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <Button
        onClick={onClick}
        className="w-full max-w-md mx-auto flex items-center justify-between rounded-2xl shadow-lg h-14 px-5"
        size="lg"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          <span className="font-semibold">{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
        </span>
        <span className="font-bold text-lg">{formatBRL(total)}</span>
      </Button>
    </div>
  );
}
