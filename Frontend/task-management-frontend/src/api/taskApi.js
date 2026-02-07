import axiosInstance from "./axios";

export const getTasks = async (params) => {
  return axiosInstance.get("/tasks", { params });
};

export const createTask = async (taskData) => {
  return axiosInstance.post("/tasks", taskData);
};

export const updateTask = async (taskId, taskData) => {
  return axiosInstance.put(`/tasks/${taskId}`, taskData);
};

export const updateTaskStatus = async (taskId, statusData) => {
  return axiosInstance.patch(`/tasks/${taskId}/status`, statusData);
};

export const deleteTask = async (taskId) => {
  return axiosInstance.delete(`/tasks/${taskId}`);
};