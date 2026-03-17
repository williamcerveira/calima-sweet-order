import { Instagram, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground py-14">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <h3 className="font-display text-3xl text-primary mb-3">Calima</h3>
            <p className="text-sm text-dark-foreground/60 leading-relaxed mb-4">
              Feito com amor, dedicação e os melhores ingredientes artesanais.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-dark-foreground/60 hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @calimaconfeitaria
            </a>
          </div>

          {/* Col 2: Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-dark-foreground/80">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-dark-foreground/60">
              <li>Chef Ana Caroline Lima</li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5" />
                (34) 99220-5504
              </li>
              <li className="text-xs mt-2">
                Chave PIX: 34 99220-5504<br />
                <span className="text-dark-foreground/40">Nubank — Ana Caroline Lima</span>
              </li>
            </ul>
          </div>

          {/* Col 3: How to get there */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-dark-foreground/80">
              Como Chegar
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://waze.com/ul"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-dark-foreground/20 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors w-fit"
              >
                <ExternalLink className="w-3 h-3" />
                Abrir no Waze
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-dark-foreground/20 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors w-fit"
              >
                <MapPin className="w-3 h-3" />
                Google Maps
              </a>
            </div>
          </div>

          {/* Col 4: Map placeholder */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-dark-foreground/80">
              Localização
            </h4>
            <div className="w-full h-36 bg-dark-foreground/10 rounded-lg flex items-center justify-center text-dark-foreground/30 text-xs">
              <MapPin className="w-5 h-5 mr-1" />
              Mapa em breve
            </div>
          </div>
        </div>

        <div className="border-t border-dark-foreground/10 mt-10 pt-6 text-center text-xs text-dark-foreground/40">
          © {new Date().getFullYear()} Calima Confeitaria Artesanal. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
