// src/services/ingredient_service.jsx
import { api } from './api';

const ING = '/ingredients';

export const get_all_ingredients = async () => {
  try {
    const { data } = await api.get(`${ING}/list/`);
    return data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return { error: error.message };
  }
};

export const get_ingredients_by_id = async (ingredient_id) => {
  try {
    const { data } = await api.get(`${ING}/${ingredient_id}/`);
    return data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return { error: error.message };
  }
};

export const get_all_name_ingredients = async () => {
  try {
    const { data } = await api.get(`${ING}/list_name_ingredient/`);
    return data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return { error: error.message };
  }
};

export const get_name_by_id = async (ingredient_id) => {
  try {
    const { data } = await api.get(`${ING}/ingredient_name/${ingredient_id}/`);
    return data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return { error: error.message };
  }
};

export const post_ingredient = async (ingredient) => {
  try {
    const { data } = await api.post(`${ING}/add_ingredient/`, ingredient);
    return data;
  } catch (error) {
    console.error('Error posting ingredient:', error);
    return { error: error.message };
  }
};

export const put_ingredient = async (ingredient) => {
  try {
    const { data } = await api.put(`${ING}/put_ingredient/`, ingredient);
    return data;
  } catch (error) {
    console.error('Error putting ingredient:', error);
    return { error: error.message };
  }
};

export const delete_ingredient = async (ingredient_id) => {
  try {
    const { data } = await api.delete(`${ING}/delete_ingredient/${ingredient_id}/`);
    return data;
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    return { error: error.message };
  }
};
