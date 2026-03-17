import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SWEET_CATEGORIES } from '@/data/menu-data';
import { Plus, Minus } from 'lucide-react';
import type { CartSweetItem } from '@/hooks/useCart';

interface Props {
  onAdd: (item: Omit<CartSweetItem, 'id'>) => void;
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function SweetsSection({ onAdd }: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getKey = (cat: string, name: string) => `${cat}|${name}`;

  const setQty = (key: string, val: number, min: number) => {
    const clamped = Math.max(min, Math.round(val));
    setQuantities((prev) => ({ ...prev, [key]: clamped }));
  };

  const handleAdd = (cat: string, name: string, pricePerUnit: number, minQty: number) => {
    const key = getKey(cat, name);
    const qty = quantities[key] || minQty;
    onAdd({
      type: 'sweet',
      category: cat,
      name,
      quantity: qty,
      pricePerUnit,
      total: qty * pricePerUnit,
    });
    setQuantities((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {SWEET_CATEGORIES.map((cat) => (
        <div key={cat.name}>
          <h3 className="font-display text-xl text-primary mb-3">{cat.name}</h3>
          <div className="space-y-2">
            {cat.items.map((item) => {
              const key = getKey(cat.name, item.name);
              const qty = quantities[key];
              const isOpen = qty !== undefined;

              return (
                <div
                  key={item.name}
                  className="bg-card rounded-lg border p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBRL(item.pricePerUnit)}/un • mín. {item.minQuantity} un
                      </p>
                    </div>
                    {!isOpen ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setQty(key, item.minQuantity, item.minQuantity)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => {
                            if (qty <= item.minQuantity) {
                              setQuantities((prev) => {
                                const next = { ...prev };
                                delete next[key];
                                return next;
                              });
                            } else {
                              setQty(key, qty - item.minQuantity, item.minQuantity);
                            }
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(key, Number(e.target.value), item.minQuantity)}
                          className="w-16 h-8 text-center text-sm"
                          min={item.minQuantity}
                          step={item.minQuantity}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => setQty(key, qty + item.minQuantity, item.minQuantity)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {formatBRL(qty * item.pricePerUnit)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAdd(cat.name, item.name, item.pricePerUnit, item.minQuantity)}
                      >
                        Adicionar
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
