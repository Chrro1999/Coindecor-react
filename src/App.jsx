import { useEffect, useState } from "react";
import axios from "axios"; 

import ProductoCard from "./components/ProductoCard";
import Categorias from "./components/Categorias";
import ModalProducto from "./components/ModalProducto";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import WhatsappFloat from "./components/WhatsAppFloat";
import Footer from "./components/Footer";
import Carrito from "./components/Carrito"; 

import logoEmpresa from "./assets/Coindecor.png";

function App() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [vista, setVista] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // Estado para controlar el spinning loader
  const [cargando, setCargando] = useState(true);

  // ========================
  // LÓGICA DE CARRITO
  // ========================
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setCarritoAbierto(true); 
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter((item) => item.id !== id));
  };

  // ========================
  // API 
  // ========================
  useEffect(() => {
    const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
    
    setCargando(true);
    
    axios.get(`${urlBase}/api/productos/`)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos:", err))
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const navegarA = (v) => {
    setVista(v);
    setMenuAbierto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ========================
  // LÓGICA DE FILTRADO
  // ========================
  const productosFiltrados = productos.filter(p => {
    const estaDisponible = p.disponible !== false; 
    const categoriaOK = categoriaSeleccionada ? p.categoria === categoriaSeleccionada : true;
    const nombreOK = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return estaDisponible && categoriaOK && nombreOK;
  });

  return (
    <div className="bg-[#f8f9fb] text-gray-900 font-sans">
      {/* ================= NAVBAR (Totalmente Limpio a la izquierda) ================= */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* CORREGIDO: Ya no hay letras ni logos aquí para mantener la barra limpia */}
          <div className="w-10 h-10 md:hidden" /> 

          <nav className="hidden md:flex gap-8 font-medium items-center ml-auto">
            {["inicio","catalogo","contacto"].map(item => (
              <button
                key={item}
                onClick={() => navegarA(item)}
                className={`transition ${vista === item ? "text-[#ff7f50]" : "text-gray-600 hover:text-[#ff7f50]"}`}
              >
                {item.charAt(0).toUpperCase()+item.slice(1)}
              </button>
            ))}

            <button 
              onClick={() => setCarritoAbierto(true)}
              className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all active:scale-90"
            >
              <span className="text-xl">🛒</span>
              {carrito.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C6A75E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                </span>
              )}
            </button>
          </nav>

          <button className="md:hidden text-3xl" onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? "✕" : "☰"}
          </button>
        </div>

        {menuAbierto && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4 font-semibold">
            {["inicio","catalogo","contacto"].map(item => (
              <button
                key={item}
                onClick={() => navegarA(item)}
                className={`text-left p-3 rounded-xl ${vista === item ? "bg-[#C6A75E]/10 text-[#C6A75E]" : "text-gray-700"}`}
              >
                {item.charAt(0).toUpperCase()+item.slice(1)}
              </button>
            ))}
            <button 
              onClick={() => { setCarritoAbierto(true); setMenuAbierto(false); }}
              className="text-left p-3 rounded-xl text-gray-700 flex justify-between items-center"
            >
              <span>Carrito</span>
              <span className="bg-[#C6A75E] text-white px-2 py-1 rounded-md text-xs">
                {carrito.length} items
              </span>
            </button>
          </div>
        )}
      </header>

      {/* ====== SECCIÓN HERO / BANNER NEGRO SÓLO CON TU IMAGEN DE LOGO ====== */}
      <div className="bg-black text-white pt-28 pb-10 flex flex-col items-center justify-center border-b border-gray-900">
        <div className="text-center flex flex-col items-center max-w-xl px-4">
          {/* CORREGIDO: Se eliminó todo el texto secundario. Queda solo el logo oficial escalado y limpio */}
          <img 
            src={logoEmpresa} 
            alt="Coin Decor" 
            className="h-24 sm:h-32 object-contain cursor-pointer transition-transform duration-300 hover:scale-102"
            onClick={() => navegarA("inicio")}
          />
        </div>
      </div>

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <main className="min-h-screen">
        {vista === "inicio" && (
          <Inicio onVerCatalogo={() => navegarA("catalogo")} />
        )}

        {vista === "contacto" && <Contacto />}

        {vista === "catalogo" && (
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-12">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-black mb-6">Nuestro Catálogo</h2>
              <div className="max-w-md mx-auto relative px-2">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e)=>setBusqueda(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border focus:ring-4 focus:ring-[#C6A75E]/20 outline-none pl-12"
                />
                <span className="absolute left-6 top-4 text-xl">🔎</span>
              </div>
            </div>

            <Categorias
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
            />

            {cargando ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#C6A75E] rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm font-medium mt-4 tracking-wide">
                  Cargando catálogo de Coindecor...
                </p>
              </div>
            ) : productosFiltrados.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed mx-2">
                <p className="text-xl text-gray-500">No encontramos resultados</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                {productosFiltrados.map(p => (
                  <ProductoCard 
                    key={p.id} 
                    producto={p}
                    alSeleccionar={() => setProductoSeleccionado(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Carrito 
        abierto={carritoAbierto} 
        setAbierto={setCarritoAbierto}
        items={carrito}
        onEliminar={eliminarDelCarrito}
      />

      {productoSeleccionado && (
        <ModalProducto
          producto={productoSeleccionado}
          alCerrar={()=>setProductoSeleccionado(null)}
          alAgregar={() => agregarAlCarrito(productoSeleccionado)}
          alReservar={()=>{
            const telefono="593995604549";
            const mensaje=`Hola Coindecor! Me interesa reservar: ${productoSeleccionado.nombre}`;
            window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`);
          }}
        />
      )}

      <WhatsappFloat />
      <Footer />
    </div>
  );
}

export default App;