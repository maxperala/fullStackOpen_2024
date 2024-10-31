import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN } from "../queries";

const Login = ({ show, setT, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginQue] = useMutation(LOGIN);

  const login = async (event) => {
    event.preventDefault();
    console.log("Logging in");
    try {
      const res = await loginQue({
        variables: {
          username,
          password,
        },
      });
      setT(res.data.login.value);
      setPage("books");
    } catch (e) {
      console.log(e);
    }
  };
  if (!show) return null;
  return (
    <div>
      <form onSubmit={login}>
        <label htmlFor="username">Username: </label>
        <input
          value={username}
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
