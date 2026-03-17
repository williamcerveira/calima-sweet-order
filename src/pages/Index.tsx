import { useState } from 'react';
import Header from '@/components/Header';
import InfoAccordions from '@/components/InfoAccordions';
import CategoryNav from '@/components/CategoryNav';
import CakeModal from '@/components/CakeModal';
import SweetsSection from '@/components/SweetsSection';
import FloatingCart from '@/components/FloatingCart';
import CheckoutSheet from '@/components/CheckoutSheet';
import { Button } from '@/components/ui/button';
import { useCart, type CartSweetItem } from '@/hooks/useCart';
import type { CakeConfig } from '@/hooks/useCakePrice';
import type { CakeType } from '@/data/menu-data';
import { Cake, ChefHat } from 'lucide-react';

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('cakes');
  const [cakeModalOpen, setCakeModalOpen] = useState(false);
  const [cakeType, setCakeType] = useState<CakeType>('traditional');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const cart = useCart();

  const openCakeModal = (type: CakeType) => {
    setCakeType(type);
    setCakeModalOpen(true);
  };

  const handleCakeAdd = (config: CakeConfig, summary: string, total: number) => {
    cart.addItem({
      id: crypto.randomUUID(),
      type: 'cake',
      config,
      breakdown: {} as any,
      total,
      summary,
    });
  };

  const handleSweetAdd = (item: Omit<CartSweetItem, 'id'>) => {
    cart.addItem({ ...item, id: crypto.randomUUID() });
  };

  return (
    <div className="min-h-screen pb-24 font-body">
      <Header />
      <InfoAccordions />
      <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />

      <main className="container">
        {activeCategory === 'cakes' && (
          <div className="space-y-3">
            <button
              onClick={() => openCakeModal('traditional')}
              className="w-full bg-card border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Cake className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Bolo Personalizado</h3>
                <p className="text-sm text-muted-foreground">Tradicional, Especial ou Premium — a partir de R$ 70/kg</p>
              </div>
            </button>
          </div>
        )}

        {activeCategory === 'acetate' && (
          <div className="space-y-3">
            <button
              onClick={() => openCakeModal('acetate')}
              className="w-full bg-card border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <ChefHat className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Bolo no Acetato</h3>
                <p className="text-sm text-muted-foreground">R$ 110/kg — opção de Nutella</p>
              </div>
            </button>
          </div>
        )}

        {activeCategory === 'sweets' && <SweetsSection onAdd={handleSweetAdd} />}
      </main>

      <CakeModal
        open={cakeModalOpen}
        onClose={() => setCakeModalOpen(false)}
        cakeType={cakeType}
        onAdd={handleCakeAdd}
      />

      <FloatingCart items={cart.items} total={cart.total} onClick={() => setCheckoutOpen(true)} />

      <CheckoutSheet
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart.items}
        total={cart.total}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
      />
    </div>
  );
}
