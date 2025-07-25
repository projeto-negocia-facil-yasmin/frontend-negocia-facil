import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export const AdvertisementAPI = {
  create: async (advertisement) => {
    const response = await api.post("/advertisements/create", advertisement);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/advertisements/all");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/advertisements/${id}`);
    return response.data;
  },

  update: async (id, updatedAdvertisement) => {
    const response = await api.put(`/advertisements/${id}`, updatedAdvertisement);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/advertisements/${id}`);
    return response.data;
  },
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Erro desconhecido";

    if (error.response) {
      const data = error.response.data;

      if (typeof data === "string") {
        message = data;
      } else if (typeof data === "object" && data.message) {
        message = data.message;
      } else if (typeof data === "object") {
        message = Object.values(data).join(" ");
      }
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);
