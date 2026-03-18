import { useState, useEffect, useCallback } from 'react';
import heroImage from '@/assets/hero-cake.jpg';
import heroEaster from '@/assets/hero-easter.png';
import heroEasterMobile from '@/assets/hero-easter-mobile.png';
import { ChevronDown, Gift, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: heroImage,
    imageMobile: heroImage,
    alt: 'Bolo artesanal da Calima Confeitaria',
    title: 'Calima Confeitaria',
    subtitle: 'Confeitaria Artesanal',
    tagline: 'Momentos únicos, Sabor inesquecível.',
    cta: { label: 'Ver Menu', href: '#menu' },
    badgeLabel: null as string | null,
    badgeIcon: null as React.ReactNode,
  },
  {
    image: heroEaster,
    imageMobile: heroEasterMobile,
    alt: 'Ovos de Páscoa Calima Confeitaria',
    title: 'Páscoa Calima',
    subtitle: 'Ovos Trufados Artesanais',
    tagline: 'Sabores que encantam nesta Páscoa',
    cta: { label: 'Ver Ovos', href: '#menu' },
    badgeLabel: 'NOVIDADE',
    badgeIcon: <Gift className="w-3.5 h-3.5" /> as React.ReactNode,
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setTransitioning(false), 50);
      }, 500);
    },
    [current, transitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, goToSlide]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Desktop background images */}
      {slides.map((s, i) => (
        <img
          key={`desktop-${i}`}
          src={s.image}
          alt={s.alt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-700 hidden sm:block',
            i === current && !transitioning ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}

      {/* Mobile background images */}
      {slides.map((s, i) => (
        <img
          key={`mobile-${i}`}
          src={s.imageMobile}
          alt={s.alt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-700 sm:hidden',
            i === current && !transitioning ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div
        className={cn(
          'relative z-10 text-center px-6 max-w-2xl transition-all duration-500',
          transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        )}
      >
        {slide.badgeLabel && (
          <span className="inline-flex items-center gap-1.5 bg-amber-400/90 backdrop-blur-sm text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full mb-4 animate-bounce">
            {slide.badgeIcon}
            {slide.badgeLabel}
          </span>
        )}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white mb-4 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-white/90 text-base sm:text-xl font-light tracking-wide mb-2">
          {slide.subtitle}
        </p>
        <p className="text-white/70 text-sm sm:text-base font-light italic mb-10">
          {slide.tagline}
        </p>
        <a
          href={slide.cta.href}
          className="inline-flex items-center gap-2 border border-white/60 text-white px-8 py-3 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
        >
          {slide.cta.label}
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={cn(
              'rounded-full transition-all duration-300',
              i === current
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
