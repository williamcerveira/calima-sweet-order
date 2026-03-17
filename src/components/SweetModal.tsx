import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import type { SweetCategory } from '@/data/menu-data';
import type { CartSweetItem } from '@/hooks/useCart';

interface Props {
  open: boolean;
  onClose: () => void;
  category: SweetCategory | null;
  image: string;
  onAdd: (item: Omit<CartSweetItem, 'id'>) => void;
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function SweetModal({ open, onClose, category, image, onAdd }: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (open) setQuantities({});
  }, [open]);

  if (!category) return null;

  const setQty = (name: string, val: number, min: number) => {
    const clamped = Math.max(min, Math.round(val));
    setQuantities((prev) => ({ ...prev, [name]: clamped }));
  };

  const handleAdd = (name: string, pricePerUnit: number, minQty: number) => {
    const qty = quantities[name] || minQty;
    onAdd({
      type: 'sweet',
      category: category.name,
      name,
      quantity: qty,
      pricePerUnit,
      total: qty * pricePerUnit,
    });
    setQuantities((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
          <img src={image} alt={category.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-5">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-primary">
              {category.name}
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground mb-4">
            Pedido mínimo de 25 unidades por sabor
          </p>

          <div className="space-y-3">
            {category.items.map((item) => {
              const qty = quantities[item.name];
              const isOpen = qty !== undefined;

              return (
                <div key={item.name} className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBRL(item.pricePerUnit)}/un • mín. {item.minQuantity}un
                      </p>
                    </div>
                    {!isOpen ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setQty(item.name, item.minQuantity, item.minQuantity)}
                        className="rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            if (qty <= item.minQuantity) {
                              setQuantities((prev) => {
                                const next = { ...prev };
                                delete next[item.name];
                                return next;
                              });
                            } else {
                              setQty(item.name, qty - item.minQuantity, item.minQuantity);
                            }
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(item.name, Number(e.target.value), item.minQuantity)}
                          className="w-16 h-8 text-center text-sm"
                          min={item.minQuantity}
                          step={item.minQuantity}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setQty(item.name, qty + item.minQuantity, item.minQuantity)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        {formatBRL(qty * item.pricePerUnit)}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleAdd(item.name, item.pricePerUnit, item.minQuantity)}
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
      </DialogContent>
    </Dialog>
  );
}
