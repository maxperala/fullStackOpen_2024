import axios from "axios";

const baseURL = "http://localhost:3000/api/login";

const login = async (username, password) => {
    try {
        const resp = await axios.post(baseURL, { username, password });
        return { user: resp.data };
    } catch (e) {
        console.log(e);
        return { error: e.response.data.error };
    }
};

export default { login };
