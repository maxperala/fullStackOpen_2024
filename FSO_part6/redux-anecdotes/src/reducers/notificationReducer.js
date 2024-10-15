import { createSlice } from "@reduxjs/toolkit";




const notificationReducer = createSlice({
    name: "notification",
    initialState: {show: false, msg: ""},
    reducers: {
        setNotification(state, action) {
            state.msg = action.payload;
            state.show = true;            
        },
        hideNotification(state, action) {
            state.show = false;
            state.msg = "";
            
        }

    }
})



export default notificationReducer.reducer;
export const {setNotification, hideNotification} = notificationReducer.actions;

export const createNotification = (msg) => {
    return async dispatch => {
        dispatch(setNotification(msg));
        setTimeout(() => dispatch(hideNotification()), 5000);
    }
}
