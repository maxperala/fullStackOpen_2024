const Blog = require("../models/blog");


const getAllBlogs = async () => {
    const blogs = await Blog.find({});
    return blogs;
}



const addBlog = async (content) => {
    
    const blog = new Blog(content);
    const result = await blog.save();
    return result;
    
}

const deleteBlog = async (id) => {
    const result = await Blog.findByIdAndDelete(id);
    return result;

}

const updateBlog = async (blog) => {
    const result = await Blog.findByIdAndUpdate(blog.id, blog, {new: true, runValidators: true});
    return result;
}

module.exports = {addBlog, getAllBlogs, deleteBlog, updateBlog};