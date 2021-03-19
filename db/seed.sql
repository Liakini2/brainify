-- CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(30) NOT NULL, password VARCHAR NOT NULL, first_name VARCHAR(30), last_name VARCHAR(30), email VARCHAR(50), last_logged_in DATE);

-- CREATE TABLE games (id SERIAL PRIMARY KEY, game_name VARCHAR (30), category_id REFERENCES categories(id));

-- CREATE TABLE categories (id SERIAL PRIMARY KEY, category VARCHAR(30));

-- CREATE TABLE results (id SERIAL PRIMARY KEY, game_id REFERENCES games(id), user_id REFERENCES users(id), score NUMBER, date DATE DEFAULT CURRENT_DATE);

-- CREATE TABLE overall_results (id SERIAL PRIMARY KEY, user_id REFERENCES users(id), category_id REFERENCES categories(id), total_score NUMBER);