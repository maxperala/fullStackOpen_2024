import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAll, voteAnecdote} from "./requests";
import notificationContext from './notificationContext';
import notifReducer from './notificationReducer';
import { useContext, useReducer } from 'react';

const App = () => {
  const [notification, notificationDispatch] = useReducer(notifReducer, {msg: "", visible: false});
  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: queryClient.invalidateQueries({queryKey: ['anecdotes']})
  })
  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate(anecdote);
    notificationDispatch({type: "SET_NOTIFICATION", payload: `Voted ${anecdote.content}`});
    setTimeout(() => {
      notificationDispatch({type: "HIDE_NOTIFICATION"});
    }, 3000);


  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const data = await getAll();
      return data;
    }
  })

  const anecdotes = result.data;

  if (result.isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (result.isError) {
    return (
      <div>
        Anecdote service not available due to problems in server.
      </div>
    )
  }

  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
      </notificationContext.Provider>
  )
}

export default App
