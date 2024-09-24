const Blog = require("../models/blog");
const User = require("../models/user");

const getAllBlogs = async () => {
    const blogs = await Blog.find({}).populate('user');
    return blogs;
}



const addBlog = async (content) => {
    const blog = new Blog(content);
    const result = await blog.save();
    const user = await User.findById(content.user);
    user.blogs = [...user.blogs, blog._id];
    
    await user.save();
    
    return result;
    
}

const deleteBlog = async (id) => {
    const result = await Blog.findByIdAndDelete(id);
    const user = await User.findById(result._id);
    user.blogs = user.blogs.filter((blogId) => blogId.toString() != id.toString());
    await user.save();
    return result;

}

const updateBlog = async (blog) => {
    const result = await Blog.findByIdAndUpdate(blog.id, blog, {new: true, runValidators: true});
    return result;
}

module.exports = {addBlog, getAllBlogs, deleteBlog, updateBlog};