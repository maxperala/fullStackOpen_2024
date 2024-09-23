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

module.exports = {addBlog, getAllBlogs};