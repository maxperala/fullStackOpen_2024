import { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  

  return (
    <div>
      <AnecdoteContainer anecdotes={anecdotes} />
    </div>
  )
}
const AnecdoteContainer = ({anecdotes}) => {

  
  const [status, setStatus] = useState(new Map());
  const [current, setCurrent] = useState([]);
  const [mostVoted, setMostVoted] = useState([]);

  const checkMostVoted = (dict) => {
    let mostVoted = current;
    for (const [key, value] of dict) {
      if (value > mostVoted[1]) {
        mostVoted = [key, value]
      }
    }
    setMostVoted(mostVoted)
  }

  const randomizeAndUpdate = () => {
    const newMap = new Map(status);
    if(newMap.has(current[0])) newMap.set(current[0], current[1]);

    const randInt = Math.floor(Math.random() * anecdotes.length);
    const newCurrent = Array.from(newMap.entries())[randInt];

    setCurrent(newCurrent);

    setStatus(newMap);

    checkMostVoted(newMap);


    
  }
  const vote = () => {
    setCurrent([current[0], current[1] + 1])
  }

  useEffect(() => {

    const aneDict = new Map();
    for (const anek of anecdotes) {
      aneDict.set(anek, 0)
    }
    setStatus(aneDict);
    const randInt = Math.floor(Math.random() * anecdotes.length);
    const newCurrent = Array.from(aneDict.entries())[randInt];
    setCurrent(newCurrent);



    


  }, [anecdotes])


  



  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{current[0]}</p>
      <p>has {current[1]} votes</p>
      <AnecdoteVoteButton vote={vote}/>
      <NextAnecdoteButton update={randomizeAndUpdate}/>
      <h2>Anecdote with most votes</h2>
      <p>{mostVoted[0]}</p>

    </div>
  )


}


const AnecdoteVoteButton = (props) => {

  return (
    <button onClick={props.vote}>vote</button>
  )
}

const NextAnecdoteButton = ({update}) => {
  return (
    <button onClick={update}>next anecdote</button>
  )
}

export default App