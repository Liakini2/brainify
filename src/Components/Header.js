import React, {useState, useContext, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import { Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'

const Header = (props) => {


    const [toggle, setToggle] = useState(false)
    const [phoneMenu, SetPhoneMenu] = useState(true);

    const userValue = useContext(UserContext);
    const [loggedin, setLoggedin] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);
    // console.log(userValue)

    useEffect(() => {
        const getDimensions = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', getDimensions)
        return (() => window.removeEventListener('resize', getDimensions))
    }, []);

    useEffect(() => {
        console.log('am i even triggering this? ', width)
        if(width > 760) {
            SetPhoneMenu(true);
            setToggle(false);
        } else {
            SetPhoneMenu(false);
            setToggle(true);
        }
    }, [width])

    const logout = async () => {
        await axios.post('auth/logout')
        setLoggedin(false);
        setToggle(false);
        userValue.setUser({username: null, firstName: null, lastName: null, email: null, loggedIn: false})
        props.history.push('/')
    }

    return (
        <header className='header'>
            <h1 className="brainifyLogo">BRAINIFY</h1>
            <MenuIcon className="phone menu" onClick={_ => SetPhoneMenu(!phoneMenu)} />
            <Slide in={phoneMenu} direction="left" timeout={500} unmountOnExit mountOnEnter>
                <nav className="nav">
                    <section className="left">
                        <Link className="navBtn" to="/">Home</Link>
                        <Link className="navBtn" to="/tests">Brain Games</Link>
                        <Link className="navBtn" to="/stats">Your Stats</Link>
                    </section>
                    <section className="right">
                        <Link to="/about" className="altLinks">About</Link>
                        <MenuIcon className="acctMenu computer" onClick={_ => setToggle(!toggle)}/>
                    </section>
                    <Slide in={toggle} direction="left" timeout={500} unmountOnExit mountOnEnter>
                        <section className="dropdown">
                            <Link className="navBtn" to="/account">Edit Account</Link>
                            <button className='logoutBtn' onClick={() => logout()}>Logout</button>
                        </section>
                    </Slide>
                </nav>
            </Slide>
        </header>
    )
}

export default withRouter(Header)
