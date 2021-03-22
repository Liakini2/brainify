const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    let {username, password, first_name, last_name, email} = req.body;
    // console.log('register', req.body); 
    let db = req.app.get('db');
    const [result] = await db.user.find_user([username]);
    if(result)
    {
        return res.status(409).send('Username already exists');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const [user] = await db.user.create_user([username, hash, first_name, last_name, email]);
    req.session.user = {id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email, last_logged_in: user.last_logged_in};
    return res.status(201).send(req.session.user);
}

const login = async (req, res) => {
    const {username, password} = req.body;
    let db = req.app.get('db');
    let [user] = await db.user.find_user([username]);
    if(!user) {
        return res.status(401).send('Invalid username or password');
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if(!isAuthenticated) { return res.status(403).send('Invalid username or password');}
    db.user.update_last_logged_in([username]);
    req.session.user = {id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email, last_logged_in: user.last_logged_in};
    // console.log('login:', req.session.user)
    return res.status(200).send(req.session.user);
}

const logout = (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
}

const getuser = (req, res) => {
    return req.session.user ? res.status(200).send(req.session.user) : res.sendStatus(404);
    console.log('change');
}

const updateuser = async (req, res) => {
    // console.log(req.session.user)
    const {username} = req.session.user
    const {first_name, last_name, original_password, new_password} = req.body;
    let db = req.app.get('db');
    const [result] = await db.user.find_user([req.session.user.username]);
    // console.log('result:', result, req.session.username)
    if(result){
    // console.log('new_password:', new_password)
        if(new_password !== '' && new_password !== undefined){
            const isAuthenticated = bcrypt.hashSync(original_password, result.password)
            // console.log('isAuthenticated:', isAuthenticated)
            if(isAuthenticated) {
                // console.log('made it here')
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(new_password, salt);
                const [newUser] = await db.user.update_user([result.id, first_name, last_name, hash])
                // console.log('newUser1:', newUser)
                if(newUser){
                req.session.user = {id: newUser.id, username: newUser.username, first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, last_logged_in: newUser.last_logged_in};
                return res.status(202).send(req.session.user);
                }
            }
            return res.status(403).send('Invalid password');
        }
        const [newUser] = await db.user.update_user([result.id, first_name, last_name, result.password])
        // console.log('newUser2:', newUser)
        if(newUser){
        req.session.user = {id: newUser.id, username: newUser.username, first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, last_logged_in: newUser.last_logged_in};
        return res.status(202).send(req.session.user);
        }
    }
    return res.status(500).send('something went wrong');
}

module.exports = {
    register,
    login,
    logout,
    getuser,
    updateuser
}