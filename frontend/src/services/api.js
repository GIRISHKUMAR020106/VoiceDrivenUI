import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const sendVoiceText = async (text) => {
  const response = await axios.post(`${API_BASE}/voice`, null, {
    params: { text },
  });
  return response.data;
};
