import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth requests
export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await api.post('/auth/reset-password', { token, password });
  return response.data;
};

export const searchProfessors = async (filter: string, q: string) => {
  const response = await api.get(`/professors/search`, {
    params: { filter, q }
  });
  return response.data;
};

// Starred
export const getStarredProfessors = async () => {
  const response = await api.get('/users/starred');
  return response.data;
};

export const starProfessor = async (professorId: string) => {
  const response = await api.post(`/users/starred/${professorId}`);
  return response.data;
};

export const unstarProfessor = async (professorId: string) => {
  const response = await api.delete(`/users/starred/${professorId}`);
  return response.data;
};

export default api;
