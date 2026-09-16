export default function ProductoCard({ producto, alSeleccionar }) {

  const manejarReserva = () => {
    const telefono = "593995604549";
    const mensaje = `Hola Coindecor! Me interesa el producto: ${producto.nombre} ($${producto.precio})`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // Las imágenes se arman usando la variable de entorno en internet
  const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
  const imagenUrl = producto.imagen
    ? (producto.imagen.startsWith('http')
        ? producto.imagen
        : `${urlBase}${producto.imagen}`)
    : null;

  return (
    <div 
      onClick={alSeleccionar} /* Abre el modal al hacer clic en cualquier parte de la tarjeta */
      className="
        group bg-white rounded-2xl overflow-hidden cursor-pointer
        border border-gray-100 shadow-sm hover:shadow-2xl
        transition-all duration-300 hover:-translate-y-1
        flex flex-col h-full
      "
    >
      {/* 1. CONTENEDOR DE IMAGEN ACCESIBLE: h-44 en móvil, h-64 en pantallas grandes */}
      <div className="relative h-44 sm:h-64 bg-gray-50 overflow-hidden">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Imagen no disponible
          </div>
        )}

        <span className="
          absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur
          px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-widest text-gray-600 font-medium
        ">
          {producto.categoria_nombre || 'Colección'}
        </span>
      </div>

      {/* 2. INFO DEL PRODUCTO: Menos espacio (p-4) en móvil, (p-6) en web */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#ff7f50] transition-colors line-clamp-2">
          {producto.nombre}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-4 sm:mb-6 whitespace-pre-line leading-relaxed">
          {producto.descripcion}
        </p>

        {/* 3. CONTENEDOR DE PRECIO Y BOTÓN: Solución al solapamiento */}
        <div className="mt-auto flex flex-row items-center justify-between gap-2 pt-2 border-t border-gray-50">
          <span className="text-lg sm:text-2xl font-extrabold text-gray-900 shrink-0">
            ${producto.precio}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation(); /* Evita que se abra el modal */
              manejarReserva();
            }}
            className="
              px-3 sm:px-5 py-1.5 sm:py-2 bg-[#ff7f50] text-white rounded-full 
              text-[9px] sm:text-sm font-medium transition-all duration-300 active:scale-95 
              text-center uppercase tracking-wider whitespace-nowrap
            "
          >
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
}