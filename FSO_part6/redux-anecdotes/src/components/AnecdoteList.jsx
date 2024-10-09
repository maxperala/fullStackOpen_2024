import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, hideNotification } from "../reducers/notificationReducer";


const AnecdoteList = () => {

    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => {
        return state.anecdotes
            .filter(a => a.content.toLowerCase().startsWith(state.filter))
            .sort((a, b) => b.votes - a.votes)
    });
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setNotification(`You have voted '${anecdote.content}'`));
        setTimeout(() => dispatch(hideNotification()), 3000);
        
      }
    

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
      )}
        </div>
    )
}


export default AnecdoteList;