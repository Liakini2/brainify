SELECT c.category, r.score FROM results r JOIN games g ON r.game_id = g.id JOIN categories c ON g.category_id = c.id
WHERE r.user_id = $1;
