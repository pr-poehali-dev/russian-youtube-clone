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
  videoUrl?: string;
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

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Я провёл 100 дней в одиночестве и вот что произошло',
    channel: 'VDude',
    channelId: 'ch1',
    channelColor: '#FF0000',
    views: '12.4 млн',
    viewsNum: 12400000,
    duration: '28:14',
    uploadedAt: '2 недели назад',
    thumbnail: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=480&h=270&fit=crop',
    description: 'В этом видео я рассказываю о своём эксперименте с полной изоляцией от общества на 100 дней. Что я понял о себе, о жизни и о людях...',
    tags: ['эксперимент', 'одиночество', 'психология'],
    likes: 845000,
    dislikes: 12000,
    category: 'Юмор',
    videoUrl: '',
  },
  {
    id: 'v2',
    title: 'iPhone 16 Pro Max — честный обзор через 3 месяца использования',
    channel: 'Дима Масленников',
    channelId: 'ch2',
    channelColor: '#FF6B00',
    views: '3.2 млн',
    viewsNum: 3200000,
    duration: '19:47',
    uploadedAt: '1 месяц назад',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=480&h=270&fit=crop',
    description: 'Три месяца с iPhone 16 Pro Max — стоит ли своих денег? Честный взгляд без рекламы.',
    tags: ['apple', 'iphone', 'обзор', 'смартфон'],
    likes: 124000,
    dislikes: 8500,
    category: 'Технологии',
    videoUrl: '',
  },
  {
    id: 'v3',
    title: 'Путешествие в Токио: 10 дней в самом необычном городе мира',
    channel: 'Антон Птушкин',
    channelId: 'ch8',
    channelColor: '#FF5722',
    views: '8.7 млн',
    viewsNum: 8700000,
    duration: '45:23',
    uploadedAt: '3 месяца назад',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=480&h=270&fit=crop',
    description: 'Токио — город, который невозможно описать словами. 10 дней исследований, еда, культура и приключения.',
    tags: ['токио', 'япония', 'путешествия', 'вайб'],
    likes: 623000,
    dislikes: 4200,
    category: 'Путешествия',
    videoUrl: '',
  },
  {
    id: 'v4',
    title: 'Интервью с Навальным: о тюрьме, России и будущем',
    channel: 'Редакция',
    channelId: 'ch3',
    channelColor: '#4A90D9',
    views: '15.1 млн',
    viewsNum: 15100000,
    duration: '1:24:18',
    uploadedAt: '5 месяцев назад',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=480&h=270&fit=crop',
    description: 'Эксклюзивное интервью. Разговор о самом важном.',
    tags: ['интервью', 'политика', 'россия'],
    likes: 1200000,
    dislikes: 45000,
    category: 'Новости',
    videoUrl: '',
  },
  {
    id: 'v5',
    title: 'GTA 6 — первый взгляд на геймплей: ВСЁ что мы знаем',
    channel: 'ПашАС',
    channelId: 'ch9',
    channelColor: '#9C27B0',
    views: '6.8 млн',
    viewsNum: 6800000,
    duration: '32:55',
    uploadedAt: '3 недели назад',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=480&h=270&fit=crop',
    description: 'Полный разбор трейлера GTA 6. Что показала Rockstar и что ждать от главной игры десятилетия.',
    tags: ['gta6', 'игры', 'rockstar', 'геймплей'],
    likes: 412000,
    dislikes: 9800,
    category: 'Игры',
    videoUrl: '',
  },
  {
    id: 'v6',
    title: 'Я КУПИЛ ЗАБРОШЕННЫЙ ЗАВОД ЗА 1₽ — что внутри?',
    channel: 'Куджи Криминал',
    channelId: 'ch10',
    channelColor: '#E91E63',
    views: '4.3 млн',
    viewsNum: 4300000,
    duration: '22:08',
    uploadedAt: '1 неделю назад',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=270&fit=crop',
    description: 'На аукционе купил заброшенный завод за символическую сумму. Что там нашёл — не поверите.',
    tags: ['заброшка', 'завод', 'аукцион', 'находки'],
    likes: 287000,
    dislikes: 15000,
    category: 'Юмор',
    videoUrl: '',
  },
  {
    id: 'v7',
    title: 'Экономика России в 2025: куда всё идёт на самом деле',
    channel: 'РБК',
    channelId: 'ch7',
    channelColor: '#1565C0',
    views: '2.1 млн',
    viewsNum: 2100000,
    duration: '38:44',
    uploadedAt: '5 дней назад',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&h=270&fit=crop',
    description: 'Глубокий анализ экономической ситуации в России. Инфляция, санкции, рост ВВП — что происходит на самом деле.',
    tags: ['экономика', 'россия', 'финансы', 'анализ'],
    likes: 98000,
    dislikes: 24000,
    category: 'Новости',
    videoUrl: '',
  },
  {
    id: 'v8',
    title: 'Как я похудел на 30 кг за 4 месяца без диет',
    channel: 'Максим Дмитриев',
    channelId: 'ch5',
    channelColor: '#00BFA5',
    views: '9.5 млн',
    viewsNum: 9500000,
    duration: '24:31',
    uploadedAt: '2 месяца назад',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=480&h=270&fit=crop',
    description: 'Реальная история похудения без голодания и изнурительных диет. Только наука и дисциплина.',
    tags: ['похудение', 'здоровье', 'фитнес', 'мотивация'],
    likes: 734000,
    dislikes: 18000,
    category: 'Образование',
    videoUrl: '',
  },
  {
    id: 'v9',
    title: 'LABELCOM — Новый альбом: всё что нужно знать',
    channel: 'LABELCOM',
    channelId: 'ch4',
    channelColor: '#7B61FF',
    views: '1.8 млн',
    viewsNum: 1800000,
    duration: '15:22',
    uploadedAt: '4 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&h=270&fit=crop',
    description: 'Разбираем новый альбом, историю создания и смыслы за каждым треком.',
    tags: ['музыка', 'альбом', 'рэп', 'labelcom'],
    likes: 156000,
    dislikes: 3400,
    category: 'Музыка',
    videoUrl: '',
  },
  {
    id: 'v10',
    title: 'Ещенепознер — разговор с Мирей Матьё о России и жизни',
    channel: 'Ещенепознер',
    channelId: 'ch6',
    channelColor: '#F44336',
    views: '3.9 млн',
    viewsNum: 3900000,
    duration: '1:02:45',
    uploadedAt: '2 недели назад',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=480&h=270&fit=crop',
    description: 'Длинный и откровенный разговор с великой французской певицей. О России, о любви, о времени.',
    tags: ['интервью', 'ещенепознер', 'культура'],
    likes: 298000,
    dislikes: 7200,
    category: 'Кино',
    videoUrl: '',
  },
  {
    id: 'v11',
    title: 'Формула-1 2025 — как Леклер всё-таки стал чемпионом',
    channel: 'РБК',
    channelId: 'ch7',
    channelColor: '#1565C0',
    views: '2.7 млн',
    viewsNum: 2700000,
    duration: '18:59',
    uploadedAt: '6 дней назад',
    thumbnail: 'https://images.unsplash.com/photo-1543702853-74f8b249e0e3?w=480&h=270&fit=crop',
    description: 'Разбор сезона Ф1 2025. Как Ferrari наконец-то дождалась своего момента.',
    tags: ['формула1', 'спорт', 'ferrari', 'леклер'],
    likes: 187000,
    dislikes: 11000,
    category: 'Спорт',
    videoUrl: '',
  },
  {
    id: 'v12',
    title: 'ChatGPT vs Claude: кто умнее в 2025 году?',
    channel: 'Дима Масленников',
    channelId: 'ch2',
    channelColor: '#FF6B00',
    views: '4.1 млн',
    viewsNum: 4100000,
    duration: '21:33',
    uploadedAt: '3 недели назад',
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=480&h=270&fit=crop',
    description: 'Сравниваем два главных ИИ 2025 года по 20 параметрам. Кто реально лучше?',
    tags: ['ии', 'chatgpt', 'claude', 'технологии'],
    likes: 234000,
    dislikes: 16000,
    category: 'Технологии',
    videoUrl: '',
  },
];

export const COMMENTS: Comment[] = [
  { id: 'c1', videoId: 'v1', author: 'Александр К.', authorColor: '#4A90D9', text: 'Это было невероятно! Как ты вообще выдержал 100 дней? Я бы сошёл с ума на третий день 😂', likes: 4521, date: '1 неделю назад' },
  { id: 'c2', videoId: 'v1', author: 'Марина В.', authorColor: '#E91E63', text: 'Смотрю уже третий раз, каждый раз нахожу что-то новое. Спасибо за такой труд!', likes: 2834, date: '5 дней назад' },
  { id: 'c3', videoId: 'v1', author: 'Игорь Петров', authorColor: '#00BFA5', text: 'Ожидал что будет про одиночество, а получил настоящую философию. Подписался!', likes: 1923, date: '3 дня назад' },
  { id: 'c4', videoId: 'v1', author: 'Ольга М.', authorColor: '#FF6B00', text: 'Я работаю психологом и могу подтвердить — всё что ты описал полностью соответствует научным данным об изоляции.', likes: 1456, date: '2 дня назад' },
  { id: 'c5', videoId: 'v1', author: 'Денис Р.', authorColor: '#9C27B0', text: 'Хотел бы я так же. Но работа, семья, ипотека... 😅', likes: 987, date: '1 день назад' },
  { id: 'c6', videoId: 'v2', author: 'Сергей Н.', authorColor: '#FF5722', text: 'Наконец-то честный обзор без "партнёрской интеграции". Спасибо!', likes: 3210, date: '3 недели назад' },
  { id: 'c7', videoId: 'v2', author: 'Анна Б.', authorColor: '#4A90D9', text: 'Взяла 15 Pro в прошлом году — не жалею. Смотрю чтобы понять нужно ли переходить.', likes: 1876, date: '2 недели назад' },
  { id: 'c8', videoId: 'v3', author: 'Кирилл О.', authorColor: '#7B61FF', text: 'Был в Токио — это видео передаёт атмосферу лучше чем любая фотография. Ностальгия...', likes: 5643, date: '2 месяца назад' },
  { id: 'c9', videoId: 'v3', author: 'Юлия С.', authorColor: '#E91E63', text: 'После этого видео купила билеты. Улетаю через месяц! 🎌', likes: 3421, date: '1 месяц назад' },
  { id: 'c10', videoId: 'v5', author: 'Артём Д.', authorColor: '#9C27B0', text: 'GTA 6 будет игрой десятилетия, а ты всё правильно разобрал. Лайк!', likes: 2187, date: '2 недели назад' },
];
