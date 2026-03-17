import { CreditCard, Clock, MapPin } from 'lucide-react';

const INFO_ITEMS = [
  {
    icon: CreditCard,
    title: 'Pagamento',
    text: 'Sinal de 50% via PIX para confirmar a encomenda. Restante na retirada (PIX, Cartão ou Dinheiro).',
  },
  {
    icon: Clock,
    title: 'Antecedência',
    text: 'Cancelamentos devem ser feitos com no mínimo 2 dias de antecedência, ou o sinal fica retido.',
  },
  {
    icon: MapPin,
    title: 'Retirada',
    text: 'Terça a Sábado (10h às 18h). Tolerância de 30 min do horário combinado.',
  },
];

export default function InfoSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {INFO_ITEMS.map((item) => (
            <div key={item.title} className="text-center group">
              <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:border-primary transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
