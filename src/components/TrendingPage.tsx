import { useAppStore } from '@/store/useAppStore';
import { Video } from '@/data/videos';
import VideoCard from './VideoCard';
import Icon from '@/components/ui/icon';

interface TrendingPageProps {
  onPlay: (video: Video) => void;
}

export default function TrendingPage({ onPlay }: TrendingPageProps) {
  const { videos } = useAppStore();
  const trending = [...videos].sort((a, b) => b.viewsNum - a.viewsNum);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
          <Icon name="TrendingUp" size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-oswald">Тренды</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Самые популярные видео прямо сейчас</p>
        </div>
      </div>

      <div className="space-y-4">
        {trending.map((video, i) => (
          <div key={video.id} className="flex gap-4 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer group animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => onPlay(video)}>
            <div className="flex items-center justify-center w-10 font-oswald text-2xl font-bold flex-shrink-0"
              style={{ color: i < 3 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>
              {i + 1}
            </div>
            <div className="thumbnail-container flex-shrink-0" style={{ width: 168, height: 95, paddingTop: 0, position: 'relative' }}>
              <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
              <span className="duration-badge">{video.duration}</span>
            </div>
            <div className="flex-1 min-w-0 py-1">
              <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
              <p className="text-sm mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{video.channel}</p>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={13} />
                  {video.views} просм.
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ThumbsUp" size={13} />
                  {(video.likes / 1000).toFixed(0)}к
                </span>
                <span>{video.uploadedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
