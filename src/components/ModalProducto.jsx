import React, { useState, useEffect, useRef } from 'react';

export default function ModalProducto({ producto, alCerrar, alAgregar }) {
  const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
  const contenedorRef = useRef(null);
  
  const obtenerUrlImagen = (ruta) => {
    if (!ruta) return null;
    return ruta.startsWith('http') ? ruta : `${urlBase}${ruta}`;
  };

  const [imagenActiva, setImagenActiva] = useState(obtenerUrlImagen(producto.imagen));
  const [mostrarZoom, setMostrarZoom] = useState(false);
  const [bgPos, setBgPos] = useState('0% 0%');

  useEffect(() => {
    setImagenActiva(obtenerUrlImagen(producto.imagen));
  }, [producto]);

  const todasLasImagenes = [
    obtenerUrlImagen(producto.imagen),
    ...(producto.imagenes || []).map(img => obtenerUrlImagen(img.imagen))
  ].filter(Boolean);

  const manejarMouseMove = (e) => {
    if (!contenedorRef.current) return;
    const { left, top, width, height } = contenedorRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Botón Cerrar */}
        <button onClick={alCerrar} className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl z-50 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow">
          &times;
        </button>
        
        {/* IZQUIERDA: Visor + Galería de miniaturas */}
        <div className="w-full md:w-1/2 bg-gray-50 p-4 flex flex-col justify-center items-center relative">
          
          {/* Zona del recuadro principal */}
          <div 
            ref={contenedorRef}
            onMouseEnter={() => setMostrarZoom(true)}
            onMouseMove={manejarMouseMove}
            onMouseLeave={() => setMostrarZoom(false)}
            className="w-full h-64 md:h-[350px] flex items-center justify-center rounded-2xl bg-white shadow-inner relative overflow-hidden cursor-zoom-in"
          >
            {imagenActiva ? (
              <img 
                src={imagenActiva} 
                alt={producto.nombre} 
                className="w-full h-full object-contain p-2 select-none pointer-events-none" 
              />
            ) : (
              <span className="text-gray-400">Sin Imagen</span>
            )}

            {mostrarZoom && imagenActiva && (
              <div 
                style={{
                  backgroundImage: `url(${imagenActiva})`,
                  backgroundPosition: bgPos,
                  backgroundSize: '200%',
                }}
                className="absolute top-0 left-0 w-full h-full bg-white bg-no-repeat z-40 rounded-2xl border-2 border-gray-100 hidden md:block pointer-events-none shadow-2xl"
              />
            )}
          </div>

          {/* CONTENEDOR DE MINIATURAS */}
          {todasLasImagenes.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center w-full">
              {todasLasImagenes.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActiva(imgUrl)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 bg-white transition-all ${
                    imagenActiva === imgUrl ? 'border-[#C6A75E] scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DERECHA: Textos e Información */}
        <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between bg-white">
          <div className="overflow-y-auto mb-4 max-h-[250px] md:max-h-[300px] pr-1">
            <span className="text-xs font-bold tracking-widest text-[#ff7f50] uppercase block">
              {producto.categoria_nombre || 'Colección'}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-3">{producto.nombre}</h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{producto.descripcion}</p>
          </div>
          
          {/* SECCIÓN DE PRECIO Y BOTÓN ÚNICO DE ACCIÓN */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            <div className="text-3xl font-extrabold text-gray-900 mb-2">${producto.precio}</div>
            
            {/* BOTÓN EXCLUSIVO: AGREGAR AL CARRITO */}
            <button 
              onClick={alAgregar}
              className="w-full bg-[#ff7f50] text-white py-4 rounded-full font-bold hover:bg-[#ffa07a] transition-all text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 uppercase tracking-wider"
            >
              <span>🛒</span> Agregar al carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}