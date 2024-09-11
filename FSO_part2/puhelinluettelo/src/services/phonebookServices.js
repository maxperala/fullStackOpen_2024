import axios from "axios";

const baseURL = "http://localhost:3001"

const getAllNumbers = async () => {

    try {
        const response = await axios.get(`${baseURL}/persons`);
        if (response.status === 200) return response.data;
        return {};
    } catch (e) {
        console.log(e)
        return {}
    }
    
}

const addPhoneNumber = async (person) => {

    try {
        const response = await axios.post(`${baseURL}/persons`, person);
        if (response.status === 201) return response.data;
        return {error: "Failed adding phone number."};
    } catch (e) {
        return {error: e}
    }
    
    
}

const deletePhoneNumber = async (person) => {
    try {
        const response = await axios.delete(`${baseURL}/persons/${person.id}`);
        if (response.status === 200) return response.data;
        return {error: "Failed to delete entry."};
    } catch (e) {
        return {error: e}
    }
    
}

const updatePhoneNumber = async (person) => {
    try {
        const response = await axios.put(`${baseURL}/persons/${person.id}`, person);
        return response.data;
    } catch (e) {
        return ({error: e})
    }
    
}



export default {getAllNumbers, addPhoneNumber, deletePhoneNumber, updatePhoneNumber};