import React from 'react'
import Countdown from '../Countdown'
import StartTask from '../StartTask'
import History from '../History'
import Stats from '../Stats'

export default function Dashboard(props) {

    return (
        <section id='dashboard'>

            <Stats {...props} />
            <Countdown {...props} />
            {/* <StartTask /> */}
            <History {...props} />
        </section>
    )
}
