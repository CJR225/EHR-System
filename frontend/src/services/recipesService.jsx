import http from "./httpService";
import { getJwt } from "./authService";
import * as config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipes() {
  http.setJwt(getJwt());
  return http.get(apiEndpoint);
}

export function getRecipe(recipeId) {
  http.setJwt(getJwt());
  return http.get(recipeUrl(recipeId));
}

export function saveRecipe(recipe) {
  http.setJwt(getJwt());
  if (recipe._id) {
    const body = { ...recipe };
    delete body._id;
    return http.put(recipeUrl(recipe._id), body);
  }

  return http.post(apiEndpoint, recipe);
}

export function deleteRecipe(recipeId) {
  http.setJwt(getJwt());
  return http.delete(recipeUrl(recipeId));
}
