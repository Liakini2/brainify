import {useContext, useEffect} from 'react'
import axios from 'axios'
import {HorizontalBar} from 'react-chartjs-2'
import {Bar} from 'react-chartjs-2'
import { UserContext } from '../context/UserContext'

const Stat = () => {
    const userValue = useContext(UserContext)

    useEffect(() => {
        axios.get(`/api/scores`)
        .then(({data})=>{
            userValue.setStats(data)
        })
        .catch(err=>console.log(err))
    }, [])

    let mappedCategories = userValue.stats.map(stat=>{return stat.category})
    let mappedAverageScore = userValue.stats.map(stat=>{return stat.averageScore})

    return (
        <section className='stat'>
            <h1>Your Recent Stats</h1>
            <Bar
            height={'80%'}
            width={'100%'}
            data={{
                labels: [...mappedCategories],
                datasets: [{
                    barPercentage: 1.0, 
                    barThickness: 30,
                    label: `Average Score by Category`,
                    data: [...mappedAverageScore],    
                    backgroundColor: ["rgba(105, 222, 230, 0.5)", "rgba(114, 77, 128, 0.5)", "rgba(148, 137, 146, 0.5)", "rgba(40, 51, 130, 0.5)"]
                }]
            }}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'white'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false
                        }
                    }] 
                }
            }}
            />
        </section>
    )
}

export default Stat

{/* <h1>Your Recent Stats</h1>
            {userValue.stats.map(stat=>{
                return <HorizontalBar
                    height={50}
                    width={100}
                    data={{
                        datasets: [{
                            barPercentage: 1.0, 
                            barThickness: 30,
                            label: `${stat.category}`,
                            data: [stat.averageScore],    
                            backgroundColor: "rgba(105, 222, 230, 0.5)"
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: `${stat.category}`,
                            fontColor: 'white',
                            fontSize: 14
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: 'white'
                                }
                            }]
                        }
                    }}
                    />
            })} */}