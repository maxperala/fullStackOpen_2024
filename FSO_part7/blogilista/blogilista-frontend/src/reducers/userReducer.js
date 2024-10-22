import { createSlice } from "@reduxjs/toolkit";
import BlogService from "../services/blogService";
import loginService from "../services/loginService";
import { createNotification } from "./notificationReducer";
import userUtils from "../utils/userUtils";

const initialState = {
    account: null,
};

const userReducer = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser(state, action) {
            state.account = action.payload.user;
        },
        removeUser(state, action) {
            state.account = null;
        },
    },
});

export const { setUser, removeUser } = userReducer.actions;

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const result = await loginService.login(username, password);
        if (result.error) {
            return dispatch(
                createNotification(`Failed to log in: ${result.error}`)
            );
        }
        dispatch(setUser({ user: result.user }));
        window.localStorage.setItem("user", JSON.stringify(result.user));
        dispatch(createNotification(`Logged in as ${result.user.username}`));
    };
};

export const configExistingUser = () => {
    return async (dispatch) => {
        const user = await userUtils.fetchUser();
        if (!user) return;
        await dispatch(setUser({ user }));
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        window.localStorage.removeItem("user");
        dispatch(removeUser());
        dispatch(createNotification("Logged out."));
    };
};

export default userReducer.reducer;
