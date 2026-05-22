import { useState, useEffect } from "react";

// Importación de tus 11 fotos
import foto1 from "../assets/Image1.jpg";
import foto2 from "../assets/Image2.jpg";
import foto3 from "../assets/Image3.jpg";
import foto4 from "../assets/Image4.jpg";
import foto5 from "../assets/Image5.jpg";
import foto6 from "../assets/Image6.jpg";
import foto7 from "../assets/Image7.jpg";
import foto8 from "../assets/Image8.jpg";
import foto9 from "../assets/Image9.jpg";
import foto10 from "../assets/Image10.jpg";
import foto11 from "../assets/Image11.jpg";

const imagenesHero = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9, foto10, foto11];

// RECIBIMOS LA PROP AQUÍ ABAJO:
export default function Inicio({ onVerCatalogo }) { 
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenesHero.length);
    }, 7000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-[#F8F8F8]">

      {/* ================= HEADER LOGO ================= */}
      <div className="bg-[#0B0B0B] py-6 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-white text-5xl font-semibold">C</span>
          <div className="w-10 h-10 bg-[#C6A75E] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-black rounded-full border-4 border-[#C6A75E]"></div>
          </div>
          <span className="text-white text-5xl font-semibold tracking-wide">IN DECOR</span>
        </div>
        <p className="text-gray-300 tracking-[0.35em] font-light mt-2 text-lg">ELECTRODOMÉSTICOS</p>
      </div>

      {/* ================= HERO SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="relative h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl">

          {/* Slider de imágenes */}
          {imagenesHero.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Electrodomésticos Coindecor"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[5000ms] ease-linear
              ${i === indice ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
            />
          ))}

          {/* Overlay premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h2 className="text-5xl md:text-6xl font-semibold tracking-wide drop-shadow-lg">
                Tu hogar, renovado.
              </h2>
              <p className="text-xl md:text-2xl font-light mt-4 text-gray-200">
                Calidad y elegancia en cada rincón.
              </p>

              {/* BOTÓN CORREGIDO: */}
              <button 
                onClick={onVerCatalogo}
                className="mt-10 px-8 py-3 border border-[#C6A75E] text-[#C6A75E] rounded-full tracking-wide hover:bg-[#C6A75E] hover:text-black transition-all duration-300 cursor-pointer"
              >
                Ver catálogo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TEXTO INFERIOR ================= */}
      <div className="text-center mt-20 mb-24 px-4">
        <h3 className="text-4xl font-semibold text-gray-900">Bienvenidos a la nueva era de tu cocina</h3>
        <div className="w-24 h-[2px] bg-[#C6A75E] mx-auto mt-6"></div>
        <p className="text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed text-lg">
          En Coindecor seleccionamos electrodomésticos que combinan tecnología, diseño y funcionalidad.
        </p>
      </div>
    </div>
  );
}