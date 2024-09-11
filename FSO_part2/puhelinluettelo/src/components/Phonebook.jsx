const Phonebook = ({persons, filter, onDelete}) => {

    
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => {
                    if (person.name.toLowerCase().startsWith(filter.toLowerCase()))return(
                        <li key={person.id}> 
                            <p>{person.name} {person.number}</p>
                            <button onClick={onDelete} id={person.id}>Delete</button>
                        </li>)
                })}
      </ul>
        </div>
    )
}

export default Phonebook;