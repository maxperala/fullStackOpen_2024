import {useState, useEffect} from "react";
import BlogService from "../services/blogService";
import CreateNewDialog from "./CreateNew";

const Blogs = ({token, showNotification}) => {
    const bs = new BlogService(token);
    const [blogs, setBlogs] = useState(null);
    useEffect(() => {
        bs.getBlogs().then((blogs) => setBlogs(blogs))
    }, []);

    const updateBlogs = async () => {
        const blogs = await bs.getBlogs();
        setBlogs(blogs);
    }
    
    return (
        <div>
            <CreateNewDialog showNotification={showNotification} bs={bs} update={updateBlogs}/>
            <h3>Blogs</h3>
            <ul>
                {blogs && blogs.map((blog) => {
                return (<li key={blog.id}>{blog.title} {blog.author}</li>)
                })}
            </ul>
            
        </div>
    )
    

    

}



export default Blogs;