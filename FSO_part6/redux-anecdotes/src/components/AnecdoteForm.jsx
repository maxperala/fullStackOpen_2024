import {useDispatch} from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, hideNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {

    const dispatch = useDispatch();
    const submitNote = async (event) => {
        event.preventDefault();
        const text = event.target.anecdote.value;
        const anecdote = await anecdoteService.addAnecdote({
            content: text,
            votes: 0
        })
        dispatch(createAnecdote(anecdote));
        dispatch(setNotification(`Added ${text}`));
        setTimeout(() => dispatch(hideNotification()), 3000);
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submitNote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )


}


export default AnecdoteForm;