 INSERT INTO resources (user_id, title, description, url, category) VALUES
  (1, 'Introduction to SQL', 'A beginner-friendly SQL tutorial', 'https://www.example.com/sql-intro', 'Video'),
  (2, 'Advanced SQL Techniques', 'Learn advanced SQL querying', 'https://www.example.com/advanced-sql', 'Video'),
  (3, 'Getting Started with Python', 'Python programming basics', 'https://www.example.com/python-basics', 'Video'),
    (4, 'Web Development Tutorial', 'Build a basic website from scratch', 'https://developer.mozilla.org/en-US/docs/Learn', 'Video'),
  (5, 'Introduction to Machine Learning', 'Overview of machine learning concepts', 'https://machinelearningmastery.com/what-is-machine-learning/', 'Video'),
  (6, 'Digital Art: Creating Stunning Graphics', 'Learn digital art techniques using software', 'https://www.digitalartsonline.co.uk/features/illustration/digital-art-tips-creative-coding/', 'Video'),
  (7, 'Cooking Adventures: Recipes and Stories', 'Exploring the world of cooking', 'https://www.bonappetit.com/', 'Blog'),
  (8, 'Travel Tales: Exploring New Horizons', 'Travel stories and recommendations', 'https://www.nomadicmatt.com/', 'Blog'),
  (9, 'Fitness Journey: Workouts and Wellness', 'Stay fit and healthy with effective workouts', 'https://www.self.com/fitness', 'Blog'),
  (10, 'Fashion Trends: Style Inspiration', 'Stay updated with the latest fashion trends', 'https://www.vogue.com/', 'Blog'),
  (11, 'Introduction to Astronomy', 'Discover the wonders of the universe', 'https://www.space.com/astronomy-basics', 'Science'),
  (12, 'The Science of Climate Change', 'Understanding climate science and its impact', 'https://www.nationalgeographic.com/environment/global-warming/deforestation/', 'Science'),
  (13, 'Coding and Development News', 'Stay informed about the latest programming trends', 'https://www.codinghorror.com/blog/', 'Technology'),
  (14, 'Artificial Intelligence Explained', 'Learn about AI and its applications', 'https://www.sas.com/en_us/insights/analytics/what-is-artificial-intelligence.html', 'Technology'),
  (15, 'Introduction to Meditation', 'Learn techniques for mindful meditation', 'https://www.mindful.org/how-to-meditate/', 'Wellness'),
  (16, 'Healthy Recipes: Nutritious Meals', 'Cook delicious and balanced meals', 'https://www.eatingwell.com/', 'Wellness'),
  (17, 'Mindful Living: Stress Management', 'Tips for reducing stress and improving well-being', 'https://www.mindbodygreen.com/0-13914/9-essential-habits-for-a-happy-mind.html', 'Wellness'),
  (18, 'Parenting Tips and Advice', 'Guidance for effective parenting and child development', 'https://www.verywellfamily.com/parenting-4157077', 'Lifestyle'),
  (19, 'Art Appreciation: Famous Paintings', 'Explore iconic artworks from history', 'https://www.nationalgallery.org.uk/paintings', 'Art'),
  (20, 'Literature Corner: Book Reviews', 'Discover new books and literary recommendations', 'https://www.goodreads.com/', 'Art');

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
