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
                    <h1>Brainify</h1>
                    <ul>
                        <Link to='/home'>
                            <li>Home</li>
                        </Link>
                        <Link to='/tests'>
                            <li>Tests</li>
                        </Link>
                        <Link to='/stats'>
                            <li>Your Stats</li>
                        </Link>
                    </ul> 
                </nav>

                <div className='about'>
                    <Link to='/about'>
                        <h3>About</h3>
                    </Link>
                    <button className='menuBtn' onClick={() => setToggle(!toggle)}>{username ? username: 'menu'}</button>
                </div>
                
            </section>
            <Slide in={toggle} direction="left" timeout={500} unmountOnExit mountOnEnter>
                <section className='dropDown'>
                        <Link to='/account' onClick={() => setToggle(false)}>
                            <h5>Edit Account</h5>
                        </Link>
                        <button className='logoutBtn' onClick={() => logout()}>Logout</button>
                </section>
            </Slide>
        </header>
    )
}

export default withRouter(Header)
