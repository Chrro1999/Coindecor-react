import React from 'react';

export default function Contacto() {

  const telefono = "593962016555";
  const email = "elcie70@gmail.com";

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-semibold text-gray-900 mb-4">
          Ponte en contacto
        </h2>

        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Estamos listos para ayudarte a elegir los mejores electrodomésticos para tu hogar.
        </p>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* INFORMACIÓN */}
        <div className="space-y-10">

          <div className="
            bg-white
            p-10
            rounded-3xl
            border border-gray-100
            shadow-sm
          ">

            <h3 className="text-2xl font-semibold mb-10 text-gray-900">
              Nuestros Canales
            </h3>

            <div className="space-y-8">

              {/* Ubicación */}
              <div className="flex items-start gap-5">
                <div className="bg-[#C6A75E]/10 text-[#C6A75E] p-4 rounded-2xl text-xl">
                  📍
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Ubicación
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quito, Ecuador — Envíos a todo el país
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-5">
                <div className="bg-[#C6A75E]/10 text-[#C6A75E] p-4 rounded-2xl text-xl">
                  📱
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    WhatsApp
                  </p>

                  <a
                    href={`https://wa.me/${telefono}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-gray-500
                      hover:text-[#C6A75E]
                      transition
                      font-medium
                    "
                  >
                    +593 96 201 6555
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="bg-[#C6A75E]/10 text-[#C6A75E] p-4 rounded-2xl text-xl">
                  ✉️
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Email
                  </p>
                  <p className="text-gray-500">
                    {email}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* MENSAJE MARCA */}
          <div className="
            border border-[#C6A75E]/30
            bg-[#C6A75E]/5
            p-8
            rounded-3xl
          ">
            <p className="text-gray-700 italic leading-relaxed">
              En Coin Decor priorizamos la atención personalizada.
              Escríbenos por WhatsApp y recibe asesoría directa para tu compra.
            </p>
          </div>

        </div>

        {/* MAPA */}
        <div className="
          rounded-3xl
          overflow-hidden
          border border-gray-100
          shadow-xl
          h-[520px]
        ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1994.9054132222946!2d-78.4824689!3d-0.1110491!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5850f553f8557%3A0x22ea414be69bce7!2sCOCINA%20DE%20INDUCCI%C3%93N!5e0!3m2!1ses!2sec!4v1775839123804!5m2!1ses!2sec"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Ubicación Coin Decor"
          />
        </div>

      </div>
    </div>
  );
}