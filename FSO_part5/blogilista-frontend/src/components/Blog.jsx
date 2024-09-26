import { useState } from "react"

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const Blog = ({blog, bs, showNotification, updateBlogs}) => {

    const [visible, setVisible] = useState(false);
    const likeBlog = async () => {
        const resp = await bs.likeBlog(blog);
        if (resp.error) {
            showNotification(resp.error);
            return;
        }
        await updateBlogs();

    }

    const deleteBlog = async () => {
        if (!window.confirm(`Remove ${blog.title} by ${blog.author ? blog.author : "Unknown Author"}`)) return;
        const resp = await bs.removeBlog(blog.id);
        if (resp.error) {
            showNotification(resp.error);
            return;
        }
        await updateBlogs();
        showNotification("Blog removed");
    }

    if (visible) {
        return (
            <div style={blogStyle}>
                
                <p>{blog.title} by {blog.author ? blog.author : "Unknown Author" }</p>
                
                <p>{blog.url}</p>
                
                <div>
                    likes: {blog.likes} <button onClick={likeBlog}>like</button>
                </div>
                <p>Submitted by: {blog.user.name}</p>
                {bs.user.id === blog.user.id ? <button onClick={deleteBlog}>Delete</button> : null}
                <button onClick={() => setVisible(false)}>hide</button>
            </div>
        )
    }
    
    return (
        <div style={blogStyle}>
            <p>{blog.title} by {blog.author ? blog.author : "Unknown Author"}</p>
            <button onClick={() => setVisible(true)}>view</button>
        </div>
    )
}


export default Blog;