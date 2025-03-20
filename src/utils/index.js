import PLAN from './year_plan.json'
export function countdownIn24Hours(targetUTCMillis) {
    const currentTime = Date.now() // Get current UTC time in milliseconds
    const endOfDay = targetUTCMillis + 24 * 60 * 60 * 1000 // 24 hours after target time

    const remainingTime = endOfDay - currentTime // Calculate how much time is left

    return remainingTime // Positive if time remains, negative if overflowed
}

export function convertMilliseconds(ms) {
    const absTime = Math.abs(ms)
    const hours = Math.floor(absTime / (1000 * 60 * 60))
    const minutes = Math.floor((absTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((absTime % (1000 * 60)) / 1000)

    return {
        hours: ms >= 0 ? hours : -hours,
        minutes: ms >= 0 ? minutes : -minutes,
        seconds: ms >= 0 ? seconds : -seconds
    }
}

function generateWordArr(day, offset = 0) {
    let totalWords = []
    for (let dayIndex in PLAN) {
        if (dayIndex - offset > day) {
            break
        }
        const words = PLAN[dayIndex]
        totalWords = [...totalWords, ...words]
    }
    return totalWords
}

export function calculateNewWords(day) {
    let totalWords = generateWordArr(day)
    const wordSet = new Set(totalWords)
    return wordSet.size
}

export function calculateAccuracy(a, day) {
    let totalWords = generateWordArr(day, -1)
    console.log(a, totalWords.length * 2)
    return (totalWords.length * 2) / a
}

export function isEncountered(day, word) {
    let totalWords = generateWordArr(day - 1)
    return totalWords.includes(word)
}

export function calcLevel(day) {
    let totalWords = generateWordArr(day, -1)
    let d = {}
    for (let word of totalWords) {
        d[word] = (d?.[word] || 0) + 1
    }
    let avgLevel = Object.keys(d).reduce((acc, curr) => {
        return { num: acc.num + 1, total: acc.total + d[curr] }
    }, { total: 0, num: 0 })
    console.log(avgLevel)
    return avgLevel.total / avgLevel.num
}