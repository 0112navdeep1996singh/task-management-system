import axiosInstance from "./axios";
import { API_BASE_URL } from "../utils/constants";

export const register = async (userData) => {
  const payload = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  };
  return axiosInstance.post(`${API_BASE_URL}/auth/register`, payload);
};

export const login = async (credentials) => {
  const payload = {
    email: credentials.email,  
    password: credentials.password,
  };
  return axiosInstance.post(`${API_BASE_URL}/auth/login`, payload);
};