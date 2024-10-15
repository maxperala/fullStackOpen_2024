import { addAnecdote } from "../requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import notificationContext from "../notificationContext";

const AnecdoteForm = () => {

  const [notification, dispatchNotification] = useContext(notificationContext);
  const queryCLient = useQueryClient();
  const showError = () => {
    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: `Too short anecdote, must be atleast 5 chars long.`
    });
    setTimeout(() => {
      dispatchNotification({type: "HIDE_NOTIFICATION"});
    }, 3000);

  }
  const newAnecdoteMutation = useMutation({mutationFn: addAnecdote, onSuccess: () => queryCLient.invalidateQueries({queryKey: ['anecdotes']}), onError: showError});

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content);
    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: `Added ${content}`
    });
    setTimeout(() => {
      dispatchNotification({type: "HIDE_NOTIFICATION"});
    }, 3000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
