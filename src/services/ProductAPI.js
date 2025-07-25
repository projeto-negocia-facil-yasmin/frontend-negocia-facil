import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export const ProductAPI = {
  create: async (product) => {
    const response = await api.post("/product/create", product);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/product/list");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/product/get/${id}`);
    return response.data;
  },

  update: async (id, updatedProduct) => {
    const response = await api.put(`/product/update/${id}`, updatedProduct);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/product/delete/${id}`);
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