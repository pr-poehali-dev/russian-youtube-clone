import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Video } from '@/data/videos';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/HomePage';
import VideoPlayer from '@/components/VideoPlayer';
import TrendingPage from '@/components/TrendingPage';
import SubscriptionsPage from '@/components/SubscriptionsPage';
import SavedPage from '@/components/SavedPage';

function ProfilePage() {
  const store = useAppStore();
  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl" style={{ background: 'hsl(var(--secondary))' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
          style={{ background: 'hsl(var(--primary))' }}>
          ВП
        </div>
        <div>
          <h1 className="text-2xl font-bold font-oswald">Вы</h1>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Гость · Зарегистрирован сегодня</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Подписок', value: store.subscribedChannels.size },
          { label: 'Лайков', value: store.likedVideos.size },
          { label: 'Сохранено', value: store.savedVideos.size },
        ].map(stat => (
          <div key={stat.label} className="text-center p-4 rounded-xl" style={{ background: 'hsl(var(--secondary))' }}>
            <p className="text-2xl font-bold font-oswald" style={{ color: 'hsl(var(--primary))' }}>{stat.value}</p>
            <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsPage() {
  const notifications = [
    { icon: '🔴', text: 'VDude опубликовал новое видео: «Я выжил в Антарктиде 30 дней»', time: '2 часа назад' },
    { icon: '👍', text: 'Ваш комментарий набрал 100 лайков', time: '5 часов назад' },
    { icon: '📺', text: 'Антон Птушкин начал прямой эфир: «Токио. День 3»', time: '1 день назад' },
    { icon: '💬', text: 'Редакция ответила на ваш комментарий', time: '2 дня назад' },
    { icon: '🔴', text: 'ПашАС опубликовал новое видео: «Я сыграл 1000 часов в GTA 6»', time: '3 дня назад' },
  ];
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold font-oswald mb-6">Уведомления</h1>
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary transition-colors cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="text-2xl flex-shrink-0">{n.icon}</span>
            <div>
              <p className="text-sm">{n.text}</p>
              <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState('home');
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const { sidebarOpen } = useAppStore();

  const handlePlay = (video: Video) => {
    setPlayingVideo(video);
    setPage('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (p: string) => {
    if (p !== 'player') setPlayingVideo(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainLeft = sidebarOpen ? '14rem' : '0';

  const renderPage = () => {
    if (page === 'player' && playingVideo) {
      return <VideoPlayer video={playingVideo} onPlay={handlePlay} onClose={() => handleNavigate('home')} />;
    }
    if (page === 'trending') return <TrendingPage onPlay={handlePlay} />;
    if (page === 'subscriptions') return <SubscriptionsPage onPlay={handlePlay} />;
    if (page === 'saved' || page === 'liked') return <SavedPage onPlay={handlePlay} />;
    if (page === 'notifications') return <NotificationsPage />;
    if (page === 'profile') return <ProfilePage />;
    return <HomePage onPlay={handlePlay} />;
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <Header onNavigate={handleNavigate} currentPage={page} />
      <Sidebar onNavigate={handleNavigate} currentPage={page} />
      <main
        className="pt-14 transition-all duration-300"
        style={{ marginLeft: mainLeft, padding: '1.5rem 1.5rem 3rem' }}
      >
        {renderPage()}
      </main>
    </div>
  );
}
