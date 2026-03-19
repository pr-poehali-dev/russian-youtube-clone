import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/data/videos';
import { useRef } from 'react';

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`tag-pill flex-shrink-0 ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, hsl(var(--background)))' }} />
    </div>
  );
}
