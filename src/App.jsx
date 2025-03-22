import { useEffect, useState } from "react"
import Layout from "./components/Layouts/Layout"
import HeroPage from "./components/Layouts/HeroPage"
import Dashboard from "./components/Layouts/Dashboard"
import Task from "./components/Layouts/Task"
import Challenge from "./components/Layouts/Challenge"
import { countdownIn24Hours } from "./utils"
import PLAN from './utils/year_plan.json'

function App() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [program, setProgram] = useState(null)
  const [selectedDisplay, setSelectedDisplay] = useState(0)
  const [day, setDay] = useState(1)
  const [datetime, setDatetime] = useState(null)
  const [history, setHistory] = useState([])
  const [attempts, setAttempts] = useState(0)

  const daysWords = PLAN[day]

  // have a dashbaord page with todaystask (time left, number of words), and the stats e.g. number of words seen, average level, day streak

  function handleSwapProgram() {
    // delete all progress
  }

  function handleChangePage(index) {
    setSelectedDisplay(index)
  }

  function handleCreateAccount() {
    if (!name) { return }
    localStorage.setItem('name', name)
    handleChangePage(1)
  }

  function handleCompleteDay() {
    const newDay = day + 1
    const newDatetime = Date.now()
    setDay(newDay)
    setDatetime(newDatetime)

    localStorage.setItem('day', JSON.stringify({ day: newDay, datetime: newDatetime }))
    setSelectedDisplay(1)
  }

  function handleIncrementAttemps() {
    const newRecord = attempts + 1
    localStorage.setItem('attempts', newRecord)
    setAttempts(newRecord)
  }


  useEffect(() => {
    if (!localStorage) { return }
    if (localStorage.getItem('name')) {
      setName(localStorage.getItem('name'))
      setSelectedDisplay(1)
    }
    if (localStorage.getItem('attempts')) {
      setAttempts(parseInt(localStorage.getItem('attempts')))
    }
    if (localStorage.getItem('history')) {
      setHistory(JSON.parse(localStorage.getItem('history')))
    }
    if (localStorage.getItem('day')) {
      const { day: d, datetime: dt } = JSON.parse(localStorage.getItem('day'))
      setDatetime(dt)
      setDay(d)

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt)
        if (diff < 0) {
          console.log('Failed challenge')
          let newHistory = {}
          const timestamp = new Date(dt)
          const formattedTimestamp = timestamp.toString().split(' ').slice(1, 4).join(' ')
          newHistory[formattedTimestamp] = d
          setHistory(curr => {
            let temp = { ...newHistory, ...curr }
            newHistory = temp
            return newHistory
          })
          setDay(1)
          setAttempts(0)
          setDatetime(null)
          localStorage.setItem('day', JSON.stringify({ day: 1, datetime: null }))
          localStorage.setItem('history', JSON.stringify(newHistory))
        }
      }
    }
  }, [])

  const displays = {
    0: <HeroPage handleCreateAccount={handleCreateAccount} name={name} setName={setName} />,
    1: <Dashboard attempts={attempts} daysWords={daysWords} datetime={datetime} history={history} day={day} name={name} handleChangePage={handleChangePage} />,
    2: <Challenge handleIncrementAttemps={handleIncrementAttemps} handleChangePage={handleChangePage} day={day} daysWords={daysWords} handleCompleteDay={handleCompleteDay} />
  }

  return (
    <Layout>
      {displays[selectedDisplay]}
    </Layout>
  )
}

export default App
