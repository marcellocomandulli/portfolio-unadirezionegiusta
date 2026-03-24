import React from "react";

interface Props {
  phone: string;
  message?: string;
}

const WhatsAppFloating: React.FC<Props> = ({
  phone,
  message = "Ciao! Vorrei avere alcune informazioni su shooting e video.",
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattami su WhatsApp"
      className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12c0 2.115.553 4.09 1.603 5.86L0 24l6.448-1.591A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.21-1.243-6.217-3.48-8.52zM12 21.818c-1.87 0-3.67-.502-5.237-1.45l-.375-.224-3.834.946.999-3.743-.243-.386A8.727 8.727 0 013.273 12c0-4.83 3.897-8.727 8.727-8.727 2.327 0 4.515.907 6.165 2.56A8.68 8.68 0 0120.727 12c0 4.83-3.897 8.727-8.727 8.727zM17.22 14.48c-.295-.148-1.744-.86-2.013-.957-.269-.098-.465-.148-.661.148-.197.295-.761.957-.935 1.156-.172.197-.345.221-.64.074-.295-.148-1.246-.459-2.374-1.46-.879-.784-1.472-1.749-1.645-2.044-.172-.295-.018-.455.13-.602.134-.134.295-.345.443-.517.148-.172.197-.295.296-.492.098-.197.049-.37-.025-.518-.074-.148-.661-1.593-.905-2.183-.238-.575-.48-.497-.661-.506l-.563-.01c-.197 0-.518.074-.79.37-.269.295-1.022.996-1.022 2.427 0 1.43 1.047 2.812 1.194 3.006.148.197 2.066 3.16 5.01 4.426 2.944 1.266 2.944.845 3.476.793.518-.049 1.682-.685 1.918-1.349.236-.664.236-1.232.165-1.349-.074-.118-.269-.197-.564-.345z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloating;
