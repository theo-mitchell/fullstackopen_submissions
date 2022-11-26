import axios from "axios";
import * as uuid from "uuid";

const dbUrl = "/api/persons";

const getAll = () => {
  return axios.get(dbUrl).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const saveOrUpdate = (person) => {

  if (person.id) {
    return axios.put(`${dbUrl}/${person.id}`, person).then((response) => {
      console.log("PUT");
      console.log(response.data);
      return response.data;
    });
  }

  return axios.post(`${dbUrl}`, {...person, id: uuid.v4}).then((response) => {
    console.log(response.data)
    return response.data;
  });
};

const deleteById = (id) => {
    return axios.delete(`${dbUrl}/${id}`).then((response) => {
        return response.data;
    });
}

export default { getAll, saveOrUpdate, deleteById };
