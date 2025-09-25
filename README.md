<div align="center">

# MovieShop Beta

Modern movie ecommerce implemented with a clean, component‑driven Next.js 15 (App Router) architecture. Features include authenticated user flows, shopping cart with server actions, order management, and modular UI composition.

![MovieShop Beta Mockup](public/images/mockup-bmovies.jpg)

</div>

**Authors:** Josefine · Niklas · Amina

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Architecture Highlights](#architecture-highlights)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Development Workflow](#development-workflow)
8. [Authentication](#authentication)
9. [Orders & Checkout](#orders--checkout)
10. [Styling & UI](#styling--ui)
11. [Accessibility](#accessibility)
12. [Usage Scenarios](#usage-scenarios)
13. [Roadmap](#roadmap)
14. [Team](#team)
15. [Contributing](#contributing)
16. [License](#license)

---

## Overview

MovieShop Beta (B‑Movies) is a learning and showcase project demonstrating production‑aligned patterns for a media storefront: data modeling with Prisma, secure session-based authentication, dynamic server rendering, UI layering with Tailwind and shadcn primitives, and progressive enhancement through selective client components.

---

## Key Features

- Movie catalogue browsing with filtering and search.
- User authentication (email + password) with session management.
- Profile & settings pages (extensible for future first/last name separation and contact data).
- Order creation, order history, and per‑order detail dialog (inline modal specification; no PDF overhead).
- Shopping cart (cookie + server action driven) with quantity adjustments and price snapshots at purchase time.
- Thematic mode switching (light/dark) persisting across sessions.
- Top lists (latest, popular, oldest, cheapest) surfaced as quick navigation anchors.
- Responsive adaptive layout across viewport breakpoints.
- Defensive fallbacks for missing images/posters.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Server & Client Components) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Primitives | shadcn/ui (Radix under the hood) |
| Forms | React Hook Form + Zod validation |
| Auth | better-auth (custom integration + client) |
| Data Layer | Prisma ORM (PostgreSQL target) |
| Icons | Lucide React |
| Theming | next-themes |

---

## Architecture Highlights

- **Server Actions** centralize mutations (orders, profile) to reduce API boilerplate.
- **Selective Client Components** only where interactivity is needed: dialogs, forms, cart controls.
- **Schema-first Data Model** with explicit order + order item relations storing purchase-time pricing.
- **Composable UI** built from small, stateless display components and form logic wrappers.
- **Edge-friendly Rendering** (no heavy global client state libraries).
- **Graceful Degradation**: image placeholders, empty state messaging, robust parsing.
- **Scalability Hooks**: ready for extended profile attributes, address book, and re‑order flows.

---

## Project Structure

movieshop-beta/
├── .next/ # Next.js build output (auto-genererad)
├── .vscode/ # VS Code workspace inställningar
├── node_modules/ # NPM dependencies (auto-installerad)
├── prisma/ # Databas schema och migrationer
│ ├── dev.db # SQLite databas fil
│ ├── schema.prisma # Prisma schema definition
│ └── migrations/ # Databas migrationer
│ ├── migration_lock.toml # Migration lock fil
│ ├── 20250918215617_init_sqlite/
│ └── 20250918222825_add_customer_fields/
├── public/ # Statiska filer (bilder, ikoner)
│ └── images/ # App bilder och placeholders
├── src/ # Applikationens källkod
│ ├── actions/ # Server Actions för datahantering
│ │ ├── api-actions.ts # Allmänna API operationer
│ │ ├── cookie-cart.ts # Legacy cart actions (ersatt av /cart/)
│ │ ├── genres.ts # Genre CRUD operationer
│ │ ├── movies.ts # Film CRUD operationer
│ │ ├── orders.ts # Order hantering
│ │ └── person.ts # Person/skådespelare operationer
│ ├── app/ # Next.js App Router struktur
│ │ ├── aboutus/ # Om oss sida
│ │ ├── admin/ # Admin panel för CRUD
│ │ │ ├── genres/ # Genre administration
│ │ │ ├── movies/ # Film administration
│ │ │ ├── orders/ # Order administration
│ │ │ └── person/ # Person administration
│ │ ├── api/ # API routes
│ │ │ ├── auth/ # Autentisering endpoints
│ │ │ └── cart/ # Legacy cart API (ersatt av server actions)
│ │ │ └── route.ts # REST endpoint för cart
│ │ ├── checkout/ # Checkout flöde
│ │ │ ├── success/[orderId]/ # Order framgångssida
│ │ │ │ └── page.tsx # Tackmeddelande med orderdetaljer
│ │ │ └── page.tsx # Checkout formulär
│ │ ├── movies/ # Film browsing
│ │ │ ├── page.tsx # Film listing med filter/sökning
│ │ │ └── [movieId]/ # Individuell film sida
│ │ ├── person/ # Person/skådespelare sidor
│ │ │ ├── page.tsx # Person listing
│ │ │ └── [personId]/ # Individuell person sida
│ │ ├── sign-in/ # Inloggning
│ │ ├── sign-up/ # Registrering
│ │ ├── user/ # Användarprofil och orderhistorik
│ │ ├── favicon.ico # Webbplats ikon
│ │ ├── globals.css # Globala CSS stilar
│ │ ├── layout.tsx # Root layout med navbar/footer
│ │ └── page.tsx # Startsida med hero och carousels
│ ├── cart/ # Cookie-baserad cart system (NY)
│ │ ├── actions.ts # Server actions för cart operationer
│ │ ├── constants.ts # Cart konstanter och typer
│ │ ├── cookie.ts # Cookie hantering för cart
│ │ └── math.ts # Cart beräkningar (totaler etc)
│ ├── checkout/ # Checkout logik (NY)
│ │ └── actions.ts # Order submission med gäst/user support
│ ├── components/ # Återanvändbara React komponenter
│ │ ├── forms/ # Formulär komponenter
│ │ │ ├── create-genre-form.tsx # Admin genre formulär
│ │ │ ├── create-movies-form.tsx # Admin film formulär
│ │ │ ├── create-order-form.tsx # Admin order formulär
│ │ │ ├── create-person-form.tsx # Admin person formulär
│ │ │ ├── sign-in-form.tsx # Inloggnings formulär
│ │ │ ├── sign-up-form.tsx # Registrerings formulär
│ │ │ ├── update-movie-form.tsx # Film uppdatering
│ │ │ └── update-person-form.tsx # Person uppdatering
│ │ ├── ui/ # Grundläggande UI komponenter (shadcn/ui)
│ │ ├── button-signin-signout.tsx # Auth status button
│ │ ├── card-movies.tsx # Film kort för listings
│ │ ├── card-person.tsx # Person kort för listings
│ │ ├── cart-quantity-buttons.tsx # Kvantitet +/- knappar
│ │ ├── cart-remove-button.tsx # Ta bort från cart knapp
│ │ ├── edit-movie-popup.tsx # Quick edit popup för filmer
│ │ ├── footer.tsx # Sidfot
│ │ ├── genre-filter.tsx # Genre filtering
│ │ ├── home-carousels.tsx # Startsidans film karuseller
│ │ ├── home-hero-section.tsx # Hero sektion på startsida
│ │ ├── movie-carousel.tsx # Film karusell komponent
│ │ ├── movie-details.tsx # Film detaljer vy
│ │ ├── navbar.tsx # Navigations bar
│ │ ├── person-carousel.tsx # Person karusell
│ │ ├── person-details.tsx # Person detaljer vy
│ │ ├── search-bar.tsx # Sök funktionalitet
│ │ ├── shopping-cart-sheet.tsx # Slide-out cart panel
│ │ ├── sort-picker.tsx # Sortering controls
│ │ ├── theme-provider.tsx # Dark/light mode provider
│ │ └── toggle-theme-button.tsx # Theme växlings knapp
│ ├── generated/ # Auto-genererad kod
│ │ └── prisma/ # Prisma client kod
│ └── lib/ # Hjälpfunktioner och konfiguration
│ ├── auth-client.ts # Better Auth client config
│ ├── auth.ts # Better Auth server config
│ ├── prisma.ts # Prisma client instans
│ ├── tmdb-image-url.ts # TMDB bild URL helpers
│ ├── tmdb.ts # TMDB API integration
│ ├── types.ts # TypeScript type definitions
│ ├── utils.ts # Allmänna utility funktioner
│ └── zod-schemas.ts # Zod validation schemas
├── .env # Miljövariabler (databas URL, API nycklar)
├── .gitignore # Git ignore regler
├── components.json # shadcn/ui konfiguration
├── eslint.config.mjs # ESLint regler
├── LICENSE # Licens fil
├── next-env.d.ts # Next.js TypeScript definitions
├── next.config.ts # Next.js konfiguration
├── package-lock.json # NPM dependency lock
├── package.json # NPM dependencies och scripts
├── postcss.config.mjs # PostCSS konfiguration
├── README.md # Projekt dokumentation
└── tsconfig.json # TypeScript konfiguration

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A PostgreSQL database (or adjust datasource configuration)

### Environment Variables (example)

Create a `.env` file:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/movieshop"
TMDB_API_KEY="your_tmdb_api_key"
```

### Install & Run

```bash
git clone <repository-url>
cd movieshop-beta
npm install
npx prisma generate
npm run dev
```

Visit http://localhost:3000

For a production build:

```bash
npm run build
npm start
```

---

## Development Workflow

| Action | Command |
|--------|---------|
| Lint | `npm run lint` |
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Type check (implicit) | Via `tsc` during build |

Migrations are managed through Prisma (e.g. `npx prisma migrate dev`).

---

## Components

### Navbar

- **Desktop Navigation**: Home, Movies, People, Top Lists
- **Mobile Navigation**: Collapsible hamburger menu with authentication forms
- **Search Bar**: Global movie search functionality (always visible)
- **Theme Toggle**: Dark/light mode switcher
- **Shopping Cart**: Cart management
- **Authentication**:
  - Desktop: ProfileDropdown and Sign Up button
  - Mobile: Sign In/Up buttons in hamburger menu with modal forms

### Authentication Forms

- **Sign In Form**: Email and password authentication with popup modal
- **Sign Up Form**: User registration with validation in popup modal
- **Profile Dropdown**: User menu with profile options (desktop only)

### Responsive Design

- **Desktop**: Full navigation with profile dropdown and sign up button
- **Mobile**: Hamburger menu with sign in/up options in modal dialogs
- **Search**: Always visible on both desktop and mobile
- **Adaptive UI**: Different layouts optimized for each screen size

---

## Authentication

The application uses a custom authentication system with:

- **Email/Password Authentication**: Secure sign up and sign in
- **Form Validation**: Zod schema validation for all forms
- **Session Management**: Automatic redirect after authentication
- **Profile Management**: User profile dropdown with settings
- **Responsive Auth UI**: Different authentication flows for desktop and mobile

### Authentication Flow

1. **Sign Up**: New users create account with name, email, and password
2. **Sign In**: Existing users authenticate with email and password
3. **Profile Access**: Authenticated users see profile dropdown instead of auth buttons
4. **Logout**: Users can sign out from the profile dropdown

---

## Orders & Checkout

The checkout flow creates an Order with associated OrderItems capturing:

- Snapshot of unit price at time of purchase.
- Quantity integrity (no reliance on mutable product price after the fact).
- Basic status life cycle (pending → processed extensible to shipped/delivered).

Success page and order detail dialog reuse layout segments to reduce duplication.

---

## Styling & UI

- Tailwind CSS utility-first composition.
- shadcn/ui for accessible primitives (Dialog, Dropdown, Card, Sheet, etc.).
- Theme handled via `next-themes` with instant CSS variable swap.
- Icons standardized on Lucide for consistent line style.

---

## Accessibility

- Semantic headings and ARIA-friendly component primitives (Radix-based).
- Focus management in dialogs and sheets.
- Color contrast mindful of dark/light themes.
- Text alternatives for images and placeholders when posters are absent.

---

## Usage Scenarios

### For Visitors (Not Logged In)

- Browse movies and search functionality
- Access to sign up and sign in forms (popup modals)
- View movie information and top lists

### For Authenticated Users

- All visitor features
- Profile dropdown with user options:
  - My Profile
  - Settings
  - My Orders
  - Log Out
- Shopping cart functionality
- Personalized experience

### Navigation Features

- **Home**: Landing page with featured content
- **Movies**: Browse movie catalog
- **People**: Browse actors and directors
- **Top Lists**: Curated movie collections
  - Top 5 Latest Movies
  - Top 5 Most Popular Movies
  - Top 5 Oldest Movies
  - Top 5 Cheapest Movies

---

## Roadmap

Potential future enhancements:

- Address & shipping profiles.
- Re-order from previous purchases.
- Recommendation engine (history + popularity blending).
- Watchlist / favorites persistence.
- Inventory alerts and low-stock indicators.
- Payment provider integration abstraction.

---

## Team

This project was collaboratively developed by:

- **Josefine** - Frontend Development, backend & UI/UX Design, Loggodesign
- **Niklas** - Frontend Development, Backend, API, Integration & Authentication
- **Amina** - Backend Authentication

---

## Design & Mockups

_Add your mockup image here:_

```markdown
![MovieShop Beta Desktop](your-mockup-image-url-here)
```

The design features a modern, clean interface with:

- Intuitive navigation structure
- Responsive design patterns
- Dark/light theme support
- Accessible UI components

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is part of a portfolio demonstration.

---

**Built by Josefine · Niklas · Amina using Next.js and modern web technologies.**
