import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  WEIGHTS,
  WEIGHT_SERVINGS,
  MASSES,
  FILLINGS,
  FILLING_EXTRAS,
  TOPPINGS,
  CAKE_TOPPERS,
  TIER_LABELS,
  ACETATE_BASE_PRICE,
  type CakeType,
  type FillingTier,
} from '@/data/menu-data';
import { calculateCakePrice, type CakeConfig } from '@/hooks/useCakePrice';

interface Props {
  open: boolean;
  onClose: () => void;
  cakeType: CakeType;
  image: string;
  onAdd: (config: CakeConfig, summary: string, total: number) => void;
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CakeModal({ open, onClose, cakeType, image, onAdd }: Props) {
  const [weight, setWeight] = useState<number>(0);
  const [mass, setMass] = useState('');
  const [fillings, setFillings] = useState<string[]>([]);
  const [fillingExtras, setFillingExtras] = useState<string[]>([]);
  const [topping, setTopping] = useState('');
  const [cakeTopper, setCakeTopper] = useState<string | null>(null);
  const [addNutella, setAddNutella] = useState(false);

  useEffect(() => {
    if (open) {
      setWeight(0);
      setMass('');
      setFillings([]);
      setFillingExtras([]);
      setTopping('');
      setCakeTopper(null);
      setAddNutella(false);
    }
  }, [open]);

  const isAcetate = cakeType === 'acetate';

  const toggleFilling = (name: string) => {
    setFillings((prev) => {
      if (prev.includes(name)) return prev.filter((f) => f !== name);
      if (prev.length >= 2) return prev;
      return [...prev, name];
    });
  };

  const toggleExtra = (name: string) => {
    setFillingExtras((prev) =>
      prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name]
    );
  };

  const config: CakeConfig | null =
    weight > 0 && mass && (isAcetate || fillings.length > 0) && (isAcetate || topping)
      ? { type: cakeType, weight, mass, fillings, fillingExtras, topping, cakeTopper, addNutella }
      : null;

  const breakdown = config ? calculateCakePrice(config) : null;

  const handleSubmit = () => {
    if (!config || !breakdown) return;

    let summary = '';
    if (isAcetate) {
      summary = `Bolo no Acetato | ${weight}kg | Massa: ${mass}`;
      if (addNutella) summary += ' | + Nutella';
      summary += ` | Total: ${formatBRL(breakdown.total)}`;
    } else {
      const fillingNames = fillings
        .map((f) => {
          const fd = FILLINGS.find((fi) => fi.name === f);
          return `${f} (${TIER_LABELS[fd?.tier || 'traditional']})`;
        })
        .join(' + ');
      summary = `Bolo Personalizado | ${weight}kg | Massa: ${mass} | Recheio: ${fillingNames} (R$ ${breakdown.basePerKg}/kg)`;
      if (fillingExtras.length > 0) summary += ` | Extras: ${fillingExtras.join(', ')} (+R$ ${breakdown.extrasPerKg}/kg)`;
      summary += ` | Cobertura: ${topping}`;
      if (breakdown.toppingPerKg > 0) summary += ` (+R$ ${breakdown.toppingPerKg}/kg)`;
      if (cakeTopper) summary += ` | Topo: ${cakeTopper} (+${formatBRL(breakdown.topperPrice)})`;
      summary += ` | Total: ${formatBRL(breakdown.total)}`;
    }

    onAdd(config, summary, breakdown.total);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        {/* Product image header */}
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={isAcetate ? 'Bolo no Acetato' : 'Bolo Personalizado'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5 space-y-5">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-primary">
              {isAcetate ? 'Bolo no Acetato' : 'Monte seu Bolo'}
            </DialogTitle>
          </DialogHeader>

          {/* Step 1: Weight */}
          <div>
            <h4 className="font-semibold text-sm mb-2">1. Tamanho / Peso <span className="text-primary">*</span></h4>
            <div className="grid grid-cols-3 gap-2">
              {WEIGHTS.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={cn(
                    'rounded-lg border p-3 text-center transition-all text-sm',
                    weight === w
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-card hover:border-primary/50'
                  )}
                >
                  <div className="font-bold">{w}kg</div>
                  <div className="text-xs opacity-80">{WEIGHT_SERVINGS[w]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Mass */}
          <div>
            <h4 className="font-semibold text-sm mb-2">2. Massa <span className="text-primary">*</span></h4>
            <div className="flex gap-2">
              {MASSES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMass(m)}
                  className={cn(
                    'flex-1 rounded-lg border p-3 text-center text-sm transition-all',
                    mass === m
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-card hover:border-primary/50'
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {isAcetate ? (
            <div>
              <h4 className="font-semibold text-sm mb-2">3. Adicional</h4>
              <p className="text-xs text-muted-foreground mb-2">Base: {formatBRL(ACETATE_BASE_PRICE)}/kg</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={addNutella} onCheckedChange={(v) => setAddNutella(!!v)} />
                <span className="text-sm">Adicionar Nutella (+R$ 12,00/kg)</span>
              </label>
            </div>
          ) : (
            <>
              {/* Step 3: Fillings */}
              <div>
                <h4 className="font-semibold text-sm mb-2">3. Recheios <span className="text-primary">*</span> (até 2)</h4>
                {(['traditional', 'special', 'premium'] as FillingTier[]).map((tier) => (
                  <div key={tier} className="mb-3">
                    <Badge variant="secondary" className="mb-1.5 text-xs">
                      {TIER_LABELS[tier]} — R$ {tier === 'traditional' ? '70' : tier === 'special' ? '80' : '90'}/kg
                    </Badge>
                    <div className="grid grid-cols-1 gap-1.5">
                      {FILLINGS.filter((f) => f.tier === tier).map((f) => (
                        <button
                          key={f.name}
                          onClick={() => toggleFilling(f.name)}
                          className={cn(
                            'text-left rounded-md border px-3 py-2 text-sm transition-all',
                            fillings.includes(f.name)
                              ? 'bg-primary/10 border-primary font-medium'
                              : 'bg-card hover:border-primary/30',
                            fillings.length >= 2 && !fillings.includes(f.name) && 'opacity-40 cursor-not-allowed'
                          )}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Step 4: Extras */}
              <div>
                <h4 className="font-semibold text-sm mb-2">4. Adicionais no Recheio</h4>
                <div className="space-y-2">
                  {FILLING_EXTRAS.map((e) => (
                    <label key={e.name} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={fillingExtras.includes(e.name)}
                        onCheckedChange={() => toggleExtra(e.name)}
                      />
                      <span className="text-sm">{e.name} (+R$ {e.pricePerKg},00/kg)</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 5: Topping */}
              <div>
                <h4 className="font-semibold text-sm mb-2">5. Cobertura <span className="text-primary">*</span></h4>
                <div className="flex gap-2">
                  {TOPPINGS.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTopping(t.name)}
                      className={cn(
                        'flex-1 rounded-lg border p-3 text-center text-sm transition-all',
                        topping === t.name
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-card hover:border-primary/50'
                      )}
                    >
                      <div>{t.name}</div>
                      <div className="text-xs opacity-80">
                        {t.pricePerKg === 0 ? 'Grátis' : `+R$ ${t.pricePerKg}/kg`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 6: Topper */}
              <div>
                <h4 className="font-semibold text-sm mb-2">6. Topo Temático</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCakeTopper(null)}
                    className={cn(
                      'flex-1 rounded-lg border p-3 text-center text-sm transition-all',
                      cakeTopper === null
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'bg-card hover:border-primary/50'
                    )}
                  >
                    Sem topo
                  </button>
                  {CAKE_TOPPERS.map((ct) => (
                    <button
                      key={ct.name}
                      onClick={() => setCakeTopper(ct.name)}
                      className={cn(
                        'flex-1 rounded-lg border p-3 text-center text-sm transition-all',
                        cakeTopper === ct.name
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-card hover:border-primary/50'
                      )}
                    >
                      <div className="text-xs">{ct.name}</div>
                      <div className="text-xs opacity-80">+{formatBRL(ct.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Price breakdown */}
          {breakdown && (
            <div className="bg-secondary rounded-lg p-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base ({formatBRL(breakdown.basePerKg)}/kg × {weight}kg)</span>
                <span>{formatBRL(breakdown.basePerKg * weight)}</span>
              </div>
              {breakdown.extrasPerKg > 0 && (
                <div className="flex justify-between">
                  <span>Extras recheio (+{formatBRL(breakdown.extrasPerKg)}/kg)</span>
                  <span>{formatBRL(breakdown.extrasPerKg * weight)}</span>
                </div>
              )}
              {breakdown.toppingPerKg > 0 && (
                <div className="flex justify-between">
                  <span>Cobertura (+{formatBRL(breakdown.toppingPerKg)}/kg)</span>
                  <span>{formatBRL(breakdown.toppingPerKg * weight)}</span>
                </div>
              )}
              {breakdown.topperPrice > 0 && (
                <div className="flex justify-between">
                  <span>Topo temático</span>
                  <span>{formatBRL(breakdown.topperPrice)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-primary text-base">
                <span>Total Estimado</span>
                <span>{formatBRL(breakdown.total)}</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!breakdown}
            className="w-full rounded-full"
            size="lg"
          >
            Adicionar ao Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
