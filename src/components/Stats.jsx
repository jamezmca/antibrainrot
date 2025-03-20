import React from 'react'
import { calcLevel, calculateAccuracy, calculateNewWords } from '../utils'

export default function Stats(props) {
    const { name, day, attempts } = props

    const currLvl = calcLevel(day)
    const flooredLvl = Math.floor(currLvl)
    const remainder = (currLvl - flooredLvl) * 100
    console.log(remainder)
    return (
        <div className='card stats-card'>
            <div className='welcome-text'>
                <h6>Welcome</h6>
                <h4 className='text-large'>
                    {name}
                </h4>
            </div>
            <div className='stats-columns'>
                <div>
                    <p>Streak 🔥</p>
                    <h4>{day - 1}</h4>
                </div>
                <div>
                    <p>Words seen</p>
                    <h4>{calculateNewWords(day - 1)}</h4>
                </div>
                <div>
                    <p>Accuracy (%)</p>
                    <h4>{(calculateAccuracy(attempts, day) * 100).toFixed(1)}%</h4>
                </div>
            </div>
            <div className='level'>
                <div>
                    <h4>lvl {flooredLvl}</h4>
                </div>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => {
                    return (
                        <div className='level-bar' key={i} />
                    )
                })}
                <div className='xp' style={{ width: `${remainder}%` }} />
            </div>
        </div>
    )
}
