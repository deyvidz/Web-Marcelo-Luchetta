// Número de WhatsApp con formato internacional (54 = Argentina, 9 = celular, 11 = Buenos Aires).
// Centralizado acá para que WhatsappCta y los botones inline (ProductPage, etc.) lo compartan.
export const WHATSAPP_PHONE = '5491152498558';

// Mensaje predeterminado que se precarga en WhatsApp al abrir el chat.
export const DEFAULT_WHATSAPP_MESSAGE = 'Hola Marcelo, te contacto desde la web porque estoy buscando un producto específico. ¿Me podés ayudar?';

// Construye una URL de WhatsApp con el mensaje codificado para abrir en nueva pestaña.
// Usar siempre esta función en lugar de armar la URL inline (consistencia + un solo lugar para cambiar el número).
export const buildWhatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
