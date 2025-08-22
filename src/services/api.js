import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const data = error.response.data;

      if (typeof data === "string") {
        error.message = data;
      } else if (data.message) {
        error.message = data.message;
      } else {
        error.message = Object.values(data).join(" ");
      }
    } else {
      error.message = "Erro desconhecido";
    }

    return Promise.reject(error);
  }
);

export default api;