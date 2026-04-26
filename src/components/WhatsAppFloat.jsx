import React from "react";

export default function WhatsAppFloat() {
  const telefono = "593995604549";

  return (
    <a
      href={`https://wa.me/${telefono}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6
        bg-[#25D366]
        hover:scale-110
        transition
        text-white
        w-16 h-16
        rounded-full
        flex items-center justify-center
        shadow-xl
        z-50
      "
    >
      <span className="text-2xl">💬</span>
    </a>
  );
}