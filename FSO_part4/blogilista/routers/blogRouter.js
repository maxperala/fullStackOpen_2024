const blogRouter = require("express").Router();
const blogController = require("../controllers/blogController");

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await blogController.getAllBlogs();
        response.json(blogs);
    } catch (e) {
        next(e);
    }
  })
  
blogRouter.post('/', async (request, response, next) => {
    try {
        const blogBody = request.body;
        blogBody.user = request.user.id;
        const result = await blogController.addBlog(blogBody);
        response.status(201).json(result);
    } catch (e) {
        next(e);
    }
    
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const result = await blogController.deleteBlog(id);
        response.status(204).end();
    } catch (e) {
        next(e);
    }
})

blogRouter.put('/', async (request, response, next) => {
    try {
        const blogBody = request.body;
        const result = await blogController.updateBlog(blogBody);
        response.status(204).end();

    } catch (e) {
        next(e)
    }
})


module.exports = blogRouter;