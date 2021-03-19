import React, {useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import axios from 'axios'

const Header = (props) => {
    const [toggle, setToggle] = useState(false)
    const {username, setUser} = useContext(UserContext)

    const logout = async () => {
        await axios.post('auth/logout')
        setUser({username: '', firstName: '', lastName: '', email: '', loggedIn: false})
        props.history.push('/')
    }

    return (
        <header className='header'>
            <section className='mainBar'>

                <h1>Brainify</h1>

                <div className='headerOptions'>
                    <nav className='nav'>
                        <ul>
                            <Link to='/home'>
                                <li>Home</li>
                            </Link>
                            <Link to='tests'>
                                <li>Tests</li>
                            </Link>
                            <Link to='stats'>
                                <li>Your Stats</li>
                            </Link>
                        </ul> 
                    </nav>

                    <div className='about'>
                        <Link to='/about'>
                            <h3>About</h3>
                        </Link>
                        <button onClick={() => setToggle(!toggle)}>{username? username: 'menu'}</button>
                    </div>
                </div>

            </section>
            <section className={`dropDown ${toggle && 'active'}`}>

                    <Link to='/account'>
                        <h5>Edit Account</h5>
                    </Link>
                    <button onClick={() => logout()}>Logout</button>

            </section>
        </header>
    )
}

export default withRouter(Header)
