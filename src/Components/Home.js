import React from 'react'
import GameIcon from './GameIcon'
import Stats from './Stats'

const Home = () => {
    return (
        <div className='home'>
            <section className='recommended'>
                <h1>Recommended For You</h1>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
            </section>
            <section className='stats'>
                <h1>Your Recent Stats</h1>
                <Stats/>
            </section>
        </div>
    )
}

export default Home
