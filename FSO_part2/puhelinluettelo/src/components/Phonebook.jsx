const Phonebook = ({persons, filter}) => {

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => {
                    if (person.name.toLowerCase().startsWith(filter.toLowerCase()))return(
                        <li key={person.name}>{person.name} {person.number}</li>)
                })}
      </ul>
        </div>
    )
}

export default Phonebook;