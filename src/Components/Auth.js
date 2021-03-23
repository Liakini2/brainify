import axios from 'axios';
import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'

const Auth = ({history, ...props}) => {
    const [loginInfo, setLoginInfo] = useState({username: '', password: '', verpassword: '', email: '', first_name: '', last_name: ''});
    const [regErrors, setRegErrors] = useState({username: false, password: false, email: false, first_name: false, last_name: false})
    const [tryLogin, setTryLogin] = useState(true);

    const userValue = useContext(UserContext)
    // console.log(userValue)
    // console.log(props)

    const checkEmail = () => {
        //must start with a letter or number containing as many as it wants can also have a - . _ or + but ending with a letter or number before the @ symbol
        //then will start with a letter or number can have a - or . eventually followed by a . with a letter at the end between 2 to 6 characters in length
        var pattern = new RegExp(/^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/);
        return pattern.test(loginInfo.email);
    }

    const checkPassword = () => {
        //must contain at least 1 number, 1 capital letter, 1 lower case letter and one special character
        var reg = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/);
        return reg.test(loginInfo.password);
    }

    const checkName = (n) => {
        //can only contain letters a , . ' or -
        let reg = new RegExp(/^[a-z ,.'-]+$/i);
        return reg.test(n);
    }

    const login = () => {
        const {username, password} = loginInfo
        if(username !== '' && password !== ''){ 
            axios.post(`/auth/login`, {username, password})
                .then(({data})=>{
                    // console.log(`login data:`, data)
                    userValue.setUser(data)
                    history.push(`/home`)
                })
                .catch((err)=>{
                    if(err.response.data){
                        document.getElementsByClassName('error-text')[0].innerHTML=`${err.response.data}`
                    } else {
                        console.log(err.response)
                    }
                })
        }
    }

    const register = () => {
        const {username, password, first_name, last_name, email} = loginInfo
        const emailIsGood = checkEmail();
        const passwordIsGood = checkPassword();
        const usernameIsGood = checkName(username);
        const firstNameIsGood = checkName(first_name);
        const lastNameIsGood = checkName(last_name);
        const verPassword = loginInfo.password === loginInfo.verpassword;
        setRegErrors({username: !usernameIsGood, password: !passwordIsGood, email: !emailIsGood, first_name: !firstNameIsGood, last_name: !lastNameIsGood})
        if(emailIsGood && passwordIsGood && verPassword && usernameIsGood && firstNameIsGood && lastNameIsGood){
            axios.post('/auth/register', {username, password, first_name, last_name, email})
                .then(({data})=>{
                    // console.log(`register data:`, data)
                    userValue.setUser(data)
                    history.push(`/home`)
                })
                .catch((err)=>{
                    if(err.response.data){
                        document.getElementsByClassName('error-text')[0].innerHTML=`${err.response.data}`
                    } else {
                        console.log(err.response)
                    }
                })
        }
    }

    // console.log(props)
    return (
        <div className="login">
            {tryLogin ? <section className="auth">
                    <label><span>Username: </span><input type="text" autoFocus={true} value={loginInfo.username} onChange={e => setLoginInfo({...loginInfo, username: e.target.value})} /></label>
                    <label><span>Password: </span><input type="password" value={loginInfo.password} onChange={e => setLoginInfo({...loginInfo, password: e.target.value})} onKeyDown={e => {if(e.key === 'Enter' || e.code === 'Enter'){login()}}}/></label>
                    <p className='error-text'>New to Brainify? Click the register button below to create an account.</p>
                    <button onClick={login}>Login</button>
                    <span onClick={_ => setTryLogin(false)} className="switch">or Register</span>
            </section> : <section className="auth">
                <label><span>Username: </span><input type="text" autoFocus={true} value={loginInfo.username} onChange={e => setLoginInfo({...loginInfo, username: e.target.value})} /></label>
                <label><span>Password: </span><input type="password" value={loginInfo.password} onChange={e => setLoginInfo({...loginInfo, password: e.target.value})} /></label>
                <label><span>Verify: </span><input type="password" value={loginInfo.verpassword} onChange={e => setLoginInfo({...loginInfo, verpassword: e.target.value})} /></label>
                <label><span>First Name: </span><input type="text" value={loginInfo.first_name} onChange={e => setLoginInfo({...loginInfo, first_name: e.target.value})} /></label>
                <label><span>Last Name: </span><input type="text" value={loginInfo.last_name} onChange={e => setLoginInfo({...loginInfo, last_name: e.target.value})} /></label>
                <label><span>Email: </span><input type="text" value={loginInfo.email} onChange={e => setLoginInfo({...loginInfo, email: e.target.value})} /></label>
                <p className='error-text'>Already have an account? Click the login button below to log in.</p>
                <button onClick={register}>Register</button>
                <span onClick={_ => setTryLogin(true)} className="switch">Login</span>
            </section>}
        </div>
    )
}

export default Auth
