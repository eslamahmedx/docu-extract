import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 400000;

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
});