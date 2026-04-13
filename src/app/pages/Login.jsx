import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // After login, we want to send them to where they were going (Checkout)
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success
    localStorage.setItem("isAuth", "true");
    navigate(from, { replace: true });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-white/10 p-10 bg-[#0f0f0f]">
        <h2 className="text-2xl font-black text-white italic mb-8">
          ACCESS LOGIN
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            required
            type="email"
            placeholder="Enter you email"
            className="w-full bg-transparent border border-white/10 p-4 text-xs text-white outline-none focus:border-[#e31837]"
          />
          <input
            required
            type="password"
            placeholder="Enter Password"
            className="w-full bg-transparent border border-white/10 p-4 text-xs text-white outline-none focus:border-[#e31837]"
          />
          <button className="w-full bg-[#e31837] text-white py-4 font-black text-xs tracking-widest hover:bg-white hover:text-black transition-all">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
