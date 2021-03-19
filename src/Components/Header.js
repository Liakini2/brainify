import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
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
               <button>Placeholder</button>
            </div>
        </header>
    )
}

export default Header
