import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Egg, Gift, Sparkles } from 'lucide-react';
import popupImage from '@/assets/card-ovos-pascoa.jpg';

const STORAGE_KEY = 'calima-easter-popup-seen';

export default function EasterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleViewEggs = () => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Banner image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={popupImage}
            alt="Ovos de Páscoa Calima Confeitaria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
            <div className="inline-flex items-center gap-1 bg-amber-400/90 backdrop-blur-sm text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Egg className="w-3 h-3" />
              NOVIDADE
            </div>
            <h2 className="font-display text-3xl text-white drop-shadow-lg mb-1">
              Páscoa Calima
            </h2>
            <p className="text-white/90 text-sm mb-1">
              Ovos trufados artesanais
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-3 text-center space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nossos <strong>ovos de Páscoa artesanais</strong> já estão disponíveis! <Sparkles className="inline w-3.5 h-3.5 text-amber-500" /> Recheios irresistíveis de brigadeiro, Ninho com Nutella e Ferrero Rocher.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={handleViewEggs} className="w-full rounded-full" size="lg">
              <Gift className="w-4 h-4" /> Ver Ovos de Páscoa
            </Button>
            <button
              onClick={handleClose}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Talvez depois
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
