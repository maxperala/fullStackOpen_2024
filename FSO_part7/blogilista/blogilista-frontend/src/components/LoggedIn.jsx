import userUtils from "../utils/userUtils";
import PropTypes from "prop-types";
import { createNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useSelector } from "react-redux";

const LoggedIn = () => {
    const user = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch(logoutUser());
    };
    return (
        <div>
            <p>Logged in as {user.name}</p>
            <button onClick={onLogOut}>Logout</button>
        </div>
    );
};

export default LoggedIn;
