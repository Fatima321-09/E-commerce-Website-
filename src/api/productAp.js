import axios from "axios";

// 1. Create the instance with the base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 2. The Interceptor: This is the "Key" that solves the 401 Unauthorized errors.
// It automatically injects the JWT into every outgoing request.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- Product Endpoints ---

// Public: Fetch all denim archive items
export const fetchProducts = () => API.get("/products");

// Admin Only: Send new denim data to MongoDB
// We no longer need to manually handle headers here thanks to the interceptor!
export const addProduct = (productData) => API.post("/products", productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// --- User/Auth Endpoints ---

// Profile Handshake: Used by UserContext to verify session on refresh
export const getProfile = () => API.get("/users/profile");
