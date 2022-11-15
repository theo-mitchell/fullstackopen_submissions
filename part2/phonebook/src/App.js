import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonDisplay from "./components/PersonDisplay";
import personsService from "./services/persons";
import * as uuid from "uuid";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [persons, setPersons] = useState([]);
  const [displayPersons, setDisplayPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const loadPersons = () => {
    personsService.getAll().then((res) => {
      console.log("Got persons back");
      console.table(res);
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
      number: newPhone,
      id: uuid.v5(),
    };
    const existingNames = persons.map((person) => person.name);

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
    filterDisplayPersons(query);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const updatePersonData = (newPerson, query) => {
    console.log('here is new person', newPerson)
    personsService.saveOrUpdate(newPerson).then((response) => {
      const currentPersons = newPerson ? persons.concat(response) : persons;

      setPersons(currentPersons);
      if (query) {
        filterDisplayPersons(currentPersons, query);
      } else {
        setDisplayPersons(currentPersons);
      }
    });
  };

  const filterDisplayPersons = (currentPersons, query) => {
    const filteredPersons = currentPersons.filter((person) => {
      return person.name.toLowerCase().includes(query);
    });

    setDisplayPersons(filteredPersons);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <br />
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
      <br />
      <h3>Numbers</h3>
      <PersonDisplay persons={displayPersons} />
    </>
  );
};

export default App;
