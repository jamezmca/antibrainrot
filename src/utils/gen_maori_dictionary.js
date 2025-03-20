import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import csv from 'csv-parser'

// used google sheets to transalte

// Define __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function convertCsvToJson() {
    const csvFilePath = path.join(__dirname, 'maori_translated.csv')
    const jsonFilePath = path.join(__dirname, 'maori_dictionary.json')
    const dictionary = {}

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                const keys = Object.keys(row)
                if (keys.length >= 2) {
                    const key = row[keys[0]].trim()
                    const value = row[keys[1]].trim()
                    dictionary[key] = value
                }
            })
            .on('end', () => {
                fs.writeFileSync(jsonFilePath, JSON.stringify(dictionary, null, 2), 'utf8')
                console.log(`Dictionary saved to ${jsonFilePath}`)
                resolve(dictionary)
            })
            .on('error', (err) => {
                console.error(`Error reading CSV: ${err.message}`)
                reject(err)
            })
    })
}

// Run the function
convertCsvToJson()
