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
    let message = "Erro desconhecido";

    if (error.response) {
      const data = error.response.data;
      if (typeof data === "string") {
        message = data;
      } else if (data.message) {
        message = data.message;
      } else {
        message = Object.values(data).join(" ");
      }
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export default api;