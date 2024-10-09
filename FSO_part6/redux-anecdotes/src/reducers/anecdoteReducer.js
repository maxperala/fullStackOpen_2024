const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {

  switch (action.type) {
    case "UPDATE_ANECDOTE": {
      const toBeUpdated = state.find(n => n.id === action.payload.id);
      const newAnec = {...toBeUpdated, votes: toBeUpdated.votes + 1};
      return state.map((n) => n.id != newAnec.id ? n : newAnec);
    }
    case "CREATE_ANECDOTE": {
      return state.concat([action.payload]);
    }
    default:
      return state;

  }

}

export const createVote = (anecdote) => {
  return {
    type: "UPDATE_ANECDOTE",
    payload: anecdote
  };
}

export const createAnecdote = (text) => {
  return {
    type: "CREATE_ANECDOTE",
    payload: asObject(text)
  }
}

export default anecdoteReducer;