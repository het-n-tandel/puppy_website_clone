import { currentSite } from './siteConfig';

/**
 * Builds a WhatsApp chat link with pre-filled URI-encoded inquiry messages
 */
export function getWhatsAppInquiryUrl(puppyName?: string, puppyBreed?: string): string {
  let message = `Hi ${currentSite.brandName}! I'm interested in finding a puppy.`;
  
  if (puppyName) {
    message = `Hi ${currentSite.brandName}! I'm interested in ${puppyName}${puppyBreed ? ` (${puppyBreed})` : ''}. Could you please share more details and availability?`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${currentSite.contact.whatsapp}?text=${encodedMessage}`;
}

export function getGeneralWhatsAppUrl(): string {
  const message = `Hi ${currentSite.brandName}! I'd love to know more about your puppies.`;
  return `https://wa.me/${currentSite.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
