import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categorias({ categoriaSeleccionada, setCategoriaSeleccionada }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // CORREGIDO: Usa la variable de entorno con un fallback seguro
    const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
    axios.get(`${urlBase}/api/categorias/`)
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);

  const estiloBoton = (activo) =>
    `px-6 py-2 rounded-full text-sm tracking-wide border transition-all duration-300
    ${
      activo
        ? 'bg-[#C6A75E] text-black border-[#C6A75E] shadow-md'
        : 'bg-white text-gray-600 border-gray-200 hover:border-[#C6A75E] hover:text-[#C6A75E]'
    }`;

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <button
        onClick={() => setCategoriaSeleccionada(null)}
        className={estiloBoton(categoriaSeleccionada === null)}
      >
        Todos
      </button>

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
  );
}