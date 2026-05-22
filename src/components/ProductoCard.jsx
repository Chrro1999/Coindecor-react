export default function ProductoCard({ producto }) {

  const manejarReserva = () => {
    const telefono = "593995604549";
    const mensaje = `Hola Coindecor! Me interesa el producto: ${producto.nombre} ($${producto.precio})`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // CORREGIDO: Las imágenes se arman usando la variable de entorno en internet
  const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
  const imagenUrl = producto.imagen
    ? (producto.imagen.startsWith('http')
        ? producto.imagen
        : `${urlBase}${producto.imagen}`)
    : null;

  return (
    <div className="
      group bg-white rounded-2xl overflow-hidden
      border border-gray-100 shadow-sm hover:shadow-2xl
      transition-all duration-300 hover:-translate-y-1
      flex flex-col h-full
    ">
      {/* Imagen */}
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Imagen no disponible
          </div>
        )}

        <span className="
          absolute top-4 left-4 bg-white/90 backdrop-blur
          px-3 py-1 rounded-full text-[10px] tracking-widest text-gray-600
        ">
          {producto.categoria_nombre || 'Colección'}
        </span>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {producto.nombre}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-6">
          {producto.descripcion}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-semibold text-gray-900">
            ${producto.precio}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              manejarReserva();
            }}
            className="
              px-5 py-2 border border-[#C6A75E] text-[#C6A75E]
              rounded-full text-sm hover:bg-[#C6A75E] hover:text-black
              transition-all duration-300
            "
          >
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
}