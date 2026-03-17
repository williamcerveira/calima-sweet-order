import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Mariana S.',
    text: 'Bolo maravilhoso e atendimento impecável! Superou todas as expectativas da festa.',
    avatar: 'MS',
  },
  {
    name: 'Carolina R.',
    text: 'Os doces finos são divinos! Sempre peço para os meus eventos. Qualidade incomparável.',
    avatar: 'CR',
  },
  {
    name: 'Fernanda L.',
    text: 'O bolo de Mousse de Ferrero é simplesmente o melhor que já provei. Virei cliente fiel!',
    avatar: 'FL',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/50">
      <div className="container max-w-5xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center text-primary mb-10">
          O que dizem nossos clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-xl p-6 shadow-sm text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mb-5 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {t.avatar}
                </div>
                <span className="font-medium text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
