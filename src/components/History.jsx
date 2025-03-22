import React from 'react'

export default function History(props) {
    const { history } = props
    const historyKeys = Object.keys(history)
    return (
        <div className='history-card card'>
            <h4>History</h4>
            {historyKeys.length === 0 ? (
                <p>You have no attempts! Press <b>Start</b> to begin ⭐️</p>

            ) : (
                <div className='history-list'>
                    {historyKeys.map((h, hi) => {
                        const dateKey = (new Date(h)).toString().split(' ').slice(1, 4).join(' ')
                        return (
                            <div className='card-button-secondary' key={hi}>
                                <div>
                                    <p>Started</p>
                                    <h6>
                                        {dateKey}
                                    </h6>
                                </div>
                                <div>
                                    <p>Streak</p>
                                    <h6>
                                        {history[h]}
                                    </h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
