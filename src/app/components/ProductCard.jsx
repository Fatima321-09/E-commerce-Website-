import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye } from "lucide-react";

export function ProductCard({ product }) {
  const [isWished, setIsWished] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden" style={{ backgroundColor: "#111" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isHovered ? "opacity-20" : "opacity-0"
            }`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span
                className="text-white text-xs px-3 py-1 tracking-widest"
                style={{ backgroundColor: "#e31837", fontWeight: 700 }}
              >
                NEW
              </span>
            )}
            {product.isSale && discount && (
              <span
                className="text-white text-xs px-3 py-1 tracking-widest"
                style={{ backgroundColor: "#0a0a0a", fontWeight: 700, border: "1px solid #333" }}
              >
                -{discount}%
              </span>
            )}
          </div>

          {/* Actions */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWished(!isWished);
              }}
              className="w-9 h-9 flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#111", border: "1px solid #333" }}
            >
              <Heart
                className="w-4 h-4"
                style={{ color: isWished ? "#e31837" : "#fff" }}
                fill={isWished ? "#e31837" : "none"}
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/product/${product.id}`);
              }}
              className="w-9 h-9 flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#111", border: "1px solid #333" }}
            >
              <Eye className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Quick Add */}
          <div
            className={`absolute bottom-0 left-0 right-0 py-4 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ backgroundColor: "rgba(10,10,10,0.9)" }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/product/${product.id}`);
              }}
              className="text-white text-xs tracking-widest hover:text-white/70 transition-colors"
              style={{ fontWeight: 700 }}
            >
              QUICK ADD
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p
              className="text-white/40 text-xs tracking-widest uppercase mb-1"
              style={{ fontWeight: 600 }}
            >
              {product.fit} FIT
            </p>
            <Link to={`/product/${product.id}`}>
              <h3
                className="text-white text-sm tracking-wide hover:text-white/70 transition-colors"
                style={{ fontWeight: 700 }}
              >
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right shrink-0">
            <p className="text-white text-sm" style={{ fontWeight: 700 }}>
              ${product.price}
            </p>
            {product.originalPrice && (
              <p className="text-white/30 text-xs line-through">${product.originalPrice}</p>
            )}
          </div>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-2 mt-3">
          {product.colors.map((color, i) => (
            <button
              key={i}
              className="w-4 h-4 rounded-full border border-white/20 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 12 12"
                className="w-2.5 h-2.5"
                fill={i < Math.round(product.rating) ? "#e31837" : "none"}
                stroke={i < Math.round(product.rating) ? "#e31837" : "#555"}
                strokeWidth="1"
              >
                <polygon points="6,0.5 7.9,4.3 12,4.9 9,7.8 9.7,12 6,10 2.3,12 3,7.8 0,4.9 4.1,4.3" />
              </svg>
            ))}
          </div>
          <span className="text-white/30 text-xs">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}
