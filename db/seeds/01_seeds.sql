INSERT INTO users (username, email, password) VALUES
  ('bphipardshears0', 'cyushin0@buzzfeed.com', '$2a$04$JbontSb5K1eHi6EpJwgyx.qt5SlNcE7V8C6mD8i09Tjq6MnQHEhBW'),
  ('jpetrishchev1', 'alaborde1@google.nl', '$2a$04$xxJE.ALucTCieki8SXgjY.e7OIMo/J6sApoHHTbmx7eM6amt5AO52'),
  ('jondricek2', 'dlaughlin2@xing.com', '$2a$04$U.FIeBLQBzjXbePIG6whgO3aUoCqv/WJ.unaY0/5jJ2y4aWgoLVNO'),
  ('mcudworth3', 'gmoseley3@narod.ru', '$2a$04$xd1kDwe9881THS2oGx9LGuh.n6sbdM6683XHhPxTPUUw8PBmnh6s6'),
  ('wgossipin4', 'mgrunbaum4@soundcloud.com', '$2a$04$KU1aU9SRUpUkbm.eqpbuPuCVqUvFC46ED8OyD.fWr.dsn5jrXWaoK'),
  ('cvesty5', 'jdreamer5@jalbum.net', '$2a$04$YDP.9o8rw3CZb0b1rjZY5eQ.BC20KqhQQBy/2L4iIhQvWPCsH77BS'),
  ('aconneau6', 'solivetti6@is.gd', '$2a$04$3a7sgCrq5NdDHiqonCcBKu3kBSWTKn3ukWdbHBNosCIcpfXTbPWne'),
  ('mroseaman7', 'wjakubovski7@qq.com', '$2a$04$eLnaNC22wd/ybQ2t/VSoruoU/mxwSVfAfLKxIE0WnbOnRIWnZC91e'),
  ('awitherdon8', 'gjillitt8@studiopress.com', '$2a$04$nRYtXAldaFzXqjZAl8blbuf781dYptgOpWpDbHL7Y5xaXBUb8t7J.'),
  ('fgrimmert9', 'fgairdner9@wp.com', '$2a$04$mFvctRM.is7gjAAZj7tYXuttHN7RiiTTa/MSAci43UGPsO6He0ZLe'),
  ('lclymera', 'bfulepa@nationalgeographic.com', '$2a$04$5TPZ/I4mfr9odh4p.TzkRejT4G42qEKtk3d8sf4Sb0cskaa3Cljjy'),
  ('tpaynb', 'jpearneb@mashable.com', '$2a$04$gIHQTkkL1YqmILedilhXL..CE5hLFCJqfIOqQDm/GOwgqBGm/93uO'),
  ('dosantc', 'tpenwardenc@elpais.com', '$2a$04$EkbUBg0.n0meUl8wih63wuNnoAK6G.tnuANVFf2Wp31sl.qXdeG86'),
  ('esennettd', 'dcookneyd@wunderground.com', '$2a$04$27M52bxADRKU60WoMuW5w.qyGIjB6GrH2srzDkZkbid8YQtbnF9hm'),
  ('kvolckere', 'jfernane@vkontakte.ru', '$2a$04$iEctoZZP1Ux6PQlKuukEW.o2dRHKUPq/maOIGBbSd/QBJChnwvHFa'),
  ('mrichef', 'dmcgorleyf@usatoday.com', '$2a$04$SynJjybSy8t6G1yMhsWzku2.KfHoaYrA3uFc7NULkrUvjIdbvu3MS'),
  ('ieudallg', 'hcorseg@wikipedia.org', '$2a$04$kQYJ/N4i6fsF4bHDDXZjQu3Rgg6oEjUkV2K7UeFPrM6pHLODIbH6m'),
  ('ttarnh', 'nvoleth@php.net', '$2a$04$aS1JTH4XxRP3q7pirtE0b.i8Xyqcpi8IDSYXzY5lnFg/w7qTi7Ily'),
  ('ctipleri', 'mheldi@yellowpages.com', '$2a$04$mNzgbr6Bq/L0nO1UAfAoW.0IS1nnKWLyGeNvBixEroOa.P/A.ELqm'),
  ('jarmellj', 'cklavesj@tamu.edu', '$2a$04$G02aFaWqvkmq61xbHGhKSOLo.1u4kG5Lk9teZlJRBRZ7X5oCiJ8K6');

  INSERT INTO resources (user_id, title, description, url, category) VALUES
  (1, 'Introduction to SQL', 'A beginner-friendly SQL tutorial', 'https://www.example.com/sql-intro', 'Video'),
  (2, 'Advanced SQL Techniques', 'Learn advanced SQL querying', 'https://www.example.com/advanced-sql', 'Video'),
  (3, 'Getting Started with Python', 'Python programming basics', 'https://www.example.com/python-basics', 'Video'),

  INSERT INTO likes (user_id, resource_id) VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 3),
  (5, 4),
  (6, 4),
  (7, 5),
  (8, 5);

  INSERT INTO comments (user_id, resource_id, comment_text, rating) VALUES
  (1, 1, 'This SQL tutorial was really helpful!', 4.5),
  (2, 1, 'I learned a lot from this video.', 4.2),
  (3, 2, 'Great tutorial on Python basics.', 4.0),
  (4, 3, 'The web development tutorial is excellent!', 4.8),
  (5, 4, 'Introduction to Machine Learning was informative.', 4.3),
  (6, 4, 'I found the explanation a bit confusing.', 3.5),
  (7, 5, 'The blog on blogging is quite useful.', 4.1),
  (8, 5, 'Not what I was expecting, but still interesting.', 3.7);
