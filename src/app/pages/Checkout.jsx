import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, totalItems } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("ORDER RECEIVED. YOUR EXPORT BATCH IS BEING PREPARED.");
    navigate("/");
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-20 px-6 text-white font-sans uppercase tracking-widest">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* LEFT SIDE: SHIPPING & PAYMENT */}
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <h2 className="text-2xl font-black mb-8 italic">SHIPPING REGISTRY</h2>

          <div className="grid gap-4">
            <input
              required
              id="full-name"
              name="full-name"
              type="text"
              placeholder="FULL NAME"
              className="bg-transparent border border-white/10 p-4 text-xs focus:border-[#e31837] outline-none"
            />
            <input
              required
              id="address"
              name="address"
              type="text"
              placeholder="SHIPPING ADDRESS"
              className="bg-transparent border border-white/10 p-4 text-xs focus:border-[#e31837] outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                id="city"
                name="city"
                type="text"
                placeholder="CITY"
                className="bg-transparent border border-white/10 p-4 text-xs focus:border-[#e31837] outline-none"
              />
              <input
                required
                id="phone"
                name="phone"
                type="tel"
                placeholder="PHONE NUMBER"
                className="bg-transparent border border-white/10 p-4 text-xs focus:border-[#e31837] outline-none"
              />
            </div>
          </div>

          <h2 className="text-2xl font-black mt-12 mb-8 italic">
            PAYMENT PROTOCOL
          </h2>
          <div className="space-y-4">
            <div
              onClick={() => setMethod("cod")}
              className={`p-4 border cursor-pointer flex justify-between items-center ${method === "cod" ? "border-[#e31837] bg-[#e31837]/5" : "border-white/10"}`}
            >
              <span className="text-xs">CASH ON DELIVERY</span>
              {method === "cod" && <span className="text-[#e31837]">●</span>}
            </div>

            <div
              onClick={() => setMethod("card")}
              className={`p-4 border cursor-pointer flex justify-between items-center ${method === "card" ? "border-[#e31837] bg-[#e31837]/5" : "border-white/10"}`}
            >
              <span className="text-xs">CREDIT / DEBIT CARD</span>
              {method === "card" && <span className="text-[#e31837]">●</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e31837] text-white py-5 font-black text-sm hover:bg-white hover:text-black transition-colors mt-8"
          >
            CONFIRM EXPORT ORDER
          </button>
        </form>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="bg-[#111] p-8 border border-white/5 h-fit">
          <h2 className="text-xl font-black mb-8 opacity-50">
            ORDER SUMMARY ({totalItems})
          </h2>
          <div className="space-y-4 mb-8">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-[10px] border-b border-white/5 pb-4"
              >
                <span>
                  {item.product.name} x{item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between opacity-50">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between opacity-50">
              <span>SHIPPING</span>
              <span>${shipping === 0 ? "FREE" : shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-black pt-4 border-t border-white/10 text-[#e31837]">
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
