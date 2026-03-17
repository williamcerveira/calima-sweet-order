import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Send, ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/hooks/useCart';

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const PAYMENT_OPTIONS = ['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'];

export default function CheckoutSheet({ open, onClose, items, total, onRemove, onClear }: Props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [payment, setPayment] = useState('');

  const canSubmit = name.trim() && date && payment && items.length > 0;

  const buildMessage = () => {
    let msg = `Olá Ana! Quero fazer uma encomenda:\n\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    msg += `📅 *Retirada:* ${date}\n`;
    msg += `💳 *Pagamento (retirada):* ${payment}\n\n`;

    items.forEach((item, i) => {
      if (item.type === 'cake') {
        msg += `${i + 1}. ${item.summary}\n\n`;
      } else {
        msg += `${i + 1}. ${item.category} — ${item.name} | ${item.quantity}un × ${formatBRL(item.pricePerUnit)} = ${formatBRL(item.total)}\n\n`;
      }
    });

    msg += `━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL: ${formatBRL(total)}*\n`;
    msg += `💰 *Sinal (50%): ${formatBRL(total / 2)}*\n\n`;
    msg += `Chave PIX: 34 99220-5504 (Nubank - Ana Caroline Lima)`;

    return msg;
  };

  const handleSend = () => {
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/5534992205504?text=${msg}`, '_blank');
    onClear();
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-primary flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Seu Pedido
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="bg-secondary/50 rounded-lg p-3 flex items-start gap-2">
                  <div className="flex-1 text-sm">
                    {item.type === 'cake' ? (
                      <p>{item.summary}</p>
                    ) : (
                      <p>
                        <strong>{item.name}</strong> ({item.category}) — {item.quantity}un = {formatBRL(item.total)}
                      </p>
                    )}
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-destructive p-1 hover:bg-destructive/10 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex justify-between font-bold text-primary text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatBRL(total)}</span>
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div className="space-y-3 pt-2">
              <div>
                <Label className="text-sm font-medium">Nome</Label>
                <Input
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Data / Hora de Retirada</Label>
                <Input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Forma de Pagamento (na retirada)</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {PAYMENT_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPayment(p)}
                      className={`rounded-full border p-2 text-sm transition-all ${
                        payment === p
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card hover:border-primary/50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSend}
                disabled={!canSubmit}
                className="w-full gap-2 rounded-full"
                size="lg"
              >
                <Send className="w-4 h-4" />
                Finalizar no WhatsApp
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
