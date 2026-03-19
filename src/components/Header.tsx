import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { searchQuery, setSearchQuery, toggleSidebar, subscribedChannels } = useAppStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = () => {
    setSearchQuery(inputValue);
    if (inputValue.trim()) onNavigate('home');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
      style={{ background: 'hsl(220 13% 7% / 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid hsl(var(--border))' }}>
      
      {/* Left: Logo + Burger */}
      <div className="flex items-center gap-3 min-w-[180px]">
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <Icon name="Menu" size={20} />
        </button>
        <button onClick={() => { setSearchQuery(''); setInputValue(''); onNavigate('home'); }} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
            <Icon name="Play" size={16} className="text-white ml-0.5" />
          </div>
          <span className="font-oswald text-lg font-bold tracking-wide text-white">ВидеоПоток</span>
        </button>
      </div>

      {/* Center: Search */}
      <div className="flex items-center max-w-[560px] w-full mx-4">
        <input
          type="text"
          placeholder="Поиск видео, каналов..."
          className="search-input flex-1 w-full"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={handleSearch}>
          <Icon name="Search" size={18} />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 min-w-[180px] justify-end">
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors relative"
          onClick={() => onNavigate('notifications')}
          title="Уведомления"
        >
          <Icon name="Bell" size={20} />
          <span className="notification-dot" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => onNavigate('subscriptions')}
          title="Подписки"
        >
          <Icon name="Users" size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => onNavigate('saved')}
          title="Сохранённое"
        >
          <Icon name="Bookmark" size={20} />
        </button>
        <button
          className="ml-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: 'hsl(var(--primary))' }}
          onClick={() => onNavigate('profile')}
          title="Профиль"
        >
          ВП
        </button>
      </div>
    </header>
  );
}
