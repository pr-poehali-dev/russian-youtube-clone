import { create } from 'zustand';
import { Video, Comment, VIDEOS, COMMENTS, CHANNELS, Channel } from '@/data/videos';

interface AppState {
  videos: Video[];
  comments: Comment[];
  channels: Channel[];
  likedVideos: Set<string>;
  dislikedVideos: Set<string>;
  subscribedChannels: Set<string>;
  savedVideos: Set<string>;
  currentVideo: Video | null;
  searchQuery: string;
  activeCategory: string;
  sidebarOpen: boolean;
  
  setCurrentVideo: (video: Video | null) => void;
  toggleLike: (videoId: string) => void;
  toggleDislike: (videoId: string) => void;
  toggleSubscribe: (channelId: string) => void;
  toggleSave: (videoId: string) => void;
  addComment: (videoId: string, text: string) => void;
  likeComment: (commentId: string) => void;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: string) => void;
  toggleSidebar: () => void;
  getFilteredVideos: () => Video[];
}

export const useAppStore = create<AppState>((set, get) => ({
  videos: VIDEOS,
  comments: COMMENTS,
  channels: CHANNELS,
  likedVideos: new Set(),
  dislikedVideos: new Set(),
  subscribedChannels: new Set(),
  savedVideos: new Set(),
  currentVideo: null,
  searchQuery: '',
  activeCategory: 'Все',
  sidebarOpen: true,

  setCurrentVideo: (video) => set({ currentVideo: video }),

  toggleLike: (videoId) => set((state) => {
    const liked = new Set(state.likedVideos);
    const disliked = new Set(state.dislikedVideos);
    const videos = state.videos.map(v => {
      if (v.id !== videoId) return v;
      if (liked.has(videoId)) {
        liked.delete(videoId);
        return { ...v, likes: v.likes - 1 };
      } else {
        liked.add(videoId);
        if (disliked.has(videoId)) {
          disliked.delete(videoId);
          return { ...v, likes: v.likes + 1, dislikes: v.dislikes - 1 };
        }
        return { ...v, likes: v.likes + 1 };
      }
    });
    return { likedVideos: liked, dislikedVideos: disliked, videos };
  }),

  toggleDislike: (videoId) => set((state) => {
    const liked = new Set(state.likedVideos);
    const disliked = new Set(state.dislikedVideos);
    const videos = state.videos.map(v => {
      if (v.id !== videoId) return v;
      if (disliked.has(videoId)) {
        disliked.delete(videoId);
        return { ...v, dislikes: v.dislikes - 1 };
      } else {
        disliked.add(videoId);
        if (liked.has(videoId)) {
          liked.delete(videoId);
          return { ...v, dislikes: v.dislikes + 1, likes: v.likes - 1 };
        }
        return { ...v, dislikes: v.dislikes + 1 };
      }
    });
    return { likedVideos: liked, dislikedVideos: disliked, videos };
  }),

  toggleSubscribe: (channelId) => set((state) => {
    const subs = new Set(state.subscribedChannels);
    if (subs.has(channelId)) subs.delete(channelId);
    else subs.add(channelId);
    return { subscribedChannels: subs };
  }),

  toggleSave: (videoId) => set((state) => {
    const saved = new Set(state.savedVideos);
    if (saved.has(videoId)) saved.delete(videoId);
    else saved.add(videoId);
    return { savedVideos: saved };
  }),

  addComment: (videoId, text) => set((state) => {
    const names = ['Вы', 'Пользователь'];
    const colors = ['#4A90D9', '#E91E63', '#00BFA5', '#FF6B00', '#9C27B0'];
    const newComment: Comment = {
      id: `c${Date.now()}`,
      videoId,
      author: names[0],
      authorColor: colors[Math.floor(Math.random() * colors.length)],
      text,
      likes: 0,
      date: 'только что',
    };
    return { comments: [newComment, ...state.comments] };
  }),

  likeComment: (commentId) => set((state) => ({
    comments: state.comments.map(c =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ),
  })),

  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  getFilteredVideos: () => {
    const { videos, searchQuery, activeCategory } = get();
    return videos.filter(v => {
      const matchSearch = !searchQuery || 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = activeCategory === 'Все' || v.category === activeCategory;
      return matchSearch && matchCat;
    });
  },
}));
