import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const COMMENTS_URL = 'https://functions.poehali.dev/f1898f7a-b497-4e63-9fe4-62fca49d9590';

const AUTHOR_COLORS = ['#4A90D9', '#E91E63', '#00BFA5', '#FF6B00', '#9C27B0', '#F44336', '#FF5722', '#7B61FF'];

interface Comment {
  id: string;
  videoId: string;
  author: string;
  authorColor: string;
  text: string;
  likes: number;
  date: string;
}

interface CommentsSectionProps {
  videoId: string;
}

// Имя пользователя — сохраняем в localStorage
function getUserName(): string {
  const saved = localStorage.getItem('vp_username');
  if (saved) return saved;
  const name = `Гость_${Math.floor(Math.random() * 9000) + 1000}`;
  localStorage.setItem('vp_username', name);
  return name;
}

function getUserColor(): string {
  const saved = localStorage.getItem('vp_usercolor');
  if (saved) return saved;
  const color = AUTHOR_COLORS[Math.floor(Math.random() * AUTHOR_COLORS.length)];
  localStorage.setItem('vp_usercolor', color);
  return color;
}

export default function CommentsSection({ videoId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [sortBy, setSortBy] = useState<'new' | 'top'>('new');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [authorName, setAuthorName] = useState(getUserName());
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const userColor = getUserColor();

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`${COMMENTS_URL}?video_id=${videoId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      // тихо
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    setComments([]);
    setLoading(true);
    fetchComments();
    // Обновляем каждые 10 секунд — видим комментарии других пользователей
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, [videoId, fetchComments]);

  const handleSubmit = async () => {
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    const text = newComment.trim();
    setNewComment('');
    setIsInputActive(false);

    // Оптимистичное добавление
    const optimistic: Comment = {
      id: `opt_${Date.now()}`,
      videoId,
      author: authorName,
      authorColor: userColor,
      text,
      likes: 0,
      date: 'только что',
    };
    setComments(prev => [optimistic, ...prev]);

    try {
      const res = await fetch(COMMENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId, text, author: authorName, author_color: userColor }),
      });
      const data = await res.json();
      // Заменяем оптимистичный комментарий реальным
      setComments(prev => prev.map(c => c.id === optimistic.id ? data.comment : c));
    } catch {
      // Оставляем оптимистичный
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (likedIds.has(commentId)) return;
    setLikedIds(prev => new Set(prev).add(commentId));
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    try {
      await fetch(COMMENTS_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: commentId }),
      });
    } catch { /* тихо */ }
  };

  const handleSaveName = () => {
    const name = nameInput.trim() || getUserName();
    localStorage.setItem('vp_username', name);
    setAuthorName(name);
    setShowNameEdit(false);
    setNameInput('');
  };

  const sorted = [...comments].sort((a, b) => {
    if (sortBy === 'top') return b.likes - a.likes;
    return 0; // уже отсортированы по дате с сервера
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <h3 className="font-bold text-lg">{loading ? '...' : comments.length} комментариев</h3>
        <button
          className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
          style={{ color: 'hsl(var(--muted-foreground))' }}
          onClick={() => setSortBy(s => s === 'top' ? 'new' : 'top')}
        >
          <Icon name="ArrowUpDown" size={14} />
          {sortBy === 'top' ? 'По популярности' : 'Сначала новые'}
        </button>
        <button
          className="ml-auto text-xs hover:text-primary transition-colors flex items-center gap-1"
          style={{ color: 'hsl(var(--muted-foreground))' }}
          onClick={fetchComments}
          title="Обновить"
        >
          <Icon name="RefreshCw" size={12} />
          Обновить
        </button>
      </div>

      {/* My name */}
      <div className="mb-4 flex items-center gap-2">
        <div className="channel-avatar" style={{ background: userColor, width: 28, height: 28, fontSize: 11 }}>
          {authorName.charAt(0).toUpperCase()}
        </div>
        {showNameEdit ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              placeholder={authorName}
              className="bg-transparent border-b text-sm outline-none pb-0.5"
              style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--foreground))', width: 160 }}
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSaveName(); if (e.key === 'Escape') setShowNameEdit(false); }}
            />
            <button onClick={handleSaveName} className="text-xs font-semibold text-primary">Сохранить</button>
          </div>
        ) : (
          <button
            className="text-xs hover:text-primary transition-colors flex items-center gap-1"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            onClick={() => { setShowNameEdit(true); setNameInput(authorName); }}
          >
            <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{authorName}</span>
            <Icon name="Pencil" size={11} />
          </button>
        )}
      </div>

      {/* Add comment */}
      <div className="flex gap-3 mb-8">
        <div className="channel-avatar" style={{ background: userColor, width: 36, height: 36, fontSize: 14 }}>
          {authorName.charAt(0).toUpperCase()}
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
                  cursor: newComment.trim() && !submitting ? 'pointer' : 'not-allowed',
                  opacity: submitting ? 0.7 : 1,
                }}
                onClick={handleSubmit}
                disabled={!newComment.trim() || submitting}
              >
                {submitting ? 'Отправка...' : 'Комментировать'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: 'hsl(var(--muted))' }} />
                <div className="flex-1 space-y-2">
                  <div className="h-3 rounded w-32" style={{ background: 'hsl(var(--muted))' }} />
                  <div className="h-3 rounded w-full" style={{ background: 'hsl(var(--muted))' }} />
                  <div className="h-3 rounded w-2/3" style={{ background: 'hsl(var(--muted))' }} />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Icon name="MessageCircle" size={40} className="mx-auto mb-3 opacity-30" />
            <p>Пока нет комментариев. Будьте первым!</p>
          </div>
        ) : (
          sorted.map(comment => (
            <div key={comment.id} className="flex gap-3 comment-item">
              <div
                className="channel-avatar flex-shrink-0"
                style={{ background: comment.authorColor, width: 36, height: 36, fontSize: 13 }}
              >
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{comment.author}</span>
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{comment.date}</span>
                </div>
                <p className="text-sm leading-relaxed mb-2">{comment.text}</p>
                <div className="flex items-center gap-3">
                  <button
                    className={`flex items-center gap-1.5 text-xs transition-colors ${likedIds.has(comment.id) ? 'text-primary' : 'hover:text-primary'}`}
                    style={{ color: likedIds.has(comment.id) ? undefined : 'hsl(var(--muted-foreground))' }}
                    onClick={() => handleLike(comment.id)}
                    disabled={likedIds.has(comment.id)}
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
