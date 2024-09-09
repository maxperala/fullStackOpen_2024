import { useState } from 'react'


const Button = (props) => {
  return(
    <button onClick={() => props.onclick(props.id)}>{props.message}</button>
  )
}

const Statistics = ({stats}) => {

  if (stats.good + stats.neutral + stats.bad === 0) {
      return(
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
        
      )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        
        <tbody>
        <StatisticsRow operation={"good"} stats={stats} />
        <StatisticsRow operation={"neutral"} stats={stats} />
        <StatisticsRow operation={"bad"} stats={stats} />
        <StatisticsRow operation={"all"} stats={stats} />
        <StatisticsRow operation={"average"} stats={stats} />
        <StatisticsRow operation={"positive"} stats={stats} />
        </tbody>

      </table>
      
      
    </div>
    
  )
}

const StatisticsRow = ({operation, stats}) => {

  const total = (stats) => (stats.good + stats.neutral + stats.bad);

  if (operation === "good") return (
    <tr>
      <td>{operation}</td>
      <td>{stats.good}</td>
    </tr>
  )
  if (operation === "neutral") return (
    <tr>
      <td>{operation}</td>
      <td>{stats.neutral}</td>
    </tr>
  )
  if (operation === "bad") return (
    <tr>
      <td>{operation}</td>
      <td>{stats.bad}</td>
    </tr>
  )
  if (operation === "all") return (
    <tr>
      <td>{operation}</td>
      <td>{total(stats)}</td>
    </tr>
  )
  if (operation === "average") return (
    <tr>
      <td>{operation}</td>
      <td>{((stats.good * 1) + (stats.bad * - 1)) / total(stats)}</td>
    </tr>
  )
  if(operation === "positive") return (
    <tr>
      <td>{operation}</td>
      <td>{(stats.good / total(stats)) * 100} %</td>
    </tr>
  )
  

}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onButtonClick = (id) => {
      if (id === "good-button") return setGood(good + 1);
      if (id === "neutral-button") return setNeutral(neutral + 1);
      if (id === "bad-button") return setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button message={"good"} onclick={onButtonClick} id="good-button"/>
      <Button message={"neutral"} onclick={onButtonClick} id="neutral-button"/>
      <Button message={"bad"} onclick={onButtonClick} id="bad-button"/>
      <Statistics stats={{good, neutral, bad}} />
    </div>
  )
}




export default App