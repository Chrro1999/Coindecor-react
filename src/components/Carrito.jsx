import React from 'react';

export default function Carrito({ abierto, setAbierto, items, onEliminar }) {
  const total = items.reduce((acc, item) => acc + (parseFloat(item.precio) * item.cantidad), 0);

  // CORREGIDO: Se cambia el fallback local por el enlace de producción seguro
  const urlBase = import.meta.env.VITE_API_URL || "https://coindecor-backend-production.up.railway.app";

  const enviarPedidoWhatsApp = () => {
    const telefono = "593962016555";
    const lista = items.map(p => `- ${p.nombre} (x${p.cantidad}) - $${p.precio}`).join('\n');
    const mensaje = `¡Hola Coindecor! Quisiera realizar el siguiente pedido para pagar con Datafast/DataLink:\n\n${lista}\n\n*Total: $${total.toFixed(2)}*\n\nPor favor, envíenme el link de pago.`;
    
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`);
  };

  return (
    <>
      {/* Overlay fondo */}
      <div className={`fixed inset-0 bg-black/50 z-[10000] transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setAbierto(false)} />
      
      {/* Panel Lateral */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[10001] shadow-2xl transition-transform duration-300 transform ${abierto ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Tu Pedido</h2>
            <button onClick={() => setAbierto(false)} className="text-3xl">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 mt-20">El carrito está vacío</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
                  <img 
                    src={item.imagen.startsWith('http') ? item.imagen : `${urlBase}${item.imagen}`} 
                    className="w-20 h-20 object-contain bg-gray-50 rounded-xl" 
                    alt={item.nombre} 
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.nombre}</h3>
                    <p className="text-[#C6A75E] font-bold">${item.precio} x {item.cantidad}</p>
                    <button onClick={() => onEliminar(item.id)} className="text-xs text-red-400 hover:text-red-600 mt-2">Eliminar</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-6">
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button onClick={enviarPedidoWhatsApp} className="w-full bg-black text-white py-4 rounded-full font-bold tracking-widest hover:bg-gray-800 transition">
                PEDIR POR WHATSAPP
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-tighter">
                Recibirás un link de pago de Datafast por WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}