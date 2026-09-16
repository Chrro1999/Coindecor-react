import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Categorias({ categoriaSeleccionada, setCategoriaSeleccionada }) {
  const [categorias, setCategorias] = useState([]);
  const carruselRef = useRef(null);
  const [mostrarFlechaIzquierda, setMostrarFlechaIzquierda] = useState(false);
  const [mostrarFlechaDerecha, setMostrarFlechaDerecha] = useState(true);

  // Carga original desde tu API con variable de entorno
  useEffect(() => {
    const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
    axios.get(`${urlBase}/api/categorias/`)
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);

  // Controla la visibilidad de las flechas según la posición del scroll
  const verificarScroll = () => {
    if (carruselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carruselRef.current;
      setMostrarFlechaIzquierda(scrollLeft > 5);
      setMostrarFlechaDerecha(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const contenedor = carruselRef.current;
    if (contenedor) {
      contenedor.addEventListener('scroll', verificarScroll);
      verificarScroll();
    }
    return () => {
      if (contenedor) contenedor.removeEventListener('scroll', verificarScroll);
    };
  }, [categorias]);

  // Desplazamiento suave para las flechas en PC
  const moverScroll = (direccion) => {
    if (carruselRef.current) {
      const desplazamiento = 240; 
      carruselRef.current.scrollBy({
        left: direccion === 'izquierda' ? -desplazamiento : desplazamiento,
        behavior: 'smooth'
      });
    }
  };

  // estilos originales limpios preservados
  const estiloBoton = (activo) =>
    `px-6 py-2 rounded-full text-sm tracking-wide border transition-all duration-300 whitespace-nowrap snap-start cursor-pointer
    ${
      activo
        ? 'bg-[#ff7f50] text-white border-[#ff7f50] shadow-md font-semibold scale-105'
        : 'bg-white text-gray-600 border-gray-200 hover:border-[#ff7f50] hover:text-[#ff7f50]'
    }`;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 mb-12 relative group">
      
      {/* FLECHA IZQUIERDA: Visible en PC si hay scroll hacia la izquierda */}
      {mostrarFlechaIzquierda && (
        <button
          onClick={() => moverScroll('izquierda')}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-black w-10 h-10 rounded-full items-center justify-center shadow-md border border-gray-100 z-10 transition-all cursor-pointer hover:scale-110 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* CONTENEDOR DESLIZABLE HORIZONTAL */}
      <div
        ref={carruselRef}
        className="w-full flex items-center gap-3 overflow-x-auto snap-x snap-mandatory px-4 py-2"
        style={{
          scrollbarWidth: 'none', /* Oculta barra en Firefox */
          msOverflowStyle: 'none', /* Oculta barra en Internet Explorer/Edge */
        }}
      >
        {/* CSS inyectado local para borrar la barra gris horizontal en Chrome/Safari y mantenerlo limpio */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* BOTÓN: TODOS */}
        <button
          onClick={() => setCategoriaSeleccionada(null)}
          className={estiloBoton(categoriaSeleccionada === null)}
        >
          Todos
        </button>

        {/* BOTONES: CATEGORÍAS DINÁMICAS */}
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            className={estiloBoton(categoriaSeleccionada === cat.id)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* FLECHA DERECHA: Visible en PC si quedan más categorías a la derecha */}
      {mostrarFlechaDerecha && (
        <button
          onClick={() => moverScroll('derecha')}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-black w-10 h-10 rounded-full items-center justify-center shadow-md border border-gray-100 z-10 transition-all cursor-pointer hover:scale-110 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

    </div>
  );
}