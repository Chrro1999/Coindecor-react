import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Marca */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            COIN DECOR
          </h3>
          <p className="text-sm leading-relaxed">
            Especialistas en electrodomésticos modernos.
            Calidad, diseño y confianza para tu hogar.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-white font-medium mb-4">Navegación</h4>
          <div className="space-y-3 text-sm">
            <Link to="/" className="block hover:text-[#C6A75E]">Inicio</Link>
            <Link to="/catalogo" className="block hover:text-[#C6A75E]">Catálogo</Link>
            <Link to="/contacto" className="block hover:text-[#C6A75E]">Contacto</Link>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-white font-medium mb-4">Contacto</h4>
          <p className="text-sm">Quito, Ecuador</p>
          <p className="text-sm mt-2">+593 99 560 4549</p>
          <p className="text-sm mt-2">elcie70@gmail.com</p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-6 text-sm">
        © {new Date().getFullYear()} Coin Decor. Todos los derechos reservados.
      </div>
    </footer>
  );
}