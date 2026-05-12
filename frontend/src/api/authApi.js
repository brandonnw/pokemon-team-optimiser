import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export async function registerUser(formData) {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
  return response.data;
}

export async function loginUser(formData) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
  return response.data;
}