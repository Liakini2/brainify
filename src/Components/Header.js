import React, {useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import { Slide } from '@material-ui/core';
import axios from 'axios'

const Header = (props) => {
    const [toggle, setToggle] = useState(false)
    const userValue = useContext(UserContext)
    const {username} = useContext(UserContext)
    // console.log(userValue)

    const logout = async () => {
        await axios.post('auth/logout')
        setToggle(false);
        userValue.setUser({username: null, firstName: null, lastName: null, email: null, loggedIn: false})
        props.history.push('/')
    }

    return (
        <header className='header'>
            <section className='mainBar'>
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
            <Slide in={toggle} direction="left" timeout={500} unmountOnExit mountOnEnter>
                <section className='dropDown'>
                        <Link className='editBtn' to='/account' onClick={() => setToggle(false)}>
                            <h5 className='editBtn'>Edit Account</h5>
                        </Link>
                        <button className='logoutBtn' onClick={() => logout()}>Logout</button>
                </section>
            </Slide>
        </header>
    )
}

export default withRouter(Header)
