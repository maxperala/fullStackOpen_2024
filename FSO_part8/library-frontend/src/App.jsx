import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";
import Favourties from "./components/Favourites";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
    }
  }, []);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("favorites")}>favorites</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {!token ? (
          <button onClick={() => setPage("login")}>log in</button>
        ) : null}
        {token ? <button onClick={logout}>log out</button> : null}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setT={setToken} setPage={setPage} />

      <Favourties show={page === "favorites"} />
    </div>
  );
};

export default App;
