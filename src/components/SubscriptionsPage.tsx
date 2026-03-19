import { useAppStore } from '@/store/useAppStore';
import { Video } from '@/data/videos';
import VideoCard from './VideoCard';
import Icon from '@/components/ui/icon';

interface SubscriptionsPageProps {
  onPlay: (video: Video) => void;
}

export default function SubscriptionsPage({ onPlay }: SubscriptionsPageProps) {
  const { videos, channels, subscribedChannels, toggleSubscribe } = useAppStore();
  const myChannelIds = Array.from(subscribedChannels);
  const myChannels = channels.filter(c => myChannelIds.includes(c.id));
  const myVideos = videos.filter(v => myChannelIds.includes(v.channelId));

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
          <Icon name="Users" size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-oswald">Подписки</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{myChannels.length} каналов</p>
        </div>
      </div>

      {myChannels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-xl font-bold mb-2">Нет подписок</h3>
          <p className="text-center max-w-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Подписывайтесь на каналы, и их видео будут появляться здесь
          </p>
        </div>
      ) : (
        <>
          {/* Channel avatars */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {myChannels.map(ch => (
              <div key={ch.id} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform"
                  style={{ background: ch.color }}>
                  {ch.name.charAt(0)}
                </div>
                <span className="text-xs text-center max-w-[64px] truncate">{ch.name}</span>
              </div>
            ))}
          </div>

          {/* Subscribed videos */}
          {myVideos.length > 0 ? (
            <div className="video-grid">
              {myVideos.map(v => (
                <VideoCard key={v.id} video={v} onPlay={onPlay} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <p>Новых видео пока нет</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
