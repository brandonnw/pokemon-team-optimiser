import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export async function saveTeam(token, teamData) {
  const response = await axios.post(`${API_BASE_URL}/saved-teams`, teamData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function getSavedTeams(token) {
  const response = await axios.get(`${API_BASE_URL}/saved-teams`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export async function deleteSavedTeam(token, teamId) {
  const response = await axios.delete(`${API_BASE_URL}/saved-teams/${teamId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}