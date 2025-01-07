import axios from 'axios';

const API_BASE_URL =`${import.meta.env.API_BASE_URL}/ingredients/`

export const get_all_ingredients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/ingredients/list/')
      console.log(API_BASE_URL)
      return response.data;
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      return { error: error.message }
    }
}

export const get_ingredients_by_id = async (ingredient_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${ingredient_id}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        return { error: error.message };
      }
}


export const get_all_name_ingredients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list_name_ingredient/`);
      return response.data
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      return { error: error.message }
    }
}

export const get_name_by_id = async(ingredient_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ingredient_name/${ingredient_id}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        return { error: error.message };
      }
}

export const post_ingredient = async(ingredient)=> {
    try {  
        const response = await axios.put(`${API_BASE_URL}/add_ingredient/`, ingredient);
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return { error: error.message };
    }
}

export const put_ingredient = async()=> {
    try {  
        const response = await axios.put(`${API_BASE_URL}/put_ingredient/`, ingredient);
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return { error: error.message };
    }
}

export const delete_ingredient = async(ingredient_id)=> {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete_ingredient/${ingredient_id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return { error: error.message };
    }
}