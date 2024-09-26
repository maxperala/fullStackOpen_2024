import {useState, useEffect} from "react";
import BlogService from "../services/blogService";
import CreateNewDialog from "./CreateNew";
import Blog from "./Blog";

const Blogs = ({user, showNotification}) => {
    const bs = new BlogService(user);
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
                {blogs && blogs.sort((a, b) => b.likes - a.likes).map((blog) => {
                return (<li key={blog.id}><Blog blog={blog} bs={bs} showNotification={showNotification} updateBlogs={updateBlogs}/></li>)
                })}
            </ul>
            
        </div>
    )
    

    

}



export default Blogs;