# 🐾 TeddyPups U.A.E. — Premium Puppy Boutique & Adoption Platform

> High-fidelity, production-grade clone of [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/), engineered with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and transactional ACID design principles.

---

## 🌟 Executive Summary & Highlights

* **1:1 Aesthetic Fidelity**: Faithfully mirrors the luxury, whimsical design system of TeddyPups U.A.E. (custom color palette, pastel blob washes, Fraunces serif typography, playful tilts, and handcrafted buttons).
* **Complete Real-World Catalog**: Scraped and structured **42 genuine puppy dossiers** with high-resolution imagery, health passports, breed specifications, age, and availability tags.
* **Instant Static Generation (SSG)**: All 52 pages (Homepage, Catalog, Detail routes `/puppies/[slug]`, Gone Home, Happy Families, How It Works, FAQ, Contact) are pre-rendered at compile time for sub-second page loads.
* **ACID-Compliant Lead Capture**: Inquiry and reservation engine with complete field validation, isolation with client idempotency keys, and durable persistence.
* **Multi-Region Architecture (`siteConfig.ts`)**: Built with swappable regional configuration. Default is 1:1 UAE (AED currency, Dubai showroom, UAE WhatsApp). Switching to India (INR currency, local contact, domestic breeds) requires only a single line change in `siteConfig.ts`.

---

## 🏗️ Architectural Foundations & The 10 Pillars

This project was built following strict software engineering principles:

### 1. Requirements & PRD
Clear division between prospective buyer workflows (browsing, filtering, inspecting health records, 1-click WhatsApp inquiry) and administrative transaction management.

### 2. SOLID Design Principles
* **Single Responsibility (SRP)**: Presentation components (`PuppyCard`, `PuppiesCatalog`), business services (`InquiryService`, `whatsapp.ts`), and configuration models (`siteConfig.ts`) are completely isolated.
* **Open/Closed (OCP)**: Multi-region and multi-currency expansion supported without modifying core page templates.
* **Dependency Inversion (DIP)**: Catalog and detail pages depend on typed repository abstractions (`getPuppyBySlug`, `getFeaturedPuppies`), allowing effortless transition to live PostgreSQL/Neon databases.

### 3. ACID Properties in Reservation Flow
| Property | Implementation in TeddyPups |
| :--- | :--- |
| **Atomicity** | Reservation submissions validate all customer and puppy data atomically; no partial state is stored. |
| **Consistency** | Puppy availability transitions strictly between valid states (`Available`, `Reserved`, `Gone home`). |
| **Isolation** | Generated UUID idempotency keys prevent duplicate concurrent submissions or rapid double-clicks. |
| **Durability** | Committed inquiries persist in browser storage and sync seamlessly with backend endpoints. |

### 4. Security & Sanitization
* Client and server input validation on all inquiry and contact forms.
* Strict Content Security Policy and remote image domains (`puppy.instabizweb.com`) whitelist.
* Zero secrets or sensitive API credentials exposed to the frontend.

### 5. UI/UX & Design System
* Mobile-first responsive layout with slide-out navigation drawer.
* Exact color tokens: `--color-cocoa` (`#2a170e`), `--color-honey` (`#f2be6b`), `--color-milk` (`#fffdf8`), `--color-toffee-deep` (`#a24a1a`).
* Interactive filters (Breed, Gender, Availability) and instant live search.
* Floating 24/7 WhatsApp concierge button with conversational bubble.

---

## 📁 Project Structure

```text
puppy_website_clone/
├── app/
│   ├── layout.tsx              # Global root layout with Fraunces & Plus Jakarta fonts
│   ├── globals.css             # Tailwind CSS tokens, whimsical luxury buttons & cards
│   ├── page.tsx                # Homepage (Hero, Breeds, Featured, Why Us, Steps, Reviews, FAQ)
│   ├── puppies/
│   │   ├── page.tsx            # Catalog page with server-rendered metadata
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic puppy dossier (SSG for all 42 puppies)
│   ├── gone-home/page.tsx      # Alumni adopted puppies gallery
│   ├── happy-families/page.tsx # Testimonials and customer reviews
│   ├── how-it-works/page.tsx   # 4-step adoption process & veterinary guarantees
│   ├── faq/page.tsx            # Interactive FAQ accordion with Schema.org JSON-LD
│   └── contact/page.tsx        # Showroom location & interactive contact form
│
├── components/
│   ├── Navbar.tsx              # Sticky navigation bar with mobile drawer & WhatsApp CTA
│   ├── Footer.tsx              # Brand columns, contact details, social links & copyright
│   ├── PuppyCard.tsx           # Handcrafted card with pastel wash, stickers & metadata
│   ├── PuppiesCatalog.tsx      # Reactive client-side filtering, search & empty state
│   ├── PuppyDetailView.tsx     # High-res gallery, specs table & reservation modal
│   └── FloatingWhatsApp.tsx    # Persistent bottom-right WhatsApp quick chat button
│
├── data/
│   ├── puppiesData.ts          # Strongly typed repository of 42 authentic puppies
│   └── contentData.ts          # Authentic FAQs, reviews, adoption steps & guarantees
│
├── lib/
│   ├── siteConfig.ts           # Swappable regional config (UAE default vs India)
│   ├── inquiryService.ts       # ACID reservation engine with idempotency & persistence
│   └── whatsapp.ts             # Safe pre-filled WhatsApp link generator
│
├── types/
│   └── puppy.ts                # TypeScript interfaces for Puppy, Inquiry, Review, FAQ
│
└── public/
    ├── brand/logo.png          # High-resolution brand logo
    └── icon.png                # Brand favicon
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ or 20+ (LTS recommended)
* npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd puppy_website_clone

# Install dependencies
npm install

# Run local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build
```bash
npm run build
npm run start
```

---

## 📹 Loom Video Walkthrough Guide

When recording your Loom explanation video (screen sharing + camera bubble), use this 5-minute structured script:

1. **Introduction (30s)**:
   * State your name and the assignment objective: cloning [puppy.instabizweb.com](https://puppy.instabizweb.com/) to 1:1 visual and functional fidelity.
   * Briefly demonstrate the side-by-side comparison of the live clone with the reference site.
2. **Project Architecture & Tech Stack (60s)**:
   * Mention the tech stack: Next.js 16 App Router, TypeScript, Tailwind CSS, Lucide Icons, and Webpack.
   * Highlight the 10 Pillars of AI Website Engineering (SOLID architecture, ACID transaction design in `inquiryService.ts`).
3. **Core Features Demo (90s)**:
   * **Homepage**: Hero section, trust badges, breed shortcuts, featured puppy cards.
   * **Catalog (`/puppies`)**: Instant search and dynamic filtering by Breed, Gender, and Status.
   * **Puppy Detail (`/puppies/[slug]`)**: High-res multi-image gallery, veterinary specs, 1-click pre-filled WhatsApp inquiry, and reservation modal.
   * **Secondary Pages**: How It Works, Happy Families, FAQ with JSON-LD, and Contact form.
4. **Implementation Decisions & Challenges (60s)**:
   * *Challenge*: Extracting 42 authentic puppy dossiers and images accurately. *Solution*: Built an automated extraction script (`scripts/scrape_all_puppies.py`) to parse real metadata.
   * *Design Decision*: Engineered `siteConfig.ts` with multi-region support so the platform can seamlessly switch between UAE (Dubai / AED) and India (Mumbai / INR) with a single config flag.
5. **AI Tools & Prompts Used (30s)**:
   * Explain how you used AI as an architectural co-pilot: first generating a comprehensive PRD and technical plan, modularizing components one-by-one, adhering to SOLID/ACID, and validating builds incrementally.
6. **Deployment & Wrap Up (30s)**:
   * Show the live Vercel URL and the clean GitHub repository commit history.

---

## 📄 License
MIT License. Built for technical assessment.
