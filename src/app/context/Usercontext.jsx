import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../../api/api"; // Import the Axios instance we configured withCredentials

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The "Handshake": On refresh, we ask the backend if a valid cookie exists
    const checkAuth = async () => {
      try {
        // Browser automatically sends the 'token' cookie here
        const { data } = await API.get("/users/profile");
        setUser(data);
        setIsAuth(true);
      } catch (err) {
        // If the cookie is expired, missing, or invalid (401/404)
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuth(true);
    // No localStorage.setItem here! The cookie is already set by the server.
  };

  const logout = async () => {
    try {
      // Tell the server to clear the cookie
      await API.post("/users/logout");
    } catch (err) {
      console.error("Logout handshake failed", err);
    } finally {
      // Always clear local state regardless of server response
      setUser(null);
      setIsAuth(false);
      window.location.href = "/login";
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isAuth, setUser, setIsAuth, loading, login, logout }}
    >
      {/* 
          We only render the app once the checkAuth is finished. 
          This prevents the "flash" of the login page for logged-in users.
      */}
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
