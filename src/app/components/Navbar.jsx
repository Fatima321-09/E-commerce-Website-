import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLinks = [
  {
    label: "WOMEN",
    href: "/shop/women",
    sub: ["Jeans", "Jackets", "Tops", "Dresses", "Accessories"],
  },
  {
    label: "MEN",
    href: "/shop/men",
    sub: ["Jeans", "Jackets", "T-Shirts", "Shirts", "Accessories"],
  },
  {
    label: "COLLECTIONS",
    href: "/shop/collections",
    sub: ["New Arrivals", "Best Sellers", "Hub Essentials", "Collaborative"],
  },
  { label: "SALE", href: "/shop/sale", sub: [] },
  { label: "ABOUT", href: "/about", sub: [] },
  { label: "CONTACT", href: "/contact", sub: [] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
  }, [location]);

  const isActive = (href) => {
    const path = location.pathname;
    if (href === "/") return path === "/";
    if (href === "/cart") return path === "/cart";
    // For shop pages, check exact match for specific categories
    if (href === "/shop") {
      return path === "/shop" || path === "/shop/";
    }
    if (href === "/shop/collections") {
      return path.startsWith("/shop/collections");
    }
    if (href === "/shop/sale") {
      return path.startsWith("/shop/sale");
    }
    if (href === "/shop/men") {
      return path.startsWith("/shop/men");
    }
    if (href === "/shop/women") {
      return path.startsWith("/shop/women");
    }
    return path.startsWith(href);
  };

  return (
    <>
      {/* Announcement bar */}
      <div
        style={{ backgroundColor: "#e31837" }}
        className={`text-white text-center py-2 text-xs tracking-widest uppercase transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0 py-0" : "h-auto"
        }`}
      >
        Free shipping on orders over $150 &nbsp;|&nbsp; New arrivals every week
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222] top-0"
            : "bg-transparent top-[28px]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span
              className="text-white tracking-[0.2em] uppercase select-none"
              style={{ fontSize: "1.35rem", fontWeight: 900 }}
            >
              DENIM<span style={{ color: "#e31837" }}>.</span>HUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() =>
                  link.sub.length > 0 && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 transition-colors tracking-widest text-xs ${
                    isActive(link.href)
                      ? "text-[#e31837]"
                      : "text-white/80 hover:text-white"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {link.label}
                  {link.sub.length > 0 && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown */}
                {link.sub.length > 0 && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div
                      className="py-4 px-6 min-w-[180px] border border-[#222]"
                      style={{ backgroundColor: "#111111" }}
                    >
                      {link.sub.map((item) => (
                        <Link
                          key={item}
                          to={link.href}
                          className="block py-2 text-white/60 hover:text-white text-xs tracking-widest transition-colors"
                          style={{ fontWeight: 500 }}
                        >
                          {item.toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="text-white/70 hover:text-white transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 rounded-full text-white flex items-center justify-center"
                  style={{
                    backgroundColor: "#e31837",
                    width: "16px",
                    height: "16px",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="px-6 py-4">
            <div
              className="max-w-[600px] mx-auto flex items-center gap-3 px-5 py-3 rounded-lg border border-[#333]"
              style={{ backgroundColor: "rgba(10,10,10,0.95)" }}
            >
              <Search className="w-4 h-4 text-white/40 shrink-0" />
              <input
                type="text"
                aria-label="Search the archive"
                placeholder="Search for jeans, jackets, collections..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-white/30 text-sm tracking-wide outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-white/40 hover:text-white shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col px-6 transition-all duration-300 ${
            scrolled ? "pt-24" : "pt-32"
          }`}
          style={{ backgroundColor: "#0a0a0a" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`py-4 border-b border-[#1a1a1a] tracking-widest text-sm ${
                isActive(link.href) ? "text-[#e31837]" : "text-white"
              }`}
              style={{ fontWeight: 700 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/cart"
            className={`py-4 border-b border-[#1a1a1a] tracking-widest text-sm flex items-center gap-2 ${
              isActive("/cart") ? "text-[#e31837]" : "text-white"
            }`}
            style={{ fontWeight: 700 }}
          >
            CART
            {totalItems > 0 && (
              <span
                className="text-white flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#e31837",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </>
  );
}
