import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ALL_AUTHORS, EDIT_NUMBER } from "../queries";



const SetBirth = ({authors}) => {

    const [author, setAuthor] = useState(authors[0].name);
    const [newNum, setNewNum] = useState("");
    const [editNumber] = useMutation(EDIT_NUMBER, {
        refetchQueries: [ALL_AUTHORS]
    });
    const onChange = (event) => {
        setAuthor(event.target.value);
    }

    const addNewNum = () => {
        if (newNum === "") return;
        editNumber({variables: {name: author, born: Number(newNum)}})
    }

    return (
        <div>
            <h3>Edit birth year</h3>
            <select onChange={onChange}>
                {authors.map((a, i) => {
                    return (
                        <option key={a.name} value={a.name}>{a.name}</option>
                    )
                })}
            </select>
            <div>
                new birth year:
                <br/>
                <input id="new-born-field" onChange={(event) => setNewNum(event.target.value)}></input>
                <button onClick={addNewNum}>Edit</button>
            </div>

        </div>
    )
}

export default SetBirth;