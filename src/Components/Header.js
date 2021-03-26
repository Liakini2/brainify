import React, {useState, useContext, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import { Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'

const Header = (props) => {
    const [toggle, setToggle] = useState(false)
    const userValue = useContext(UserContext)
    const {username} = useContext(UserContext)
    const [phoneMenu, SetPhoneMenu] = useState(false);
    const [l, setL] = useState(false);
    // console.log(userValue)

    useEffect(() => {
        console.log(userValue.username);
        if(userValue.user.username) {setL(true); SetPhoneMenu(false)}
    }, [userValue])

    const logout = async () => {
        await axios.post('auth/logout')
        setL(false);
        setToggle(false);
        userValue.setUser({username: null, firstName: null, lastName: null, email: null, loggedIn: false})
        props.history.push('/')
    }

    return (
        <header className='header'>
            <h1 className="brainifyLogo phone">Brainify</h1>
            {l &&
            <>
            <MenuIcon className="phone menu" onClick={_ => SetPhoneMenu(!phoneMenu)} />
            <Slide in={phoneMenu} direction="left" timeout={500} unmountOnExit mountOnEnter className="phone">
                <nav className="phoneNav">
                    <Link className="navBtn" to="/home"><li clasName="navBtn">Home Page</li></Link>
                    <Link className='navBtn' to='/tests'><li className='navBtn'>Brain Games</li></Link>
                    <Link className='navBtn' to='/stats'><li className='navBtn'>Your Stats</li></Link>
                    <Link className='editBtn' to='/account' onClick={() => setToggle(false)}><h5 className='editBtn'>Edit Account</h5></Link>
                    <button className='logoutBtn' onClick={() => logout()}>Logout</button>
                </nav>
            </Slide>
            <section className='mainBar computer'>
                <nav className='nav'>
                    <h1 className='brainifyLogo'>Brainify</h1>
                    <ul>
                        <Link className='navBtn' to='/home'>
                            <li className='navBtn'>Home Page</li>
                        </Link>
                        <Link className='navBtn' to='/tests'>
                            <li className='navBtn'>Brain Games</li>
                        </Link>
                        <Link className='navBtn' to='/stats'>
                            <li className='navBtn'>Your Stats</li>
                        </Link>
                    </ul> 
                </nav>

                <div className='about'>
                    <Link className='altLinks' to='/about'>
                        <h3 className='altLinks'>About Us</h3>
                    </Link>
                    <button className='menuBtn' onClick={() => setToggle(!toggle)}>{username ? username: 'menu'}</button>
                </div>
                
            </section>
            <Slide in={toggle} direction="left" timeout={500} unmountOnExit mountOnEnter className="computer">
                <section className='dropDown' style={{transform: "translateX(90%)"}}>
                        <Link className='editBtn' to='/account' onClick={() => setToggle(false)}>
                            <h5 className='editBtn'>Edit Account</h5>
                        </Link>
                        <button className='logoutBtn' onClick={() => logout()}>Logout</button>
                </section>
            </Slide></>}
        </header>
    )
}

export default withRouter(Header)
