import axios from 'axios';
import authService from "./authentication_service";

// Base API : en prod => "/api", en dev => valeur de VITE_API_BASE ou "http://127.0.0.1:8000"
export const API_BASE_URL = (import.meta.env?.VITE_API_BASE || "/api").replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Interceptors sur *l’instance* api ---
api.interceptors.request.use((config) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || "";
    const isAuthUrl = url.includes("/users/token/") || url.includes("/users/register/");
    if (status === 401 && !isAuthUrl) {
      authService.logout();
      window.location.href = "/signin";
      return;
    }
    return Promise.reject(error);
  }
);


// ---- Endpoints helpers
const apiGet  = (path, config)        => api.get(path, config);
const apiPost = (path, data, config)   => api.post(path, data, config);

// --------- Endpoints ---------

// Obtenir une recette par ID
export const getRecipeById = async (recipeId) => {
  try {
    const { data } = await apiGet(`/recipes/${recipeId}/`);
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return { error: error.message };
  }
};

// Obtenir la liste des recettes
export const getRecipesList = async (number = 10) => {
  try {
    const { data } = await apiGet(`/recipes/list/?number=${number}`);
    return data;
  } catch (error) {
    console.error('Error fetching recipes list:', error);
    return { error: error.message };
  }
};

// Autocomplétion des recettes
export const getRecipesAutocomplete = async (query, number = 10) => {
  try {
    const { data } = await apiGet(`/get_recipes/autocomplete/?query=${encodeURIComponent(query)}&number=${number}`);
    return data;
  } catch (error) {
    console.error('Error fetching autocomplete recipes:', error);
    return { error: error.message };
  }
};

// Upload d'image
export const uploadImage = async (formData) => {
  try {
    const { data } = await apiPost(`/image_manager/upload/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’image :', error);
    return { error: error.message };
  }
};

export const getRecipesSuggestionList = async (ingredientList, number = 8) => {
  try {
    const names = (ingredientList || [])
      .map(it => (typeof it === 'string' ? it : it?.name))
      .filter(Boolean);

    const listParam = names.map(n => encodeURIComponent(n)).join(',');
    const url = `/recipes/recipesSuggestion/?list=${listParam}&number=${number}`;
    const { data } = await apiGet(url);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.error
      || (error?.response ? `HTTP ${error.response.status}` : error.message);
    console.error('Error fetching recipes suggestions:', msg);
    return { error: msg };
  }
};

export const viewRecipe = async (recipeTitle) => {
  const { data } = await apiPost(`/recommandations/view_recipe/`, { recipe_title: recipeTitle });
  return data;
};

