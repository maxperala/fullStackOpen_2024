import { useState } from "react";


const CreateNewDialog = ({showNotification, bs, update}) => {

    const [data, setData] = useState({
        title: "",
        author: "",
        url: ""
    });

    const createNew = async (event) => {
        event.preventDefault();
        if (data.title === "" || data.url === "") {
            setData({title: "", author: "", url: ""});
            return showNotification("You must provide atleast a title and a url");
        }
        const resp = await bs.createBlog(data);
        if (resp.error) {
            showNotification(resp.error);
            return;
        }
        update();
        showNotification(`Succesfully added a new blog by ${resp.author}`);
        setData({title: "", author: "", url: ""});

    }

    
    return (
        <div>
            <h3>Create a new blog:</h3>
            <form onSubmit={createNew}>
                title: <input value={data.title} onChange={(event) => setData({...data, title: event.target.value})} />
                <br/>
                author: <input value={data.author} onChange={(event) => setData({...data, author: event.target.value})}/>
                <br/>
                url: <input value={data.url} onChange={(event) => setData({...data, url: event.target.value})}/>
                <br/>
                <button type={"submit"}>Create</button>
            </form>
        </div>
    )
}


export default CreateNewDialog;