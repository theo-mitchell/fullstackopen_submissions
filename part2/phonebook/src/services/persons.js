import axios from "axios";
const dbUrl = "http://localhost:3000/persons";

const getAll = () => {
  return axios.get(dbUrl).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const saveOrUpdate = (person) => {
  return axios.post(`${dbUrl}/${person.id}`, person).then((response) => {
    console.log(response.data)
    return response.data;
  });
};

export default { getAll, saveOrUpdate };
