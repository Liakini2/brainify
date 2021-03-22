import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {Redirect} from 'react-router-dom'
import GameIcon from './GameIcon'

const Tests = () => {
    const userValue = useContext(UserContext)

    if(!userValue.user.username){
        return <Redirect to='/'/>
    }

    return (
        <div className='games'>
            <section className='category-list'>
                {/* categories*/}
                <label><input type="text" /><button>search</button></label>
                <li>Cat 1</li>
                <li>Cat 2</li>
                <li>Cat 2</li>
                <li>Cat 2</li>
                <li>Cat 2</li>
                <li>Cat 2</li>
            </section> 
            <section className='games-list'>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                
            </section>
        </div>
    )
}

export default Tests
