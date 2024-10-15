import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import { createNotification } from "./notificationReducer";

const initialState = [];

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    replaceAnecdote(state, action) {
      const anecdote = state.find(a => a.id === action.payload.id);
      if (anecdote) {
        anecdote.content = action.payload.content;
        anecdote.votes = action.payload.votes;
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})



export const {replaceAnecdote, setAnecdotes, appendAnecdote} = anecdoteReducer.actions;

export const setAllAnecdotes = () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(anecs));
  }
}

export const createAnecdote = (text) => {
  return async (dispatch) => {
    const a = await anecdoteService.addAnecdote({content: text, votes: 0});
    dispatch(appendAnecdote(a));
    dispatch(createNotification(`Added ${text}`));
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const a = {...anecdote, votes: anecdote.votes + 1};
    const newAnec = await anecdoteService.updateAnecdote(a);
    dispatch(replaceAnecdote(newAnec));
    dispatch(createNotification(`You have voted '${newAnec.content}'`));
  }
}


export default anecdoteReducer.reducer;