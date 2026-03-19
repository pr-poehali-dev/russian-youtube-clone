import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Icon from '@/components/ui/icon';

interface CommentsSectionProps {
  videoId: string;
}

const AUTHOR_COLORS = ['#4A90D9', '#E91E63', '#00BFA5', '#FF6B00', '#9C27B0', '#F44336', '#FF5722', '#7B61FF'];

function randomColor() {
  return AUTHOR_COLORS[Math.floor(Math.random() * AUTHOR_COLORS.length)];
}

export default function CommentsSection({ videoId }: CommentsSectionProps) {
  const { comments, addComment, likeComment } = useAppStore();
  const [newComment, setNewComment] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [sortBy, setSortBy] = useState<'top' | 'new'>('top');

  const videoComments = comments
    .filter(c => c.videoId === videoId)
    .sort((a, b) => sortBy === 'top' ? b.likes - a.likes : 0);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    addComment(videoId, newComment.trim());
    setNewComment('');
    setIsInputActive(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h3 className="font-bold text-lg">{videoComments.length} комментариев</h3>
        <button
          className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
          style={{ color: 'hsl(var(--muted-foreground))' }}
          onClick={() => setSortBy(s => s === 'top' ? 'new' : 'top')}
        >
          <Icon name="ArrowUpDown" size={14} />
          {sortBy === 'top' ? 'По популярности' : 'Сначала новые'}
        </button>
      </div>

      {/* Add comment */}
      <div className="flex gap-3 mb-8">
        <div className="channel-avatar" style={{ background: 'hsl(var(--primary))', width: 36, height: 36, fontSize: 14 }}>
          Я
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Напишите комментарий..."
            className="w-full bg-transparent border-b-2 pb-2 outline-none text-sm transition-colors"
            style={{
              borderColor: isInputActive ? 'hsl(var(--primary))' : 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => { if (!newComment) setIsInputActive(false); }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
          />
          {isInputActive && (
            <div className="flex justify-end gap-2 mt-2 animate-fade-in">
              <button
                className="px-4 py-1.5 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                onClick={() => { setNewComment(''); setIsInputActive(false); }}
              >
                Отмена
              </button>
              <button
                className="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
                style={{
                  background: newComment.trim() ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  color: newComment.trim() ? 'white' : 'hsl(var(--muted-foreground))',
                  cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                }}
                onClick={handleSubmit}
                disabled={!newComment.trim()}
              >
                Комментировать
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {videoComments.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Icon name="MessageCircle" size={40} className="mx-auto mb-3 opacity-30" />
            <p>Пока нет комментариев. Будьте первым!</p>
          </div>
        ) : (
          videoComments.map(comment => (
            <div key={comment.id} className="flex gap-3 comment-item">
              <div className="channel-avatar flex-shrink-0" style={{ background: comment.authorColor, width: 36, height: 36, fontSize: 13 }}>
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{comment.author}</span>
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{comment.date}</span>
                </div>
                <p className="text-sm leading-relaxed mb-2">{comment.text}</p>
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                    onClick={() => likeComment(comment.id)}
                  >
                    <Icon name="ThumbsUp" size={13} />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    <Icon name="ThumbsDown" size={13} />
                  </button>
                  <button
                    className="text-xs font-semibold hover:text-primary transition-colors"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    Ответить
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
