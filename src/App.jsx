import { useEffect, useState } from "react";
import axios from "axios";

import ProductoCard from "./components/ProductoCard";
import Categorias from "./components/Categorias";
import ModalProducto from "./components/ModalProducto";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import WhatsappFloat from "./components/WhatsAppFloat";
import Footer from "./components/Footer";

import logoEmpresa from "./assets/Coindecor.png";

function App() {

  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [vista, setVista] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);

  // ========================
  // API
  // ========================
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/productos/")
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const navegarA = (v) => {
    setVista(v);
    setMenuAbierto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productosFiltrados = productos.filter(p => {
    const categoriaOK = categoriaSeleccionada ? p.categoria === categoriaSeleccionada : true;
    const nombreOK = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return categoriaOK && nombreOK;
  });

  // ========================
  // UI
  // ========================
  return (
    <div className="bg-[#f8f9fb] text-gray-900 font-sans">

      {/* ================= NAVBAR STARTUP ================= */}
      <header className="
        fixed
        top-0
        w-full
        z-50
        backdrop-blur-md
        bg-white/70
        border-b border-gray-100
      ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <img
            src={logoEmpresa}
            alt="Coindecor"
            className="h-10 cursor-pointer"
            onClick={() => navegarA("inicio")}
          />

          {/* Desktop */}
          <nav className="hidden md:flex gap-8 font-medium">
            {["inicio","catalogo","contacto"].map(item => (
              <button
                key={item}
                onClick={() => navegarA(item)}
                className={`
                  transition
                  ${vista === item
                    ? "text-[#C6A75E]"
                    : "text-gray-600 hover:text-[#C6A75E]"
                  }
                `}
              >
                {item.charAt(0).toUpperCase()+item.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? "✕" : "☰"}
          </button>

        </div>

        {menuAbierto && (
          <div className="md:hidden bg-white border-t animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-4 space-y-4 font-semibold">
              {["inicio","catalogo","contacto"].map(item => (
                <button
                  key={item}
                  onClick={() => navegarA(item)}
                  className={`
                    text-left p-3 rounded-xl
                    ${vista === item
                      ? "bg-[#C6A75E]/10 text-[#C6A75E]"
                      : "text-gray-700"}
                  `}
                >
                  {item.charAt(0).toUpperCase()+item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ====== OFFSET NAVBAR ====== */}
      <main className="pt-28 min-h-screen">

        {vista === "inicio" && <Inicio />}

        {vista === "contacto" && <Contacto />}

        {vista === "catalogo" && (
          <div className="max-w-7xl mx-auto px-4 py-12">

            <div className="text-center mb-14">
              <h2 className="text-5xl font-black mb-6">
                Nuestro Catálogo
              </h2>

              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e)=>setBusqueda(e.target.value)}
                  className="
                    w-full
                    px-6
                    py-4
                    rounded-2xl
                    border
                    focus:ring-4
                    focus:ring-[#C6A75E]/20
                    outline-none
                    shadow-sm
                    pl-12
                  "
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
                <p className="text-xl text-gray-500">
                  No encontramos resultados
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {productosFiltrados.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setProductoSeleccionado(p)}
                    className="cursor-pointer hover:scale-[1.02] transition"
                  >
                    <ProductoCard producto={p}/>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* ===== MODAL ===== */}
      {productoSeleccionado && (
        <ModalProducto
          producto={productoSeleccionado}
          alCerrar={()=>setProductoSeleccionado(null)}
          alReservar={()=>{
            const telefono="593995604549";
            const mensaje=`Hola Coindecor! Me interesa reservar: ${productoSeleccionado.nombre}`;
            window.open(
              `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
            );
          }}
        />
      )}

      {/* ===== FLOAT WHATSAPP ===== */}
      <WhatsappFloat />

      {/* ===== FOOTER STARTUP ===== */}
      <Footer />

    </div>
  );
}

export default App;