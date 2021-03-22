require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const userCtrl = require('./user/userController.js');
const gameCtrl = require('./game/gameController.js');
const auth = require('./middleware/authMiddleware.js');

const app = express();

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000*60*60*24*7}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('DB connected');
}).catch(err => console.log(err));


app.post('/auth/register', userCtrl.register);
app.post('/auth/login', userCtrl.login);
app.post('/auth/logout', userCtrl.logout)
app.get('/auth/me', userCtrl.getuser);
app.put('/auth/user/:user_id', auth.usersOnly, userCtrl.updateuser);


app.post('/api/score/:game_id', auth.usersOnly, gameCtrl.addScore);
app.get('/api/scores', auth.usersOnly, gameCtrl.getScores);
app.get('api/scores/compare', auth.usersOnly, gameCtrl.compareScores);


app.use(express.static(__dirname + '/../build'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '../build/index.html'));
// });

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));