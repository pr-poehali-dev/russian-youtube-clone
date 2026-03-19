import { useAppStore } from '@/store/useAppStore';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { icon: 'Home', label: 'Главная', page: 'home' },
  { icon: 'TrendingUp', label: 'Тренды', page: 'trending' },
  { icon: 'Users', label: 'Подписки', page: 'subscriptions' },
  { icon: 'Bookmark', label: 'Сохранённое', page: 'saved' },
  { icon: 'History', label: 'История', page: 'history' },
  { icon: 'ThumbsUp', label: 'Понравившиеся', page: 'liked' },
];

const extraItems = [
  { icon: 'Music', label: 'Музыка', page: 'music' },
  { icon: 'Gamepad2', label: 'Игры', page: 'games' },
  { icon: 'Newspaper', label: 'Новости', page: 'news' },
  { icon: 'Zap', label: 'Спорт', page: 'sport' },
  { icon: 'GraduationCap', label: 'Образование', page: 'education' },
];

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const { sidebarOpen, subscribedChannels, channels } = useAppStore();

  if (!sidebarOpen) return null;

  const myChannels = channels.filter(c => subscribedChannels.has(c.id));

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 overflow-y-auto z-40 py-3 px-2"
      style={{ background: 'hsl(var(--sidebar-background))', borderRight: '1px solid hsl(var(--sidebar-border))' }}>
      
      <nav className="space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`sidebar-link w-full ${currentPage === item.page ? 'active' : ''}`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="my-3 border-t border-sidebar-border" />

      <p className="px-4 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Разделы
      </p>
      <nav className="space-y-0.5">
        {extraItems.map(item => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`sidebar-link w-full ${currentPage === item.page ? 'active' : ''}`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {myChannels.length > 0 && (
        <>
          <div className="my-3 border-t border-sidebar-border" />
          <p className="px-4 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Мои подписки
          </p>
          <nav className="space-y-0.5">
            {myChannels.map(ch => (
              <button
                key={ch.id}
                onClick={() => onNavigate('channel')}
                className="sidebar-link w-full"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: ch.color }}>
                  {ch.name.charAt(0)}
                </div>
                <span className="truncate">{ch.name}</span>
              </button>
            ))}
          </nav>
        </>
      )}

      <div className="my-3 border-t border-sidebar-border" />
      <div className="px-4 space-y-2">
        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          © 2025 ВидеоПоток
        </p>
        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          О сервисе · Правила · Конфиденциальность
        </p>
      </div>
    </aside>
  );
}