import {useHistory} from 'react-router-dom'

const About = () => {
    const history = useHistory()
    return (
        <div>
            <h2>Train Your Brain</h2>
            <h1>Welcome to Brainify</h1>
            <p>We value your mental health! Use our mini games to keep your brain happy and improve your skills while doing so. We make it easy to track your current progress and excercise your brain daily.</p> 
            <button onClick={()=>{history.push('/')}}>Get Started!</button>
        </div>
    )
}

export default About
