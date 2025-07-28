import api from "./api";

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
  update: async (id, data) => {
    const response = await api.put(`/advertisements/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/advertisements/${id}`);
    return response.data;
  },
};