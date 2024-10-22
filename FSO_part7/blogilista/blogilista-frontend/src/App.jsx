import { useState, useEffect } from "react";
import Login from "./components/Login";
import Notification from "./components/Notification";
import userUtils from "./utils/userUtils";
import Blogs from "./components/Blogs";
import LoggedIn from "./components/LoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { configExistingUser } from "./reducers/userReducer";

function App() {
    const user = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(configExistingUser());
    }, []);

    if (!user) {
        return (
            <div>
                <Notification />
                <Login />
            </div>
        );
    }
    return (
        <div>
            <Notification />
            <LoggedIn />
            <Blogs user={user} />
        </div>
    );
}

export default App;
