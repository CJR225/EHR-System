import {jwtDecode} from "jwt-decode"
import http from "./httpService";
import * as config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = apiUrl;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  console.log("made it here");
  const { data: jwt } = await http.post(apiEndpoint + "login", {
    username,
    password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  const respond = await http.get(apiEndpoint + "logout");
  console.log(respond);
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const exportedMethods = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default exportedMethods;
