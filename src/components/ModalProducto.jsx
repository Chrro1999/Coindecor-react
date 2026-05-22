import React from 'react';

export default function ModalProducto({ producto, alCerrar, alAgregar, alReservar }) {
  // CORREGIDO: URLs limpias y dinámicas para la imagen ampliada
  const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
  const imagenUrl = producto.imagen
    ? (producto.imagen.startsWith('http') ? producto.imagen : `${urlBase}${producto.imagen}`)
    : null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        <button onClick={alCerrar} className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl z-10 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow">
          &times;
        </button>
        
        <div className="w-full md:w-1/2 bg-gray-50 h-64 md:h-auto flex items-center justify-center">
          {imagenUrl ? (
            <img src={imagenUrl} alt={producto.nombre} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">Sin Imagen</span>
          )}
        </div>

        <div className="p-8 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#C6A75E] uppercase">{producto.categoria_nombre || 'Colección'}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{producto.nombre}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{producto.descripcion}</p>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-6">${producto.precio}</div>
            <div className="flex flex-col gap-3">
              <button onClick={alAgregar} className="w-full bg-black text-white py-3.5 rounded-full font-bold hover:bg-gray-800 transition">
                AGREGAR AL CARRITO
              </button>
              <button onClick={alReservar} className="w-full border border-gray-200 text-gray-700 py-3 rounded-full font-medium hover:border-black transition text-sm">
                Consultar stock directo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}