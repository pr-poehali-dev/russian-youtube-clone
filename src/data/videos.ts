export interface Video {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  channelColor: string;
  views: string;
  viewsNum: number;
  duration: string;
  uploadedAt: string;
  thumbnail: string;
  description: string;
  tags: string[];
  likes: number;
  dislikes: number;
  category: string;
  youtubeId: string; // YouTube video ID для встраивания
}

export interface Comment {
  id: string;
  videoId: string;
  author: string;
  authorColor: string;
  text: string;
  likes: number;
  date: string;
  replies?: Comment[];
}

export interface Channel {
  id: string;
  name: string;
  color: string;
  subscribers: string;
  description: string;
  videoCount: number;
}

export const CATEGORIES = [
  'Все', 'Музыка', 'Игры', 'Новости', 'Спорт', 'Кино', 'Технологии',
  'Образование', 'Юмор', 'Авто', 'Путешествия', 'Кулинария', 'Наука'
];

export const CHANNELS: Channel[] = [
  { id: 'ch1', name: 'VDude', color: '#FF0000', subscribers: '8.5 млн', description: 'Контент о жизни, юморе и приколах', videoCount: 342 },
  { id: 'ch2', name: 'Дима Масленников', color: '#FF6B00', subscribers: '3.2 млн', description: 'Технологии и гаджеты', videoCount: 218 },
  { id: 'ch3', name: 'Редакция', color: '#4A90D9', subscribers: '5.8 млн', description: 'Журналистика нового времени', videoCount: 526 },
  { id: 'ch4', name: 'LABELCOM', color: '#7B61FF', subscribers: '2.1 млн', description: 'Музыка и культура', videoCount: 145 },
  { id: 'ch5', name: 'Максим Дмитриев', color: '#00BFA5', subscribers: '1.4 млн', description: 'Образование и саморазвитие', videoCount: 89 },
  { id: 'ch6', name: 'Ещенепознер', color: '#F44336', subscribers: '4.3 млн', description: 'Интервью с интересными людьми', videoCount: 203 },
  { id: 'ch7', name: 'РБК', color: '#1565C0', subscribers: '6.7 млн', description: 'Деловые новости России', videoCount: 8234 },
  { id: 'ch8', name: 'Антон Птушкин', color: '#FF5722', subscribers: '7.2 млн', description: 'Путешествия по всему миру', videoCount: 112 },
  { id: 'ch9', name: 'ПашАС', color: '#9C27B0', subscribers: '2.9 млн', description: 'Игры и стримы', videoCount: 1456 },
  { id: 'ch10', name: 'Куджи Криминал', color: '#E91E63', subscribers: '3.5 млн', description: 'Криминальные истории', videoCount: 267 },
];

// YouTube превью: https://img.youtube.com/vi/{ID}/maxresdefault.jpg
export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Я провёл 7 дней в лесу один — что из этого вышло',
    channel: 'VDude',
    channelId: 'ch1',
    channelColor: '#FF0000',
    views: '12.4 млн',
    viewsNum: 12400000,
    duration: '28:14',
    uploadedAt: '2 недели назад',
    thumbnail: 'https://img.youtube.com/vi/n_Dv4JMiwK8/maxresdefault.jpg',
    description: 'Провёл 7 дней в полной изоляции в лесу. Без телефона, без людей, только природа и я. Что это изменило во мне — смотри до конца.',
    tags: ['эксперимент', 'выживание', 'природа'],
    likes: 845000,
    dislikes: 12000,
    category: 'Юмор',
    youtubeId: 'n_Dv4JMiwK8',
  },
  {
    id: 'v2',
    title: 'iPhone 16 Pro — честный обзор спустя месяц использования',
    channel: 'Дима Масленников',
    channelId: 'ch2',
    channelColor: '#FF6B00',
    views: '3.2 млн',
    viewsNum: 3200000,
    duration: '19:47',
    uploadedAt: '1 месяц назад',
    thumbnail: 'https://img.youtube.com/vi/FT3ODSg1GFE/maxresdefault.jpg',
    description: 'Месяц с iPhone 16 Pro — стоит ли своих денег? Честный взгляд без рекламы и спонсоров.',
    tags: ['apple', 'iphone', 'обзор', 'смартфон'],
    likes: 124000,
    dislikes: 8500,
    category: 'Технологии',
    youtubeId: 'FT3ODSg1GFE',
  },
  {
    id: 'v3',
    title: 'Япония: 10 дней в стране восходящего солнца',
    channel: 'Антон Птушкин',
    channelId: 'ch8',
    channelColor: '#FF5722',
    views: '8.7 млн',
    viewsNum: 8700000,
    duration: '45:23',
    uploadedAt: '3 месяца назад',
    thumbnail: 'https://img.youtube.com/vi/dQv_YMMvsNc/maxresdefault.jpg',
    description: 'Япония — страна, которую невозможно описать словами. 10 дней исследований: еда, культура и приключения.',
    tags: ['токио', 'япония', 'путешествия'],
    likes: 623000,
    dislikes: 4200,
    category: 'Путешествия',
    youtubeId: 'dQv_YMMvsNc',
  },
  {
    id: 'v4',
    title: 'Большое интервью: Россия, экономика и будущее страны',
    channel: 'Редакция',
    channelId: 'ch3',
    channelColor: '#4A90D9',
    views: '15.1 млн',
    viewsNum: 15100000,
    duration: '1:24:18',
    uploadedAt: '5 месяцев назад',
    thumbnail: 'https://img.youtube.com/vi/vUCfAdnQAj4/maxresdefault.jpg',
    description: 'Большой разговор о самом важном. Что происходит в России и куда всё движется.',
    tags: ['интервью', 'политика', 'россия'],
    likes: 1200000,
    dislikes: 45000,
    category: 'Новости',
    youtubeId: 'vUCfAdnQAj4',
  },
  {
    id: 'v5',
    title: 'GTA 6 — первый взгляд на геймплей: всё что известно',
    channel: 'ПашАС',
    channelId: 'ch9',
    channelColor: '#9C27B0',
    views: '6.8 млн',
    viewsNum: 6800000,
    duration: '32:55',
    uploadedAt: '3 недели назад',
    thumbnail: 'https://img.youtube.com/vi/QdBZExpgErs/maxresdefault.jpg',
    description: 'Полный разбор трейлера GTA 6. Что показала Rockstar и что ждать от главной игры десятилетия.',
    tags: ['gta6', 'игры', 'rockstar'],
    likes: 412000,
    dislikes: 9800,
    category: 'Игры',
    youtubeId: 'QdBZExpgErs',
  },
  {
    id: 'v6',
    title: 'Я купил квартиру за 1 рубль на аукционе — что внутри',
    channel: 'Куджи Криминал',
    channelId: 'ch10',
    channelColor: '#E91E63',
    views: '4.3 млн',
    viewsNum: 4300000,
    duration: '22:08',
    uploadedAt: '1 неделю назад',
    thumbnail: 'https://img.youtube.com/vi/7UMuvPHYkPQ/maxresdefault.jpg',
    description: 'На аукционе купил квартиру за символическую сумму. Что там нашёл — не поверите.',
    tags: ['аукцион', 'квартира', 'находки'],
    likes: 287000,
    dislikes: 15000,
    category: 'Юмор',
    youtubeId: '7UMuvPHYkPQ',
  },
  {
    id: 'v7',
    title: 'Экономика России 2025: что происходит на самом деле',
    channel: 'РБК',
    channelId: 'ch7',
    channelColor: '#1565C0',
    views: '2.1 млн',
    viewsNum: 2100000,
    duration: '38:44',
    uploadedAt: '5 дней назад',
    thumbnail: 'https://img.youtube.com/vi/g8MOVzaRv0A/maxresdefault.jpg',
    description: 'Глубокий анализ экономической ситуации. Инфляция, санкции, рост ВВП — разбираем честно.',
    tags: ['экономика', 'россия', 'финансы'],
    likes: 98000,
    dislikes: 24000,
    category: 'Новости',
    youtubeId: 'g8MOVzaRv0A',
  },
  {
    id: 'v8',
    title: 'Как я изменил жизнь за 4 месяца: похудел на 30 кг',
    channel: 'Максим Дмитриев',
    channelId: 'ch5',
    channelColor: '#00BFA5',
    views: '9.5 млн',
    viewsNum: 9500000,
    duration: '24:31',
    uploadedAt: '2 месяца назад',
    thumbnail: 'https://img.youtube.com/vi/cFBQf7L-IQw/maxresdefault.jpg',
    description: 'Реальная история трансформации без голодания и изнурительных диет. Только наука и системность.',
    tags: ['похудение', 'здоровье', 'фитнес'],
    likes: 734000,
    dislikes: 18000,
    category: 'Образование',
    youtubeId: 'cFBQf7L-IQw',
  },
  {
    id: 'v9',
    title: 'Моргенштерн — большое интервью после возвращения',
    channel: 'LABELCOM',
    channelId: 'ch4',
    channelColor: '#7B61FF',
    views: '18.3 млн',
    viewsNum: 18300000,
    duration: '1:15:22',
    uploadedAt: '4 недели назад',
    thumbnail: 'https://img.youtube.com/vi/TxeoBpDI31U/maxresdefault.jpg',
    description: 'Большой разговор с Моргенштерном: о жизни, музыке, хейте и планах на будущее.',
    tags: ['моргенштерн', 'интервью', 'музыка'],
    likes: 956000,
    dislikes: 43000,
    category: 'Музыка',
    youtubeId: 'TxeoBpDI31U',
  },
  {
    id: 'v10',
    title: 'Иван Ургант — первое интервью после паузы',
    channel: 'Ещенепознер',
    channelId: 'ch6',
    channelColor: '#F44336',
    views: '11.2 млн',
    viewsNum: 11200000,
    duration: '1:02:45',
    uploadedAt: '2 недели назад',
    thumbnail: 'https://img.youtube.com/vi/Kk3Jn3NQvnA/maxresdefault.jpg',
    description: 'Иван Ургант впервые даёт интервью. Откровенный разговор о прошлом, настоящем и будущем.',
    tags: ['ургант', 'интервью', 'ещенепознер'],
    likes: 798000,
    dislikes: 27000,
    category: 'Кино',
    youtubeId: 'Kk3Jn3NQvnA',
  },
  {
    id: 'v11',
    title: 'Лучшие голы сезона РПЛ 2024/25 — топ-50',
    channel: 'РБК',
    channelId: 'ch7',
    channelColor: '#1565C0',
    views: '2.7 млн',
    viewsNum: 2700000,
    duration: '18:59',
    uploadedAt: '6 дней назад',
    thumbnail: 'https://img.youtube.com/vi/PFlHpBDa23E/maxresdefault.jpg',
    description: 'Самые красивые голы Российской Премьер-Лиги за сезон 2024/25. Голосуй за лучший!',
    tags: ['рпл', 'футбол', 'голы'],
    likes: 187000,
    dislikes: 11000,
    category: 'Спорт',
    youtubeId: 'PFlHpBDa23E',
  },
  {
    id: 'v12',
    title: 'ИИ меняет всё: что будет с работой через 5 лет',
    channel: 'Дима Масленников',
    channelId: 'ch2',
    channelColor: '#FF6B00',
    views: '4.1 млн',
    viewsNum: 4100000,
    duration: '21:33',
    uploadedAt: '3 недели назад',
    thumbnail: 'https://img.youtube.com/vi/Sqa8Zo2XWc4/maxresdefault.jpg',
    description: 'Искусственный интеллект уже меняет рынок труда. Какие профессии исчезнут и что делать прямо сейчас.',
    tags: ['ии', 'работа', 'технологии', 'будущее'],
    likes: 234000,
    dislikes: 16000,
    category: 'Технологии',
    youtubeId: 'Sqa8Zo2XWc4',
  },
];

export const COMMENTS: Comment[] = [];
