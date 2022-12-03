import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonDisplay from "./components/PersonDisplay";
import personsService from "./services/persons";
import PersonNotification from "./components/PersonNotification";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [persons, setPersons] = useState([]);
  const [displayPersons, setDisplayPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const loadPersons = () => {
    personsService.getAll().then((res) => {
      setPersons(res);
      setDisplayPersons(res);
    });
  };
  useEffect(loadPersons, []);

  const clearForm = () => {
    setNewName("");
    setNewPhone("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      phone: newPhone,
      id: null,
    };

    const existingPersonMatch = persons.find((person) => {
      return person.name === newPerson.name;
    });

    if (existingPersonMatch) {
      if (existingPersonMatch.phone !== newPerson.phone) {
        if (
          window.confirm(
            `${newPerson.name} is already added, replace the old number with new one?`
          )
        ) {
          newPerson.id = existingPersonMatch.id;
          updatePersonData(newPerson, searchQuery);
        }
      } else {
        alert(`${newPerson.name} is already added to phonebook`);
      }
    } else if (newPerson.name === "") {
      alert(`name cannot be left blank`);
    } else {
      updatePersonData(newPerson, searchQuery);
    }

    clearForm();
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterDisplayPersons(persons, query);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const updatePersonData = (newPerson, query) => {
    personsService.saveOrUpdate(newPerson).then((response) => {
      let currentPersons;
      if (newPerson.id) {
        currentPersons = persons.filter((person) => person.id !== newPerson.id);
      } else {
        currentPersons = persons;
      }
      currentPersons = currentPersons.concat(response);

      setPersons(currentPersons);
      if (query) {
        filterDisplayPersons(currentPersons, query);
      } else {
        setDisplayPersons(currentPersons);
      }

      setNotificationMessage({
        displayText: `Added ${newPerson.name}`,
        isError: false,
      });

      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const filterDisplayPersons = (currentPersons, query) => {
    const filteredPersons = currentPersons.filter((person) => {
      return person.name.toLowerCase().includes(query);
    });

    setDisplayPersons(filteredPersons);
  };

  const handleDeletion = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    console.log('here is person to delete', personToDelete);

    if (window.confirm(`Do you want to delete ${personToDelete.name}`)) {
      personsService
        .deleteById(id)
        .then((res) => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          filterDisplayPersons(newPersons, searchQuery);
        })
        .catch((err) => {
          console.log('i am in catch')
          console.table(err)
          // TODO Remove deleted person from array
          setNotificationMessage({
            displayText: `${personToDelete.name} has already been deleted`,
            isError: true,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <br />
      {/* <div>
        debug: {newName} {newPhone}
      </div> */}
      <PersonNotification message={notificationMessage} />
      <Filter value={searchQuery} onChange={handleSearchQueryChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={handleNameChange}
        phone={newPhone}
        onPhoneChange={handlePhoneChange}
      />
      <br />
      <h3>Numbers</h3>
      <ul>
        {displayPersons.map((person) => {
          return (
            <PersonDisplay
              key={person.id}
              person={person}
              onPersonDelete={() => handleDeletion(person.id)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default App;
