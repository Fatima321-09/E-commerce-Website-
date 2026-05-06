import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid3X3,
  LayoutList,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { fetchProducts } from "../../api/productAp";

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Best Selling",
];
const genderFilters = ["All", "Men", "Women"];
const fitFilters = [
  "All Fits",
  "Slim",
  "Straight",
  "Relaxed",
  "Skinny",
  "Wide",
  "Regular",
  "Oversized",
];
const categoryFilters = ["All", "Jeans", "Jackets", "Tops", "Accessories"];
const priceRanges = ["Under $100", "$100–$150", "$150–$200", "$200+"];

export default function Shop() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedFit, setSelectedFit] = useState("All Fits");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  // ✅ MOVED: this useEffect is now before any return
  useEffect(() => {
    if (category === "men") {
      setSelectedGender("Men");
    } else if (category === "women") {
      setSelectedGender("Women");
    } else {
      setSelectedGender("All");
    }
  }, [category]);

  const handleGenderChange = (g) => {
    if (g === "Men") {
      navigate("/shop/men");
    } else if (g === "Women") {
      navigate("/shop/women");
    } else {
      if (category === "sale") {
        navigate("/shop/sale");
      } else {
        navigate("/shop/collections");
      }
    }
  };

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedGender !== "All") {
      result = result.filter(
        (p) =>
          String(p.gender || "").toLowerCase() ===
          String(selectedGender || "").toLowerCase(),
      );
    }
    if (selectedFit !== "All Fits") {
      result = result.filter(
        (p) =>
          String(p.fit || "").toLowerCase() ===
          String(selectedFit || "").toLowerCase(),
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) =>
          String(p.category || "").toLowerCase() ===
          String(selectedCategory || "").toLowerCase(),
      );
    }
    if (sort === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    if (sort === "Newest") result.sort((a) => (a.isNew ? -1 : 1));
    if (sort === "Best Selling") result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [selectedGender, selectedFit, selectedCategory, sort, products]);

  const activeFilterCount = [
    selectedGender !== "All" ? 1 : 0,
    selectedFit !== "All Fits" ? 1 : 0,
    selectedCategory !== "All" ? 1 : 0,
    selectedPrices.length,
  ].reduce((a, b) => a + b, 0);

  // ✅ loading check AFTER all hooks
  if (loading)
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        INITIALIZING CATALOG...
      </div>
    );

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        className="relative pt-28 pb-16 px-6 border-b border-[#1a1a1a]"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <p
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontWeight: 600 }}
          >
            Shop
          </p>
          <h1
            className="text-white uppercase"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            {categoryTitle}
          </h1>
          <p className="text-white/30 text-sm mt-4">
            {filtered.length} products
          </p>
        </div>
      </div>

      {/* Filters + Products */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-white text-xs tracking-widest border border-[#333] px-5 py-3 hover:border-white transition-colors"
              style={{ fontWeight: 700 }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              FILTER
              {activeFilterCount > 0 && (
                <span
                  className="text-white flex items-center justify-center rounded-full w-4 h-4"
                  style={{
                    backgroundColor: "#e31837",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="hidden md:flex items-center gap-0 border border-[#222]">
              {genderFilters.map((g) => (
                <button
                  key={g}
                  onClick={() => handleGenderChange(g)}
                  className="px-5 py-3 text-xs tracking-widest transition-all cursor-pointer"
                  style={{
                    backgroundColor:
                      selectedGender === g ? "#ffffff" : "transparent",
                    color:
                      selectedGender === g
                        ? "#0a0a0a"
                        : "rgba(255,255,255,0.5)",
                    fontWeight: 700,
                  }}
                >
                  {g.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "text-white" : "text-white/30"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "text-white" : "text-white/30"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-white text-xs tracking-widest border border-[#333] px-5 py-3 hover:border-white transition-colors min-w-[180px] justify-between"
                style={{ fontWeight: 700 }}
              >
                <span className="text-white/40">SORT:</span>{" "}
                {sort.toUpperCase()}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div
                  className="absolute top-full right-0 mt-1 z-20 min-w-full border border-[#222]"
                  style={{ backgroundColor: "#111" }}
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSort(opt);
                        setSortOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-xs tracking-widest hover:bg-[#1a1a1a] transition-colors"
                      style={{
                        color:
                          sort === opt ? "#ffffff" : "rgba(255,255,255,0.4)",
                        fontWeight: sort === opt ? 700 : 500,
                      }}
                    >
                      {opt.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar Filter Panel */}
          <AnimatePresence>
            {filterOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 overflow-hidden"
              >
                <div style={{ width: 260 }}>
                  <div className="flex items-center justify-between mb-8">
                    <h3
                      className="text-white text-xs tracking-widest"
                      style={{ fontWeight: 700 }}
                    >
                      FILTERS
                    </h3>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="text-white/40 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-8 pb-8 border-b border-[#1a1a1a]">
                    <h4
                      className="text-white/60 text-xs tracking-widest uppercase mb-4"
                      style={{ fontWeight: 600 }}
                    >
                      Fit
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {fitFilters.map((fit) => (
                        <button
                          key={fit}
                          onClick={() => setSelectedFit(fit)}
                          className="px-4 py-2 text-xs tracking-widest border transition-all"
                          style={{
                            backgroundColor:
                              selectedFit === fit ? "#ffffff" : "transparent",
                            color:
                              selectedFit === fit
                                ? "#0a0a0a"
                                : "rgba(255,255,255,0.4)",
                            borderColor:
                              selectedFit === fit ? "#ffffff" : "#333",
                            fontWeight: 700,
                          }}
                        >
                          {fit.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 pb-8 border-b border-[#1a1a1a]">
                    <h4
                      className="text-white/60 text-xs tracking-widest uppercase mb-4"
                      style={{ fontWeight: 600 }}
                    >
                      Category
                    </h4>
                    {categoryFilters.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex items-center justify-between w-full py-2 text-xs tracking-widest transition-colors"
                        style={{
                          color:
                            selectedCategory === cat
                              ? "#ffffff"
                              : "rgba(255,255,255,0.4)",
                          fontWeight: selectedCategory === cat ? 700 : 500,
                        }}
                      >
                        {cat.toUpperCase()}
                        {selectedCategory === cat && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: "#e31837" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mb-8">
                    <h4
                      className="text-white/60 text-xs tracking-widest uppercase mb-4"
                      style={{ fontWeight: 600 }}
                    >
                      Price Range
                    </h4>
                    {priceRanges.map((range) => (
                      <label
                        key={range}
                        className="flex items-center gap-3 py-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPrices.includes(range)}
                          onChange={() => {
                            setSelectedPrices((prev) =>
                              prev.includes(range)
                                ? prev.filter((r) => r !== range)
                                : [...prev, range],
                            );
                          }}
                          className="w-4 h-4 border-2 border-[#333] bg-transparent"
                          style={{ accentColor: "#e31837" }}
                        />
                        <span
                          className="text-xs tracking-widest"
                          style={{
                            color: selectedPrices.includes(range)
                              ? "#fff"
                              : "rgba(255,255,255,0.4)",
                            fontWeight: 600,
                          }}
                        >
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        handleGenderChange("All");
                        setSelectedFit("All Fits");
                        setSelectedCategory("All");
                        setSelectedPrices([]);
                      }}
                      className="w-full py-3 text-xs tracking-widest border border-[#333] text-white/40 hover:text-white hover:border-white transition-all cursor-pointer"
                      style={{ fontWeight: 700 }}
                    >
                      CLEAR ALL FILTERS
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-white/30 text-sm tracking-widest">
                  No products match your filters.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${viewMode === "grid" ? (filterOpen ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4") : "grid-cols-1"}`}
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    {viewMode === "grid" ? (
                      <ProductCard product={product} />
                    ) : (
                      <div
                        className="flex gap-6 p-6 border border-[#1a1a1a] hover:border-[#333] transition-colors"
                        style={{ backgroundColor: "#111" }}
                      >
                        <div
                          className="w-32 h-40 overflow-hidden shrink-0"
                          style={{ backgroundColor: "#0a0a0a" }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <p
                              className="text-white/30 text-xs tracking-widest uppercase mb-1"
                              style={{ fontWeight: 600 }}
                            >
                              {product.fit} FIT
                            </p>
                            <h3
                              className="text-white text-base mb-2"
                              style={{ fontWeight: 700 }}
                            >
                              {product.name}
                            </h3>
                            <p className="text-white/40 text-xs leading-relaxed max-w-md">
                              {product.description
                                ? `${product.description.slice(0, 120)}...`
                                : "Premium denim archive piece."}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-white"
                              style={{ fontWeight: 700 }}
                            >
                              ${product.price}
                            </span>
                            <a
                              href={`/product/${product._id}`}
                              className="text-white text-xs tracking-widest px-6 py-2 hover:bg-white/10 transition-colors border border-[#333]"
                              style={{ fontWeight: 700 }}
                            >
                              VIEW PRODUCT
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
