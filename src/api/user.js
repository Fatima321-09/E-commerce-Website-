import API from "./api"; // Import the centralized instance we made

// Function to register a new user
export const register = async (userData) => {
  return await API.post("/users/register", userData);
};

// Function to log in
export const login = async (userData) => {
  return await API.post("/users/login", userData);
};

// Function to fetch the user profile (The Handshake)
export const getProfile = async () => {
  return await API.get("/users/profile");
};

// Function to fetch all users (For your Users.jsx page)
export const getAllUsers = async () => {
  return await API.get("/users");
};
