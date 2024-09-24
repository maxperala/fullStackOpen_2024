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

blogRouter.delete('/api/blogs/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const result = await blogController.deleteBlog(id);
        response.status(204).end();
    } catch (e) {
        next(e);
    }
})

blogRouter.put('/api/blogs/', async (request, response, next) => {
    try {
        const blogBody = request.body;
        const result = await blogController.updateBlog(blogBody);
        response.status(204).end();

    } catch (e) {
        next(e)
    }
})


module.exports = blogRouter;