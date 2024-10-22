import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification(state, action) {
            return null;
        },
    },
});

export const { setNotification, clearNotification } =
    notificationReducer.actions;

export const createNotification = (msg) => {
    return async (dispatch) => {
        dispatch(setNotification(msg));
        setTimeout(() => {
            dispatch(clearNotification());
        }, 3000);
    };
};

export default notificationReducer.reducer;
