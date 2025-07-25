import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",  // URL relativa para usar o proxy do package.json
});

export default api;
