import {useHistory} from 'react-router-dom'

const About = () => {
    const history = useHistory()
    return (
        <div className='about'>
            <div className='aboutUs'>
                <h2 className='aboutTextTwo'>Train Your Brain</h2>
                <h1 className='aboutTextOne'>Welcome to Brainify</h1>
                <p className='aboutParagraph'>We value your mental health! Use our mini games to keep your brain happy and improve your skills while doing so. We make it easy to track your current progress and excercise your brain daily.</p> 
                <button onClick={()=>{history.push('/')}}>Get Started!</button>
            </div>
        </div>
    )
}

export default About
