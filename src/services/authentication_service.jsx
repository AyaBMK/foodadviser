import { api } from "./api";

const login = async (username, password) => {
  try {
    const { data } = await api.post(`/users/token/`, { username, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.detail || "Identifiants invalides";
    throw new Error(msg);
  }
};

const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

const getAccessToken   = () => localStorage.getItem("access");
const isAuthenticated  = () => !!getAccessToken();

export default { login, logout, getAccessToken, isAuthenticated };
