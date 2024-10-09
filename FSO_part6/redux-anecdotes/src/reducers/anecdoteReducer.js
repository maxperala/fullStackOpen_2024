import { createSlice } from "@reduxjs/toolkit"

const initialState = [];

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = state.find(a => a.id === action.payload.id);
      if (anecdote) anecdote.votes = anecdote.votes + 1;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})



export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteReducer.actions;
export default anecdoteReducer.reducer;