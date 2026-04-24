import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export async function analyzeTeam(team) {
  const response = await axios.post(`${API_BASE_URL}/team/analyze`, {
    team,
    includeAiSummary: true
  });

  return response.data;
}