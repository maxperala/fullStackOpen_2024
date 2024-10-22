import { createSlice } from "@reduxjs/toolkit";
import BlogService from "../services/blogService";
import { createNotification } from "./notificationReducer";

const blogReducer = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        addBlog(state, action) {
            state.push(action.payload);
        },
        deleteBlog(state, action) {
            const blogs = state.filter((item) => item.id !== action.payload);
            return blogs;
        },
    },
});

export const { setBlogs, addBlog, deleteBlog } = blogReducer.actions;

export const getAllBlogs = (bs) => {
    return async (dispatch) => {
        const blogs = await bs.getBlogs();
        dispatch(setBlogs(blogs));
    };
};

export const likeBlog = (bs, blog) => {
    return async (dispatch) => {
        const resp = await bs.likeBlog(blog);
        if (resp.error) {
            dispatch(createNotification(resp.error));
            return;
        }
        dispatch(
            createNotification(`Succesfully liked a blog by ${blog.author}`)
        );
        dispatch(getAllBlogs(bs));
    };
};

export const deleteBlogFromDB = (bs, blog) => {
    return async (dispatch) => {
        if (
            !window.confirm(
                `Remove ${blog.title} by ${blog.author ? blog.author : "Unknown Author"}`
            )
        )
            return;
        const resp = await bs.removeBlog(blog.id);
        if (resp.error) {
            dispatch(createNotification(resp.error));
            return;
        }
        dispatch(deleteBlog(blog.id));
        dispatch(createNotification("Blog removed"));
    };
};

export default blogReducer.reducer;
