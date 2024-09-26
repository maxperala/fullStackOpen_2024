import { useState } from 'react';
import loginService from "../services/loginService";
import userUtils from "../utils/userUtils";

const Login = ({setUser, showNotification}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginHandler = async (event) => {
        event.preventDefault();
        const result = await loginService.login(username, password);
        setUsername("");
        setPassword("");
        if (result.user) {
            userUtils.setNewUser(result.user, setUser);
            showNotification(`Logged in as ${result.user.username}`);
            return;
        }
        if (result.error) {
            showNotification(`Failed to log in: ${result.error}`);
            return;
        }
        showNotification("Something went wrong");
        
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                username: <input value={username} onChange={(event) => setUsername(event.target.value)}/>
                <br/>
                password: <input value={password} type="password" onChange={(event) => setPassword(event.target.value)}/>
                <br/>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    )
}

export default Login;