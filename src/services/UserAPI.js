import api from "./api";

export const UserAPI = {
  register: async (user) => {
    const response = await api.post("/auth/register", user);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/users/all");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/users/update/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/users/delete/${id}`);
    return response.data;
  },
};