import {useState, useEffect} from 'react';

const Auth = () => {
    const [loginInfo, setLoginInfo] = useState({username: '', password: '', verpassword: '', email: '', first_name: '', last_name: ''});
    const [regErrors, setRegErrors] = useState({username: false, password: false, email: false, first_name: false, last_name: false})
    const [tryLogin, setTryLogin] = useState(true);

    const checkEmail = () => {
        var pattern = new RegExp(/^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/);
        return pattern.test(loginInfo.email);
    }

    const checkPassword = () => {
        var reg = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/);
        return reg.test(loginInfo.password);
    }

    const checkName = (n) => {
        let reg = new RegExp(/^[a-z ,.'-]+$/i);
        return reg.test(n);
    }

    const login = () => {
        if(loginInfo.username !== '' && loginInfo.password !== '')
        {
            //try to login

            //direct to home page
        }
    }

    const register = () => {
        const emailIsGood = checkEmail();
        const passwordIsGood = checkPassword();
        const usernameIsGood = checkName(loginInfo.username);
        const firstNameIsGood = checkName(loginInfo.first_name);
        const lastNameIsGood = checkName(loginInfo.last_name);
        const verPassword = loginInfo.password === loginInfo.verpassword;
        setRegErrors({username: !usernameIsGood, password: !passwordIsGood, email: !emailIsGood, first_name: !firstNameIsGood, last_name: !lastNameIsGood})
        if(emailIsGood && passwordIsGood && verPassword && usernameIsGood && firstNameIsGood && lastNameIsGood)
        {
            //register
            
            //direct to home page
        }
    }

    return (
        <div className="login">
            {tryLogin ? <section className="auth">
                    <label><span>Username: </span><input type="text" value={loginInfo.username} onChange={e => setLoginInfo({...loginInfo, username: e.target.value})} /></label>
                    <label><span>Password: </span><input type="password" value={loginInfo.password} onChange={e => setLoginInfo({...loginInfo, password: e.target.value})} /></label>
                    <button onClick={login}>Login</button>
                    <span>or</span><a onClick={_ => setTryLogin(false)}>Register</a>
            </section> : <section className="auth">
                <label><span>Username: </span><input type="text" value={loginInfo.username} onChange={e => setLoginInfo({...loginInfo, username: e.target.value})} /></label>
                <label><span>Password: </span><input type="password" value={loginInfo.password} onChange={e => setLoginInfo({...loginInfo, password: e.target.value})} /></label>
                <label><span>Verify: </span><input type="password" value={loginInfo.verpassword} onChange={e => setLoginInfo({...loginInfo, verpassword: e.target.value})} /></label>
                <label><span>First Name: </span><input type="text" value={loginInfo.first_name} onChange={e => setLoginInfo({...loginInfo, first_name: e.target.value})} /></label>
                <label><span>Last Name: </span><input type="text" value={loginInfo.last_name} onChange={e => setLoginInfo({...loginInfo, last_name: e.target.value})} /></label>
                <label><span>Email: </span><input type="text" value={loginInfo.email} onChange={e => setLoginInfo({...loginInfo, email: e.target.value})} /></label>
                <button onClick={register}>Register</button>
                <a onClick={_ => setTryLogin(true)}>Login</a>
            </section>}
        </div>
    )
}

export default Auth
