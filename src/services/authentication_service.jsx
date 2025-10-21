import axios from "axios";

const API_URL = "http://127.0.0.1:8000/users/";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}token/`, {
      username,
      password,
    });
    
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.detail || "Identifiants invalides";
    throw new Error(msg);
}
};

const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  
  const getAccessToken = () => localStorage.getItem("access");
  
  const isAuthenticated = () => !!getAccessToken();
  
  export default {
    login,
    logout,
    getAccessToken,
    isAuthenticated,
  };

  