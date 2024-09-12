import axios from 'axios';

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const getAll = async () => {

    try {
        const response = await axios.get(`${baseURL}/all`);
        return response.data;
    } catch (e) {
        console.log(e);
        return ({error: e})
    }


}

export {getAll};