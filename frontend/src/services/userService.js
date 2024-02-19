import http from "./httpService";
import * as config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl;

export function register(Student) {
  return http.post(apiEndpoint, {
    username: Student.username,
    password: Student.password,
    lastname: Student.lastname,
    firstname: Student.firstname,
  });

}

export function signup(data){
  console.log(data);
  return http.post(`${apiEndpoint}signup`,data);
}

