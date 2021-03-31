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
        // axios.get('/auth/me')
        // .then(({data})=>{
        //     userValue.setUser(data)
        // })
        // .catch(_=>history.push('/'))

        axios.get(`/api/scores`)
        .then(({data})=>{
            console.log(data)
            userValue.setStats(data)
        })
        .catch(err=>console.log(err))
    }, [])
    
    let mappedCategories = userValue.stats.map(stat=>{return stat.category})
    let mappedAverageScore = userValue.stats.map(stat=>{return stat.averageScore})
    
    return (
        <div className='your-stats'>
            <section className='barGraph'>
                <Stat/>
            </section>
            <section className='overview'>
                <Radar
                height={'100%'}
                width={'100%'}
                data={{
                    //categories go here
                    labels: [...mappedCategories],
                    datasets:[{
                        label: `score`,
                        data: [...mappedAverageScore], 
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
                        },
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                }}
                />
            </section>
        </div>
    )
}

export default Stats
