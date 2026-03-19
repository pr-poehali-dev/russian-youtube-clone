import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Video } from '@/data/videos';
import Icon from '@/components/ui/icon';
import VideoCard from './VideoCard';
import CommentsSection from './CommentsSection';

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return (n / 1000).toFixed(0) + ' тыс';
  return n.toString();
}

interface VideoPlayerProps {
  video: Video;
  onPlay: (video: Video) => void;
  onClose: () => void;
}

export default function VideoPlayer({ video, onPlay, onClose }: VideoPlayerProps) {
  const { likedVideos, dislikedVideos, subscribedChannels, savedVideos, toggleLike, toggleDislike, toggleSubscribe, toggleSave, videos } = useAppStore();
  const [showDescription, setShowDescription] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isLiked = likedVideos.has(video.id);
  const isDisliked = dislikedVideos.has(video.id);
  const isSubscribed = subscribedChannels.has(video.channelId);
  const isSaved = savedVideos.has(video.id);

  const relatedVideos = videos.filter(v => v.id !== video.id && (v.category === video.category || v.channelId === video.channelId)).slice(0, 8);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [video.id]);

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            return 100;
          }
          return p + 0.1;
        });
      }, 100);
    }
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const currentVideo = videos.find(v => v.id === video.id) || video;

  return (
    <div className="flex gap-6 animate-fade-in">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Player */}
        <div className="video-player-wrapper mb-4" style={{ aspectRatio: '16/9' }}>
          <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" style={{ position: 'relative', width: '100%', height: '100%' }} />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end"
            style={{ position: 'absolute', inset: 0 }}>
            {/* Controls */}
            <div className="p-4">
              {/* Progress */}
              <div className="mb-3 cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setProgress((x / rect.width) * 100);
              }}>
                <div className="h-1 rounded-full bg-white/30 overflow-hidden">
                  <div className="progress-bar" style={{ width: `${progress}%`, height: '100%' }} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="p-1 hover:scale-110 transition-transform">
                  <Icon name={isPlaying ? 'Pause' : 'Play'} size={28} className="text-white" />
                </button>
                <button className="p-1 hover:scale-110 transition-transform">
                  <Icon name="SkipForward" size={20} className="text-white" />
                </button>
                <button className="p-1 hover:scale-110 transition-transform">
                  <Icon name="Volume2" size={20} className="text-white" />
                </button>
                <span className="text-white text-sm font-medium ml-1">{video.duration}</span>
                <div className="flex-1" />
                <button className="p-1 hover:scale-110 transition-transform">
                  <Icon name="Settings" size={18} className="text-white" />
                </button>
                <button className="p-1 hover:scale-110 transition-transform">
                  <Icon name="Maximize" size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          {/* Play overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}
              style={{ position: 'absolute', inset: 0 }}>
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center hover:scale-110 transition-transform">
                <Icon name="Play" size={32} className="text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Title & actions */}
        <div className="mb-4">
          <h1 className="text-xl font-bold leading-snug mb-3">{video.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            {/* Channel */}
            <div className="flex items-center gap-3 flex-1">
              <div className="channel-avatar" style={{ width: 40, height: 40, background: video.channelColor, fontSize: 16 }}>
                {video.channel.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{video.channel}</p>
                <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{formatNumber(currentVideo.likes * 12)} подписчиков</p>
              </div>
              <button
                className={`subscribe-btn ml-2 ${isSubscribed ? 'subscribed' : ''}`}
                onClick={() => toggleSubscribe(video.channelId)}
              >
                {isSubscribed ? 'Подписан' : 'Подписаться'}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex rounded-full overflow-hidden" style={{ background: 'hsl(var(--secondary))' }}>
                <button
                  className={`like-btn rounded-none ${isLiked ? 'liked' : ''}`}
                  style={{ borderRadius: '50px 0 0 50px', borderRight: '1px solid hsl(var(--border))' }}
                  onClick={() => toggleLike(video.id)}
                >
                  <Icon name="ThumbsUp" size={16} />
                  {formatNumber(currentVideo.likes)}
                </button>
                <button
                  className={`like-btn rounded-none ${isDisliked ? 'liked' : ''}`}
                  style={{ borderRadius: '0 50px 50px 0' }}
                  onClick={() => toggleDislike(video.id)}
                >
                  <Icon name="ThumbsDown" size={16} />
                </button>
              </div>
              <button className="like-btn" onClick={() => {
                navigator.clipboard?.writeText(window.location.href).catch(() => {});
              }}>
                <Icon name="Share2" size={16} />
                Поделиться
              </button>
              <button className={`like-btn ${isSaved ? 'liked' : ''}`} onClick={() => toggleSave(video.id)}>
                <Icon name={isSaved ? 'BookmarkCheck' : 'Bookmark'} size={16} />
                {isSaved ? 'Сохранено' : 'Сохранить'}
              </button>
              <button className="like-btn">
                <Icon name="MoreHorizontal" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl p-4 mb-6 cursor-pointer" style={{ background: 'hsl(var(--secondary))' }}
          onClick={() => setShowDescription(!showDescription)}>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-semibold text-sm">{video.views} просмотров</span>
            <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{video.uploadedAt}</span>
            {video.tags.map(tag => (
              <span key={tag} className="text-sm text-primary">#{tag}</span>
            ))}
          </div>
          <p className={`text-sm leading-relaxed ${showDescription ? '' : 'line-clamp-2'}`}
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            {video.description}
          </p>
          <button className="text-sm font-semibold mt-2 hover:text-primary transition-colors">
            {showDescription ? 'Свернуть' : 'Ещё'}
          </button>
        </div>

        {/* Comments */}
        <CommentsSection videoId={video.id} />
      </div>

      {/* Related videos */}
      <div className="w-80 flex-shrink-0">
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Рекомендуем
        </h3>
        <div className="space-y-3">
          {relatedVideos.map(v => (
            <VideoCard key={v.id} video={v} onPlay={onPlay} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
