import axios from "axios";

const baseURL = "/api"

const getAllNumbers = async () => {

    try {
        const response = await axios.get(`${baseURL}/persons`);
        if (response.status === 200) return response.data;
        return {};
    } catch (e) {
        console.log(e)
        return {error: "Failed to fetch numbers"}
    }
    
}

const addPhoneNumber = async (person) => {

    try {
        const response = await axios.post(`${baseURL}/persons`, person);
        if (response.status === 201) return {message: `Added ${response.data.name}`};
        if (response.status === 400) return {error: "Invalid phone number"};
        return {error: "Failed adding phone number."};
    } catch (e) {
        console.log(e);
        return {error: e.response?.data?.error || "Failed adding phone number."}
    }
    
    
}

const deletePhoneNumber = async (person) => {
    
    try {
        const response = await axios.delete(`${baseURL}/persons/${person.id}`);
        if (response.status === 200) return {message: `${response.data.name} deleted`};
        return {error: "Failed to delete entry."};
    } catch (e) {
        if (e.response && e.response.status === 404) return {error: `${person.name} is already removed.`};
        console.log(e)
        return {error: "Failed to delete entry."};
    }
    
}

const updatePhoneNumber = async (person) => {
    try {
        const response = await axios.put(`${baseURL}/persons/${person.id}`, person);
        return {message: `${response.data.name} updated`};
    } catch (e) {
    
        console.log(e);
        return ({error: "Failed to update phone-number"});
    }
    
}



export default {getAllNumbers, addPhoneNumber, deletePhoneNumber, updatePhoneNumber};