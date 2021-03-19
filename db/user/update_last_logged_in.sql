UPDATE users SET last_logged_in = CURRENT_DATE WHERE username = $1
RETURNING *;