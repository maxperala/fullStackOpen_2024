import axios from "axios";



class BlogService {
    constructor(token) {
        this.config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        this.baseURL = "http://localhost:3000/api/blogs";
    }

    async getBlogs() {
        try {
            const res = await axios.get(this.baseURL, this.config);
            return res.data;
        } catch (e) {
            console.log(e);
            return [];
        }
        
        
    }
    async createBlog(blog) {
        try {
            const res = await axios.post(this.baseURL, blog, this.config);
            return res.data;
        } catch (e) {
            console.log(e);
            return {
                error: "Creating the blog failed"
            }
        }
    }
    
}



export default BlogService;