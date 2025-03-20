function generateSpacedRepetitionSchedule(wordsDict) {
    const words = Object.keys(wordsDict);
    const schedule = {};
    const totalDays = 365;
    const newWordsPerDay = 3;
    const intervals = [1, 3, 7, 14, 30, 60, 120, 240]; // Spaced repetition intervals in days
    let learningQueue = [];

    for (let day = 1; day <= totalDays; day++) {
        schedule[day] = [];

        // Introduce new words (if available)
        if (words.length > 0) {
            for (let i = 0; i < newWordsPerDay && words.length > 0; i++) {
                let word = words.shift();
                learningQueue.push({ word, nextReview: day + intervals[0], intervalIndex: 0 });
                schedule[day].push(word);
            }
        }

        // Handle reviews
        learningQueue = learningQueue.map(entry => {
            if (entry.nextReview === day) {
                schedule[day].push(entry.word);
                if (entry.intervalIndex < intervals.length - 1) {
                    return { ...entry, nextReview: day + intervals[entry.intervalIndex + 1], intervalIndex: entry.intervalIndex + 1 };
                }
            }
            return entry;
        }).filter(entry => entry.nextReview > day);
    }

    return schedule;
}

import fs from 'fs'

const rawData = fs.readFileSync('./maori_dictionary.json', 'utf-8');
const jsonData = JSON.parse(rawData);

const schedule = generateSpacedRepetitionSchedule(jsonData);
fs.writeFileSync('schedule.json', JSON.stringify(schedule, null, 2));

console.log(JSON.stringify(schedule, null, 2));
