import api from "./api";

export const RuleAPI = {
  create: async (rule) => {
    const response = await api.post("/rules", rule);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/rules");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/rules/${id}`);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/rules/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/rules/${id}`);
    return response.data;
  },
};