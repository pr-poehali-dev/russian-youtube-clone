CREATE TABLE IF NOT EXISTS t_p243053_russian_youtube_clon.comments (
  id SERIAL PRIMARY KEY,
  video_id VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL DEFAULT 'Гость',
  author_color VARCHAR(20) NOT NULL DEFAULT '#4A90D9',
  text TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_video_id ON t_p243053_russian_youtube_clon.comments(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON t_p243053_russian_youtube_clon.comments(created_at DESC);

INSERT INTO t_p243053_russian_youtube_clon.comments (video_id, author, author_color, text, likes, created_at) VALUES
('v1', 'Александр К.', '#4A90D9', 'Это было невероятно! Как ты вообще выдержал 100 дней? Я бы сошёл с ума на третий день 😂', 4521, NOW() - INTERVAL '7 days'),
('v1', 'Марина В.', '#E91E63', 'Смотрю уже третий раз, каждый раз нахожу что-то новое. Спасибо за такой труд!', 2834, NOW() - INTERVAL '5 days'),
('v1', 'Игорь Петров', '#00BFA5', 'Ожидал что будет про одиночество, а получил настоящую философию. Подписался!', 1923, NOW() - INTERVAL '3 days'),
('v1', 'Ольга М.', '#FF6B00', 'Я работаю психологом и могу подтвердить — всё что ты описал полностью соответствует научным данным об изоляции.', 1456, NOW() - INTERVAL '2 days'),
('v1', 'Денис Р.', '#9C27B0', 'Хотел бы я так же. Но работа, семья, ипотека... 😅', 987, NOW() - INTERVAL '1 day'),
('v2', 'Сергей Н.', '#FF5722', 'Наконец-то честный обзор без "партнёрской интеграции". Спасибо!', 3210, NOW() - INTERVAL '21 days'),
('v2', 'Анна Б.', '#4A90D9', 'Взяла 15 Pro в прошлом году — не жалею. Смотрю чтобы понять нужно ли переходить.', 1876, NOW() - INTERVAL '14 days'),
('v3', 'Кирилл О.', '#7B61FF', 'Был в Токио — это видео передаёт атмосферу лучше чем любая фотография. Ностальгия...', 5643, NOW() - INTERVAL '60 days'),
('v3', 'Юлия С.', '#E91E63', 'После этого видео купила билеты. Улетаю через месяц! 🎌', 3421, NOW() - INTERVAL '30 days'),
('v5', 'Артём Д.', '#9C27B0', 'GTA 6 будет игрой десятилетия, а ты всё правильно разобрал. Лайк!', 2187, NOW() - INTERVAL '14 days'),
('v8', 'Максим Л.', '#00BFA5', 'Я сам прошёл этот путь — могу подтвердить, работает! Главное — системность.', 1345, NOW() - INTERVAL '20 days'),
('v4', 'Светлана П.', '#F44336', 'Смотрю и плачу. Очень важный разговор, спасибо что выпустили.', 6780, NOW() - INTERVAL '90 days');
