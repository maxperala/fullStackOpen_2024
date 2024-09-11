const AddNewForm = ({addUser, setName, newName, newNumber, setNumber}) => {


    return (
        <div>
            <h2>add a new</h2>
            <form onSubmit={addUser}>
                <div>
                    name: <input onChange={setName} value={newName}/>
                </div>
                <div>
                    number: <input onChange={setNumber} value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
        
            </form>
        </div>
    )
}


export default AddNewForm;