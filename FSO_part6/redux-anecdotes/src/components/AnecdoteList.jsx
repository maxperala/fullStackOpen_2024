import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../reducers/anecdoteReducer";



const AnecdoteList = () => {

    const dispatch = useDispatch();
    const store = useSelector((state) => {
        return state.anecdotes.filter((a) => {
            return a.content.toLowerCase().startsWith(state.filter);
        });
    });
    const anecdotes = store.sort((a, b) => a.votes - b.votes);
    const vote = (anecdote) => {
        dispatch(createVote(anecdote));
        
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