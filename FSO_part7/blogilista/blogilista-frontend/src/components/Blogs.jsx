import { useState, useEffect } from "react";
import BlogService from "../services/blogService";
import CreateNewDialog from "./CreateNew";
import Blog from "./Blog";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../reducers/blogReducer";

const Blogs = () => {
    const user = useSelector((state) => state.user.account);
    const bs = new BlogService(user);
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    useEffect(() => {
        dispatch(getAllBlogs(bs));
    }, []);

    return (
        <div>
            <CreateNewDialog bs={bs} />
            <h3>Blogs</h3>
            <ul>
                {blogs &&
                    [...blogs]
                        .sort((a, b) => b.likes - a.likes)
                        .map((blog, i) => {
                            return (
                                <li key={blog.id}>
                                    <Blog blog={blog} bs={bs} index={i} />
                                </li>
                            );
                        })}
            </ul>
        </div>
    );
};

Blogs.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Blogs;
