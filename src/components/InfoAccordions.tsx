import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Info, Clock, CreditCard } from 'lucide-react';

export default function InfoAccordions() {
  return (
    <section className="container py-4">
      <Accordion type="multiple" className="space-y-2">
        <AccordionItem value="obs" className="bg-card rounded-lg border px-4">
          <AccordionTrigger className="text-sm font-semibold gap-2">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Observações e Rendimentos
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            <p>Nossos bolos possuem <strong>2 camadas de recheio</strong>, <strong>3 de massa</strong> e aproximadamente <strong>12cm de altura</strong>.</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>1,3 kg → 6-8 fatias</li>
              <li>1,5 kg → 10-12 fatias</li>
              <li>2 kg → 16-17 fatias</li>
              <li>3 kg → 18-25 fatias</li>
              <li>4 kg → 26-38 fatias</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rules" className="bg-card rounded-lg border px-4">
          <AccordionTrigger className="text-sm font-semibold gap-2">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Encomendas e Retiradas
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            <ul className="space-y-1 list-disc list-inside">
              <li>Cancelamento mínimo de <strong>2 dias</strong> antes (senão perde o sinal).</li>
              <li>Atendimento <strong>Terça a Sábado</strong>, das 10h às 18h.</li>
              <li>Retirada no horário combinado com tolerância de <strong>30 minutos</strong>.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pay" className="bg-card rounded-lg border px-4">
          <AccordionTrigger className="text-sm font-semibold gap-2">
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Pagamento
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            <ul className="space-y-1 list-disc list-inside">
              <li>Sinal de <strong>50% via PIX</strong> no ato do pedido.</li>
              <li>Restante na retirada (Pix, Cartão Crédito/Débito ou Dinheiro).</li>
              <li>Chave PIX: <strong>34 99220-5504</strong> (Nubank — Ana Caroline Lima).</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
