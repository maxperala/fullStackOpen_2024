import { useState, useEffect } from 'react'
import AddNewForm from './components/AddNewForm';
import Filter from './components/Filter';
import Phonebook from './components/Phonebook';
import phonebookServices from './services/phonebookServices';
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({message: "", isError: false, show: false});
  
  
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

  const showNotification = (payload) => {

    let newNotif = notification;
    newNotif.show = true;
    if (payload.error) {
      newNotif.isError = true;
      newNotif.message = payload.error;
    } else {
      newNotif.isError = false;
      newNotif.message = payload.message;
    }
    setNotification(newNotif);
    setTimeout(() => {
      setNotification({message: "", isError: false, show: false});
      
    }, 2000)
  }

  const deleteUser = async (event) => {
    
    const id = event.target.id;
    const user = persons.filter((p) => p.id === id)[0];
    

    if (!window.confirm(`Delete ${user.name}?`)) return;
    console.log("CALLING PHONEBOOK")
    const payload = await phonebookServices.deletePhoneNumber(user);
    console.log("payload", payload)
    showNotification(payload);
    fetchNumbers();
    clearFields();
      
    



  }

  const updateUser = async (user) => {
    const resp = await phonebookServices.updatePhoneNumber(user);
    return resp;
  }

  const addUser = (event) => {
    event.preventDefault();
    if (newName === "") return;
    if (newNumber === "") return;

    const userList = persons.filter((p) => p.name === newName);

    if (userList.length != 0) {
      if (newNumber === userList[0].number) {
        showNotification({error: "Already in the phonebook!"});
        clearFields();
        return;
      }
      if (!window.confirm(`${userList[0].name} is already in the phonebook, update number?`)) return;
      const response = updateUser({...userList[0], number: newNumber});

      response.then((payload) => {
        showNotification(payload);
        fetchNumbers();
      })
      clearFields();
      return;
      

      

      
    }

    if (persons.length === 0) {
      const newPersons = persons.concat({name: newName, number: newNumber, id: "1"});
      setPersons(newPersons);
      const response = phonebookServices.addPhoneNumber({name: newName, number: newNumber, id: "1"});
      response.then((payload) => {
        showNotification(payload);
        fetchNumbers();
      })
      clearFields();
      return;
    }

    const newPersons = persons.concat({name: newName, number: newNumber, id: `${(Number(persons[persons.length - 1].id) + 1)}`});
    setPersons(newPersons);
    const response = phonebookServices.addPhoneNumber({name: newName, number: newNumber, id: `${newPersons[newPersons.length - 1].id}`});
    response.then((payload) => {
      showNotification(payload);
      fetchNumbers();
    })
    clearFields();
  }

  return (
    <div>
      {notification.show ? <Notification message={notification.message} isError={notification.isError} /> : null}
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />
      <AddNewForm addUser={addUser} setName={setName} setNumber={setNumber} newName={newName} newNumber={newNumber} />
      <Phonebook persons={persons} filter={filter} onDelete={deleteUser} />
      
    </div>
  )

}



export default App