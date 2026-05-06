import axios from "axios";

// Create a centralized instance for the Denim Hub API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for all requests
  withCredentials: true, // MANDATORY for HTTP-Only Cookies to work
});

export default API;
