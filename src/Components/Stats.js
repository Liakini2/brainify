import {useContext, useEffect} from 'react'
import axios from 'axios'
import {UserContext} from '../context/UserContext'
import {useHistory} from 'react-router-dom'
import Stat from './Stat'
import {Radar} from 'react-chartjs-2'

const Stats = () => {
    const history = useHistory()
    const userValue = useContext(UserContext)

    useEffect(() => {
        axios.get('/auth/me')
        .then(({data})=>{
            userValue.setUser(data)
        })
        .catch(_=>history.push('/'))

        axios.get(`/api/scores`)
        .then(({data})=>{
            console.log(data)
            userValue.setStats(data)
        })
        .catch(err=>console.log(err))
    }, [])

    useEffect(() => {
        userValue.stats.filter((stat)=>{
            if(stat.category==='memory'){
                userValue.setMemoryStat(stat.averageScore)
            } else if(stat.category==='math'){
                userValue.setMathStat(stat.averageScore)
            } else if(stat.category==='speed'){
                userValue.setSpeedStat(stat.averageScore)
            }
        })
    }, [userValue.Stats])
    
    return (
        <div className='your-stats'>
            <Stat/>
            <section className='overview'>
                <Radar
                height={500}
                width={100}
                data={{
                    //categories go here
                    labels: ['Memory', 'Speed', 'Math'], 
                    datasets:[{
                        label: `score`,
                        // user scores go here
                        data: [userValue.memoryStat, userValue.speedStat, userValue.mathStat],
                        backgroundColor: "rgba(105, 222, 230, 0.5)"
                    }],
                }}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    scale: {
                        gridLines:{
                            color: "rgba(255, 255, 255, 0.25)"
                        },
                        pointLabels: {
                            fontColor: "white",
                            fontSize: 14
                        }
                    }
                }}
                />
            </section>
        </div>
    )
}

export default Stats
