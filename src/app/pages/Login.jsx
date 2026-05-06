import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import API from "../../api/api"; // IMPORTANT: Use our custom instance, not raw axios

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Path matches your updated userRoutes.js
    const endpoint = isLogin ? "/users/login" : "/users/register";

    try {
      // API.post automatically handles the base URL and credentials (cookies)
      const { data } = await API.post(endpoint, formData);
      console.log("Response data:", data);
      // This updates your UserContext state
      login(data);

      // Role-Based Redirect
      if (from !== "/") {
        navigate(from);
      } else {
        // Directs to Admin Dashboard or Customer portal based on MongoDB role
        navigate(data.role === "admin" ? "/admin" : "/customer");
      }
    } catch (err) {
      // Specifically catch the 401/404 messages from your backend
      alert(err.response?.data?.message || "Authentication Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-zinc-800 p-10">
        <header className="mb-8 border-l-4 border-red-600 pl-4">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">
            {isLogin ? "LOGIN TO PORTAL" : "New Registry"}
          </h1>
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] mt-1">
            DENIM HUB SECURE AUTHENTICATION
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              required
              type="text"
              placeholder="FULL NAME"
              className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none focus:border-red-600 transition-colors"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}
          <input
            required
            type="email"
            placeholder="EMAIL ADDRESS"
            className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none focus:border-red-600 transition-colors"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            required
            type="password"
            placeholder="PASSWORD"
            className="w-full bg-black border border-zinc-800 p-4 text-xs outline-none focus:border-red-600 transition-colors"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="w-full bg-red-600 py-4 text-[10px] font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all">
            {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "" });
              }}
            className="text-zinc-500 text-[9px] tracking-widest uppercase hover:text-white transition-colors"
          >
            {isLogin
              ? "NEW CUSTOMER? Create account"
              : "Already verified? Access portal"}
          </button>
        </div>
      </div>
    </div>
  );
}
