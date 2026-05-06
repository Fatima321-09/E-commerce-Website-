import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";

const PROMO_CODES = {
  DENIM20: 20,
  HUB10: 10,
  NEWMEMBER15: 15,
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = totalPrice > 150 ? 0 : 9.99;
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo] / 100 : 0;
  const discount = totalPrice * discountRate;
  const tax = (totalPrice - discount) * 0.08;
  const finalTotal = totalPrice - discount + shipping + tax;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try DENIM20, HUB10, or NEWMEMBER15.");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (orderPlaced) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: "#1a6b2e" }}
          >
            <span className="text-white text-3xl">✓</span>
          </div>
          <h1
            className="text-white uppercase mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
            }}
          >
            ORDER CONFIRMED
          </h1>
          <p className="text-white/50 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
            Thank you for your order! We'll send you a confirmation email
            shortly. Your denim is being prepared with care.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest"
              style={{ backgroundColor: "#e31837", fontWeight: 700 }}
            >
              CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest border border-white/30 hover:border-white transition-all"
              style={{ fontWeight: 700 }}
            >
              HOME
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="pt-24 pb-12 px-6 border-b border-[#1a1a1a]"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-widest transition-colors mb-6"
            style={{ fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" />
            CONTINUE SHOPPING
          </button>
          <p
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontWeight: 600 }}
          >
            Your Order
          </p>
          <h1
            className="text-white uppercase"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            SHOPPING CART
          </h1>
          {cartItems.length > 0 && (
            <p className="text-white/30 text-sm mt-3">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item
              {cartItems.reduce((sum, item) => sum + item.quantity, 0) !== 1
                ? "s"
                : ""}{" "}
              in your cart
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <ShoppingBag className="w-16 h-16 text-white/10 mb-6" />
            <h2
              className="text-white uppercase mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}
            >
              YOUR CART IS EMPTY
            </h2>
            <p className="text-white/40 text-sm max-w-sm mb-10 leading-relaxed">
              Looks like you haven't added anything yet. Explore our collection
              and find your perfect pair.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest hover:gap-5 transition-all"
              style={{ backgroundColor: "#e31837", fontWeight: 700 }}
            >
              EXPLORE THE COLLECTION <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Cart Items */}
            <div>
              <div className="border-b border-[#1a1a1a] pb-4 mb-6 hidden md:grid grid-cols-[1fr_120px_120px_48px] gap-4">
                {["PRODUCT", "SIZE", "QUANTITY", ""].map((h) => (
                  <p
                    key={h}
                    className="text-white/30 text-xs tracking-widest"
                    style={{ fontWeight: 600 }}
                  >
                    {h}
                  </p>
                ))}
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.product._id || item.product.id}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-[1fr_120px_120px_48px] gap-4 items-center py-6 border-b border-[#1a1a1a]"
                  >
                    {/* Product info */}
                    <div className="flex gap-5 items-start">
                      <Link to={`/product/${item.product._id || item.product.id}`}>
                        <div
                          className="w-20 h-24 overflow-hidden shrink-0"
                          style={{ backgroundColor: "#111" }}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-white/40 text-xs tracking-widest uppercase mb-1"
                          style={{ fontWeight: 600 }}
                        >
                          {item.product.fit} FIT
                        </p>
                        <Link to={`/product/${item.product._id || item.product.id}`}>
                          <h3
                            className="text-white text-sm hover:text-white/70 transition-colors"
                            style={{ fontWeight: 700 }}
                          >
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-white/40 text-xs mt-1 md:hidden">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {item.product.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <p
                          className="text-white text-sm mt-2 md:hidden"
                          style={{ fontWeight: 700 }}
                        >
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Size */}
                    <div className="hidden md:block">
                      <span
                        className="text-white/60 text-xs tracking-widest border border-[#333] px-3 py-1.5"
                        style={{ fontWeight: 600 }}
                      >
                        {item.size}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center">
                      <div
                        className="flex items-center border border-[#333]"
                        style={{ backgroundColor: "#111" }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id || item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="w-9 h-9 text-white/50 hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span
                          className="w-8 text-center text-white text-xs"
                          style={{ fontWeight: 700 }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id || item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="w-9 h-9 text-white/50 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product._id || item.product.id, item.size)}
                      className="text-white/20 hover:text-white/80 transition-colors justify-self-end"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Item subtotals */}
              <div className="mt-4 hidden md:block">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product._id || item.product.id}-${item.size}-price`}
                    className="flex justify-between items-center py-2 text-xs text-white/30 tracking-wide"
                  >
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-white/60" style={{ fontWeight: 700 }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div
                className="p-8 border border-[#1a1a1a]"
                style={{ backgroundColor: "#0f0f0f" }}
              >
                <h3
                  className="text-white uppercase mb-8 pb-6 border-b border-[#1a1a1a]"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                  }}
                >
                  ORDER SUMMARY
                </h3>

                {/* Promo code */}
                <div className="mb-6">
                  <p
                    className="text-white/40 text-xs tracking-widest uppercase mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    PROMO CODE
                  </p>
                  <div className="flex gap-0">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      placeholder="Enter code..."
                      className="flex-1 bg-[#111] text-white placeholder-white/20 px-4 py-3 text-xs tracking-widest outline-none border border-[#333] border-r-0"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-3 text-white text-xs tracking-widest transition-colors border border-[#333]"
                      style={{
                        backgroundColor: appliedPromo ? "#1a6b2e" : "#1a1a1a",
                        fontWeight: 700,
                      }}
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                  {appliedPromo && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs mt-2 tracking-widest"
                      style={{ color: "#4ade80", fontWeight: 600 }}
                    >
                      ✓ {appliedPromo} applied — {PROMO_CODES[appliedPromo]}%
                      off
                    </motion.p>
                  )}
                  {promoError && (
                    <p
                      className="text-xs mt-2 tracking-widest"
                      style={{ color: "#e31837" }}
                    >
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b border-[#1a1a1a]">
                  <div className="flex justify-between text-xs tracking-widest">
                    <span className="text-white/40" style={{ fontWeight: 600 }}>
                      SUBTOTAL
                    </span>
                    <span className="text-white/80">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs tracking-widest">
                      <span style={{ color: "#4ade80", fontWeight: 600 }}>
                        DISCOUNT ({PROMO_CODES[appliedPromo]}%)
                      </span>
                      <span style={{ color: "#4ade80" }}>
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs tracking-widest">
                    <span className="text-white/40" style={{ fontWeight: 600 }}>
                      SHIPPING
                    </span>
                    <span className="text-white/80">
                      {shipping === 0 ? (
                        <span style={{ color: "#4ade80" }}>FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs tracking-widest">
                    <span className="text-white/40" style={{ fontWeight: 600 }}>
                      ESTIMATED TAX
                    </span>
                    <span className="text-white/80">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span
                    className="text-white text-sm tracking-widest"
                    style={{ fontWeight: 700 }}
                  >
                    TOTAL
                  </span>
                  <span
                    className="text-white"
                    style={{ fontSize: "1.5rem", fontWeight: 900 }}
                  >
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                {shipping > 0 && (
                  <div
                    className="mb-6 px-4 py-3 text-xs tracking-widest text-center"
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Add ${(150 - totalPrice).toFixed(2)} more for{" "}
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      FREE SHIPPING
                    </span>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 text-white py-5 text-xs tracking-widest transition-all hover:gap-5"
                  style={{ backgroundColor: "#e31837", fontWeight: 900 }}
                >
                  PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-6 flex items-center justify-center gap-4">
                  {["VISA", "MC", "AMEX", "PAYPAL"].map((method) => (
                    <span
                      key={method}
                      className="text-white/20 text-xs tracking-widest"
                      style={{ fontWeight: 600 }}
                    >
                      {method}
                    </span>
                  ))}
                </div>

                <p className="text-white/20 text-xs text-center mt-4 tracking-wide leading-relaxed">
                  Secure checkout. 256-bit SSL encryption.
                </p>
              </div>

              {/* Shipping info */}
              <div
                className="mt-4 p-5 border border-[#1a1a1a]"
                style={{ backgroundColor: "#0f0f0f" }}
              >
                <p
                  className="text-white/50 text-xs tracking-widest uppercase mb-3"
                  style={{ fontWeight: 700 }}
                >
                  SHIPPING INFO
                </p>
                <ul className="space-y-2">
                  {[
                    "Free standard shipping over $150",
                    "Express: 2-3 business days ($14.99)",
                    "Standard: 5-7 business days",
                    "Free 60-day returns",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-2 text-white/30 text-xs"
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: "#e31837" }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
