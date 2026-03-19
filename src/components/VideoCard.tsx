import { Video } from '@/data/videos';
import { useAppStore } from '@/store/useAppStore';
import Icon from '@/components/ui/icon';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  compact?: boolean;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return (n / 1000).toFixed(0) + ' тыс';
  return n.toString();
}

export default function VideoCard({ video, onPlay, compact = false }: VideoCardProps) {
  const { savedVideos, toggleSave } = useAppStore();
  const isSaved = savedVideos.has(video.id);

  if (compact) {
    return (
      <button
        onClick={() => onPlay(video)}
        className="flex gap-3 w-full text-left group hover:bg-secondary rounded-lg p-2 transition-colors"
      >
        <div className="thumbnail-container flex-shrink-0" style={{ width: 120, height: 68, paddingTop: 0, position: 'relative' }}>
          <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <span className="duration-badge">{video.duration}</span>
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-medium line-clamp-2 leading-snug" style={{ color: 'hsl(var(--foreground))' }}>{video.title}</p>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{video.channel}</p>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{video.views} просм. · {video.uploadedAt}</p>
        </div>
      </button>
    );
  }

  return (
    <div className="group animate-fade-in">
      <div className="thumbnail-container cursor-pointer" onClick={() => onPlay(video)}>
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        <span className="duration-badge">{video.duration}</span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
            <Icon name="Play" size={20} className="text-white ml-1" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div
          className="channel-avatar flex-shrink-0 cursor-pointer"
          style={{ background: video.channelColor }}
        >
          {video.channel.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-sm leading-snug line-clamp-2 cursor-pointer hover:text-primary transition-colors mb-1"
            onClick={() => onPlay(video)}
          >
            {video.title}
          </h3>
          <p className="text-xs font-medium hover:text-foreground transition-colors cursor-pointer"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            {video.channel}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {video.views} просм. · {video.uploadedAt}
          </p>
        </div>

        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded self-start"
          onClick={(e) => { e.stopPropagation(); toggleSave(video.id); }}
          title={isSaved ? 'Удалить из сохранённых' : 'Сохранить'}
        >
          <Icon name={isSaved ? 'BookmarkCheck' : 'BookmarkPlus'} size={16}
            className={isSaved ? 'text-primary' : ''} style={{ color: isSaved ? undefined : 'hsl(var(--muted-foreground))' }} />
        </button>
      </div>
    </div>
  );
}
