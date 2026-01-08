import axios from "axios";

// Change this if backend runs on a different host/port
const API_BASE_URL = "http://127.0.0.1:8000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -----------------------------------
   TEXT / VOICE FLOW (NO AUDIO UPLOAD)
----------------------------------- */

/**
 * Send text input to backend (/voice)
 * This matches your FastAPI text-based voice route
 */
export const sendTextCommand = async (text) => {
  const response = await api.post("/voice", null, {
    params: { text },
  });
  return response.data;
};

/* -----------------------------------
   SANITY / TEST ENDPOINTS
----------------------------------- */

/**
 * Test DB connection
 */
export const testDB = async () => {
  const response = await api.post("/test/db");
  return response.data;
};

/**
 * Test Redis connection
 */
export const testRedis = async () => {
  const response = await api.post("/test/redis");
  return response.data;
};

/**
 * Test full DB + Redis workflow
 */
export const testFullFlow = async () => {
  const response = await api.post("/test/full");
  return response.data;
};

export default api;
