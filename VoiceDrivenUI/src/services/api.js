import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://127.0.0.1:8080";

// Axios instance (JSON by default)
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

/* -----------------------------------
   TEXT COMMAND FLOW
----------------------------------- */

/**
 * Send text command to backend
 * Endpoint: POST /text/process?text=...
 */
export const sendTextCommand = async (text) => {
  const response = await api.post("/text/process", null, {
    params: { text },
  });
  return response.data;
};

/* -----------------------------------
   VOICE COMMAND FLOW
----------------------------------- */

/**
 * Send recorded audio to backend
 * Endpoint: POST /voice/upload
 * Payload: multipart/form-data
 */
export const sendAudioCommand = async (audioBlob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "voice.webm");

  const response = await axios.post(
    `${API_BASE_URL}/voice/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    }
  );

  return response.data;
};

/* -----------------------------------
   TEST / HEALTH ENDPOINTS
----------------------------------- */

export const testDB = async () => {
  const response = await api.get("/test/db");
  return response.data;
};

export const testRedis = async () => {
  const response = await api.get("/test/redis");
  return response.data;
};

export const testFullFlow = async () => {
  const response = await api.get("/test/full");
  return response.data;
};

export default api;
