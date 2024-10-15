import axios from "axios";
const baseurl = "http://localhost:3001/anecdotes"

const getAllAnecdotes = async () => {
    const resp = await axios.get(baseurl);
    return resp.data;
}

const addAnecdote = async (anecdote) => {
    const resp = await axios.post(baseurl, anecdote);
    return resp.data;
}

const updateAnecdote = async (anecdote) => {
    const resp = await axios.put(`${baseurl}/${anecdote.id}`, anecdote);
    return resp.data;
}




export default {getAllAnecdotes, addAnecdote, updateAnecdote};