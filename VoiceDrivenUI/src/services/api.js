import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://127.0.0.1:8000";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/* -----------------------------------
   TEXT COMMAND FLOW (CURRENT)
----------------------------------- */

/**
 * Send text command to backend
 * Matches: POST /text/process
 */
export const sendTextCommand = async (text) => {
  const response = await api.post("/text/process", null, {
    params: { text },
  });
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
