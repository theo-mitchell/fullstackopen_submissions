import axios from "axios";
import personsService from "../services/persons";

const PersonDisplay = ({ person, onPersonDelete }) => {
  if (person) {
    return (
      <li key={person.id}>
        {person.name} {person.number}
        <button key={person.id+"btn"} onClick={() => onPersonDelete(person.id)}>delete</button>
      </li>
    );
  }
};

export default PersonDisplay;
