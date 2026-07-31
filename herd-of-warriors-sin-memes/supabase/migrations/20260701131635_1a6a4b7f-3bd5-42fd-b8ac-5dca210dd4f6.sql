
-- Remove old seed content (user_id IS NULL are seeds). Keep user uploads.
DELETE FROM public.meme_likes WHERE meme_id IN (SELECT id FROM public.memes WHERE user_id IS NULL);
DELETE FROM public.memes WHERE user_id IS NULL;

INSERT INTO public.memes (user_id, autor, disciplina, media_url, media_type, caption, likes_count, comments_count)
VALUES
  (NULL, '@boxingnation', 'Boxeo', 'https://assets.mixkit.co/videos/40957/40957-720.mp4', 'video', 'Intense semi-pro sparring 🥊', 1240, 88),
  (NULL, '@ringside', 'Boxeo', 'https://assets.mixkit.co/videos/40958/40958-720.mp4', 'video', 'Close-up work on the pads', 980, 62),
  (NULL, '@heavybag', 'Boxeo', 'https://assets.mixkit.co/videos/40959/40959-720.mp4', 'video', 'Head movement drills', 1420, 104),
  (NULL, '@kotalert', 'Boxeo', 'https://assets.mixkit.co/videos/40969/40969-720.mp4', 'video', 'That KO though 😳', 3120, 240),
  (NULL, '@sweetscience', 'Boxeo', 'https://assets.mixkit.co/videos/40971/40971-720.mp4', 'video', 'Jab-cross-hook combo', 860, 45),
  (NULL, '@ropework', 'Boxeo', 'https://assets.mixkit.co/videos/40976/40976-720.mp4', 'video', 'Footwork against the ropes', 720, 33),
  (NULL, '@darkring', 'Boxeo', 'https://assets.mixkit.co/videos/45874/45874-720.mp4', 'video', 'Lightweight training in the dark', 1580, 118),
  (NULL, '@kickboxlife', 'Kickboxing', 'https://assets.mixkit.co/videos/40961/40961-720.mp4', 'video', 'Rest between rounds', 940, 51),
  (NULL, '@combatdaily', 'MMA', 'https://assets.mixkit.co/videos/41011/41011-720.mp4', 'video', 'Full contact intensity 🔥', 2050, 176),
  (NULL, '@cagelife', 'MMA', 'https://assets.mixkit.co/videos/41019/41019-720.mp4', 'video', 'Sparring session inside the gym', 1680, 132),

  (NULL, '@mmadaily', 'MMA', 'https://loremflickr.com/900/1600/mma,fight?lock=1', 'image', 'Fight week vibes', 812, 44),
  (NULL, '@octagonhq', 'MMA', 'https://loremflickr.com/900/1600/ufc,octagon?lock=2', 'image', 'Walkout ready', 1104, 71),
  (NULL, '@muaythai365', 'Muay Thai', 'https://loremflickr.com/900/1600/muaythai?lock=3', 'image', 'Clinch game 💪', 940, 58),
  (NULL, '@8limbs', 'Muay Thai', 'https://loremflickr.com/900/1600/muay,thai,kick?lock=4', 'image', 'Teep like Rodtang', 1330, 92),
  (NULL, '@bjjworld', 'BJJ', 'https://loremflickr.com/900/1600/jiujitsu?lock=5', 'image', 'Guard passing drills', 705, 40),
  (NULL, '@rollhard', 'BJJ', 'https://loremflickr.com/900/1600/bjj,grappling?lock=6', 'image', 'Sunday open mat 🥋', 610, 31),
  (NULL, '@matwork', 'Wrestling', 'https://loremflickr.com/900/1600/wrestling?lock=7', 'image', 'Double leg to the mat', 880, 54),
  (NULL, '@judolife', 'Judo', 'https://loremflickr.com/900/1600/judo?lock=8', 'image', 'Uchi-mata for ippon', 990, 66),
  (NULL, '@karatedo', 'Karate', 'https://loremflickr.com/900/1600/karate?lock=9', 'image', 'Kata perfection', 540, 22),
  (NULL, '@capoeirabr', 'Capoeira', 'https://loremflickr.com/900/1600/capoeira?lock=10', 'image', 'Roda no pôr do sol', 470, 19);
