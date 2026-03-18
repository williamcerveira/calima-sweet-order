import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Egg } from 'lucide-react';
import { EASTER_EGG_OPTIONS } from '@/data/menu-data';
import type { CartEasterEggItem } from '@/hooks/useCart';

interface Props {
  open: boolean;
  onClose: () => void;
  image: string;
  onAdd: (item: Omit<CartEasterEggItem, 'id'>) => void;
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function EasterEggModal({ open, onClose, image, onAdd }: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (open) setQuantities({});
  }, [open]);

  const setQty = (name: string, val: number) => {
    const clamped = Math.max(1, Math.round(val));
    setQuantities((prev) => ({ ...prev, [name]: clamped }));
  };

  const handleAdd = (name: string, weight: string, price: number) => {
    const qty = quantities[name] || 1;
    onAdd({
      type: 'easter-egg',
      name,
      weight,
      quantity: qty,
      price,
      total: qty * price,
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
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
          <img src={image} alt="Ovos de Páscoa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-white drop-shadow-lg flex items-center gap-2">
                <Egg className="w-6 h-6" />
                Ovos de Páscoa
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs text-white/80 mt-1">
              Ovos trufados artesanais — feitos com amor 🐣
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="space-y-3">
            {EASTER_EGG_OPTIONS.map((egg) => {
              const qty = quantities[egg.name];
              const isOpen = qty !== undefined;

              return (
                <div key={egg.name} className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{egg.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{egg.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {egg.weight} • {formatBRL(egg.price)}
                      </p>
                    </div>
                    {!isOpen ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setQty(egg.name, 1)}
                        className="rounded-full shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => {
                            if (qty <= 1) {
                              setQuantities((prev) => {
                                const next = { ...prev };
                                delete next[egg.name];
                                return next;
                              });
                            } else {
                              setQty(egg.name, qty - 1);
                            }
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(egg.name, Number(e.target.value))}
                          className="w-16 h-8 text-center text-sm"
                          min={1}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setQty(egg.name, qty + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        {formatBRL(qty * egg.price)}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleAdd(egg.name, egg.weight, egg.price)}
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
