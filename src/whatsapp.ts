export const WHATSAPP_NUMBER = "2348108385033";

export const whatsappLink = (message = "Hi Real Printing! I'd like a custom print quote.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
