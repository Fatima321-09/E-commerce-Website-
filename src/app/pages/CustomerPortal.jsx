import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function CustomerPortal() {
  const { user, logout } = useUser();

  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    address: "",
    phone: "",
  });

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("denim-hub-profile", JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header with logout */}
        <header className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter italic">
              WELCOME BACK, {user?.name?.toUpperCase() || "CUSTOMER"}
            </h1>
            <p className="text-zinc-500 italic text-sm mt-1">
              Member since 2026
            </p>
            <p className="text-zinc-600 text-[10px] tracking-widest mt-1">
              {user?.email}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-[10px] font-black tracking-[0.3em] border border-zinc-800 px-6 py-3 hover:border-red-600 hover:text-red-600 transition-all mt-2"
          >
            LOGOUT 
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left p-3 text-xs font-black tracking-widest transition-all ${
                activeTab === "orders"
                  ? "bg-[#e31837] text-white"
                  : "border border-zinc-800 hover:border-zinc-600"
              }`}
            >
              ORDER HISTORY
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`w-full text-left p-3 text-xs font-black tracking-widest transition-all ${
                activeTab === "shipping"
                  ? "bg-[#e31837] text-white"
                  : "border border-zinc-800 hover:border-zinc-600"
              }`}
            >
              SHIPPING REGISTRY
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-left p-3 text-xs font-black tracking-widest transition-all ${
                activeTab === "account"
                  ? "bg-[#e31837] text-white"
                  : "border border-zinc-800 hover:border-zinc-600"
              }`}
            >
              ACCOUNT DETAILS
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {activeTab === "orders" && (
              <section>
                <h2 className="text-xs font-bold mb-6 uppercase tracking-[0.3em] text-zinc-500">
                  Recent Orders
                </h2>
                <div className="border border-zinc-800 p-6 bg-[#0f0f0f]">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        Order #DH-9912
                      </p>
                      <p className="font-bold text-sm">
                        Vintage Slim Fit - Size 32
                      </p>
                    </div>
                    <span className="bg-zinc-800 px-3 py-1 text-[10px] font-bold tracking-widest">
                      SHIPPED
                    </span>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "shipping" && (
              <section>
                <h2 className="text-xs font-bold mb-6 uppercase tracking-[0.3em] text-zinc-500">
                  Shipping Registry
                </h2>
                <div className="border border-zinc-800 p-8 bg-[#0f0f0f] space-y-6">
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-2 tracking-widest">
                      DEFAULT ADDRESS
                    </label>
                    {isEditing ? (
                      <textarea
                        className="w-full bg-black border border-red-600 p-4 text-sm outline-none"
                        value={profile.address}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                        rows="3"
                        placeholder="Enter your address..."
                      />
                    ) : (
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {profile.address || "No address saved yet."}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-2 tracking-widest">
                      PHONE NUMBER
                    </label>
                    {isEditing ? (
                      <input
                        className="w-full bg-black border border-red-600 p-4 text-sm outline-none"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        placeholder="+92 300 0000000"
                      />
                    ) : (
                      <p className="text-sm text-zinc-300">
                        {profile.phone || "No phone saved yet."}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        isEditing ? handleSave() : setIsEditing(true)
                      }
                      className="bg-white text-black px-6 py-2 text-[10px] font-black tracking-widest hover:bg-[#e31837] hover:text-white transition-all"
                    >
                      {isEditing ? "SAVE REGISTRY" : "EDIT ADDRESS"}
                    </button>
                    {isEditing && (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-[10px] font-black tracking-widest px-6 py-2 border border-zinc-700"
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "account" && (
              <section>
                <h2 className="text-xs font-bold mb-6 uppercase tracking-[0.3em] text-zinc-500">
                  Account Details
                </h2>
                <div className="border border-zinc-800 p-8 bg-[#0f0f0f] space-y-6">
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-2 tracking-widest">
                      FULL NAME
                    </label>
                    <p className="text-sm font-bold">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-2 tracking-widest">
                      EMAIL ADDRESS
                    </label>
                    <p className="text-sm font-bold">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-2 tracking-widest">
                      ACCOUNT TYPE
                    </label>
                    <p className="text-sm font-bold">
                      {user?.role?.toUpperCase()}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-800">
                    <button
                      onClick={logout}
                      className="text-[10px] font-black tracking-[0.3em] border border-zinc-800 px-6 py-3 hover:border-red-600 hover:text-red-600 transition-all"
                    >
                      LOGOUT
                    </button>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
