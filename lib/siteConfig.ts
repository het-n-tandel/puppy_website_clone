export interface SiteRegionConfig {
  region: 'UAE' | 'INDIA';
  brandName: string;
  tagline: string;
  locationCity: string;
  locationFull: string;
  currency: {
    symbol: string;
    code: string;
    defaultDeposit: number;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    hours: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
}

export const REGIONS: Record<'UAE' | 'INDIA', SiteRegionConfig> = {
  UAE: {
    region: 'UAE',
    brandName: 'TeddyPups U.A.E.',
    tagline: 'every puppy is family',
    locationCity: 'Dubai',
    locationFull: 'Downtown Dubai, United Arab Emirates',
    currency: {
      symbol: 'AED',
      code: 'AED',
      defaultDeposit: 2500,
    },
    contact: {
      phone: '+971541676733',
      phoneDisplay: '+971 54 167 6733',
      whatsapp: '971541676733',
      whatsappDisplay: '+971 54 167 6733',
      email: 'teddypupsadmin@gmail.com',
      hours: 'Open daily: 10:00 AM – 9:00 PM',
    },
    social: {
      instagram: 'https://www.instagram.com/teddypups.worldwide/',
      tiktok: 'https://www.tiktok.com/@teddypupsuae',
      facebook: 'https://www.facebook.com/profile.php?id=61567496944539',
    },
  },
  INDIA: {
    region: 'INDIA',
    brandName: 'TeddyPups India',
    tagline: 'every puppy is family',
    locationCity: 'Mumbai',
    locationFull: 'Bandra West, Mumbai, Maharashtra, India',
    currency: {
      symbol: '₹',
      code: 'INR',
      defaultDeposit: 25000,
    },
    contact: {
      phone: '+919876543210',
      phoneDisplay: '+91 98765 43210',
      whatsapp: '919876543210',
      whatsappDisplay: '+91 98765 43210',
      email: 'india@teddypups.com',
      hours: 'Open daily: 10:00 AM – 8:00 PM',
    },
    social: {
      instagram: 'https://www.instagram.com/teddypups.worldwide/',
      tiktok: 'https://www.tiktok.com/@teddypupsuae',
      facebook: 'https://www.facebook.com/profile.php?id=61567496944539',
    },
  },
};

// Default active region: UAE (matches 1:1 with reference site)
export const ACTIVE_REGION = 'UAE';
export const currentSite = REGIONS[ACTIVE_REGION];
