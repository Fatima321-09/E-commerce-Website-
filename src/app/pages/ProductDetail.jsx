import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, ChevronRight, Star, Ruler, RotateCcw, Shield, Truck, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  useEffect(() => {
    console.log("Product Page Mounted");

    return () => {
      console.log("Product Page Unmounted - Memory Cleared");
    };
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id) || products[0];
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const [selectedWaist, setSelectedWaist] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeGalleryImg, setActiveGalleryImg] = useState(0);

  const isJeans = product.waistSizes && product.waistSizes.length > 0;
  const waistSizes = product.waistSizes || [];
  const lengths = product.lengths || [];

  // Use product images (reuse with subtle variation for demo)
  const galleryImages = [
    product.image,
    products[(parseInt(product.id) + 1) % products.length]?.image || product.image,
    products[(parseInt(product.id) + 2) % products.length]?.image || product.image,
  ];

  const modelImage =
    products[(parseInt(product.id) + 3) % products.length]?.image || product.image;

  const specs = product.specs || {
    fabricWeight: "12 OZ",
    origin: "OKAYAMA, JP 🇯🇵",
    dyePractice: "DEEP INDIGO DIP",
    hardware: "CAST STEEL",
  };

  const isReadyToAdd = isJeans
    ? selectedWaist && selectedLength
    : selectedSize !== null;

  const handleAddToCart = () => {
    if (!isReadyToAdd) {
      // Alert the user so they know why it's not working
      alert("Please select your Size/Fit before adding to cart.");
      return;
    }

    const size = isJeans
      ? `${selectedWaist}/${selectedLength}`
      : product.sizes[selectedSize];

    // This calls your CartContext logic from the screenshot
    addToCart(product, size, qty);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="pt-36 pb-4 px-6 border-b border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-xs text-white/30 tracking-widest">
          <Link to="/" className="hover:text-white transition-colors">HOME</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-white transition-colors">SHOP</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/60">{product.name.toUpperCase()}</span>
        </div>
      </div>

      {/* ── MAIN PRODUCT SECTION ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16">

          {/* LEFT: Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "3/4", backgroundColor: "#111" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              {product.isNew && (
                <div
                  className="absolute top-5 left-5 text-white text-xs px-4 py-1.5 tracking-widest"
                  style={{ backgroundColor: "#e31837", fontWeight: 700 }}
                >
                  NEW
                </div>
              )}
              {product.isSale && discount && (
                <div
                  className="absolute top-5 left-5 text-white text-xs px-4 py-1.5 tracking-widest"
                  style={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #444",
                    fontWeight: 700,
                  }}
                >
                  -{discount}% OFF
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#e31837" }} />
              <p
                className="text-xs tracking-[0.35em] uppercase"
                style={{ color: "#e31837", fontWeight: 700 }}
              >
                CRAFTED BY MACHINE
              </p>
            </div>

            {/* Product Name */}
            <h1
              className="text-white uppercase mb-5"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                lineHeight: 0.95,
              }}
            >
              {product.name.toUpperCase()}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    fill={i < Math.round(product.rating) ? "#e31837" : "none"}
                    stroke={i < Math.round(product.rating) ? "#e31837" : "#555"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-white/40 text-xs">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-[#1a1a1a] pt-8">
              {/* Color selection */}
              <div className="mb-7">
                <p className="text-white/60 text-xs tracking-widest uppercase mb-3" style={{ fontWeight: 700 }}>
                  COLOR
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className="w-8 h-8 rounded-full transition-all"
                      style={{
                        backgroundColor: color,
                        boxShadow: selectedColor === i ? "0 0 0 2px #fff, 0 0 0 4px #e31837" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Waist / Size selection */}
              {isJeans ? (
                <>
                  {/* Waist */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white/60 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                        FIT ENTHUSIASTS — WAIST
                      </p>
                      <button className="flex items-center gap-1 text-white/30 text-xs hover:text-white transition-colors">
                        <Ruler className="w-3 h-3" />
                        SIZE GUIDE
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {waistSizes.map((w) => (
                        <button
                          key={w}
                          onClick={() => setSelectedWaist(w)}
                          className="min-w-[52px] h-11 px-3 text-xs tracking-widest border transition-all"
                          style={{
                            backgroundColor: selectedWaist === w ? "#ffffff" : "transparent",
                            color: selectedWaist === w ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                            borderColor: selectedWaist === w ? "#ffffff" : "#333",
                            fontWeight: 700,
                          }}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Length */}
                  <div className="mb-8">
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-3" style={{ fontWeight: 700 }}>
                      SELECT WIDTH
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lengths.map((l) => (
                        <button
                          key={l}
                          onClick={() => setSelectedLength(l)}
                          className="min-w-[58px] h-11 px-4 text-xs tracking-widest border transition-all"
                          style={{
                            backgroundColor: selectedLength === l ? "#ffffff" : "transparent",
                            color: selectedLength === l ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                            borderColor: selectedLength === l ? "#ffffff" : "#333",
                            fontWeight: 700,
                          }}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                    {(!selectedWaist || !selectedLength) && (
                      <p className="text-white/25 text-xs mt-3 tracking-wide">
                        Please select waist and length
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/60 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                      SIZE
                    </p>
                    <button className="flex items-center gap-1 text-white/30 text-xs hover:text-white transition-colors">
                      <Ruler className="w-3 h-3" />
                      SIZE GUIDE
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, i) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(i)}
                        className="min-w-[52px] h-11 px-3 text-xs tracking-widest border transition-all"
                        style={{
                          backgroundColor: selectedSize === i ? "#ffffff" : "transparent",
                          color: selectedSize === i ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                          borderColor: selectedSize === i ? "#ffffff" : "#333",
                          fontWeight: 700,
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize === null && (
                    <p className="text-white/25 text-xs mt-3 tracking-wide">Please select a size</p>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <span
                  className="text-white"
                  style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em" }}
                >
                  ${product.price}.00
                </span>
                {product.originalPrice && (
                  <span className="text-white/25 line-through mb-1" style={{ fontSize: "1.1rem" }}>
                    ${product.originalPrice}
                  </span>
                )}
                {product.isSale && (
                  <span
                    className="text-xs tracking-widest mb-1.5"
                    style={{ color: "#e31837", fontWeight: 700 }}
                  >
                    SALE
                  </span>
                )}
              </div>

              {/* Qty + Add to Cart */}
              <div className="flex gap-3 mb-5">
                <div
                  className="flex items-center border border-[#333]"
                  style={{ backgroundColor: "#111" }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-14 text-white/60 hover:text-white transition-colors text-lg"
                  >
                    −
                  </button>
                  <span
                    className="w-10 text-center text-white text-sm"
                    style={{ fontWeight: 700 }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-14 text-white/60 hover:text-white transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 text-white text-xs tracking-widest h-14 transition-all"
                  style={{
                    backgroundColor: addedToCart
                      ? "#1a6b2e"
                      : isReadyToAdd
                      ? "#e31837"
                      : "#2a2a2a",
                    cursor: isReadyToAdd ? "pointer" : "not-allowed",
                    fontWeight: 700,
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedToCart ? "ADDED TO CART ✓" : "ADD TO CART"}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWished(!isWished)}
                  className="w-14 h-14 flex items-center justify-center border border-[#333] hover:border-white transition-colors"
                  style={{ backgroundColor: "#111" }}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isWished ? "#e31837" : "none"}
                    stroke={isWished ? "#e31837" : "rgba(255,255,255,0.6)"}
                  />
                </button>
              </div>

              {/* View Cart shortcut when added */}
              {addedToCart && (
                <motion.button
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => navigate("/cart")}
                  className="w-full py-3 text-xs tracking-widest text-white/60 hover:text-white transition-colors border border-[#333] hover:border-white mb-5"
                  style={{ fontWeight: 700 }}
                >
                  VIEW CART →
                </motion.button>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 py-5 border-t border-[#1a1a1a]">
                {[
                  { icon: Truck, text: "Free Shipping\nOver $150" },
                  { icon: RotateCcw, text: "Free Returns\n60 Days" },
                  { icon: Shield, text: "Lifetime\nRepair" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center text-center gap-2">
                    <Icon className="w-4 h-4 text-white/30" />
                    <p className="text-white/30 text-xs leading-relaxed whitespace-pre-line">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM SECTION: Gallery + Specs ── */}
        <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-16">

          {/* Left: Thumbnail gallery + large model image */}
          <div>
            {/* Thumbnail row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGalleryImg(i)}
                  className="relative overflow-hidden transition-all duration-200"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "#111",
                    outline: activeGalleryImg === i ? "2px solid #e31837" : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: activeGalleryImg === i ? "brightness(1)" : "brightness(0.65)" }}
                  />
                </button>
              ))}
            </div>

            {/* Large model image */}
            <div
              className="overflow-hidden"
              style={{ backgroundColor: "#111", aspectRatio: "4/3" }}
            >
              <img
                src={activeGalleryImg < galleryImages.length ? galleryImages[activeGalleryImg] : modelImage}
                alt="Model"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.85) contrast(1.05)" }}
              />
            </div>
          </div>

          {/* Right: Technical Specifications */}
          <div className="flex flex-col">
            <div className="pt-4">
              <div className="mb-8">
                <p className="text-white/30 text-xs tracking-[0.35em] uppercase mb-2" style={{ fontWeight: 600 }}>
                  Details
                </p>
                <h3
                  className="text-white uppercase"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 900, letterSpacing: "-0.01em" }}
                >
                  TECHNICAL SPECIFICATIONS
                </h3>
              </div>

              {/* Specs table */}
              <div className="space-y-0 border-t border-[#1a1a1a]">
                {[
                  { label: "FABRIC WEIGHT", value: specs.fabricWeight },
                  { label: "ORIGIN", value: specs.origin },
                  { label: "DYE PRACTICE", value: specs.dyePractice },
                  { label: "HARDWARE", value: specs.hardware },
                ].map((spec, i) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center py-5 border-b border-[#1a1a1a]"
                  >
                    <span className="text-white/40 text-xs tracking-widest" style={{ fontWeight: 600 }}>
                      {spec.label}
                    </span>
                    <span className="text-white text-xs tracking-widest" style={{ fontWeight: 700 }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Care guide */}
              <div className="mt-10 mb-10">
                <h4 className="text-white text-xs tracking-widest uppercase mb-5" style={{ fontWeight: 700 }}>
                  CARE INSTRUCTIONS
                </h4>
                <ul className="space-y-3">
                  {[
                    "Wash inside out in cold water",
                    "Use mild, dye-free detergent",
                    "Hang dry — never machine dry",
                    "Iron inside out on low heat",
                    "Do not dry clean",
                  ].map((instruction) => (
                    <li key={instruction} className="flex items-center gap-3 text-white/40 text-xs">
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: "#e31837" }}
                      />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fit note */}
              <div
                className="p-6"
                style={{ backgroundColor: "#111", borderLeft: "3px solid #e31837" }}
              >
                <p className="text-white/60 text-xs tracking-widest uppercase mb-2" style={{ fontWeight: 700 }}>
                  FIT NOTE
                </p>
                <p className="text-white/40 text-xs leading-relaxed">
                  This style fits true to size. Raw denim will shrink approximately 1–2 inches
                  in the waist after first wash. We recommend sizing up one for a relaxed break-in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        <div className="mt-24 pt-16 border-t border-[#1a1a1a]">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3" style={{ fontWeight: 600 }}>
                You May Also Like
              </p>
              <h2
                className="text-white uppercase"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                }}
              >
                RELATED STYLES
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-widest transition-colors"
              style={{ fontWeight: 700 }}
            >
              VIEW ALL <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
