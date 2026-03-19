import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';
import VitrineSection from '@/components/VitrineSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import CakeModal from '@/components/CakeModal';
import SweetModal from '@/components/SweetModal';
import EasterEggModal from '@/components/EasterEggModal';
import EasterPopup from '@/components/EasterPopup';
import FloatingCart from '@/components/FloatingCart';
import CheckoutSheet from '@/components/CheckoutSheet';
import { useCart, type CartSweetItem, type CartEasterEggItem } from '@/hooks/useCart';
import type { CakeConfig } from '@/hooks/useCakePrice';
import type { ProductCard } from '@/data/menu-data';
import { SWEET_CATEGORIES } from '@/data/menu-data';

import cardBolo from '@/assets/card-bolo.jpg';
import cardAcetato from '@/assets/card-acetato.jpg';
import cardBrigadeiros from '@/assets/card-brigadeiros.jpg';
import cardDocesFinos from '@/assets/card-doces-finos.jpg';
import cardTrufas from '@/assets/card-trufas.jpg';
import cardOvosPascoa from '@/assets/card-ovos-pascoa.jpg';

const IMAGE_MAP: Record<string, string> = {
  'card-bolo': cardBolo,
  'card-acetato': cardAcetato,
  'card-brigadeiros': cardBrigadeiros,
  'card-doces-finos': cardDocesFinos,
  'card-trufas': cardTrufas,
  'card-ovos-pascoa': cardOvosPascoa,
};

export default function Index() {
  const [cakeModalOpen, setCakeModalOpen] = useState(false);
  const [cakeType, setCakeType] = useState<'traditional' | 'acetate'>('traditional');
  const [cakeImage, setCakeImage] = useState('');

  const [sweetModalOpen, setSweetModalOpen] = useState(false);
  const [sweetCatIndex, setSweetCatIndex] = useState(0);
  const [sweetImage, setSweetImage] = useState('');

  const [easterModalOpen, setEasterModalOpen] = useState(false);
  const [easterImage, setEasterImage] = useState('');

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const cart = useCart();

  const handleOpenProduct = (product: ProductCard) => {
    const img = IMAGE_MAP[product.image] || '';

    if (product.modalType === 'cake-traditional') {
      setCakeType('traditional');
      setCakeImage(img);
      setCakeModalOpen(true);
    } else if (product.modalType === 'cake-acetate') {
      setCakeType('acetate');
      setCakeImage(img);
      setCakeModalOpen(true);
    } else if (product.modalType === 'sweet' && product.sweetCategoryIndex !== undefined) {
      setSweetCatIndex(product.sweetCategoryIndex);
      setSweetImage(img);
      setSweetModalOpen(true);
    } else if (product.modalType === 'easter-egg') {
      setEasterImage(img);
      setEasterModalOpen(true);
    }
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

  const handleEasterAdd = (item: Omit<CartEasterEggItem, 'id'>) => {
    cart.addItem({ ...item, id: crypto.randomUUID() });
  };

  return (
    <div className="min-h-screen font-body">
      <EasterPopup />
      <HeroSection />
      <InfoSection />
      <VitrineSection onOpenProduct={handleOpenProduct} />
      <TestimonialsSection />
      <Footer />

      <CakeModal
        open={cakeModalOpen}
        onClose={() => setCakeModalOpen(false)}
        cakeType={cakeType}
        image={cakeImage}
        onAdd={handleCakeAdd}
      />

      <SweetModal
        open={sweetModalOpen}
        onClose={() => setSweetModalOpen(false)}
        category={SWEET_CATEGORIES[sweetCatIndex] || null}
        image={sweetImage}
        onAdd={handleSweetAdd}
      />

      <EasterEggModal
        open={easterModalOpen}
        onClose={() => setEasterModalOpen(false)}
        image={easterImage}
        onAdd={handleEasterAdd}
      />

      <FloatingCart items={cart.items} onClick={() => setCheckoutOpen(true)} />

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
