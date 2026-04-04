import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const footerLinks = {
  SHOP: ["New Arrivals", "Women's Jeans", "Men's Jeans", "Jackets", "Accessories", "Sale"],
  HELP: ["Size Guide", "Shipping & Returns", "FAQ", "Store Locator", "Contact Us"],
  BRAND: ["Our Story", "Sustainability", "Careers", "Press", "Partnerships"],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a]" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Newsletter */}
      <div className="border-b border-[#1a1a1a] py-16 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Stay connected</p>
            <h3
              className="text-white"
              style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "0.05em" }}
            >
              JOIN THE HUB COMMUNITY
            </h3>
          </div>
          <div className="flex w-full md:w-auto max-w-md gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#111] text-white placeholder-white/30 px-5 py-4 text-sm tracking-wide outline-none border border-[#333] border-r-0"
            />
            <button
              className="text-white px-8 py-4 text-xs tracking-widest"
              style={{ backgroundColor: "#e31837", fontWeight: 700 }}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <span
                className="text-white tracking-[0.2em] uppercase block mb-6"
                style={{ fontSize: "1.2rem", fontWeight: 900 }}
              >
                DENIM<span style={{ color: "#e31837" }}>.</span>HUB
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Born from the streets. Built for the bold. Premium denim crafted with
              uncompromising raw materials and relentless innovation.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p
                className="text-white text-xs tracking-widest uppercase mb-6"
                style={{ fontWeight: 700 }}
              >
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={link === "Contact Us" ? "/contact" : "#"}
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a1a1a] py-6 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wide">
            © 2026 DENIM HUB. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
              <a key={item} href="#" className="text-white/20 hover:text-white/60 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
