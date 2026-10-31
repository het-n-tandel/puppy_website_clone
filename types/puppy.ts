export type PuppyStatus = 'Available' | 'Reserved' | 'Gone home';

export type PuppyGender = 'Boy' | 'Girl' | 'Boy & Girl' | 'Boy & girl' | string;

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  breed: string;
  gender: PuppyGender;
  age: string;
  location: string;
  status: PuppyStatus;
  description: string;
  images: string[];
  price?: string;
  vaccinated?: boolean;
  dewormed?: boolean;
  microchipped?: boolean;
  healthCertificate?: boolean;
  passport?: boolean;
  colorWash?: string;
}

export interface InquiryRecord {
  id: string;
  puppyId: string;
  puppyName: string;
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  createdAt: string;
  idempotencyKey: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  puppyName: string;
  breed: string;
  quote: string;
  date: string;
  rating: number;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Health' | 'Travel' | 'Support';
}
