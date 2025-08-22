import api from "./api";

export const ProductAPI = {
  create: async (product) => {
    const response = await api.post("/product/create", product);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/product/list");
    return response.data;
  },
  update: async (id, product) => {
    const response = await api.put(`/product/update/${id}`, product);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/product/delete/${id}`);
    return response.data;
  },
};