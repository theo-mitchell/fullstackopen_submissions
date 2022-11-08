import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonDisplay from "./components/PersonDisplay";
import axios from 'axios'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [persons, setPersons] = useState([]);

  const loadPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        setPersons(res.data);
        setDisplayPersons(res.data);
      });
  }

  useEffect(loadPersons, []);

  const [displayPersons, setDisplayPersons] = useState(persons);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const clearForm = () => {
    setNewName("");
    setNewPhone("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    const existingNames = persons.map((person) => person.name);

    console.log("new person is dis", newPerson);

    if (existingNames.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
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
    updatePersonData(null, query);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const updatePersonData = (newPerson, query) => {
    const currentPersons = newPerson ? persons.concat(newPerson) : persons;
    setPersons(currentPersons);

    if (query) {
      setDisplayPersons(
        currentPersons.filter((person) =>
          person.name.toLowerCase().includes(query)
        )
      );
    } else {
      setDisplayPersons(currentPersons);
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <br/>
      {/* <div>
        debug: {newName} {newPhone}
      </div> */}
      <Filter value={searchQuery} onChange={handleSearchQueryChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={handleNameChange}
        phone={newPhone}
        onPhoneChange={handlePhoneChange}
      />
      <br/>
      <h3>Numbers</h3>
      <PersonDisplay persons={displayPersons} />
    </>
  );
};

export default App;
