import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext"; // Import global user context

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
  const { user, isAuth, logout } = useUser(); // Access global auth state and logout function
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

  // Determine path based on role-based access control (RBAC)
  const getUserPath = () => {
    if (!isAuth) return "/login";
    return user?.role === "admin" ? "/admin" : "/customer";
  };

  const isActive = (href) => {
    const path = location.pathname;
    if (href === "/") return path === "/";
    if (href === "/cart") return path === "/cart";

    // Shop-specific active states
    if (href === "/shop" && (path === "/shop" || path === "/shop/"))
      return true;
    if (href.startsWith("/shop/") && path.startsWith(href)) return true;

    // Highlighting user icon if on portal pages
    const userPath = getUserPath();
    if (href === userPath && path === userPath) return true;

    return path.startsWith(href);
  };

  return (
    <>
      {/* Announcement bar */}
      <div
        style={{ backgroundColor: "#e31837" }}
        className={`fixed top-0 left-0 right-0 z-[60] text-white text-center py-2 text-xs tracking-widest uppercase transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0 py-0 opacity-0" : "h-auto opacity-100"
        }`}
      >
        Free shipping on orders over $150 &nbsp;|&nbsp; New arrivals every week
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222] top-0"
            : "bg-transparent top-[32px]"
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
              </div>
            ))}
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Smart User Icon Link */}
            <div className="relative group/user">
              <Link
                to={getUserPath()}
                className={`transition-colors flex items-center gap-2 ${
                  isActive(getUserPath())
                    ? "text-[#e31837]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Optional: Show Logout on Hover if Auth */}
              {isAuth && (
                <div className="absolute top-full right-0 mt-2 hidden group-hover/user:block bg-[#111] border border-[#222] p-2 min-w-[120px]">
                  <button
                    onClick={logout}
                    className="text-[10px] text-zinc-400 hover:text-red-600 tracking-tighter font-bold uppercase w-full text-left"
                  >
                    Terminate Session
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className={`transition-colors relative ${
                isActive("/cart")
                  ? "text-[#e31837]"
                  : "text-white/70 hover:text-white"
              }`}
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

            {/* Mobile Toggle */}
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
      </header>
    </>
  );
}
