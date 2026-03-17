import logo from '@/assets/logo-calima.png';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="container flex items-center justify-center py-3">
        <img src={logo} alt="Calima Confeitaria" className="h-14 object-contain" />
      </div>
    </header>
  );
}
