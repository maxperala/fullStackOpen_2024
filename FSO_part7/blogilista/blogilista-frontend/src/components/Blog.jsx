import { useState } from "react";
import PropTypes from "prop-types";
import BlogService from "../services/blogService";
import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
import {
    deleteBlogFromDB,
    getAllBlogs,
    likeBlog,
} from "../reducers/blogReducer";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
};

const Blog = ({ blog, bs, index }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const likeBlogClick = async () => {
        dispatch(likeBlog(bs, blog));
    };

    const deleteBlog = async () => {
        dispatch(deleteBlogFromDB(bs, blog));
    };

    if (visible) {
        return (
            <div style={blogStyle} id={`blog-div-${index}`}>
                <p>
                    {blog.title} by{" "}
                    {blog.author ? blog.author : "Unknown Author"}
                </p>

                <p>{blog.url}</p>

                <div id={`like-div-${index}`}>
                    likes: {blog.likes}{" "}
                    <button id={`likebtn-${index}`} onClick={likeBlogClick}>
                        like
                    </button>
                </div>
                <p>Submitted by: {blog.user.name}</p>
                {bs.user.id === blog.user.id ? (
                    <button onClick={deleteBlog} id={`delete-btn-${index}`}>
                        Delete
                    </button>
                ) : null}
                <button onClick={() => setVisible(false)}>hide</button>
            </div>
        );
    }

    return (
        <div style={blogStyle}>
            <p>
                {blog.title} by {blog.author ? blog.author : "Unknown Author"}
            </p>
            <button onClick={() => setVisible(true)} id={`show-btn-${index}`}>
                view
            </button>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    bs: PropTypes.instanceOf(BlogService).isRequired,
};

export default Blog;
