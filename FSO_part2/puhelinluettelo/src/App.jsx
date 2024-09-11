import { useState } from 'react'
import AddNewForm from './components/AddNewForm';
import Filter from './components/Filter';
import Phonebook from './components/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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

  const addUser = (event) => {
    event.preventDefault();
    if (newName === "") return;
    if (newNumber === "") return;

    if (persons.filter((p) => p.name === newName).length != 0) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />
      <AddNewForm addUser={addUser} setName={setName} setNumber={setNumber} newName={newName} newNumber={newNumber} />
      <Phonebook persons={persons} filter={filter} />
      
    </div>
  )

}



export default App