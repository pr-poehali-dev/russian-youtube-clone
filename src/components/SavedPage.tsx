import { useAppStore } from '@/store/useAppStore';
import { Video } from '@/data/videos';
import VideoCard from './VideoCard';
import Icon from '@/components/ui/icon';

interface SavedPageProps {
  onPlay: (video: Video) => void;
}

export default function SavedPage({ onPlay }: SavedPageProps) {
  const { videos, savedVideos, likedVideos } = useAppStore();
  const saved = videos.filter(v => savedVideos.has(v.id));
  const liked = videos.filter(v => likedVideos.has(v.id));

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
          <Icon name="Bookmark" size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-oswald">Сохранённое</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{saved.length} видео</p>
        </div>
      </div>

      {saved.length === 0 && liked.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-xl font-bold mb-2">Ничего не сохранено</h3>
          <p className="text-center max-w-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Нажмите «Сохранить» под любым видео, и оно появится здесь
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {saved.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Bookmark" size={18} />
                Сохранённые видео
              </h2>
              <div className="video-grid">
                {saved.map(v => <VideoCard key={v.id} video={v} onPlay={onPlay} />)}
              </div>
            </section>
          )}
          {liked.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="ThumbsUp" size={18} />
                Понравившиеся
              </h2>
              <div className="video-grid">
                {liked.map(v => <VideoCard key={v.id} video={v} onPlay={onPlay} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
