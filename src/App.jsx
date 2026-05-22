import { useEffect, useState } from "react";
import axios from "axios"
import axiosOriginal from "axios"; 

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
    // CORREGIDO: Se quita el fallback a localhost
    const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";
    axios.get(`${urlBase}/api/productos/`)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos:", err));
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
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img
            src={logoEmpresa}
            alt="Coindecor"
            className="h-10 cursor-pointer"
            onClick={() => navegarA("inicio")}
          />

          <nav className="hidden md:flex gap-8 font-medium items-center">
            {["inicio","catalogo","contacto"].map(item => (
              <button
                key={item}
                onClick={() => navegarA(item)}
                className={`transition ${vista === item ? "text-[#C6A75E]" : "text-gray-600 hover:text-[#C6A75E]"}`}
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

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <main className="pt-28 min-h-screen">
        {vista === "inicio" && (
          <Inicio onVerCatalogo={() => navegarA("catalogo")} />
        )}

        {vista === "contacto" && <Contacto />}

        {vista === "catalogo" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-14">
              <h2 className="text-5xl font-black mb-6">Nuestro Catálogo</h2>
              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e)=>setBusqueda(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border focus:ring-4 focus:ring-[#C6A75E]/20 outline-none pl-12"
                />
                <span className="absolute left-4 top-4 text-xl">🔎</span>
              </div>
            </div>

            <Categorias
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
            />

            {productosFiltrados.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed">
                <p className="text-xl text-gray-500">No encontramos resultados</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {productosFiltrados.map(p => (
                  <div key={p.id} onClick={() => setProductoSeleccionado(p)} className="cursor-pointer hover:scale-[1.02] transition">
                    <ProductoCard producto={p}/>
                  </div>
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