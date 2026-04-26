import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function ModalProducto({ producto, alCerrar, alReservar }) {
  const [indiceActivo, setIndiceActivo] = useState(0);
  
  // Estados para el Zoom Personalizado
  const [zoomData, setZoomData] = useState({ show: false, x: 0, y: 0 });
  const containerRef = useRef(null);

  const formatearUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://127.0.0.1:8000${url}`;
  };

  const todasLasImagenes = useMemo(() => {
    if (!producto) return [];
    const imagenes = [];
    if (producto.imagen) {
      imagenes.push({ id: 'principal', url: formatearUrl(producto.imagen) });
    }
    if (producto.imagenes && producto.imagenes.length > 0) {
      producto.imagenes.forEach(img => {
        imagenes.push({ id: img.id, url: formatearUrl(img.imagen) });
      });
    }
    return imagenes;
  }, [producto]);

  useEffect(() => {
    setIndiceActivo(0);
  }, [producto]);

  if (!producto || todasLasImagenes.length === 0) return null;

  const imagenActual = todasLasImagenes[indiceActivo];

  // LÓGICA DEL ZOOM
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calcular posición del mouse en porcentaje (0 a 100)
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomData({ show: true, x, y });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 md:p-6 z-[9999]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={alCerrar}></div>
      
      <div className="bg-white w-full max-w-6xl max-h-[92vh] md:max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-[10000]">
        
        <button onClick={alCerrar} className="absolute top-5 right-5 z-[10010] bg-white/80 p-2.5 rounded-full text-gray-500 hover:text-black shadow-sm transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* COLUMNA IZQUIERDA: IMÁGENES */}
        <div className="w-full md:w-[55%] flex flex-col bg-[#f8f8f8] p-4 md:p-10 justify-center relative">
          
          {/* Contenedor de Imagen con Sensor de Movimiento */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setZoomData(prev => ({ ...prev, show: true }))}
            onMouseLeave={() => setZoomData(prev => ({ ...prev, show: false }))}
            className="relative h-72 sm:h-96 md:h-[500px] w-full rounded-2xl overflow-hidden bg-white mb-6 flex items-center justify-center cursor-crosshair group shadow-inner"
          >
            <img 
              src={imagenActual.url} 
              alt={producto.nombre} 
              className={`w-full h-full object-contain p-6 transition-opacity duration-300 ${zoomData.show ? 'opacity-50' : 'opacity-100'}`} 
            />

            {/* MIRA / LENTE (El cuadrito que sigues con el mouse) */}
            {zoomData.show && (
              <div 
                className="absolute border-2 border-[#C6A75E] bg-[#C6A75E]/10 pointer-events-none hidden md:block"
                style={{
                  width: '150px',
                  height: '150px',
                  left: `${zoomData.x}%`,
                  top: `${zoomData.y}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 20px rgba(0,0,0,0.1)'
                }}
              />
            )}

            {/* NAVEGACIÓN */}
            {todasLasImagenes.length > 1 && (
              <>
                <button onClick={() => setIndiceActivo(prev => (prev === 0 ? todasLasImagenes.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md text-gray-700 hover:scale-110 z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => setIndiceActivo(prev => (prev === todasLasImagenes.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md text-gray-700 hover:scale-110 z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>

          {/* Miniaturas */}
          <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
            {todasLasImagenes.map((img, index) => (
              <button key={img.id} onClick={() => setIndiceActivo(index)} className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all bg-white p-1 ${indiceActivo === index ? 'border-[#C6A75E] scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                <img src={img.url} className="w-full h-full object-contain" alt="thumb" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO Y VENTANA DE ZOOM */}
        <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-between bg-white relative">
          
          {/* VENTANA DE ZOOM (Aparece solo en Hover sobre la otra columna) */}
          {zoomData.show && (
            <div 
              className="absolute inset-0 z-[10005] bg-white hidden md:block"
              style={{
                backgroundImage: `url(${imagenActual.url})`,
                backgroundPosition: `${zoomData.x}% ${zoomData.y}%`,
                backgroundSize: '200%', // Ajusta este número para más o menos zoom
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Etiqueta indicadora opcional */}
              <div className="absolute top-4 left-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-widest">Vista Detallada</div>
            </div>
          )}

          {/* CONTENIDO NORMAL */}
          <div className="relative">
            <span className="text-gray-400 font-medium uppercase text-[10px] tracking-[0.3em] mb-4 block">{producto.categoria_nombre || 'Colección'}</span>
            <h2 className="text-4xl font-light text-gray-800 leading-tight mb-6">{producto.nombre}</h2>
            <div className="w-12 h-[1px] bg-gray-200 mb-8"></div>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 overflow-y-auto max-h-60 pr-4 whitespace-pre-wrap">{producto.descripcion}</p>
          </div>

          <div className="border-t border-gray-50 pt-10">
            <div className="flex flex-col mb-8">
               <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-2">Precio sugerido</span>
               <span className="text-5xl font-light text-gray-900">${producto.precio}</span>
            </div>
            <button onClick={alReservar} className="w-full bg-[#C6A75E] hover:bg-[#b89645] text-white py-5 rounded-full font-medium tracking-widest uppercase transition-all active:scale-95">
              Consultar por WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}