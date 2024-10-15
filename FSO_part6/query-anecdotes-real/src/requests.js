import axios from "axios";

const getAll = async () => {
    const res = await axios.get("http://localhost:3001/anecdotes");
    return res.data;
}

const addAnecdote = async (content) => {
    const res = await axios.post("http://localhost:3001/anecdotes", {content: content, votes: 0});
    return res.data;
}

const voteAnecdote = async (anec) => {
    const res = await axios.put(`http://localhost:3001/anecdotes/${anec.id}`, {...anec, votes: anec.votes + 1} );
    return res;
}


export {getAll, addAnecdote, voteAnecdote};



