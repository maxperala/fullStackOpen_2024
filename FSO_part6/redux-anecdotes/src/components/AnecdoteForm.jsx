import {useDispatch} from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch();
    const submitNote = (event) => {
        event.preventDefault();
        const text = event.target.anecdote.value;
        dispatch(createAnecdote(text));
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