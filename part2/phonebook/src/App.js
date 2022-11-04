import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

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
      <div>
        debug: {newName} {newPhone}
      </div>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:
          <input
            type="tel"
            value={newPhone}
            onChange={handlePhoneChange}
            placeholder="123-456-6789"
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {displayPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
