import { useState, useEffect } from "react";

// Importación de tus 11 fotos
import foto0 from "../assets/Image0.jpeg";
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

const imagenesHero = [
  foto0,
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6,
  foto7,
  foto8,
  foto9,
  foto10,
  foto11,
];

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

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl">

          {/* Slider */}
          {imagenesHero.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Electrodomésticos Coindecor"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[5000ms] ease-linear ${
                i === indice
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-100"
              }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end justify-center pb-16 md:pb-24">
            <div className="text-center text-white px-6">
              <h2 className="text-5xl md:text-6xl font-semibold tracking-wide drop-shadow-lg">
                TU HOGAR, RENOVADO
              </h2>

              <p className="text-xl md:text-2xl font-light mt-4 text-gray-200">
                Calidad y elegancia en cada rincón.
              </p>

              <button
                onClick={onVerCatalogo}
                className="mt-10 px-8 py-3 border border-[#C6A75E] text-[#C6A75E] rounded-full tracking-wide hover:bg-[#C6A75E] hover:text-black transition-all duration-300 cursor-pointer font-medium uppercase text-sm"
              >
                Ver catálogo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFORMATIVA */}
      <div className="text-center mt-20 mb-24 px-4">
        <h3 className="text-4xl font-semibold text-gray-900">
          Bienvenidos a la nueva era de tu cocina
        </h3>

        <div className="w-24 h-[2px] bg-[#ff7f50] mx-auto mt-6"></div>

        <p className="text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed text-lg">
          En Coindecor seleccionamos electrodomésticos que combinan
          tecnología, diseño y funcionalidad para transformar cada espacio
          de tu hogar.
        </p>
      </div>

    </div>
  );
}