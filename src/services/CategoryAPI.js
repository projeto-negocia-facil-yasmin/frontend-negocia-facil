import api from "./api";

export const CategoryAPI = {
  getAll: async () => {
    const response = await api.get("/categories/list");
    return response.data;
  },
};