import { useState, useEffect } from 'react'
import AddNewForm from './components/AddNewForm';
import Filter from './components/Filter';
import Phonebook from './components/Phonebook';
import phonebookServices from './services/phonebookServices';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  
  
  const fetchNumbers = () => {
    phonebookServices.getAllNumbers().then((numbers) => {
      setPersons(numbers);
    })
  }

  useEffect(() => {
    fetchNumbers();
  }, [])

  const setName = (event) => {
    setNewName(event.target.value)
  }
  const setNumber = (event) => {
    setNewNumber(event.target.value)
    
  }
  const updateFilter = (event) => {
    setFilter(event.target.value)
    console.log(filter)
  }

  const clearFields = () => {
    setNewName("");
    setNewNumber("");
  }

  const deleteUser = (event) => {
    console.log(event.target.id);
    const id = Number(event.target.id);
    const user = persons.filter((p) => Number(p.id) === id)[0];

    if (!window.confirm(`Delete ${user.name}?`)) return;
    phonebookServices.deletePhoneNumber(user).then((data) => {
      console.log(data);
      fetchNumbers();
    })
    



  }

  const updateUser = (user) => {
    phonebookServices.updatePhoneNumber(user).then((resp) => {
      console.log(resp)
      fetchNumbers();
    })
  }

  const addUser = (event) => {
    event.preventDefault();
    if (newName === "") return;
    if (newNumber === "") return;

    const userList = persons.filter((p) => p.name === newName);

    if (userList.length != 0) {
      if (newNumber === userList[0].number) {
        alert(`${newName} is already added to the phonebook`);
        clearFields();
        return;
      }
      if (!window.confirm(`${userList[0].name} is already in the phonebook, update number?`)) return;
      updateUser({...userList[0], number: newNumber});
      clearFields();
      return;

      
    }

    if (persons.length === 0) {
      const newPersons = persons.concat({name: newName, number: newNumber, id: "1"});
      setPersons(newPersons);
      phonebookServices.addPhoneNumber({name: newName, number: newNumber, id: "1"});
      clearFields
      return;
    }

    const newPersons = persons.concat({name: newName, number: newNumber, id: `${(Number(persons[persons.length - 1].id) + 1)}`});
    setPersons(newPersons);
    phonebookServices.addPhoneNumber({name: newName, number: newNumber, id: `${newPersons[newPersons.length - 1].id}`});
    clearFields();
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />
      <AddNewForm addUser={addUser} setName={setName} setNumber={setNumber} newName={newName} newNumber={newNumber} />
      <Phonebook persons={persons} filter={filter} onDelete={deleteUser} />
      
    </div>
  )

}



export default App