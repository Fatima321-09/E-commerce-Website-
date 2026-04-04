import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}
    >
      <p
        className="text-white/10 mb-6"
        style={{ fontSize: "clamp(6rem, 20vw, 15rem)", fontWeight: 900, lineHeight: 1 }}
      >
        404
      </p>
      <h1
        className="text-white uppercase mb-4"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.01em" }}
      >
        PAGE NOT FOUND
      </h1>
      <p className="text-white/40 text-sm max-w-sm mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to the good stuff.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest"
        style={{ backgroundColor: "#e31837", fontWeight: 700 }}
      >
        BACK TO HOME <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
