import http from "./httpService";
const apiUrl = "https://jsonplaceholder.typicode.com"; //"http://localhost:3000/"

const apiEndpoint = apiUrl + "/users";

function personUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPeople() {
  return http.get(apiEndpoint);
}

export function getPerson(personId) {
  return http.get(personUrl(personId));
}

export function savePerson(person) {
  if (person._id) {
    const body = { ...person };
    delete body._id;
    return http.put(personUrl(person._id), body);
  }

  return http.post(apiEndpoint, person);
}

export function deletePerson(personId) {
  return http.delete(personUrl(personId));
}
