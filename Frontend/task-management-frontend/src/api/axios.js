import axios from "axios";
import { TOKEN_KEY, API_BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/auth/login") && !config.url.includes("/auth/register")) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;