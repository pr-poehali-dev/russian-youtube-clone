import { useAppStore } from '@/store/useAppStore';
import { Video } from '@/data/videos';
import VideoCard from './VideoCard';
import CategoryBar from './CategoryBar';

interface HomePageProps {
  onPlay: (video: Video) => void;
}

export default function HomePage({ onPlay }: HomePageProps) {
  const { getFilteredVideos, searchQuery, activeCategory } = useAppStore();
  const videos = getFilteredVideos();

  return (
    <div>
      {/* Category filter */}
      <div className="sticky top-14 z-30 py-3 -mx-6 px-6 mb-5" style={{ background: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(8px)' }}>
        <CategoryBar />
      </div>

      {/* Search result label */}
      {searchQuery && (
        <div className="mb-4 animate-fade-in">
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Результаты поиска: <span className="font-semibold text-foreground">«{searchQuery}»</span> — {videos.length} видео
          </p>
        </div>
      )}

      {/* Video grid */}
      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            Попробуйте другой запрос или измените категорию
          </p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video, i) => (
            <div key={video.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <VideoCard video={video} onPlay={onPlay} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
