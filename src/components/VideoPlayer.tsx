import { useState, useEffect } from 'react';
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
  const [playerStarted, setPlayerStarted] = useState(false);

  const isLiked = likedVideos.has(video.id);
  const isDisliked = dislikedVideos.has(video.id);
  const isSubscribed = subscribedChannels.has(video.channelId);
  const isSaved = savedVideos.has(video.id);

  const relatedVideos = videos
    .filter(v => v.id !== video.id && (v.category === video.category || v.channelId === video.channelId))
    .slice(0, 8);

  // Сбрасываем состояние при смене видео
  useEffect(() => {
    setPlayerStarted(false);
    setShowDescription(false);
  }, [video.id]);

  const currentVideo = videos.find(v => v.id === video.id) || video;

  // YouTube thumbnail URL (высокое качество с fallback)
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  // YouTube embed URL с параметрами
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&hl=ru`;

  return (
    <div className="flex gap-6 animate-fade-in">
      {/* Main */}
      <div className="flex-1 min-w-0">

        {/* ===== VIDEO PLAYER ===== */}
        <div className="video-player-wrapper mb-4" style={{ aspectRatio: '16/9', position: 'relative', background: '#000', borderRadius: 12, overflow: 'hidden' }}>
          {playerStarted ? (
            /* YouTube iframe */
            <iframe
              key={video.youtubeId}
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            /* Превью + кнопка Play */
            <div
              className="absolute inset-0 cursor-pointer group"
              style={{ position: 'absolute', inset: 0 }}
              onClick={() => setPlayerStarted(true)}
            >
              <img
                src={thumbUrl}
                alt={video.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
              />
              {/* Тёмный оверлей */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', transition: 'background 0.2s' }}
                className="group-hover:bg-black/40" />
              {/* Большая кнопка Play */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  className="group-hover:scale-110 transition-transform duration-200"
                  style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(255,0,0,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  <Icon name="Play" size={32} className="text-white ml-1.5" />
                </div>
              </div>
              {/* Длительность */}
              <span className="duration-badge" style={{ bottom: 12, right: 12, fontSize: 13 }}>{video.duration}</span>
            </div>
          )}
        </div>

        {/* Title & actions */}
        <div className="mb-4">
          <h1 className="text-xl font-bold leading-snug mb-3">{video.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            {/* Channel */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="channel-avatar" style={{ width: 40, height: 40, background: video.channelColor, fontSize: 16 }}>
                {video.channel.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{video.channel}</p>
                <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {formatNumber(currentVideo.likes * 12)} подписчиков
                </p>
              </div>
              <button
                className={`subscribe-btn ml-2 flex-shrink-0 ${isSubscribed ? 'subscribed' : ''}`}
                onClick={() => toggleSubscribe(video.channelId)}
              >
                {isSubscribed ? '✓ Подписан' : 'Подписаться'}
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
              <button
                className="like-btn"
                onClick={() => {
                  const url = `https://youtube.com/watch?v=${video.youtubeId}`;
                  navigator.clipboard?.writeText(url).catch(() => {});
                }}
              >
                <Icon name="Share2" size={16} />
                Поделиться
              </button>
              <button className={`like-btn ${isSaved ? 'liked' : ''}`} onClick={() => toggleSave(video.id)}>
                <Icon name={isSaved ? 'BookmarkCheck' : 'Bookmark'} size={16} />
                {isSaved ? 'Сохранено' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="rounded-xl p-4 mb-6 cursor-pointer hover:brightness-110 transition-all"
          style={{ background: 'hsl(var(--secondary))' }}
          onClick={() => setShowDescription(!showDescription)}
        >
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="font-semibold text-sm">{video.views} просмотров</span>
            <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{video.uploadedAt}</span>
            {video.tags.map(tag => (
              <span key={tag} className="text-sm" style={{ color: 'hsl(var(--primary))' }}>#{tag}</span>
            ))}
          </div>
          <p
            className={`text-sm leading-relaxed ${showDescription ? '' : 'line-clamp-2'}`}
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            {video.description}
          </p>
          <button className="text-sm font-semibold mt-2 hover:text-primary transition-colors">
            {showDescription ? 'Свернуть' : 'Показать полностью'}
          </button>
        </div>

        {/* Comments — реальные, общие для всех */}
        <CommentsSection videoId={video.id} />
      </div>

      {/* Related videos */}
      <div className="w-80 flex-shrink-0 hidden lg:block">
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
