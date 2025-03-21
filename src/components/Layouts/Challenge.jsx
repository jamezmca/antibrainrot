import React, { useState } from 'react'
import DATA from '../../utils/year_plan.json'
import DEFINITIONS from '../../utils/maori_dictionary.json'
import { isEncountered, shuffle } from '../../utils'
import ProgressBar from '../ProgressBar'

export default function Challenge(props) {
    const { day, daysWords, handleChangePage, handleIncrementAttemps, handleCompleteDay } = props
    const [wordIndex, setWordIndex] = useState(0)
    const [inputVal, setInputVal] = useState('')
    const [showDefinition, setShowDefinition] = useState(false)

    const [listToLearn, setListToLearn] = useState([...daysWords, ...shuffle(daysWords), ...shuffle(daysWords), ...shuffle(daysWords)])

    const word = listToLearn[wordIndex]
    const isNewWord = showDefinition || (!isEncountered(day, word) && wordIndex < daysWords.length)

    function giveUp() {
        setListToLearn([...listToLearn, word])
        setShowDefinition(true)
    }


    return (
        <section id='challenge' className=''>
            {/* <p>1/{words_list.length}</p> */}
            {/* <div className='card challenge-card'>
                <h3 className='header-text'>Day {day}</h3>
                <p><b>Words</b> 4 / 15</p>
            </div> */}
            <h1>{word}</h1>
            {isNewWord && (<p>{DEFINITIONS[word]}</p>)}
            <div className='helper'>
                <div>
                    {[...Array(DEFINITIONS[word].length).keys()].map((e, i) => {
                        const randoStyle = inputVal.length < e + 1 ? '' : inputVal.split('')[i].toLowerCase() == DEFINITIONS[word].split('')[i].toLowerCase() ? ' correct' : ' incorrect'
                        return (
                            <div className={' ' + (randoStyle)} key={i}></div>
                        )
                    })}
                </div>
                <input value={inputVal} onChange={(e) => {
                    if (e.target.value.toLowerCase() == DEFINITIONS[word].toLowerCase()) {
                        // answer correct, increment index and reset
                        handleIncrementAttemps()
                        setInputVal('')
                        setShowDefinition(false)
                        if (wordIndex >= listToLearn.length - 1) {
                            // then they've finished
                            handleCompleteDay()
                            return
                        }
                        setWordIndex(curr => curr + 1)
                        return
                    }
                    setInputVal(e.target.value)
                }} type='text' placeholder='Enter the english translation...' />
            </div>

            <div className='challenge-btns'>
                <button onClick={() => { handleChangePage(1) }} className='card-button-secondary'>
                    <h6>Quit</h6>
                </button>
                <button onClick={() => {
                    giveUp()
                    handleIncrementAttemps()
                }} className='card-button-primary'>
                    <h6>I forgot</h6>
                </button>
            </div>
            <ProgressBar text={`${wordIndex} / ${listToLearn.length} `} remainder={wordIndex * 100 / listToLearn.length} />
            {/* <button className='link-button quit-btn'>
                Quit
            </button> */}
        </section>
    )
}
