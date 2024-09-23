const blogRouter = require("express").Router();
const blogController = require("../controllers/blogController");

blogRouter.get('/api/blogs', async (request, response, next) => {
    try {
        const blogs = await blogController.getAllBlogs();
        response.json(blogs);
    } catch (e) {
        next(e);
    }
  })
  
blogRouter.post('/api/blogs', async (request, response, next) => {
    try {
        const blogBody = request.body;
        const result = await blogController.addBlog(blogBody);
        response.status(201).json(result);
    } catch (e) {
        next(e);
    }
    


})


module.exports = blogRouter;