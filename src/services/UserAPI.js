import api from "./api";
import axios from "axios";

export const UserAPI = {
  register: async (user) => {
    const response = await api.post("/auth/register", user);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  authenticateSuap: async (credentials) => {
    const response = await axios.post("http://localhost:8080/suap/auth", credentials);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
};