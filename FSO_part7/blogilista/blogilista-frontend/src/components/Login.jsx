import { useState } from "react";
import loginService from "../services/loginService";
import userUtils from "../utils/userUtils";
import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

const Login = ({}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loginHandler = async (event) => {
        event.preventDefault();
        dispatch(loginUser(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <div data-testid="login-form">
            <h2 data-testid="login-heading">Login</h2>
            <form onSubmit={loginHandler}>
                username:{" "}
                <input
                    id="username-field"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                password:{" "}
                <input
                    id="password-field"
                    value={password}
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <button id="submit-button" type={"submit"}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
