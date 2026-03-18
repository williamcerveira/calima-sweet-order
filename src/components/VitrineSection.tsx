import { useState } from 'react';
import { PRODUCT_CARDS, VITRINE_FILTERS, type ProductCard } from '@/data/menu-data';
import { cn } from '@/lib/utils';

import cardBolo from '@/assets/card-bolo.jpg';
import cardAcetato from '@/assets/card-acetato.jpg';
import cardBrigadeiros from '@/assets/card-brigadeiros.jpg';
import cardDocesFinos from '@/assets/card-doces-finos.jpg';
import cardTrufas from '@/assets/card-trufas.jpg';
import cardOvosPascoa from '@/assets/card-ovos-pascoa.png';

const IMAGE_MAP: Record<string, string> = {
  'card-bolo': cardBolo,
  'card-acetato': cardAcetato,
  'card-brigadeiros': cardBrigadeiros,
  'card-doces-finos': cardDocesFinos,
  'card-trufas': cardTrufas,
  'card-ovos-pascoa': cardOvosPascoa,
};

interface Props {
  onOpenProduct: (product: ProductCard) => void;
}

export default function VitrineSection({ onOpenProduct }: Props) {
  const [filter, setFilter] = useState('todos');

  const filtered = filter === 'todos'
    ? PRODUCT_CARDS
    : PRODUCT_CARDS.filter((p) => p.category === filter);

  return (
    <section id="menu" className="py-16 sm:py-20">
      <div className="container max-w-6xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-primary mb-3">
          Nossas Criações
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Escolha, personalize e encomende pelo WhatsApp
        </p>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {VITRINE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                filter === f.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={IMAGE_MAP[product.image]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold text-sm">
                    {product.priceLabel}
                  </span>
                  <button
                    onClick={() => onOpenProduct(product)}
                    className="px-4 py-2 border border-primary text-primary rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    Montar Pedido
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
