import { useState } from 'react'

const Button = ({ title, handleClick }) => (
  <button onClick={handleClick}>
    {title}
  </button>
)

const StatisticLine = ({ title, value }) => (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  const totalAmount = good + neutral + bad

  const average = () => {
    const total = good - bad
    return total / totalAmount
  }

  const positives = () => {
    const positivePercent = (good / totalAmount) * 100
    return positivePercent + " %"
  }

  if (totalAmount === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine title="good" value={good} />
          <StatisticLine title="neutral" value={neutral} />
          <StatisticLine title="bad" value={bad} />
          <StatisticLine title="all" value={good + neutral + bad} />
          <StatisticLine title="average" value={average()} />
          <StatisticLine title="positive" value={positives()} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button title="good" handleClick={() => setGood(good + 1)} />
      <Button title="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button title="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
