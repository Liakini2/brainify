-- CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(30) NOT NULL, password VARCHAR NOT NULL, first_name VARCHAR(30), last_name VARCHAR(30), email VARCHAR(50), last_logged_in DATE default CURRENT_DATE);

-- CREATE TABLE categories (id SERIAL PRIMARY KEY, category VARCHAR(30));

-- CREATE TABLE games (id SERIAL PRIMARY KEY, game_name VARCHAR (30), category_id INT REFERENCES categories(id));

-- CREATE TABLE results (id SERIAL PRIMARY KEY, game_id INT REFERENCES games(id), user_id INT REFERENCES users(id), score INT, date DATE DEFAULT CURRENT_DATE);
