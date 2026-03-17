import heroImage from '@/assets/hero-cake.jpg';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Bolo artesanal da Calima Confeitaria"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white mb-4 drop-shadow-lg">
          Calima Confeitaria
        </h1>
        <p className="text-white/90 text-lg sm:text-xl font-light tracking-wide mb-2">
          Confeitaria Artesanal
        </p>
        <p className="text-white/70 text-sm sm:text-base font-light italic mb-10">
          Momentos únicos, Sabor inesquecível.
        </p>
        <a
          href="#menu"
          className="inline-flex items-center gap-2 border border-white/60 text-white px-8 py-3 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
        >
          Ver Menu
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
