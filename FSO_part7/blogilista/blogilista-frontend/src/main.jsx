import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer.js";
import userReducer from "./reducers/userReducer.js";
import blogReducer from "./reducers/blogReducer.js";
const store = configureStore({
    reducer: {
        notification: notificationReducer,
        user: userReducer,
        blogs: blogReducer,
    },
});

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
