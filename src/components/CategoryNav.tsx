import { cn } from '@/lib/utils';

interface Props {
  activeCategory: string;
  onSelect: (id: string) => void;
}

const categories = [
  { id: 'cakes', label: '🎂 Bolos' },
  { id: 'acetate', label: '🍫 Bolo no Acetato' },
  { id: 'sweets', label: '🍬 Doces' },
];

export default function CategoryNav({ activeCategory, onSelect }: Props) {
  return (
    <nav className="container py-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0',
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
