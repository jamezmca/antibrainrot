import React, { useEffect, useState } from 'react'
import { convertMilliseconds, countdownIn24Hours } from '../utils'

export default function Countdown(props) {
    const { handleChangePage, daysWords, datetime, day } = props
    // Example Usage:
    const targetMillis = datetime || Date.UTC(1944, 2, 17, 12, 0, 0) // Example: March 19, 2025, 12:00 UTC
    const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis)) // Raw milliseconds remaining (or negative if overflowed)
    const timer = convertMilliseconds(remainingMs) // Converted to hours, minutes, seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingMs(countdownIn24Hours(targetMillis))
        }, 1000)
        return () => clearInterval(interval) // Cleanup function
    }, [targetMillis])

    return (
        <div className='card countdown-card'>
            <h1 className='item-header'>Day {day}</h1>
            <div className='today-container'>
                <div>
                    <p className=''>Time remaining</p>
                    <h3 className=''>{datetime ? `${Math.abs(timer.hours)}H ${Math.abs(timer.minutes)}M ${Math.abs(timer.seconds)}S` : '24H 60M 60S'}</h3>
                </div>
                <div>
                    <p className=''>Words for today</p>
                    <h3 className=''>{daysWords.length}</h3>
                </div>
            </div>
            <button onClick={() => { handleChangePage(2) }} className=' start-task'>
                <h6>Start · Huripi</h6>
            </button>
        </div>
    )
}
