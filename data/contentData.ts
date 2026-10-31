import { FAQItem, ReviewItem } from '@/types/puppy';

export const FAQS: FAQItem[] = [
  {
    question: "Are your puppies vaccinated and health-checked?",
    answer: "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
    category: "Health"
  },
  {
    question: "Can I meet a puppy before I decide?",
    answer: "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
    category: "General"
  },
  {
    question: "Can I take my puppy home the same day?",
    answer: "Local puppies are available immediately, so you can take your puppy home the same day.",
    category: "General"
  },
  {
    question: "Do you import puppies from abroad?",
    answer: "Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.",
    category: "General"
  },
  {
    question: "How does an imported puppy travel to Dubai?",
    answer: "We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.",
    category: "Travel"
  },
  {
    question: "Will I see photos and health details first?",
    answer: "Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.",
    category: "General"
  },
  {
    question: "Do you deliver?",
    answer: "Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.",
    category: "Travel"
  },
  {
    question: "Which breeds do you usually have?",
    answer: "Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.",
    category: "General"
  },
  {
    question: "Is there help after my puppy comes home?",
    answer: "Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.",
    category: "Support"
  }
];

export const HAPPY_FAMILIES_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Fatima Al Mansoori",
    location: "Downtown Dubai",
    puppyName: "Milo",
    breed: "Korean Teacup Maltipoo",
    quote: "Welcoming Milo into our home was the most seamless and heartwarming experience. The health certificates, vet records, and 24/7 post-adoption care from TeddyPups were truly exceptional.",
    date: "October 2026",
    rating: 5,
    image: "/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
  },
  {
    id: "rev-2",
    author: "Alexander & Sarah Wright",
    location: "Palm Jumeirah, Dubai",
    puppyName: "Coco",
    breed: "Toy Poodle",
    quote: "Coco arrived in perfect health with all travel papers and a wonderful starter care basket. He settled into our family within hours. We couldn't be happier!",
    date: "September 2026",
    rating: 5,
    image: "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
  },
  {
    id: "rev-3",
    author: "Zaid Al-Hashimi",
    location: "Dubai Marina",
    puppyName: "Bella",
    breed: "Pomeranian",
    quote: "The entire team treated our puppy like royalty. We met Bella at their Dubai showroom, fell in love instantly, and took her home the very same afternoon.",
    date: "August 2026",
    rating: 5,
    image: "/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg"
  },
  {
    id: "rev-4",
    author: "Priya & Rohan Sharma",
    location: "Jumeirah Golf Estates",
    puppyName: "Leo",
    breed: "Bichon Frise",
    quote: "Finding a genuine teacup pup with certified lineage seemed impossible until we connected with TeddyPups. Transparent communication from day one.",
    date: "July 2026",
    rating: 5,
    image: "/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg"
  }
];

export const ADOPTION_STEPS = [
  {
    step: "01",
    title: "Reserve your puppy",
    description: "Browse our hand-picked available puppies or request a custom import. Connect with our concierge to secure your reservation."
  },
  {
    step: "02",
    title: "Personalized consultation",
    description: "Receive high-definition video check-ins, veterinary health reports, parentage information, and customized transition advice."
  },
  {
    step: "03",
    title: "Import and arrival",
    description: "We handle VIP pet flight nanny arrangements, ministry health clearance, and arrival documentation directly to Dubai."
  },
  {
    step: "04",
    title: "Welcome home",
    description: "Meet your puppy at our Downtown Dubai showroom or enjoy safe doorstep white-glove delivery, complete with your deluxe puppy starter kit."
  }
];

export const GUARANTEES = [
  {
    title: "Vaccinated & Dewormed",
    description: "Up-to-date core vaccinations and preventive medical treatments administered by licensed veterinarians."
  },
  {
    title: "Licensed Vet Certification",
    description: "Comprehensive multi-point clinical health check and international government health passport."
  },
  {
    title: "Microchipped for Life",
    description: "ISO-standard microchip registered for lifetime safety and recovery."
  },
  {
    title: "24/7 New Parent Concierge",
    description: "Continuous guidance for feeding, potty training, and settling into your home."
  }
];
