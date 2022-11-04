import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "123-456-6789" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const clearForm = () => {
    setNewName("");
    setNewPhone("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, phone: newPhone };
    const existingNames = persons.map((person) => person.name);

    if (existingNames.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else if (newPerson.name === '') {
      alert(`name cannot be left blank`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    clearForm();
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <div>debug: {newName} {newPhone}</div>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input 
            type='text' 
            value={newName} 
            onChange={handleNameChange} 
          />
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
        {persons.map((person) => (
          <li key={person.name}>{person.name} {person.phone}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
