import { useReducer } from "react";


const notifReducer = (state = {
    msg: "",
    visible: false
}, action) => {
    if (action.type === "SET_NOTIFICATION") {
        return {
            msg: action.payload,
            visible: true
        }
    }
    if (action.type === "HIDE_NOTIFICATION") {
        return {
            msg: "",
            visible: false
        }
    }
}


export default notifReducer;