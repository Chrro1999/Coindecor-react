import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-[#C6A75E]"
        : "text-gray-700 hover:text-[#C6A75E]"
    }`;

  return (
    <header
      className={`
        fixed w-full top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-lg bg-white/70 shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          COIN DECOR
        </Link>

        <nav className="flex gap-10">
          <Link to="/" className={linkStyle("/")}>Inicio</Link>
          <Link to="/catalogo" className={linkStyle("/catalogo")}>Catálogo</Link>
          <Link to="/contacto" className={linkStyle("/contacto")}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
}