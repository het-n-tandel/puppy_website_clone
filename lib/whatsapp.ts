import { currentSite } from './siteConfig';

/**
 * Builds a WhatsApp chat link with pre-filled URI-encoded inquiry messages
 */
export function getWhatsAppInquiryUrl(puppyName?: string, puppyBreed?: string): string {
  let message = "Hi TeddyPups! I'd love to know more about your puppies.";
  
  if (puppyName) {
    message = `Hi TeddyPups! I'm interested in ${puppyName}${puppyBreed ? ` (${puppyBreed})` : ''}. Could you please share more details and availability?`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${currentSite.contact.whatsapp}?text=${encodedMessage}`;
}

export function getGeneralWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || "Hi TeddyPups! I'd love to know more about your puppies.";
  return `https://wa.me/${currentSite.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
