import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9103902768"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-500 transform hover:scale-110 z-40"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

export default WhatsAppButton;
